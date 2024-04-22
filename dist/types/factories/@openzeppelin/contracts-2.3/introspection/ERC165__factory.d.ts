import { type ContractRunner } from "ethers";
import type { ERC165, ERC165Interface } from "../../../../@openzeppelin/contracts-2.3/introspection/ERC165";
export declare class ERC165__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly constant: true;
        readonly inputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "interfaceId";
            readonly type: "bytes4";
        }];
        readonly name: "supportsInterface";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): ERC165Interface;
    static connect(address: string, runner?: ContractRunner | null): ERC165;
}
//# sourceMappingURL=ERC165__factory.d.ts.map