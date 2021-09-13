const { network } = require('hardhat');

const { mergeNetworkConfig } = require('../src/config');
const Deployer = require('../src/deployer');

async function main () {
  console.log('Network:', network.name);

  const config = {
    contracts: {
      CNSRegistry: { address: '0x0000000000000000000000000000000000000000' },
      MintingController: { address: '0x0000000000000000000000000000000000000000' },
      URIPrefixController: { address: '0x0000000000000000000000000000000000000000' },
      Resolver: { address: '0x0000000000000000000000000000000000000000' },
    },
  };

  const deployer = await Deployer.create();
  const deployConfig = await deployer.execute(['uns'], config);
  mergeNetworkConfig(deployConfig);

  console.log('Deployed!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
