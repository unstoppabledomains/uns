import { network } from 'hardhat';
import { mergeNetworkConfig, readNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/helpers';

async function main () {
  console.log('Network:', network.name);

  const chainId: number = unwrap(network.config, 'chainId');
  const config = readNetworkConfig()[chainId];
  if (!config) {
    throw new Error(`UNS config not found for network ${chainId}`);
  }

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(['upgrade_registry'], config);
  mergeNetworkConfig(deployConfig);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
