import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IChildToken, IChildTokenInterface } from "../../../contracts/@maticnetwork/IChildToken";
export declare class IChildToken__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IChildTokenInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IChildToken;
}
//# sourceMappingURL=IChildToken__factory.d.ts.map