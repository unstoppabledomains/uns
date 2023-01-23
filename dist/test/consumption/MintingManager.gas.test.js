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
const hardhat_1 = require("hardhat");
const contracts_1 = require("../../types/factories/contracts");
const metatx_1 = require("../../types/factories/contracts/metatx");
const constants_1 = require("../helpers/constants");
const metatx_2 = require("../helpers/metatx");
describe('MintingManager (consumption)', () => {
    let unsRegistry, mintingManager, forwarder;
    let signers, coinbase, receiver, spender;
    function percDiff(a, b) {
        return -((a - b) / a) * 100;
    }
    let buildExecuteParams;
    function removeReverse() {
        return __awaiter(this, void 0, void 0, function* () {
            const rr = yield unsRegistry.reverseOf(receiver.address);
            if (rr.toString() !== '0') {
                const removeReverseTx = yield unsRegistry.connect(receiver).removeReverse();
                yield removeReverseTx.wait();
            }
        });
    }
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [coinbase, , receiver, spender] = signers;
        unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
        mintingManager = yield new contracts_1.MintingManager__factory(coinbase).deploy();
        yield unsRegistry.initialize(mintingManager.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
        forwarder = yield new metatx_1.MintingManagerForwarder__factory(coinbase).deploy(mintingManager.address);
        yield mintingManager.initialize(unsRegistry.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
        yield mintingManager.addMinter(coinbase.address);
        yield mintingManager.setTokenURIPrefix('/');
        yield mintingManager.setForwarder(forwarder.address);
        buildExecuteParams = (0, metatx_2.buildExecuteFunc)(mintingManager.interface, mintingManager.address, forwarder);
    }));
    describe('Mint consumption', () => {
        const getCases = () => {
            return [
                {
                    func: 'issueWithRecords',
                    note: 'mint',
                    selector: 'issueWithRecords(address,string[],string[],string[],bool)',
                    params: [receiver.address, ['t1-w1', 'wallet'], [], [], true],
                },
                {
                    func: 'issueWithRecords',
                    note: 'unlock',
                    selector: 'issueWithRecords(address,string[],string[],string[],bool)',
                    params: [receiver.address, ['t1-w1', 'wallet'], [], [], true],
                },
            ];
        };
        it('Consumption', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = [];
            const cases = getCases();
            for (let i = 0; i < cases.length; i++) {
                const { note, selector, params } = cases[i];
                const [acc, labels, ...rest] = params;
                const executeParams = [acc, [labels[0] + 'r', labels[1]], ...rest];
                const tokenId = yield unsRegistry.namehash(labels);
                const tokenId2 = yield unsRegistry.namehash(executeParams[1]);
                const { req, signature } = yield buildExecuteParams(selector, executeParams, coinbase, tokenId);
                const executeTx = yield forwarder.connect(spender).execute(req, signature);
                const executeTxReceipt = yield executeTx.wait();
                yield removeReverse();
                const tx = yield mintingManager[selector](...params);
                tx.receipt = yield tx.wait();
                yield removeReverse();
                result.push({
                    note,
                    selector,
                    records: Array.isArray(params[2]) ? params[2].length : '-',
                    send: tx.receipt.gasUsed.toString(),
                    execute: executeTxReceipt.gasUsed.toString(),
                    increase: percDiff(tx.receipt.gasUsed.toNumber(), executeTxReceipt.gasUsed.toNumber()).toFixed(2) + ' %',
                });
                yield unsRegistry.connect(receiver).setOwner(mintingManager.address, tokenId);
                yield unsRegistry.connect(receiver).setOwner(mintingManager.address, tokenId2);
            }
            console.table(result);
        }));
    });
});
