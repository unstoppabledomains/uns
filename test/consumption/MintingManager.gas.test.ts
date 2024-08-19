import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { getBytes, parseEther, solidityPackedKeccak256 } from 'ethers';
import { ethers, network } from 'hardhat';
import { ERC20Mock, ERC20Mock__factory } from '../../types';
import { MintingManager, UNSRegistry } from '../../types/contracts';
import { MintingManagerForwarder } from '../../types/contracts/metatx';
import { MintingManager__factory, UNSRegistry__factory } from '../../types/factories/contracts';
import { MintingManagerForwarder__factory } from '../../types/factories/contracts/metatx';
import { ZERO_ADDRESS } from '../helpers/constants';
import { percDiff } from '../helpers/consumption';
import { buildExecuteFunc, ExecuteFunc } from '../helpers/metatx';
import { getLatestBlockTimestamp, increaseTimeBy } from '../helpers/utils';
import { mintUnsTlds } from '../../src/helpers';

describe('MintingManager (consumption)', () => {
  let unsRegistry: UNSRegistry, mintingManager: MintingManager, forwarder: MintingManagerForwarder;
  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    receiver: SignerWithAddress,
    spender: SignerWithAddress;

  let latestBlockTimestamp: number;

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
    await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

    forwarder = await new MintingManagerForwarder__factory(coinbase).deploy(await mintingManager.getAddress());

    await mintingManager.initialize(
      await unsRegistry.getAddress(),
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
    );
    await mintingManager.addMinter(coinbase.address);
    await mintingManager.setTokenURIPrefix('/');
    await mintingManager.setForwarder(await forwarder.getAddress());

    buildExecuteParams = buildExecuteFunc(mintingManager.interface, await mintingManager.getAddress(), forwarder);
    await mintUnsTlds(mintingManager, coinbase);
  });

  beforeEach(async () => {
    latestBlockTimestamp = await getLatestBlockTimestamp();
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

        const executeTxReceipt = (await executeTx.wait())!;

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
          increase: percDiff(tx.receipt.gasUsed, executeTxReceipt.gasUsed) + ' %',
        });

        await unsRegistry.connect(receiver).setOwner(await mintingManager.getAddress(), tokenId);
        await unsRegistry.connect(receiver).setOwner(await mintingManager.getAddress(), tokenId2);
      }
      console.table(result);
    });
  });

  describe('Mint expirable consumption', () => {
    const getCases = () => {
      const expiry = latestBlockTimestamp + 2 * 60 * 60 * 24;

      return [
        {
          func: 'issueExpirableWithRecords',
          note: 'mint expirable',
          selector: 'issueExpirableWithRecords(address,string[],string[],string[],uint64,bool)',
          params: [receiver.address, ['expirable-consumption', 'com'], [], [], expiry, true],
        },
        {
          func: 'issueExpirableWithRecords',
          note: 're-mint returned expirable',
          selector: 'issueExpirableWithRecords(address,string[],string[],string[],uint64,bool)',
          params: [receiver.address, ['expirable-consumption', 'com'], [], [], expiry, true],
        },
        {
          func: 'issueExpirableWithRecords',
          note: 're-mint expired',
          selector: 'issueExpirableWithRecords(address,string[],string[],string[],uint64,bool)',
          params: [receiver.address, ['expired-consumption', 'com'], [], [], expiry, true],
        },
      ];
    };

    it('Consumption', async () => {
      const result: unknown[] = [];

      await mintingManager.issueExpirableWithRecords(
        spender.address,
        ['expired-consumption', 'com'],
        [],
        [],
        latestBlockTimestamp + 60 * 60 * 24,
        true,
      );
      await mintingManager.issueExpirableWithRecords(
        spender.address,
        ['expired-consumption-meta', 'com'],
        [],
        [],
        latestBlockTimestamp + 60 * 60 * 24,
        true,
      );
      await increaseTimeBy(60 * 60 * 24);

      const cases = getCases();

      for (let i = 0; i < cases.length; i++) {
        const { note, selector, params } = cases[i];
        const [acc, labels, ...rest] = params;
        const executeParams = [acc, [labels[0] + '-meta', labels[1]], ...rest];

        const tokenId = await unsRegistry.namehash(labels as string[]);
        const tokenId2 = await unsRegistry.namehash(executeParams[1] as string[]);

        const { req, signature } = await buildExecuteParams(selector, executeParams, coinbase, tokenId);
        const executeTx = await forwarder.connect(spender).execute(req, signature);

        const executeTxReceipt = (await executeTx.wait())!;

        await removeReverse();

        const tx = await mintingManager[selector](...params);
        tx.receipt = await tx.wait();

        await removeReverse();

        result.push({
          note,
          selector,
          records: Array.isArray(params[2]) ? params[2].length : '-',
          reverse: params[5],
          execute: executeTxReceipt.gasUsed.toString(),
          send: tx.receipt.gasUsed.toString(),
          increase: percDiff(tx.receipt.gasUsed, executeTxReceipt.gasUsed) + ' %',
        });

        await unsRegistry.connect(receiver).setOwner(await mintingManager.getAddress(), tokenId);
        await unsRegistry.connect(receiver).setOwner(await mintingManager.getAddress(), tokenId2);
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

        const executeTxReceipt = (await executeTx.wait())!;

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
          increase: percDiff(tx.receipt.gasUsed, executeTxReceipt.gasUsed) + ' %',
        });

        await unsRegistry.connect(receiver).setOwner(await mintingManager.getAddress(), tokenId);
        await unsRegistry.connect(receiver).setOwner(await mintingManager.getAddress(), tokenId2);
      }
      console.table(result);
    });
  });

  describe('Purchases', () => {
    let erc20Mock: ERC20Mock;
    const chainId = network.config.chainId;

    const buyDomain = async () => {
      const expiry = latestBlockTimestamp + 24 * 60 * 60;
      const price = parseEther('1');

      const labels = ['onchainpurchase-consumption', 'nft'];
      const tokenId = await unsRegistry.namehash(labels);

      const purchaseHash = getBytes(
        solidityPackedKeccak256(
          ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
          [await mintingManager.getAddress(), chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
        ),
      );
      const signature = await coinbase.signMessage(purchaseHash);

      const tx = await mintingManager
        .connect(spender)
        .buy(spender.address, labels, ['key'], ['value'], expiry, price, signature, { value: price });

      return (await tx.wait())!;
    };

    const buyDomainForErc20 = async () => {
      const expiry = latestBlockTimestamp + 24 * 60 * 60;
      const price = parseEther('1');

      const labels = ['onchainpurchase-consumption-erc20', 'nft'];
      const tokenId = await unsRegistry.namehash(labels);

      const purchaseHash = getBytes(
        solidityPackedKeccak256(
          ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
          [
            await mintingManager.getAddress(),
            chainId,
            spender.address,
            tokenId,
            expiry,
            price,
            await erc20Mock.getAddress(),
          ],
        ),
      );
      const signature = await coinbase.signMessage(purchaseHash);

      await erc20Mock.connect(spender).approve(await mintingManager.getAddress(), price);

      const tx = await mintingManager
        .connect(spender)
        .buyForErc20(
          spender.address,
          labels,
          ['key'],
          ['value'],
          expiry,
          await erc20Mock.getAddress(),
          price,
          signature,
        );

      return (await tx.wait())!;
    };

    before(async () => {
      erc20Mock = await new ERC20Mock__factory(coinbase).deploy();

      await erc20Mock.mint(spender.address, parseEther('1'));
    });

    it('Consumption', async () => {
      const result: unknown[] = [];

      await mintingManager.connect(coinbase).issueWithRecords(spender.address, ['reverse', 'x'], [], [], true);

      const buyDomainReceipt = await buyDomain();
      const buyDomainErc20Receipt = await buyDomainForErc20();

      result.push({
        note: 'Domain Purchase (Native Tokens)',
        selector: 'buy(address,string[],string[],string[],uint64,uint256,bytes)',
        records: 1,
        gasUsed: buyDomainReceipt.gasUsed.toString(),
      });

      result.push({
        note: 'Domain Purchase (ERC20)',
        selector: 'buy(address,string[],string[],string[],uint64,address,uint256,bytes)',
        records: 1,
        gasUsed: buyDomainErc20Receipt.gasUsed.toString(),
      });

      console.table(result);
    });
  });
});
