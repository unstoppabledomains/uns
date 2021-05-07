const { ethers } = require("hardhat");

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
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const Registry = await ethers.getContractFactory('Registry');
  const URIPrefixController = await ethers.getContractFactory('URIPrefixController');
  const SignatureController = await ethers.getContractFactory('SignatureController');
  const MintingController = await ethers.getContractFactory('MintingController');
  const DomainZoneController = await ethers.getContractFactory('DomainZoneController');
  const WhitelistedMinter = await ethers.getContractFactory('WhitelistedMinter');
  const ProxyReader = await ethers.getContractFactory('ProxyReader');
  const TwitterValidationOperator = await ethers.getContractFactory('TwitterValidationOperator');
  const FreeMinter = await ethers.getContractFactory('FreeMinter');

  console.log('Network', process.env.HARDHAT_NETWORK);
  const network = process.env.HARDHAT_NETWORK;

  const registry = await Registry.deploy();
  console.log("Registry deployed to:", registry.address);

  const signatureController = await SignatureController.deploy(registry.address);
  console.log("SignatureController deployed to:", signatureController.address);
  await registry.addController(signatureController.address);

  const mintingController = await MintingController.deploy(registry.address);
  console.log("MintingController deployed to:", mintingController.address);
  await registry.addController(mintingController.address);

  const uriPrefixController = await URIPrefixController.deploy(registry.address);
  console.log("URIPrefixController deployed to:", uriPrefixController.address);
  await registry.addController(uriPrefixController.address);

  const domainZoneController = await DomainZoneController.deploy(registry.address, []);
  console.log("DomainZoneController deployed to:", domainZoneController.address);
  // TODO: figure out why domainZoneController did not add to registry as a controller (dot-crypto migration)

  if (network === 'live') {
    await registry.renounceController();
  }

  const whitelistedMinter = await WhitelistedMinter.deploy(mintingController.address);
  console.log("WhitelistedMinter deployed to:", whitelistedMinter.address);
  await mintingController.addMinter(whitelistedMinter.address);

  if (network === 'rinkeby') {
    for(const admin of rinkebyAccounts.admins) {
      await whitelistedMinter.addWhitelistAdmin(admin);
      await domainZoneController.addWhitelistAdmin(admin);
      await uriPrefixController.addWhitelistAdmin(admin);
    }
    
    await whitelistedMinter.bulkAddWhitelisted([
      ...rinkebyAccounts.workers,
      ...rinkebyAccounts.priorityWorkers
    ]);

    await domainZoneController.bulkAddWhitelisted(rinkebyAccounts.priorityWorkers);
  }

  const proxyReader = await ProxyReader.deploy(registry.address);
  console.log("ProxyReader deployed to:", proxyReader.address);

  if (network === 'rinkeby') {
    const twitterValidationOperator = await TwitterValidationOperator.deploy(
      registry.address,
      '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
      rinkebyAccounts.admins);
    console.log("TwitterValidationOperator deployed to:", twitterValidationOperator.address);
  }

  const freeMinter = await FreeMinter.deploy(mintingController.address);
  console.log("FreeMinter deployed to:", freeMinter.address);
  await mintingController.addMinter(freeMinter.address);

  if (network === 'live') {
    await mintingController.renounceMinter();
  }

  console.log('Migrated!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
