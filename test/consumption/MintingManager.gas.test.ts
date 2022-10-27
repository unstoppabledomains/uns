import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { MintingManager, UNSRegistry } from '../../typechain-types/contracts';
import { MintingManagerForwarder } from '../../typechain-types/contracts/metatx';
import { MintingManager__factory, UNSRegistry__factory } from '../../typechain-types/factories/contracts';
import { MintingManagerForwarder__factory } from '../../typechain-types/factories/contracts/metatx';
import { ZERO_ADDRESS, TLD } from '../helpers/constants';
import { buildExecuteFunc, ExecuteFunc } from '../helpers/metatx';

describe('MintingManager (consumption)', () => {
  let unsRegistry: UNSRegistry, mintingManager: MintingManager, forwarder: MintingManagerForwarder;
  let signers: SignerWithAddress[], coinbase: SignerWithAddress, receiver: SignerWithAddress, spender: SignerWithAddress;

  function percDiff (a: number, b: number) {
    return -((a - b) / a) * 100;
  }

  let buildExecuteParams: ExecuteFunc;

  async function removeReverse () {
    const removeReverseTx = await unsRegistry.connect(receiver).removeReverse();
    await removeReverseTx.wait();
  }

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, , receiver, spender] = signers;

    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
    mintingManager = await new MintingManager__factory(coinbase).deploy();
    await unsRegistry.initialize(mintingManager.address);

    forwarder = await new MintingManagerForwarder__factory(coinbase).deploy(mintingManager.address);

    await mintingManager.initialize(
      unsRegistry.address,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
    );
    await mintingManager.addMinter(coinbase.address);
    await mintingManager.setTokenURIPrefix('/');
    await mintingManager.setForwarder(forwarder.address);

    buildExecuteParams = buildExecuteFunc(
      mintingManager.interface,
      mintingManager.address,
      forwarder,
    );
  });

  describe('Mint consumprion', () => {
    const getCases = () => {
      return [
        {
          func: 'mintSLD',
          selector: 'mintSLD(address,uint256,string)',
          params: [receiver.address, TLD.WALLET, 't1-w1-'],
        },
        {
          func: 'safeMintSLD',
          selector: 'safeMintSLD(address,uint256,string)',
          params: [receiver.address, TLD.WALLET, 't1-m1-'],
        },
        {
          func: 'safeMintSLD',
          selector: 'safeMintSLD(address,uint256,string,bytes)',
          params: [receiver.address, TLD.WALLET, 't1-y1-', '0x'],
        },
      ];
    };

    it('Consumption', async () => {
      const result: any[] = [];

      const cases = getCases();
      for (let i = 0; i < cases.length; i++) {
        const { selector, params } = cases[i];
        const [acc, root, token, ...rest] = params;
        const executeParams = [acc, root, token + 'r', ...rest];

        const tokenId = await unsRegistry.childIdOf(root, executeParams[2].toString());
        const { req, signature } = await buildExecuteParams(
          selector,
          executeParams,
          coinbase,
          tokenId,
        );
        const executeTx = await forwarder
          .connect(spender)
          .execute(req, signature);

        const executeTxReceipt = await executeTx.wait();

        await removeReverse();

        const tx = await mintingManager[selector](...params);
        tx.receipt = await tx.wait();

        await removeReverse();

        result.push({
          selector,
          records: Array.isArray(params[2]) ? params[2].length : '-',
          send: tx.receipt.gasUsed.toString(),
          execute: executeTxReceipt.gasUsed.toString(),
          increase:
            percDiff(tx.receipt.gasUsed.toNumber(), executeTxReceipt.gasUsed.toNumber()).toFixed(2) +
            ' %',
        });
      }
      console.table(result);
    });
  });
});
