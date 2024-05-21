import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import debug from 'debug';
import _ from 'lodash';
import { installFoundry, getAnvilCommand } from './foundry-cli';

const log = debug('UNS:sandbox');

export type AnvilServerOptions = {
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
  dumpStatePath: string;
  loadStatePath: string;
  silent: boolean;
  anvilCliPath: string;
};

const ANVIL_ARGUMENTS_MAP: Record<Exclude<keyof AnvilServerOptions, 'anvilCliPath'>, string> = {
  port: '--port',
  hostIpAddress: '--host',
  chainId: '--chain-id',
  hardfork: '--hardfork',
  gasPrice: '--gas-price',
  gasLimit: '--gas-limit',
  mnemonic: '--mnemonic',
  hdPath: '--derivation-path',
  totalAccounts: '--accounts',
  defaultBalanceEther: '--balance',
  dumpStatePath: '--dump-state',
  loadStatePath: '--load-state',
  silent: '--silent',
};

export class AnvilServer {
  readonly options: Partial<AnvilServerOptions>;
  private readonly _anvil: ChildProcessWithoutNullStreams;

  private constructor (anvil: ChildProcessWithoutNullStreams, options: Partial<AnvilServerOptions>) {
    this._anvil = anvil;
    this.options = options;
  }

  public static async launch (options: Partial<AnvilServerOptions>, inherit = false): Promise<AnvilServer> {
    try {
      await getAnvilCommand();
    } catch (e) {
      if (!(await installFoundry())) {
        throw new Error('Failed to install Foundry');
      }
    }

    if (!options.silent) {
      log('Launching anvil');
    }
    const anvilPath = options.anvilCliPath ?? (await getAnvilCommand());
    const args: (string | number)[] = [];
    for (const [key, value] of Object.entries(options)) {
      if (!value) {
        continue;
      }
      const arg = ANVIL_ARGUMENTS_MAP[key];
      if (arg) {
        if (_.isBoolean(value) && value) {
          args.push(arg);
        } else {
          args.push(arg, value);
        }
      }
    }

    const opts = inherit ? { stdio: 'inherit' } : {};

    const anvil: ChildProcessWithoutNullStreams = spawn(anvilPath, args as never, opts as never);

    anvil.on('close', (code: any) => {
      log(`anvil child process exited with code ${code}`);
    });

    process.on('exit', function () {
      anvil.kill();
    });

    if (!inherit) {
      let serverReady = false;
      anvil.stdout?.on('data', (data: any) => {
        const output = data.toString();
        if (output.includes('Listening')) {
          serverReady = true;
        }
        if (!options.silent) {
          log(`${data}`);
        }
      });

      anvil.stderr?.on('data', (data: any) => {
        log(`${data}`);
      });

      // wait until server ready
      const retries = 30; // 3secs
      for (let i = 0; i < retries; i++) {
        if (serverReady) {
          if (!options.silent) {
            log('anvil server ready');
          }
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    return new AnvilServer(anvil, options);
  }

  public kill () {
    this._anvil?.kill();
  }
}
