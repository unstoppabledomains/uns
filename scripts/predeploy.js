/// Script for CNS deployment
/// Ref: https://github.com/unstoppabledomains/dot-crypto/blob/master/migrations/2_deploy_contracts.js

const { ethers } = require('hardhat');
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
  admins: [
    '0xec6A3Fb3f8869D50F73829db434525697852Ce3A',
    '0x4C863E316Ce7A19ba23fDF801a369E1F3cc835AA',
  ]
};

async function main() {
  const Registry = await ethers.getContractFactory('contracts/cns/CryptoRegistry.sol:CryptoRegistry');
  const SignatureController = await ethers.getContractFactory('contracts/cns/CryptoSignatureController.sol:CryptoSignatureController');
  const MintingController = await ethers.getContractFactory('contracts/cns/CryptoMintingController.sol:CryptoMintingController');
  const URIPrefixController = await ethers.getContractFactory('contracts/cns/CryptoURIPrefixController.sol:CryptoURIPrefixController');
  const WhitelistedMinter = await ethers.getContractFactory('contracts/cns/CryptoWhitelistedMinter.sol:CryptoWhitelistedMinter');
  const Resolver = await ethers.getContractFactory('contracts/cns/CryptoResolver.sol:CryptoResolver');

  console.log('Network', process.env.HARDHAT_NETWORK);

  const registry = await Registry.deploy();
  console.log('CNS registry deployed to:', registry.address);

  const signatureController = await SignatureController.deploy(registry.address);
  console.log('CNS signature controller deployed to:', signatureController.address);

  console.log('Migrated!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
