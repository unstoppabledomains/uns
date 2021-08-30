const { ethers } = require('hardhat');
const { expect } = require('chai');

const { buildExecuteFunc } = require('../helpers/metatx');

const { utils, BigNumber } = ethers;

describe('ERC2771Context', () => {
  let ERC2771Context, MintingManagerForwarder, context, forwarder;
  let signers, coinbase, account, buildExecuteParams;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, account] = signers;

    ERC2771Context = await ethers.getContractFactory('ERC2771ContextMock');
    MintingManagerForwarder = await ethers.getContractFactory('MintingManagerForwarder');

    context = await ERC2771Context.deploy();
    forwarder = await MintingManagerForwarder.deploy(context.address);

    await context.initialize(forwarder.address);

    buildExecuteParams = buildExecuteFunc(context.interface, context.address, forwarder);
  });

  it('should verify', async () => {
    const tokenId = BigNumber.from(1);
    const { req, signature } = await buildExecuteParams('run()', [], coinbase, tokenId);

    expect(await forwarder.verify(req, signature)).to.be.equal(true);

    const abiCoder = new utils.AbiCoder();
    const data = abiCoder.decode(['string'], await forwarder.callStatic.execute(req, signature))[0];
    expect(data).to.be.equal('ERC2771ContextMock: run');
  });

  describe('isTrustedForwarder', () => {
    it('should return false untrusterd forwarders', async () => {
      expect(await context.isTrustedForwarder(account.address)).to.be.eq(false);
    });

    it('should return true trusted forwarder', async () => {
      expect(await context.isTrustedForwarder(forwarder.address)).to.be.eq(true);
    });
  });

  describe('validate forwarded token', () => {
    it('should forwarded tokenId when trusted forwarder', async () => {
      const tokenId = BigNumber.from(10);
      const { req, signature } = await buildExecuteParams('msgToken()', [], coinbase, tokenId);

      const result = await forwarder.callStatic.execute(req, signature);
      expect(result).to.be.equal(tokenId);
    });

    it('should return zero tokenId when untrusted forwarder', async () => {
      expect(await context.callStatic.msgToken()).to.be.equal(0);
    });
  });

  describe('validate forwarded sender', () => {
    it('should forwarded sender when trusted forwarder', async () => {
      const tokenId = BigNumber.from(121);
      const { req, signature } = await buildExecuteParams('msgSender()', [], account, tokenId);

      const result = await forwarder.callStatic.execute(req, signature);
      const [msgSender] = utils.defaultAbiCoder.decode(['address'], result);
      expect(msgSender).to.be.equal(account.address);
    });

    it('should return direct sender when direct call', async () => {
      expect(await context.callStatic.msgSender()).to.be.equal(coinbase.address);
    });
  });

  describe('validate forwarded data', () => {
    it('should forwarded data when trusted forwarder', async () => {
      const tokenId = BigNumber.from(125);
      const { req, signature } = await buildExecuteParams('msgData()', [], account, tokenId);
      const data = context.interface.encodeFunctionData('msgData()', []);

      const result = await forwarder.callStatic.execute(req, signature);
      const [msgSender] = utils.defaultAbiCoder.decode(['bytes'], result);
      expect(msgSender).to.be.equal(data);
    });

    it('should return zero data when untrusted forwarder', async () => {
      const data = context.interface.encodeFunctionData('msgData()', []);
      expect(await context.callStatic.msgData()).to.be.equal(data);
    });
  });
});
