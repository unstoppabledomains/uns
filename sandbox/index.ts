import fs from 'fs';
import path from 'path';
import tar from 'tar';
import HDKey from 'hdkey';
import { mnemonicToSeedSync } from 'bip39';
import secp256k1 from 'secp256k1';
import createKeccakHash from 'keccak';
import debug from 'debug';
import {
  EthereumProvider,
  ProviderOptions,
} from 'ganache';
import { HttpNetworkUserConfig } from 'hardhat/types';
import { unwrap } from '../src/helpers';
import { GanacheService } from './ganache-service';

const log = debug('UNS:sandbox');

export const GANACHE_SERVER_CONFIG = {
  chain: {
    chainId: 1337,
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
};

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
  static defaultNetworkOptions (): HttpNetworkUserConfig {
    return {
      url: 'http://localhost:7545',
      chainId: 1337,
      accounts: {
        mnemonic: GANACHE_SERVER_CONFIG.wallet.mnemonic,
        path: GANACHE_SERVER_CONFIG.wallet.hdPath,
        count: GANACHE_SERVER_CONFIG.wallet.totalAccounts,
      },
    };
  }

  static async start (options: SandboxOptions): Promise<Sandbox> {
    const sandbox = await Sandbox.create(options);
    await sandbox.start();
    return sandbox;
  }

  static snapshotPath (): string {
    return path.join(__dirname, 'db.tgz');
  }

  static async create (options: SandboxOptions): Promise<Sandbox> {
    options = {
      clean: true,
      extract: true,
      verbose: false,
      ...options,
    };

    if (options.verbose) {
      debug.enable('UNS:sandbox*');
    }

    const { dbPath } = GANACHE_SERVER_CONFIG.database;
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

    const service = new GanacheService(GANACHE_SERVER_CONFIG as ProviderOptions<'ethereum'>, {
      url: unwrap(this.defaultNetworkOptions(), 'url'),
    });
    return new Sandbox(service, options);
  }

  version: string;

  private ganacheService: GanacheService;
  private options: SandboxOptions;
  private provider: EthereumProvider;
  private snapshotId?: string;
  private accounts: Map<string, SandboxAccount>;

  constructor (service: GanacheService, options: SandboxOptions = {}) {
    this.ganacheService = service;
    this.options = options;
    this.provider = service.provider;
    this.snapshotId = undefined;
    this.version = '0.5';

    const accounts = this.getAccounts();

    this.accounts ||= new Map<string, SandboxAccount>([
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

    this.snapshotId = await this.snapshot();
    log('Created snapshot', this.snapshotId);
  }

  async stop () {
    try {
      await this.ganacheService.stopServer();
      log('Stopped sandbox');
    } catch (e: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      if (e.message.includes('Server is not running')) {
        return;
      }
      throw e;
    }
  }

  async reset () {
    if (!this.snapshotId) {
      throw new Error('Snapshot not found. Most probably Sandbox has not been started.');
    }

    await this.revert(this.snapshotId);
    log('Reverted snapshot', this.snapshotId);

    this.snapshotId = await this.snapshot();
    log('Created snapshot', this.snapshotId);
  }

  private async snapshot (): Promise<string> {
    return await this.provider.send('evm_snapshot');
  }

  private async revert (snapshotId: string): Promise<boolean> {
    return await this.provider.send('evm_revert', [snapshotId]);
  }

  private getAccounts (): {privateKey: string, address: string}[] {
    const { mnemonic, hdPath, totalAccounts } = GANACHE_SERVER_CONFIG.wallet;

    const hdKey = HDKey.fromMasterSeed(mnemonicToSeedSync(mnemonic));
    const accounts = Array(totalAccounts);

    for (let index = 0; index < totalAccounts; index++) {
      const acc = hdKey.derive(hdPath + index);

      accounts[index] = {
        privateKey: '0x' + acc.privateKey.toString('hex'),
        address: '0x' + this.uncompressedPublicKeyToAddress(acc.publicKey),
      };
    }

    return accounts;
  }

  private uncompressedPublicKeyToAddress (uncompressedPublicKey: Buffer) {
    const compresedPublicKey = secp256k1
      .publicKeyConvert(uncompressedPublicKey, false)
      .slice(1);

    const hasher = createKeccakHash('keccak256');

    // eslint-disable-next-line dot-notation
    hasher['_state']?.absorb(compresedPublicKey);

    return hasher.digest().subarray(-20).toString('hex');
  }
}
