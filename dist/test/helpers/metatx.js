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
exports.buildExecuteFunc = exports.sign = void 0;
const ethers_1 = require("ethers");
function sign(data, address, nonce, signer) {
    return __awaiter(this, void 0, void 0, function* () {
        return signer.signMessage(ethers_1.utils.arrayify(ethers_1.utils.solidityKeccak256(['bytes32', 'address', 'uint256'], [ethers_1.utils.keccak256(data), address, nonce])));
    });
}
exports.sign = sign;
function buildExecuteFunc(iface, toAddress, forwarder) {
    return (selector, params, from, tokenId) => __awaiter(this, void 0, void 0, function* () {
        const data = iface.encodeFunctionData(selector, params);
        const nonce = yield forwarder.nonceOf(tokenId);
        const signature = yield sign(data, toAddress, nonce, from);
        return {
            req: { from: from.address, nonce, tokenId, data },
            signature,
        };
    });
}
exports.buildExecuteFunc = buildExecuteFunc;
