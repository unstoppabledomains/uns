import { network } from 'hardhat';

import { mergeNetworkConfig, getNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/utils';

async function main () {
  console.log('Network:', network.name);

  const chainId: number = unwrap(network.config, 'chainId');
  const config = getNetworkConfig(chainId);
  if (!config) {
    throw new Error(`Config not found for network ${network.config.chainId}`);
  }

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(['min_uns_tlds'], config);
  mergeNetworkConfig(deployConfig);

  console.log('Deployed!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
