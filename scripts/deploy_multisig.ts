import Safe, { SafeAccountConfig, SafeFactory } from '@safe-global/protocol-kit';


async function createSafe () {
  const owners = [
    '0x6EC0DEeD30605Bcd19342f3c30201DB263291589',
    '0xc0354e4E83Cc214b402A5063e2C90e0e5C18cC87',
    '0xECE49066537d1816915cBe2312D7BBeF0647b820',
    '0x0e5DFb1569602d0dcFCb4287Fe53c28FAC1Ea1bE',
    '0xEe203ec04a5F635A78414466883cffB24B669B2C',
  ];

  const threshold = 2;
  const safeAccountConfig: SafeAccountConfig = {
    owners,
    threshold,
  };

  const safeFactory = await SafeFactory.init({
    provider: `https://base-sepolia.infura.io/v3/${process.env.BASE_INFURA_KEY}`,
    signer: 'PRIVATE_KEY',
    safeVersion: '1.3.0',
  });

  const safe: Safe = await safeFactory.deploySafe({ safeAccountConfig });

  console.log('Is deployed: ' + await safe.isSafeDeployed());
  console.log('Threshold: ' + await safe.getThreshold());
  console.log('Owners: ' + await safe.getOwners());
  console.log('Address: ' + await safe.getAddress());
}

async function main () {
  await createSafe();
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log('Error: ' + e.message);
    process.exit(1);
  });
