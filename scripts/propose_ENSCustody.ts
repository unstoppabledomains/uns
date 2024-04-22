import { network } from 'hardhat';
import { NameService, getNetworkConfig, mergeNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/utils';

async function main () {
  console.log('Network:', network.name);

  const chainId: number = unwrap(network.config, 'chainId');
  if (![1, 5, 1337].includes(chainId)) {
    throw new Error(`Unsupported network ${chainId}`);
  }

  const config = getNetworkConfig(chainId, NameService.ENS);
  if (!config) {
    throw new Error(`Config not found for network ${chainId}`);
  }

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(['propose_ens_custody'], config, { version: '' });
  mergeNetworkConfig(deployConfig, NameService.ENS);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
