const { ethers, network } = require('hardhat');

async function main () {
  const CryptoRegistry = await ethers.getContractFactory('contracts/cns/CryptoRegistry.sol:CryptoRegistry');
  const CryptoSignatureController =
    await ethers.getContractFactory('contracts/cns/CryptoSignatureController.sol:CryptoSignatureController');
  const CryptoMintingController =
    await ethers.getContractFactory('contracts/cns/CryptoMintingController.sol:CryptoMintingController');
  const CryptoURIPrefixController =
    await ethers.getContractFactory('contracts/cns/CryptoURIPrefixController.sol:CryptoURIPrefixController');
  const CryptoResolver = await ethers.getContractFactory('contracts/cns/CryptoResolver.sol:CryptoResolver');

  console.log('Network:', network.name);

  const [, cnsAdmin] = await ethers.getSigners();
  console.log('Account:', cnsAdmin.address);

  const registry = await CryptoRegistry.connect(cnsAdmin).deploy();
  console.log('CNS Registry deployed to:', registry.address);

  const signatureController = await CryptoSignatureController.connect(cnsAdmin).deploy(registry.address);
  console.log('CNS SignatureController deployed to:', signatureController.address);

  const mintingController = await CryptoMintingController.connect(cnsAdmin).deploy(registry.address);
  console.log('CNS MintingController deployed to:', mintingController.address);

  const uriPrefixController = await CryptoURIPrefixController.connect(cnsAdmin).deploy(registry.address);
  console.log('CNS URIPrefixController deployed to:', uriPrefixController.address);

  await registry.connect(cnsAdmin).addController(signatureController.address);
  await registry.connect(cnsAdmin).addController(mintingController.address);
  await registry.connect(cnsAdmin).addController(uriPrefixController.address);

  const resolver = await CryptoResolver.connect(cnsAdmin).deploy(registry.address, mintingController.address);
  console.log('CNS Resolver deployed to:', resolver.address);

  console.log('Deployed!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
