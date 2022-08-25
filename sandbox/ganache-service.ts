import {
  server,
  Server,
  EthereumProvider,
  ServerOptions,
} from 'ganache';

const DEFAULT_PORT = 7545;

export type ServerConfigOptions = {
  url: string;
  port?: number;
  hostname?: string;
}

export class GanacheService {
  public server: Server;
  public provider: EthereumProvider;

  private _serverConfigOptions: ServerConfigOptions;

  constructor (options: ServerOptions, serverConfigOptions: ServerConfigOptions) {
    this._serverConfigOptions = this._validateAndTransformOptions(serverConfigOptions);
    this.server = server(options);
    this.provider = this.server.provider;
  }

  startServer () {
    const { port } = this._serverConfigOptions;
    
    if(!port) {
      throw new Error('Port sohuld be defined in the ServerConfigOptions URL');
    }

    return this.server.listen(port);
  }

  stopServer () {
    return this.server.close();
  }

  private _validateAndTransformOptions(options: ServerConfigOptions): ServerConfigOptions {
    const validatedOptions = options;

    const url = new URL(options.url);
    if (url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') {
      throw new Error(
        'Ganache network only works with localhost',
      );
    }

    validatedOptions.hostname = url.hostname;

    validatedOptions.port =
      url.port !== undefined && url.port !== ''
        ? parseInt(url.port, 10)
        : DEFAULT_PORT;

    return validatedOptions;
  }
}
