import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IETHRegistrarController, IETHRegistrarControllerInterface } from "../../../../../@ensdomains/ens-contracts/contracts/ethregistrar/IETHRegistrarController";
export declare class IETHRegistrarController__factory {
    static readonly abi: ({
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
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): IETHRegistrarControllerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IETHRegistrarController;
}
//# sourceMappingURL=IETHRegistrarController__factory.d.ts.map