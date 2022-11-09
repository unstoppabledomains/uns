import fs from 'fs';
import { merge } from 'lodash';
import { UnsConfig, UnsNetworkConfig } from './types';

const configPath = './uns-config.json';

export function getConfig (): UnsConfig {
  const file = fs.existsSync(configPath) ? fs.readFileSync(configPath).toString() : '{}';
  return JSON.parse(file.length ? file : '{}');
}

export function getNetworkConfig (chainId: number): UnsNetworkConfig {
  const { networks } = getConfig();
  return networks[chainId];
}

export function mergeNetworkConfig (config: UnsConfig) {
  const _config = merge(getConfig(), config);
  fs.writeFileSync(configPath, `${JSON.stringify(_config, null, 4)}\n`);
}
