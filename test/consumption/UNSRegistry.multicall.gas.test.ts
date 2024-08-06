import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ContractTransactionReceipt, Interface } from 'ethers';
import { ethers } from 'hardhat';
import { UNSRegistry } from '../../types/contracts';
import { UNSRegistry__factory } from '../../types/factories/contracts';
import { ZERO_ADDRESS } from '../helpers/constants';
import { TLD } from '../../src/tlds';
import { percDiff } from '../helpers/consumption';

describe('UNSRegistry Multicall (consumption)', () => {
  let unsRegistry: UNSRegistry;
  let signers: SignerWithAddress[], coinbase: SignerWithAddress, receiver: SignerWithAddress;

  async function prepParams (params: unknown[][], labels: string[]) {
    const _params: unknown[][] = [];
    for (const param of params) {
      const _pms: unknown[] = [];
      for (const p of param) {
        if (typeof p != 'string') {
          _pms.push(p);
          continue;
        }
        if (p.startsWith('{labels}')) {
          const [, index] = p.split('/');
          _pms.push([`${labels[0]}-${index}`, labels[1]]);
        } else if (p.startsWith('{token_id}')) {
          const [, index] = p.split('/');
          const _labels = [`${labels[0]}-${index}`, labels[1]];
          _pms.push(await unsRegistry.namehash(_labels));
        } else {
          _pms.push(p);
        }
      }
      _params.push(_pms);
    }
    return _params;
  }

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, receiver] = signers;

    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistry.mintTLD(TLD.crypto.hash, 'crypto');
    await unsRegistry.setTokenURIPrefix('/');
  });

  it('Consumption', async () => {
    const result: unknown[] = [];

    const cases = [
      {
        name: 'mintWithRecords(0) + set + setOwner',
        labels: ['tm1-o0', 'crypto'],
        selectors: [
          'mintWithRecords(address,string[],string[],string[],bool)',
          'set(string,string,uint256)',
          'setOwner(address,uint256)',
        ],
        params: [
          [coinbase.address, '{labels}/0', [], [], false],
          ['ks1', 'vs1', '{token_id}/0'],
          [receiver.address, '{token_id}/0'],
        ],
      },
      {
        name: 'mintWithRecords(3) + set + setOwner',
        labels: ['tm1-o1', 'crypto'],
        selectors: [
          'mintWithRecords(address,string[],string[],string[],bool)',
          'set(string,string,uint256)',
          'setOwner(address,uint256)',
        ],
        params: [
          [
            coinbase.address,
            '{labels}/0',
            ['o898219c054e083f4241', 'r898219c054e083f4241', 'r898219c054e083f4242'],
            ['v1', 'v2', 'v3'],
            false,
          ],
          ['ks1', 'vs1', '{token_id}/0'],
          [receiver.address, '{token_id}/0'],
        ],
      },
      {
        name: 'mintWithRecords(3) + setMany(2) + setOwner',
        labels: ['tm1-o2', 'crypto'],
        selectors: [
          'mintWithRecords(address,string[],string[],string[],bool)',
          'setMany(string[],string[],uint256)',
          'setOwner(address,uint256)',
        ],
        params: [
          [coinbase.address, '{labels}/0', ['k1', 'k2', 'k3'], ['v1', 'v2', 'v3'], false],
          [['ks1', 'ks2'], ['vs1', 'vs2'], '{token_id}/0'],
          [receiver.address, '{token_id}/0'],
        ],
      },
      {
        name: '3 * mintWithRecords(3)',
        labels: ['tm1-o3', 'crypto'],
        selectors: [
          'mintWithRecords(address,string[],string[],string[],bool)',
          'mintWithRecords(address,string[],string[],string[],bool)',
          'mintWithRecords(address,string[],string[],string[],bool)',
        ],
        params: [
          [
            coinbase.address,
            '{labels}/0',
            ['k1', '9898219c054e083f4241', '9898219c054e083f4251'],
            ['v1', 'v2', 'v3'],
            false,
          ],
          [
            coinbase.address,
            '{labels}/1',
            ['k1', '9898219c054e083f4242', '9898219c054e083f4252'],
            ['v1', 'v2', 'v3'],
            false,
          ],
          [
            coinbase.address,
            '{labels}/2',
            ['k1', '9898219c054e083f4243', '9898219c054e083f4253'],
            ['v1', 'v2', 'v3'],
            false,
          ],
        ],
      },
    ];
    for (let i = 0; i < cases.length; i++) {
      const { name, labels, selectors, params } = cases[i];

      let cumGasUsed = BigInt(0);
      const params1 = await prepParams(params, labels);
      for (let i = 0; i < selectors.length; i++) {
        const tx = await unsRegistry[selectors[i]](...params1[i]);
        const receipt = (await tx.wait()) as ContractTransactionReceipt;
        cumGasUsed += receipt.gasUsed;
      }

      const labels2 = [labels[0] + '-multi', labels[1]];
      const params2 = await prepParams(params, labels2);

      const iface: Interface = unsRegistry.interface;
      const tx = await unsRegistry.multicall(
        selectors.map((selector, index) =>
          iface.encodeFunctionData(unsRegistry.interface.getFunctionName(selector), params2[index]),
        ),
      );
      const receipt = (await tx.wait())!;

      result.push({
        name,
        seq: cumGasUsed.toString(),
        multicall: receipt.gasUsed.toString(),
        increase: percDiff(cumGasUsed, receipt.gasUsed) + ' %',
      });
    }
    console.table(result);
  });
});
