import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { WhitelistedRole, WhitelistedRoleInterface } from "../../../../../@openzeppelin/contracts-2.3/access/roles/WhitelistedRole";
declare type WhitelistedRoleConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class WhitelistedRole__factory extends ContractFactory {
    constructor(...args: WhitelistedRoleConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<WhitelistedRole & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): WhitelistedRole__factory;
    static readonly bytecode = "0x6080604052610016336001600160e01b0361001b16565b61018f565b61003381600061006a60201b6104161790919060201c565b6040516001600160a01b038216907f22380c05984257a1cb900161c713dd71d39e74820f1aea43bd3f1bdd2096129990600090a250565b61007d82826001600160e01b0361010e16565b156100e957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b60006001600160a01b03821661016f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260228152602001806107546022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b6105b68061019e6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80634c5a628c1161005b5780634c5a628c1461010a5780637362d9c814610112578063bb5f747b14610138578063d6cd94731461015e5761007d565b806310154bad14610082578063291d9549146100aa5780633af32abf146100d0575b600080fd5b6100a86004803603602081101561009857600080fd5b50356001600160a01b0316610166565b005b6100a8600480360360208110156100c057600080fd5b50356001600160a01b03166101b6565b6100f6600480360360208110156100e657600080fd5b50356001600160a01b0316610203565b604080519115158252519081900360200190f35b6100a861021c565b6100a86004803603602081101561012857600080fd5b50356001600160a01b0316610227565b6100f66004803603602081101561014e57600080fd5b50356001600160a01b0316610274565b6100a8610286565b61016f33610274565b6101aa5760405162461bcd60e51b81526004018080602001828103825260408152602001806105426040913960400191505060405180910390fd5b6101b38161028f565b50565b6101bf33610274565b6101fa5760405162461bcd60e51b81526004018080602001828103825260408152602001806105426040913960400191505060405180910390fd5b6101b3816102d7565b600061021660018363ffffffff61031f16565b92915050565b61022533610386565b565b61023033610274565b61026b5760405162461bcd60e51b81526004018080602001828103825260408152602001806105426040913960400191505060405180910390fd5b6101b3816103ce565b6000610216818363ffffffff61031f16565b610225336102d7565b6102a060018263ffffffff61041616565b6040516001600160a01b038216907fee1504a83b6d4a361f4c1dc78ab59bfa30d6a3b6612c403e86bb01ef2984295f90600090a250565b6102e860018263ffffffff61049716565b6040516001600160a01b038216907f270d9b30cf5b0793bbfd54c9d5b94aeb49462b8148399000265144a8722da6b690600090a250565b60006001600160a01b0382166103665760405162461bcd60e51b81526004018080602001828103825260228152602001806105206022913960400191505060405180910390fd5b506001600160a01b03166000908152602091909152604090205460ff1690565b61039760008263ffffffff61049716565b6040516001600160a01b038216907f0a8eb35e5ca14b3d6f28e4abf2f128dbab231a58b56e89beb5d636115001e16590600090a250565b6103df60008263ffffffff61041616565b6040516001600160a01b038216907f22380c05984257a1cb900161c713dd71d39e74820f1aea43bd3f1bdd2096129990600090a250565b610420828261031f565b15610472576040805162461bcd60e51b815260206004820152601f60248201527f526f6c65733a206163636f756e7420616c72656164792068617320726f6c6500604482015290519081900360640190fd5b6001600160a01b0316600090815260209190915260409020805460ff19166001179055565b6104a1828261031f565b6104dc5760405162461bcd60e51b81526004018080602001828103825260218152602001806104ff6021913960400191505060405180910390fd5b6001600160a01b0316600090815260209190915260409020805460ff1916905556fe526f6c65733a206163636f756e7420646f6573206e6f74206861766520726f6c65526f6c65733a206163636f756e7420697320746865207a65726f206164647265737357686974656c69737441646d696e526f6c653a2063616c6c657220646f6573206e6f742068617665207468652057686974656c69737441646d696e20726f6c65a265627a7a7231582030aebabaa6c3dadca8830d368f2bb7701d9562b25c9ab8d6c8a39d4323267ad464736f6c634300050c0032526f6c65733a206163636f756e7420697320746865207a65726f2061646472657373";
    static readonly abi: readonly [{
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "WhitelistAdminAdded";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "WhitelistAdminRemoved";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "WhitelistedAdded";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "WhitelistedRemoved";
        readonly type: "event";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "addWhitelistAdmin";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "addWhitelisted";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "isWhitelistAdmin";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: true;
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "isWhitelisted";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly payable: false;
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "removeWhitelisted";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [];
        readonly name: "renounceWhitelistAdmin";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [];
        readonly name: "renounceWhitelisted";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): WhitelistedRoleInterface;
    static connect(address: string, runner?: ContractRunner | null): WhitelistedRole;
}
export {};
//# sourceMappingURL=WhitelistedRole__factory.d.ts.map