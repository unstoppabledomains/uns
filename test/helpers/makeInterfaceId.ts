import { soliditySha3 } from 'web3-utils';

export function makeInterfaceId (functionSignatures: string[] = []) {
  const INTERFACE_ID_LENGTH = 4;

  const interfaceIdBuffer = functionSignatures
    .map((signature) => soliditySha3(signature)) // keccak256
    .map(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (h) => Buffer.from(h!.substring(2), 'hex').slice(0, 4), // bytes4()
    )
    .reduce((memo, bytes) => {
      for (let i = 0; i < INTERFACE_ID_LENGTH; i++) {
        memo[i] = memo[i] ^ bytes[i]; // xor
      }
      return memo;
    }, Buffer.alloc(INTERFACE_ID_LENGTH));

  return `0x${interfaceIdBuffer.toString('hex')}`;
}
