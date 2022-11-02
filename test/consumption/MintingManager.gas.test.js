const { ethers } = require('hardhat');

const { ZERO_ADDRESS } = require('../helpers/constants');
const { buildExecuteFunc } = require('../helpers/metatx');

describe('MintingManager (consumption)', () => {
  let UNSRegistry, MintingManager, MintingManagerForwarder;
  let unsRegistry, mintingManager, forwarder, buildExecuteParams;
  let signers, coinbase, receiver, spender;

  function percDiff (a, b) {
    return -((a - b) / a) * 100;
  }

  async function removeReverse () {
    const removeReverseTx = await unsRegistry.connect(receiver).removeReverse();
    await removeReverseTx.wait();
  }

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    MintingManager = await ethers.getContractFactory('MintingManager');
    MintingManagerForwarder = await ethers.getContractFactory(
      'MintingManagerForwarder',
    );

    [, , receiver, spender] = signers;

    unsRegistry = await UNSRegistry.deploy();
    mintingManager = await MintingManager.deploy();
    await unsRegistry.initialize(mintingManager.address);

    forwarder = await MintingManagerForwarder.deploy(mintingManager.address);

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

  describe('Mint consumption', () => {
    const getCases = () => {
      return [
        {
          func: 'issueWithRecords',
          note: 'mint',
          selector: 'issueWithRecords(address,string[],string[],string[])',
          params: [receiver.address, ['t1-w1-', 'wallet'], [], []],
        },
        {
          func: 'issueWithRecords',
          note: 'unlock',
          selector: 'issueWithRecords(address,string[],string[],string[])',
          params: [receiver.address, ['t1-w1-', 'wallet'], [], []],
        },
      ];
    };

    it('Consumption', async () => {
      const result = [];

      const cases = getCases();
      for (let i = 0; i < cases.length; i++) {
        const { note, selector, params } = cases[i];
        const [acc, labels, ...rest] = params;
        const executeParams = [acc, [labels[0] + 'r', labels[1]], ...rest];

        const tokenId = await unsRegistry.namehash(labels);
        const tokenId2 = await unsRegistry.namehash(executeParams[1]);
        const { req, signature } = await buildExecuteParams(
          selector,
          executeParams,
          coinbase,
          tokenId,
        );
        const executeTx = await forwarder
          .connect(spender)
          .execute(req, signature);
        executeTx.receipt = await executeTx.wait();

        await removeReverse();

        const tx = await mintingManager[selector](...params);
        tx.receipt = await tx.wait();

        await removeReverse();

        result.push({
          note,
          selector,
          records: Array.isArray(params[2]) ? params[2].length : '-',
          send: tx.receipt.gasUsed.toString(),
          execute: executeTx.receipt.gasUsed.toString(),
          increase:
            percDiff(tx.receipt.gasUsed, executeTx.receipt.gasUsed).toFixed(2) +
            ' %',
        });

        await unsRegistry.connect(receiver).setOwner(mintingManager.address, tokenId);
        await unsRegistry.connect(receiver).setOwner(mintingManager.address, tokenId2);
      }
      console.table(result);
    });
  });
});
