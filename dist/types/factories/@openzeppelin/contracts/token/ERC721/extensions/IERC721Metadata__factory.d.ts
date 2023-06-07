import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC721Metadata, IERC721MetadataInterface } from "../../../../../../@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata";
export declare class IERC721Metadata__factory {
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
    static createInterface(): IERC721MetadataInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC721Metadata;
}
//# sourceMappingURL=IERC721Metadata__factory.d.ts.map