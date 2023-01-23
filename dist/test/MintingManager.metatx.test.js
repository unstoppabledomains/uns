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
const metatx_1 = require("../types/factories/contracts/metatx");
const metatx_2 = require("./helpers/metatx");
const constants_1 = require("./helpers/constants");
describe('MintingManager (metatx)', () => {
    let unsRegistry, mintingManager, forwarder, buildExecuteParams;
    let signers, coinbase, receiver;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [coinbase, receiver] = signers;
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
        mintingManager = (yield hardhat_1.upgrades.deployProxy(new contracts_1.MintingManager__factory(coinbase), [], { initializer: false }));
        yield unsRegistry.initialize(mintingManager.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
        forwarder = yield new metatx_1.MintingManagerForwarder__factory(coinbase).deploy(mintingManager.address);
        yield mintingManager.initialize(unsRegistry.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, forwarder.address);
        yield mintingManager.addMinter(coinbase.address);
        yield mintingManager.setTokenURIPrefix('/');
        buildExecuteParams = (0, metatx_2.buildExecuteFunc)(mintingManager.interface, mintingManager.address, forwarder);
    }));
    it('should mint through forwarder', () => __awaiter(void 0, void 0, void 0, function* () {
        const tokenId = yield unsRegistry.namehash(['test-qw11', 'wallet']);
        const { req, signature } = yield buildExecuteParams('issueWithRecords(address,string[],string[],string[],bool)', [receiver.address, ['test-qw11', 'wallet'], [], [], true], coinbase, tokenId);
        yield forwarder.execute(req, signature);
        (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
    }));
    it('should revert forwarding when forwarder not trusted', () => __awaiter(void 0, void 0, void 0, function* () {
        const tokenId = yield unsRegistry.namehash(['test-qw11', 'wallet']);
        const { req, signature } = yield buildExecuteParams('issueWithRecords(address,string[],string[],string[],bool)', [receiver.address, ['test-qw11', 'wallet'], [], [], true], coinbase, tokenId);
        yield mintingManager.setForwarder(constants_1.ZERO_ADDRESS);
        yield (0, chai_1.expect)(forwarder.execute(req, signature)).to.be.revertedWith('MintingManager: CALLER_IS_NOT_MINTER');
    }));
    it('should revert execution when signature is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const tokenId = yield unsRegistry.namehash(['test-qw1341', 'wallet']);
        const { req, signature } = yield buildExecuteParams('issueWithRecords(address,string[],string[],string[],bool)', [receiver.address, ['test-qw1341', 'wallet'], [], [], true], coinbase, tokenId);
        yield (0, chai_1.expect)(forwarder.execute(Object.assign(Object.assign({}, req), { from: receiver.address }), signature)).to.be.revertedWith('MintingManagerForwarder: SIGNATURE_INVALID');
    }));
    it('should revert execution when used signature', () => __awaiter(void 0, void 0, void 0, function* () {
        const tokenId = yield unsRegistry.namehash(['test-qw1341', 'wallet']);
        const { req, signature } = yield buildExecuteParams('issueWithRecords(address,string[],string[],string[],bool)', [receiver.address, ['test-qw1341', 'wallet'], [], [], true], coinbase, tokenId);
        yield forwarder.execute(req, signature);
        yield (0, chai_1.expect)(forwarder.execute(req, signature)).to.be.revertedWith('MintingManagerForwarder: SIGNATURE_INVALID');
    }));
});
