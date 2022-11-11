import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { MinterRole, MinterRoleInterface } from "../../../contracts/roles/MinterRole";
export declare class MinterRole__factory {
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
    static createInterface(): MinterRoleInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MinterRole;
}
//# sourceMappingURL=MinterRole__factory.d.ts.map