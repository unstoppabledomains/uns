import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { UNSRegistry } from '../../types/contracts/UNSRegistry';
export declare function mintDomain(registry: UNSRegistry, owner: string | SignerWithAddress, labels: string[], withoutReverse?: boolean, keys?: string[], values?: string[]): Promise<import("ethers").BigNumber>;
export declare const mintRandomDomain: (registry: UNSRegistry, owner: string | SignerWithAddress, tld: string, withoutReverse?: boolean, keys?: never[], values?: never[]) => Promise<import("ethers").BigNumber>;
//# sourceMappingURL=registry.d.ts.map