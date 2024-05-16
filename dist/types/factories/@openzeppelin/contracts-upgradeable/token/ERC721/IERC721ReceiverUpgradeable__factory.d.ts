import { type ContractRunner } from "ethers";
import type { IERC721ReceiverUpgradeable, IERC721ReceiverUpgradeableInterface } from "../../../../../@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable";
export declare class IERC721ReceiverUpgradeable__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "onERC721Received";
        readonly outputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "";
            readonly type: "bytes4";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): IERC721ReceiverUpgradeableInterface;
    static connect(address: string, runner?: ContractRunner | null): IERC721ReceiverUpgradeable;
}
//# sourceMappingURL=IERC721ReceiverUpgradeable__factory.d.ts.map