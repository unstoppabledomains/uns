/// <reference types="node" />
import Web3 from 'web3';
import { BlockTransactionString, BlockTransactionObject } from 'web3-eth';
export declare function getHeaders(start: number, end: number, web3: Web3): Promise<Buffer[]>;
export declare function getBlockHeader(block: BlockTransactionString | BlockTransactionObject): Buffer;
//# sourceMappingURL=blocks.d.ts.map