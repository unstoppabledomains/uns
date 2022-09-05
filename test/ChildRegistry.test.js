const { ethers } = require('hardhat');
const { expect } = require('chai');

const { TLD, ZERO_ADDRESS } = require('./helpers/constants');

const { utils } = ethers;

describe('ChildRegistry', () => {
  let UNSRegistry, MintingManager, RootChainManager, MintableERC721Predicate, DummyStateSender;
  let l1UnsRegistry, l2UnsRegistry, mintingManager, rootChainManager, predicate, stateSender;
  let registryOwner, rcmOwner, predicateOwner, owner;

  const abiCoder = new utils.AbiCoder();

  const mintDomainL2 = async (owner, tld, label) => {
    const tokenId = await l2UnsRegistry.childIdOf(tld, label);
    await mintingManager['mintSLD(address,uint256,string)'](owner, tld, label);
    return tokenId;
  };

  before(async () => {
    [registryOwner, rcmOwner, predicateOwner, owner] = await ethers.getSigners();

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    MintingManager = await ethers.getContractFactory('MintingManager');
    RootChainManager = await ethers.getContractFactory('RootChainManager');
    MintableERC721Predicate = await ethers
      .getContractFactory('contracts/@maticnetwork/pos-portal/MintableERC721Predicate.sol:MintableERC721Predicate');
    DummyStateSender = await ethers.getContractFactory('DummyStateSender');

    l1UnsRegistry = (await UNSRegistry.deploy()).connect(registryOwner);

    mintingManager = await MintingManager.deploy();

    l2UnsRegistry = (await UNSRegistry.deploy()).connect(registryOwner);
    await l2UnsRegistry.initialize(mintingManager.address);
    await l2UnsRegistry.setChildChainManager(registryOwner.address);

    await mintingManager.initialize(
      l2UnsRegistry.address,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS);
    await mintingManager.addMinter(registryOwner.address);

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

  describe('Management of childChainManager', async () => {
    let tempL2UnsRegistry;

    beforeEach(async () => {
      tempL2UnsRegistry = (await UNSRegistry.deploy()).connect(registryOwner);
      await tempL2UnsRegistry.initialize(registryOwner.address);
    });

    it('should revert when childChainManager is empty', async () => {
      const tokenId = await tempL2UnsRegistry.childIdOf(TLD.CRYPTO, 'l2-te1');

      await expect(
        tempL2UnsRegistry.deposit(owner.address, abiCoder.encode(['uint256'], [tokenId])),
      ).to.be.revertedWith('Registry: INSUFFICIENT_PERMISSIONS');
    });

    it('should revert when insufficient permissions', async () => {
      const tokenId = await tempL2UnsRegistry.childIdOf(TLD.CRYPTO, 'l2-te2');
      await tempL2UnsRegistry.setChildChainManager(registryOwner.address);

      await expect(
        tempL2UnsRegistry.connect(owner).deposit(owner.address, abiCoder.encode(['uint256'], [tokenId])),
      ).to.be.revertedWith('Registry: INSUFFICIENT_PERMISSIONS');
    });

    it('should revert setChildChainManager when childChainManager defined', async () => {
      await tempL2UnsRegistry.setChildChainManager(registryOwner.address);

      await expect(
        tempL2UnsRegistry.setChildChainManager(registryOwner.address),
      ).to.be.revertedWith('Registry: CHILD_CHAIN_MANEGER_NOT_EMPTY');
    });
  });

  describe('Deposit', () => {
    it('should deposit one token', async () => {
      const tokenId = await l2UnsRegistry.childIdOf(TLD.CRYPTO, 'l2-aq1');

      await expect(l2UnsRegistry.deposit(owner.address, abiCoder.encode(['uint256'], [tokenId])))
        .to.emit(l2UnsRegistry, 'Transfer')
        .withArgs(ZERO_ADDRESS, owner.address, tokenId);
      expect(await l2UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
    });

    it('should deposit multiple tokens', async () => {
      const tokenId1 = await l2UnsRegistry.childIdOf(TLD.CRYPTO, 'l2-eq1');
      const tokenId2 = await l2UnsRegistry.childIdOf(TLD.CRYPTO, 'l2-eq2');

      await expect(l2UnsRegistry.deposit(owner.address, abiCoder.encode(['uint256[]'], [[tokenId1, tokenId2]])))
        .to.emit(l2UnsRegistry, 'Transfer')
        .withArgs(ZERO_ADDRESS, owner.address, tokenId1);
      expect(await l2UnsRegistry.ownerOf(tokenId1)).to.be.equal(owner.address);
      expect(await l2UnsRegistry.ownerOf(tokenId2)).to.be.equal(owner.address);
    });
  });

  describe('Withdraw', () => {
    it('should revert withdraw when token is not exists', async () => {
      const tokenId = await l2UnsRegistry.childIdOf(TLD.CRYPTO, 'l2-aq1-revert');

      await expect(
        l2UnsRegistry.withdraw(tokenId),
      ).to.be.revertedWith('ERC721: invalid token ID');
    });

    it('should revert withdraw when called by non-owner', async () => {
      const tokenId = await mintDomainL2(owner.address, TLD.CRYPTO, 'l2-bq1-revert');
      expect(await l2UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);

      await expect(
        l2UnsRegistry.withdraw(tokenId),
      ).to.be.revertedWith('Registry: INVALID_TOKEN_OWNER');
    });

    it('should withdraw a token', async () => {
      const tokenId = await mintDomainL2(owner.address, TLD.CRYPTO, 'l2-bq1');
      expect(await l2UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);

      await expect(l2UnsRegistry.connect(owner).withdraw(tokenId))
        .to.emit(l2UnsRegistry, 'Transfer')
        .withArgs(owner.address, ZERO_ADDRESS, tokenId);

      await expect(l2UnsRegistry.ownerOf(tokenId))
        .to.be.revertedWith('ERC721: invalid token ID');
    });

    it('should revert if tokenId is upgraded', async () => {
      const tokenId = await mintDomainL2(owner.address, TLD.CRYPTO, 'l2-upgraded-bw-revert-test');
      expect(await l2UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);

      await mintingManager.upgradeAll([tokenId]);

      await expect(
        l2UnsRegistry.connect(owner).withdraw(tokenId),
      ).to.be.revertedWith('Registry: TOKEN_UPGRADED');
    });

    it('should revert batch withdraw when token is not exists', async () => {
      const tokenId1 = await l2UnsRegistry.childIdOf(TLD.CRYPTO, 'l2-aq2-revert');
      const tokenId2 = await l2UnsRegistry.childIdOf(TLD.CRYPTO, 'l2-ad2-revert');

      await expect(
        l2UnsRegistry.withdrawBatch([tokenId1, tokenId2]),
      ).to.be.revertedWith('ERC721: invalid token ID');
    });

    it('should revert batch withdraw when exceeds batch limit', async () => {
      const tokens = [];
      for (let i = 0; i < 21; i++) {
        tokens.push(await l2UnsRegistry.childIdOf(TLD.CRYPTO, `l2-${i}-revert`));
      }

      await expect(
        l2UnsRegistry.withdrawBatch(tokens),
      ).to.be.revertedWith('Registry: EXCEEDS_BATCH_LIMIT');
    });

    it('should revert batch withdraw when called by non-owner', async () => {
      const tokenId1 = await mintDomainL2(owner.address, TLD.CRYPTO, 'l2-bq2-revert');
      const tokenId2 = await mintDomainL2(owner.address, TLD.CRYPTO, 'l2-bb2-revert');
      expect(await l2UnsRegistry.ownerOf(tokenId1)).to.be.equal(owner.address);
      expect(await l2UnsRegistry.ownerOf(tokenId2)).to.be.equal(owner.address);

      await expect(
        l2UnsRegistry.withdrawBatch([tokenId1, tokenId2]),
      ).to.be.revertedWith('Registry: INVALID_TOKEN_OWNER');
    });

    it('should revert batch withdraw if tokenId is upgraded', async () => {
      const tokenId1 = await mintDomainL2(owner.address, TLD.CRYPTO, 'l2-upgraded-bw-revert');
      const tokenId2 = await mintDomainL2(owner.address, TLD.CRYPTO, 'l2-upgraded-bw-revert-2');
      expect(await l2UnsRegistry.ownerOf(tokenId1)).to.be.equal(owner.address);
      expect(await l2UnsRegistry.ownerOf(tokenId2)).to.be.equal(owner.address);

      await mintingManager.upgradeAll([tokenId2]);

      await expect(
        l2UnsRegistry.connect(owner).withdrawBatch([tokenId1, tokenId2]),
      ).to.be.revertedWith('Registry: TOKEN_UPGRADED');
    });

    it('should batch withdraw multiple tokens', async () => {
      const tokenId1 = await mintDomainL2(owner.address, TLD.CRYPTO, 'l2-bq2');
      const tokenId2 = await mintDomainL2(owner.address, TLD.CRYPTO, 'l2-bb2');
      expect(await l2UnsRegistry.ownerOf(tokenId1)).to.be.equal(owner.address);
      expect(await l2UnsRegistry.ownerOf(tokenId2)).to.be.equal(owner.address);

      await expect(l2UnsRegistry.connect(owner).withdrawBatch([tokenId1, tokenId2]))
        .to.emit(l2UnsRegistry, 'Transfer')
        .withArgs(owner.address, ZERO_ADDRESS, tokenId1);

      await expect(l2UnsRegistry.ownerOf(tokenId1))
        .to.be.revertedWith('ERC721: invalid token ID');
      await expect(l2UnsRegistry.ownerOf(tokenId2))
        .to.be.revertedWith('ERC721: invalid token ID');
    });

    it('should revert withdraw with matadata when token is not exists', async () => {
      const tokenId = await l2UnsRegistry.childIdOf(TLD.CRYPTO, 'l2-am1-revert');

      await expect(
        l2UnsRegistry.withdrawWithMetadata(tokenId),
      ).to.be.revertedWith('ERC721: invalid token ID');
    });

    it('should revert withdraw when called by non-owner', async () => {
      const tokenId = await mintDomainL2(owner.address, TLD.CRYPTO, 'l2-bm1-revert');
      expect(await l2UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);

      await expect(
        l2UnsRegistry.withdrawWithMetadata(tokenId),
      ).to.be.revertedWith('Registry: INVALID_TOKEN_OWNER');
    });

    it('should revert withdraw with metadata if tokenId is upgraded', async () => {
      const tokenId = await mintDomainL2(owner.address, TLD.CRYPTO, 'l2-depreacted-wm-revert');
      expect(await l2UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);

      await mintingManager.upgradeAll([tokenId]);

      await expect(
        l2UnsRegistry.connect(owner).withdrawWithMetadata(tokenId),
      ).to.be.revertedWith('Registry: TOKEN_UPGRADED');
    });

    it('should withdraw a token', async () => {
      const tokenId = await mintDomainL2(owner.address, TLD.CRYPTO, 'l2-bm1');
      expect(await l2UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);

      await expect(l2UnsRegistry.connect(owner).withdrawWithMetadata(tokenId))
        .to.emit(l2UnsRegistry, 'Transfer')
        .withArgs(owner.address, ZERO_ADDRESS, tokenId);

      await expect(l2UnsRegistry.ownerOf(tokenId))
        .to.be.revertedWith('ERC721: invalid token ID');
    });
  });
});
