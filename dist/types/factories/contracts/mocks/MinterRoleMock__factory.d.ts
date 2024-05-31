import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { MinterRoleMock, MinterRoleMockInterface } from "../../../contracts/mocks/MinterRoleMock";
declare type MinterRoleMockConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class MinterRoleMock__factory extends ContractFactory {
    constructor(...args: MinterRoleMockConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<MinterRoleMock & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): MinterRoleMock__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b506110a38061001d5f395ff3fe608060405260043610610126575f3560e01c806381c81d35116100a8578063a217fddf1161006d578063a217fddf146102fe578063aa271e1a14610311578063d539139314610330578063d547741f14610350578063ecfdcfb81461036f578063f2fde38b14610383575f80fd5b806381c81d35146102725780638da5cb5b1461028557806391d14854146102ac578063983b2d56146102cb57806398650275146102ea575f80fd5b80635fc1964f116100ee5780635fc1964f146101f9578063634486da14610218578063715018a61461022b57806371e2a6571461023f5780638129fc1c1461025e575f80fd5b806301ffc9a71461012a578063248a9ca31461015e5780632f2ff15d1461019a5780633092afd5146101bb57806336568abe146101da575b5f80fd5b348015610135575f80fd5b50610149610144366004610d48565b6103a2565b60405190151581526020015b60405180910390f35b348015610169575f80fd5b5061018c610178366004610d6f565b5f9081526097602052604090206001015490565b604051908152602001610155565b3480156101a5575f80fd5b506101b96101b4366004610daa565b6103d8565b005b3480156101c6575f80fd5b506101b96101d5366004610dd8565b610401565b3480156101e5575f80fd5b506101b96101f4366004610daa565b610415565b348015610204575f80fd5b506101b9610213366004610e07565b610498565b6101b9610226366004610dd8565b6104d5565b348015610236575f80fd5b506101b9610593565b34801561024a575f80fd5b506101b9610259366004610e07565b6105a6565b348015610269575f80fd5b506101b96105e3565b6101b9610280366004610dd8565b6106ed565b348015610290575f80fd5b506033546040516001600160a01b039091168152602001610155565b3480156102b7575f80fd5b506101496102c6366004610daa565b610768565b3480156102d6575f80fd5b506101b96102e5366004610dd8565b610792565b3480156102f5575f80fd5b506101b96107a3565b348015610309575f80fd5b5061018c5f81565b34801561031c575f80fd5b5061014961032b366004610dd8565b6107ba565b34801561033b575f80fd5b5061018c5f8051602061107783398151915281565b34801561035b575f80fd5b506101b961036a366004610daa565b6107d2565b34801561037a575f80fd5b506101b96107f6565b34801561038e575f80fd5b506101b961039d366004610dd8565b61081b565b5f6001600160e01b03198216637965db0b60e01b14806103d257506301ffc9a760e01b6001600160e01b03198316145b92915050565b5f828152609760205260409020600101546103f281610836565b6103fc8383610840565b505050565b6104096108c5565b6104128161091f565b50565b6001600160a01b038116331461048a5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b6104948282610936565b5050565b6104a06108c5565b5f5b8151811015610494576104cd8282815181106104c0576104c0610ec7565b602002602001015161091f565b6001016104a2565b6104de336107ba565b6104fa5760405162461bcd60e51b815260040161048190610edb565b6001600160a01b0381166105505760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610481565b6105598161099c565b6105616107a3565b6040516001600160a01b038216903480156108fc02915f818181858888f19350505050158015610494573d5f803e3d5ffd5b61059b6108c5565b6105a45f6109b3565b565b6105ae6108c5565b5f5b8151811015610494576105db8282815181106105ce576105ce610ec7565b602002602001015161099c565b6001016105b0565b5f54610100900460ff161580801561060157505f54600160ff909116105b8061061a5750303b15801561061a57505f5460ff166001145b61067d5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610481565b5f805460ff19166001179055801561069e575f805461ff0019166101001790555b6106a6610a04565b8015610412575f805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150565b6106f6336107ba565b6107125760405162461bcd60e51b815260040161048190610edb565b6001600160a01b0381166105595760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d5054590000006044820152606401610481565b5f9182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61079a6108c5565b6104128161099c565b6105a45f8051602061107783398151915233610415565b5f6103d25f8051602061107783398151915283610768565b5f828152609760205260409020600101546107ec81610836565b6103fc8383610936565b6107ff336107ba565b6105a45760405162461bcd60e51b815260040161048190610edb565b6108236108c5565b61082c81610a42565b6104125f82610ab8565b6104128133610ac2565b61084a8282610768565b610494575f8281526097602090815260408083206001600160a01b03851684529091529020805460ff191660011790556108813390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6033546001600160a01b031633146105a45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610481565b6104125f80516020611077833981519152826107d2565b6109408282610768565b15610494575f8281526097602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6104125f8051602061107783398151915282610ab8565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0905f90a35050565b5f54610100900460ff16610a2a5760405162461bcd60e51b815260040161048190610f10565b610a32610b26565b610a3a610b55565b6105a4610b7b565b610a4a6108c5565b6001600160a01b038116610aaf5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610481565b610412816109b3565b6104948282610840565b610acc8282610768565b61049457610ae4816001600160a01b03166014610bab565b610aef836020610bab565b604051602001610b00929190610f7d565b60408051601f198184030181529082905262461bcd60e51b825261048191600401610ff1565b5f54610100900460ff16610b4c5760405162461bcd60e51b815260040161048190610f10565b6105a4336109b3565b5f54610100900460ff166105a45760405162461bcd60e51b815260040161048190610f10565b5f54610100900460ff16610ba15760405162461bcd60e51b815260040161048190610f10565b6105a45f33610ab8565b60605f610bb9836002611037565b610bc490600261104e565b67ffffffffffffffff811115610bdc57610bdc610df3565b6040519080825280601f01601f191660200182016040528015610c06576020820181803683370190505b509050600360fc1b815f81518110610c2057610c20610ec7565b60200101906001600160f81b03191690815f1a905350600f60fb1b81600181518110610c4e57610c4e610ec7565b60200101906001600160f81b03191690815f1a9053505f610c70846002611037565b610c7b90600161104e565b90505b6001811115610cf2576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110610caf57610caf610ec7565b1a60f81b828281518110610cc557610cc5610ec7565b60200101906001600160f81b03191690815f1a90535060049490941c93610ceb81611061565b9050610c7e565b508315610d415760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610481565b9392505050565b5f60208284031215610d58575f80fd5b81356001600160e01b031981168114610d41575f80fd5b5f60208284031215610d7f575f80fd5b5035919050565b6001600160a01b0381168114610412575f80fd5b8035610da581610d86565b919050565b5f8060408385031215610dbb575f80fd5b823591506020830135610dcd81610d86565b809150509250929050565b5f60208284031215610de8575f80fd5b8135610d4181610d86565b634e487b7160e01b5f52604160045260245ffd5b5f6020808385031215610e18575f80fd5b823567ffffffffffffffff80821115610e2f575f80fd5b818501915085601f830112610e42575f80fd5b813581811115610e5457610e54610df3565b8060051b604051601f19603f83011681018181108582111715610e7957610e79610df3565b604052918252848201925083810185019188831115610e96575f80fd5b938501935b82851015610ebb57610eac85610d9a565b84529385019392850192610e9b565b98975050505050505050565b634e487b7160e01b5f52603260045260245ffd5b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b5f5b83811015610f75578181015183820152602001610f5d565b50505f910152565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081525f8351610fb4816017850160208801610f5b565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351610fe5816028840160208801610f5b565b01602801949350505050565b602081525f825180602084015261100f816040850160208701610f5b565b601f01601f19169190910160400192915050565b634e487b7160e01b5f52601160045260245ffd5b80820281158282048414176103d2576103d2611023565b808201808211156103d2576103d2611023565b5f8161106f5761106f611023565b505f19019056fe9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000818000a";
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
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "previousOwner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "OwnershipTransferred";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "previousAdminRole";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "newAdminRole";
            readonly type: "bytes32";
        }];
        readonly name: "RoleAdminChanged";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "RoleGranted";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }];
        readonly name: "RoleRevoked";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "DEFAULT_ADMIN_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "MINTER_ROLE";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "addMinter";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "accounts";
            readonly type: "address[]";
        }];
        readonly name: "addMinters";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address payable";
            readonly name: "receiver";
            readonly type: "address";
        }];
        readonly name: "closeMinter";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }];
        readonly name: "getRoleAdmin";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "grantRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "hasRole";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "initialize";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "isMinter";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "olnyMinterFunc";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "owner";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "removeMinter";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "accounts";
            readonly type: "address[]";
        }];
        readonly name: "removeMinters";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "renounceMinter";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "renounceOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "renounceRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }];
        readonly name: "revokeRole";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address payable";
            readonly name: "receiver";
            readonly type: "address";
        }];
        readonly name: "rotateMinter";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
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
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "transferOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): MinterRoleMockInterface;
    static connect(address: string, runner?: ContractRunner | null): MinterRoleMock;
}
export {};
//# sourceMappingURL=MinterRoleMock__factory.d.ts.map