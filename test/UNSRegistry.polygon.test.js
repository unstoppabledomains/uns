const { ethers } = require('hardhat');
const { expect } = require('chai');

const { TLD } = require('./helpers/constants');

const { utils } = ethers;

describe('UNSRegistry (polygon)', () => {
  let UNSRegistry, RootChainManager, MintableERC721Predicate, DummyStateSender;
  let l1UnsRegistry, l2UnsRegistry, rootChainManager, predicate, stateSender;
  let signers, tokenOwner, rcmOwner, predicateOwner, owner;

  const mintDomainL1 = async (label, owner) => {
    const tokenId = await l1UnsRegistry.childIdOf(TLD.CRYPTO, label);
    await l1UnsRegistry.mint(owner, tokenId, `${label}.crypto`);
    return tokenId;
  };

  before(async () => {
    signers = await ethers.getSigners();
    [tokenOwner, rcmOwner, predicateOwner, owner] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    RootChainManager = await ethers.getContractFactory('RootChainManager');
    MintableERC721Predicate = await ethers
      .getContractFactory('contracts/@maticnetwork/pos-portal/MintableERC721Predicate.sol:MintableERC721Predicate');
    DummyStateSender = await ethers.getContractFactory('DummyStateSender');

    l1UnsRegistry = (await UNSRegistry.deploy()).connect(tokenOwner);
    await l1UnsRegistry.initialize(tokenOwner.address);
    await l1UnsRegistry.mint('0xdead000000000000000000000000000000000000', TLD.CRYPTO, 'crypto');

    l2UnsRegistry = (await UNSRegistry.deploy()).connect(tokenOwner);
    await l2UnsRegistry.initialize(tokenOwner.address);

    // deploy state sender
    stateSender = await DummyStateSender.deploy();

    // deploy and init predicate
    predicate = (await MintableERC721Predicate.deploy()).connect(predicateOwner);
    await predicate.initialize(predicateOwner.address);

    // deploy and setup root chain manager
    rootChainManager = (await RootChainManager.deploy()).connect(rcmOwner);
    await rootChainManager.initialize(rcmOwner.address);
    await rootChainManager.setStateSender(stateSender.address);
    await rootChainManager.registerPredicate(utils.keccak256(l1UnsRegistry.address), predicate.address);
    await rootChainManager.mapToken(
      l1UnsRegistry.address,
      l2UnsRegistry.address,
      utils.keccak256(l1UnsRegistry.address),
    );
    await predicate.grantRole(await predicate.MANAGER_ROLE(), rootChainManager.address);

    // post-configuration
    await l1UnsRegistry.setRootChainManager(rootChainManager.address);
  });

  it('should revert when set RootChainManager multiple times', async () => {
    await expect(
      l1UnsRegistry.setRootChainManager(rootChainManager.address),
    ).to.be.revertedWith('Registry: ROOT_CHAIN_MANEGER_NOT_EMPTY');
  });

  describe('One-step deposit', () => {
    it('should deposit token through UNS registry', async () => {
      const tokenId = await mintDomainL1('poly-1d-as2', owner.address);

      await expect(l1UnsRegistry.connect(owner).depositToPolygon(tokenId))
        .to.emit(predicate, 'LockedMintableERC721')
        .withArgs(l1UnsRegistry.address, owner.address, l1UnsRegistry.address, tokenId);

      expect(await l1UnsRegistry.ownerOf(tokenId)).to.be.equal(predicate.address);
    });
  });

  describe('Two-steps deposit', () => {
    it('should deposit token', async () => {
      const tokenId = await mintDomainL1('poly-2d-aq1', owner.address);

      await l1UnsRegistry.connect(owner).approve(predicate.address, tokenId);

      const data = utils.defaultAbiCoder.encode(['uint256'], [tokenId]);
      await expect(rootChainManager.connect(owner).depositFor(owner.address, l1UnsRegistry.address, data))
        .to.emit(predicate, 'LockedMintableERC721')
        .withArgs(owner.address, owner.address, l1UnsRegistry.address, tokenId);

      expect(await l1UnsRegistry.ownerOf(tokenId)).to.be.equal(predicate.address);
    });
  });
});
