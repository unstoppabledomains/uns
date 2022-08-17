const mintDomain = async (registry, owner, tld, label, withoutReverse = false) => {
  const tokenId = await registry.childIdOf(tld, label);
  await registry['mint(address,uint256,string)'](owner.address || owner, tokenId, label);

  if (owner.address && withoutReverse) {
    await registry.connect(owner)['removeReverse()']();
  }

  return tokenId;
};

module.exports = { mintDomain };
