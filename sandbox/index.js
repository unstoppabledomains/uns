const fs = require('fs');
const tar = require('tar');
const path = require('path');
const HDKey = require('hdkey');
const { mnemonicToSeed } = require('bip39');
const secp256k1 = require('secp256k1');
const createKeccakHash = require('keccak');

const GanacheService = require('./ganache-service');

class Sandbox {
  static defaultOptions () {
    return {
      url: 'http://localhost:7545',
      gasPrice: 20000000000,
      gasLimit: 6721975,
      defaultBalanceEther: 1000,
      totalAccounts: 10,
      hardfork: 'petersburg',
      allowUnlimitedContractSize: false,
      locked: false,
      hdPath: 'm/44\'/60\'/0\'/0/',
      keepAliveTimeout: 5000,
      mnemonic: 'mimic dune forward party defy island absorb insane deputy obvious brother immense',
      chainId: 1337,
      dbPath: './.sandbox',
      snapshotPath: path.join(__dirname, 'db.tgz'),
    };
  }

  static async create (options) {
    options = { clean: true, extract: true, ...options };
    const networkOptions = {
      ...Sandbox.defaultOptions(),
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
    return new Sandbox(service, { ...options, network: networkOptions });
  }

  static async start (options) {
    const sandbox = await Sandbox.create(options);
    await sandbox.start();
    return sandbox;
  }

  constructor (service, options) {
    this.ganacheService = service;
    this.options = options || {};
    this.provider = service.provider;
    this.snapshotId = undefined;

    const { owner, ...accounts } = this._getAccounts(this.options.network);
    this.owner = owner;
    this.accounts = accounts;
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
    if (!this.snapshotId) {
      throw new Error('Snapshot not found. Most probably Sandbox has not been started.');
    }
    await this._revert(this.snapshotId);
    this.snapshotId = await this._snapshot();
  }

  async _snapshot () {
    return await new Promise((resolve, reject) => {
      this.provider.send({
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

  _getAccounts (opts) {
    const {
      mnemonic,
      hdPath,
      total_accounts: totalAccounts,
    } = opts;

    const hdKey = HDKey.fromMasterSeed(mnemonicToSeed(mnemonic, null));
    const accounts = Array(totalAccounts);
    for (let index = 0; index < totalAccounts; index++) {
      const acc = hdKey.derive(hdPath + index);
      accounts[index] = {
        privateKey: '0x' + acc.privateKey.toString('hex'),
        address: '0x' + this._uncompressedPublicKeyToAddress(acc.publicKey),
      };
    }
    return accounts;
  }

  _uncompressedPublicKeyToAddress (uncompressedPublicKey) {
    const compresedPublicKey = secp256k1
      .publicKeyConvert(uncompressedPublicKey, false)
      .slice(1);
    const hasher = createKeccakHash('keccak256');
    hasher._state.absorb(compresedPublicKey);
    return hasher.digest().slice(-20).toString('hex');
  };
}

module.exports = Sandbox;
