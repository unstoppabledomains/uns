import fs from 'fs';
import { merge } from 'lodash';
import { NsConfig, NsNetworkConfig } from './types';

export enum NameService {
  UNS = 'UNS',
  ENS = 'ENS',
}

const configPathMap: Record<NameService, string> = {
  UNS: './uns-config.json',
  ENS: './ens-config.json',
};

export function getConfig (nameService = NameService.UNS): NsConfig {
  const path = configPathMap[nameService];
  const file = fs.existsSync(path) ? fs.readFileSync(path).toString() : '{}';
  return JSON.parse(file.length ? file : '{}');
}

export function getNetworkConfig (chainId: number, nameService = NameService.UNS): NsNetworkConfig {
  const { networks } = getConfig(nameService);
  return networks[chainId];
}

export function mergeNetworkConfig (config: NsConfig, nameService = NameService.UNS) {
  const _config = merge(getConfig(nameService), config);
  fs.writeFileSync(configPathMap[nameService], `${JSON.stringify(_config, null, 4)}\n`);
}
