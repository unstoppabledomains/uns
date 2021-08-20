const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai');

const { ZERO_ADDRESS } = require('./helpers/constants');

describe('MintingManager (proxy)', () => {
  let UNSRegistry, Resolver, MintingController, MintingManager;
  let unsRegistry, resolver, mintingController, mintingManager;
  let signers, coinbase;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    Resolver = await ethers.getContractFactory('Resolver');
    MintingController = await ethers.getContractFactory('MintingController');
    MintingManager = await ethers.getContractFactory('MintingManager');
  });

  beforeEach(async () => {
    unsRegistry = await UNSRegistry.deploy();

    mintingManager = await upgrades.deployProxy(MintingManager, [], { initializer: false });
    await unsRegistry.initialize(mintingManager.address);

    await mintingManager.initialize(unsRegistry.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await mintingManager.addMinter(coinbase.address);
    await mintingManager.setTokenURIPrefix('/');
  });

  it('should persist state after proxy upgrade', async () => {
    mintingController = await MintingController.deploy(ZERO_ADDRESS);
    resolver = await Resolver.deploy(ZERO_ADDRESS, mintingController.address);
    await mintingManager.setResolver(resolver.address);

    await upgrades.upgradeProxy(
      mintingManager.address,
      MintingManager,
      [unsRegistry.address, ZERO_ADDRESS, ZERO_ADDRESS],
      { initializer: 'initialize' },
    );

    expect(await mintingManager.cnsResolver()).to.be.equal(resolver.address);
  });

  it('should be possible to set resolver after proxy upgrade', async () => {
    expect(await mintingManager.cnsResolver()).to.be.equal(ZERO_ADDRESS);

    await upgrades.upgradeProxy(
      mintingManager.address,
      MintingManager,
      [unsRegistry.address, ZERO_ADDRESS, ZERO_ADDRESS],
      { initializer: 'initialize' },
    );

    mintingController = await MintingController.deploy(ZERO_ADDRESS);
    resolver = await Resolver.deploy(ZERO_ADDRESS, mintingController.address);
    await mintingManager.setResolver(resolver.address);

    expect(await mintingManager.cnsResolver()).to.be.equal(resolver.address);
  });
});
