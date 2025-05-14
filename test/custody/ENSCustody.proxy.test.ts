import { ethers, upgrades } from 'hardhat';
import { expect } from 'chai';
import { sha3 } from 'web3-utils';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { namehash } from 'ethers';
import {
  BaseRegistrarImplementation,
  BaseRegistrarImplementation__factory,
  DummyOracle__factory,
  ENSCustody,
  ENSCustody__factory,
  ENSRegistry,
  ENSRegistry__factory,
  ETHRegistrarController,
  ETHRegistrarController__factory,
  NameWrapper,
  NameWrapper__factory,
  ReverseRegistrar,
  ReverseRegistrar__factory,
  StablePriceOracle,
  StablePriceOracle__factory,
} from '../../types';
import { REGISTRATION_TIME, ZERO_ADDRESS, ZERO_WORD } from '../helpers/constants';
import { getLatestBlockTimestamp, increaseTimeBy } from '../helpers/utils';
import { deployProxy } from '../../src/helpers';

describe('ENSCustody (proxy)', function () {
  let ens: ENSRegistry;
  let baseRegistrar: BaseRegistrarImplementation;
  let controller: ETHRegistrarController;
  let priceOracle: StablePriceOracle;
  let reverseRegistrar: ReverseRegistrar;
  let nameWrapper: NameWrapper;
  let custodyFactory: ENSCustody__factory;
  let custody: ENSCustody;

  const secret = '0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF';

  let signers: SignerWithAddress[], owner: SignerWithAddress, registrant: SignerWithAddress, minter: SignerWithAddress;
  let ownerAddress: string, registrantAddress: string;
  let result: unknown;

  async function registerAndParkName (
    name: string,
    minter: SignerWithAddress,
    resolver = ZERO_ADDRESS,
    selfCustody = false,
    txOptions = {},
  ) {
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
    const timestamp = await getLatestBlockTimestamp();
    expect(await controller.commitments(commitment)).to.equal(timestamp);

    await increaseTimeBy(await controller.minCommitmentAge());

    // register
    const registerTx = await custody
      .connect(minter)
      .register(name, registrantAddress, REGISTRATION_TIME, secret, resolver, [], false, 0, selfCustody, txOptions);
    return [commitTx, registerTx];
  }

  async function topupCustody (name: string) {
    const [base, premium] = await controller.rentPrice(name, REGISTRATION_TIME);
    const price = base + premium;
    await owner.sendTransaction({ to: await custody.getAddress(), value: price });
    return price;
  }

  async function assertOwnership (name: string, owner: string, selfCustody = false) {
    const tokenId = sha3(name)!;
    const node = namehash(`${name}.eth`);

    expect(await controller.available(name)).to.equal(false);
    expect(await ens.owner(node)).to.equal(await nameWrapper.getAddress());
    expect(await baseRegistrar.ownerOf(tokenId)).to.equal(await nameWrapper.getAddress());

    if (selfCustody) {
      expect(await nameWrapper.ownerOf(node)).to.equal(owner);
    } else {
      expect(await nameWrapper.ownerOf(node)).to.equal(await custody.getAddress());
      expect(await custody.ownerOf(node)).to.equal(owner);
    }
  }

  before(async () => {
    signers = await ethers.getSigners();
    [owner, registrant, minter] = signers;
    ownerAddress = await owner.getAddress();
    registrantAddress = await registrant.getAddress();

    ens = await new ENSRegistry__factory().connect(owner).deploy();
    baseRegistrar = await new BaseRegistrarImplementation__factory()
      .connect(owner)
      .deploy(await ens.getAddress(), namehash('eth'));
    reverseRegistrar = await new ReverseRegistrar__factory().connect(owner).deploy(await ens.getAddress());

    await ens.setSubnodeOwner(ZERO_WORD, sha3('reverse')!, ownerAddress);
    await ens.setSubnodeOwner(namehash('reverse'), sha3('addr')!, await reverseRegistrar.getAddress());

    nameWrapper = await new NameWrapper__factory()
      .connect(owner)
      .deploy(await ens.getAddress(), await baseRegistrar.getAddress(), ownerAddress);

    await ens.setSubnodeOwner(ZERO_WORD, sha3('eth')!, await baseRegistrar.getAddress());

    const dummyOracle = await new DummyOracle__factory().connect(owner).deploy('100000000');
    priceOracle = await new StablePriceOracle__factory()
      .connect(owner)
      .deploy(await dummyOracle.getAddress(), [0, 0, 4, 2, 1]);
    controller = await new ETHRegistrarController__factory()
      .connect(owner)
      .deploy(
        await baseRegistrar.getAddress(),
        await priceOracle.getAddress(),
        600,
        86400,
        await reverseRegistrar.getAddress(),
        await nameWrapper.getAddress(),
        await ens.getAddress(),
      );
    await nameWrapper.setController(await controller.getAddress(), true);
    await baseRegistrar.addController(await nameWrapper.getAddress());
    await reverseRegistrar.setController(await controller.getAddress(), true);

    custodyFactory = new ENSCustody__factory().connect(owner);
    custody = await deployProxy(custodyFactory, [], { initializer: false });
    await custody.initialize(
      await controller.getAddress(),
      await nameWrapper.getAddress(),
      await baseRegistrar.getAddress(),
    );
    await custody.addMinter(minter.address);
  });

  beforeEach(async () => {
    result = await ethers.provider.send('evm_snapshot', []);
  });
  afterEach(async () => {
    await ethers.provider.send('evm_revert', [result]);
  });

  it('should not allow initialize twice', async () => {
    await expect(
      custody.initialize(
        await controller.getAddress(),
        await nameWrapper.getAddress(),
        await baseRegistrar.getAddress(),
      ),
    ).to.be.revertedWith('Initializable: contract is already initialized');
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

    await expect(custody.safeTransfer(registrantAddress, node)).to.be.revertedWithCustomError(custody, 'Unauthorised');
  });

  it('should keep state after upgrade', async () => {
    const name = 'ts-nd24';
    const node = namehash(`${name}.eth`);
    await topupCustody(name);

    await registerAndParkName(name, minter, ZERO_ADDRESS, false);
    await assertOwnership(name, registrantAddress);

    custody = (await upgrades.upgradeProxy(await custody.getAddress(), custodyFactory)) as unknown as ENSCustody;

    await assertOwnership(name, registrantAddress);
    expect(await custody.nonceOf(node)).to.be.equal(1);

    await custody.connect(registrant).safeTransfer(registrantAddress, node);
    expect(await custody.nonceOf(node)).to.be.equal(2);
  });
});
