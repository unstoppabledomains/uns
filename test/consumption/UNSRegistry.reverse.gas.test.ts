import * as crypto from 'crypto';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { UNSRegistry } from '../../types/contracts';
import { UNSRegistry__factory } from '../../types/factories/contracts';
import { buildExecuteFunc, ExecuteFunc } from '../helpers/metatx';
import { TLD, ZERO_ADDRESS } from '../helpers/constants';
import { mintDomain } from '../helpers/registry';

describe('UNSRegistry Set Reverse (consumption)', () => {
  let unsRegistry: UNSRegistry;

  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    owner: SignerWithAddress;
  let buildExecuteParams: ExecuteFunc;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner] = signers;
  });

  beforeEach(async () => {
    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();

    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistry.mintTLD(TLD.X, 'x');

    buildExecuteParams = buildExecuteFunc(
      unsRegistry.interface,
      unsRegistry.address,
      unsRegistry,
    );
  });

  describe('Set Reverse Consumption', () => {
    it('compare gas usage for different setReverse functions', async () => {
      const result: unknown[] = [];
      for (const domainLength of [9, 10, 11, 16, 30, 31, 32, 33, 34, 35]) {
        result.push(await generateSetReverseTransactions(domainLength));
      }
      console.table(result);
    });

    async function generateSetReverseTransactions (domainNameLength: number) {
      let name = crypto.randomBytes((domainNameLength - 2) / 2).toString('hex');
      name = domainNameLength - 2 > name.length ? name + 'a' : name;
      const labels = [name, 'x'];
      const uri = labels.join('.');
      const tokenId = await mintDomain(unsRegistry, owner, labels);
      const legacySetReverseParams = await buildExecuteParams(
        'setReverse(uint256)',
        [tokenId],
        owner,
        tokenId,
      );
      const legacyTxReceipt =
        await (await unsRegistry.execute(legacySetReverseParams.req, legacySetReverseParams.signature)).wait();

      const newSetReverseParams = await buildExecuteParams(
        'setReverse(string[])',
        [labels],
        owner,
        tokenId,
      );
      const newTxReceipt =
        await (await unsRegistry.execute(newSetReverseParams.req, newSetReverseParams.signature)).wait();

      return {
        'Domain Name': uri,
        'Length': uri.length,
        'setReverse(uint256 tokenId)': legacyTxReceipt.gasUsed.toString(),
        'setReverse(string[] labels)': newTxReceipt.gasUsed.toString(),
      };
    }
  });
});
