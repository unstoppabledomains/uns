import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type { AccessControlMixin, AccessControlMixinInterface } from "../../../../../contracts/@maticnetwork/pos-portal/MintableERC721Predicate.sol/AccessControlMixin";
declare type AccessControlMixinConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class AccessControlMixin__factory extends ContractFactory {
    constructor(...args: AccessControlMixinConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<AccessControlMixin & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): AccessControlMixin__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610707806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c806391d148541161005b57806391d1485414610155578063a217fddf14610195578063ca15c8731461019d578063d547741f146101ba57610088565b8063248a9ca31461008d5780632f2ff15d146100bc57806336568abe146100ea5780639010d07c14610116575b600080fd5b6100aa600480360360208110156100a357600080fd5b50356101e6565b60408051918252519081900360200190f35b6100e8600480360360408110156100d257600080fd5b50803590602001356001600160a01b03166101fb565b005b6100e86004803603604081101561010057600080fd5b50803590602001356001600160a01b0316610267565b6101396004803603604081101561012c57600080fd5b50803590602001356102c8565b604080516001600160a01b039092168252519081900360200190f35b6101816004803603604081101561016b57600080fd5b50803590602001356001600160a01b03166102ef565b604080519115158252519081900360200190f35b6100aa61030d565b6100aa600480360360208110156101b357600080fd5b5035610312565b6100e8600480360360408110156101d057600080fd5b50803590602001356001600160a01b0316610329565b60009081526020819052604090206002015490565b60008281526020819052604090206002015461021e90610219610382565b6102ef565b6102595760405162461bcd60e51b815260040180806020018281038252602f81526020018061066d602f913960400191505060405180910390fd5b6102638282610386565b5050565b61026f610382565b6001600160a01b0316816001600160a01b0316146102be5760405162461bcd60e51b815260040180806020018281038252602f8152602001806106cc602f913960400191505060405180910390fd5b61026382826103f5565b60008281526020819052604081206102e6908363ffffffff61046416565b90505b92915050565b60008281526020819052604081206102e6908363ffffffff61047016565b600081565b60008181526020819052604081206102e990610485565b60008281526020819052604090206002015461034790610219610382565b6102be5760405162461bcd60e51b815260040180806020018281038252603081526020018061069c6030913960400191505060405180910390fd5b3390565b60008281526020819052604090206103a4908263ffffffff61049016565b15610263576103b1610382565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000828152602081905260409020610413908263ffffffff6104a516565b1561026357610420610382565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b60006102e683836104ba565b60006102e6836001600160a01b03841661051e565b60006102e982610536565b60006102e6836001600160a01b03841661053a565b60006102e6836001600160a01b038416610584565b815460009082106104fc5760405162461bcd60e51b815260040180806020018281038252602281526020018061064b6022913960400191505060405180910390fd5b82600001828154811061050b57fe5b9060005260206000200154905092915050565b60009081526001919091016020526040902054151590565b5490565b6000610546838361051e565b61057c575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556102e9565b5060006102e9565b6000818152600183016020526040812054801561064057835460001980830191908101906000908790839081106105b757fe5b90600052602060002001549050808760000184815481106105d457fe5b60009182526020808320909101929092558281526001898101909252604090209084019055865487908061060457fe5b600190038181906000526020600020016000905590558660010160008781526020019081526020016000206000905560019450505050506102e9565b60009150506102e956fe456e756d657261626c655365743a20696e646578206f7574206f6620626f756e6473416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f206772616e74416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e2061646d696e20746f207265766f6b65416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636520726f6c657320666f722073656c66a164736f6c6343000606000a";
    static readonly abi: readonly [{
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
            readonly internalType: "uint256";
            readonly name: "index";
            readonly type: "uint256";
        }];
        readonly name: "getRoleMember";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "role";
            readonly type: "bytes32";
        }];
        readonly name: "getRoleMemberCount";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
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
    }];
    static createInterface(): AccessControlMixinInterface;
    static connect(address: string, runner?: ContractRunner | null): AccessControlMixin;
}
export {};
//# sourceMappingURL=AccessControlMixin__factory.d.ts.map