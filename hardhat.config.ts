/// ENVVAR
// - ENABLE_GAS_REPORT
// - ENABLE_CONTRACT_SIZER
// - CI
// - COMPILE_MODE

const fs = require('fs');
const path = require('path');
const argv = require('yargs/yargs')()
  .env('')
  .boolean('enableGasReport')
  .boolean('enableContractSizer')
  .boolean('ci')
  .string('compileMode').argv;

import '@nomiclabs/hardhat-truffle5';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-solhint';
import 'solidity-coverage';
import 'hardhat-deploy';
import '@typechain/hardhat';

if (argv.enableGasReport) {
  require('hardhat-gas-reporter');
}

if (argv.enableContractSizer) {
  require('hardhat-contract-sizer');
}

// for (const f of fs.readdirSync(path.join(__dirname, 'hardhat'))) {
//   require(path.join(__dirname, 'hardhat', f));
// }

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: argv.enableGasReport || argv.compileMode === 'production',
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      blockGasLimit: 10000000,
    },
  },
  gasReporter: {
    currency: 'USD',
    outputFile: argv.ci ? 'gas-report.txt' : undefined,
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  typechain: {
    outDir: 'build/types',
    target: 'ethers-v5',
  },
};
