import { ContractFactory, ContractTransactionResponse } from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type { CriteriaResolution, CriteriaResolutionInterface } from "../../../../seaport-core/src/lib/CriteriaResolution";
declare type CriteriaResolutionConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class CriteriaResolution__factory extends ContractFactory {
    constructor(...args: CriteriaResolutionConstructorParams);
    getDeployTransaction(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<ContractDeployTransaction>;
    deploy(overrides?: NonPayableOverrides & {
        from?: string;
    }): Promise<CriteriaResolution & {
        deploymentTransaction(): ContractTransactionResponse;
    }>;
    connect(runner: ContractRunner | null): CriteriaResolution__factory;
    static readonly bytecode = "0x6080604052348015600e575f80fd5b50601580601a5f395ff3fe60806040525f80fdfea164736f6c6343000818000a";
    static readonly abi: readonly [{
        readonly inputs: readonly [];
        readonly name: "ConsiderationCriteriaResolverOutOfRange";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "CriteriaNotEnabledForItem";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidProof";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OfferCriteriaResolverOutOfRange";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "enum Side";
            readonly name: "side";
            readonly type: "uint8";
        }];
        readonly name: "OrderCriteriaResolverOutOfRange";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "orderIndex";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "considerationIndex";
            readonly type: "uint256";
        }];
        readonly name: "UnresolvedConsiderationCriteria";
        readonly type: "error";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "orderIndex";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "offerIndex";
            readonly type: "uint256";
        }];
        readonly name: "UnresolvedOfferCriteria";
        readonly type: "error";
    }];
    static createInterface(): CriteriaResolutionInterface;
    static connect(address: string, runner?: ContractRunner | null): CriteriaResolution;
}
export {};
//# sourceMappingURL=CriteriaResolution__factory.d.ts.map