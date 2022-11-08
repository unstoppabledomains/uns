import { network } from 'hardhat';
import merge from 'lodash.merge';
import { getNetworkConfig, mergeNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/helpers';

async function main () {
  console.log('Network:', network.name);

  const chainId: number = unwrap(network.config, 'chainId');
  const config = merge(getNetworkConfig(chainId), {
    contracts: {
      CNSRegistry: { address: '0x0000000000000000000000000000000000000000' },
      MintingController: { address: '0x0000000000000000000000000000000000000000' },
      URIPrefixController: { address: '0x0000000000000000000000000000000000000000' },
      Resolver: { address: '0x0000000000000000000000000000000000000000' },
    },
  });

  if (!config) {
    throw new Error(`Config not found for network ${chainId}`);
  }

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(['uns'], config);
  mergeNetworkConfig(deployConfig);

  console.log('Deployed!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
