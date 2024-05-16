import { NsConfig, NsNetworkConfig } from './types';
export declare enum NameService {
    UNS = "UNS",
    ENS = "ENS"
}
export declare function getConfig(nameService?: NameService): NsConfig;
export declare function getNetworkConfig(chainId: number, nameService?: NameService): NsNetworkConfig;
export declare function mergeNetworkConfig(config: NsConfig, nameService?: NameService): void;
//# sourceMappingURL=config.d.ts.map