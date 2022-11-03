import { ethers } from 'hardhat';
import { expect } from 'chai';
import { utils, BigNumber } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ERC2771RegistryContextMock__factory } from '../../types/factories/contracts/mocks';
import { ERC2771RegistryContextMock } from '../../types/contracts/mocks';

describe('ERC2771RegistryContext', () => {
  let context: ERC2771RegistryContextMock;
  let signers: SignerWithAddress[], coinbase: SignerWithAddress, accounts: string[];

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;
    [, ...accounts] = signers.map(s => s.address);

    context = await new ERC2771RegistryContextMock__factory(coinbase).deploy();
    await context.initialize();
  });

  describe('isTrustedForwarder', () => {
    it('should return false untrusterd forwarders', async () => {
      expect(await context.isTrustedForwarder(accounts[0])).to.be.eq(false);
      expect(await context.isTrustedForwarder(accounts[9])).to.be.eq(false);
    });

    it('should return true trusted forwarder (self-address)', async () => {
      expect(await context.isTrustedForwarder(context.address)).to.be.eq(true);
    });
  });

  describe('validate forwarded token(last 32bytes in calldata)', () => {
    it('should forwarded tokenId when trusted forwarder', async () => {
      const tokenId = BigNumber.from(102);
      const calldata = context.interface.encodeFunctionData('msgToken');

      const encodedTokenId = utils.defaultAbiCoder.encode([ 'uint256' ], [ tokenId ]);
      const [success, returnData] = await context.callStatic.execute(calldata + encodedTokenId.slice(2));

      expect(success).to.be.eq(true);
      const [msgToken] = utils.defaultAbiCoder.decode(['uint256'], returnData);
      expect(msgToken).to.be.equal(tokenId);
    });

    it('should return zero tokenId when untrusted forwarder', async () => {
      expect(await context.callStatic.msgToken()).to.be.equal(0);
    });
  });

  describe('validate msg.from (calldata = "{bytes:data}{address:from}{bytes32:tokenId}")', () => {
    it('should return sender address when trusted forwarder', async () => {
      const calldata = context.interface.encodeFunctionData('msgSender');

      const encodedTokenId = utils.defaultAbiCoder.encode([ 'uint256' ], [ 0 ]);
      const encodedAddress = utils.defaultAbiCoder.encode([ 'address' ], [ signers[0].address ]);
      const encodedData = calldata + encodedAddress.slice(2) + encodedTokenId.slice(2);
      const [success, returnData] = await context.callStatic.execute(encodedData);

      expect(success).to.be.eq(true);
      const [address] = utils.defaultAbiCoder.decode(['address'], returnData);
      expect(address).to.be.eql(signers[0].address);
    });

    it('should return sender address when untrusted forwarder', async () => {
      const sender = await context.callStatic.msgSender();
      expect(sender).to.be.eql(signers[0].address);

      const sender2 = await context.connect(signers[2]).callStatic.msgSender();
      expect(sender2).to.be.eql(signers[2].address);
    });
  });

  describe('validate msg.data (calldata = "{bytes:data}{address:from}{bytes32:tokenId}")', () => {
    it('should return data when trusted forwarder', async () => {
      const calldata = context.interface.encodeFunctionData('msgData');

      const encodedTokenId = utils.defaultAbiCoder.encode([ 'uint256' ], [ 0 ]);
      const encodedAddress = utils.defaultAbiCoder.encode([ 'address' ], [ signers[0].address ]);
      const encodedData = calldata + encodedAddress.slice(2) + encodedTokenId.slice(2);
      const [success, returnData] = await context.callStatic.execute(encodedData);

      expect(success).to.be.eq(true);
      const [,, selector] = utils.defaultAbiCoder.decode(['bytes32', 'bytes32', 'bytes4'], returnData);
      expect(selector).to.be.eql(calldata);
    });

    it('should return data when untrusted forwarder', async () => {
      const data = await context.callStatic.msgData();
      expect(data).to.be.eql('0xc4c2bfdc');
    });
  });
});
