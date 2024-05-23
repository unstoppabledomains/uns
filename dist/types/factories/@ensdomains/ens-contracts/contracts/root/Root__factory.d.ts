import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { Root, RootInterface } from "../../../../../@ensdomains/ens-contracts/contracts/root/Root";
declare type RootConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Root__factory extends ContractFactory {
    constructor(...args: RootConstructorParams);
    getDeployTransaction(_ens: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(_ens: AddressLike, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<Root & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): Root__factory;
    static readonly bytecode = "0x608060405234801561000f575f80fd5b5060405161070e38038061070e83398101604081905261002e916100ab565b6100373361005c565b600280546001600160a01b0319166001600160a01b03929092169190911790556100d8565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b5f602082840312156100bb575f80fd5b81516001600160a01b03811681146100d1575f80fd5b9392505050565b610629806100e55f395ff3fe608060405234801561000f575f80fd5b50600436106100a6575f3560e01c80638cb8ecec1161006e5780638cb8ecec1461013e5780638da5cb5b14610151578063cbe9e76414610161578063da8c229e14610183578063e0dba60f146101a5578063f2fde38b146101b8575f80fd5b806301670ba9146100aa57806301ffc9a7146100bf5780633f15457f146100f85780634e543b2614610123578063715018a614610136575b5f80fd5b6100bd6100b8366004610529565b6101cb565b005b6100e36100cd366004610540565b6001600160e01b0319166301ffc9a760e01b1490565b60405190151581526020015b60405180910390f35b60025461010b906001600160a01b031681565b6040516001600160a01b0390911681526020016100ef565b6100bd610131366004610589565b610217565b6100bd610282565b6100bd61014c3660046105a2565b610295565b5f546001600160a01b031661010b565b6100e361016f366004610529565b60036020525f908152604090205460ff1681565b6100e3610191366004610589565b60016020525f908152604090205460ff1681565b6100bd6101b33660046105cc565b6103a2565b6100bd6101c6366004610589565b610408565b6101d3610481565b60405181907f1764176cfa565853ba1ded547a830a9f9bff95231ef6fd228b3ddd6175777569905f90a25f908152600360205260409020805460ff19166001179055565b61021f610481565b600254604051630c4b7b8560e11b81525f60048201526001600160a01b03838116602483015290911690631896f70a906044015f604051808303815f87803b158015610269575f80fd5b505af115801561027b573d5f803e3d5ffd5b5050505050565b61028a610481565b6102935f6104da565b565b335f9081526001602052604090205460ff166103095760405162461bcd60e51b815260206004820152602860248201527f436f6e74726f6c6c61626c653a2043616c6c6572206973206e6f74206120636f604482015267373a3937b63632b960c11b60648201526084015b60405180910390fd5b5f8281526003602052604090205460ff1615610323575f80fd5b6002546040516306ab592360e01b81525f6004820152602481018490526001600160a01b038381166044830152909116906306ab5923906064016020604051808303815f875af1158015610379573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061039d9190610605565b505050565b6103aa610481565b6001600160a01b0382165f81815260016020908152604091829020805460ff191685151590811790915591519182527f4c97694570a07277810af7e5669ffd5f6a2d6b74b6e9a274b8b870fd5114cf87910160405180910390a25050565b610410610481565b6001600160a01b0381166104755760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610300565b61047e816104da565b50565b5f546001600160a01b031633146102935760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610300565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b5f60208284031215610539575f80fd5b5035919050565b5f60208284031215610550575f80fd5b81356001600160e01b031981168114610567575f80fd5b9392505050565b80356001600160a01b0381168114610584575f80fd5b919050565b5f60208284031215610599575f80fd5b6105678261056e565b5f80604083850312156105b3575f80fd5b823591506105c36020840161056e565b90509250929050565b5f80604083850312156105dd575f80fd5b6105e68361056e565b9150602083013580151581146105fa575f80fd5b809150509250929050565b5f60208284031215610615575f80fd5b505191905056fea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "contract ENS";
            readonly name: "_ens";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "controller";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "bool";
            readonly name: "enabled";
            readonly type: "bool";
        }];
        readonly name: "ControllerChanged";
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
            readonly name: "label";
            readonly type: "bytes32";
        }];
        readonly name: "TLDLocked";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "controllers";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "ens";
        readonly outputs: readonly [{
            readonly internalType: "contract ENS";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "label";
            readonly type: "bytes32";
        }];
        readonly name: "lock";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly name: "locked";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
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
        readonly inputs: readonly [];
        readonly name: "renounceOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "controller";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "enabled";
            readonly type: "bool";
        }];
        readonly name: "setController";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "resolver";
            readonly type: "address";
        }];
        readonly name: "setResolver";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "label";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }];
        readonly name: "setSubnodeOwner";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "interfaceID";
            readonly type: "bytes4";
        }];
        readonly name: "supportsInterface";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "pure";
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
    static createInterface(): RootInterface;
    static connect(address: string, runner?: ContractRunner | null): Root;
}
export {};
//# sourceMappingURL=Root__factory.d.ts.map