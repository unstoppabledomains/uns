import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { BaseRegistrar, BaseRegistrarInterface } from "../../../../contracts/@ens/LegacyETHRegistrarController.sol/BaseRegistrar";
export declare class BaseRegistrar__factory {
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
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
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
        anonymous?: undefined;
    })[];
    static createInterface(): BaseRegistrarInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): BaseRegistrar;
}
//# sourceMappingURL=BaseRegistrar__factory.d.ts.map