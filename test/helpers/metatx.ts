import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { utils, Contract, BigNumberish } from 'ethers';
// import { ethers } from 'hardhat';
// import { TypedDataDomain } from "@ethersproject/abstract-signer";
import { Interface } from '@ethersproject/abi/';

export async function sign (data: string, address: string, nonce: BigNumberish | number, signer: SignerWithAddress): Promise<string> {
  return signer.signMessage(
    utils.arrayify(
      utils.solidityKeccak256(
        [ 'bytes32', 'address', 'uint256' ],
        [ utils.keccak256(data), address, nonce ],
      ),
    ),
  );
};

// const signTypedData = async (contract: Contract, signer: SignerWithAddress, value: Record<string, any>) => {
//   const domain: TypedDataDomain = {
//     name: 'RegistryForwarder',
//     version: '0.0.1',
//     chainId: (await provider.getNetwork()).chainId,
//     verifyingContract: contract,
//   };

//   const types = {
//     ForwardRequest: [
//       { name: 'from', type: 'address' },
//       { name: 'gas', type: 'uint256' },
//       { name: 'tokenId', type: 'uint256' },
//       { name: 'nonce', type: 'uint256' },
//       { name: 'data', type: 'bytes' },
//     ],
//   };

//   return signer._signTypedData(domain, types, value);
// };

export type ExecuteFunc = (
  selector: string,
  params: any[],
  from: SignerWithAddress, 
  tokenId: BigNumberish
) => Promise<{
  req: { 
    from: string,
    nonce: number, 
    tokenId: BigNumberish, 
    data: string
  }, 
  signature: string 
}>

export function buildExecuteFunc(iface: Interface, toAddress: string, forwarder: Contract): ExecuteFunc {
  return async (selector: string, params: any[], from: SignerWithAddress, tokenId: BigNumberish) => {
    const data = iface.encodeFunctionData(selector, params);

    const nonce = await forwarder.nonceOf(tokenId);
    const signature = await sign(data, toAddress, nonce, from);

    return { 
      req: { from: from.address, nonce, tokenId, data }, 
      signature 
    };
  };
};
