import { ethers } from 'hardhat';

export async function increaseTimeBy (seconds: number) {
  await ethers.provider.send('evm_increaseTime', [seconds]);
  await ethers.provider.send('evm_mine', []);
}
