const { network, run } = require('hardhat');

const verify = async (ctx, address, args) => {
  try {
    await run('verify:verify', {
      address,
      constructorArguments: args,
    });
  } catch (err) {
    ctx.log('Verification failed', { chainId: network.config.chainId, address, args });
  }
};

module.exports = verify;
