import { ethers } from 'hardhat';
import { expect } from 'chai';
import { namehash, Wallet } from 'ethers';
import { sha3 } from 'web3-utils';
import { HardhatEthersProvider } from '@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
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
import { ExecuteFunc, buildExecuteFunc } from '../helpers/metatx';
import { increaseTimeBy } from '../helpers/utils';
import { deployProxy } from '../../src/helpers';

describe('ENSCustody (metatx)', function () {
  let provider: HardhatEthersProvider;
  let ens: ENSRegistry;
  let baseRegistrar: BaseRegistrarImplementation;
  let controller: ETHRegistrarController;
  let priceOracle: StablePriceOracle;
  let reverseRegistrar: ReverseRegistrar;
  let nameWrapper: NameWrapper;
  let custody: ENSCustody;

  const secret = '0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF';

  let buildExecuteParams: ExecuteFunc;
  let signers: SignerWithAddress[], owner: SignerWithAddress, registrant: SignerWithAddress, spender: SignerWithAddress;
  let minter: Wallet;
  let ownerAddress: string, registrantAddress: string;
  let result: unknown;

  async function registerAndParkName (
    name: string,
    minter: Wallet,
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
    const block = await provider.getBlock(commitTx.blockNumber!);
    const { timestamp } = block!;
    expect(await controller.commitments(commitment)).to.equal(timestamp);

    await increaseTimeBy(await controller.minCommitmentAge());

    // register
    const tokenId = namehash(`${name}.eth`);
    const { req, signature } = await buildExecuteParams(
      'register(string,address,uint256,bytes32,address,bytes[],bool,uint16,bool)',
      [name, registrantAddress, REGISTRATION_TIME, secret, resolver, [], false, 0, selfCustody],
      minter,
      tokenId,
      BigInt(0),
    );
    const registerTx = await custody.connect(spender).execute(req, signature, txOptions);
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
    provider = ethers.provider;
    signers = await ethers.getSigners();
    [owner, registrant, spender] = signers;
    ownerAddress = await owner.getAddress();
    registrantAddress = await registrant.getAddress();
    minter = new ethers.Wallet('0x' + '1'.repeat(64), provider);

    ens = await new ENSRegistry__factory(owner).deploy();
    baseRegistrar = await new BaseRegistrarImplementation__factory(owner).deploy(
      await ens.getAddress(),
      namehash('eth'),
    );
    reverseRegistrar = await new ReverseRegistrar__factory(owner).deploy(await ens.getAddress());

    await ens.setSubnodeOwner(ZERO_WORD, sha3('reverse')!, ownerAddress);
    await ens.setSubnodeOwner(namehash('reverse'), sha3('addr')!, await reverseRegistrar.getAddress());

    nameWrapper = await new NameWrapper__factory(owner).deploy(
      await ens.getAddress(),
      await baseRegistrar.getAddress(),
      ownerAddress,
    );

    await ens.setSubnodeOwner(ZERO_WORD, sha3('eth')!, await baseRegistrar.getAddress());

    const dummyOracle = await new DummyOracle__factory(owner).deploy('100000000');
    priceOracle = await new StablePriceOracle__factory(owner).deploy(await dummyOracle.getAddress(), [0, 0, 4, 2, 1]);
    controller = await new ETHRegistrarController__factory(owner).deploy(
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

    custody = await deployProxy<ENSCustody>(new ENSCustody__factory(owner), [
      await controller.getAddress(),
      await nameWrapper.getAddress(),
      await baseRegistrar.getAddress(),
    ]);
    await custody.addMinter(minter.address);

    buildExecuteParams = buildExecuteFunc(custody.interface, await custody.getAddress(), custody);
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

    await expect(custody.connect(spender).execute(req, signature)).to.be.revertedWithCustomError(
      custody,
      'Unauthorised',
    );
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
      BigInt(42),
    );
    await expect(custody.connect(spender).execute(req, signature)).to.be.revertedWithCustomError(
      custody,
      'InvalidSignature',
    );
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
    await expect(custody.connect(spender).execute(req, signature)).to.be.revertedWithCustomError(
      custody,
      'Unauthorised',
    );
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
    await expect(custody.connect(spender).execute(req, signature)).to.be.revertedWithCustomError(
      custody,
      'InvalidForwardedToken',
    );
  });
});
