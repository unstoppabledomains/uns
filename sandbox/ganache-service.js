const ganache = require('ganache');

const DEFAULT_PORT = 7545;

class GanacheService {
  constructor (options) {
    this._options = this._validateAndTransformOptions(options);
    this.server = ganache.server(this._options);
    this.provider = this.server.provider;
  }

  startServer () {
    const { port, hostname } = this._options;
    return this.server.listen(port, hostname);
  }

  stopServer () {
    return this.server.close();
  }

  _validateAndTransformOptions (options) {
    const validatedOptions = options;

    // Validate and parse hostname and port from URL (this validation is priority)
    const url = new URL(options.url);
    if (url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') {
      throw new Error(
        'Ganache network only works with localhost',
      );
    }

    // Test for unsupported commands
    if (options.accounts !== undefined) {
      throw new Error(
        'Config: ganache.accounts unsupported for this network',
      );
    }

    // Transform needed options to Ganache core server (not using SnakeCase lib for performance)
    validatedOptions.hostname = url.hostname;

    validatedOptions.port =
      url.port !== undefined && url.port !== ''
        ? parseInt(url.port, 10)
        : DEFAULT_PORT;

    const optionsToInclude = [
      'accountsKeyPath',
      'dbPath',
      'defaultBalanceEther',
      'totalAccounts',
      'unlockedAccounts',
    ];
    for (const [key, value] of Object.entries(options)) {
      if (value !== undefined && optionsToInclude.includes(key)) {
        validatedOptions[this._snakeCase(key)] = value;
        delete validatedOptions[key];
      }
    }

    return validatedOptions;
  }

  _snakeCase (str) {
    return str.replace(/([A-Z]){1}/g, (match) => `_${match.toLowerCase()}`);
  }
}

module.exports = GanacheService;
