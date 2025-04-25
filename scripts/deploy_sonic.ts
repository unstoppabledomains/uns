import { network } from 'hardhat';
import merge from 'lodash.merge';
import { getNetworkConfig, mergeNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/utils';

async function main () {
  console.log('Network:', network.name);

  const chainId: number = unwrap(network.config, 'chainId');
  if (chainId !== 146 && chainId !== 57054) {
    throw new Error(`Unsupported chainId: ${chainId}`);
  }

  const config = merge(getNetworkConfig(chainId), {
    contracts: {
      CNSRegistry: { address: '0x0000000000000000000000000000000000000000' },
      MintingController: { address: '0x0000000000000000000000000000000000000000' },
      URIPrefixController: { address: '0x0000000000000000000000000000000000000000' },
      Resolver: { address: '0x0000000000000000000000000000000000000000' },
      RootChainManager: { address: '0x0000000000000000000000000000000000000000' },
    },
  });

  if (!config) {
    throw new Error(`Config not found for network ${chainId}`);
  }

  const deployer = await Deployer.create();
  console.log('start uns execute:', config);
  const deployConfig = await deployer.execute(['uns'], config, { exclude: 'min_uns_tlds' });
  mergeNetworkConfig(deployConfig);

  console.log('Deployed!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
