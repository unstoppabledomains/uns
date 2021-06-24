const { ethers, network } = require('hardhat');

async function main () {
  const CNSRegistry = await ethers.getContractFactory('contracts/cns/CNSRegistry.sol:CNSRegistry');
  const SignatureController =
    await ethers.getContractFactory('contracts/cns/SignatureController.sol:SignatureController');
  const MintingController =
    await ethers.getContractFactory('contracts/cns/MintingController.sol:MintingController');
  const URIPrefixController =
    await ethers.getContractFactory('contracts/cns/URIPrefixController.sol:URIPrefixController');
  const Resolver = await ethers.getContractFactory('contracts/cns/Resolver.sol:Resolver');

  console.log('Network:', network.name);

  const [, cnsAdmin] = await ethers.getSigners();
  console.log('Account:', cnsAdmin.address);

  const registry = await CNSRegistry.connect(cnsAdmin).deploy();
  console.log('CNS Registry deployed to:', registry.address);

  const signatureController = await SignatureController.connect(cnsAdmin).deploy(registry.address);
  console.log('CNS SignatureController deployed to:', signatureController.address);

  const mintingController = await MintingController.connect(cnsAdmin).deploy(registry.address);
  console.log('CNS MintingController deployed to:', mintingController.address);

  const uriPrefixController = await URIPrefixController.connect(cnsAdmin).deploy(registry.address);
  console.log('CNS URIPrefixController deployed to:', uriPrefixController.address);

  await registry.connect(cnsAdmin).addController(signatureController.address);
  await registry.connect(cnsAdmin).addController(mintingController.address);
  await registry.connect(cnsAdmin).addController(uriPrefixController.address);

  const resolver = await Resolver.connect(cnsAdmin).deploy(registry.address, mintingController.address);
  console.log('CNS Resolver deployed to:', resolver.address);

  console.log('Deployed!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
