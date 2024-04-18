import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { UNSOperator } from '../types/contracts';
import { UNSOperator__factory } from '../types/factories/contracts';

describe('UNSOperator', () => {
  let unsOperator: UNSOperator;

  let signers: SignerWithAddress[], coinbase: SignerWithAddress, receiver: SignerWithAddress;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, receiver] = signers;
  });

  describe('Ownership', () => {
    before(async () => {
      unsOperator = await new UNSOperator__factory(coinbase).deploy();

      await unsOperator.initialize();
    });

    it('should transfer ownership', async () => {
      expect(await unsOperator.owner()).to.be.equal(coinbase.address);

      await unsOperator.transferOwnership(receiver.address);

      expect(await unsOperator.owner()).to.be.equal(receiver.address);
    });
  });
});
