import { Server, EthereumProvider, ServerOptions } from 'ganache';
export declare type ServerConfigOptions = ServerOptions<'ethereum'> & {
    url: string;
    port?: number;
    hostname?: string;
};
export declare class GanacheService {
    server: Server;
    provider: EthereumProvider;
    private options;
    constructor(options: ServerConfigOptions);
    startServer(): Promise<void>;
    stopServer(): Promise<void>;
    private validateAndTransformOptions;
    private snakeCase;
}
//# sourceMappingURL=ganache-service.d.ts.map