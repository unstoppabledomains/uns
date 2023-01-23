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
exports.getReceiptProof = exports.getFakeReceiptBytes = exports.getDiffEncodedReceipt = exports.getReceiptBytes = exports.verifyTxProof = exports.getTxProof = exports.getTxBytes = exports.squanchTx = void 0;
const merkle_patricia_tree_1 = require("merkle-patricia-tree");
const ethereumjs_util_1 = require("ethereumjs-util");
const ethereumjs_tx_1 = __importDefault(require("ethereumjs-tx"));
const ethereumjs_common_1 = __importDefault(require("ethereumjs-common"));
const header_from_rpc_1 = __importDefault(require("ethereumjs-block/header-from-rpc"));
function getRawHeader(block) {
    if (typeof block.difficulty !== 'string') {
        block.difficulty = '0x' + block.difficulty.toString(16);
    }
    return (0, header_from_rpc_1.default)(block);
}
function squanchTx(tx) {
    tx.gasPrice = '0x' + parseInt(tx.gasPrice).toString(16);
    tx.value = '0x' + parseInt(tx.value).toString(16) || '0';
    tx.gas = '0x' + parseInt(tx.gas).toString(16);
    tx.data = tx.input;
    return tx;
}
exports.squanchTx = squanchTx;
function _nibblesToTraverse(encodedPartialPath, path, pathPtr) {
    let partialPath;
    if (String(encodedPartialPath[0]) === '0' ||
        String(encodedPartialPath[0]) === '2') {
        partialPath = encodedPartialPath.slice(2);
    }
    else {
        partialPath = encodedPartialPath.slice(1);
    }
    if (partialPath === path.slice(pathPtr, pathPtr + partialPath.length)) {
        return partialPath.length;
    }
    else {
        throw new Error('path was wrong');
    }
}
function getTxBytes(tx) {
    const txObj = new ethereumjs_tx_1.default(squanchTx(tx), {
        common: ethereumjs_common_1.default.forCustomChain('mainnet', { chainId: 15001, name: 'bor' }, 'byzantium'),
    });
    return txObj.serialize();
}
exports.getTxBytes = getTxBytes;
function getTxProof(tx, block) {
    return __awaiter(this, void 0, void 0, function* () {
        const txTrie = new merkle_patricia_tree_1.BaseTrie();
        for (let i = 0; i < block.transactions.length; i++) {
            const siblingTx = block.transactions[i];
            const path = ethereumjs_util_1.rlp.encode(siblingTx.transactionIndex);
            const rawSignedSiblingTx = getTxBytes(siblingTx);
            yield txTrie.put(path, rawSignedSiblingTx);
        }
        return new Promise((resolve, reject) => {
            return txTrie.findPath(ethereumjs_util_1.rlp.encode(tx.transactionIndex)).then((path) => {
                if (path.remaining.length > 0) {
                    return reject(new Error('Node does not contain the key'));
                }
                const prf = {
                    blockHash: (0, ethereumjs_util_1.toBuffer)(tx.blockHash),
                    parentNodes: path.stack.map((s) => s.raw()),
                    root: getRawHeader(block).receiptTrie,
                    path: ethereumjs_util_1.rlp.encode(tx.transactionIndex),
                    value: ethereumjs_util_1.rlp.decode(path.node.value),
                };
                resolve(prf);
            })
                .catch(reject);
        });
    });
}
exports.getTxProof = getTxProof;
function verifyTxProof(proof) {
    const path = proof.path.toString('hex');
    const value = proof.value;
    const parentNodes = proof.parentNodes;
    const txRoot = proof.root;
    try {
        let currentNode;
        const len = parentNodes.length;
        let nodeKey = txRoot;
        let pathPtr = 0;
        for (let i = 0; i < len; i++) {
            currentNode = parentNodes[i];
            const encodedNode = (0, ethereumjs_util_1.keccak256)(ethereumjs_util_1.rlp.encode(currentNode));
            if (!nodeKey.equals(encodedNode)) {
                return false;
            }
            if (pathPtr > path.length) {
                return false;
            }
            switch (currentNode.length) {
                case 17:
                    if (pathPtr === path.length) {
                        if (currentNode[16] === ethereumjs_util_1.rlp.encode(value)) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    nodeKey = currentNode[parseInt(path[pathPtr], 16)];
                    pathPtr += 1;
                    break;
                case 2:
                    const traversed = _nibblesToTraverse(currentNode[0].toString('hex'), path, pathPtr);
                    if (traversed + pathPtr === path.length) {
                        if (currentNode[1].equals(ethereumjs_util_1.rlp.encode(value))) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    if (traversed === 0) {
                        return false;
                    }
                    pathPtr += traversed;
                    nodeKey = currentNode[1];
                    break;
                default:
                    console.log('all nodes must be length 17 or 2');
                    return false;
            }
        }
    }
    catch (e) {
        console.log(e);
        return false;
    }
    return false;
}
exports.verifyTxProof = verifyTxProof;
function getReceiptBytes(receipt) {
    return ethereumjs_util_1.rlp.encode([
        (0, ethereumjs_util_1.toBuffer)(receipt.status !== undefined && receipt.status != null
            ? receipt.status
                ? '0x1'
                : '0x'
            : receipt.root),
        (0, ethereumjs_util_1.toBuffer)(receipt.cumulativeGasUsed),
        (0, ethereumjs_util_1.toBuffer)(receipt.logsBloom),
        receipt.logs.map((l) => {
            return [
                (0, ethereumjs_util_1.toBuffer)(l.address),
                l.topics.map(ethereumjs_util_1.toBuffer),
                (0, ethereumjs_util_1.toBuffer)(l.data),
            ];
        }),
    ]);
}
exports.getReceiptBytes = getReceiptBytes;
function getDiffEncodedReceipt(receipt) {
    return ethereumjs_util_1.rlp.encode([
        (0, ethereumjs_util_1.toBuffer)(receipt.status !== undefined && receipt.status != null
            ? receipt.status
                ? 1
                : 0
            : receipt.root),
        (0, ethereumjs_util_1.toBuffer)(receipt.cumulativeGasUsed),
        (0, ethereumjs_util_1.toBuffer)(receipt.logsBloom),
        receipt.logs.map((l) => {
            if (l.data.length < 67) {
                return [
                    (0, ethereumjs_util_1.toBuffer)(l.address),
                    l.topics.map(ethereumjs_util_1.toBuffer),
                    (0, ethereumjs_util_1.toBuffer)('0x' + l.data.slice(2).replace(/^0+/, '')),
                ];
            }
            return [
                (0, ethereumjs_util_1.toBuffer)(l.address),
                l.topics.map(ethereumjs_util_1.toBuffer),
                (0, ethereumjs_util_1.toBuffer)(l.data),
            ];
        }),
    ]);
}
exports.getDiffEncodedReceipt = getDiffEncodedReceipt;
function getFakeReceiptBytes(receipt, dummyData) {
    return ethereumjs_util_1.rlp.encode([
        (0, ethereumjs_util_1.toBuffer)(receipt.status !== undefined && receipt.status != null
            ? receipt.status
                ? 1
                : 0
            : receipt.root),
        (0, ethereumjs_util_1.toBuffer)(receipt.cumulativeGasUsed),
        (0, ethereumjs_util_1.toBuffer)(receipt.logsBloom),
        receipt.logs.map((l) => {
            const hex = '0123456789abcdef';
            if (dummyData === '') {
                dummyData = '0x';
                for (let i = 0; i < l.data.length; ++i) {
                    dummyData += hex.charAt(Math.floor(Math.random() * hex.length));
                }
            }
            return [
                (0, ethereumjs_util_1.toBuffer)(l.address),
                l.topics.map(ethereumjs_util_1.toBuffer),
                (0, ethereumjs_util_1.toBuffer)(dummyData),
            ];
        }),
    ]);
}
exports.getFakeReceiptBytes = getFakeReceiptBytes;
function getReceiptProof(receipt, block, web3, receipts) {
    return __awaiter(this, void 0, void 0, function* () {
        const receiptsTrie = new merkle_patricia_tree_1.BaseTrie();
        const receiptPromises = [];
        if (!receipts && web3) {
            block.transactions.forEach((tx) => {
                receiptPromises.push(web3.eth.getTransactionReceipt(tx.hash));
            });
            receipts = yield Promise.all(receiptPromises);
        }
        for (let i = 0; i < receipts.length; i++) {
            const siblingReceipt = receipts[i];
            const path = ethereumjs_util_1.rlp.encode(siblingReceipt.transactionIndex);
            const rawReceipt = getReceiptBytes(siblingReceipt);
            yield receiptsTrie.put(path, rawReceipt);
        }
        return new Promise((resolve, reject) => {
            return receiptsTrie.findPath(ethereumjs_util_1.rlp.encode(receipt.transactionIndex)).then((path) => {
                if (path.remaining.length > 0) {
                    return reject(new Error('Node does not contain the key'));
                }
                const prf = {
                    blockHash: (0, ethereumjs_util_1.toBuffer)(receipt.blockHash),
                    parentNodes: path.stack.map((s) => s.raw()),
                    root: getRawHeader(block).receiptTrie,
                    path: ethereumjs_util_1.rlp.encode(receipt.transactionIndex),
                    value: ethereumjs_util_1.rlp.decode(path.node.value),
                };
                resolve(prf);
            })
                .catch(reject);
        });
    });
}
exports.getReceiptProof = getReceiptProof;
