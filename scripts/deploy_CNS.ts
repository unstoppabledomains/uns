import { network } from 'hardhat';
import { mergeNetworkConfig } from '../src/config';
import { Deployer } from '../src/deployer';

async function main () {
  console.log('Network:', network.name);

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(['cns', 'cns_forwarders']);
  mergeNetworkConfig(deployConfig);

  console.log('Deployed!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
