import { network } from 'hardhat';
import { NameService, getNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/utils';

async function main () {
  console.log('Network:', network.name);

  const chainId: number = unwrap(network.config, 'chainId');
  if (![1].includes(chainId)) {
    throw new Error(`Unsupported network ${chainId}`);
  }

  const config = getNetworkConfig(chainId, NameService.UNS);

  if (!config) {
    throw new Error(`Config not found for network ${chainId}`);
  }

  const deployer = await Deployer.create();
  await deployer.execute(['recover_usdc'], config);

  console.log('Deployed!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
