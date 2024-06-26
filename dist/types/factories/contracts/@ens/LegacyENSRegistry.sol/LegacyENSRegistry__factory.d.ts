import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { LegacyENSRegistry, LegacyENSRegistryInterface } from "../../../../contracts/@ens/LegacyENSRegistry.sol/LegacyENSRegistry";
declare type LegacyENSRegistryConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class LegacyENSRegistry__factory extends ContractFactory {
    constructor(...args: LegacyENSRegistryConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<LegacyENSRegistry & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): LegacyENSRegistry__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5060008080526020527fad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb580546001600160a01b031916331790556104f6806100596000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806314ab90381161005b57806314ab90381461010957806316a25cbd1461011c5780631896f70a146101695780635b0fc9c31461017c57600080fd5b80630178b8bf1461008257806302571be3146100cb57806306ab5923146100f4575b600080fd5b6100ae610090366004610416565b6000908152602081905260409020600101546001600160a01b031690565b6040516001600160a01b0390911681526020015b60405180910390f35b6100ae6100d9366004610416565b6000908152602081905260409020546001600160a01b031690565b61010761010236600461044b565b61018f565b005b610107610117366004610480565b61024c565b61015061012a366004610416565b600090815260208190526040902060010154600160a01b900467ffffffffffffffff1690565b60405167ffffffffffffffff90911681526020016100c2565b6101076101773660046104bd565b6102ef565b61010761018a3660046104bd565b610384565b60008381526020819052604090205483906001600160a01b031633146101b457600080fd5b60408051602080820187905281830186905282518083038401815260608301808552815191909201206001600160a01b0386169091529151859187917fce0457fe73731f824cc272376169235128c118b49d344817417c6d108d155e829181900360800190a3600090815260208190526040902080546001600160a01b0319166001600160a01b039390931692909217909155505050565b60008281526020819052604090205482906001600160a01b0316331461027157600080fd5b60405167ffffffffffffffff8316815283907f1d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa689060200160405180910390a250600091825260208290526040909120600101805467ffffffffffffffff909216600160a01b0267ffffffffffffffff60a01b19909216919091179055565b60008281526020819052604090205482906001600160a01b0316331461031457600080fd5b6040516001600160a01b038316815283907f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a09060200160405180910390a25060009182526020829052604090912060010180546001600160a01b0319166001600160a01b03909216919091179055565b60008281526020819052604090205482906001600160a01b031633146103a957600080fd5b6040516001600160a01b038316815283907fd4735d920b0f87494915f556dd9b54c8f309026070caea5c737245152564d2669060200160405180910390a25060009182526020829052604090912080546001600160a01b0319166001600160a01b03909216919091179055565b60006020828403121561042857600080fd5b5035919050565b80356001600160a01b038116811461044657600080fd5b919050565b60008060006060848603121561046057600080fd5b83359250602084013591506104776040850161042f565b90509250925092565b6000806040838503121561049357600080fd5b82359150602083013567ffffffffffffffff811681146104b257600080fd5b809150509250929050565b600080604083850312156104d057600080fd5b823591506104e06020840161042f565b9050925092905056fea164736f6c6343000811000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "label";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }];
        readonly name: "NewOwner";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "resolver";
            readonly type: "address";
        }];
        readonly name: "NewResolver";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "uint64";
            readonly name: "ttl";
            readonly type: "uint64";
        }];
        readonly name: "NewTTL";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }];
        readonly name: "Transfer";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }];
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
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }];
        readonly name: "resolver";
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
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }];
        readonly name: "setOwner";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
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
            readonly name: "node";
            readonly type: "bytes32";
        }, {
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
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint64";
            readonly name: "ttl";
            readonly type: "uint64";
        }];
        readonly name: "setTTL";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "node";
            readonly type: "bytes32";
        }];
        readonly name: "ttl";
        readonly outputs: readonly [{
            readonly internalType: "uint64";
            readonly name: "";
            readonly type: "uint64";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): LegacyENSRegistryInterface;
    static connect(address: string, runner?: ContractRunner | null): LegacyENSRegistry;
}
export {};
//# sourceMappingURL=LegacyENSRegistry__factory.d.ts.map