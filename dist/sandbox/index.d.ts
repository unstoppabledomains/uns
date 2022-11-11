import { HttpNetworkUserConfig } from 'hardhat/types';
import { GanacheService } from './ganache-service';
export declare const GANACHE_SERVER_CONFIG: {
    chain: {
        chainId: number;
        allowUnlimitedContractSize: boolean;
        vmErrorsOnRPCResponse: boolean;
    };
    miner: {
        defaultGasPrice: number;
        blockGasLimit: number;
    };
    wallet: {
        totalAccounts: number;
        mnemonic: string;
        defaultBalance: number;
        hdPath: string;
    };
    database: {
        dbPath: string;
    };
    logging: {
        verbose: boolean;
        logger: {
            log: () => void;
        };
    };
};
export declare type SandboxOptions = {
    verbose?: boolean;
    clean?: boolean;
    extract?: boolean;
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
    static snapshotPath(): string;
    static create(options: SandboxOptions): Promise<Sandbox>;
    version: string;
    private ganacheService;
    private options;
    private provider;
    private snapshotId?;
    accounts: Record<string, SandboxAccount>;
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