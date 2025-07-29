export declare type AnvilServerOptions = {
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
    dumpStatePath: string;
    loadStatePath: string;
    silent: boolean;
    verbose: boolean;
    anvilCliPath: string;
};
export declare class AnvilServer {
    readonly options: Partial<AnvilServerOptions>;
    private readonly _anvil;
    private constructor();
    static launch(options: Partial<AnvilServerOptions>, inherit?: boolean): Promise<AnvilServer>;
    kill(): void;
}
//# sourceMappingURL=anvil-server.d.ts.map