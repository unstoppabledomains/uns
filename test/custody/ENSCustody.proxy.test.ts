import { ethers, upgrades } from 'hardhat';
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
  ReverseRegistrar__factory,
  StablePriceOracle__factory,
} from '../../types';
import { REGISTRATION_TIME, ZERO_ADDRESS, ZERO_WORD } from '../helpers/constants';

describe('ENSCustody (proxy)', function () {
  let provider;
  let ens;
  let baseRegistrar;
  let controller;
  let priceOracle;
  let reverseRegistrar;
  let nameWrapper;
  let custodyFactory;
  let custody;

  const secret = '0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF';

  let signers, owner, registrant, minter;
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
    const registerTx = await custody
      .connect(minter)
      .register(name, registrantAddress, REGISTRATION_TIME, secret, resolver, [], false, 0, selfCustody, txOptions);
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
    [owner, registrant, minter] = signers;
    ownerAddress = await owner.getAddress();
    registrantAddress = await registrant.getAddress();

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

    custodyFactory = new ENSCustody__factory(owner);
    custody = await upgrades.deployProxy(custodyFactory, [], { initializer: false });
    await custody.initialize(controller.address, nameWrapper.address, baseRegistrar.address);
    await custody.addMinter(minter.address);
  });

  beforeEach(async () => {
    result = await provider.send('evm_snapshot', []);
  });
  afterEach(async () => {
    await provider.send('evm_revert', [result]);
  });

  it('should not allow initialize twice', async () => {
    await expect(
      custody.initialize(
        controller.address,
        nameWrapper.address,
        baseRegistrar.address,
      ),
    ).to.be.revertedWith(
      'Initializable: contract is already initialized',
    );
  });

  it('should register and park name', async () => {
    const name = 'ts-lc2';
    await topupCustody(name);

    await registerAndParkName(name, minter, ZERO_ADDRESS, false);

    await assertOwnership(name, registrantAddress);
  });

  it('should transfer parked domain', async () => {
    const name = 'ts-ck41';
    const node = namehash(`${name}.eth`);
    await topupCustody(name);

    await registerAndParkName(name, minter, ZERO_ADDRESS, false);
    await assertOwnership(name, registrantAddress);

    await custody.connect(registrant).safeTransfer(registrantAddress, node);

    await assertOwnership(name, registrantAddress, true);
  });

  it('should allow transfer parked domain by owner only', async () => {
    const name = 'ts-cwe2';
    const node = namehash(`${name}.eth`);
    await topupCustody(name);

    await registerAndParkName(name, minter, ZERO_ADDRESS, false);
    await assertOwnership(name, registrantAddress);

    await expect(custody.safeTransfer(registrantAddress, node)).to.be.revertedWith('Unauthorised');
  });

  it('should keep state after upgrade', async () => {
    const name = 'ts-nd24';
    const node = namehash(`${name}.eth`);
    await topupCustody(name);

    await registerAndParkName(name, minter, ZERO_ADDRESS, false);
    await assertOwnership(name, registrantAddress);

    custody = await upgrades.upgradeProxy(custody.address, custodyFactory);

    await assertOwnership(name, registrantAddress);
    expect(await custody.nonceOf(node)).to.be.equal(1);

    await custody.connect(registrant).safeTransfer(registrantAddress, node);
    expect(await custody.nonceOf(node)).to.be.equal(2);
  });
});
