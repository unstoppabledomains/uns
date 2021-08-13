const { ethers } = require('hardhat');
const { expect } = require('chai');

const { sign } = require('./../helpers/metatx');

const { BigNumber } = ethers;

describe('RoutingForwarder', () => {
  const cryptoRoot = BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');

  let RoutingForwarder, CNSRegistry, MintingController, SignatureController;
  let forwarder, registry, mintingController, signatureController;
  let signers, owner, receiver;

  before(async () => {
    signers = await ethers.getSigners();
    [owner, receiver] = signers;

    RoutingForwarder = await ethers.getContractFactory('RoutingForwarder');
    CNSRegistry = await ethers.getContractFactory('CNSRegistry');
    MintingController = await ethers.getContractFactory('MintingController');
    SignatureController = await ethers.getContractFactory('SignatureController');

    registry = await CNSRegistry.deploy();
    mintingController = await MintingController.deploy(registry.address);
    signatureController = await SignatureController.deploy(registry.address);

    await registry.addController(mintingController.address);
    await registry.addController(signatureController.address);

    forwarder = await RoutingForwarder.deploy();
    await forwarder.initialize(signatureController.address);
  });

  const mintDomain = async (label, owner) => {
    await mintingController.mintSLD(owner, label);
    return await registry.childIdOf(cryptoRoot, label);
  };

  const buildExecuteParams = async (selector, params, from, tokenId) => {
    const data = registry.interface.encodeFunctionData(selector, params);
    const nonce = await forwarder.nonceOf(tokenId);
    const signature = await sign(data, signatureController.address, nonce, from);
    return { req: { from: from.address, nonce, tokenId, data }, signature };
  };

  const buildTransfer = async (from, toAddress, tokenId) => {
    return await buildExecuteParams(
      'transferFrom(address,address,uint256)',
      [from.address, toAddress, tokenId],
      from,
      tokenId,
    );
  };

  const executeTransfer = async (from, toAddress, tokenId) => {
    const { req, signature } = await buildTransfer(from, toAddress, tokenId);
    return await forwarder.execute(req, signature);
  };

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

      await executeTransfer(owner, receiver.address, tokenId);

      nonceF = await forwarder.nonceOf(tokenId);
      nonceS = await signatureController.nonceOf(tokenId);
      expect(nonceF).to.be.equal(1);
      expect(nonceF).to.be.equal(nonceS);
    });
  });

  describe('buildRouteData', () => {
    it('should build valid `transferFrom` route calldata', async () => {
      const tokenId = await registry.childIdOf(cryptoRoot, 'test_foob_1');
      const { req, signature } = await buildTransfer(owner, receiver.address, tokenId);

      const expectedData = signatureController.interface.encodeFunctionData(
        'transferFromFor(address,address,uint256,bytes)',
        [owner.address, receiver.address, tokenId, signature],
      );

      const calldata = await forwarder.callStatic.buildRouteData(req, signature);

      expect(`${calldata}00000000000000000000000000000000000000000000000000000000000000`).to.be.equal(expectedData);
    });

    it('should revert when unknown function call', async () => {
      const tokenId = await mintDomain('test_foob_2', owner.address);

      const data = registry.interface.encodeFunctionData(
        'setOwner(address,uint256)',
        [receiver.address, tokenId],
      );
      const nonce = await forwarder.nonceOf(tokenId);
      const signature = await sign(data, signatureController.address, nonce, owner);
      const req = { from: owner.address, nonce, tokenId, data };

      await expect(
        forwarder.callStatic.buildRouteData(req, signature),
      ).to.be.revertedWith('RoutingForwarder: ROUTE_UNKNOWN');
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

      const data = registry.interface.encodeFunctionData(
        'setOwner(address,uint256)',
        [receiver.address, tokenId],
      );
      const nonce = await forwarder.nonceOf(tokenId);
      const signature = await sign(data, signatureController.address, nonce, owner);
      const req = { from: owner.address, nonce, tokenId, data };

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
