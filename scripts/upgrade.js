const { ethers } = require('hardhat');
const argv = require('yargs/yargs')()
  .env('')
  .string('proxyAddress')
  .argv;

async function main() {
  if (!argv.proxyAddress) {
    throw 'Proxy address (PROXY_ADDRESS) should be set explicitly';
  }

  const Registry = await ethers.getContractFactory('Registry');

  const registry = await upgrades.upgradeProxy(argv.proxyAddress, Registry);
  console.log('Registry PROXY upgraded:', registry.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
