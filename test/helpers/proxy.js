const { ethers } = require('hardhat');

const { utils, BigNumber } = ethers;

const getFuncSignature = (fragment) => {
  return `${fragment.name}(${fragment.inputs
    .map((x) => `${x.type}`)
    .join(',')})`;
};

const getInterfaceId = (proxyReader, functions) => {
  let interfaceId;

  for (const functionName of functions) {
    const funcInterface = proxyReader.interface.fragments.find((x) => x.name === functionName);
    const funcSignature = getFuncSignature(funcInterface);
    const funcInterfaceId = utils.keccak256(utils.solidityPack(['string'], [funcSignature])).slice(0, 10);

    if (interfaceId === undefined) {
      interfaceId = BigNumber.from(funcInterfaceId);
    } else {
      interfaceId = interfaceId.xor(BigNumber.from(funcInterfaceId));
    }
  }

  return interfaceId;
};

module.exports = { getInterfaceId };
