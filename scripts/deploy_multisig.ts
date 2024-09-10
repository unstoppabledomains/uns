import Safe, { SafeAccountConfig, SafeFactory } from '@safe-global/protocol-kit';

async function createSafe () {
  const owners = [];

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

  console.log('Is deployed: ' + (await safe.isSafeDeployed()));
  console.log('Threshold: ' + (await safe.getThreshold()));
  console.log('Owners: ' + (await safe.getOwners()));
  console.log('Address: ' + (await safe.getAddress()));
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
