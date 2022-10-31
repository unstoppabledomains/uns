import { utils, BigNumber } from 'ethers';
import { FunctionFragment } from 'ethers/lib/utils';
import { ProxyReader } from '../../typechain-types/contracts';

export const getFuncSignature = (fragment: FunctionFragment): string => {
  return `${fragment.name}(${fragment.inputs
    .map((x) => `${x.type}`)
    .join(',')})`;
};

export const getInterfaceId = (proxyReader: ProxyReader, functions: string[]): string => {
  let interfaceId: BigNumber | undefined;

  for (const functionName of functions) {
    const funcInterface = Object.values(proxyReader.interface.functions).find((x) => x.name === functionName);

    if(!funcInterface) {
      throw new Error('getInterfaceId: could not find function with name ' + functionName);
    }

    const funcSignature = getFuncSignature(funcInterface);
    const funcInterfaceId = utils.keccak256(utils.solidityPack(['string'], [funcSignature])).slice(0, 10);

    if (interfaceId === undefined) {
      interfaceId = BigNumber.from(funcInterfaceId);
    } else {
      interfaceId = interfaceId.xor(BigNumber.from(funcInterfaceId));
    }
  }

  if(!interfaceId) {
    throw new Error('getInterfaceId: could not get interfaceId. Probably no functions supplied?');
  }

  return interfaceId.toHexString();
};
