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
const mocks_1 = require("../../types/factories/contracts/mocks");
const utils_1 = require("../../types/factories/contracts/utils");
const metatx_1 = require("./../helpers/metatx");
describe('BaseForwarder', () => {
    let forwarder;
    let signers, owner, account;
    let simpleWallet;
    let mockWallet;
    let buildExecuteParams;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [owner, account] = signers;
        const ERC1271MockFactory = yield hardhat_1.ethers.getContractFactory('ERC1271Mock');
        forwarder = yield new mocks_1.BaseForwarderMock__factory(owner).deploy();
        simpleWallet = yield new utils_1.ERC1271SimpleWallet__factory(owner).deploy(owner.address);
        mockWallet = yield ERC1271MockFactory.deploy();
        buildExecuteParams = (0, metatx_1.buildExecuteFunc)(forwarder.interface, forwarder.address, forwarder);
    }));
    describe('Verify', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should verify when the signature is valid', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = ethers_1.BigNumber.from(100010);
            const { req, signature } = yield buildExecuteParams('revertWithReason()', [], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.eq(true);
        }));
        it('should verify that the address matches the recovered one', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = ethers_1.BigNumber.from(100010);
            const { req, signature } = yield buildExecuteParams('revertWithReason()', [], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(Object.assign(Object.assign({}, req), { from: account.address }), signature)).to.eq(false);
        }));
        it('should verify that nonces match the address once', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = ethers_1.BigNumber.from(100010);
            const { req, signature } = yield buildExecuteParams('revertWithReason()', [], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(Object.assign(Object.assign({}, req), { nonce: 42 }), signature)).to.eq(false);
        }));
        describe('with metatx from contract addresses', () => __awaiter(void 0, void 0, void 0, function* () {
            it('should be able to verify the ERC1271 contract signature', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = ethers_1.BigNumber.from(100010);
                const { req, signature } = yield buildExecuteParams('mintAsset()', [], owner, tokenId);
                (0, chai_1.expect)(yield forwarder.verify(Object.assign(Object.assign({}, req), { from: simpleWallet.address }), signature)).to.eq(true);
            }));
            it('should be able to handle situation when ERC1271 contract returns false', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = ethers_1.BigNumber.from(100010);
                const { req, signature } = yield buildExecuteParams('mintAsset()', [], account, tokenId);
                (0, chai_1.expect)(yield forwarder.verify(Object.assign(Object.assign({}, req), { from: simpleWallet.address }), signature)).to.eq(false);
            }));
            it('should be able to handle situation when contract does not implement ERC1271', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = ethers_1.BigNumber.from(100010);
                const { req, signature } = yield buildExecuteParams('mintAsset()', [], owner, tokenId);
                (0, chai_1.expect)(yield forwarder.verify(Object.assign(Object.assign({}, req), { from: mockWallet.address }), signature)).to.eq(false);
            }));
        }));
    }));
    describe('Execute', () => __awaiter(void 0, void 0, void 0, function* () {
        it('should revert with native reason', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = ethers_1.BigNumber.from(100010);
            const { req, signature } = yield buildExecuteParams('revertWithReason()', [], owner, tokenId);
            yield (0, chai_1.expect)(forwarder.execute(req, signature)).to.be.revertedWith('AAAAAA');
        }));
        it('should revert with forwarding reason', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = ethers_1.BigNumber.from(100010);
            const { req, signature } = yield buildExecuteParams('revertWithoutReason()', [], owner, tokenId);
            yield (0, chai_1.expect)(forwarder.execute(req, signature)).to.be.revertedWith('BaseForwarder: CALL_FAILED');
        }));
        describe('metatx from contract addresses', () => __awaiter(void 0, void 0, void 0, function* () {
            it('should be able to mint asset on behalf of ERC1271SmartWallet', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = ethers_1.BigNumber.from(100010);
                const { req, signature } = yield buildExecuteParams('mintAsset()', [], owner, tokenId);
                yield forwarder.execute(Object.assign(Object.assign({}, req), { from: simpleWallet.address }), signature);
                (0, chai_1.expect)(yield forwarder.hasAsset(simpleWallet.address)).to.eq(true);
            }));
            it('should revert when the signature is made not on behalf of smart wallet owner', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = ethers_1.BigNumber.from(100010);
                const { req, signature } = yield buildExecuteParams('mintAsset()', [], account, tokenId);
                yield (0, chai_1.expect)(forwarder.execute(Object.assign(Object.assign({}, req), { from: mockWallet.address }), signature)).to.be.revertedWith('BaseForwarderMock: SIGNATURE_INVALID');
            }));
            it('should revert when contract does not implement ERC1271', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = ethers_1.BigNumber.from(100010);
                const { req, signature } = yield buildExecuteParams('mintAsset()', [], owner, tokenId);
                yield (0, chai_1.expect)(forwarder.execute(Object.assign(Object.assign({}, req), { from: mockWallet.address }), signature)).to.be.revertedWith('BaseForwarderMock: SIGNATURE_INVALID');
            }));
        }));
    }));
});
