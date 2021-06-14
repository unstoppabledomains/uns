const { ethers, upgrades } = require('hardhat');
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
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const Registry = await ethers.getContractFactory('Registry');
  const WhitelistedMinter = await ethers.getContractFactory('WhitelistedMinter');
  const ProxyReader = await ethers.getContractFactory('ProxyReader');
  const TwitterValidationOperator = await ethers.getContractFactory('TwitterValidationOperator');
  const FreeMinter = await ethers.getContractFactory('FreeMinter');

  console.log('Network', process.env.HARDHAT_NETWORK);
  const network = process.env.HARDHAT_NETWORK;

  let registry;
  if (argv.proxy) {
    registry = await upgrades.deployProxy(Registry);
    console.log('Registry PROXY deployed to:', registry.address);
  } else {
    registry = await Registry.deploy();
    await registry.initialize();
    console.log('Registry deployed to:', registry.address);
  }

  if (network === 'live') {
    await registry.renounceController();
  }

  const whitelistedMinter = await WhitelistedMinter.deploy(registry.address);
  console.log('WhitelistedMinter deployed to:', whitelistedMinter.address);
  await registry.addMinter(whitelistedMinter.address);

  if (network === 'rinkeby') {
    for(const admin of rinkebyAccounts.admins) {
      await whitelistedMinter.addWhitelistAdmin(admin);
      await domainZoneOperator.addWhitelistAdmin(admin);
    }
    
    await whitelistedMinter.bulkAddWhitelisted([
      ...rinkebyAccounts.workers,
      ...rinkebyAccounts.priorityWorkers
    ]);

    await domainZoneOperator.bulkAddWhitelisted(rinkebyAccounts.priorityWorkers);
  }

  const proxyReader = await ProxyReader.deploy(registry.address);
  console.log('ProxyReader deployed to:', proxyReader.address);

  if (network === 'rinkeby') {
    const twitterValidationOperator = await TwitterValidationOperator.deploy(
      registry.address,
      '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
      rinkebyAccounts.admins);
    console.log('TwitterValidationOperator deployed to:', twitterValidationOperator.address);
  }

  const freeMinter = await FreeMinter.deploy(registry.address);
  console.log('FreeMinter deployed to:', freeMinter.address);
  await registry.addMinter(freeMinter.address);

  console.log('Migrated!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
