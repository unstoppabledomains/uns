import { ethers } from 'hardhat';
import { expect } from 'chai';

import { BatchableNFT } from '../../build/types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('Batchable', () => {
  let account1: SignerWithAddress;
  let account2: SignerWithAddress;
  before(`load accounts`, async () => {
    [account1, account2] = await ethers.getSigners();
  });

  let token: BatchableNFT;
  beforeEach(`deploy BatchableNFT contract`, async () => {
    const tokenFactory = await ethers.getContractFactory('BatchableNFT');

    token = (await tokenFactory.connect(account1).deploy()) as BatchableNFT;
    await token.deployTransaction.wait();
  });

  const batchSize = 100;

  describe(`mint(...)`, () => {
    it(`should execute a batch of transactions`, async () => {
      const mintTx = await token.connect(account1).mint(1);

      const gasUsed = (await mintTx.wait()).gasUsed.toNumber();

      console.log('mintTx:', gasUsed);
      console.log('mintTx estimate:', gasUsed * batchSize);
    });
  });

  describe(`mintMany(...)`, () => {
    it(`should execute a batch of transactions`, async () => {
      const mintManyTx = await token
        .connect(account1)
        .mintMany(new Array(batchSize).fill(0).map((_, i) => i));

      console.log('mintManyTx:', (await mintManyTx.wait()).gasUsed.toNumber());
    });
  });

  describe(`mintManyWithContext(...)`, () => {
    it(`should execute a batch of transactions`, async () => {
      const mintManyWithContextTx = await token
        .connect(account1)
        .mintManyWithContext(new Array(batchSize).fill(0).map((_, i) => i));

      console.log(
        'mintManyWithContextTx:',
        (await mintManyWithContextTx.wait()).gasUsed.toNumber(),
      );
    });
  });

  // 2786735 gas with Multicall commented out
  describe(`executeBatch(...)`, () => {
    it(`should execute a batch of transactions`, async () => {
      const payloads: string[] = [];
      for (let index = 0; index < batchSize; index++) {
        payloads.push(
          token.interface.encodeFunctionData('mintWithContext', [index]),
        );
      }

      const executeBatchTx = await token
        .connect(account1)
        .executeBatch(payloads);

      console.log(
        'executeBatchTx:',
        (await executeBatchTx.wait()).gasUsed.toNumber(),
      );
    });
  });

  // 2913954 gas with Batchable commented out.
  xdescribe(`multicall(...)`, () => {
    it(`should execute a batch of transactions`, async () => {
      const payloads: string[] = [];
      for (let index = 0; index < batchSize; index++) {
        payloads.push(
          token.interface.encodeFunctionData('mintWithContext', [index]),
        );
      }

      const multicallTx = await token.connect(account1).multicall(payloads);

      console.log(
        'multicallTx:',
        (await multicallTx.wait()).gasUsed.toNumber(),
      );
    });
  });
});
