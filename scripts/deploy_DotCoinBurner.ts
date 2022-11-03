import { network } from 'hardhat';

import { readNetworkConfig, mergeNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';

async function main () {
  console.log('Network:', network.name);

  const config = readNetworkConfig().networks[network.config.chainId];
  if (!config) {
    throw new Error(`Config not found for network ${network.config.chainId}`);
  }

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(['dot_coin_burner'], config);
  mergeNetworkConfig(deployConfig);

  console.log('Deployed!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
