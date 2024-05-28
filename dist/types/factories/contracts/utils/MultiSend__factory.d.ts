import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, BigNumberish, AddressLike, ContractDeployTransaction, ContractRunner } from "ethers";
import type { PayableOverrides } from "../../../common";
import type { MultiSend, MultiSendInterface } from "../../../contracts/utils/MultiSend";
declare type MultiSendConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class MultiSend__factory extends ContractFactory {
    constructor(...args: MultiSendConstructorParams);
    getDeployTransaction(accounts: AddressLike[], values: BigNumberish[], overrides?: PayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(accounts: AddressLike[], values: BigNumberish[], overrides?: PayableOverrides & {
        from?: string;
    }): Promise<MultiSend & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): MultiSend__factory;
    static readonly bytecode = "0x608060405260405161025238038061025283398101604081905261002291610174565b5f5b825181101561009e5782818151811061003f5761003f61023d565b60200260200101516001600160a01b03166108fc8383815181106100655761006561023d565b602002602001015190811502906040515f60405180830381858888f19350505050158015610095573d5f803e3d5ffd5b50600101610024565b5033ff5b634e487b7160e01b5f52604160045260245ffd5b604051601f8201601f191681016001600160401b03811182821017156100de576100de6100a2565b604052919050565b5f6001600160401b038211156100fe576100fe6100a2565b5060051b60200190565b5f82601f830112610117575f80fd5b8151602061012c610127836100e6565b6100b6565b8083825260208201915060208460051b87010193508684111561014d575f80fd5b602086015b848110156101695780518352918301918301610152565b509695505050505050565b5f8060408385031215610185575f80fd5b82516001600160401b038082111561019b575f80fd5b818501915085601f8301126101ae575f80fd5b815160206101be610127836100e6565b82815260059290921b840181019181810190898411156101dc575f80fd5b948201945b8386101561020e5785516001600160a01b03811681146101ff575f80fd5b825294820194908201906101e1565b91880151919650909350505080821115610226575f80fd5b5061023385828601610108565b9150509250929050565b634e487b7160e01b5f52603260045260245ffdfe";
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address payable[]";
            readonly name: "accounts";
            readonly type: "address[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "values";
            readonly type: "uint256[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "constructor";
    }];
    static createInterface(): MultiSendInterface;
    static connect(address: string, runner?: ContractRunner | null): MultiSend;
}
export {};
//# sourceMappingURL=MultiSend__factory.d.ts.map