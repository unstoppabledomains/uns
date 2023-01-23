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
const mocks_1 = require("../types/factories/contracts/mocks");
const metatx_1 = require("./helpers/metatx");
const constants_1 = require("./helpers/constants");
const registry_1 = require("./helpers/registry");
describe('UNSRegistry (reverse)', () => {
    let unsRegistry;
    let unsRegistryMock;
    let signers, coinbase, owner, receiver, reader;
    let buildExecuteParams;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [coinbase, owner, receiver, reader] = signers;
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
        yield unsRegistry.initialize(coinbase.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
        yield unsRegistry.mintTLD(constants_1.TLD.CRYPTO, 'crypto');
        yield unsRegistry.mintTLD(constants_1.TLD.X, 'x');
        yield unsRegistry.setTokenURIPrefix('/');
        buildExecuteParams = (0, metatx_1.buildExecuteFunc)(unsRegistry.interface, unsRegistry.address, unsRegistry);
        yield unsRegistry.addProxyReader(reader.address);
        unsRegistryMock = yield new mocks_1.UNSRegistryMock__factory(coinbase).deploy();
        yield unsRegistryMock.initialize(coinbase.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
        yield unsRegistryMock.mintTLD(constants_1.TLD.CRYPTO, 'crypto');
        yield unsRegistryMock.mintTLD(constants_1.TLD.X, 'x');
        yield unsRegistryMock.setTokenURIPrefix('/');
        yield unsRegistryMock.addProxyReader(reader.address);
    }));
    describe('Minting', () => {
        it('should produce NewURI and SetReverse events', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            const mintTx = yield unsRegistry.mintWithRecords(owner.address, ['testminting', 'crypto'], [], [], true);
            const mintTxReceipt = yield mintTx.wait();
            const newUriEventIndex = (_a = mintTxReceipt.events) === null || _a === void 0 ? void 0 : _a.findIndex(({ event }) => event === 'NewURI');
            const setReverseIndex = (_b = mintTxReceipt.events) === null || _b === void 0 ? void 0 : _b.findIndex(({ event }) => event === 'SetReverse');
            (0, chai_1.expect)(newUriEventIndex).to.be.greaterThan(0);
            (0, chai_1.expect)(setReverseIndex).to.be.greaterThan(0);
        }));
        it('should only produce NewURI and not SetReverse events with setReverse = false', () => __awaiter(void 0, void 0, void 0, function* () {
            var _c, _d;
            const mintTx = yield unsRegistry.mintWithRecords(owner.address, ['testminting2', 'crypto'], [], [], false);
            const mintTxReceipt = yield mintTx.wait();
            const newUriEventIndex = (_c = mintTxReceipt.events) === null || _c === void 0 ? void 0 : _c.findIndex(({ event }) => event === 'NewURI');
            const setReverseIndex = (_d = mintTxReceipt.events) === null || _d === void 0 ? void 0 : _d.findIndex(({ event }) => event === 'SetReverse');
            (0, chai_1.expect)(newUriEventIndex).to.be.greaterThan(0);
            (0, chai_1.expect)(setReverseIndex).to.be.equal(-1);
        }));
        it('should set reverse resolution on mint', () => __awaiter(void 0, void 0, void 0, function* () {
            const labels = ['reversemint4_2', 'crypto'];
            const tokenId = yield unsRegistry.namehash(labels);
            yield unsRegistry.mintWithRecords(coinbase.address, labels, ['key_1'], ['value_1'], true);
            (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
            (0, chai_1.expect)(yield unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
        }));
        it('should not set reverse resolution on mint if withReverse = false', () => __awaiter(void 0, void 0, void 0, function* () {
            const labels = ['reversemint4_21', 'crypto'];
            const tokenId = yield unsRegistry.namehash(labels);
            yield unsRegistry.mintWithRecords(coinbase.address, labels, ['key_1'], ['value_1'], false);
            (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
            (0, chai_1.expect)(yield unsRegistry.reverseOf(coinbase.address)).to.be.equal(constants_1.ZERO_ADDRESS);
        }));
        it('should produce SetReverse event after NewURI', () => __awaiter(void 0, void 0, void 0, function* () {
            var _e, _f, _g;
            const labels = ['reversemint41_2', 'crypto'];
            const tokenId = yield unsRegistry.namehash(labels);
            const mintTx = yield unsRegistry.mintWithRecords(coinbase.address, labels, ['key_1'], ['value_1'], true);
            const mintTxReceipt = yield mintTx.wait();
            const newUriEventIndex = (_e = mintTxReceipt.events) === null || _e === void 0 ? void 0 : _e.findIndex(({ event }) => event === 'NewURI');
            const setReverseIndex = (_f = mintTxReceipt.events) === null || _f === void 0 ? void 0 : _f.findIndex(({ event }) => event === 'SetReverse');
            (0, chai_1.expect)(setReverseIndex).to.be.greaterThan(0);
            (0, chai_1.expect)((_g = mintTxReceipt.events) === null || _g === void 0 ? void 0 : _g[setReverseIndex].args).to.deep.equal([
                coinbase.address,
                tokenId,
            ]);
            (0, chai_1.expect)(setReverseIndex).to.be.greaterThan(newUriEventIndex);
        }));
        it('should not set reverse resolution if already set', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, [
                'reversemint42_2',
                'crypto',
            ]);
            (0, chai_1.expect)(yield unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
            const labels = ['reversemint43', 'crypto'];
            yield (0, chai_1.expect)(unsRegistry.mintWithRecords(coinbase.address, labels, ['key_1'], ['value_1'], true)).not.to.emit(unsRegistry, 'SetReverse');
            (0, chai_1.expect)(yield unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
        }));
    });
    describe('General', () => {
        it('should set reverse record', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, ['res_1', 'x'], true);
            const _unsRegistry = unsRegistry.connect(owner);
            yield (0, chai_1.expect)(_unsRegistry['setReverse(uint256)'](tokenId))
                .to.emit(unsRegistry, 'SetReverse')
                .withArgs(owner.address, tokenId.toString());
            (0, chai_1.expect)(yield unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
        }));
        it('should not resolve reverse record if reader is ProxyReader and token is upgraded', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistryMock, owner, 'x');
            yield unsRegistryMock.upgradeAll([tokenId]);
            (0, chai_1.expect)(yield unsRegistryMock.connect(reader).reverseOf(owner.address)).to.be.equal(0);
            (0, chai_1.expect)(yield unsRegistryMock.connect(coinbase).reverseOf(owner.address)).to.be.equal(tokenId);
        }));
        it('should set reverse record (case-insensitive address)', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, ['res_1', 'x'], true);
            const _unsRegistry = unsRegistry.connect(owner);
            yield (0, chai_1.expect)(_unsRegistry['setReverse(uint256)'](tokenId))
                .to.emit(unsRegistry, 'SetReverse')
                .withArgs(owner.address, tokenId.toString());
            (0, chai_1.expect)(yield unsRegistry.reverseOf(hardhat_1.ethers.utils.getAddress(owner.address))).to.be.equal(tokenId);
            (0, chai_1.expect)(yield unsRegistry.reverseOf(owner.address.toLowerCase())).to.be.equal(tokenId);
        }));
        it('revert setting reverse record by non-owner', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, ['res_2', 'x'], true);
            const _unsRegistry = unsRegistry.connect(receiver);
            yield (0, chai_1.expect)(_unsRegistry['setReverse(uint256)'](tokenId)).to.be.revertedWith('Registry: SENDER_IS_NOT_OWNER');
            (0, chai_1.expect)(yield unsRegistry.reverseOf(owner.address)).to.be.equal(0);
        }));
        it('should remove reverse record on tranfer', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistry, owner, 'x');
            const _unsRegistry = unsRegistry.connect(owner);
            (0, chai_1.expect)(yield unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
            yield _unsRegistry.transferFrom(owner.address, receiver.address, tokenId);
            (0, chai_1.expect)(yield unsRegistry.reverseOf(owner.address)).to.be.equal(0);
            (0, chai_1.expect)(yield unsRegistry.reverseOf(receiver.address)).to.be.equal(0);
        }));
        it('should remove reverse record on transfer only for current domain', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistry, owner, 'x');
            const tokenId2 = yield (0, registry_1.mintRandomDomain)(unsRegistry, owner, 'x');
            (0, chai_1.expect)(yield unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
            yield unsRegistry
                .connect(owner)
                .transferFrom(owner.address, receiver.address, tokenId2);
            (0, chai_1.expect)(yield unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
            (0, chai_1.expect)(yield unsRegistry.reverseOf(receiver.address)).to.be.equal(0);
        }));
        it('should remove reverse record', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, registry_1.mintDomain)(unsRegistry, owner, ['rem_3', 'x']);
            const _unsRegistry = unsRegistry.connect(owner);
            yield (0, chai_1.expect)(_unsRegistry.removeReverse())
                .to.emit(unsRegistry, 'RemoveReverse')
                .withArgs(owner.address);
            (0, chai_1.expect)(yield unsRegistry.reverseOf(owner.address)).to.be.equal(0);
        }));
        it('revert removing reverse record when there no reverse', () => __awaiter(void 0, void 0, void 0, function* () {
            const _unsRegistry = unsRegistry.connect(owner);
            yield (0, chai_1.expect)(_unsRegistry.removeReverse()).to.be.revertedWith('Registry: REVERSE_RECORD_IS_EMPTY');
            (0, chai_1.expect)(yield unsRegistry.reverseOf(owner.address)).to.be.equal(0);
        }));
    });
    describe('MetaTx', () => {
        it('should set reverse record', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, ['res_mtx_1', 'x'], true);
            const { req, signature } = yield buildExecuteParams('setReverse(uint256)', [tokenId], owner, tokenId);
            yield unsRegistry.execute(req, signature);
            (0, chai_1.expect)(yield unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
        }));
        it('revert setting reverse record by non-owner', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, ['res_mtx_2', 'x'], true);
            const { req, signature } = yield buildExecuteParams('setReverse(uint256)', [tokenId], receiver, tokenId);
            yield (0, chai_1.expect)(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_OWNER');
            (0, chai_1.expect)(yield unsRegistry.reverseOf(owner.address)).to.be.equal(0);
        }));
        it('revert setting reverse record when non-token based nonce', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, ['res_mtx_4', 'x'], true);
            const { req, signature } = yield buildExecuteParams('setReverse(uint256)', [tokenId], owner, 1);
            yield (0, chai_1.expect)(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: TOKEN_INVALID');
            (0, chai_1.expect)(yield unsRegistry.reverseOf(owner.address)).to.be.equal(0);
        }));
        it('should remove reverse record', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, registry_1.mintDomain)(unsRegistry, owner, ['rem_mtx_4', 'x']);
            const { req, signature } = yield buildExecuteParams('removeReverse()', [], owner, owner.address);
            yield unsRegistry.execute(req, signature);
            (0, chai_1.expect)(yield unsRegistry.reverseOf(owner.address)).to.be.equal(0);
        }));
    });
});
