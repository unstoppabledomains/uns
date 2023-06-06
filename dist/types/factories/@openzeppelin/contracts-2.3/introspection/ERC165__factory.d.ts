import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ERC165, ERC165Interface } from "../../../../@openzeppelin/contracts-2.3/introspection/ERC165";
export declare class ERC165__factory {
    static readonly abi: ({
        inputs: never[];
        payable: boolean;
        stateMutability: string;
        type: string;
        constant?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        constant: boolean;
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
        payable: boolean;
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): ERC165Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC165;
}
//# sourceMappingURL=ERC165__factory.d.ts.map