import { type ContractRunner } from "ethers";
import type { IAddressReader, IAddressReaderInterface } from "../../contracts/IAddressReader";
export declare class IAddressReader__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "network";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "token";
            readonly type: "string";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "getAddress";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "network";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "token";
            readonly type: "string";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "getAddressKey";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "network";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "token";
            readonly type: "string";
        }];
        readonly name: "getAddressKeys";
        readonly outputs: readonly [{
            readonly internalType: "string[]";
            readonly name: "";
            readonly type: "string[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IAddressReaderInterface;
    static connect(address: string, runner?: ContractRunner | null): IAddressReader;
}
//# sourceMappingURL=IAddressReader__factory.d.ts.map