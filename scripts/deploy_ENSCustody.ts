import { network } from 'hardhat';
import { NameService, getNetworkConfig, mergeNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/helpers';

async function main () {
  console.log('Network:', network.name);

  const chainId: number = unwrap(network.config, 'chainId');
  if (![1, 5, 1337, 11155111].includes(chainId)) {
    throw new Error(`Unsupported network ${chainId}`);
  }

  const config = getNetworkConfig(chainId, NameService.ENS);
  if (!config) {
    throw new Error(`Config not found for network ${chainId}`);
  }

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(['ens_custody'], config);
  mergeNetworkConfig(deployConfig, NameService.ENS);

  console.log('Deployed!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
