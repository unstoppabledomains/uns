import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC20Metadata, IERC20MetadataInterface } from "../../../../../../@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata";
export declare class IERC20Metadata__factory {
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
    static createInterface(): IERC20MetadataInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC20Metadata;
}
//# sourceMappingURL=IERC20Metadata__factory.d.ts.map