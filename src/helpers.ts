import { ArtifactName, DependenciesMap, UnsContractConfig } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function unwrap (object: object, key: string): any {
  if (!object[key]) {
    throw new Error(`Unwrap: cannot find key ${key} on object ${object.toString()}`);
  }

  return object[key];
}

export function unwrapDependencies (dependencies: DependenciesMap, keys: ArtifactName[]): UnsContractConfig[] {
  return keys.map((key) => unwrap(dependencies, key));
}
