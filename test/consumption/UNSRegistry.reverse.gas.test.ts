import * as crypto from 'crypto';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { UNSRegistry } from '../../types/contracts';
import { UNSRegistry__factory } from '../../types/factories/contracts';
import { buildExecuteFunc, ExecuteFunc } from '../helpers/metatx';
import { ZERO_ADDRESS } from '../helpers/constants';
import { TLD } from '../../src/tlds';
import { mintDomain } from '../helpers/registry';

describe('UNSRegistry Set Reverse (consumption)', () => {
  let unsRegistry: UNSRegistry;

  let signers: SignerWithAddress[], coinbase: SignerWithAddress, owner: SignerWithAddress;
  let buildExecuteParams: ExecuteFunc;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner] = signers;
  });

  beforeEach(async () => {
    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();

    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistry.mintTLD(TLD.x.hash, 'x');

    buildExecuteParams = buildExecuteFunc(unsRegistry.interface, await unsRegistry.getAddress(), unsRegistry);
  });

  describe('Set Reverse Consumption', () => {
    it('compare gas usage for different setReverse functions', async () => {
      const result: unknown[] = [];
      for (const domainLength of [3, 9, 10, 11, 16, 30, 31, 32, 33, 34, 35, 36, 38, 40]) {
        result.push(await generateSetReverseTransactions(domainLength));
      }
      console.table(result);
    });

    async function generateSetReverseTransactions (domainNameLength: number) {
      let name = crypto.randomBytes((domainNameLength - 2) / 2).toString('hex');
      name = domainNameLength - 2 > name.length ? name + 'a' : name;
      const labels = [name, 'x'];
      const uri = labels.join('.');
      const tokenId = await mintDomain({ unsRegistry, owner, labels });

      const newSetReverseParams = await buildExecuteParams('setReverse(string[])', [labels], owner, tokenId);
      const newTxReceipt = await (
        await unsRegistry.execute(newSetReverseParams.req, newSetReverseParams.signature)
      ).wait();

      const subdomainLabels = ['a', ...labels];
      const subdomainUri = subdomainLabels.join('.');
      const subdomainTokenId = await mintDomain({ unsRegistry, owner, labels: subdomainLabels });
      const newSubdomainsSetReverseParams = await buildExecuteParams(
        'setReverse(string[])',
        [subdomainLabels],
        owner,
        subdomainTokenId,
      );
      const newSubdomainTxReceipt = await (
        await unsRegistry.execute(newSubdomainsSetReverseParams.req, newSubdomainsSetReverseParams.signature)
      ).wait();

      const secondLevelSubdomainLabels = ['b', ...subdomainLabels];
      const secondLevelSubdomainUri = secondLevelSubdomainLabels.join('.');
      const secondLevelSubdomainTokenId = await mintDomain({ unsRegistry, owner, labels: secondLevelSubdomainLabels });
      const newSecondLevelSubdomainSetReverseParams = await buildExecuteParams(
        'setReverse(string[])',
        [secondLevelSubdomainLabels],
        owner,
        secondLevelSubdomainTokenId,
      );
      const newSecondLevelSubdomainTxReceipt = await (
        await unsRegistry.execute(
          newSecondLevelSubdomainSetReverseParams.req,
          newSecondLevelSubdomainSetReverseParams.signature,
        )
      ).wait();

      return {
        length: uri.length,
        gas: newTxReceipt?.gasUsed.toString(),
        '1 level subdomain length': subdomainUri.length,
        '1 level subdomain gas': newSubdomainTxReceipt?.gasUsed.toString(),
        '2 level subdomain length': secondLevelSubdomainUri.length,
        '2 level subdomain gas': newSecondLevelSubdomainTxReceipt?.gasUsed.toString(),
      };
    }
  });
});
