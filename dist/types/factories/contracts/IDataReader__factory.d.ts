import { type ContractRunner } from "ethers";
import type { IDataReader, IDataReaderInterface } from "../../contracts/IDataReader";
export declare class IDataReader__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "string[]";
            readonly name: "keys";
            readonly type: "string[]";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "getData";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "resolver";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly internalType: "string[]";
            readonly name: "values";
            readonly type: "string[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256[]";
            readonly name: "keyHashes";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "getDataByHash";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "resolver";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly internalType: "string[]";
            readonly name: "keys";
            readonly type: "string[]";
        }, {
            readonly internalType: "string[]";
            readonly name: "values";
            readonly type: "string[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256[]";
            readonly name: "keyHashes";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "tokenIds";
            readonly type: "uint256[]";
        }];
        readonly name: "getDataByHashForMany";
        readonly outputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "resolvers";
            readonly type: "address[]";
        }, {
            readonly internalType: "address[]";
            readonly name: "owners";
            readonly type: "address[]";
        }, {
            readonly internalType: "string[][]";
            readonly name: "keys";
            readonly type: "string[][]";
        }, {
            readonly internalType: "string[][]";
            readonly name: "values";
            readonly type: "string[][]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string[]";
            readonly name: "keys";
            readonly type: "string[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "tokenIds";
            readonly type: "uint256[]";
        }];
        readonly name: "getDataForMany";
        readonly outputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "resolvers";
            readonly type: "address[]";
        }, {
            readonly internalType: "address[]";
            readonly name: "owners";
            readonly type: "address[]";
        }, {
            readonly internalType: "string[][]";
            readonly name: "values";
            readonly type: "string[][]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256[]";
            readonly name: "tokenIds";
            readonly type: "uint256[]";
        }];
        readonly name: "ownerOfForMany";
        readonly outputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "owners";
            readonly type: "address[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): IDataReaderInterface;
    static connect(address: string, runner?: ContractRunner | null): IDataReader;
}
//# sourceMappingURL=IDataReader__factory.d.ts.map