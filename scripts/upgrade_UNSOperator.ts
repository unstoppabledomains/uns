import { network } from 'hardhat';
import { mergeNetworkConfig, getNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/utils';

async function main () {
  console.log('Network:', network.name);

  const chainId: number = unwrap(network.config, 'chainId');
  const config = getNetworkConfig(chainId);
  if (!config) {
    throw new Error(`UNS config not found for network ${chainId}`);
  }

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(['upgrade_uns_operator'], config);
  mergeNetworkConfig(deployConfig);

  console.log('Upgraded!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
