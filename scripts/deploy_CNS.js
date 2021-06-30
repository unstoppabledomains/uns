const { network } = require('hardhat');

const { mergeNetworkConfig } = require('../src/config');
const Deployer = require('../src/deployer');

async function main () {
  console.log('Network:', network.name);

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(['cns']);
  mergeNetworkConfig(deployConfig);

  console.log('Deployed!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
