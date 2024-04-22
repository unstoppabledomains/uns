import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { AbiCoder } from 'ethers';
import { buildExecuteFunc, ExecuteFunc } from '../helpers/metatx';
import { ERC2771ContextMock } from '../../types/contracts/mocks';
import { MintingManagerForwarder } from '../../types/contracts/metatx';
import { ERC2771ContextMock__factory } from '../../types/factories/contracts/mocks';
import { MintingManagerForwarder__factory } from '../../types/factories/contracts/metatx';

describe('ERC2771Context', () => {
  let context: ERC2771ContextMock, forwarder: MintingManagerForwarder;
  let signers: SignerWithAddress[], coinbase: SignerWithAddress, account: SignerWithAddress;
  let buildExecuteParams: ExecuteFunc;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, account] = signers;

    context = await new ERC2771ContextMock__factory(coinbase).deploy();
    forwarder = await new MintingManagerForwarder__factory(coinbase).deploy(await context.getAddress());

    await context.initialize(await forwarder.getAddress());

    buildExecuteParams = buildExecuteFunc(context.interface, await context.getAddress(), forwarder);
  });

  it('should verify', async () => {
    const tokenId = BigInt(1);
    const { req, signature } = await buildExecuteParams('run()', [], coinbase, tokenId);

    expect(await forwarder.verify(req, signature)).to.be.equal(true);

    const abiCoder = new AbiCoder();
    const data = abiCoder.decode(['string'], await forwarder.execute.staticCall(req, signature))[0];
    expect(data).to.be.equal('ERC2771ContextMock: run');
  });

  describe('isTrustedForwarder', () => {
    it('should return false untrusterd forwarders', async () => {
      expect(await context.isTrustedForwarder(account.address)).to.be.eq(false);
    });

    it('should return true trusted forwarder', async () => {
      expect(await context.isTrustedForwarder(await forwarder.getAddress())).to.be.eq(true);
    });
  });

  describe('validate forwarded token', () => {
    it('should forwarded tokenId when trusted forwarder', async () => {
      const tokenId = BigInt(10);
      const { req, signature } = await buildExecuteParams('msgToken()', [], coinbase, tokenId);

      const result = await forwarder.execute.staticCall(req, signature);
      expect(result).to.be.equal(tokenId);
    });

    it('should return zero tokenId when untrusted forwarder', async () => {
      expect(await context.msgToken.staticCall()).to.be.equal(0);
    });
  });

  describe('validate forwarded sender', () => {
    it('should forwarded sender when trusted forwarder', async () => {
      const tokenId = BigInt(121);
      const { req, signature } = await buildExecuteParams('msgSender()', [], account, tokenId);

      const result = await forwarder.execute.staticCall(req, signature);

      const abiCoder = new AbiCoder();
      const [msgSender] = abiCoder.decode(['address'], result);

      expect(msgSender).to.be.equal(account.address);
    });

    it('should return direct sender when direct call', async () => {
      expect(await context.msgSender.staticCall()).to.be.equal(coinbase.address);
    });
  });

  describe('validate forwarded data', () => {
    it('should forwarded data when trusted forwarder', async () => {
      const tokenId = BigInt(125);
      const { req, signature } = await buildExecuteParams('msgData()', [], account, tokenId);
      const data = context.interface.encodeFunctionData('msgData');

      const result = await forwarder.execute.staticCall(req, signature);

      const abiCoder = new AbiCoder();

      const [msgSender] = abiCoder.decode(['bytes'], result);
      expect(msgSender).to.be.equal(data);
    });

    it('should return zero data when untrusted forwarder', async () => {
      const data = context.interface.encodeFunctionData('msgData');
      expect(await context.msgData.staticCall()).to.be.equal(data);
    });
  });
});
