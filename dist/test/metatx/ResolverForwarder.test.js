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
const metatx_1 = require("../helpers/metatx");
const constants_1 = require("../helpers/constants");
const contracts_1 = require("../../types/factories/dot-crypto/contracts");
const controllers_1 = require("../../types/factories/dot-crypto/contracts/controllers");
const metatx_2 = require("../../types/factories/contracts/metatx");
describe('ResolverForwarder', () => {
    let forwarder, registry, mintingController, signatureController, resolver;
    let signers, owner;
    let buildExecuteParams;
    const mintDomain = (label, owner, resolverAddress = resolver.address) => __awaiter(void 0, void 0, void 0, function* () {
        yield mintingController.mintSLDWithResolver(owner, label, resolverAddress);
        return yield registry.childIdOf(constants_1.TLD.CRYPTO, label);
    });
    const mintDomainWithoutResolver = (label, owner) => __awaiter(void 0, void 0, void 0, function* () {
        yield mintingController.mintSLD(owner, label);
        return yield registry.childIdOf(constants_1.TLD.CRYPTO, label);
    });
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [owner] = signers;
        registry = yield new contracts_1.CNSRegistry__factory(owner).deploy();
        mintingController = yield new controllers_1.MintingController__factory(owner).deploy(registry.address);
        signatureController = yield new controllers_1.SignatureController__factory(owner).deploy(registry.address);
        resolver = yield new contracts_1.Resolver__factory(owner).deploy(registry.address, mintingController.address);
        yield registry.addController(mintingController.address);
        yield registry.addController(signatureController.address);
        forwarder = yield new metatx_2.ResolverForwarder__factory(owner).deploy(registry.address, resolver.address);
        buildExecuteParams = (0, metatx_1.buildExecuteFunc)(resolver.interface, resolver.address, forwarder);
    }));
    describe('nonceOf', () => {
        it('should match nonces', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foon', owner.address);
            let nonceF = yield forwarder.nonceOf(tokenId);
            let nonceR = yield resolver.nonceOf(tokenId);
            (0, chai_1.expect)(nonceF).to.be.equal(0);
            (0, chai_1.expect)(nonceF).to.be.equal(nonceR);
            const { req, signature } = yield buildExecuteParams('reset(uint256)', [tokenId], owner, tokenId);
            yield forwarder.execute(req, signature);
            nonceF = yield forwarder.nonceOf(tokenId);
            nonceR = yield resolver.nonceOf(tokenId);
            (0, chai_1.expect)(nonceF).to.be.equal(1);
            (0, chai_1.expect)(nonceF).to.be.equal(nonceR);
        }));
        it('should return nonce from default resolver when domain doesn\'t have own', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomainWithoutResolver('test_foo_no_res', owner.address);
            const nonceF = yield forwarder.nonceOf(tokenId);
            const nonceR = yield resolver.nonceOf(tokenId);
            (0, chai_1.expect)(nonceF).to.be.equal(nonceR);
            yield (0, chai_1.expect)(registry.resolverOf(tokenId)).to.be.revertedWith('');
        }));
        it('should return nonce from default resolver when resolver is non-contract', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foo_noc', owner.address, owner.address);
            (0, chai_1.expect)(yield forwarder.nonceOf(tokenId)).to.be.equal(0);
        }));
        it('should return nonce from default resolver when resolver is wrong', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foo_nof', owner.address, forwarder.address);
            (0, chai_1.expect)(yield forwarder.nonceOf(tokenId)).to.be.equal(0);
        }));
        it('should return nonce from default resolver when resolver is wrong 2', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foo_nof2', owner.address);
            const { req, signature } = yield buildExecuteParams('reset(uint256)', [tokenId], owner, tokenId);
            yield forwarder.execute(req, signature);
            yield registry.resolveTo(forwarder.address, tokenId);
            (0, chai_1.expect)(yield forwarder.nonceOf(tokenId)).to.be.equal(1);
        }));
    });
    describe('verify', () => {
        it('should verify successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foo_10', owner.address);
            const { req, signature } = yield buildExecuteParams('reset(uint256)', [tokenId], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
        }));
        it('should fail verification when unknown function call', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foo_13', owner.address);
            const { req, signature } = yield buildExecuteParams('get(string,uint256)', ['k', tokenId], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(false);
        }));
        it('should fail verification when nonce is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foo_14', owner.address);
            const { req, signature } = yield buildExecuteParams('reset(uint256)', [tokenId], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(Object.assign(Object.assign({}, req), { nonce: 100 }), signature)).to.be.equal(false);
        }));
        it('should fail verification when signature used', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foo_15', owner.address);
            const { req, signature } = yield buildExecuteParams('reset(uint256)', [tokenId], owner, tokenId);
            yield forwarder.execute(req, signature);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(false);
        }));
    });
    describe('execute', () => {
        it('should execute `reset` records', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foo__1', owner.address);
            yield resolver.set('k', 'v', tokenId);
            (0, chai_1.expect)(yield resolver.get('k', tokenId)).to.be.equal('v');
            const { req, signature } = yield buildExecuteParams('reset(uint256)', [tokenId], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
            yield forwarder.execute(req, signature);
            (0, chai_1.expect)(yield resolver.get('k', tokenId)).to.be.equal('');
        }));
        it('should execute `set` records', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foo__2', owner.address);
            const { req, signature } = yield buildExecuteParams('set(string,string,uint256)', ['k', 'v', tokenId], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
            yield forwarder.execute(req, signature);
            (0, chai_1.expect)(yield resolver.get('k', tokenId)).to.be.equal('v');
        }));
        it('should execute `setMany` records', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foo__3', owner.address);
            const { req, signature } = yield buildExecuteParams('setMany(string[],string[],uint256)', [['k1', 'k2'], ['v1', 'v2'], tokenId], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
            yield forwarder.execute(req, signature);
            (0, chai_1.expect)(yield resolver.get('k1', tokenId)).to.be.equal('v1');
        }));
        it('should execute `reconfigure` records', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foo__4', owner.address);
            yield resolver.set('k1', 'v1', tokenId);
            (0, chai_1.expect)(yield resolver.get('k1', tokenId)).to.be.equal('v1');
            const { req, signature } = yield buildExecuteParams('reconfigure(string[],string[],uint256)', [['k2'], ['v2'], tokenId], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
            yield forwarder.execute(req, signature);
            (0, chai_1.expect)(yield resolver.get('k1', tokenId)).to.be.equal('');
            (0, chai_1.expect)(yield resolver.get('k2', tokenId)).to.be.equal('v2');
        }));
    });
});
