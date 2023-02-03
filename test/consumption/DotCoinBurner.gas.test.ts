import { ethers } from 'hardhat';
import { expect } from 'chai';
import { solidityKeccak256 } from 'ethers/lib/utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber } from 'ethers';
import { DotCoinBurner__factory, UNSRegistry__factory } from '../../types/factories/contracts';
import { DotCoinBurner, UNSRegistry } from '../../types/contracts';
import {
  DEAD_ADDRESS,
  ZERO_ADDRESS,
} from '../helpers/constants';
import { mintDomain } from '../helpers/registry';

// Gas estimations is not needed to be ran due to temporary nature of DotCoinBurner contract
describe.skip('DotCoinBurner (consumption)', () => {
  let unsRegistry: UNSRegistry, dotCoinBurner: DotCoinBurner;
  let signers: SignerWithAddress[], coinbase: SignerWithAddress, accounts: SignerWithAddress[];

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;
    [, ...accounts] = signers;

    // deploy UNS regisry
    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
  });

  beforeEach(async () => {
    // deploy Dot Coin Burner
    dotCoinBurner = await new DotCoinBurner__factory(coinbase).deploy(unsRegistry.address);
  });

  describe('Estimate gas spendings', () => {
    it('should burn multiple domains', async () => {
      const result: unknown[] = [];
      for (const i of [1, 2, 3, 10, 50, 100, 140]) {
        result.push(await verifyMultipleDomainsBurn(i, `${i}-domains-`));
      }
      expect(result).to.have.lengthOf(7);
      console.table(result);
    });

    async function verifyMultipleDomainsBurn (amount: number, labelPrefix: string) {
      const mintedTokenIds: BigNumber[] = [];
      const labelHashes: string[] = [];
      for (let i = 0; i < amount; i++) {
        const label = `${labelPrefix}-${i}`;
        labelHashes.push(solidityKeccak256(['string'], [label]));
        mintedTokenIds.push(await mintDomain(unsRegistry, accounts[0], [label, 'coin']));
      }
      await unsRegistry.connect(accounts[0]).setApprovalForAll(dotCoinBurner.address, true);
      const txReceipt = await (await dotCoinBurner.burnAll(labelHashes)).wait();

      expect(mintedTokenIds).to.have.lengthOf(amount);
      for (let i = 0; i < mintedTokenIds.length; i++) {
        const domainOwner = await unsRegistry.ownerOf(mintedTokenIds[i]);
        expect(domainOwner).to.be.equal(DEAD_ADDRESS);
      }

      return {
        domainsAmount: amount,
        gasUsed: txReceipt.gasUsed.toString(),
      };
    }
  });
});
