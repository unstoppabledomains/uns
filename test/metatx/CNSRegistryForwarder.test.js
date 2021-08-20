const { ethers } = require('hardhat');
const { expect } = require('chai');

const { buildExecuteFunc } = require('../helpers/metatx');
const { TLD } = require('../helpers/constants');

describe('CNSRegistryForwarder', () => {
  let CNSRegistryForwarder, CNSRegistry, MintingController, SignatureController;
  let forwarder, registry, mintingController, signatureController;
  let signers, owner, receiver, buildExecuteParams;

  const mintDomain = async (label, owner) => {
    await mintingController.mintSLD(owner, label);
    return await registry.childIdOf(TLD.CRYPTO, label);
  };

  const buildTransfer = async (from, toAddress, tokenId) => {
    return await buildExecuteParams(
      'transferFrom(address,address,uint256)',
      [from.address, toAddress, tokenId],
      from,
      tokenId,
    );
  };

  before(async () => {
    signers = await ethers.getSigners();
    [owner, receiver] = signers;

    CNSRegistryForwarder = await ethers.getContractFactory('CNSRegistryForwarder');
    CNSRegistry = await ethers.getContractFactory('CNSRegistry');
    MintingController = await ethers.getContractFactory('MintingController');
    SignatureController = await ethers.getContractFactory('SignatureController');

    registry = await CNSRegistry.deploy();
    mintingController = await MintingController.deploy(registry.address);
    signatureController = await SignatureController.deploy(registry.address);

    await registry.addController(mintingController.address);
    await registry.addController(signatureController.address);

    forwarder = await CNSRegistryForwarder.deploy();
    await forwarder.initialize(signatureController.address);

    buildExecuteParams = buildExecuteFunc(registry.interface, signatureController.address, forwarder);
  });

  it('should verify & execute correctly', async () => {
    const tokenId = await mintDomain('test_foo', owner.address);
    const { req, signature } = await buildTransfer(owner, receiver.address, tokenId);

    expect(await forwarder.verify(req, signature)).to.be.equal(true);

    await forwarder.execute(req, signature);
    expect(await registry.ownerOf(tokenId)).to.be.equal(receiver.address);
  });

  describe('nonceOf', () => {
    it('should match nonces', async () => {
      const tokenId = await mintDomain('test_foon', owner.address);
      let nonceF = await forwarder.nonceOf(tokenId);
      let nonceS = await signatureController.nonceOf(tokenId);

      expect(nonceF).to.be.equal(0);
      expect(nonceF).to.be.equal(nonceS);

      const { req, signature } = await buildTransfer(owner, receiver.address, tokenId);
      await forwarder.execute(req, signature);

      nonceF = await forwarder.nonceOf(tokenId);
      nonceS = await signatureController.nonceOf(tokenId);
      expect(nonceF).to.be.equal(1);
      expect(nonceF).to.be.equal(nonceS);
    });
  });

  describe('verify', () => {
    it('should verify successfully', async () => {
      const tokenId = await mintDomain('test_foo_10', owner.address);
      const { req, signature } = await buildTransfer(owner, receiver.address, tokenId);

      expect(await forwarder.verify(req, signature)).to.be.equal(true);
    });

    it('should fail verification when unknown function call', async () => {
      const tokenId = await mintDomain('test_foo_13', owner.address);
      const { req, signature } = await buildExecuteParams(
        'setOwner(address,uint256)',
        [receiver.address, tokenId],
        owner, tokenId,
      );

      expect(await forwarder.verify(req, signature)).to.be.equal(false);
    });

    it('should fail verification when nonce is incorrect', async () => {
      const tokenId = await mintDomain('test_foo_14', owner.address);
      const { req, signature } = await buildTransfer(owner, receiver.address, tokenId);

      expect(await forwarder.verify({ ...req, nonce: 100 }, signature)).to.be.equal(false);
    });

    it('should fail verification when signature used', async () => {
      const tokenId = await mintDomain('test_foo_15', owner.address);
      const { req, signature } = await buildTransfer(owner, receiver.address, tokenId);
      await forwarder.execute(req, signature);

      expect(await forwarder.verify(req, signature)).to.be.equal(false);
    });
  });
});
