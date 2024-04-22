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
    static readonly bytecode = "0x608060405234801561001057600080fd5b5061112a806100206000396000f3fe60806040526004361061012a5760003560e01c806381c81d35116100ab578063a217fddf1161006f578063a217fddf14610311578063aa271e1a14610326578063d539139314610346578063d547741f14610368578063ecfdcfb814610388578063f2fde38b1461039d57600080fd5b806381c81d35146102815780638da5cb5b1461029457806391d14854146102bc578063983b2d56146102dc57806398650275146102fc57600080fd5b80635fc1964f116100f25780635fc1964f14610204578063634486da14610224578063715018a61461023757806371e2a6571461024c5780638129fc1c1461026c57600080fd5b806301ffc9a71461012f578063248a9ca3146101645780632f2ff15d146101a25780633092afd5146101c457806336568abe146101e4575b600080fd5b34801561013b57600080fd5b5061014f61014a366004610d9b565b6103bd565b60405190151581526020015b60405180910390f35b34801561017057600080fd5b5061019461017f366004610dc5565b60009081526097602052604090206001015490565b60405190815260200161015b565b3480156101ae57600080fd5b506101c26101bd366004610e03565b6103f4565b005b3480156101d057600080fd5b506101c26101df366004610e33565b61041e565b3480156101f057600080fd5b506101c26101ff366004610e03565b610432565b34801561021057600080fd5b506101c261021f366004610e66565b6104b5565b6101c2610232366004610e33565b6104fd565b34801561024357600080fd5b506101c26105be565b34801561025857600080fd5b506101c2610267366004610e66565b6105d2565b34801561027857600080fd5b506101c261061a565b6101c261028f366004610e33565b61072a565b3480156102a057600080fd5b506033546040516001600160a01b03909116815260200161015b565b3480156102c857600080fd5b5061014f6102d7366004610e03565b6107a5565b3480156102e857600080fd5b506101c26102f7366004610e33565b6107d0565b34801561030857600080fd5b506101c26107e1565b34801561031d57600080fd5b50610194600081565b34801561033257600080fd5b5061014f610341366004610e33565b6107f9565b34801561035257600080fd5b506101946000805160206110fe83398151915281565b34801561037457600080fd5b506101c2610383366004610e03565b610813565b34801561039457600080fd5b506101c2610838565b3480156103a957600080fd5b506101c26103b8366004610e33565b61085d565b60006001600160e01b03198216637965db0b60e01b14806103ee57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60008281526097602052604090206001015461040f81610879565b6104198383610883565b505050565b610426610909565b61042f81610963565b50565b6001600160a01b03811633146104a75760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b6104b1828261097b565b5050565b6104bd610909565b60005b81518110156104b1576104eb8282815181106104de576104de610f2b565b6020026020010151610963565b806104f581610f57565b9150506104c0565b610506336107f9565b6105225760405162461bcd60e51b815260040161049e90610f70565b6001600160a01b0381166105785760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d505459000000604482015260640161049e565b610581816109e2565b6105896107e1565b6040516001600160a01b038216903480156108fc02916000818181858888f193505050501580156104b1573d6000803e3d6000fd5b6105c6610909565b6105d060006109fa565b565b6105da610909565b60005b81518110156104b1576106088282815181106105fb576105fb610f2b565b60200260200101516109e2565b8061061281610f57565b9150506105dd565b600054610100900460ff161580801561063a5750600054600160ff909116105b806106545750303b158015610654575060005460ff166001145b6106b75760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161049e565b6000805460ff1916600117905580156106da576000805461ff0019166101001790555b6106e2610a4c565b801561042f576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150565b610733336107f9565b61074f5760405162461bcd60e51b815260040161049e90610f70565b6001600160a01b0381166105815760405162461bcd60e51b815260206004820152601d60248201527f4d696e746572526f6c653a2052454345495645525f49535f454d505459000000604482015260640161049e565b60009182526097602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6107d8610909565b61042f816109e2565b6105d06000805160206110fe83398151915233610432565b60006103ee6000805160206110fe833981519152836107a5565b60008281526097602052604090206001015461082e81610879565b610419838361097b565b610841336107f9565b6105d05760405162461bcd60e51b815260040161049e90610f70565b610865610909565b61086e81610a8b565b61042f600082610b01565b61042f8133610b0b565b61088d82826107a5565b6104b15760008281526097602090815260408083206001600160a01b03851684529091529020805460ff191660011790556108c53390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6033546001600160a01b031633146105d05760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161049e565b61042f6000805160206110fe83398151915282610813565b61098582826107a5565b156104b15760008281526097602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b61042f6000805160206110fe83398151915282610b01565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff16610a735760405162461bcd60e51b815260040161049e90610fa5565b610a7b610b6f565b610a83610b9f565b6105d0610bc6565b610a93610909565b6001600160a01b038116610af85760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161049e565b61042f816109fa565b6104b18282610883565b610b1582826107a5565b6104b157610b2d816001600160a01b03166014610bf8565b610b38836020610bf8565b604051602001610b49929190611014565b60408051601f198184030181529082905262461bcd60e51b825261049e91600401611089565b600054610100900460ff16610b965760405162461bcd60e51b815260040161049e90610fa5565b6105d0336109fa565b600054610100900460ff166105d05760405162461bcd60e51b815260040161049e90610fa5565b600054610100900460ff16610bed5760405162461bcd60e51b815260040161049e90610fa5565b6105d0600033610b01565b60606000610c078360026110bc565b610c129060026110d3565b67ffffffffffffffff811115610c2a57610c2a610e50565b6040519080825280601f01601f191660200182016040528015610c54576020820181803683370190505b509050600360fc1b81600081518110610c6f57610c6f610f2b565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110610c9e57610c9e610f2b565b60200101906001600160f81b031916908160001a9053506000610cc28460026110bc565b610ccd9060016110d3565b90505b6001811115610d45576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110610d0157610d01610f2b565b1a60f81b828281518110610d1757610d17610f2b565b60200101906001600160f81b031916908160001a90535060049490941c93610d3e816110e6565b9050610cd0565b508315610d945760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161049e565b9392505050565b600060208284031215610dad57600080fd5b81356001600160e01b031981168114610d9457600080fd5b600060208284031215610dd757600080fd5b5035919050565b6001600160a01b038116811461042f57600080fd5b8035610dfe81610dde565b919050565b60008060408385031215610e1657600080fd5b823591506020830135610e2881610dde565b809150509250929050565b600060208284031215610e4557600080fd5b8135610d9481610dde565b634e487b7160e01b600052604160045260246000fd5b60006020808385031215610e7957600080fd5b823567ffffffffffffffff80821115610e9157600080fd5b818501915085601f830112610ea557600080fd5b813581811115610eb757610eb7610e50565b8060051b604051601f19603f83011681018181108582111715610edc57610edc610e50565b604052918252848201925083810185019188831115610efa57600080fd5b938501935b82851015610f1f57610f1085610df3565b84529385019392850192610eff565b98975050505050505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201610f6957610f69610f41565b5060010190565b6020808252818101527f4d696e746572526f6c653a2043414c4c45525f49535f4e4f545f4d494e544552604082015260600190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60005b8381101561100b578181015183820152602001610ff3565b50506000910152565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161104c816017850160208801610ff0565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161107d816028840160208801610ff0565b01602801949350505050565b60208152600082518060208401526110a8816040850160208701610ff0565b601f01601f19169190910160400192915050565b80820281158282048414176103ee576103ee610f41565b808201808211156103ee576103ee610f41565b6000816110f5576110f5610f41565b50600019019056fe9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a164736f6c6343000811000a";
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