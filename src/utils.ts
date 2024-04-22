import { sha3 } from 'web3-utils';
import type { ContractConfig, ContractName, DependenciesMap } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function unwrap (object: object, key: string): any {
  if (!object[key]) {
    throw new Error(`Unwrap: cannot find key ${key} on object ${object.toString()}`);
  }

  return object[key];
}

export function unwrapDependencies (dependencies: DependenciesMap, keys: ContractName[]): ContractConfig[] {
  return keys.map((key) => unwrap(dependencies, key));
}

export function notNullSha (value: string) {
  const res = sha3(value);
  if (!res) {
    throw new Error('notNullSha: SHA returns null');
  }

  return res;
}
