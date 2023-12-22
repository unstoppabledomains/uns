import { utils, Contract, BigNumberish, BigNumber, Signer } from 'ethers';
import { Interface } from '@ethersproject/abi/';

export async function sign (
  data: string,
  address: string,
  nonce: BigNumberish | number,
  signer: ISignerWithAddress,
): Promise<string> {
  return signer.signMessage(
    utils.arrayify(utils.solidityKeccak256(['bytes32', 'address', 'uint256'], [utils.keccak256(data), address, nonce])),
  );
}

export type ExecuteFunc = (
  selector: string,
  params: unknown[],
  from: ISignerWithAddress,
  tokenId: BigNumberish,
  nonce?: BigNumber,
) => Promise<{
  req: {
    from: string;
    nonce: number;
    tokenId: BigNumberish;
    data: string;
  };
  signature: string;
}>;

type ISignerWithAddress = Signer & {address: string};

export function buildExecuteFunc (iface: Interface, toAddress: string, forwarder: Contract): ExecuteFunc {
  return async (
    selector: string,
    params: unknown[],
    from: ISignerWithAddress,
    tokenId: BigNumberish,
    nonce?: BigNumber,
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
