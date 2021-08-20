const { ethers } = require('hardhat');

const { ZERO_ADDRESS, TLD } = require('./../helpers/constants');

const { utils } = ethers;

describe('MintingManager (consumption)', () => {
  let UNSRegistry, MintingManager;
  let unsRegistry, mintingManager;
  let signers, coinbase, receiver, spender;

  const sign = async (data, address, signer) => {
    return signer.signMessage(
      utils.arrayify(
        utils.solidityKeccak256(
          [ 'bytes32', 'address' ],
          [ utils.keccak256(data), address ],
        ),
      ),
    );
  };

  function percDiff (a, b) {
    return -((a - b) / a) * 100;
  }

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    MintingManager = await ethers.getContractFactory('MintingManager');

    [, , receiver, spender] = signers;

    unsRegistry = await UNSRegistry.deploy();
    mintingManager = await MintingManager.deploy();
    await unsRegistry.initialize(mintingManager.address);

    await mintingManager.initialize(unsRegistry.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await mintingManager.addMinter(coinbase.address);
    await mintingManager.setTokenURIPrefix('/');
  });

  describe('Relay', () => {
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
        const relayParams = [acc, root, token + 'r', ...rest];

        const callData = mintingManager.interface.encodeFunctionData(selector, relayParams);
        const signature = sign(callData, mintingManager.address, coinbase);
        const relayTx = await mintingManager.connect(spender).relay(callData, signature);
        relayTx.receipt = await relayTx.wait();

        const tx = await mintingManager[selector](...params);
        tx.receipt = await tx.wait();

        result.push({
          selector,
          records: Array.isArray(params[2]) ? params[2].length : '-',
          send: tx.receipt.gasUsed.toString(),
          relay: relayTx.receipt.gasUsed.toString(),
          increase:
            percDiff(tx.receipt.gasUsed, relayTx.receipt.gasUsed).toFixed(2) +
            ' %',
        });
      }
      console.table(result);
    });
  });
});
