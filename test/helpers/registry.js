const mintDomain = async (registry, owner, tld, label) => {
  const tokenId = await registry.childIdOf(tld, label);
  await registry['mint(address,uint256,string)'](owner.address || owner, tokenId, label);
  return tokenId;
};

module.exports = { mintDomain };
