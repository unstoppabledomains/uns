"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInterfaceId = exports.getFuncSignature = void 0;
const ethers_1 = require("ethers");
const getFuncSignature = (fragment) => {
    return `${fragment.name}(${fragment.inputs
        .map((x) => `${x.type}`)
        .join(',')})`;
};
exports.getFuncSignature = getFuncSignature;
const getInterfaceId = (proxyReader, functions) => {
    let interfaceId;
    for (const functionName of functions) {
        const funcInterface = Object.values(proxyReader.interface.functions).find((x) => x.name === functionName);
        if (!funcInterface) {
            throw new Error('getInterfaceId: could not find function with name ' + functionName);
        }
        const funcSignature = (0, exports.getFuncSignature)(funcInterface);
        const funcInterfaceId = ethers_1.utils.keccak256(ethers_1.utils.solidityPack(['string'], [funcSignature])).slice(0, 10);
        if (interfaceId === undefined) {
            interfaceId = ethers_1.BigNumber.from(funcInterfaceId);
        }
        else {
            interfaceId = interfaceId.xor(ethers_1.BigNumber.from(funcInterfaceId));
        }
    }
    if (!interfaceId) {
        throw new Error('getInterfaceId: could not get interfaceId. Probably no functions supplied?');
    }
    return interfaceId.toHexString();
};
exports.getInterfaceId = getInterfaceId;
