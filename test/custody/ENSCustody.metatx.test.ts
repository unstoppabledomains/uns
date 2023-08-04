import { ethers, upgrades } from 'hardhat';
import { expect } from 'chai';
import { namehash } from 'ethers/lib/utils';
import { sha3 } from 'web3-utils';
import { BigNumber } from 'ethers';
import {
  BaseRegistrarImplementation__factory,
  DummyOracle__factory,
  ENSCustody__factory,
  ENSRegistry__factory,
  ETHRegistrarController__factory,
  NameWrapper__factory,
  ReverseRegistrar__factory,
  StablePriceOracle__factory,
} from '../../types';
import { REGISTRATION_TIME, ZERO_ADDRESS, ZERO_WORD } from '../helpers/constants';
import { ExecuteFunc, buildExecuteFunc } from '../helpers/metatx';

describe('ENSCustody (metatx)', function () {
  let provider;
  let ens;
  let baseRegistrar;
  let controller;
  let priceOracle;
  let reverseRegistrar;
  let nameWrapper;
  let custody;

  const secret = '0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF';

  let buildExecuteParams: ExecuteFunc;
  let signers, owner, registrant, minter, spender;
  let ownerAddress, registrantAddress;
  let result;

  async function registerAndParkName (name, minter, resolver = ZERO_ADDRESS, selfCustody = false, txOptions = {}) {
    // make commitment
    const commitment = await custody.makeCommitment(
      name,
      registrantAddress,
      REGISTRATION_TIME,
      secret,
      resolver,
      [],
      false,
      0,
      selfCustody,
    );
    const commitTx = await custody.commit(commitment);
    const { timestamp } = await provider.getBlock(commitTx.blockNumber);
    expect(await controller.commitments(commitment)).to.equal(timestamp);

    await provider.send('evm_increaseTime', [(await controller.minCommitmentAge()).toNumber()]);

    // register
    const tokenId = namehash(`${name}.eth`);
    const { req, signature } = await buildExecuteParams(
      'register(string,address,uint256,bytes32,address,bytes[],bool,uint16,bool)',
      [name, registrantAddress, REGISTRATION_TIME, secret, resolver, [], false, 0, selfCustody],
      minter,
      tokenId,
      BigNumber.from(0),
    );
    const registerTx = await custody.connect(spender).execute(req, signature, txOptions);
    return [commitTx, registerTx];
  }

  async function topupCustody (name) {
    const [base, premium] = await controller.rentPrice(name, REGISTRATION_TIME);
    const price = base.add(premium);
    await owner.sendTransaction({ to: custody.address, value: price });
    return price;
  }

  async function assertOwnership (name, owner, selfCustody = false) {
    const tokenId = sha3(name);
    const node = namehash(`${name}.eth`);

    expect(await controller.available(name)).to.equal(false);
    expect(await ens.owner(node)).to.equal(nameWrapper.address);
    expect(await baseRegistrar.ownerOf(tokenId)).to.equal(nameWrapper.address);

    if (selfCustody) {
      expect(await nameWrapper.ownerOf(node)).to.equal(owner);
    } else {
      expect(await nameWrapper.ownerOf(node)).to.equal(custody.address);
      expect(await custody.ownerOf(node)).to.equal(owner);
    }
  }

  before(async () => {
    provider = ethers.provider;
    signers = await ethers.getSigners();
    [owner, registrant, spender] = signers;
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

    custody = await upgrades.deployProxy(
      new ENSCustody__factory(owner),
      [
        controller.address,
        nameWrapper.address,
        baseRegistrar.address,
      ],
    );
    await custody.addMinter(minter.address);

    buildExecuteParams = buildExecuteFunc(custody.interface, custody.address, custody);
  });

  beforeEach(async () => {
    result = await provider.send('evm_snapshot', []);
  });
  afterEach(async () => {
    await provider.send('evm_revert', [result]);
  });

  it('should register and park name', async () => {
    const name = 'mts-lc2';
    const tokenId = namehash(`${name}.eth`);
    await topupCustody(name);
    expect(await custody.nonceOf(tokenId)).to.be.equal(0);

    await registerAndParkName(name, minter, ZERO_ADDRESS, false);

    await assertOwnership(name, registrantAddress);
    expect(await custody.nonceOf(tokenId)).to.be.equal(1);
  });

  it('should transfer parked domain', async () => {
    const name = 'mts-ck41';
    const tokenId = namehash(`${name}.eth`);
    await topupCustody(name);

    await registerAndParkName(name, minter, ZERO_ADDRESS, false);
    await assertOwnership(name, registrantAddress);
    expect(await custody.nonceOf(tokenId)).to.be.equal(1);

    const { req, signature } = await buildExecuteParams(
      'safeTransfer(address,uint256)',
      [registrantAddress, tokenId],
      registrant,
      tokenId,
      await custody.nonceOf(tokenId),
    );
    await custody.connect(spender).execute(req, signature);

    await assertOwnership(name, registrantAddress, true);
    expect(await custody.nonceOf(tokenId)).to.be.equal(2);
  });

  it('should allow transfer parked domain by owner only', async () => {
    const name = 'mts-cwe2';
    const tokenId = namehash(`${name}.eth`);
    await topupCustody(name);

    await registerAndParkName(name, minter, ZERO_ADDRESS, false);
    await assertOwnership(name, registrantAddress);

    const { req, signature } = await buildExecuteParams(
      'safeTransfer(address,uint256)',
      [registrantAddress, tokenId],
      spender,
      tokenId,
      await custody.nonceOf(tokenId),
    );
    await expect(custody.connect(spender).execute(req, signature)).to.be.revertedWith('Unauthorised');
  });

  it('should revert with invalid signature error when invalid nonce', async () => {
    const name = 'mts-cw12';
    const tokenId = namehash(`${name}.eth`);
    await topupCustody(name);

    await registerAndParkName(name, minter, ZERO_ADDRESS, false);
    await assertOwnership(name, registrantAddress);

    const { req, signature } = await buildExecuteParams(
      'safeTransfer(address,uint256)',
      [registrantAddress, tokenId],
      minter,
      tokenId,
      BigNumber.from(0),
    );
    await expect(custody.connect(spender).execute(req, signature)).to.be.revertedWith('InvalidSignature');
  });

  it('should revert with unauthorised error when invalid signer', async () => {
    const name = 'mts-cw12';
    const tokenId = namehash(`${name}.eth`);
    await topupCustody(name);

    await registerAndParkName(name, minter, ZERO_ADDRESS, false);
    await assertOwnership(name, registrantAddress);

    const { req, signature } = await buildExecuteParams(
      'safeTransfer(address,uint256)',
      [registrantAddress, tokenId],
      spender,
      tokenId,
      await custody.nonceOf(tokenId),
    );
    await expect(custody.connect(spender).execute(req, signature)).to.be.revertedWith('Unauthorised');
  });

  it('should revert with invalid token error when forwarded token incorrect', async () => {
    const name = 'mts-cw12';
    const tokenId = namehash(`${name}.eth`);
    await topupCustody(name);

    await registerAndParkName(name, minter, ZERO_ADDRESS, false);
    await assertOwnership(name, registrantAddress);

    const { req, signature } = await buildExecuteParams(
      'safeTransfer(address,uint256)',
      [registrantAddress, tokenId],
      registrant,
      1,
      await custody.nonceOf(1),
    );
    await expect(custody.connect(spender).execute(req, signature)).to.be.revertedWith('InvalidForwardedToken');
  });
});
