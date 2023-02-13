import { server, Server, EthereumProvider, ServerOptions } from 'ganache';

const DEFAULT_PORT = 7545;

export type ServerConfigOptions = ServerOptions<'ethereum'> & {
  url: string;
  port?: number;
  hostname?: string;
};

export class GanacheService {
  public server: Server;
  public provider: EthereumProvider;

  private options: ServerConfigOptions;

  constructor (options: ServerConfigOptions) {
    this.options = this.validateAndTransformOptions(options);
    this.server = server<'ethereum'>(this.options as ServerOptions<'ethereum'>);
    this.provider = this.server.provider;
  }

  startServer () {
    const { port } = this.options;

    if (!port) {
      throw new Error('Port sohuld be defined in the ServerConfigOptions URL');
    }

    return this.server.listen(port);
  }

  stopServer () {
    return this.server.close();
  }

  private validateAndTransformOptions (options: ServerConfigOptions): ServerConfigOptions {
    const validatedOptions = options;

    const url = new URL(options.url);
    if (url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') {
      throw new Error('Ganache network only works with localhost');
    }

    validatedOptions.hostname = url.hostname;

    validatedOptions.port = url.port !== undefined && url.port !== '' ? parseInt(url.port, 10) : DEFAULT_PORT;

    const optionsToInclude = ['accountsKeyPath', 'dbPath', 'defaultBalanceEther', 'totalAccounts', 'unlockedAccounts'];
    for (const [key, value] of Object.entries(options)) {
      if (value !== undefined && optionsToInclude.includes(key)) {
        validatedOptions[this.snakeCase(key)] = value;
        delete validatedOptions[key];
      }
    }

    return validatedOptions;
  }

  private snakeCase (value: string): string {
    return value.replace(/([A-Z]){1}/g, (match) => `_${match.toLowerCase()}`);
  }
}
