/// <reference types="node" />
import Transaction from 'ethereumjs-tx';
import { TransactionReceipt, BlockTransactionObject } from 'web3-eth';
import Web3 from 'web3';
export declare function squanchTx(tx: any): any;
export declare function getTxBytes(tx: any): any;
export declare function getTxProof(tx: Transaction, block: BlockTransactionObject): Promise<unknown>;
export declare function verifyTxProof(proof: any): boolean;
export declare function getReceiptBytes(receipt: any): Buffer;
export declare function getDiffEncodedReceipt(receipt: any): Buffer;
export declare function getFakeReceiptBytes(receipt: any, dummyData: any): Buffer;
export declare function getReceiptProof(receipt: TransactionReceipt, block: BlockTransactionObject, web3: Web3 | null, receipts: TransactionReceipt[]): Promise<unknown>;
//# sourceMappingURL=proofs.d.ts.map