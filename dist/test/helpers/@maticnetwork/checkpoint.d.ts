/// <reference types="node" />
import { TransactionReceipt, Transaction, BlockTransactionObject } from 'web3-eth';
export declare function build(event: {
    tx: Transaction;
    block: BlockTransactionObject;
    receipt: TransactionReceipt;
}): Promise<{
    header: {
        number: number;
        root: Buffer;
        start: number;
    };
    receipt: Buffer;
    receiptParentNodes: any;
    tx: any;
    txParentNodes: any;
    path: Buffer;
    number: number;
    timestamp: string | number;
    transactionsRoot: Buffer;
    receiptsRoot: Buffer;
    proof: Buffer[];
}>;
export declare function submitCheckpoint(checkpointManager: any, txnHash: string): Promise<{
    checkpointData: {
        header: {
            number: number;
            root: Buffer;
            start: number;
        };
        receipt: Buffer;
        receiptParentNodes: any;
        tx: any;
        txParentNodes: any;
        path: Buffer;
        number: number;
        timestamp: string | number;
        transactionsRoot: Buffer;
        receiptsRoot: Buffer;
        proof: Buffer[];
    };
    setCheckPointTx: Transaction;
}>;
//# sourceMappingURL=checkpoint.d.ts.map