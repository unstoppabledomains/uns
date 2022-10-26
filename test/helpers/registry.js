const { ethers } = require('hardhat');

const generateRandomLabel = () => 'domain-' + ethers.utils.hexlify(
  ethers.utils.randomBytes(16),
);

// TODO: make a params object instead of arguments list here
const mintDomain = async (registry, owner, labels, withoutReverse = false, keys = [], values = []) => {
  await registry['mintWithRecords(address,string[],string[],string[])'](owner.address || owner, labels, keys, values);

  if (owner.address && withoutReverse) {
    await registry.connect(owner)['removeReverse()']();
  }

  return await registry.namehash(labels);
};

const mintRandomDomain = async (registry, owner, tld, withoutReverse = false, keys = [], values = []) => {
  const labels = [generateRandomLabel(), tld];
  await registry['mintWithRecords(address,string[],string[],string[])'](owner.address || owner, labels, keys, values);

  if (owner.address && withoutReverse) {
    await registry.connect(owner)['removeReverse()']();
  }

  return await registry.namehash(labels);
};

module.exports = { mintDomain, mintRandomDomain };
