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
const contracts_2 = require("../types/factories/dot-crypto/contracts");
const registry_1 = require("./helpers/registry");
const constants_1 = require("./helpers/constants");
describe('ProxyReader (proxy)', () => {
    let unsRegistry, cnsRegistry, proxyReader;
    let signers, coinbase;
    let walletTokenId;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [coinbase] = signers;
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
        yield unsRegistry.initialize(coinbase.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
        yield unsRegistry.setTokenURIPrefix('/');
        cnsRegistry = yield new contracts_2.CNSRegistry__factory(coinbase).deploy();
        proxyReader = (yield hardhat_1.upgrades.deployProxy(new contracts_1.ProxyReader__factory(coinbase), [unsRegistry.address, cnsRegistry.address], { unsafeAllow: ['delegatecall'] }));
        yield unsRegistry.mintTLD(constants_1.TLD.WALLET, 'wallet');
        walletTokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, ['test-proxy-proxy-reader', 'wallet']);
    }));
    it('should be able to read via Proxy', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, chai_1.expect)(yield proxyReader.exists(walletTokenId)).to.be.equal(true);
        (0, chai_1.expect)(yield proxyReader.ownerOf(walletTokenId)).to.be.equal(coinbase.address);
    }));
});
