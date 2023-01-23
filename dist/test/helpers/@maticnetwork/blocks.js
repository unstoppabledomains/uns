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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockHeader = exports.getHeaders = void 0;
const ethereumjs_util_1 = require("ethereumjs-util");
const sha3 = ethereumjs_util_1.keccak256;
function getHeaders(start, end, web3) {
    return __awaiter(this, void 0, void 0, function* () {
        if (start >= end) {
            return [];
        }
        let current = start;
        let p = [];
        const result = [];
        while (current <= end) {
            p = [];
            for (let i = 0; i < 10 && current <= end; i++) {
                p.push(web3.eth.getBlock(current));
                current++;
            }
            if (p.length > 0) {
                result.push(...(yield Promise.all(p)));
            }
        }
        return result.map(getBlockHeader);
    });
}
exports.getHeaders = getHeaders;
function getBlockHeader(block) {
    const n = new ethereumjs_util_1.BN(block.number).toArrayLike(Buffer, 'be', 32);
    const ts = new ethereumjs_util_1.BN(block.timestamp).toArrayLike(Buffer, 'be', 32);
    const txRoot = (0, ethereumjs_util_1.toBuffer)(block.transactionsRoot);
    const receiptsRoot = (0, ethereumjs_util_1.toBuffer)(block.receiptsRoot);
    return sha3(Buffer.concat([n, ts, txRoot, receiptsRoot]));
}
exports.getBlockHeader = getBlockHeader;
