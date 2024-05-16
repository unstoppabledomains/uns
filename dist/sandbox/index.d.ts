import type { HttpNetworkUserConfig } from 'hardhat/types';
import { GanacheService } from './ganache-service';
export declare type SandboxNetworkOptions = {
    url: string;
    port?: number;
    hostname?: string;
    chainId: number;
    hardfork: string;
    gasPrice: number;
    gasLimit: number;
    allowUnlimitedContractSize: boolean;
    locked: boolean;
    mnemonic: string;
    hdPath: string;
    totalAccounts: number;
    defaultBalanceEther: number;
    dbPath: string;
    snapshotPath: string;
    keepAliveTimeout: number;
    vmErrorsOnRpcResponse: boolean;
    logger: {
        log: (message: string) => void;
    };
};
export declare type SandboxOptions = {
    verbose?: boolean;
    clean?: boolean;
    extract?: boolean;
    network?: Partial<SandboxNetworkOptions>;
};
export declare type SandboxStartOptions = {
    noSnapshot?: boolean;
};
export declare type SandboxAccount = {
    address: string;
    privateKey: string;
};
export declare class Sandbox {
    static defaultNetworkOptions(): HttpNetworkUserConfig;
    static start(options?: SandboxOptions): Promise<Sandbox>;
    static create(options: SandboxOptions): Promise<Sandbox>;
    version: string;
    accounts: Record<string, SandboxAccount>;
    options: SandboxOptions;
    private ganacheService;
    private provider;
    private snapshotId?;
    constructor(service: GanacheService, options?: SandboxOptions);
    start(options?: SandboxStartOptions): Promise<void>;
    stop(): Promise<void>;
    reset(): Promise<void>;
    private snapshot;
    private revert;
    private getAccounts;
    private uncompressedPublicKeyToAddress;
}
//# sourceMappingURL=index.d.ts.map