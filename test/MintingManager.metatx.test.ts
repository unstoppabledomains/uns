import { ethers, network } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { getBytes, parseEther, solidityPackedKeccak256 } from 'ethers';
import { MintingManager, UNSRegistry } from '../types/contracts';
import { MintingManagerForwarder } from '../types/contracts/metatx';
import { MintingManager__factory, UNSRegistry__factory } from '../types/factories/contracts';
import { MintingManagerForwarder__factory } from '../types/factories/contracts/metatx';
import { ERC20Mock, ERC20Mock__factory } from '../types';
import { deployProxy } from '../src/helpers';
import { buildExecuteFunc, ExecuteFunc } from './helpers/metatx';
import { ZERO_ADDRESS } from './helpers/constants';
import { getLatestBlockTimestamp } from './helpers/utils';

describe('MintingManager (metatx)', () => {
  let unsRegistry: UNSRegistry,
    mintingManager: MintingManager,
    forwarder: MintingManagerForwarder,
    buildExecuteParams: ExecuteFunc;
  let signers: SignerWithAddress[], coinbase: SignerWithAddress, receiver: SignerWithAddress;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, receiver] = signers;
  });

  beforeEach(async () => {
    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();

    mintingManager = await deployProxy(new MintingManager__factory(coinbase), [], { initializer: false });
    await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

    forwarder = await new MintingManagerForwarder__factory(coinbase).deploy(await mintingManager.getAddress());

    await mintingManager.initialize(
      await unsRegistry.getAddress(),
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      await forwarder.getAddress(),
    );
    await mintingManager.addMinter(await coinbase.getAddress());
    await mintingManager.setTokenURIPrefix('/');

    buildExecuteParams = buildExecuteFunc(mintingManager.interface, await mintingManager.getAddress(), forwarder);
  });

  it('should mint through forwarder', async () => {
    const tokenId = await unsRegistry.namehash(['test-qw11', 'wallet']);
    const { req, signature } = await buildExecuteParams(
      'issueWithRecords(address,string[],string[],string[],bool)',
      [receiver.address, ['test-qw11', 'wallet'], [], [], true],
      coinbase,
      tokenId,
    );

    await forwarder.execute(req, signature);

    expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
  });

  it('should mint expirable trough forwarder', async () => {
    const labels = ['test-qw123-expirable', 'com'];
    const tokenId = await unsRegistry.namehash(labels);

    const expiry = (await getLatestBlockTimestamp()) + 24 * 60 * 60;

    const { req, signature } = await buildExecuteParams(
      'issueExpirableWithRecords(address,string[],string[],string[],uint64,bool)',
      [receiver.address, labels, [], [], expiry, true],
      coinbase,
      tokenId,
    );

    await forwarder.execute(req, signature);

    expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
    expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(expiry);
  });

  it('should renew expirable through forwarder', async () => {
    const labels = ['test-qw123-expirable-renew', 'com'];
    const tokenId = await unsRegistry.namehash(labels);

    const expiry = (await getLatestBlockTimestamp()) + 24 * 60 * 60;

    await mintingManager.issueExpirableWithRecords(receiver.address, labels, [], [], expiry, true);

    const newExpiry = expiry + 24 * 60 * 60;

    const { req, signature } = await buildExecuteParams(
      'renew(uint64,uint256)',
      [newExpiry, tokenId],
      coinbase,
      tokenId,
    );

    await forwarder.execute(req, signature);

    expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(newExpiry);
  });

  it('should revoke expirable through forwarder', async () => {
    const labels = ['test-qw123-expirable-revoke', 'com'];
    const tokenId = await unsRegistry.namehash(labels);

    const expiry = (await getLatestBlockTimestamp()) + 24 * 60 * 60;

    await mintingManager.issueExpirableWithRecords(receiver.address, labels, [], [], expiry, true);

    const { req, signature } = await buildExecuteParams('revoke(uint256)', [tokenId], coinbase, tokenId);

    await forwarder.execute(req, signature);

    expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(await mintingManager.getAddress());
  });

  it('should be able to buy domain with ERC20 tokens', async () => {
    const expiry = (await getLatestBlockTimestamp()) + 24 * 60 * 60;
    const price = parseEther('5');

    const erc20Mock: ERC20Mock = await new ERC20Mock__factory(coinbase).deploy();
    await erc20Mock.mint(receiver.address, price);

    const labels = ['test-erc20-onchain-purchase-metatx', 'wallet'];
    const tokenId = await unsRegistry.namehash(labels);

    await erc20Mock.connect(receiver).approve(await mintingManager.getAddress(), price);

    const purchaseHash = getBytes(
      solidityPackedKeccak256(
        ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
        [
          await mintingManager.getAddress(),
          network.config.chainId,
          receiver.address,
          tokenId,
          expiry,
          price,
          await erc20Mock.getAddress(),
        ],
      ),
    );
    const signature = await coinbase.signMessage(purchaseHash);

    const metaTxParams = await buildExecuteParams(
      'buyForErc20(address,string[],string[],string[],uint64,address,uint256,bytes)',
      [receiver.address, labels, [], [], expiry, await erc20Mock.getAddress(), price, signature],
      receiver,
      tokenId,
    );

    await forwarder.execute(metaTxParams.req, metaTxParams.signature);

    expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
  });

  it('should revert forwarding when forwarder not trusted', async () => {
    const tokenId = await unsRegistry.namehash(['test-qw11', 'wallet']);
    const { req, signature } = await buildExecuteParams(
      'issueWithRecords(address,string[],string[],string[],bool)',
      [receiver.address, ['test-qw11', 'wallet'], [], [], true],
      coinbase,
      tokenId,
    );

    await mintingManager.setForwarder(ZERO_ADDRESS);

    await expect(forwarder.execute(req, signature)).to.be.revertedWith('MintingManager: CALLER_IS_NOT_MINTER');
  });

  it('should revert execution when signature is not valid', async () => {
    const tokenId = await unsRegistry.namehash(['test-qw1341', 'wallet']);
    const { req, signature } = await buildExecuteParams(
      'issueWithRecords(address,string[],string[],string[],bool)',
      [receiver.address, ['test-qw1341', 'wallet'], [], [], true],
      coinbase,
      tokenId,
    );

    await expect(forwarder.execute({ ...req, from: receiver.address }, signature)).to.be.revertedWith(
      'MintingManagerForwarder: SIGNATURE_INVALID',
    );
  });

  it('should revert execution when used signature', async () => {
    const tokenId = await unsRegistry.namehash(['test-qw1341', 'wallet']);
    const { req, signature } = await buildExecuteParams(
      'issueWithRecords(address,string[],string[],string[],bool)',
      [receiver.address, ['test-qw1341', 'wallet'], [], [], true],
      coinbase,
      tokenId,
    );

    await forwarder.execute(req, signature);

    await expect(forwarder.execute(req, signature)).to.be.revertedWith('MintingManagerForwarder: SIGNATURE_INVALID');
  });
});
