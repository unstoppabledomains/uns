const { network } = require('hardhat');
const CNSNetworkConfig = require('dot-crypto/src/network-config/network-config.json');
const argv = require('yargs/yargs')()
  .env('')
  .boolean('proxy')
  .argv;

const { mergeNetworkConfig } = require('../src/config');
const Deployer = require('../src/deployer');
const UNSNetworkConfig = require('./../uns-config.json');

async function main () {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  console.log('Network', network.name);

  const config = network.name === 'localhost'
    ? UNSNetworkConfig.networks[network.config.chainId]
    : CNSNetworkConfig.networks[network.config.chainId];
  if (!config) {
    throw new Error(`Config not found for network ${network.config.chainId}`);
  }

  const deployer = await Deployer.create({ proxy: argv.proxy });
  const deployConfig = await deployer.execute(['uns'], config);
  mergeNetworkConfig(deployConfig);

  console.log('Deployed!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
