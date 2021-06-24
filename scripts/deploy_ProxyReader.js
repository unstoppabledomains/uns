const { ethers, network } = require('hardhat');

const UNSNetworkConfig = require('./../uns-config.json');

async function main () {
  const ProxyReader = await ethers.getContractFactory('contracts/ProxyReader.sol:ProxyReader');

  const unsConfig = UNSNetworkConfig.networks[network.config.chainId];
  if (!unsConfig) {
    throw new Error(`UNS config not found for network ${network.config.chainId}`);
  }

  const { UNSRegistry, CNSRegistry } = unsConfig.contracts;

  console.log('Network', network.name);

  // Deploy ProxyReader
  const proxyReader = await ProxyReader.deploy(UNSRegistry.address, CNSRegistry.address);
  console.log('ProxyReader deployed to:', proxyReader.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
