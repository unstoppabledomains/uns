const { ethers, network } = require('hardhat');

const UNSNetworkConfig = require('./../uns-config.json');

async function main () {
  const TwitterValidationOperator =
    await ethers.getContractFactory('contracts/operators/TwitterValidationOperator.sol:TwitterValidationOperator');

  const unsConfig = UNSNetworkConfig.networks[network.config.chainId];
  if (!unsConfig) {
    throw new Error(`UNS config not found for network ${network.config.chainId}`);
  }

  const { UNSRegistry, CNSRegistry } = unsConfig.contracts;

  console.log('Network', network.name);
  const [deployer] = await ethers.getSigners();
  console.log('Account:', deployer.address);

  // Deploy TwitterValidationOperator
  const operator = await TwitterValidationOperator.deploy(
    UNSRegistry.address,
    CNSRegistry.address,
    '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
    [deployer.address],
  );
  console.log('TwitterValidationOperator deployed to:', operator.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
