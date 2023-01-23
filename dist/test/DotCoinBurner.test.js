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
const utils_1 = require("ethers/lib/utils");
const contracts_1 = require("../types/factories/contracts");
const constants_1 = require("./helpers/constants");
const registry_1 = require("./helpers/registry");
describe('DotCoinBurner', () => {
    let unsRegistry, dotCoinBurner;
    let signers, coinbase, accounts;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [coinbase] = signers;
        [, ...accounts] = signers;
        unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
        yield unsRegistry.initialize(coinbase.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        dotCoinBurner = yield new contracts_1.DotCoinBurner__factory(coinbase).deploy(unsRegistry.address);
    }));
    it('should emit BatchCompleted event', () => __awaiter(void 0, void 0, void 0, function* () {
        const mintedTokenIds = [];
        const labelHashes = [];
        for (let i = 0; i < 10; i++) {
            const label = `batch-completed-${i}`;
            labelHashes.push((0, utils_1.solidityKeccak256)(['string'], [label]));
            mintedTokenIds.push(yield (0, registry_1.mintDomain)(unsRegistry, accounts[0], [label, 'coin']));
        }
        (0, chai_1.expect)(mintedTokenIds).lengthOf(10);
        const firstTokenId = mintedTokenIds[0];
        const lastTokenId = mintedTokenIds[mintedTokenIds.length - 1];
        yield unsRegistry.connect(accounts[0]).setApprovalForAll(dotCoinBurner.address, true);
        yield (0, chai_1.expect)(dotCoinBurner.burnAll(labelHashes))
            .to.emit(dotCoinBurner, 'BatchCompleted')
            .withArgs(firstTokenId, lastTokenId);
    }));
    it('should emit correct BatchCompleted event for 1 domain', () => __awaiter(void 0, void 0, void 0, function* () {
        const label = 'batch-completed-single-domain';
        const labelHash = (0, utils_1.solidityKeccak256)(['string'], [label]);
        const mintedTokenId = yield (0, registry_1.mintDomain)(unsRegistry, accounts[0], [label, 'coin']);
        yield unsRegistry.connect(accounts[0]).setApprovalForAll(dotCoinBurner.address, true);
        yield (0, chai_1.expect)(dotCoinBurner.burnAll([labelHash]))
            .to.emit(dotCoinBurner, 'BatchCompleted')
            .withArgs(mintedTokenId, mintedTokenId);
    }));
    it('should not emit BatchCompleted event arguments are empty', () => __awaiter(void 0, void 0, void 0, function* () {
        yield unsRegistry.connect(accounts[0]).setApprovalForAll(dotCoinBurner.address, true);
        yield (0, chai_1.expect)(dotCoinBurner.burnAll([]))
            .not.to.emit(dotCoinBurner, 'BatchCompleted');
    }));
    it('should burn all passed domains from multiple owners', () => __awaiter(void 0, void 0, void 0, function* () {
        const mintedTokenIds = [];
        const labelHashes = [];
        for (let i = 0; i < accounts.length; i++) {
            const label = `multiple-owners-${i}`;
            labelHashes.push((0, utils_1.solidityKeccak256)(['string'], [label]));
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, accounts[i], [label, 'coin']);
            mintedTokenIds.push(tokenId);
            yield unsRegistry.connect(accounts[i]).setApprovalForAll(dotCoinBurner.address, true);
            (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(accounts[i].address);
        }
        yield dotCoinBurner.burnAll(labelHashes);
        (0, chai_1.expect)(mintedTokenIds).lengthOf(accounts.length);
        for (let i = 0; i < mintedTokenIds.length; i++) {
            const domainOwner = yield unsRegistry.ownerOf(mintedTokenIds[i]);
            (0, chai_1.expect)(domainOwner).to.be.equal(constants_1.DEAD_ADDRESS);
        }
    }));
    it('should fail if domain has incorrect extension', () => __awaiter(void 0, void 0, void 0, function* () {
        yield unsRegistry.setApprovalForAll(dotCoinBurner.address, true);
        (0, chai_1.expect)(constants_1.TLD).to.be.not.empty;
        for (const i in constants_1.TLD) {
            const extension = i.toLowerCase();
            const label = `incorrect-extension-${extension}`;
            const labelHash = (0, utils_1.solidityKeccak256)(['string'], [label]);
            yield (0, registry_1.mintDomain)(unsRegistry, coinbase, [label, extension]);
            yield (0, chai_1.expect)(dotCoinBurner.burnAll([labelHash]))
                .to.be.revertedWith('ERC721: invalid token ID');
        }
    }));
    it('should fail if domain is not approved to spend', () => __awaiter(void 0, void 0, void 0, function* () {
        const label = 'not-approved-domain-to-burn';
        const labelHash = (0, utils_1.solidityKeccak256)(['string'], [label]);
        yield (0, registry_1.mintDomain)(unsRegistry, accounts[0], [label, 'coin']);
        yield (0, chai_1.expect)(dotCoinBurner.burnAll([labelHash]))
            .to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    }));
    it('should fail if 1 of multiple domains is not approved to spend', () => __awaiter(void 0, void 0, void 0, function* () {
        const labelHashes = [];
        for (let i = 0; i < accounts.length; i++) {
            const label = `one-of-five-is-not-approved-${i}`;
            labelHashes.push((0, utils_1.solidityKeccak256)(['string'], [label]));
            yield (0, registry_1.mintDomain)(unsRegistry, accounts[i], [label, 'coin']);
            yield unsRegistry.connect(accounts[i]).setApprovalForAll(dotCoinBurner.address, true);
        }
        yield unsRegistry.connect(accounts[0]).setApprovalForAll(dotCoinBurner.address, false);
        yield (0, chai_1.expect)(dotCoinBurner.burnAll(labelHashes))
            .to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    }));
    it('should allow calling burn method from any account', () => __awaiter(void 0, void 0, void 0, function* () {
        const mintedTokenIds = [];
        for (let i = 0; i < accounts.length; i++) {
            const label = `multiple-method-callers-${i}`;
            const labelHash = (0, utils_1.solidityKeccak256)(['string'], [label]);
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, accounts[i], [label, 'coin']);
            mintedTokenIds.push(tokenId);
            yield unsRegistry.connect(accounts[i]).setApprovalForAll(dotCoinBurner.address, true);
            yield dotCoinBurner.connect(accounts[accounts.length - i - 1]).burnAll([labelHash]);
        }
        (0, chai_1.expect)(mintedTokenIds).to.have.lengthOf(accounts.length);
        for (let i = 0; i < mintedTokenIds.length; i++) {
            (0, chai_1.expect)(yield unsRegistry.ownerOf(mintedTokenIds[i]))
                .to.be.equal(constants_1.DEAD_ADDRESS);
        }
    }));
    describe('Estimate gas spendings', () => {
        it('should burn multiple domains', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = [];
            for (const i of [1, 2, 3, 10, 50, 100, 140]) {
                result.push(yield verifyMultipleDomainsBurn(i, `${i}-domains-`));
            }
            (0, chai_1.expect)(result).to.have.lengthOf(7);
            console.table(result);
        }));
        function verifyMultipleDomainsBurn(amount, labelPrefix) {
            return __awaiter(this, void 0, void 0, function* () {
                const mintedTokenIds = [];
                const labelHashes = [];
                for (let i = 0; i < amount; i++) {
                    const label = `${labelPrefix}-${i}`;
                    labelHashes.push((0, utils_1.solidityKeccak256)(['string'], [label]));
                    mintedTokenIds.push(yield (0, registry_1.mintDomain)(unsRegistry, accounts[0], [label, 'coin']));
                }
                yield unsRegistry.connect(accounts[0]).setApprovalForAll(dotCoinBurner.address, true);
                const txReceipt = yield (yield dotCoinBurner.burnAll(labelHashes)).wait();
                (0, chai_1.expect)(mintedTokenIds).to.have.lengthOf(amount);
                for (let i = 0; i < mintedTokenIds.length; i++) {
                    const domainOwner = yield unsRegistry.ownerOf(mintedTokenIds[i]);
                    (0, chai_1.expect)(domainOwner).to.be.equal(constants_1.DEAD_ADDRESS);
                }
                return {
                    domainsAmount: amount,
                    gasUsed: txReceipt.gasUsed.toString(),
                };
            });
        }
    });
});
