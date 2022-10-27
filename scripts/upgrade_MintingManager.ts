import {network} from 'hardhat';
import {mergeNetworkConfig, readNetworkConfig} from '../src/config';
import {Deployer} from '../src/deployer';

const NetworkConfig = readNetworkConfig();

async function main () {
  console.log('Network:', network.name);

  const config = NetworkConfig.networks[network.config.chainId];
  if (!config) {
    throw new Error(`UNS config not found for network ${network.config.chainId}`);
  }

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(['upgrade_minting_manager'], config);
  mergeNetworkConfig(deployConfig);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
