import { ethers, network } from 'hardhat';
import merge from 'lodash.merge';
import { getNetworkConfig, mergeNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';
import { unwrap } from '../src/utils';
import { deployProxy } from '../src/helpers';
import { ArtifactName } from '../src/types';

async function main () {
  console.log('Network:', network.name);

  const chainId: number = unwrap(network.config, 'chainId');
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
  // and check if min_uns_tlds task should be included

  const deployer = await Deployer.create();
  console.log('start uns execute:', config);
  const deployConfig = await deployer.execute(['uns'], config);
  console.log('start seaport execute', JSON.stringify(deployConfig));
  mergeNetworkConfig(deployConfig);

  const deployConfig2 = await deployer.execute(['seaport_proxy_buyer'], config);
  mergeNetworkConfig(deployConfig2);

  console.log('Deployed!');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
