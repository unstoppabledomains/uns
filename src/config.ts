import fs from 'fs';
import {merge} from 'lodash';
import { UnsConfig } from './types';

const configPath = './uns-config.json';

export function readNetworkConfig(): UnsConfig {
  const file = fs.existsSync(configPath) ? fs.readFileSync(configPath).toString() : '{}';
  return JSON.parse(file.length ? file : '{}');
}

export function mergeNetworkConfig (config: UnsConfig) {
  const _config = merge(readNetworkConfig(), config);
  fs.writeFileSync(configPath, `${JSON.stringify(_config, null, 4)}\n`);
}
