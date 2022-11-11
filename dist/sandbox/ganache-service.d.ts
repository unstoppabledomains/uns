import { Server, EthereumProvider, ServerOptions } from 'ganache';
export declare type ServerConfigOptions = {
    url: string;
    port?: number;
    hostname?: string;
};
export declare class GanacheService {
    server: Server;
    provider: EthereumProvider;
    private serverConfigOptions;
    constructor(options: ServerOptions<'ethereum'>, serverConfigOptions: ServerConfigOptions);
    startServer(): Promise<void>;
    stopServer(): Promise<void>;
    private validateAndTransformOptions;
}
//# sourceMappingURL=ganache-service.d.ts.map