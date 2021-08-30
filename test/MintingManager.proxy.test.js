const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai');

const { ZERO_ADDRESS } = require('./helpers/constants');

describe('MintingManager (proxy)', () => {
  let UNSRegistry, Resolver, MintingController, MintingManagerV01, MintingManagerV02;
  let unsRegistry, resolver, mintingController, mintingManager;
  let signers, coinbase, minter;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, minter] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    Resolver = await ethers.getContractFactory('Resolver');
    MintingController = await ethers.getContractFactory('MintingController');
    MintingManagerV01 = await ethers.getContractFactory('MintingManagerV01');
    MintingManagerV02 = await ethers.getContractFactory('MintingManager');
  });

  beforeEach(async () => {
    unsRegistry = await UNSRegistry.deploy();

    mintingManager = await upgrades.deployProxy(MintingManagerV01, [], { initializer: false });
    await unsRegistry.initialize(mintingManager.address);

    await mintingManager.initialize(unsRegistry.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await mintingManager.addMinter(coinbase.address);
    await mintingManager.setTokenURIPrefix('/');
  });

  it('should persist state after proxy upgrade', async () => {
    mintingController = await MintingController.deploy(ZERO_ADDRESS);
    resolver = await Resolver.deploy(ZERO_ADDRESS, mintingController.address);
    await mintingManager.setResolver(resolver.address);

    await upgrades.upgradeProxy(mintingManager.address, MintingManagerV02);

    expect(await mintingManager.cnsResolver()).to.be.equal(resolver.address);
  });

  it('should be possible to set resolver after proxy upgrade', async () => {
    expect(await mintingManager.cnsResolver()).to.be.equal(ZERO_ADDRESS);

    await upgrades.upgradeProxy(mintingManager.address, MintingManagerV02);

    mintingController = await MintingController.deploy(ZERO_ADDRESS);
    resolver = await Resolver.deploy(ZERO_ADDRESS, mintingController.address);
    await mintingManager.setResolver(resolver.address);

    expect(await mintingManager.cnsResolver()).to.be.equal(resolver.address);
  });

  describe('MintingManager V01 -> V02', () => {
    it('revert removing minter in V01 version', async () => {
      await expect(
        mintingManager.removeMinter(ZERO_ADDRESS),
      ).to.be.revertedWith('AccessControl: can only renounce roles for self');
    });

    it('should keep main storage layout consistent after upgrade', async () => {
      await mintingManager.addMinter(minter.address);
      expect(await mintingManager.isMinter(minter.address)).to.be.equal(true);

      // NOTE: V01->V02 upgrade requires execution `transferOwnership(currentOwner)`
      // straight after upgrade in order to init DefaultAdmin role!
      mintingManager = await upgrades.upgradeProxy(mintingManager.address, MintingManagerV02);
      await mintingManager.transferOwnership(coinbase.address);

      expect(await mintingManager.isMinter(minter.address)).to.be.equal(true);

      await mintingManager.removeMinter(minter.address);
      expect(await mintingManager.isMinter(minter.address)).to.be.equal(false);
    });

    it('should have zero forwarder after upgrade', async () => {
      mintingManager = await upgrades.upgradeProxy(mintingManager.address, MintingManagerV02);

      expect(await mintingManager.isTrustedForwarder(ZERO_ADDRESS)).to.be.equal(true);
    });

    it('should be possible to set trusted forwarder', async () => {
      mintingManager = await upgrades.upgradeProxy(mintingManager.address, MintingManagerV02);
      await mintingManager.setForwarder(coinbase.address);

      expect(await mintingManager.isTrustedForwarder(coinbase.address)).to.be.equal(true);
    });
  });
});
