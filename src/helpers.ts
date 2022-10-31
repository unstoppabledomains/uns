import { ArtifactName, DependenciesMap, UnsContractConfig } from './types';

export function unwrap (object: object, key: string): any { // eslint-disable-line @typescript-eslint/no-explicit-any
  if(!object[key]) {
    throw new Error(`Unwrap: cannot find key ${key} on object ${object.toString()}`);
  }

  return object[key];
}

export function unwrapDependencies (dependencies: DependenciesMap, keys: ArtifactName[]): UnsContractConfig[] {
  return keys.map(key => unwrap(dependencies, key));
}
