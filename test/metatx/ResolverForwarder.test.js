const { ethers } = require('hardhat');
const { expect } = require('chai');

const { buildExecuteFunc } = require('../helpers/metatx');
const { TLD } = require('../helpers/constants');

describe('ResolverForwarder', () => {
  let ResolverForwarder, CNSRegistry, MintingController, SignatureController, Resolver;
  let forwarder, registry, mintingController, signatureController, resolver;
  let signers, owner, buildExecuteParams;

  const mintDomain = async (label, owner) => {
    await mintingController.mintSLDWithResolver(owner, label, resolver.address);
    return await registry.childIdOf(TLD.CRYPTO, label);
  };

  before(async () => {
    signers = await ethers.getSigners();
    [owner] = signers;

    ResolverForwarder = await ethers.getContractFactory('ResolverForwarder');
    CNSRegistry = await ethers.getContractFactory('CNSRegistry');
    MintingController = await ethers.getContractFactory('MintingController');
    SignatureController = await ethers.getContractFactory('SignatureController');
    Resolver = await ethers.getContractFactory('Resolver');

    registry = await CNSRegistry.deploy();
    mintingController = await MintingController.deploy(registry.address);
    signatureController = await SignatureController.deploy(registry.address);
    resolver = await Resolver.deploy(registry.address, mintingController.address);

    await registry.addController(mintingController.address);
    await registry.addController(signatureController.address);

    forwarder = await ResolverForwarder.deploy();
    await forwarder.initialize(registry.address);

    buildExecuteParams = buildExecuteFunc(resolver.interface, resolver.address, forwarder);
  });

  it('should verify & execute correctly', async () => {
    const tokenId = await mintDomain('test_foo', owner.address);
    const { req, signature } = await buildExecuteParams(
      'reset(uint256)', [tokenId], owner, tokenId);

    expect(await forwarder.verify(req, signature)).to.be.equal(true);

    await forwarder.execute(req, signature);
  });

  describe('nonceOf', () => {
    it('should match nonces', async () => {
      const tokenId = await mintDomain('test_foon', owner.address);
      let nonceF = await forwarder.nonceOf(tokenId);
      let nonceR = await resolver.nonceOf(tokenId);

      expect(nonceF).to.be.equal(0);
      expect(nonceF).to.be.equal(nonceR);

      const { req, signature } = await buildExecuteParams(
        'reset(uint256)', [tokenId], owner, tokenId);
      await forwarder.execute(req, signature);

      nonceF = await forwarder.nonceOf(tokenId);
      nonceR = await resolver.nonceOf(tokenId);
      expect(nonceF).to.be.equal(1);
      expect(nonceF).to.be.equal(nonceR);
    });
  });

  describe('verify', () => {
    it('should verify successfully', async () => {
      const tokenId = await mintDomain('test_foo_10', owner.address);
      const { req, signature } = await buildExecuteParams(
        'reset(uint256)', [tokenId], owner, tokenId);

      expect(await forwarder.verify(req, signature)).to.be.equal(true);
    });

    it('should fail verification when unknown function call', async () => {
      const tokenId = await mintDomain('test_foo_13', owner.address);
      const { req, signature } = await buildExecuteParams(
        'get(string,uint256)', ['k', tokenId], owner, tokenId);

      expect(await forwarder.verify(req, signature)).to.be.equal(false);
    });

    it('should fail verification when nonce is incorrect', async () => {
      const tokenId = await mintDomain('test_foo_14', owner.address);
      const { req, signature } = await buildExecuteParams(
        'reset(uint256)', [tokenId], owner, tokenId);

      expect(await forwarder.verify({ ...req, nonce: 100 }, signature)).to.be.equal(false);
    });

    it('should fail verification when signature used', async () => {
      const tokenId = await mintDomain('test_foo_15', owner.address);
      const { req, signature } = await buildExecuteParams(
        'reset(uint256)', [tokenId], owner, tokenId);
      await forwarder.execute(req, signature);

      expect(await forwarder.verify(req, signature)).to.be.equal(false);
    });
  });
});
