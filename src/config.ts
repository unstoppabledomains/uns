import fs from 'fs';
import {merge} from 'lodash';

const configPath = './uns-config.json';

export function readNetworkConfig () {
  const file = fs.existsSync(configPath) ? fs.readFileSync(configPath).toString() : '{}';
  return JSON.parse(file.length ? file : '{}');
}

export function mergeNetworkConfig (config) {
  const _config = merge(readNetworkConfig(), config);
  fs.writeFileSync(configPath, `${JSON.stringify(_config, null, 4)}\n`);
}
