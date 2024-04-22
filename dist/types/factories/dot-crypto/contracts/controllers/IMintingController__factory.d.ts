import { type ContractRunner } from "ethers";
import type { IMintingController, IMintingControllerInterface } from "../../../../dot-crypto/contracts/controllers/IMintingController";
export declare class IMintingController__factory {
    static readonly abi: readonly [{
        readonly constant: false;
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "string";
            readonly name: "label";
            readonly type: "string";
        }];
        readonly name: "mintSLD";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "string";
            readonly name: "label";
            readonly type: "string";
        }];
        readonly name: "safeMintSLD";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly constant: false;
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "string";
            readonly name: "label";
            readonly type: "string";
        }, {
            readonly internalType: "bytes";
            readonly name: "_data";
            readonly type: "bytes";
        }];
        readonly name: "safeMintSLD";
        readonly outputs: readonly [];
        readonly payable: false;
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IMintingControllerInterface;
    static connect(address: string, runner?: ContractRunner | null): IMintingController;
}
//# sourceMappingURL=IMintingController__factory.d.ts.map