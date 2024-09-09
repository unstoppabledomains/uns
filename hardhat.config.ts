import path from 'path';
import fs from 'fs';
import { HardhatUserConfig } from 'hardhat/types/config';
import { TASK_COMPILE } from 'hardhat/builtin-tasks/task-names';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from 'hardhat/config';
import { pickBy } from 'lodash';
import { gasPriceOracleABI } from '@eth-optimism/contracts-ts';

type MintersMap = Record<string, string[]>;

// We need to extend HardhatUserConfig in order to support custom uns settings.
declare module 'hardhat/types/config' {
  interface HardhatUserConfig {
    uns?: {
      minters: MintersMap;
      multisig: Record<string, string | null>;
    };
  }

  interface HardhatConfig {
    uns: {
      minters: MintersMap;
      multisig: Record<string, string>;
    };
  }

  interface ProjectPathsUserConfig {
    flatArtifacts: string;
  }

  interface ProjectPathsConfig {
    flatArtifacts: string;
  }
}

import '@typechain/hardhat';
import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-verify';
import '@nomicfoundation/hardhat-chai-matchers';

import '@nomiclabs/hardhat-solhint';
import 'hardhat-tracer';

import '@openzeppelin/hardhat-upgrades';

// There are no type declarations for
import 'solidity-coverage';

import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';
import yargs from 'yargs/yargs';

import { Sandbox } from './sandbox';

/// ENVVAR
// - ENABLE_GAS_REPORT
// - ENABLE_CONTRACT_SIZER
// - CI
const argv = yargs().env('').boolean('enableGasReport').boolean('enableContractSizer').boolean('ci').parseSync();

task(
  TASK_COMPILE,
  'hook compile task to perform post-compile task',
  async (_, hre: HardhatRuntimeEnvironment, runSuper) => {
    const { root, flatArtifacts } = hre.config.paths;
    const outputDir = path.resolve(root, flatArtifacts);

    await runSuper();

    if (fs.existsSync(outputDir)) {
      fs.rmdirSync(outputDir, { recursive: true });
    }
    fs.mkdirSync(outputDir, { recursive: true });

    for (const artifactPath of await hre.artifacts.getArtifactPaths()) {
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

task(
  TASK_COMPILE,
  'hook after abi exporting to manually add abis not included as contract',
  async (_, hre: HardhatRuntimeEnvironment, runSuper) => {
    await runSuper();

    const { root, flatArtifacts } = hre.config.paths;
    const outputDir = path.resolve(root, flatArtifacts, 'abi');

    const abis = [{ contract: 'L1GasPriceOracle', abi: gasPriceOracleABI }];

    for (const { contract, abi } of abis) {
      fs.writeFileSync(path.join(outputDir, `${contract}.json`), JSON.stringify(abi));
    }
  },
);

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
        version: '0.8.17',
        settings: {
          ...settings,
          metadata: {
            bytecodeHash: 'none',
          },
        },
      },
      {
        version: '0.8.24',
        settings: {
          ...settings,
          metadata: {
            bytecodeHash: 'none',
          },
          evmVersion: 'cancun',
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
      hardfork: 'cancun',
    },
    localhost: {
      url: 'http://localhost:8545',
      chainId: 31337,
      loggingEnabled: true,
    },
    sandbox: Sandbox.defaultNetworkOptions(),
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.SEPOLIA_INFURA_KEY}`,
      chainId: 11155111,
      accounts: process.env.SEPOLIA_UNS_PRIVATE_KEY ? [process.env.SEPOLIA_UNS_PRIVATE_KEY] : undefined,
    },
    amoy: {
      url: `https://polygon-amoy.infura.io/v3/${process.env.AMOY_INFURA_KEY}`,
      chainId: 80002,
      accounts: process.env.AMOY_UNS_PRIVATE_KEY ? [process.env.AMOY_UNS_PRIVATE_KEY] : undefined,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.MAINNET_INFURA_KEY}`,
      chainId: 1,
      accounts: process.env.MAINNET_UNS_PRIVATE_KEY ? [process.env.MAINNET_UNS_PRIVATE_KEY] : undefined,
      loggingEnabled: true,
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${process.env.POLYGON_INFURA_KEY}`,
      chainId: 137,
      accounts: process.env.POLYGON_UNS_PRIVATE_KEY ? [process.env.POLYGON_UNS_PRIVATE_KEY] : undefined,
      loggingEnabled: true,
    },
    base: {
      url: `https://base-mainnet.infura.io/v3/${process.env.BASE_INFURA_KEY}`,
      chainId: 8453,
      accounts: process.env.BASE_UNS_PRIVATE_KEY ? [process.env.BASE_UNS_PRIVATE_KEY] : undefined,
      loggingEnabled: true,
    },
    baseSepolia: {
      url: `https://base-sepolia.infura.io/v3/${process.env.BASE_INFURA_KEY}`,
      chainId: 84532,
      accounts: process.env.BASE_UNS_PRIVATE_KEY ? [process.env.BASE_UNS_PRIVATE_KEY] : undefined,
      loggingEnabled: true,
    },
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v6',
  },
  gasReporter: {
    enabled: argv.enableGasReport,
    currency: 'USD',
    outputFile: argv.ci ? 'gas-report.txt' : undefined,
    excludeContracts: ['ERC721ReceiverMock', 'ERC2771RegistryContextMock', 'ERC20Upgradeable'],
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: argv.enableContractSizer,
    disambiguatePaths: false,
    only: ['UNSRegistry.sol', 'ProxyReader.sol', 'MintingManager.sol', 'ENSCustody.sol'],
  },
  mocha: {
    timeout: 100000,
  },
  etherscan: {
    apiKey: pickBy({
      mainnet: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonAmoy: process.env.POLYGONSCAN_API_KEY,
      base: process.env.BASESCAN_API_KEY,
      baseSepolia: process.env.BASESCAN_API_KEY,
    }) as Record<string, string>,
    customChains: [
      {
        network: 'polygonAmoy',
        chainId: 80002,
        urls: {
          apiURL: 'https://api-amoy.polygonscan.com/api',
          browserURL: 'https://amoy.polygonscan.com/',
        },
      },
      {
        network: 'baseSepolia',
        chainId: 84532,
        urls: {
          apiURL: 'https://api-sepolia.basescan.org/api',
          browserURL: 'https://sepolia.basescan.org/',
        },
      },
    ],
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
      sepolia: ['0x1daf08a27304a78434e22ab79bea508e341f910d'],
      amoy: ['0x31df70766e92c0a69ada7ecb6dc1634d64748be2'],
      mainnet: ['0x5465c72ce00196550d6f89c40830f6bc81599f4f'],
      polygon: ['0x58cb2542a5b3b0999d41de59ad03331bbfb4dda3'],
      baseSepolia: ['0x1eE5eee9D19A8923443FfC57ED2754f02cef5959'],
      base: [], // TODO: add base minter
    },
    multisig: {
      mainnet: '0x6bEca92600be24179ae70A430AEF4aE632fddDc8',
      polygon: '0xC8E1B5c41c42ad1cE8336714cA2b2f2588F0a337',
      sepolia: '0x1197C09C38d460584473e8837D79c14343f24890',
      amoy: '0x458adB6cce7D9984b74bC83c6F71Fbd1fd16085e',
      baseSepolia: '0x22fDBFdD0FE93865F0213E5437931223B2E3F198',
      base: '0xfEc540DfD4e9929d6c29ceA92fc88F1abF2d772C',
    },
  },
  defender: {
    apiKey: process.env.DEFENDER_API_KEY || '',
    apiSecret: process.env.DEFENDER_API_SECRET || '',
  },
};

export default config;
