import fs from 'fs';
import { merge } from 'lodash';
import { NsConfig, NsNetworkConfig } from './types';

export enum NsConfigPath{
  UNS = './uns-config.json',
  ENS = './ens-config.json'
}

export function getNsConfig (nsConfigPath: NsConfigPath): NsConfig {
  const file = fs.existsSync(nsConfigPath) ? fs.readFileSync(nsConfigPath).toString() : '{}';
  return JSON.parse(file.length ? file : '{}');
}

export function getUnsNetworkConfig (chainId: number): NsNetworkConfig {
  const { networks } = getNsConfig(NsConfigPath.UNS);
  return networks[chainId];
}

export function getEnsNetworkConfig (chainId: number): NsNetworkConfig {
  const { networks } = getNsConfig(NsConfigPath.UNS);
  return networks[chainId];
}

export function mergeNsNetworkConfig (config: NsConfig, configPath: NsConfigPath) {
  const _config = merge(getNsConfig(configPath), config);
  fs.writeFileSync(configPath, `${JSON.stringify(_config, null, 4)}\n`);
}

