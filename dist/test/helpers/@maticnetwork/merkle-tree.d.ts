/// <reference types="node" />
export default class MerkleTree {
    leaves: Buffer[];
    layers: Buffer[][];
    constructor(leaves: Buffer[]);
    createHashes(nodes: Buffer[]): void | false;
    getLeaves(): Buffer[];
    getLayers(): Buffer[][];
    getRoot(): Buffer;
    getProof(leaf: Buffer): Buffer[];
    verify(value: Buffer, index: number, root: Buffer, proof: Buffer[]): boolean;
}
//# sourceMappingURL=merkle-tree.d.ts.map