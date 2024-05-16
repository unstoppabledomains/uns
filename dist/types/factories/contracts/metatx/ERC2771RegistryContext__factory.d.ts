import { type ContractRunner } from "ethers";
import type { ERC2771RegistryContext, ERC2771RegistryContextInterface } from "../../../contracts/metatx/ERC2771RegistryContext";
export declare class ERC2771RegistryContext__factory {
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint8";
            readonly name: "version";
            readonly type: "uint8";
        }];
        readonly name: "Initialized";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "forwarder";
            readonly type: "address";
        }];
        readonly name: "isTrustedForwarder";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): ERC2771RegistryContextInterface;
    static connect(address: string, runner?: ContractRunner | null): ERC2771RegistryContext;
}
//# sourceMappingURL=ERC2771RegistryContext__factory.d.ts.map