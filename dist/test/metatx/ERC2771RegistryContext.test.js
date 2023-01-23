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
describe('ERC2771RegistryContext', () => {
    let context;
    let signers, coinbase, accounts;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [coinbase] = signers;
        [, ...accounts] = signers.map(s => s.address);
        context = yield new mocks_1.ERC2771RegistryContextMock__factory(coinbase).deploy();
        yield context.initialize();
    }));
    describe('isTrustedForwarder', () => {
        it('should return false untrusterd forwarders', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, chai_1.expect)(yield context.isTrustedForwarder(accounts[0])).to.be.eq(false);
            (0, chai_1.expect)(yield context.isTrustedForwarder(accounts[9])).to.be.eq(false);
        }));
        it('should return true trusted forwarder (self-address)', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, chai_1.expect)(yield context.isTrustedForwarder(context.address)).to.be.eq(true);
        }));
    });
    describe('validate forwarded token(last 32bytes in calldata)', () => {
        it('should forwarded tokenId when trusted forwarder', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = ethers_1.BigNumber.from(102);
            const calldata = context.interface.encodeFunctionData('msgToken');
            const encodedTokenId = ethers_1.utils.defaultAbiCoder.encode(['uint256'], [tokenId]);
            const [success, returnData] = yield context.callStatic.execute(calldata + encodedTokenId.slice(2));
            (0, chai_1.expect)(success).to.be.eq(true);
            const [msgToken] = ethers_1.utils.defaultAbiCoder.decode(['uint256'], returnData);
            (0, chai_1.expect)(msgToken).to.be.equal(tokenId);
        }));
        it('should return zero tokenId when untrusted forwarder', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, chai_1.expect)(yield context.callStatic.msgToken()).to.be.equal(0);
        }));
    });
    describe('validate msg.from (calldata = "{bytes:data}{address:from}{bytes32:tokenId}")', () => {
        it('should return sender address when trusted forwarder', () => __awaiter(void 0, void 0, void 0, function* () {
            const calldata = context.interface.encodeFunctionData('msgSender');
            const encodedTokenId = ethers_1.utils.defaultAbiCoder.encode(['uint256'], [0]);
            const encodedAddress = ethers_1.utils.defaultAbiCoder.encode(['address'], [signers[0].address]);
            const encodedData = calldata + encodedAddress.slice(2) + encodedTokenId.slice(2);
            const [success, returnData] = yield context.callStatic.execute(encodedData);
            (0, chai_1.expect)(success).to.be.eq(true);
            const [address] = ethers_1.utils.defaultAbiCoder.decode(['address'], returnData);
            (0, chai_1.expect)(address).to.be.eql(signers[0].address);
        }));
        it('should return sender address when untrusted forwarder', () => __awaiter(void 0, void 0, void 0, function* () {
            const sender = yield context.callStatic.msgSender();
            (0, chai_1.expect)(sender).to.be.eql(signers[0].address);
            const sender2 = yield context.connect(signers[2]).callStatic.msgSender();
            (0, chai_1.expect)(sender2).to.be.eql(signers[2].address);
        }));
    });
    describe('validate msg.data (calldata = "{bytes:data}{address:from}{bytes32:tokenId}")', () => {
        it('should return data when trusted forwarder', () => __awaiter(void 0, void 0, void 0, function* () {
            const calldata = context.interface.encodeFunctionData('msgData');
            const encodedTokenId = ethers_1.utils.defaultAbiCoder.encode(['uint256'], [0]);
            const encodedAddress = ethers_1.utils.defaultAbiCoder.encode(['address'], [signers[0].address]);
            const encodedData = calldata + encodedAddress.slice(2) + encodedTokenId.slice(2);
            const [success, returnData] = yield context.callStatic.execute(encodedData);
            (0, chai_1.expect)(success).to.be.eq(true);
            const [, , selector] = ethers_1.utils.defaultAbiCoder.decode(['bytes32', 'bytes32', 'bytes4'], returnData);
            (0, chai_1.expect)(selector).to.be.eql(calldata);
        }));
        it('should return data when untrusted forwarder', () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield context.callStatic.msgData();
            (0, chai_1.expect)(data).to.be.eql('0xc4c2bfdc');
        }));
    });
});
