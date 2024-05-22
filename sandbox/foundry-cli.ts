import { exec, execSync, spawn } from 'child_process';
import path from 'path';

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
 * Executes `foundryup` to install `anvil` RPC server
 */
export async function installAnvil (): Promise<void> {
  const checkAnvilCommandCli = `${foundryAnvilBinPath()} --version`;
  if (!(await checkCommand(checkAnvilCommandCli))) {
    if (!(await runFoundryUp())) {
      throw new Error('Failed to install anvil');
    }
    if (!(await checkCommand(checkAnvilCommandCli))) {
      throw new Error('Failed to install anvil');
    }
  }
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
      resolve(code === 0);
    });
  });
}

/**
 * Runs foundryup via subprocess
 */
async function runFoundryUp (): Promise<boolean> {
  return new Promise((resolve) => {
    execSync(`chmod +x ${foundryUpBinPath()}`);
    const p = spawn('/bin/bash', ['-c', foundryUpBinPath()], {
      stdio: 'inherit',
      env: {
        ...process.env,
        FOUNDRY_DIR: foundryDir(),
      },
    });
    p.on('exit', (code) => {
      resolve(code === 0);
    });
  });
}

/**
 * @returns the path to the foundry directory
 */
function foundryDir (): string {
  return path.join(__dirname, 'foundry');
}

/**
 * @returns the path to the foundry bin directory
 */
function foundryBinDir (): string {
  return path.join(foundryDir(), 'bin');
}

/**
 * @returns the path to the anvil binary in the foundry dir
 */
function foundryAnvilBinPath (): string {
  return path.join(foundryBinDir(), 'anvil');
}

/**
 * @returns the path to the cast binary in the foundry dir
 */
function foundryUpBinPath (): string {
  return path.join(foundryDir(), 'foundryup.sh');
}
