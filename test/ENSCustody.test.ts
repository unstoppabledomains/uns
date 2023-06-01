import { ethers } from 'hardhat';
import { expect } from 'chai';
import { namehash } from 'ethers/lib/utils';
import { sha3 } from 'web3-utils';
import {
  BaseRegistrarImplementation__factory,
  DummyOracle__factory,
  ENSCustody__factory,
  ENSRegistry__factory,
  ETHRegistrarController__factory,
  NameWrapper__factory,
  PublicResolver__factory,
  ReverseRegistrar__factory,
  StablePriceOracle__factory,
} from '../types';
import { BUFFERED_REGISTRATION_COST, REGISTRATION_TIME, ZERO_ADDRESS, ZERO_WORD } from './helpers/constants';

const provider = ethers.provider;

describe('ENSCustody', function () {
  let ens;
  let resolver;
  let baseRegistrar;
  let controller;
  let priceOracle;
  let reverseRegistrar;
  let nameWrapper;
  let custody;

  const secret = '0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF';

  let signers, owner, registrant, minter;
  let ownerAddress, registrantAddress;
  let result;

  async function registerName (name, txOptions = { value: BUFFERED_REGISTRATION_COST }) {
    const commitment = await controller.makeCommitment(
      name,
      registrantAddress,
      REGISTRATION_TIME,
      secret,
      ZERO_ADDRESS,
      [],
      false,
      0,
    );
    let tx = await controller.commit(commitment);
    const { timestamp } = await provider.getBlock(tx.blockNumber);
    expect(await controller.commitments(commitment)).to.equal(timestamp);

    await provider.send('evm_increaseTime', [(await controller.minCommitmentAge()).toNumber()]);

    tx = await controller.register(
      name,
      registrantAddress,
      REGISTRATION_TIME,
      secret,
      ZERO_ADDRESS,
      [],
      false,
      0,
      txOptions,
    );

    return tx;
  }

  async function registerAndParkName (name, minter, txOptions = {}) {
    // make commitment
    const commitment = await custody
      .connect(minter)
      .makeCommitment(name, registrantAddress, REGISTRATION_TIME, secret, ZERO_ADDRESS, [], false, 0, false);
    let tx = await controller.commit(commitment);
    const { timestamp } = await provider.getBlock(tx.blockNumber);
    expect(await controller.commitments(commitment)).to.equal(timestamp);

    await provider.send('evm_increaseTime', [(await controller.minCommitmentAge()).toNumber()]);

    // topup minter
    const estimation = await custody
      .connect(minter)
      .estimateGas.register(name, registrantAddress, REGISTRATION_TIME, secret, ZERO_ADDRESS, [], false, 0, false);
    await owner.sendTransaction({ to: minter.address, value: estimation.mul(120).div(100) });

    // register
    tx = await custody
      .connect(minter)
      .register(name, registrantAddress, REGISTRATION_TIME, secret, ZERO_ADDRESS, [], false, 0, false, txOptions);
    return tx;
  }

  before(async () => {
    signers = await ethers.getSigners();
    [owner, registrant] = signers;
    ownerAddress = await owner.getAddress();
    registrantAddress = await registrant.getAddress();
    minter = new ethers.Wallet('0x' + '1'.repeat(64), provider);

    ens = await new ENSRegistry__factory(owner).deploy();
    baseRegistrar = await new BaseRegistrarImplementation__factory(owner).deploy(ens.address, namehash('eth'));
    reverseRegistrar = await new ReverseRegistrar__factory(owner).deploy(ens.address);

    await ens.setSubnodeOwner(ZERO_WORD, sha3('reverse'), ownerAddress);
    await ens.setSubnodeOwner(namehash('reverse'), sha3('addr'), reverseRegistrar.address);

    nameWrapper = await new NameWrapper__factory(owner).deploy(ens.address, baseRegistrar.address, ownerAddress);

    await ens.setSubnodeOwner(ZERO_WORD, sha3('eth'), baseRegistrar.address);

    const dummyOracle = await new DummyOracle__factory(owner).deploy('100000000');
    priceOracle = await new StablePriceOracle__factory(owner).deploy(dummyOracle.address, [0, 0, 4, 2, 1]);
    controller = await new ETHRegistrarController__factory(owner).deploy(
      baseRegistrar.address,
      priceOracle.address,
      600,
      86400,
      reverseRegistrar.address,
      nameWrapper.address,
      ens.address,
    );
    await nameWrapper.setController(controller.address, true);
    await baseRegistrar.addController(nameWrapper.address);
    await reverseRegistrar.setController(controller.address, true);

    resolver = await new PublicResolver__factory(owner).deploy(
      ens.address,
      nameWrapper.address,
      controller.address,
      reverseRegistrar.address,
    );

    custody = await new ENSCustody__factory(owner).deploy(controller.address, nameWrapper.address);
    await custody.addMinter(minter.address);
  });

  beforeEach(async () => {
    result = await provider.send('evm_snapshot', []);
  });
  afterEach(async () => {
    await provider.send('evm_revert', [result]);
  });

  it('should register name', async () => {
    const name = 'newname';
    const tokenId = sha3(name);
    const node = namehash(`${name}.eth`);

    await registerName(name);

    expect(await controller.available(name)).to.equal(false);
    expect(await ens.owner(node)).to.equal(nameWrapper.address);
    expect(await baseRegistrar.ownerOf(tokenId)).to.equal(nameWrapper.address);
    expect(await nameWrapper.ownerOf(node)).to.equal(registrantAddress);
  });

  it('should register and park name', async () => {
    const name = 'newname2';
    const tokenId = sha3(name);
    const node = namehash(`${name}.eth`);

    // topup custody
    const [base, premium] = await controller.rentPrice(name, REGISTRATION_TIME);
    const price = base.add(premium);
    await owner.sendTransaction({ to: custody.address, value: price });

    const balance = await provider.getBalance(custody.address);
    await registerAndParkName(name, minter, { gasPrice: 1 });

    expect(await controller.available(name)).to.equal(false);
    expect(await ens.owner(node)).to.equal(nameWrapper.address);
    expect(await baseRegistrar.ownerOf(tokenId)).to.equal(nameWrapper.address);
    expect(await nameWrapper.ownerOf(node)).to.equal(custody.address);
    expect(await custody.ownerOf(node)).to.equal(registrantAddress);

    expect(await provider.getBalance(custody.address)).to.equal(balance.sub(price));
  });

  it('should transfer parked domain', async () => {
    const name = 'newname4';
    const tokenId = sha3(name);
    const node = namehash(`${name}.eth`);

    // topup custody
    const [base, premium] = await controller.rentPrice(name, REGISTRATION_TIME);
    const price = base.add(premium);
    await owner.sendTransaction({ to: custody.address, value: price });

    await registerAndParkName(name, minter, { gasPrice: 1 });
    expect(await baseRegistrar.ownerOf(tokenId)).to.equal(nameWrapper.address);

    await custody.connect(registrant).safeTransfer(registrantAddress, node);

    expect(await controller.available(name)).to.equal(false);
    expect(await ens.owner(node)).to.equal(nameWrapper.address);
    expect(await baseRegistrar.ownerOf(tokenId)).to.equal(nameWrapper.address);
    expect(await nameWrapper.ownerOf(node)).to.equal(registrantAddress);
    await expect(custody.ownerOf(node)).to.be.revertedWith('ENSCustody: unknown token ID');
  });

  it.skip('should register and park name', async () => {
    const name = 'newname2';
    const tokenId = namehash(`${name}.eth`);

    // make commitment
    const commitment = await custody
      .connect(minter)
      .makeCommitment(name, registrantAddress, REGISTRATION_TIME, secret, ZERO_ADDRESS, [], false, 0);
    let tx = await controller.commit(commitment);
    const { timestamp } = await provider.getBlock(tx.blockNumber);
    expect(await controller.commitments(commitment)).to.equal(timestamp);

    await provider.send('evm_increaseTime', [(await controller.minCommitmentAge()).toNumber()]);

    // topup custody
    const [base, premium] = await controller.rentPrice(name, REGISTRATION_TIME);
    const price = base.add(premium);
    await owner.sendTransaction({ to: custody.address, value: price });

    // topup minter
    const estimation = await custody
      .connect(minter)
      .estimateGas.register(name, registrantAddress, REGISTRATION_TIME, secret, ZERO_ADDRESS, [], false, 0);
    await owner.sendTransaction({ to: minter.address, value: estimation });

    // register
    tx = await custody
      .connect(minter)
      .register(name, registrantAddress, REGISTRATION_TIME, secret, ZERO_ADDRESS, [], false, 0, { gasPrice: 1 });
    expect(await controller.available(name)).to.equal(false);

    expect(await ens.owner(tokenId)).to.equal(nameWrapper.address);
    expect(await baseRegistrar.ownerOf(sha3(name)), custody.address);
    expect(await nameWrapper.ownerOf(tokenId)).to.equal(custody.address);
    expect(await custody.ownerOf(name)).to.equal(registrantAddress);
  });
});
