"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitCheckpoint = exports.build = void 0;
const assert_1 = __importDefault(require("assert"));
const ethereumjs_util_1 = require("ethereumjs-util");
const merkle_tree_1 = __importDefault(require("./merkle-tree"));
const proofs_1 = require("./proofs");
const blocks_1 = require("./blocks");
const contracts_1 = require("./contracts");
let headerNumber = 0;
function build(event) {
    return __awaiter(this, void 0, void 0, function* () {
        const blockHeader = (0, blocks_1.getBlockHeader)(event.block);
        const tree = new merkle_tree_1.default([blockHeader]);
        const receiptProof = yield (0, proofs_1.getReceiptProof)(event.receipt, event.block, null, [event.receipt]);
        const txProof = yield (0, proofs_1.getTxProof)(event.tx, event.block);
        assert_1.default.ok((0, proofs_1.verifyTxProof)(receiptProof), 'verify receipt proof failed in js');
        headerNumber += 1;
        return {
            header: {
                number: headerNumber,
                root: tree.getRoot(),
                start: event.receipt.blockNumber,
            },
            receipt: (0, proofs_1.getReceiptBytes)(event.receipt),
            receiptParentNodes: receiptProof.parentNodes,
            tx: (0, proofs_1.getTxBytes)(event.tx),
            txParentNodes: txProof.parentNodes,
            path: Buffer.concat([Buffer.from('00', 'hex'), receiptProof.path]),
            number: event.receipt.blockNumber,
            timestamp: event.block.timestamp,
            transactionsRoot: Buffer.from(event.block.transactionsRoot.slice(2), 'hex'),
            receiptsRoot: Buffer.from(event.block.receiptsRoot.slice(2), 'hex'),
            proof: tree.getProof(blockHeader),
        };
    });
}
exports.build = build;
function submitCheckpoint(checkpointManager, txnHash) {
    return __awaiter(this, void 0, void 0, function* () {
        const tx = yield contracts_1.childWeb3.eth.getTransaction(txnHash);
        const receipt = yield contracts_1.childWeb3.eth.getTransactionReceipt(txnHash);
        const block = yield contracts_1.childWeb3.eth.getBlock(receipt.blockHash, true);
        const event = {
            tx,
            receipt,
            block,
        };
        const checkpointData = yield build(event);
        const root = (0, ethereumjs_util_1.bufferToHex)(checkpointData.header.root);
        const setCheckPointTxReceipt = yield checkpointManager.methods.setCheckpoint(root, block.number, block.number).send();
        const setCheckPointTx = yield contracts_1.childWeb3.eth.getTransaction(setCheckPointTxReceipt.transactionHash);
        return { checkpointData, setCheckPointTx };
    });
}
exports.submitCheckpoint = submitCheckpoint;
