import { ethers } from 'hardhat';
import { expect } from 'chai';

import { buildExecuteFunc, ExecuteFunc } from '../helpers/metatx';
import { utils, BigNumber } from 'ethers';
import { ERC2771ContextMock } from '../../typechain-types/contracts/mocks';
import { MintingManagerForwarder } from '../../typechain-types/contracts/metatx';
import { ERC2771ContextMock__factory } from '../../typechain-types/factories/contracts/mocks';
import { MintingManagerForwarder__factory } from '../../typechain-types/factories/contracts/metatx';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('ERC2771Context', () => {
  let context: ERC2771ContextMock, forwarder: MintingManagerForwarder;
  let signers: SignerWithAddress[], coinbase: SignerWithAddress, account: SignerWithAddress;
  let buildExecuteParams: ExecuteFunc;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, account] = signers;

    context = await new ERC2771ContextMock__factory(coinbase).deploy();
    forwarder = await new MintingManagerForwarder__factory(coinbase).deploy(context.address);

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
      const data = context.interface.encodeFunctionData('msgData');

      const result = await forwarder.callStatic.execute(req, signature);
      const [msgSender] = utils.defaultAbiCoder.decode(['bytes'], result);
      expect(msgSender).to.be.equal(data);
    });

    it('should return zero data when untrusted forwarder', async () => {
      const data = context.interface.encodeFunctionData('msgData');
      expect(await context.callStatic.msgData()).to.be.equal(data);
    });
  });
});
