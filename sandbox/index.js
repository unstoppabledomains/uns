const fs = require('fs');
const tar = require('tar');

const Deployer = require('../src/deployer');
const GanacheService = require('./ganache-service');

const defaultGanacheOptions = {
  url: 'http://localhost:7545',
  gasPrice: 20000000000,
  gasLimit: 6721975,
  defaultBalanceEther: 100,
  totalAccounts: 10,
  hardfork: 'petersburg',
  allowUnlimitedContractSize: false,
  locked: false,
  hdPath: 'm/44\'/60\'/0\'/0/',
  keepAliveTimeout: 5000,
  mnemonic: 'mimic dune forward party defy island absorb insane deputy obvious brother immense',
  chainId: 1337,
  dbPath: './.sandbox',
  snapshotPath: './sandbox/db.tgz',
  logger: console,
};

class Sandbox {
  constructor (service, options) {
    this.ganacheService = service;
    this.options = options || {};
    this.provider = service.provider;
    this.snapshotId = undefined;
  }

  static async create (options) {
    options = options || { clean: true, extract: true };
    const networkOptions = {
      ...defaultGanacheOptions,
      ...options.network,
    };

    const { dbPath, snapshotPath } = networkOptions;
    if (options.clean) {
      fs.rmdirSync(dbPath, { recursive: true });
      fs.mkdirSync(dbPath, { recursive: true });
    }

    if (options.extract) {
      await tar.extract({ file: snapshotPath });
    }

    const service = new GanacheService(networkOptions);
    return new Sandbox(service, options);
  }

  async start () {
    await this.ganacheService.startServer();
    this.snapshotId = await this._snapshot();
  }

  async stop () {
    try {
      await this.ganacheService.stopServer();
    } catch (e) {
      if (e.message.includes('Server is not running')) {
        GanacheService.error = undefined;
        return;
      }
      throw e;
    }
  }

  async reset () {
    await this._revert(this.snapshotId);
    this.snapshotId = await this._snapshot();
  }

  async rebuild () {
    await this.start();
    const deployer = await Deployer.create();
    const deployConfig = await deployer.execute(['full']);
    console.log('Config:', JSON.stringify(deployConfig));
    await this.stop();

    const { db_path: dbPath, snapshotPath } = this.options.network;
    await tar.create(
      {
        gzip: true,
        file: snapshotPath,
        filter: p => p.indexOf('_tmp') === -1,
      },
      [dbPath],
    );
  }

  async _snapshot () {
    return await new Promise((resolve, reject) => {
      this.provider.sendAsync({
        method: 'evm_snapshot',
        params: [],
      }, (err, res) => {
        if (err) reject(err);

        const { result } = res;
        resolve(result);
      });
    });
  }

  async _revert (snapshotId) {
    await new Promise((resolve, reject) => {
      this.provider.send({
        method: 'evm_revert',
        params: [snapshotId],
      }, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}

module.exports = Sandbox;

// NOTE: Node module execution is used for rebuilding sandbox package
if (require.main === module) {
  (async () => {
    try {
      const sandbox = await Sandbox.create({ clean: true, extract: false });
      await sandbox.rebuild();
    } catch (error) {
      console.error(error);
    }
    process.exit();
  })();
}
