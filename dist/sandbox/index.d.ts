import type { HttpNetworkUserConfig } from 'hardhat/types';
import AnvilService from './anvil-service';
export declare type SandboxNetworkOptions = {
    port: number;
    hostIpAddress: string;
    chainId: number;
    hardfork: string;
    gasPrice: number;
    baseFeePerGas: number;
    gasLimit: number;
    mnemonic: string;
    hdPath: string;
    totalAccounts: number;
    defaultBalanceEther: number;
    statePath: string;
};
export declare type SandboxOptions = {
    verbose?: boolean;
    rebuild?: boolean;
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
    version: string;
    accounts: Record<string, SandboxAccount>;
    options: SandboxOptions;
    private anvilService;
    private provider;
    private snapshotId?;
    static defaultNetworkOptions(): HttpNetworkUserConfig;
    static start(options?: SandboxOptions): Promise<Sandbox>;
    static create(options: SandboxOptions): Promise<Sandbox>;
    constructor(service: AnvilService, options?: SandboxOptions);
    start(options?: SandboxStartOptions): Promise<void>;
    stop(): void;
    reset(): Promise<void>;
    private snapshot;
    private revert;
    private getAccounts;
    private uncompressedPublicKeyToAddress;
}
//# sourceMappingURL=index.d.ts.map