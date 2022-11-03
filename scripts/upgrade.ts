import { network } from 'hardhat';
import { mergeNetworkConfig, readNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/helpers';

const NetworkConfig = readNetworkConfig();

async function main () {
  console.log('Network:', network.name);

  const chainId: number = unwrap(network.config, 'chainId');
  const config = NetworkConfig.networks[chainId];
  if (!config) {
    throw new Error(`UNS config not found for network ${chainId}`);
  }

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(['upgrade_registry', 'upgrade_minting_manager'], config);
  mergeNetworkConfig(deployConfig);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
