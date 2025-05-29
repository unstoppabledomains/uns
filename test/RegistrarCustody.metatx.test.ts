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
    registrarSigner: SignerWithAddress,
    user: SignerWithAddress,
    otherUser: SignerWithAddress;

  let unsRegistry: UNSRegistry;
  let mintingManager: MintingManager;
  let registrarCustody: RegistrarCustody;

  let provider: HardhatEthersProvider;
  let latestBlockTimestamp: number;

  let buildExecuteParams: ExecuteFunc;
  let result: unknown;
  const metaTxRegistrarId = BigInt(99);

  before(async () => {
    provider = ethers.provider;
    signers = await ethers.getSigners();
    [coinbase, registrarSigner, user, otherUser] = signers;

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

    await mintingManager.addMinter(await registrarCustody.getAddress());
    await registrarCustody.connect(coinbase).addAdmin(registrarSigner.address);
    await registrarCustody.connect(coinbase).addRegistrar(metaTxRegistrarId, registrarSigner.address);

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

  it('should tokenize domain via meta-transaction', async () => {
    const labels = ['test-custody-tokenize-meta', 'com'];
    const expiry = latestBlockTimestamp + 60 * 60 * 24;
    const tokenId = await unsRegistry.namehash(labels);

    const { req, signature } = await buildExecuteParams(
      'tokenizeDomain(string[],string[],string[],uint64,uint256,address)',
      [labels, ['key1'], ['value1'], expiry, metaTxRegistrarId, user.address],
      registrarSigner,
      tokenId,
      await registrarCustody.nonceOf(tokenId),
    );

    await expect(registrarCustody.execute(req, signature))
      .to.emit(registrarCustody, 'DomainTokenized')
      .withArgs(tokenId, metaTxRegistrarId, user.address);

    expect(await registrarCustody.nonceOf(tokenId)).to.be.equal(1);

    expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(await registrarCustody.getAddress());
    expect(await unsRegistry.get('key1', tokenId)).to.be.equal('value1');
    expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(expiry);

    expect(await registrarCustody.userDelegations(tokenId)).to.be.equal(user.address);
    expect(await registrarCustody.registrarDelegations(tokenId)).to.be.equal(metaTxRegistrarId);
  });

  it('should reject tokenizeDomain if signer is not authorized', async () => {
    const labels = ['test-custody-tokenize-unauth-meta', 'com'];
    const expiry = latestBlockTimestamp + 60 * 60 * 24;
    const tokenId = await unsRegistry.namehash(labels);

    const { req, signature } = await buildExecuteParams(
      'tokenizeDomain(string[],string[],string[],uint64,uint256,address)',
      [labels, ['key1'], ['value1'], expiry, metaTxRegistrarId, user.address],
      otherUser,
      tokenId,
      await registrarCustody.nonceOf(tokenId),
    );

    await expect(registrarCustody.execute(req, signature)).to.be.revertedWithCustomError(
      registrarCustody,
      'Unauthorized',
    );

    expect(await registrarCustody.nonceOf(tokenId)).to.be.equal(0);
  });

  it('should be able to revoke domain from custody via meta-transaction', async () => {
    const expiry = latestBlockTimestamp + 60 * 60 * 24;
    const labels = ['test-custody-revoke-meta', 'com'];
    const tokenId = await unsRegistry.namehash(labels);

    await registrarCustody
      .connect(registrarSigner)
      .tokenizeDomain(labels, ['key1'], ['value1'], expiry, metaTxRegistrarId, user.address);
    expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(await registrarCustody.getAddress());

    const nonce = await registrarCustody.nonceOf(tokenId);
    const { req, signature } = await buildExecuteParams('revoke(uint256)', [tokenId], registrarSigner, tokenId, nonce);

    await registrarCustody.execute(req, signature);

    expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(await mintingManager.getAddress());
    expect(await unsRegistry.get('key1', tokenId)).to.be.equal('');
    expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(expiry);

    expect(await registrarCustody.nonceOf(tokenId)).to.be.equal(nonce + BigInt(1));
  });

  it('should revert revoke if signer is not authorized', async () => {
    const expiry = latestBlockTimestamp + 60 * 60 * 24;
    const labels = ['test-custody-revoke-unauth-meta', 'com'];
    const tokenId = await unsRegistry.namehash(labels);

    await registrarCustody
      .connect(registrarSigner)
      .tokenizeDomain(labels, ['key1'], ['value1'], expiry, metaTxRegistrarId, user.address);

    const nonce = await registrarCustody.nonceOf(tokenId);
    const { req, signature } = await buildExecuteParams('revoke(uint256)', [tokenId], otherUser, tokenId, nonce);

    await expect(registrarCustody.execute(req, signature)).to.be.revertedWithCustomError(
      registrarCustody,
      'Unauthorized',
    );

    expect(await registrarCustody.nonceOf(tokenId)).to.be.equal(nonce);
  });
});
