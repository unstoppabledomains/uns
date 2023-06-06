import { ArtifactName, DependenciesMap, ContractConfig } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function unwrap (object: object, key: string): any {
  if (!object[key]) {
    throw new Error(`Unwrap: cannot find key ${key} on object ${object.toString()}`);
  }

  return object[key];
}

export function unwrapDependencies (dependencies: DependenciesMap, keys: ArtifactName[]): ContractConfig[] {
  return keys.map((key) => unwrap(dependencies, key));
}
