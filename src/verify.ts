import { network, run } from 'hardhat';
import { Deployer } from './deployer';

export default async (ctx: Deployer, address: string, args: unknown[], contract?: string) => {
  try {
    await run('verify:verify', {
      address,
      constructorArguments: args,
      contract,
    });
  } catch (err) {
    ctx.log('Verification failed', { chainId: network.config.chainId, address, args, err });
  }
};
