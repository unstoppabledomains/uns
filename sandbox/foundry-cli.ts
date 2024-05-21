import { exec, spawn } from 'child_process';
import os from 'os';
import path from 'path';

const FOUNDRYUP_INSTALLER = 'curl -L "https://foundry.paradigm.xyz" | bash';

/**
 * @returns the path to the anvil path to use, if `anvil` is in path then this will be returned
 *
 */
export async function getAnvilCommand (): Promise<string> {
  const cmd = foundryAnvilBinPath();
  const commandExists = await checkCommand(`${cmd} --version`);
  if (!commandExists) {
    throw new Error('Anvil not found');
  }
  return cmd;
}

/**
 * Executes `foundryup`
 */
export async function installFoundry (): Promise<boolean> {
  const foundryUpPath = foundryUpBinPath();
  const checkCommandCli = `${foundryUpPath} --version`;
  const commandExists = await checkCommand(checkCommandCli);
  if (!commandExists) {
    if (!(await runFoundryInstaller())) {
      throw new Error('Failed to install Foundry');
    }
  }
  return checkCommand(checkCommandCli);
}

/**
 * Executes the given command
 *
 * @param cmd the command to run
 * @return returns true if the command succeeded, false otherwise
 */
async function checkCommand (cmd: string): Promise<boolean> {
  return new Promise((resolve) => {
    const process = exec(cmd);
    process.on('exit', (code) => {
      if (code !== 0) {
        console.error(
          'Command failed. Is Foundry not installed? Consider installing ' +
          'via `curl -L https://foundry.paradigm.xyz | bash` and then running' +
          ' `foundryup` on a new terminal. ' +
          'For more context, check the installation instructions ' +
          'in the book: https://book.getfoundry.sh/getting-started/installation.html.',
        );
      }
      resolve(code === 0);
    });
  });
}

/**
 * Installs foundryup via subprocess
 */
async function runFoundryInstaller (): Promise<boolean> {
  return new Promise((resolve) => {
    const process = spawn('/bin/bash', ['-c', FOUNDRYUP_INSTALLER], {
      stdio: 'inherit',
    });
    process.on('exit', (code) => {
      resolve(code === 0);
    });
  });
}

/**
 * @returns the path to the foundry directory: `$HOME/.foundry`
 */
function foundryDir (): string {
  return path.join(os.homedir(), '.foundry');
}

/**
 * @returns the path to the foundry directory that stores the tool binaries: `$HOME/.foundry/bin`
 */
function foundryBinDir (): string {
  return path.join(foundryDir(), 'bin');
}

/**
 * @returns the path to the anvil binary in the foundry dir: `$HOME/.foundry/bin/anvil`
 */
function foundryAnvilBinPath (): string {
  return path.join(foundryBinDir(), 'anvil');
}

/**
 * @returns the path to the cast binary in the foundry dir: `$HOME/.foundry/bin/cast`
 */
function foundryUpBinPath (): string {
  return path.join(foundryBinDir(), 'foundryup');
}
