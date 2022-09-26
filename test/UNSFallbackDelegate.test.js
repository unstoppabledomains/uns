const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai');

const { TLD, DEAD_ADDRESS } = require('./helpers/constants');
const { mintDomain } = require('./helpers/registry');

describe('UNSFallbackDelegate', () => {
  let UNSRegistry, UNSFallbackDelegate;
  let unsRegistry, unsFallbackDelegate;
  let signers, coinbase, owner;

  const root = TLD.CRYPTO;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    UNSFallbackDelegate = await ethers.getContractFactory(
      'UNSFallbackDelegate',
    );
  });

  it('should in direct mode', async () => {
    // arrange
    unsRegistry = await UNSRegistry.deploy();
    await unsRegistry.initialize(coinbase.address);
    await unsRegistry['mint(address,uint256,string)'](
      DEAD_ADDRESS,
      root,
      'wallet',
    );
    await unsRegistry.setTokenURIPrefix('/');

    unsFallbackDelegate = await UNSFallbackDelegate.deploy();
    await unsRegistry.addFallbackDelegate(unsFallbackDelegate.address);

    const tokenId = await mintDomain(
      unsRegistry,
      owner,
      TLD.WALLET,
      'fal_del_1',
    );
    const _unsRegistry = new ethers.Contract(unsRegistry.address, [
      ...unsRegistry.interface.fragments,
      'function foo(uint256)',
      'event Foo(uint256 indexed)',
    ]).connect(owner);

    // act-assert
    await expect(_unsRegistry['foo(uint256)'](tokenId))
      .to.emit(_unsRegistry, 'Foo')
      .withArgs(tokenId.toString());
  });

  it('should in proxy mode', async () => {
    // arrange
    unsRegistry = await upgrades.deployProxy(UNSRegistry, [coinbase.address], {
      initializer: 'initialize',
      unsafeAllow: ['delegatecall'],
    });
    await unsRegistry['mint(address,uint256,string)'](
      DEAD_ADDRESS,
      root,
      'wallet',
    );
    await unsRegistry.setTokenURIPrefix('/');

    unsFallbackDelegate = await UNSFallbackDelegate.deploy();
    await unsRegistry.addFallbackDelegate(unsFallbackDelegate.address);

    const tokenId = await mintDomain(
      unsRegistry,
      owner,
      TLD.WALLET,
      'fal_del_2',
    );
    const _unsRegistry = new ethers.Contract(unsRegistry.address, [
      ...unsRegistry.interface.fragments,
      'function foo(uint256)',
      'event Foo(uint256 indexed)',
    ]).connect(owner);

    // act-assert
    await expect(_unsRegistry['foo(uint256)'](tokenId))
      .to.emit(_unsRegistry, 'Foo')
      .withArgs(tokenId.toString());
  });
});
