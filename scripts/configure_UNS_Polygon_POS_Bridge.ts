import { network } from 'hardhat';
import { readNetworkConfig, mergeNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';

const NetworkConfig = readNetworkConfig();

async function main () {
  console.log('Network:', network.name);

  const chainId: number = network.config.chainId!;
  const config = NetworkConfig.networks[chainId];
  if (!config) {
    throw new Error(`Config not found for network ${chainId}`);
  }

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(['uns_config_polygon_pos_bridge'], config);
  mergeNetworkConfig(deployConfig);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
