import { ethers } from 'hardhat';

export async function increaseTimeBy (seconds: number | bigint) {
  await ethers.provider.send('evm_increaseTime', [Number(seconds)]);
  await ethers.provider.send('evm_mine', []);
}

export async function getLatestBlockTimestamp (): Promise<number> {
  const block = await ethers.provider.getBlock('latest');

  if (!block) throw new Error('Block not found');

  return block.timestamp;
}
