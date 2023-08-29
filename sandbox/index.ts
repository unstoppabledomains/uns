import fs from 'fs';
import path from 'path';
import tar from 'tar';
import HDKey from 'hdkey';
import { mnemonicToSeedSync } from 'bip39';
import secp256k1 from 'secp256k1';
import createKeccakHash from 'keccak';
import debug from 'debug';
import { EthereumProvider } from 'ganache';
import { HttpNetworkUserConfig } from 'hardhat/types';
import { unwrap } from '../src/helpers';
import { GanacheService } from './ganache-service';

const log = debug('UNS:sandbox');

export type SandboxNetworkOptions = {
  url: string;
  port?: number;
  hostname?: string;
  chainId: number;
  hardfork: string;
  gasPrice: number;
  gasLimit: number;
  allowUnlimitedContractSize: boolean;
  locked: boolean;
  mnemonic: string;
  hdPath: string;
  totalAccounts: number;
  defaultBalanceEther: number;
  dbPath: string;
  snapshotPath: string;
  keepAliveTimeout: number;
  vmErrorsOnRpcResponse: boolean;
  logger: { log: (message: string) => void };
};

export type SandboxOptions = {
  verbose?: boolean;
  clean?: boolean;
  extract?: boolean;
  network?: Partial<SandboxNetworkOptions>;
};

export type SandboxStartOptions = {
  noSnapshot?: boolean;
};

export type SandboxAccount = {
  address: string;
  privateKey: string;
};

const DEFAULT_SERVER_CONFIG: SandboxNetworkOptions = {
  url: 'http://localhost:7545',
  gasPrice: 20000000000,
  gasLimit: 6721975,
  defaultBalanceEther: 1000,
  totalAccounts: 10,
  hardfork: 'london',
  allowUnlimitedContractSize: false,
  locked: false,
  hdPath: 'm/44\'/60\'/0\'/0/',
  keepAliveTimeout: 5000,
  mnemonic: 'mimic dune forward party defy island absorb insane deputy obvious brother immense',
  chainId: 1337,
  dbPath: './.sandbox',
  snapshotPath: path.join(__dirname, 'db.tgz'),
  vmErrorsOnRpcResponse: true,
  logger: { log: () => {} },
};

export class Sandbox {
  static defaultNetworkOptions (): HttpNetworkUserConfig {
    return {
      url: DEFAULT_SERVER_CONFIG.url,
      chainId: DEFAULT_SERVER_CONFIG.chainId,
      accounts: {
        mnemonic: DEFAULT_SERVER_CONFIG.mnemonic,
        path: DEFAULT_SERVER_CONFIG.hdPath,
        count: DEFAULT_SERVER_CONFIG.totalAccounts,
      },
    };
  }

  static async start (options: SandboxOptions = {}): Promise<Sandbox> {
    const sandbox = await Sandbox.create(options);
    await sandbox.start();
    return sandbox;
  }

  static async create (options: SandboxOptions): Promise<Sandbox> {
    options = {
      clean: true,
      extract: true,
      verbose: false,
      ...options,
    };
    const networkOptions: SandboxNetworkOptions = {
      ...DEFAULT_SERVER_CONFIG,
      ...options.network,
    };

    if (options.verbose) {
      debug.enable('UNS:sandbox*');
    }

    const { dbPath, snapshotPath } = networkOptions;

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

    const service = new GanacheService({ ...networkOptions });
    return new Sandbox(service, { ...options, network: networkOptions });
  }

  version: string;
  public accounts: Record<string, SandboxAccount>;
  public options: SandboxOptions;

  private ganacheService: GanacheService;
  private provider: EthereumProvider;
  private snapshotId?: string;

  constructor (service: GanacheService, options: SandboxOptions = {}) {
    this.ganacheService = service;
    this.options = options;
    this.provider = service.provider;
    this.snapshotId = undefined;
    this.version = '0.6';

    const accounts = this.getAccounts(unwrap(this.options, 'network'));

    this.accounts ||= {
      owner: accounts[0],
      minter: accounts[1],
      faucet: accounts[9],
    };

    accounts.forEach((account, index) => {
      this.accounts[index] = account;
    });

    log('Initialized sandbox', {
      options: this.options,
      accounts: this.accounts,
    });
  }

  async start (options: SandboxStartOptions = { noSnapshot: false }): Promise<void> {
    await this.ganacheService.startServer();
    log('Started sandbox');

    if (options.noSnapshot) return;

    this.snapshotId = await this.snapshot();
    log('Created snapshot', this.snapshotId);
  }

  async stop (): Promise<void> {
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

  async reset (): Promise<void> {
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

  private getAccounts (options: SandboxNetworkOptions): { privateKey: string; address: string }[] {
    const { mnemonic, hdPath, totalAccounts } = options;

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
    const compresedPublicKey = secp256k1.publicKeyConvert(uncompressedPublicKey, false).slice(1);

    const hasher = createKeccakHash('keccak256');

    // eslint-disable-next-line dot-notation
    hasher['_state']?.absorb(compresedPublicKey);

    return hasher.digest().subarray(-20).toString('hex');
  }
}
