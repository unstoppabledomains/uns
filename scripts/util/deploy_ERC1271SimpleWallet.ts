/**
 * Pre-req:
 * - Run: "yarn compile"
 * - If you want to wrap an address that isn't the deployer, update the `walletOwnerAddress` below
 *
 * Running using a .env file:
 * 1. Create .env
 * 2. Add needed vars for desired network(s) -- see hardhat.config.ts for var names
 * 3. Run via command:
 * npx dotenv-cli -y -- yarn hardhat run --network <network> scripts/util/deploy_ERC1271SimpleWallet.ts
 *
 * Running without using a .env file:
 * 1. Set env vars or include at the beginning of the command then run:
 * yarn hardhat run --network <network> scripts/util/deploy_ERC1271SimpleWallet.ts
 *
 */
import { ethers, network } from 'hardhat';

async function main () {
  console.log('Network:', network.name);
  const [signer] = await ethers.getSigners();

  // wallet owner (defaults to signer)
  const walletOwnerAddress = signer.address;

  const factory = await ethers.getContractFactory('ERC1271SimpleWallet', signer);

  const result = await factory.deploy(
    walletOwnerAddress,
  );

  await result.waitForDeployment();

  console.log('Deployed ERC1271SimpleWallet address:', await result.getAddress());
  console.log('ERC1271 owner address:', walletOwnerAddress);
}


// eslint-disable-next-line promise/catch-or-return
main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
}).finally(() => {
  process.exit();
});
