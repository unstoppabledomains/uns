/// <reference types="node" />
import { BigNumberish, Contract, ContractReceipt, ContractTransaction } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { SimpleCheckpointManager } from '../../types/contracts/@maticnetwork/pos-portal/SimpleCheckpointManager.sol';
export declare const buildPredicateExitInput: (withdrawer: string, receiver: string, tokenId: BigNumberish) => Promise<string>;
export declare const writeCheckpoint: (contract: Contract, admin: SignerWithAddress, txn: ContractTransaction) => Promise<{
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
    setCheckPointTx: import("web3-eth").Transaction;
}>;
export declare const buildExitInput: (checkpointManager: SimpleCheckpointManager, receipt: ContractReceipt, checkpointData: any) => Promise<string>;
//# sourceMappingURL=polygon.d.ts.map