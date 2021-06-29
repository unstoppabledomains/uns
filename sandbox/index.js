const { network } = require('hardhat');
const { GanacheService } = require('@nomiclabs/hardhat-ganache/dist/src/ganache-service');
const fs = require('fs');
const tar = require('tar');

const Deployer = require('../src/deployer');

class Sandbox {
  constructor (service, options) {
    if (network.name !== 'sandbox') {
      throw new Error(`Network ${network.name} is not supported`);
    }

    this.ganacheService = service;
    this.options = options || {};
    this.provider = network.provider;
    this.snapshotId = undefined;
  }

  static async create (options) {
    options = options || { clean: true, extract: true };
    const defaultOptions = GanacheService.getDefaultOptions();
    const { accounts, ...config } = network.config;
    const networkOptions = {
      ...defaultOptions,
      ...config,
    };

    const { dbPath, snapshotPath } = networkOptions;
    if (options.clean) {
      fs.rmdirSync(dbPath, { recursive: true });
      fs.mkdirSync(dbPath, { recursive: true });
    }

    if (options.extract) {
      await tar.extract({ file: snapshotPath });
    }

    const service = await GanacheService.create(networkOptions);
    return new Sandbox(service, { ...options, network: networkOptions });
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
    return await this.provider.request({
      method: 'evm_snapshot',
      params: [],
    });
  }

  async _revert (snapshotId) {
    return await this.provider.request({
      method: 'evm_revert',
      params: [snapshotId],
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
