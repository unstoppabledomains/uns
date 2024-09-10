import { keccak256, FunctionFragment, solidityPacked, toBeHex, BaseContract } from 'ethers';

export const getFuncSignature = (fragment: FunctionFragment): string => {
  return `${fragment.name}(${fragment.inputs.map((x) => `${x.type}`).join(',')})`;
};

export const getInterfaceId = (contract: BaseContract, functions: string[]): string => {
  let interfaceId: bigint | undefined;

  for (const functionName of functions) {
    const funcInterface = contract.interface.getFunction(functionName);

    if (!funcInterface) {
      throw new Error('getInterfaceId: could not find function with name ' + functionName);
    }

    const funcSignature = getFuncSignature(funcInterface);
    const funcInterfaceId = keccak256(solidityPacked(['string'], [funcSignature])).slice(0, 10);

    if (interfaceId === undefined) {
      interfaceId = BigInt(funcInterfaceId);
    } else {
      interfaceId = interfaceId ^ BigInt(funcInterfaceId);
    }
  }

  if (!interfaceId) {
    throw new Error('getInterfaceId: could not get interfaceId. Probably no functions supplied?');
  }

  return toBeHex(interfaceId);
};
