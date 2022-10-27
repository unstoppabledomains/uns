import { keccak256, BN, toBuffer } from 'ethereumjs-util';
// import { Buffer } from 'safe-buffer';
import Web3 from 'web3';
import {BlockTransactionString, BlockTransactionObject} from 'web3-eth';

const sha3 = keccak256;

export async function getHeaders (start: number, end: number, web3: Web3) {
  if (start >= end) {
    return [];
  }

  let current = start;
  let p: Promise<BlockTransactionString>[] = [];
  const result: BlockTransactionString[] = [];
  while (current <= end) {
    p = [];

    for (let i = 0; i < 10 && current <= end; i++) {
      p.push(web3.eth.getBlock(current));
      current++;
    }

    if (p.length > 0) {
      result.push(...(await Promise.all(p)));
    }
  }

  return result.map(getBlockHeader);
}

export function getBlockHeader (block: BlockTransactionString | BlockTransactionObject) {
  const n = new BN(block.number).toArrayLike(Buffer, 'be', 32);
  const ts = new BN(block.timestamp).toArrayLike(Buffer, 'be', 32);
  const txRoot = toBuffer(block.transactionsRoot);
  const receiptsRoot = toBuffer(block.receiptsRoot);
  return sha3(Buffer.concat([n, ts, txRoot, receiptsRoot]));
}
