const { ethers, upgrades, network } = require('hardhat');
const CNSNetworkConfig = require('dot-crypto/src/network-config/network-config.json');
const UNSNetworkConfig = require('./../uns-config.json');

const argv = require('yargs/yargs')()
  .env('')
  .boolean('proxy')
  .argv;

const rinkebyAccounts = {
  workers: [
    '0xb3B86785A51B950fd54ABdF420ff3B60E091870c',
    '0x7EF88A779651f26a4967026a32Cae4F01fF8D151',
    '0x0c71a3494484459bbF9777Dd3109515B2E653CCb',
    '0x288DA3443BBEBcc7a339182323aa3F23126DFe7a',
    '0xe45541799119C1D63b60e0F834F3A381D4BEDbea',
  ],
  priorityWorkers: [
    '0xdb36B5c4cF1D96f020D7629a09cB54ab787414d6',
    '0x3b9FB7983d897B7fe2fD7563e07e24CbA830b03B',
    '0x903aA579B9eF13862Fda73275B349017d8fD09eB',
    '0x7Ac8596cfbb0504DFDEC08d5088B67E7fbfae47f',
    '0xB83180632b72f988585AF02FC27229bF2Eabd139',
  ],
};

async function main () {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const Registry = await ethers.getContractFactory('contracts/Registry.sol:Registry');
  const MintingManager = await ethers.getContractFactory('contracts/MintingManager.sol:MintingManager');
  const ProxyReader = await ethers.getContractFactory('contracts/ProxyReader.sol:ProxyReader');
  const CryptoMintingController =
    await ethers.getContractFactory('contracts/cns/CryptoMintingController.sol:CryptoMintingController');
  const CryptoURIPrefixController =
    await ethers.getContractFactory('contracts/cns/CryptoURIPrefixController.sol:CryptoURIPrefixController');

  const config = network.name === 'localhost'
    ? UNSNetworkConfig.networks[network.config.chainId]
    : CNSNetworkConfig.networks[network.config.chainId];
  if (!config) {
    throw new Error(`Config not found for network ${network.config.chainId}`);
  }

  const {
    CNSRegistry: CnsRegistry,
    Resolver: CnsResolver,
    MintingController: CnsMintingController,
    URIPrefixController: CnsURIPrefixController,
  } = config.contracts;

  console.log('Network', network.name);
  const [deployer, cnsAdmin] = await ethers.getSigners();
  console.log('Account:', deployer.address);
  console.log('CNS admin:', cnsAdmin.address);

  let registry, mintingManager;
  if (argv.proxy) {
    registry = await upgrades.deployProxy(Registry, [], { initializer: false });
    console.log('Registry PROXY deployed to:', registry.address);

    mintingManager = await upgrades.deployProxy(MintingManager, [], { initializer: false });
    console.log('MintingManager PROXY deployed to:', mintingManager.address);
  } else {
    registry = await Registry.deploy();
    console.log('Registry deployed to:', registry.address);

    mintingManager = await MintingManager.deploy();
    console.log('MintingManager deployed to:', mintingManager.address);
  }

  const registryInitTx = await registry.initialize(mintingManager.address);
  await registryInitTx.wait();

  const mintingManagerInitTx = await mintingManager.initialize(
    registry.address,
    CnsMintingController.address,
    CnsURIPrefixController.address,
    CnsResolver.address,
  );
  await mintingManagerInitTx.wait();

  await mintingManager.addMinters([...rinkebyAccounts.workers, ...rinkebyAccounts.priorityWorkers]);

  // CNS configuration
  const cnsMintingController = await CryptoMintingController
    .attach(CnsMintingController.address)
    .connect(cnsAdmin);
  if (!(await cnsMintingController.isMinter(mintingManager.address))) {
    await cnsMintingController.addMinter(mintingManager.address);
  }

  const cnsURIPrefixController = await CryptoURIPrefixController
    .attach(CnsURIPrefixController.address)
    .connect(cnsAdmin);
  if (!(await cnsURIPrefixController.isWhitelisted(mintingManager.address))) {
    await cnsURIPrefixController.addWhitelisted(mintingManager.address);
  }

  // Deploy ProxyReader
  const proxyReader = await ProxyReader.deploy(registry.address, CnsRegistry.address);
  console.log('ProxyReader deployed to:', proxyReader.address);

  console.log('Deployed!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
