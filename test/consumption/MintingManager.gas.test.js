const { ethers } = require('hardhat');

const { ZERO_ADDRESS, TLD } = require('../helpers/constants');
const { buildExecuteFunc } = require('../helpers/metatx');

describe('MintingManager (consumption)', () => {
  let UNSRegistry, MintingManager, MintingManagerForwarder;
  let unsRegistry, mintingManager, forwarder, buildExecuteParams;
  let signers, coinbase, receiver, spender;

  function percDiff (a, b) {
    return -((a - b) / a) * 100;
  }

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    MintingManager = await ethers.getContractFactory('MintingManager');
    MintingManagerForwarder = await ethers.getContractFactory('MintingManagerForwarder');

    [, , receiver, spender] = signers;

    unsRegistry = await UNSRegistry.deploy();
    mintingManager = await MintingManager.deploy();
    await unsRegistry.initialize(mintingManager.address);

    forwarder = await MintingManagerForwarder.deploy(mintingManager.address);

    await mintingManager.initialize(unsRegistry.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await mintingManager.addMinter(coinbase.address);
    await mintingManager.setTokenURIPrefix('/');
    await mintingManager.setForwarder(forwarder.address);

    buildExecuteParams = buildExecuteFunc(mintingManager.interface, mintingManager.address, forwarder);
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
      const result = [];

      const cases = getCases();
      for (let i = 0; i < cases.length; i++) {
        const { selector, params } = cases[i];
        const [acc, root, token, ...rest] = params;
        const executeParams = [acc, root, token + 'r', ...rest];

        const tokenId = await unsRegistry.childIdOf(root, executeParams[2]);
        const { req, signature } = await buildExecuteParams(selector, executeParams, coinbase, tokenId);
        const executeTx = await forwarder.connect(spender).execute(req, signature);
        executeTx.receipt = await executeTx.wait();

        const tx = await mintingManager[selector](...params);
        tx.receipt = await tx.wait();

        result.push({
          selector,
          records: Array.isArray(params[2]) ? params[2].length : '-',
          send: tx.receipt.gasUsed.toString(),
          execute: executeTx.receipt.gasUsed.toString(),
          increase:
            percDiff(tx.receipt.gasUsed, executeTx.receipt.gasUsed).toFixed(2) +
            ' %',
        });
      }
      console.table(result);
    });
  });
});
