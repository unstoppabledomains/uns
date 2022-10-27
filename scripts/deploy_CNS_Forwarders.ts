import {network} from 'hardhat';
import {mergeNetworkConfig, readNetworkConfig} from '../src/config';
import {Deployer} from '../src/deployer';

const UNSNetworkConfig = readNetworkConfig();

async function main () {
  console.log('Network:', network.name);

  const config = UNSNetworkConfig.networks[network.config.chainId];
  if (!config) {
    throw new Error(`Config not found for network ${network.config.chainId}`);
  }

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(['cns_forwarders'], config);
  mergeNetworkConfig(deployConfig);

  console.log('Deployed!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
