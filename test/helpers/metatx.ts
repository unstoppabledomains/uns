import { Contract, BigNumberish, Signer, Interface, solidityPackedKeccak256, keccak256, getBytes } from 'ethers';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import type {
  BaseRoutingForwarderMock,
  MintingManagerForwarder,
  RegistrarCustody,
  SeaportProxyBuyer,
  UNSRegistry,
} from '../../types';

export async function sign (
  data: string,
  address: string,
  nonce: BigNumberish | number,
  signer: ISignerWithAddress,
): Promise<string> {
  return signer.signMessage(
    getBytes(solidityPackedKeccak256(['bytes32', 'address', 'uint256'], [keccak256(data), address, nonce])),
  );
}

export type ExecuteFunc = (
  selector: string,
  params: unknown[],
  from: ISignerWithAddress,
  tokenId: BigNumberish,
  nonce?: bigint,
) => Promise<{
  req: {
    from: string;
    nonce: number;
    tokenId: BigNumberish;
    data: string;
  };
  signature: string;
}>;

type ISignerWithAddress = SignerWithAddress | (Signer & { address: string });

export function buildExecuteFunc (
  iface: Interface,
  toAddress: string,
  forwarder:
    | Contract
    | MintingManagerForwarder
    | UNSRegistry
    | BaseRoutingForwarderMock
    | SeaportProxyBuyer
    | RegistrarCustody,
): ExecuteFunc {
  return async (
    selector: string,
    params: unknown[],
    from: ISignerWithAddress,
    tokenId: BigNumberish,
    nonce?: bigint,
  ) => {
    const data = iface.encodeFunctionData(selector, params);

    const _nonce = nonce || (await forwarder.nonceOf(tokenId));
    const signature = await sign(data, toAddress, _nonce, from);

    return {
      req: { from: from.address, nonce: _nonce, tokenId, data },
      signature,
    };
  };
}
