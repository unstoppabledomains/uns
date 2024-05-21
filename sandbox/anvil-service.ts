import { JsonRpcProvider } from 'ethers';
import { AnvilServer, AnvilServerOptions } from './anvil-server';

export default class AnvilService {
  private _server?: AnvilServer;
  private readonly _provider: JsonRpcProvider;
  private readonly _options: Partial<AnvilServerOptions>;

  constructor (options: Partial<AnvilServerOptions> = {}) {
    this._options = options;
    this._provider = new JsonRpcProvider(this.getRpcEndpoint());
  }

  async startServer () {
    if (this._server) {
      throw new Error('Anvil server is already started');
    }
    this._server = await AnvilServer.launch(this._options, false);
  }

  stopServer () {
    this._server?.kill();
  }

  get provider (): JsonRpcProvider {
    return this._provider;
  }

  get server (): AnvilServer | undefined {
    return this._server;
  }

  private getRpcEndpoint () {
    return `http://${this._options.hostIpAddress}:${this._options.port}`;
  }
}
