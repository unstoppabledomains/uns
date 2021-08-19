const { network } = require('hardhat');
const CNSNetworkConfig = require('dot-crypto/src/network-config/network-config.json');

const { mergeNetworkConfig } = require('../src/config');
const Deployer = require('../src/deployer');
const UNSNetworkConfig = require('./../uns-config.json');

async function main () {
  console.log('Network:', network.name);

  const config = ['localhost', 'hardhat', 'mumbai'].includes(network.name)
    ? UNSNetworkConfig.networks[network.config.chainId]
    : CNSNetworkConfig.networks[network.config.chainId];
  if (!config) {
    throw new Error(`Config not found for network ${network.config.chainId}`);
  }

  const deployer = await Deployer.create();
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
