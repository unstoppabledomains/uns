const { TASK_COMPILE } = require('hardhat/builtin-tasks/task-names');
const { task } = require('hardhat/config');
const path = require('path');
const fs = require('fs-extra');

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
require('@nomiclabs/hardhat-truffle5');
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

const cp = async (hre, name, out) => {
  const _path = path.join(__dirname, hre.config.paths.flatArtifacts, `${out || name}.json`);
  const artifact = await hre.artifacts.readArtifact(name);

  await fs.outputFile(_path, JSON.stringify(artifact, null, '  '));
};

task(TASK_COMPILE, 'hook compile task to include post-compile', async function (args, hre, runSuper) {
  await runSuper();
  await cp(hre, 'UNSRegistry');
  await cp(hre, 'Registry', 'CNSRegistry');
  await cp(hre, 'MintingManager');
  await cp(hre, 'ProxyReader');
  await cp(hre, 'SignatureController');
  await cp(hre, 'MintingController');
  await cp(hre, 'WhitelistedMinter');
  await cp(hre, 'URIPrefixController');
  await cp(hre, 'DomainZoneController');
  await cp(hre, 'Resolver');
  await cp(hre, 'TwitterValidationOperator');
  await cp(hre, 'FreeMinter');
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.5.12',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.0',
        metadata: {
          bytecodeHash: 'none',
        },
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
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
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.RINKEBY_INFURA_KEY}`,
      chainId: 4,
      accounts: process.env.RINKEBY_UNS_PRIVATE_KEY
        ? [process.env.RINKEBY_UNS_PRIVATE_KEY, process.env.CNS_ADMIN_PRIVATE_KEY]
        : undefined,
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
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
