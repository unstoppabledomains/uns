import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract, BigNumberish } from 'ethers';
import { Interface } from '@ethersproject/abi/';
export declare function sign(data: string, address: string, nonce: BigNumberish | number, signer: SignerWithAddress): Promise<string>;
export declare type ExecuteFunc = (selector: string, params: unknown[], from: SignerWithAddress, tokenId: BigNumberish) => Promise<{
    req: {
        from: string;
        nonce: number;
        tokenId: BigNumberish;
        data: string;
    };
    signature: string;
}>;
export declare function buildExecuteFunc(iface: Interface, toAddress: string, forwarder: Contract): ExecuteFunc;
//# sourceMappingURL=metatx.d.ts.map