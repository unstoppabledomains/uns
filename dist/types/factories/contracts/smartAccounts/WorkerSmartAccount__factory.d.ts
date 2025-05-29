import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, BigNumberish, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { WorkerSmartAccount, WorkerSmartAccountInterface } from "../../../contracts/smartAccounts/WorkerSmartAccount";
declare type WorkerSmartAccountConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class WorkerSmartAccount__factory extends ContractFactory {
    constructor(...args: WorkerSmartAccountConstructorParams);
    getDeployTransaction(_faucet: AddressLike, _balanceThreshold: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(_faucet: AddressLike, _balanceThreshold: BigNumberish, overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<WorkerSmartAccount & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): WorkerSmartAccount__factory;
    static readonly bytecode = "0x60c060405234801561000f575f80fd5b5060405161060738038061060783398101604081905261002e91610044565b6001600160a01b0390911660a05260805261007b565b5f8060408385031215610055575f80fd5b82516001600160a01b038116811461006b575f80fd5b6020939093015192949293505050565b60805160a05161055f6100a85f395f818160c5015261032501525f8181606c01526102fd015261055f5ff3fe60806040526004361061003f575f3560e01c8063b77ce56414610048578063c31737741461005b578063d075a8c8146100a1578063de5f72fd146100b457005b3661004657005b005b6100466100563660046103dc565b6100ff565b348015610066575f80fd5b5061008e7f000000000000000000000000000000000000000000000000000000000000000081565b6040519081526020015b60405180910390f35b6100466100af3660046103dc565b6102be565b3480156100bf575f80fd5b506100e77f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610098565b3330146101275760405162461bcd60e51b815260040161011e9061046f565b60405180910390fd5b848314801561013557508481145b61018b5760405162461bcd60e51b815260206004820152602160248201527f576f726b6572536d6172744163636f756e743a20496e76616c69642063616c6c6044820152607360f81b606482015260840161011e565b5f5b858110156102b5575f8787838181106101a8576101a86104bf565b90506020020160208101906101bd91906104d3565b6001600160a01b03168484848181106101d8576101d86104bf565b905060200201358787858181106101f1576101f16104bf565b90506020028101906102039190610500565b604051610211929190610543565b5f6040518083038185875af1925050503d805f811461024b576040519150601f19603f3d011682016040523d82523d5f602084013e610250565b606091505b50509050806102ac5760405162461bcd60e51b815260206004820152602260248201527f576f726b6572536d6172744163636f756e743a2045786563757465206661696c604482015261195960f21b606482015260840161011e565b5060010161018d565b50505050505050565b3330146102dd5760405162461bcd60e51b815260040161011e9061046f565b6102eb8686868686866100ff565b6102f36102fb565b505050505050565b7f0000000000000000000000000000000000000000000000000000000000000000471015610392577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166386cb61c26040518163ffffffff1660e01b81526004015f604051808303815f87803b15801561037b575f80fd5b505af115801561038d573d5f803e3d5ffd5b505050505b565b5f8083601f8401126103a4575f80fd5b50813567ffffffffffffffff8111156103bb575f80fd5b6020830191508360208260051b85010111156103d5575f80fd5b9250929050565b5f805f805f80606087890312156103f1575f80fd5b863567ffffffffffffffff80821115610408575f80fd5b6104148a838b01610394565b9098509650602089013591508082111561042c575f80fd5b6104388a838b01610394565b90965094506040890135915080821115610450575f80fd5b5061045d89828a01610394565b979a9699509497509295939492505050565b60208082526030908201527f576f726b6572536d6172744163636f756e743a2043616e206265206f6e6c792060408201526f31b0b63632b210333937b69039b2b63360811b606082015260800190565b634e487b7160e01b5f52603260045260245ffd5b5f602082840312156104e3575f80fd5b81356001600160a01b03811681146104f9575f80fd5b9392505050565b5f808335601e19843603018112610515575f80fd5b83018035915067ffffffffffffffff82111561052f575f80fd5b6020019150368190038213156103d5575f80fd5b818382375f910190815291905056fea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "contract IFaucet";
            readonly name: "_faucet";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_balanceThreshold";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly stateMutability: "payable";
        readonly type: "fallback";
    }, {
        readonly inputs: readonly [];
        readonly name: "balanceThreshold";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "targets";
            readonly type: "address[]";
        }, {
            readonly internalType: "bytes[]";
            readonly name: "datas";
            readonly type: "bytes[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "values";
            readonly type: "uint256[]";
        }];
        readonly name: "executeBatch";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "targets";
            readonly type: "address[]";
        }, {
            readonly internalType: "bytes[]";
            readonly name: "datas";
            readonly type: "bytes[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "values";
            readonly type: "uint256[]";
        }];
        readonly name: "executeBatchAndEnsureBalance";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "faucet";
        readonly outputs: readonly [{
            readonly internalType: "contract IFaucet";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly stateMutability: "payable";
        readonly type: "receive";
    }];
    static createInterface(): WorkerSmartAccountInterface;
    static connect(address: string, runner?: ContractRunner | null): WorkerSmartAccount;
}
export {};
//# sourceMappingURL=WorkerSmartAccount__factory.d.ts.map