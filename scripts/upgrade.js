const { ethers, network } = require('hardhat');
const NetworkConfig = require('./../config.json');

async function main() {
  const unsConfig = NetworkConfig.networks[network.config.chainId];
  if(!unsConfig) {
    throw `UNS config not found for network ${network.config.chainId}`;
  }

  const {
    Registry: UnsRegistry,
    MintingManager: UnsMintingManager
  } = cnsConfig.contracts;

  const Registry = await ethers.getContractFactory('contracts/Registry.sol:Registry');
  const MintingManager = await ethers.getContractFactory('contracts/MintingManager.sol:MintingManager');

  const registry = await upgrades.upgradeProxy(UnsRegistry.address, Registry);
  console.log('Registry PROXY upgraded:', registry.address);

  mintingManager = await await upgrades.upgradeProxy(UnsMintingManager.address, MintingManager);
  console.log('MintingManager PROXY upgraded:', mintingManager.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
