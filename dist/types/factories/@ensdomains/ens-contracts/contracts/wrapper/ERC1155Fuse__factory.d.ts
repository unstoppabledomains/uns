import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ERC1155Fuse, ERC1155FuseInterface } from "../../../../../@ensdomains/ens-contracts/contracts/wrapper/ERC1155Fuse";
export declare class ERC1155Fuse__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): ERC1155FuseInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC1155Fuse;
}
//# sourceMappingURL=ERC1155Fuse__factory.d.ts.map