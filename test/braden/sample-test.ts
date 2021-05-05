import { ethers, waffle } from 'hardhat';
import { expect } from 'chai';

import { FungibleToken } from '../../build/types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('Sample Fungible Token Test', () => {
  let account1: SignerWithAddress;
  let account2: SignerWithAddress;
  before(`load accounts`, async () => {
    [account1, account2] = await ethers.getSigners();
  });

  let token: FungibleToken;
  beforeEach(`deploy ERC20 contract`, async () => {
    const tokenFactory = await ethers.getContractFactory('FungibleToken');

    token = (await tokenFactory.connect(account1).deploy()) as FungibleToken;
    await token.deployTransaction.wait();
  });

  it(`should have a name`, async () => {
    const tokenName = await token.name();
    expect(tokenName).to.equal('Fungible Token');
  });

  describe(`mint(...)`, () => {
    it(`should allocate the amount specified to the sender`, async () => {
      const amount = 100;

      await token.connect(account1).mint(amount);

      const balance = await token.balanceOf(await account1.getAddress());

      expect(balance).to.equal(amount);
    });
  });
});
