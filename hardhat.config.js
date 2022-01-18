const { task } = require('hardhat/config');
const { TASK_COMPILE } = require('hardhat/builtin-tasks/task-names');
const path = require('path');
const fs = require('fs');

const Sandbox = require('./sandbox');

/// ENVVAR
// - ENABLE_GAS_REPORT
// - ENABLE_CONTRACT_SIZER
// - CI
const argv = require('yargs/yargs')()
  .env('')
  .boolean('enableGasReport')
  .boolean('enableContractSizer')
  .boolean('ci')
  .argv;

require('@openzeppelin/hardhat-upgrades');
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-solhint');
require('@nomiclabs/hardhat-etherscan');
require('solidity-coverage');

if (argv.enableGasReport) {
  require('hardhat-gas-reporter');
}

if (argv.enableContractSizer) {
  require('hardhat-contract-sizer');
}

task(TASK_COMPILE, 'hook compile task to perform post-compile task', async (_, hre, runSuper) => {
  const { root, flatArtifacts } = hre.config.paths;
  const outputDir = path.resolve(root, flatArtifacts);

  await runSuper();

  fs.rmdirSync(outputDir, { recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });

  for (const artifactPath of await hre.artifacts.getArtifactPaths()) {
    const artifact = fs.readFileSync(artifactPath);
    const { abi, contractName } = JSON.parse(artifact);
    if (!abi.length || contractName.includes('Mock')) continue;

    const target = path.join(outputDir, `${contractName}.json`);
    fs.copyFileSync(artifactPath, target);
  }
});

// NOTE: Order matters
require('hardhat-abi-exporter');

const settings = {
  optimizer: {
    enabled: true,
    runs: 200,
  },
};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
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
        version: '0.8.0',
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
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.RINKEBY_INFURA_KEY}`,
      chainId: 4,
      accounts: process.env.RINKEBY_UNS_PRIVATE_KEY
        ? [process.env.RINKEBY_UNS_PRIVATE_KEY]
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
    currency: 'USD',
    outputFile: argv.ci ? 'gas-report.txt' : undefined,
    excludeContracts: [
      'ERC721ReceiverMock',
      'ERC2771RegistryContextMock',
      'ERC20Upgradeable',
      'LinkTokenMock',
    ],
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  mocha: {
    timeout: 100000,
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      rinkeby: process.env.ETHERSCAN_API_KEY,
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
      rinkeby: [
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
    linkToken: {
      hardhat: '',
      localhost: '',
      sandbox: '',
      goerli: '',
      rinkeby: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
      mainnet: '0x514910771af9ca656af840dff83e8264ecf986ca',
      mumbai: '',
      polygon: '',
    },
  },
};
