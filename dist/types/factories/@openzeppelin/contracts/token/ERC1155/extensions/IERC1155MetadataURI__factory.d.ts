import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC1155MetadataURI, IERC1155MetadataURIInterface } from "../../../../../../@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI";
export declare class IERC1155MetadataURI__factory {
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
    static createInterface(): IERC1155MetadataURIInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC1155MetadataURI;
}
//# sourceMappingURL=IERC1155MetadataURI__factory.d.ts.map