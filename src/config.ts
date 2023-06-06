import fs from 'fs';
import { merge } from 'lodash';
import { UnsConfig, NsNetworkConfig } from './types';

const unsConfigPath = './uns-config.json';
const ensConfigPath = './ens-config.json';

export function getUnsConfig (): UnsConfig {
  const file = fs.existsSync(unsConfigPath) ? fs.readFileSync(unsConfigPath).toString() : '{}';
  return JSON.parse(file.length ? file : '{}');
}

export function getUnsNetworkConfig (chainId: number): NsNetworkConfig {
  const { networks } = getUnsConfig();
  return networks[chainId];
}

export function getEnsNetworkConfig (chainId: number): NsNetworkConfig {
  const { networks } = getEnsConfig();
  return networks[chainId];
}

export function mergeUnsNetworkConfig (config: UnsConfig) {
  const _config = merge(getUnsConfig(), config);
  fs.writeFileSync(unsConfigPath, `${JSON.stringify(_config, null, 4)}\n`);
}

export function getEnsConfig (): UnsConfig {
  const file = fs.existsSync(ensConfigPath) ? fs.readFileSync(ensConfigPath).toString() : '{}';
  return JSON.parse(file.length ? file : '{}');
}

export function mergeEnsNetworkConfig (config: UnsConfig) {
  const _config = merge(getEnsConfig(), config);
  fs.writeFileSync(ensConfigPath, `${JSON.stringify(_config, null, 4)}\n`);
}

