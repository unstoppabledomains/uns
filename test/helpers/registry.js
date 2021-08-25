const mintDomain = async (registry, owner, tld, label) => {
  const tokenId = await registry.childIdOf(tld, label);
  await registry.mint(owner.address, tokenId, label);
  return tokenId;
};

module.exports = { mintDomain };
