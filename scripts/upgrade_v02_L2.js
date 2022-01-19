const { network } = require('hardhat');

const { mergeNetworkConfig } = require('../src/config');
const Deployer = require('../src/deployer');
const NetworkConfig = require('../uns-config.json');

async function main () {
  console.log('Network:', network.name);
  if (![137, 31337, 80001].includes(network.config.chainId)) {
    throw new Error(`The upgrade is not supported for newtwork with cainId: ${network.config.chainId}`);
  }

  const config = NetworkConfig.networks[network.config.chainId];
  if (!config) {
    throw new Error(`UNS config not found for network ${network.config.chainId}`);
  }

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute([
    'upgrade_v02_l2',
    'upgrade_registry',
    'upgrade_minting_manager',
  ], config);
  mergeNetworkConfig(deployConfig);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
