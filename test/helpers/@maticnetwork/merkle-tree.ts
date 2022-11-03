import { zeros, keccak256 } from 'ethereumjs-util';

const sha3 = keccak256;

export default class MerkleTree {
  leaves: Buffer[];
  layers: Buffer[][];

  constructor (leaves: Buffer[]) {
    if (leaves.length < 1) {
      throw new Error('Atleast 1 leaf needed');
    }

    const depth = Math.ceil(Math.log(leaves.length) / Math.log(2));
    if (depth > 20) {
      throw new Error('Depth must be 20 or less');
    }

    const l = leaves.concat(
      Array.from(Array(Math.pow(2, depth) - leaves.length), () => zeros(32)),
    );

    this.leaves = l;
    this.layers = [l];
    this.createHashes(this.leaves);
  }

  createHashes (nodes: Buffer[]): void | false {
    if (nodes.length === 1) {
      return false;
    }

    const treeLevel: Buffer[] = [];
    for (let i = 0; i < nodes.length; i += 2) {
      const left = nodes[i];
      const right = nodes[i + 1];
      const data = Buffer.concat([left, right]);
      treeLevel.push(sha3(data));
    }

    // is odd number of nodes
    if (nodes.length % 2 === 1) {
      treeLevel.push(nodes[nodes.length - 1]);
    }

    this.layers.push(treeLevel);
    this.createHashes(treeLevel);
  }

  getLeaves (): Buffer[] {
    return this.leaves;
  }

  getLayers (): Buffer[][] {
    return this.layers;
  }

  getRoot (): Buffer {
    return this.layers[this.layers.length - 1][0];
  }

  getProof (leaf: Buffer): Buffer[] {
    let index = -1;
    for (let i = 0; i < this.leaves.length; i++) {

      if (Buffer.compare(leaf, this.leaves[i]) === 0) {
        index = i;
      }
    }

    const proof: Buffer[] = [];

    if (index <= this.getLeaves().length) {
      let siblingIndex: number;

      for (let i = 0; i < this.layers.length - 1; i++) {
        if (index % 2 === 0) {
          siblingIndex = index + 1;
        } else {
          siblingIndex = index - 1;
        }

        index = parseInt((index / 2).toString());
        proof.push(this.layers[i][siblingIndex]);
      }
    }
    return proof;
  }

  verify (value: Buffer, index: number, root: Buffer, proof: Buffer[]): boolean {
    if (!Array.isArray(proof) || !value || !root) {
      return false;
    }

    let hash = value;
    for (let i = 0; i < proof.length; i++) {
      const node = proof[i];
      if (index % 2 === 0) {
        hash = sha3(Buffer.concat([hash, node]));
      } else {
        hash = sha3(Buffer.concat([node, hash]));
      }

      index = parseInt((index / 2).toString());
    }

    return Buffer.compare(hash, root) === 0;
  }
}
