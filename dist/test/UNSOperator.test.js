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
const chai_1 = require("chai");
const contracts_1 = require("../types/factories/contracts");
describe('UNSOperator', () => {
    let unsOperator;
    let signers, coinbase, receiver;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [coinbase, receiver] = signers;
    }));
    describe('Ownership', () => {
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            unsOperator = yield new contracts_1.UNSOperator__factory(coinbase).deploy();
            yield unsOperator.initialize();
        }));
        it('should transfer ownership', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, chai_1.expect)(yield unsOperator.owner()).to.be.equal(coinbase.address);
            yield unsOperator.transferOwnership(receiver.address);
            (0, chai_1.expect)(yield unsOperator.owner()).to.be.equal(receiver.address);
        }));
    });
});
