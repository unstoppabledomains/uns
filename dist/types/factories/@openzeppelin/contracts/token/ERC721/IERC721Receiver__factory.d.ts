import { type ContractRunner } from "ethers";
import type { IERC721Receiver, IERC721ReceiverInterface } from "../../../../../@openzeppelin/contracts/token/ERC721/IERC721Receiver";
export declare class IERC721Receiver__factory {
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
    static createInterface(): IERC721ReceiverInterface;
    static connect(address: string, runner?: ContractRunner | null): IERC721Receiver;
}
//# sourceMappingURL=IERC721Receiver__factory.d.ts.map