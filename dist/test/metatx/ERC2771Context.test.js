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
const metatx_2 = require("../../types/factories/contracts/metatx");
describe('ERC2771Context', () => {
    let context, forwarder;
    let signers, coinbase, account;
    let buildExecuteParams;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [coinbase, account] = signers;
        context = yield new mocks_1.ERC2771ContextMock__factory(coinbase).deploy();
        forwarder = yield new metatx_2.MintingManagerForwarder__factory(coinbase).deploy(context.address);
        yield context.initialize(forwarder.address);
        buildExecuteParams = (0, metatx_1.buildExecuteFunc)(context.interface, context.address, forwarder);
    }));
    it('should verify', () => __awaiter(void 0, void 0, void 0, function* () {
        const tokenId = ethers_1.BigNumber.from(1);
        const { req, signature } = yield buildExecuteParams('run()', [], coinbase, tokenId);
        (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
        const abiCoder = new ethers_1.utils.AbiCoder();
        const data = abiCoder.decode(['string'], yield forwarder.callStatic.execute(req, signature))[0];
        (0, chai_1.expect)(data).to.be.equal('ERC2771ContextMock: run');
    }));
    describe('isTrustedForwarder', () => {
        it('should return false untrusterd forwarders', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, chai_1.expect)(yield context.isTrustedForwarder(account.address)).to.be.eq(false);
        }));
        it('should return true trusted forwarder', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, chai_1.expect)(yield context.isTrustedForwarder(forwarder.address)).to.be.eq(true);
        }));
    });
    describe('validate forwarded token', () => {
        it('should forwarded tokenId when trusted forwarder', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = ethers_1.BigNumber.from(10);
            const { req, signature } = yield buildExecuteParams('msgToken()', [], coinbase, tokenId);
            const result = yield forwarder.callStatic.execute(req, signature);
            (0, chai_1.expect)(result).to.be.equal(tokenId);
        }));
        it('should return zero tokenId when untrusted forwarder', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, chai_1.expect)(yield context.callStatic.msgToken()).to.be.equal(0);
        }));
    });
    describe('validate forwarded sender', () => {
        it('should forwarded sender when trusted forwarder', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = ethers_1.BigNumber.from(121);
            const { req, signature } = yield buildExecuteParams('msgSender()', [], account, tokenId);
            const result = yield forwarder.callStatic.execute(req, signature);
            const [msgSender] = ethers_1.utils.defaultAbiCoder.decode(['address'], result);
            (0, chai_1.expect)(msgSender).to.be.equal(account.address);
        }));
        it('should return direct sender when direct call', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, chai_1.expect)(yield context.callStatic.msgSender()).to.be.equal(coinbase.address);
        }));
    });
    describe('validate forwarded data', () => {
        it('should forwarded data when trusted forwarder', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = ethers_1.BigNumber.from(125);
            const { req, signature } = yield buildExecuteParams('msgData()', [], account, tokenId);
            const data = context.interface.encodeFunctionData('msgData');
            const result = yield forwarder.callStatic.execute(req, signature);
            const [msgSender] = ethers_1.utils.defaultAbiCoder.decode(['bytes'], result);
            (0, chai_1.expect)(msgSender).to.be.equal(data);
        }));
        it('should return zero data when untrusted forwarder', () => __awaiter(void 0, void 0, void 0, function* () {
            const data = context.interface.encodeFunctionData('msgData');
            (0, chai_1.expect)(yield context.callStatic.msgData()).to.be.equal(data);
        }));
    });
});
