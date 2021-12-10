const { ethers } = require('hardhat');
const { expect } = require('chai');

const { TLD, ZERO_ADDRESS } = require('./helpers/constants');
const { sign } = require('./helpers/metatx');

const { utils } = ethers;

describe.only('UNSRegistry (polygon)', () => {
  let UNSRegistry, CNSRegistry, Resolver, MintingController, URIPrefixController, SignatureController,
    MintingManager, RootChainManager, MintableERC721Predicate, DummyStateSender;
  let l1UnsRegistry, l2UnsRegistry, cnsRegistry, resolver, mintingController, uriPrefixController,
    signatureController, mintingManager, rootChainManager, predicate, stateSender;
  let signers, tokenOwner, rcmOwner, predicateOwner, owner;

  const mintDomainL1 = async (owner, tld, label) => {
    await mintingManager.mintSLD(owner, tld, label);
    return await l1UnsRegistry.childIdOf(tld, label);
  };

  before(async () => {
    signers = await ethers.getSigners();
    [tokenOwner, rcmOwner, predicateOwner, owner] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    CNSRegistry = await ethers.getContractFactory('CNSRegistry');
    Resolver = await ethers.getContractFactory('Resolver');
    MintingController = await ethers.getContractFactory('MintingController');
    URIPrefixController = await ethers.getContractFactory('URIPrefixController');
    SignatureController = await ethers.getContractFactory('SignatureController');
    MintingManager = await ethers.getContractFactory('MintingManager');
    RootChainManager = await ethers.getContractFactory('RootChainManager');
    MintableERC721Predicate = await ethers
      .getContractFactory('contracts/@maticnetwork/pos-portal/MintableERC721Predicate.sol:MintableERC721Predicate');
    DummyStateSender = await ethers.getContractFactory('DummyStateSender');

    l1UnsRegistry = (await UNSRegistry.deploy()).connect(tokenOwner);
    // await l1UnsRegistry.initialize(tokenOwner.address);
    // await l1UnsRegistry.mint('0xdead000000000000000000000000000000000000', TLD.CRYPTO, 'crypto');

    cnsRegistry = await CNSRegistry.deploy();
    mintingController = await MintingController.deploy(cnsRegistry.address);
    await cnsRegistry.addController(mintingController.address);

    signatureController = await SignatureController.deploy(cnsRegistry.address);
    await cnsRegistry.addController(signatureController.address);

    resolver = await Resolver.deploy(cnsRegistry.address, mintingController.address);

    uriPrefixController = await URIPrefixController.deploy(cnsRegistry.address);
    await cnsRegistry.addController(uriPrefixController.address);

    mintingManager = await MintingManager.deploy();
    await l1UnsRegistry.initialize(mintingManager.address);

    await mintingController.addMinter(mintingManager.address);
    await uriPrefixController.addWhitelisted(mintingManager.address);

    await mintingManager.initialize(
      l1UnsRegistry.address,
      mintingController.address,
      uriPrefixController.address,
      signatureController.address,
      resolver.address,
      ZERO_ADDRESS);
    await mintingManager.addMinter(tokenOwner.address);
    await mintingManager.disableBlocklist();

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

  describe('Deposit through UNS', () => {
    it('should deposit token through UNS registry', async () => {
      const tokenId = await mintDomainL1(owner.address, TLD.WALLET, 'poly-1d-as2');

      await expect(l1UnsRegistry.connect(owner).depositToPolygon(tokenId))
        .to.emit(predicate, 'LockedMintableERC721')
        .withArgs(l1UnsRegistry.address, owner.address, l1UnsRegistry.address, tokenId);

      expect(await l1UnsRegistry.ownerOf(tokenId)).to.be.equal(predicate.address);
    });

    it('should deposit CNS domains through MintingManager', async () => {
      const tokenId = await mintDomainL1(owner.address, TLD.CRYPTO, 'poly-1md-aq1');
      expect(await cnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);

      await cnsRegistry.connect(owner).approve(mintingManager.address, tokenId);
      await mintingManager.upgradeCnsToPolygon(TLD.CRYPTO, 'poly-1md-aq1');

      await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
      expect(await l1UnsRegistry.exists(tokenId)).to.be.equal(true);
      expect(await l1UnsRegistry.ownerOf(tokenId)).to.be.equal(predicate.address);
    });

    it('should deposit CNS domains through MintingManager(meta-burn)', async () => {
      const tokenId = await mintDomainL1(owner.address, TLD.CRYPTO, 'poly-1md-ab1');
      expect(await cnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);

      const data = cnsRegistry.interface.encodeFunctionData('burn(uint256)', [tokenId]);
      const nonce = await signatureController.nonceOf(tokenId);
      const signature = await sign(data, signatureController.address, nonce, owner);

      await mintingManager.upgradeCnsToPolygonFor(TLD.CRYPTO, 'poly-1md-ab1', signature);

      await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
      expect(await l1UnsRegistry.exists(tokenId)).to.be.equal(true);
      expect(await l1UnsRegistry.ownerOf(tokenId)).to.be.equal(predicate.address);
    });
  });

  describe('Deposit through RootChainManager', () => {
    it('should deposit token', async () => {
      const tokenId = await mintDomainL1(owner.address, TLD.WALLET, 'poly-2d-aq1');

      await l1UnsRegistry.connect(owner).approve(predicate.address, tokenId);

      const data = utils.defaultAbiCoder.encode(['uint256'], [tokenId]);
      await expect(rootChainManager.connect(owner).depositFor(owner.address, l1UnsRegistry.address, data))
        .to.emit(predicate, 'LockedMintableERC721')
        .withArgs(owner.address, owner.address, l1UnsRegistry.address, tokenId);

      expect(await l1UnsRegistry.ownerOf(tokenId)).to.be.equal(predicate.address);
    });
  });
});
