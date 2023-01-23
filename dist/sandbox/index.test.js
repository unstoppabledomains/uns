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
const chai_1 = require("chai");
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const config_1 = require("../src/config");
const contracts_1 = require("../types/factories/contracts");
const contracts_2 = require("../types/factories/dot-crypto/contracts");
const helpers_1 = require("../src/helpers");
const constants_1 = require("../test/helpers/constants");
const _1 = require(".");
describe('Sandbox', () => __awaiter(void 0, void 0, void 0, function* () {
    const domainPrefix = 'sandbox';
    let unsRegistry, cnsRegistry, mintingManager;
    let signers, owner, minter;
    let predicateAddress;
    let sandbox;
    const abiCoder = new ethers_1.utils.AbiCoder();
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        sandbox = yield _1.Sandbox.start({ verbose: true });
        signers = yield hardhat_1.ethers.getSigners();
        [owner, minter] = signers;
        const chainId = (0, helpers_1.unwrap)(hardhat_1.network.config, 'chainId');
        const { contracts } = (0, config_1.getNetworkConfig)(chainId);
        unsRegistry = new contracts_1.UNSRegistry__factory(owner).attach(contracts.UNSRegistry.address);
        cnsRegistry = new contracts_2.CNSRegistry__factory(owner).attach(contracts.CNSRegistry.address);
        mintingManager = new contracts_1.MintingManager__factory(owner).attach(contracts.MintingManager.address);
        predicateAddress = contracts.MintableERC721Predicate.address;
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sandbox.reset();
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sandbox.stop();
    }));
    it('should mint a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const labels = [`${domainPrefix}-wallet-0`, 'wallet'];
        const tx = yield mintingManager.connect(minter).issueWithRecords(owner.address, labels, [], [], true);
        yield tx.wait();
        const tokenId = yield unsRegistry.namehash(labels);
        (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.eq(owner.address);
    }));
    it('should mint same token as prev test', () => __awaiter(void 0, void 0, void 0, function* () {
        const labels = [`${domainPrefix}-wallet-0`, 'wallet'];
        const tx = yield mintingManager.connect(minter).issueWithRecords(owner.address, labels, [], [], true);
        yield tx.wait();
        const tokenId = yield unsRegistry.namehash(labels);
        (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.eq(owner.address);
    }));
    it('should mint a token in CNS', () => __awaiter(void 0, void 0, void 0, function* () {
        const labels = [domainPrefix, 'crypto'];
        const tx = yield mintingManager.connect(minter).issueWithRecords(owner.address, labels, [], [], false);
        yield tx.wait();
        const tokenId = yield cnsRegistry.childIdOf(constants_1.TLD.CRYPTO, domainPrefix);
        (0, chai_1.expect)(yield cnsRegistry.ownerOf(tokenId)).to.be.eq(owner.address);
    }));
    it('should migrate token from CNS to UNS', () => __awaiter(void 0, void 0, void 0, function* () {
        const labels = [domainPrefix, 'crypto'];
        const tokenId = yield cnsRegistry.childIdOf(constants_1.TLD.CRYPTO, domainPrefix);
        const tx = yield mintingManager.connect(minter).issueWithRecords(owner.address, labels, [], [], false);
        yield tx.wait();
        yield cnsRegistry['safeTransferFrom(address,address,uint256,bytes)'](owner.address, unsRegistry.address, tokenId, abiCoder.encode(['bool'], [false]));
        (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.eq(owner.address);
        try {
            yield cnsRegistry.callStatic.ownerOf(tokenId);
            chai_1.assert.fail('Error is ecpected');
        }
        catch (error) { }
    }));
    it('should migrate token from CNS to UNS L2', () => __awaiter(void 0, void 0, void 0, function* () {
        const labels = [domainPrefix, 'crypto'];
        const tokenId = yield cnsRegistry.childIdOf(constants_1.TLD.CRYPTO, domainPrefix);
        const tx = yield mintingManager.connect(minter).issueWithRecords(owner.address, labels, [], [], false);
        yield tx.wait();
        yield cnsRegistry['safeTransferFrom(address,address,uint256,bytes)'](owner.address, unsRegistry.address, tokenId, abiCoder.encode(['bool'], [true]));
        (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.eq(predicateAddress);
        try {
            yield cnsRegistry.callStatic.ownerOf(tokenId);
            chai_1.assert.fail('Error is ecpected');
        }
        catch (error) { }
    }));
}));
