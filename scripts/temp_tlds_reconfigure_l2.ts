import { network } from 'hardhat';

import { readNetworkConfig, mergeNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';

async function main () {
  console.log('Network:', network.name);

  const config = readNetworkConfig().networks[network.config.chainId];
  if (!config) {
    throw new Error(
      `UNS config not found for network ${network.config.chainId}`,
    );
  }

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(
    ['upgrade_registry', 'upgrade_minting_manager', 'temp_reconfigure_tld_l2'],
    config,
  );
  mergeNetworkConfig(deployConfig);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
