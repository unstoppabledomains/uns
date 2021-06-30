const { network } = require('hardhat');

const { mergeNetworkConfig } = require('../src/config');
const Deployer = require('../src/deployer');
const NetworkConfig = require('./../uns-config.json');

async function main () {
  console.log('Network', network.name);

  const unsConfig = NetworkConfig.networks[network.config.chainId];
  if (!unsConfig) {
    throw new Error(`UNS config not found for network ${network.config.chainId}`);
  }

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(['upgrade'], unsConfig);
  mergeNetworkConfig(deployConfig);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
