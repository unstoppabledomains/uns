import { HardhatUserConfig } from 'hardhat/types/config';
import { TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';
import path from 'path';
import fs from 'fs';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';

type MintersMap = Record<string, string[]>

// We need to extend HardhatUserConfig in order to support custom uns settings.
declare module 'hardhat/types/config' {
  interface HardhatUserConfig {
    uns?: {
      minters: MintersMap,
    }
  }

  interface HardhatConfig {
    uns: {
      minters: MintersMap
    }
  }

  interface ProjectPathsUserConfig {
    flatArtifacts: string;
  }

  interface ProjectPathsConfig {
    flatArtifacts: string;
  }
}

import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-solhint';
import '@nomiclabs/hardhat-etherscan';

import '@openzeppelin/hardhat-upgrades';

// There are no type declarations for
require('solidity-coverage');

import 'hardhat-gas-reporter';

import 'hardhat-contract-sizer';

import { Sandbox } from './sandbox';

import yargs from 'yargs/yargs';

/// ENVVAR
// - ENABLE_GAS_REPORT
// - ENABLE_CONTRACT_SIZER
// - CI
const argv = yargs()
  .env('')
  .boolean('enableGasReport')
  .boolean('enableContractSizer')
  .boolean('ci')
  .parseSync();

task(
  TASK_COMPILE,
  'hook compile task to perform post-compile task',
  async (_, hardhatRuntimeEnv: HardhatRuntimeEnvironment, runSuper) => {
    const { root, flatArtifacts } = hardhatRuntimeEnv.config.paths;
    const outputDir = path.resolve(root, flatArtifacts);

    await runSuper();

    if (fs.existsSync(outputDir)) {
      fs.rmdirSync(outputDir, { recursive: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });

    for (const artifactPath of await hardhatRuntimeEnv.artifacts.getArtifactPaths()) {
      const artifact = fs.readFileSync(artifactPath);
      const { abi, contractName } = JSON.parse(artifact.toString());
      if (!abi.length || contractName.includes('Mock')) continue;

      const target = path.join(outputDir, `${contractName}.json`);
      fs.copyFileSync(artifactPath, target);
    }
  },
);

// NOTE: Order matters
import 'hardhat-abi-exporter';

const settings = {
  optimizer: {
    enabled: true,
    runs: 200,
  },
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.5.12',
        settings,
      },
      {
        version: '0.6.6',
        settings: {
          ...settings,
          metadata: {
            bytecodeHash: 'none',
          },
        },
      },
      {
        version: '0.8.4',
        settings: {
          ...settings,
          metadata: {
            bytecodeHash: 'none',
          },
        },
      },
    ],
  },
  paths: {
    artifacts: './.artifacts',
    flatArtifacts: './artifacts',
  },
  networks: {
    hardhat: {
      blockGasLimit: 10000000,
      initialBaseFeePerGas: 0,
      hardfork: 'merge',
    },
    localhost: {
      url: 'http://localhost:8545',
      chainId: 31337,
      loggingEnabled: true,
    },
    sandbox: Sandbox.defaultNetworkOptions(),
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.GOERLI_INFURA_KEY}`,
      chainId: 5,
      accounts: process.env.GOERLI_UNS_PRIVATE_KEY
        ? [process.env.GOERLI_UNS_PRIVATE_KEY]
        : undefined,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.MAINNET_INFURA_KEY}`,
      chainId: 1,
      accounts: process.env.MAINNET_UNS_PRIVATE_KEY
        ? [process.env.MAINNET_UNS_PRIVATE_KEY]
        : undefined,
      loggingEnabled: true,
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.MUMBAI_INFURA_KEY}`,
      chainId: 80001,
      accounts: process.env.MUMBAI_UNS_PRIVATE_KEY
        ? [process.env.MUMBAI_UNS_PRIVATE_KEY]
        : undefined,
      loggingEnabled: true,
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${process.env.POLYGON_INFURA_KEY}`,
      chainId: 137,
      accounts: process.env.POLYGON_UNS_PRIVATE_KEY
        ? [process.env.POLYGON_UNS_PRIVATE_KEY]
        : undefined,
      loggingEnabled: true,
    },
  },
  gasReporter: {
    enabled: argv.enableGasReport,
    currency: 'USD',
    outputFile: argv.ci ? 'gas-report.txt' : undefined,
    excludeContracts: [
      'ERC721ReceiverMock',
      'ERC2771RegistryContextMock',
      'ERC20Upgradeable',
    ],
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: argv.enableContractSizer,
    disambiguatePaths: false,
    only: ['UNSRegistry.sol', 'ProxyReader.sol', 'MintingManager.sol'],
  },
  mocha: {
    timeout: 100000,
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
    },
  },
  abiExporter: {
    path: './artifacts/abi',
    clear: true,
    flat: true,
    except: ['Mock'],
    spacing: 0,
  },
  uns: {
    minters: {
      hardhat: ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'],
      localhost: ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'],
      sandbox: ['0x9DC64b2558b458A15C7f01c192D874Ef460f0A29'],
      goerli: [
        '0xb3B86785A51B950fd54ABdF420ff3B60E091870c',
        '0x7EF88A779651f26a4967026a32Cae4F01fF8D151',
        '0x0c71a3494484459bbF9777Dd3109515B2E653CCb',
        '0x288DA3443BBEBcc7a339182323aa3F23126DFe7a',
        '0xe45541799119C1D63b60e0F834F3A381D4BEDbea',
        '0xdb36B5c4cF1D96f020D7629a09cB54ab787414d6',
        '0x3b9FB7983d897B7fe2fD7563e07e24CbA830b03B',
        '0x903aA579B9eF13862Fda73275B349017d8fD09eB',
        '0x7Ac8596cfbb0504DFDEC08d5088B67E7fbfae47f',
        '0xB83180632b72f988585AF02FC27229bF2Eabd139',
        '0x1daf08a27304a78434e22ab79bea508e341f910d',
      ],
      mainnet: [],
      mumbai: ['0xc152ba5caa9db5883f2cfefb984610fd3bd7914a'],
      polygon: ['0xd8263053a6d08ef3acbf2381f144b90841726233'],
    },
  },
};

export default config;
