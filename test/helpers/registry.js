const { ethers } = require('hardhat');

const generateRandomLabel = () => 'domain-' + ethers.utils.hexlify(
  ethers.utils.randomBytes(16),
);

// TODO: make a params object instead of arguments list here
const mintDomain = async (registry, owner, tld, label = generateRandomLabel(), withoutReverse = false) => {
  const tokenId = await registry.childIdOf(tld, label);
  await registry['mint(address,uint256,string)'](owner.address || owner, tokenId, label);

  if (owner.address && withoutReverse) {
    await registry.connect(owner)['removeReverse()']();
  }

  return tokenId;
};

module.exports = { mintDomain };
