const { ethers } = require('hardhat');
const { expect } = require('chai');

const { sign } = require('../helpers/metatx');
const { TLD } = require('../helpers/constants');

describe('BaseRoutingForwarder', () => {
  let BaseRoutingForwarder, CNSRegistry, MintingController, SignatureController;
  let forwarder, registry, mintingController, signatureController;
  let signers, owner, receiver;

  const mintDomain = async (label, owner) => {
    await mintingController.mintSLD(owner, label);
    return await registry.childIdOf(TLD.CRYPTO, label);
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

  before(async () => {
    signers = await ethers.getSigners();
    [owner, receiver] = signers;

    BaseRoutingForwarder = await ethers.getContractFactory('BaseRoutingForwarderMock');
    CNSRegistry = await ethers.getContractFactory('CNSRegistry');
    MintingController = await ethers.getContractFactory('MintingController');
    SignatureController = await ethers.getContractFactory('SignatureController');

    registry = await CNSRegistry.deploy();
    mintingController = await MintingController.deploy(registry.address);
    signatureController = await SignatureController.deploy(registry.address);

    await registry.addController(mintingController.address);
    await registry.addController(signatureController.address);

    forwarder = await BaseRoutingForwarder.deploy();
  });

  it('should build valid `transferFrom` route calldata', async () => {
    const tokenId = await registry.childIdOf(TLD.CRYPTO, 'test_foob_1');
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
