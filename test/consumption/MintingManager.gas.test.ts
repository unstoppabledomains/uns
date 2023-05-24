import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { MintingManager, UNSRegistry } from '../../types/contracts';
import { MintingManagerForwarder } from '../../types/contracts/metatx';
import { MintingManager__factory, UNSRegistry__factory } from '../../types/factories/contracts';
import { MintingManagerForwarder__factory } from '../../types/factories/contracts/metatx';
import { ZERO_ADDRESS } from '../helpers/constants';
import { percDiff } from '../helpers/consumption';
import { buildExecuteFunc, ExecuteFunc } from '../helpers/metatx';

describe('MintingManager (consumption)', () => {
  let unsRegistry: UNSRegistry, mintingManager: MintingManager, forwarder: MintingManagerForwarder;
  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    receiver: SignerWithAddress,
    spender: SignerWithAddress;

  let buildExecuteParams: ExecuteFunc;

  async function removeReverse () {
    const rr = await unsRegistry.reverseOf(receiver.address);
    if (rr.toString() !== '0') {
      const removeReverseTx = await unsRegistry.connect(receiver).removeReverse();
      await removeReverseTx.wait();
    }
  }

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, , receiver, spender] = signers;

    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
    mintingManager = await new MintingManager__factory(coinbase).deploy();
    await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

    forwarder = await new MintingManagerForwarder__factory(coinbase).deploy(mintingManager.address);

    await mintingManager.initialize(
      unsRegistry.address,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
    );
    await mintingManager.addMinter(coinbase.address);
    await mintingManager.setTokenURIPrefix('/');
    await mintingManager.setForwarder(forwarder.address);

    buildExecuteParams = buildExecuteFunc(mintingManager.interface, mintingManager.address, forwarder);
  });

  describe('Mint consumption', () => {
    const getCases = () => {
      return [
        {
          func: 'issueWithRecords',
          note: 'mint',
          selector: 'issueWithRecords(address,string[],string[],string[],bool)',
          params: [receiver.address, ['t1-w1', 'wallet'], [], [], true],
        },
        {
          func: 'issueWithRecords',
          note: 'unlock',
          selector: 'issueWithRecords(address,string[],string[],string[],bool)',
          params: [receiver.address, ['t1-w1', 'wallet'], [], [], true],
        },
      ];
    };

    it('Consumption', async () => {
      const result: unknown[] = [];

      const cases = getCases();
      const keys = cases
        .map((c) => c.params[2])
        .flat()
        .filter((value, index, array) => array.indexOf(value) === index);
      for (let i = 0; i < keys.length; i++) {
        await unsRegistry.addKey(keys[i] as string);
      }

      for (let i = 0; i < cases.length; i++) {
        const { note, selector, params } = cases[i];
        const [acc, labels, ...rest] = params;
        const executeParams = [acc, [labels[0] + 'r', labels[1]], ...rest];

        const tokenId = await unsRegistry.namehash(labels as string[]);
        const tokenId2 = await unsRegistry.namehash(executeParams[1] as string[]);

        const { req, signature } = await buildExecuteParams(selector, executeParams, coinbase, tokenId);
        const executeTx = await forwarder.connect(spender).execute(req, signature);

        const executeTxReceipt = await executeTx.wait();

        await removeReverse();

        const tx = await mintingManager[selector](...params);
        tx.receipt = await tx.wait();

        await removeReverse();

        result.push({
          note,
          selector,
          records: Array.isArray(params[2]) ? params[2].length : '-',
          reverse: params[4],
          execute: executeTxReceipt.gasUsed.toString(),
          send: tx.receipt.gasUsed.toString(),
          increase: percDiff(tx.receipt.gasUsed.toNumber(), executeTxReceipt.gasUsed.toNumber()) + ' %',
        });

        await unsRegistry.connect(receiver).setOwner(mintingManager.address, tokenId);
        await unsRegistry.connect(receiver).setOwner(mintingManager.address, tokenId2);
      }
      console.table(result);
    });
  });

  describe('Mint with records consumption', () => {
    const getCases = () => {
      return [
        {
          func: 'issueWithRecords',
          note: 'mint',
          selector: 'issueWithRecords(address,string[],string[],string[],bool)',
          params: [receiver.address, ['tr1-w1', 'wallet'], [], [], true],
        },
        {
          func: 'issueWithRecords',
          note: 'mint',
          selector: 'issueWithRecords(address,string[],string[],string[],bool)',
          params: [receiver.address, ['tr1-w2', 'wallet'], [], [], false],
        },
        {
          func: 'issueWithRecords',
          note: 'mint',
          selector: 'issueWithRecords(address,string[],string[],string[],bool)',
          params: [
            receiver.address,
            ['tr2-w1', 'wallet'],
            ['crypto.MATIC.version.MATIC.address'],
            [coinbase.address],
            true,
          ],
        },
        {
          func: 'issueWithRecords',
          note: 'mint',
          selector: 'issueWithRecords(address,string[],string[],string[],bool)',
          params: [
            receiver.address,
            ['tr2-w2', 'wallet'],
            ['crypto.MATIC.version.MATIC.address'],
            [coinbase.address],
            false,
          ],
        },
        {
          func: 'issueWithRecords',
          note: 'mint',
          selector: 'issueWithRecords(address,string[],string[],string[],bool)',
          params: [
            receiver.address,
            ['tr3-w1', 'wallet'],
            ['crypto.MATIC.version.MATIC.address', 'crypto.ETH.address'],
            [coinbase.address, coinbase.address],
            true,
          ],
        },
        {
          func: 'issueWithRecords',
          note: 'mint',
          selector: 'issueWithRecords(address,string[],string[],string[],bool)',
          params: [
            receiver.address,
            ['tr3-w2', 'wallet'],
            ['crypto.MATIC.version.MATIC.address', 'crypto.ETH.address'],
            [coinbase.address, coinbase.address],
            false,
          ],
        },
        {
          func: 'issueWithRecords',
          note: 'mint',
          selector: 'issueWithRecords(address,string[],string[],string[],bool)',
          params: [
            receiver.address,
            ['tr4-w1', 'wallet'],
            [
              'crypto.MATIC.version.MATIC.address0',
              'crypto.MATIC.version.MATIC.address1',
              'crypto.MATIC.version.MATIC.address2',
              'crypto.MATIC.version.MATIC.address3',
              'crypto.MATIC.version.MATIC.address4',
              'crypto.MATIC.version.MATIC.address5',
              'crypto.MATIC.version.MATIC.address6',
              'crypto.MATIC.version.MATIC.address7',
              'crypto.MATIC.version.MATIC.address8',
              'crypto.MATIC.version.MATIC.address9',
            ],
            [
              coinbase.address,
              coinbase.address,
              coinbase.address,
              coinbase.address,
              coinbase.address,
              coinbase.address,
              coinbase.address,
              coinbase.address,
              coinbase.address,
              coinbase.address,
            ],
            true,
          ],
        },
        {
          func: 'issueWithRecords',
          note: 'mint',
          selector: 'issueWithRecords(address,string[],string[],string[],bool)',
          params: [
            receiver.address,
            ['tr4-w2', 'wallet'],
            [
              'crypto.MATIC.version.MATIC.address0',
              'crypto.MATIC.version.MATIC.address1',
              'crypto.MATIC.version.MATIC.address2',
              'crypto.MATIC.version.MATIC.address3',
              'crypto.MATIC.version.MATIC.address4',
              'crypto.MATIC.version.MATIC.address5',
              'crypto.MATIC.version.MATIC.address6',
              'crypto.MATIC.version.MATIC.address7',
              'crypto.MATIC.version.MATIC.address8',
              'crypto.MATIC.version.MATIC.address9',
            ],
            [
              coinbase.address,
              coinbase.address,
              coinbase.address,
              coinbase.address,
              coinbase.address,
              coinbase.address,
              coinbase.address,
              coinbase.address,
              coinbase.address,
              coinbase.address,
            ],
            false,
          ],
        },
      ];
    };

    it('Consumption', async () => {
      const result: unknown[] = [];

      const cases = getCases();
      const keys = cases
        .map((c) => c.params[2])
        .flat()
        .filter((value, index, array) => array.indexOf(value) === index);
      for (let i = 0; i < keys.length; i++) {
        await unsRegistry.addKey(keys[i] as string);
      }

      for (let i = 0; i < cases.length; i++) {
        const { note, selector, params } = cases[i];
        const [acc, labels, ...rest] = params;
        const executeParams = [acc, [labels[0] + 'r', labels[1]], ...rest];

        const tokenId = await unsRegistry.namehash(labels as string[]);
        const tokenId2 = await unsRegistry.namehash(executeParams[1] as string[]);

        const { req, signature } = await buildExecuteParams(selector, executeParams, coinbase, tokenId);
        const executeTx = await forwarder.connect(spender).execute(req, signature);

        const executeTxReceipt = await executeTx.wait();

        await removeReverse();

        const tx = await mintingManager[selector](...params);
        tx.receipt = await tx.wait();

        await removeReverse();

        result.push({
          note,
          selector,
          records: Array.isArray(params[2]) ? params[2].length : '-',
          reverse: params[4],
          execute: executeTxReceipt.gasUsed.toString(),
          send: tx.receipt.gasUsed.toString(),
          increase: percDiff(tx.receipt.gasUsed.toNumber(), executeTxReceipt.gasUsed.toNumber()) + ' %',
        });

        await unsRegistry.connect(receiver).setOwner(mintingManager.address, tokenId);
        await unsRegistry.connect(receiver).setOwner(mintingManager.address, tokenId2);
      }
      console.table(result);
    });
  });
});
