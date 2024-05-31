import { JsonRpcProvider } from 'ethers';
import { AnvilServer, AnvilServerOptions } from './anvil-server';
export default class AnvilService {
    private _server?;
    private readonly _provider;
    private readonly _options;
    constructor(options?: Partial<AnvilServerOptions>);
    startServer(): Promise<void>;
    stopServer(): void;
    get provider(): JsonRpcProvider;
    get server(): AnvilServer | undefined;
    private getRpcEndpoint;
}
//# sourceMappingURL=anvil-service.d.ts.map