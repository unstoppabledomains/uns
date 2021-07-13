const { ethers } = require('hardhat');

const signTypedData = async (contract, signer, value) => {
  const domain = {
    name: 'RegistryForwarder',
    version: '0.0.1',
    chainId: (await ethers.provider.getNetwork()).chainId,
    verifyingContract: contract,
  };

  const types = {
    ForwardRequest: [
      { name: 'from', type: 'address' },
      { name: 'gas', type: 'uint256' },
      { name: 'tokenId', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'data', type: 'bytes' },
    ],
  };

  return signer._signTypedData(domain, types, value);
};

module.exports = { signTypedData };
