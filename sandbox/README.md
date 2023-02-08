# `Sandbox`

The tool allows to spin-up blockchain environment(emulator) with pre-deployed UNS(including CNS) smart contracts. It is useful for unit/integration testing. In order to simplify test setup, the state of the environment can be restored to initial state of the sandbox.

&nbsp;

## Quickstart
_Running Sandbox locally as a `testnet`_
```
yarn ts-node sandbox/run.ts
```

&nbsp;

## Development
### Running scripts
```
yarn hardhat run --network sandbox ../uns/scripts/deploy_full.ts
```
_`Note:`_ this will overwrite `uns-config.json` with new values once you deploy the smart contracts.

&nbsp;

### Interacting with the `Sandbox`
```
yarn hardhat console --network sandbox
> let cnsRegistry = await ethers.getContractAt('CNSRegistry', 0x4Eb9dE1Fc0d800e941F326d6699E9E11969557ea);
> cnsRegistry.
```

### Network config

- URL: http://localhost:7545
- CHAIN_ID: 1337
### Accounts

The emulator uses mnemonic for preparing list of accounts. It always has strict list of accounts:

```
Available Accounts
==================
(0) 0xfe84Ab89b7Fc902Ff3CfD756403a8f085B1639Aa (1000 ETH)    // CNS & UNS deployer
(1) 0x9DC64b2558b458A15C7f01c192D874Ef460f0A29 (1000 ETH)    // Minter
(2) 0x94F57ed7e9af03A10e8EB23CE1B3c7914a182b0f (1000 ETH)
(3) 0x936188f2C3C8E8c95e425b6fe41c2ac9E701585e (1000 ETH)
(4) 0x95f29431AEb52C0D5DbEEEC36010b8e2CA69CB3D (1000 ETH)
(5) 0x19356cc2300833E690088a5a09A2044A3CC2A1E2 (1000 ETH)
(6) 0x8861CdFa38838531275cE12F9e795C3b9fF29cBE (1000 ETH)
(7) 0x0712e8e819712C3bfdb098CE51C87a4Ac0296fd8 (1000 ETH)
(8) 0xAA33d7188Eb4b4A51C37199eaaD2f73cf2bF0204 (1000 ETH)
(9) 0xead34b583404E3Cb0C9b97C2d1C486BE67Be9F30 (1000 ETH)    // Funding account

Private Keys
==================
(0) 0x6b657c280147dd393162442cda5f55b8af7c59986237f4c602531d1e994d5a6d
(1) 0x6c9ad2b70a3ca6e989a0715b710f3ed689b1cfe4c1494ede70241762ffb76c9b
(2) 0x50f58d79e0b89e2f4070721184eaa96fd5c3d096d4885969cf3fac70aaf522cd
(3) 0xfa30d0923973acd541d3dd3e9f8c2d253b7ecd52b316478f9dd24c88d7eff16d
(4) 0x407a6090c4b168dab2680cba8c4e6ff54b9d58ada126607b4451c9a4646f029b
(5) 0xe820b165e308ac2a2b32cc2fd4d694373b9910ce216ebeddcec10dbc2091c618
(6) 0x0402143af3ed84c7d05ce13b8601733a6e9c01d287f30e481f180bb38174aae7
(7) 0x5ca5f7763a6b5d49deca6620803ec47c4dd910380e8e9cf7780857b95318a1a3
(8) 0x6708567060a74fe47d7f9b9e7a5af1bc30ffbc641566c96f6413323591042a3c
(9) 0xf15dabfb20f3e891e7a9308bb3acb5498200b968ca4feebf8e2e9e561ee71778

HD Wallet
==================
Mnemonic:      mimic dune forward party defy island absorb insane deputy obvious brother immense
Base HD Path:  m/44'/60'/0'/0/{account_index}
```

### Sandbox UNS config

[>> config file](./../uns-config.json)

### Example of usage

```
import { Sandbox } from 'uns';

describe('Test', async () => {
  let sandbox: Sandbox;

  before(async () => {
    sandbox = await Sandbox.create();
    await sandbox.start();
  })

  beforeEach(async () => {
    await sandbox.reset();
  });

  after(async () => {
    await sandbox.stop();
  });

  it('test1', async () => {
    ...
  })

  it('test2', async () => {
    ...
  })
})
```

## Rebuilding the Sandbox DB snapshot

Sandbox has database snapshot of blockchain in order to spin-up the environment.
The snapshot is prebuilded and included in a package with the sandbox.
A new deployment script might be a reason to rebuild the sandbox snapshot. In order to do this there is a yarn command:

```
yarn rebuild:sandbox
```
