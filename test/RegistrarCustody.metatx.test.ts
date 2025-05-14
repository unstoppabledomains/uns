import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { HardhatEthersProvider } from '@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider';
import { deployProxy } from '../src/helpers';
import {
  MintingManager,
  MintingManager__factory,
  RegistrarCustody,
  RegistrarCustody__factory,
  UNSRegistry,
  UNSRegistry__factory,
} from '../types';
import { getLatestBlockTimestamp } from './helpers/utils';
import { ZERO_ADDRESS } from './helpers/constants';
import { buildExecuteFunc, ExecuteFunc } from './helpers/metatx';

describe('RegistrarCustody (metatx)', () => {
  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    minter: SignerWithAddress,
    user: SignerWithAddress,
    otherUser: SignerWithAddress;

  let unsRegistry: UNSRegistry;
  let mintingManager: MintingManager;
  let registrarCustody: RegistrarCustody;

  let provider: HardhatEthersProvider;
  let latestBlockTimestamp: number;

  let buildExecuteParams: ExecuteFunc;
  let result: unknown;

  before(async () => {
    provider = ethers.provider;
    signers = await ethers.getSigners();
    [coinbase, minter, user, otherUser] = signers;

    unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
    mintingManager = await new MintingManager__factory().connect(coinbase).deploy();
    await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

    await mintingManager.initialize(
      await unsRegistry.getAddress(),
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
    );
    await mintingManager.setTokenURIPrefix('/');
    await mintingManager.addTld('com', true);

    registrarCustody = await deployProxy(new RegistrarCustody__factory().connect(coinbase), [
      await unsRegistry.getAddress(),
      await mintingManager.getAddress(),
    ]);

    await mintingManager.addMinter(minter.address);
    await mintingManager.addMinter(await registrarCustody.getAddress());

    await registrarCustody.connect(coinbase).addMinter(minter.address);

    latestBlockTimestamp = await getLatestBlockTimestamp();

    buildExecuteParams = buildExecuteFunc(
      registrarCustody.interface,
      await registrarCustody.getAddress(),
      registrarCustody,
    );
  });

  beforeEach(async () => {
    result = await provider.send('evm_snapshot', []);
  });

  afterEach(async () => {
    await provider.send('evm_revert', [result]);
  });

  it('should register domain and place it in custody', async () => {
    const labels = ['test-registrar-custody-meta', 'com'];
    const expiry = latestBlockTimestamp + 60 * 60 * 24;
    const tokenId = await unsRegistry.namehash(labels);

    const { req, signature } = await buildExecuteParams(
      'registerDomain(address,string[],string[],string[],uint64)',
      [user.address, labels, ['key1'], ['value1'], expiry],
      minter,
      tokenId,
      await registrarCustody.nonceOf(tokenId),
    );

    await expect(registrarCustody.execute(req, signature))
      .to.emit(registrarCustody, 'DomainLocked')
      .withArgs(tokenId, user.address);

    expect(await registrarCustody.nonceOf(tokenId)).to.be.equal(1);

    expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(await registrarCustody.getAddress());
    expect(await unsRegistry.get('key1', tokenId)).to.be.equal('value1');
    expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(expiry);
    expect(await unsRegistry.reverseOf(user.address)).to.be.equal(0);

    expect(await registrarCustody.virtualOwners(tokenId)).to.be.equal(user.address);
  });

  it('should reject if signer is not minter', async () => {
    const labels = ['test-registrar-custody-meta', 'com'];
    const expiry = latestBlockTimestamp + 60 * 60 * 24;
    const tokenId = await unsRegistry.namehash(labels);

    const { req, signature } = await buildExecuteParams(
      'registerDomain(address,string[],string[],string[],uint64)',
      [user.address, labels, ['key1'], ['value1'], expiry],
      user,
      tokenId,
      await registrarCustody.nonceOf(tokenId),
    );

    await expect(registrarCustody.execute(req, signature)).to.rejectedWith('MinterRole: CALLER_IS_NOT_MINTER');

    expect(await registrarCustody.nonceOf(tokenId)).to.be.equal(0);
  });

  it('should be able to transfer domain', async () => {
    const expiry = latestBlockTimestamp + 60 * 60 * 24;
    const labels = ['test-registrar-custody-claim-meta', 'com'];
    const tokenId = await unsRegistry.namehash(labels);

    await registrarCustody.connect(minter).registerDomain(user.address, labels, ['key1'], ['value1'], expiry);

    const nonce = await registrarCustody.nonceOf(tokenId);
    const { req, signature } = await buildExecuteParams(
      'safeTransfer(address,uint256)',
      [user.address, tokenId],
      minter,
      tokenId,
      nonce,
    );

    await registrarCustody.execute(req, signature);

    expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(user.address);
    expect(await unsRegistry.get('key1', tokenId)).to.be.equal('value1');
    expect(await unsRegistry.reverseOf(user.address)).to.be.equal(0);
    expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(expiry);

    expect(await registrarCustody.nonceOf(tokenId)).to.be.equal(nonce + BigInt(1));
  });

  it('should revert transfering domain if not mitner', async () => {
    const expiry = latestBlockTimestamp + 60 * 60 * 24;
    const labels = ['test-registrar-custody-claim-meta-not-owner', 'com'];
    const tokenId = await unsRegistry.namehash(labels);

    await registrarCustody.connect(minter).registerDomain(user.address, labels, ['key1'], ['value1'], expiry);

    const nonce = await registrarCustody.nonceOf(tokenId);
    const { req, signature } = await buildExecuteParams(
      'safeTransfer(address,uint256)',
      [user.address, tokenId],
      user,
      tokenId,
      nonce,
    );

    await expect(registrarCustody.execute(req, signature)).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');

    expect(await registrarCustody.nonceOf(tokenId)).to.be.equal(nonce);
  });

  it('should revert transferring domain if token is not valid', async () => {
    const expiry = latestBlockTimestamp + 60 * 60 * 24;
    const labels = ['test-registrar-custody-claim-meta-not-owner', 'com'];
    const tokenId = await unsRegistry.namehash(labels);

    await registrarCustody.connect(minter).registerDomain(user.address, labels, ['key1'], ['value1'], expiry);

    const { req, signature } = await buildExecuteParams(
      'safeTransfer(address,uint256)',
      [user.address, tokenId],
      minter,
      1,
      await registrarCustody.nonceOf(1),
    );

    await expect(registrarCustody.execute(req, signature)).to.be.revertedWithCustomError(
      registrarCustody,
      'InvalidForwardedToken',
    );
  });
});
