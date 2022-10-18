import fs from 'fs';
import tar from 'tar';
import path from 'path';
import HDKey from 'hdkey';
import { mnemonicToSeedSync } from 'bip39';
import secp256k1 from 'secp256k1';
import createKeccakHash from 'keccak';
import debug from 'debug';
import {
  ServerOptions,
  EthereumProvider,
} from 'ganache';
import { GanacheService } from './ganache-service';
import { HttpNetworkUserConfig, NetworkUserConfig } from 'hardhat/types';

const log = debug('UNS:sandbox');

export const GANACHE_SERVER_CONFIG: ServerOptions<'ethereum'> = {
  chain: {
    chainId: 1337,
    hardfork: 'istanbul',
    allowUnlimitedContractSize: false,
    vmErrorsOnRPCResponse: true,
  },
  miner: {
    defaultGasPrice: 20000000000,
    blockGasLimit: 6721975,
  },
  wallet: {
    totalAccounts: 10,
    mnemonic: 'mimic dune forward party defy island absorb insane deputy obvious brother immense',
    defaultBalance: 1000,
    hdPath: 'm/44\'/60\'/0\'/0',
  },
  database: {
    dbPath: './.sandbox',
  },
  logging: {
    verbose: false,
    logger: { log: () => {} },
  },
}

export type SandboxOptions = {
  verbose?: boolean;
  clean?: boolean
  extract?: boolean
}

export type SandboxStartOptions = {
  noSnapshot?: boolean
}

export type SandboxAccount = {
  address: string;
  privateKey: string;
}

export class Sandbox {
  static defaultNetworkOptions(): HttpNetworkUserConfig {
    return {
      url: 'http://localhost:7545',
      chainId: 1337,
      accounts: {
        mnemonic: GANACHE_SERVER_CONFIG['wallet'].mnemonic,
        path: GANACHE_SERVER_CONFIG['wallet'].hdPath,
        count: GANACHE_SERVER_CONFIG['wallet'].totalAccounts,
      }
    }
  }

  static async start (options: SandboxOptions): Promise<Sandbox> {
    const sandbox = await Sandbox.create(options);
    await sandbox.start();
    return sandbox;
  }

  static snapshotPath(): string {
    return path.join(__dirname, 'db.tgz');
  }

  static async create (options: SandboxOptions) {
    options = {
      clean: true,
      extract: true,
      verbose: false,
      ...options
    };

    if (options.verbose) {
      debug.enable('UNS:sandbox*');
    }

    const { dbPath } = GANACHE_SERVER_CONFIG['database'];
    const snapshotPath = this.snapshotPath();

    if (options.clean) {
      if (fs.existsSync(dbPath)) {
        fs.rmdirSync(dbPath, { recursive: true });
      }
      fs.mkdirSync(dbPath, { recursive: true });
      log(`Cleaned sandbox database. Path: ${dbPath}`);
    }

    if (options.extract) {
      await tar.extract({ cwd: dbPath, file: snapshotPath });
      log(`Prepared sandbox database. [Source: ${snapshotPath}, TargetDir: ${dbPath}]`);
    }

    const service = new GanacheService(GANACHE_SERVER_CONFIG, {
      url: this.defaultNetworkOptions().url
    });
    return new Sandbox(service, options);
  }

  ganacheService: GanacheService;
  options: SandboxOptions;
  provider: EthereumProvider;
  private _snapshotId: string;
  version: string;

  accounts: Map<any, SandboxAccount>;

  constructor (service: GanacheService, options: SandboxOptions = {}) {
    this.ganacheService = service
    this.options = options;
    this.provider = service.provider;
    this._snapshotId = undefined;
    this.version = '0.5';

    const accounts = this._getAccounts(GANACHE_SERVER_CONFIG);

    this.accounts ||= new Map<any, SandboxAccount>([
      ['owner', accounts[0]],
      ['minter', accounts[1]],
      ['faucet', accounts[9]],
    ]);

    accounts.forEach((account, index) => {
      this.accounts[index] = account;
    });

    log('Initialized sandbox', {
      options: this.options,
      accounts: this.accounts,
    });
  }

  async start (options: SandboxStartOptions = { noSnapshot: false }) {
    await this.ganacheService.startServer();
    log('Started sandbox');

    if (options.noSnapshot) return;

    this._snapshotId = await this._snapshot();
    log('Created snapshot', this._snapshotId);
  }

  async stop () {
    try {
      await this.ganacheService.stopServer();
      log('Stopped sandbox');
    } catch (e: any) {
      if (e.message.includes('Server is not running')) {
        // GanacheService.error = undefined;
        return;
      }
      throw e;
    }
  }

  async reset () {
    if (!this._snapshotId) {
      throw new Error('Snapshot not found. Most probably Sandbox has not been started.');
    }

    await this._revert(this._snapshotId);
    log('Reverted snapshot', this._snapshotId);

    this._snapshotId = await this._snapshot();
    log('Created snapshot', this._snapshotId);
  }

  async _snapshot () {
    return await this.provider.send('evm_snapshot');
  }

  async _revert (snapshotId: string) {
    return await this.provider.send('evm_revert', [snapshotId]);
  }

  _getAccounts (serverOptions: ServerOptions<'ethereum'>) {
    const { mnemonic, hdPath, totalAccounts } = serverOptions['wallet'];

    const hdKey = HDKey.fromMasterSeed(mnemonicToSeedSync(mnemonic, null));
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

  _uncompressedPublicKeyToAddress (uncompressedPublicKey: Buffer) {
    const compresedPublicKey = secp256k1
      .publicKeyConvert(uncompressedPublicKey, false)
      .slice(1);

    const hasher = createKeccakHash('keccak256');

    hasher['_state']?.absorb(compresedPublicKey);

    return hasher.digest().subarray(-20).toString('hex');
  };
}
