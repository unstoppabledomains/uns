import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { AbiCoder } from 'ethers';
import { ERC2771RegistryContextMock__factory } from '../../types/factories/contracts/mocks';
import { ERC2771RegistryContextMock } from '../../types/contracts/mocks';

describe('ERC2771RegistryContext', () => {
  let context: ERC2771RegistryContextMock;
  let signers: SignerWithAddress[], coinbase: SignerWithAddress, accounts: string[];

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;
    [, ...accounts] = signers.map((s) => s.address);

    context = await new ERC2771RegistryContextMock__factory(coinbase).deploy();
    await context.initialize();
  });

  describe('isTrustedForwarder', () => {
    it('should return false untrusterd forwarders', async () => {
      expect(await context.isTrustedForwarder(accounts[0])).to.be.eq(false);
      expect(await context.isTrustedForwarder(accounts[9])).to.be.eq(false);
    });

    it('should return true trusted forwarder (self-address)', async () => {
      expect(await context.isTrustedForwarder(await context.getAddress())).to.be.eq(true);
    });
  });

  describe('validate forwarded token(last 32bytes in calldata)', () => {
    it('should forwarded tokenId when trusted forwarder', async () => {
      const tokenId = BigInt(102);
      const calldata = context.interface.encodeFunctionData('msgToken');

      const encodedTokenId = new AbiCoder().encode(['uint256'], [tokenId]);
      const [success, returnData] = await context.execute.staticCall(calldata + encodedTokenId.slice(2));

      expect(success).to.be.eq(true);
      const [msgToken] = new AbiCoder().decode(['uint256'], returnData);
      expect(msgToken).to.be.equal(tokenId);
    });

    it('should return zero tokenId when untrusted forwarder', async () => {
      expect(await context.msgToken.staticCall()).to.be.equal(0);
    });
  });

  describe('validate msg.from (calldata = "{bytes:data}{address:from}{bytes32:tokenId}")', () => {
    it('should return sender address when trusted forwarder', async () => {
      const calldata = context.interface.encodeFunctionData('msgSender');

      const encodedTokenId = new AbiCoder().encode(['uint256'], [0]);
      const encodedAddress = new AbiCoder().encode(['address'], [signers[0].address]);
      const encodedData = calldata + encodedAddress.slice(2) + encodedTokenId.slice(2);
      const [success, returnData] = await context.execute.staticCall(encodedData);

      expect(success).to.be.eq(true);
      const [address] = new AbiCoder().decode(['address'], returnData);
      expect(address).to.be.eql(signers[0].address);
    });

    it('should return sender address when untrusted forwarder', async () => {
      const sender = await context.msgSender.staticCall();
      expect(sender).to.be.eql(signers[0].address);

      const sender2 = await context.connect(signers[2]).msgSender.staticCall();
      expect(sender2).to.be.eql(signers[2].address);
    });
  });

  describe('validate msg.data (calldata = "{bytes:data}{address:from}{bytes32:tokenId}")', () => {
    it('should return data when trusted forwarder', async () => {
      const calldata = context.interface.encodeFunctionData('msgData');

      const encodedTokenId = new AbiCoder().encode(['uint256'], [0]);
      const encodedAddress = new AbiCoder().encode(['address'], [signers[0].address]);
      const encodedData = calldata + encodedAddress.slice(2) + encodedTokenId.slice(2);
      const [success, returnData] = await context.execute.staticCall(encodedData);

      expect(success).to.be.eq(true);
      const [, , selector] = new AbiCoder().decode(['bytes32', 'bytes32', 'bytes4'], returnData);
      expect(selector).to.be.eql(calldata);
    });

    it('should return data when untrusted forwarder', async () => {
      const data = await context.msgData.staticCall();
      expect(data).to.be.eql('0xc4c2bfdc');
    });
  });
});
