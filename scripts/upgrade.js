const { ethers } = require('hardhat');
const argv = require('yargs/yargs')()
  .env('')
  .string('proxyAddress')
  .argv;

async function main() {
  const {
    UNS_REGISTRY_PROXY,
    UNS_MINTING_MANAGERE_PROXY
  } = process.env;

  if (!UNS_REGISTRY_PROXY) {
    throw 'Registry proxy address (UNS_REGISTRY_PROXY) should be set explicitly';
  }

  if (!UNS_MINTING_MANAGERE_PROXY) {
    throw 'MintingManager proxy address (UNS_MINTING_MANAGERE_PROXY) should be set explicitly';
  }

  const Registry = await ethers.getContractFactory('contracts/Registry.sol:Registry');
  const MintingManager = await ethers.getContractFactory('contracts/MintingManager.sol:MintingManager');

  const registry = await upgrades.upgradeProxy(UNS_REGISTRY_PROXY, Registry);
  console.log('Registry PROXY upgraded:', registry.address);

  mintingManager = await await upgrades.upgradeProxy(UNS_MINTING_MANAGERE_PROXY, MintingManager);
  console.log('MintingManager PROXY upgraded:', mintingManager.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
