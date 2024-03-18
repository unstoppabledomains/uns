import { ethers, network, upgrades } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { MintingManager, UNSRegistry } from '../types/contracts';
import { MintingManagerForwarder } from '../types/contracts/metatx';
import {
  MintingManager__factory,
  UNSRegistry__factory,
} from '../types/factories/contracts';
import { MintingManagerForwarder__factory } from '../types/factories/contracts/metatx';
import { ERC20Mock, ERC20Mock__factory } from '../types';
import { buildExecuteFunc, ExecuteFunc } from './helpers/metatx';
import { ZERO_ADDRESS } from './helpers/constants';

describe('MintingManager (metatx)', () => {
  let unsRegistry: UNSRegistry,
    mintingManager: MintingManager,
    forwarder: MintingManagerForwarder,
    buildExecuteParams: ExecuteFunc;
  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    receiver: SignerWithAddress;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, receiver] = signers;
  });

  beforeEach(async () => {
    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();

    mintingManager = (await upgrades.deployProxy(
      new MintingManager__factory(coinbase),
      [],
      { initializer: false },
    )) as MintingManager;
    await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

    forwarder = await new MintingManagerForwarder__factory(coinbase).deploy(
      mintingManager.address,
    );

    await mintingManager.initialize(
      unsRegistry.address,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      forwarder.address,
    );
    await mintingManager.addMinter(coinbase.address);
    await mintingManager.setTokenURIPrefix('/');

    buildExecuteParams = buildExecuteFunc(
      mintingManager.interface,
      mintingManager.address,
      forwarder,
    );
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

    const latestBlock = await ethers.provider.getBlock('latest');
    const expiry = latestBlock.timestamp + 24 * 60 * 60;

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
    const latestBlock = await ethers.provider.getBlock('latest');

    const expiry = latestBlock.timestamp + 24 * 60 * 60;

    await mintingManager.issueExpirableWithRecords(
      receiver.address,
      labels,
      [],
      [],
      expiry,
      true,
    );

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
    const latestBlock = await ethers.provider.getBlock('latest');

    const expiry = latestBlock.timestamp + 24 * 60 * 60;

    await mintingManager.issueExpirableWithRecords(
      receiver.address,
      labels,
      [],
      [],
      expiry,
      true,
    );

    const { req, signature } = await buildExecuteParams(
      'revoke(uint256)',
      [tokenId],
      coinbase,
      tokenId,
    );

    await forwarder.execute(req, signature);

    expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(mintingManager.address);
  });

  it('should be able to buy domain with ERC20 tokens', async () => {
    const latestBlock = await ethers.provider.getBlock('latest');
    const expiry = latestBlock.timestamp + 24 * 60 * 60;
    const price = ethers.utils.parseEther('5');

    const erc20Mock: ERC20Mock = await new ERC20Mock__factory(coinbase).deploy();
    await erc20Mock.mint(receiver.address, price);

    const labels = ['test-erc20-onchain-purchase-metatx', 'wallet'];
    const tokenId = await unsRegistry.namehash(labels);

    await erc20Mock.connect(receiver).approve(mintingManager.address, price);

    const purchaseHash = ethers.utils.arrayify(
      ethers.utils.solidityKeccak256(
        ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
        [mintingManager.address, network.config.chainId, receiver.address, tokenId, expiry, price, erc20Mock.address],
      ),
    );
    const signature = await coinbase.signMessage(purchaseHash);

    const metaTxParams = await buildExecuteParams(
      'buyForErc20(address,string[],string[],string[],uint64,address,uint256,bytes)',
      [receiver.address, labels, [], [], expiry, erc20Mock.address, price, signature],
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

    await expect(forwarder.execute(req, signature)).to.be.revertedWith(
      'MintingManager: CALLER_IS_NOT_MINTER',
    );
  });

  it('should revert execution when signature is not valid', async () => {
    const tokenId = await unsRegistry.namehash(['test-qw1341', 'wallet']);
    const { req, signature } = await buildExecuteParams(
      'issueWithRecords(address,string[],string[],string[],bool)',
      [receiver.address, ['test-qw1341', 'wallet'], [], [], true],
      coinbase,
      tokenId,
    );

    await expect(
      forwarder.execute({ ...req, from: receiver.address }, signature),
    ).to.be.revertedWith('MintingManagerForwarder: SIGNATURE_INVALID');
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

    await expect(forwarder.execute(req, signature)).to.be.revertedWith(
      'MintingManagerForwarder: SIGNATURE_INVALID',
    );
  });
});
