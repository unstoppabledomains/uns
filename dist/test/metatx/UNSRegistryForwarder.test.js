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
const ethers_1 = require("ethers");
const metatx_1 = require("../helpers/metatx");
const mocks_1 = require("../../types/factories/contracts/mocks");
describe('UNSRegistryForwarder', () => {
    let forwarder;
    let signers, owner;
    let buildExecuteParams;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [owner] = signers;
        forwarder = yield new mocks_1.UNSRegistryForwarderMock__factory(owner).deploy();
        yield forwarder.initialize();
        buildExecuteParams = (0, metatx_1.buildExecuteFunc)(forwarder.interface, forwarder.address, forwarder);
    }));
    describe('Verify', () => {
        it('should verify signature', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = ethers_1.BigNumber.from(132);
            const { req, signature } = yield buildExecuteParams('nonceOf(uint256)', [tokenId], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.eq(true);
        }));
        it('should verify signature when tokenId is empty', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = ethers_1.BigNumber.from(132);
            const { req, signature } = yield buildExecuteParams('nonceOf(uint256)', [tokenId], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.eq(true);
        }));
        it('should fail verification when signature is tampered', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = ethers_1.BigNumber.from(132);
            const { req, signature } = yield buildExecuteParams('nonceOf(uint256)', [tokenId], owner, tokenId);
            const tamperedReq = Object.assign(Object.assign({}, req), { nonce: 100 });
            (0, chai_1.expect)(yield forwarder.verify(tamperedReq, signature)).to.be.eq(false);
        }));
    });
    describe('Execute', () => {
        it('should execute when signature is valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = ethers_1.BigNumber.from(132);
            const nonce = yield forwarder.nonceOf(tokenId);
            const { req, signature } = yield buildExecuteParams('nonceOf(uint256)', [tokenId], owner, tokenId);
            yield forwarder.execute(req, signature);
            (0, chai_1.expect)(yield forwarder.nonceOf(tokenId)).to.be.equal(nonce.add(1));
        }));
        it('should execute when signature is valid and tokenId is empty', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = 0;
            const nonce = yield forwarder.nonceOf(tokenId);
            const { req, signature } = yield buildExecuteParams('nonceOf(uint256)', [tokenId], owner, tokenId);
            yield forwarder.execute(req, signature);
            (0, chai_1.expect)(yield forwarder.nonceOf(tokenId)).to.be.equal(nonce.add(1));
        }));
        it('should fail execution when signature is tampered', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = 0;
            const nonce = yield forwarder.nonceOf(tokenId);
            const { req, signature } = yield buildExecuteParams('nonceOf(uint256)', [tokenId], owner, tokenId);
            yield (0, chai_1.expect)(forwarder.execute(Object.assign(Object.assign({}, req), { nonce: nonce.add(1) }), signature)).to.be.revertedWith('UNSRegistryForwarder: SIGNATURE_INVALID');
        }));
    });
});
