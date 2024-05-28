import path from 'path';
import fs from 'fs';
import HDKey from 'hdkey';
import { mnemonicToSeedSync } from 'bip39';
import secp256k1 from 'secp256k1';
import createKeccakHash from 'keccak';
import debug from 'debug';
import type { HttpNetworkUserConfig } from 'hardhat/types';
import { JsonRpcProvider } from 'ethers';
import { unwrap } from '../src/utils';
import { AnvilServerOptions } from './anvil-server';
import AnvilService from './anvil-service';

const log = debug('UNS:sandbox');

export type SandboxNetworkOptions = {
  port: number;
  hostIpAddress: string;
  chainId: number;
  hardfork: string;
  gasPrice: number;
  gasLimit: number;
  mnemonic: string;
  hdPath: string;
  totalAccounts: number;
  defaultBalanceEther: number;
  statePath: string;
};

export type SandboxOptions = {
  verbose?: boolean;
  rebuild?: boolean;
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
  hostIpAddress: '127.0.0.1',
  port: 7545,
  gasPrice: 20000000000,
  gasLimit: 6721975,
  defaultBalanceEther: 1000,
  totalAccounts: 10,
  hardfork: 'cancun',
  hdPath: 'm/44\'/60\'/0\'/0/',
  mnemonic: 'mimic dune forward party defy island absorb insane deputy obvious brother immense',
  chainId: 1337,
  statePath: path.join(__dirname, 'state.json'),
};

export class Sandbox {
  version: string;
  public accounts: Record<string, SandboxAccount>;
  public options: SandboxOptions;

  private anvilService: AnvilService;
  private provider: JsonRpcProvider;
  private snapshotId?: string;

  static defaultNetworkOptions (): HttpNetworkUserConfig {
    return {
      url: `http://${DEFAULT_SERVER_CONFIG.hostIpAddress}:${DEFAULT_SERVER_CONFIG.port}`,
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
      rebuild: false,
      verbose: false,
      ...options,
    };

    const networkOptions: SandboxNetworkOptions = {
      ...DEFAULT_SERVER_CONFIG,
      ...options.network,
    };

    const anvilOptions: Partial<AnvilServerOptions> = {
      ...networkOptions,
    };

    if (options.verbose) {
      debug.enable('UNS:sandbox*');
      anvilOptions.silent = false;
    } else {
      anvilOptions.silent = true;
    }

    if (options.rebuild) {
      if (fs.existsSync(networkOptions.statePath)) {
        fs.rmSync(networkOptions.statePath);
      }
      anvilOptions.dumpStatePath = networkOptions.statePath;
      anvilOptions.loadStatePath = '';
    } else {
      anvilOptions.dumpStatePath = '';
      anvilOptions.loadStatePath = networkOptions.statePath;
    }

    const service = new AnvilService(anvilOptions);
    return new Sandbox(service, { ...options, network: networkOptions });
  }

  constructor (service: AnvilService, options: SandboxOptions = {}) {
    this.anvilService = service;
    this.options = options;
    this.provider = this.anvilService.provider;
    this.snapshotId = undefined;
    this.version = '1.0';

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
    await this.anvilService.startServer();
    log('Started sandbox');

    if (options.noSnapshot) return;

    this.snapshotId = await this.snapshot();
    log('Created snapshot', this.snapshotId);
  }

  stop (): void {
    try {
      this.anvilService.stopServer();
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
    return await this.provider.send('evm_snapshot', []);
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
