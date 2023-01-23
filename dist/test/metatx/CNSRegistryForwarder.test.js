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
describe('CNSRegistryForwarder', () => {
    let forwarder, registry, mintingController, signatureController, resolver;
    let signers, owner, receiver;
    let buildExecuteParams;
    const mintDomain = (label, owner) => __awaiter(void 0, void 0, void 0, function* () {
        yield mintingController.mintSLD(owner, label);
        return yield registry.childIdOf(constants_1.TLD.CRYPTO, label);
    });
    const buildTransfer = (from, toAddress, tokenId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield buildExecuteParams('transferFrom(address,address,uint256)', [from.address, toAddress, tokenId], from, tokenId);
    });
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [owner, receiver] = signers;
        registry = yield new contracts_1.CNSRegistry__factory(owner).deploy();
        mintingController = yield new controllers_1.MintingController__factory(owner).deploy(registry.address);
        signatureController = yield new controllers_1.SignatureController__factory(owner).deploy(registry.address);
        resolver = yield new contracts_1.Resolver__factory(owner).deploy(registry.address, mintingController.address);
        yield registry.addController(mintingController.address);
        yield registry.addController(signatureController.address);
        forwarder = yield new metatx_2.CNSRegistryForwarder__factory(owner).deploy(signatureController.address);
        buildExecuteParams = (0, metatx_1.buildExecuteFunc)(registry.interface, signatureController.address, forwarder);
    }));
    describe('nonceOf', () => {
        it('should match nonces', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foon', owner.address);
            let nonceF = yield forwarder.nonceOf(tokenId);
            let nonceS = yield signatureController.nonceOf(tokenId);
            (0, chai_1.expect)(nonceF).to.be.equal(0);
            (0, chai_1.expect)(nonceF).to.be.equal(nonceS);
            const { req, signature } = yield buildTransfer(owner, receiver.address, tokenId);
            yield forwarder.execute(req, signature);
            nonceF = yield forwarder.nonceOf(tokenId);
            nonceS = yield signatureController.nonceOf(tokenId);
            (0, chai_1.expect)(nonceF).to.be.equal(1);
            (0, chai_1.expect)(nonceF).to.be.equal(nonceS);
        }));
    });
    describe('verify', () => {
        it('should verify successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foo_10', owner.address);
            const { req, signature } = yield buildTransfer(owner, receiver.address, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
        }));
        it('should fail verification when unknown function call', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foo_13', owner.address);
            const { req, signature } = yield buildExecuteParams('setOwner(address,uint256)', [receiver.address, tokenId], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(false);
        }));
        it('should fail verification when nonce is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foo_14', owner.address);
            const { req, signature } = yield buildTransfer(owner, receiver.address, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(Object.assign(Object.assign({}, req), { nonce: 100 }), signature)).to.be.equal(false);
        }));
        it('should fail verification when signature used', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_foo_15', owner.address);
            const { req, signature } = yield buildTransfer(owner, receiver.address, tokenId);
            yield forwarder.execute(req, signature);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(false);
        }));
    });
    describe('execute', () => {
        it('should execute `transferFrom` for token', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_goo__1', owner.address);
            const { req, signature } = yield buildTransfer(owner, receiver.address, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
            yield forwarder.execute(req, signature);
            (0, chai_1.expect)(yield registry.ownerOf(tokenId)).to.be.equal(receiver.address);
        }));
        it('should execute `safeTransferFrom` for token', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_goo__2', owner.address);
            const { req, signature } = yield buildExecuteParams('safeTransferFrom(address,address,uint256)', [owner.address, receiver.address, tokenId], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
            yield forwarder.execute(req, signature);
            (0, chai_1.expect)(yield registry.ownerOf(tokenId)).to.be.equal(receiver.address);
        }));
        it('should execute `safeTransferFrom(bytes)` for token', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_goo__3', owner.address);
            const { req, signature } = yield buildExecuteParams('safeTransferFrom(address,address,uint256,bytes)', [owner.address, receiver.address, tokenId, '0x'], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
            yield forwarder.execute(req, signature);
            (0, chai_1.expect)(yield registry.ownerOf(tokenId)).to.be.equal(receiver.address);
        }));
        it('should execute `burn` for token', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_goo__4', owner.address);
            const { req, signature } = yield buildExecuteParams('burn(uint256)', [tokenId], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
            yield forwarder.execute(req, signature);
            yield (0, chai_1.expect)(registry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
        }));
        it('should execute `mintChild` for token', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_goo__5', owner.address);
            const { req, signature } = yield buildExecuteParams('mintChild(address,uint256,string)', [receiver.address, tokenId, 'test'], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
            yield forwarder.execute(req, signature);
            const childTokenId = yield registry.childIdOf(tokenId, 'test');
            (0, chai_1.expect)(yield registry.ownerOf(childTokenId)).to.be.equal(receiver.address);
        }));
        it('should execute `safeMintChild` for token', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_goo__6', owner.address);
            const { req, signature } = yield buildExecuteParams('safeMintChild(address,uint256,string)', [receiver.address, tokenId, 'test'], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
            yield forwarder.execute(req, signature);
            const childTokenId = yield registry.childIdOf(tokenId, 'test');
            (0, chai_1.expect)(yield registry.ownerOf(childTokenId)).to.be.equal(receiver.address);
        }));
        it('should execute `safeMintChild(bytes)` for token', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_goo__7', owner.address);
            const { req, signature } = yield buildExecuteParams('safeMintChild(address,uint256,string,bytes)', [receiver.address, tokenId, 'test', '0x'], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
            yield forwarder.execute(req, signature);
            const childTokenId = yield registry.childIdOf(tokenId, 'test');
            (0, chai_1.expect)(yield registry.ownerOf(childTokenId)).to.be.equal(receiver.address);
        }));
        it('should execute `transferFromChild` for token', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_goo__8', owner.address);
            yield registry.mintChild(owner.address, tokenId, 'test');
            const childTokenId = yield registry.childIdOf(tokenId, 'test');
            (0, chai_1.expect)(yield registry.ownerOf(childTokenId)).to.be.equal(owner.address);
            const { req, signature } = yield buildExecuteParams('transferFromChild(address,address,uint256,string)', [owner.address, receiver.address, tokenId, 'test'], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
            yield forwarder.execute(req, signature);
            (0, chai_1.expect)(yield registry.ownerOf(childTokenId)).to.be.equal(receiver.address);
        }));
        it('should execute `safeTransferFromChild` for token', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_goo__9', owner.address);
            yield registry.mintChild(owner.address, tokenId, 'test');
            const childTokenId = yield registry.childIdOf(tokenId, 'test');
            (0, chai_1.expect)(yield registry.ownerOf(childTokenId)).to.be.equal(owner.address);
            const { req, signature } = yield buildExecuteParams('safeTransferFromChild(address,address,uint256,string)', [owner.address, receiver.address, tokenId, 'test'], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
            yield forwarder.execute(req, signature);
            (0, chai_1.expect)(yield registry.ownerOf(childTokenId)).to.be.equal(receiver.address);
        }));
        it('should execute `safeTransferFromChild(bytes)` for token', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_goo__10', owner.address);
            yield registry.mintChild(owner.address, tokenId, 'test');
            const childTokenId = yield registry.childIdOf(tokenId, 'test');
            (0, chai_1.expect)(yield registry.ownerOf(childTokenId)).to.be.equal(owner.address);
            const { req, signature } = yield buildExecuteParams('safeTransferFromChild(address,address,uint256,string,bytes)', [owner.address, receiver.address, tokenId, 'test', '0x'], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
            yield forwarder.execute(req, signature);
            (0, chai_1.expect)(yield registry.ownerOf(childTokenId)).to.be.equal(receiver.address);
        }));
        it('should execute `burnChild` for token', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_goo__11', owner.address);
            yield registry.mintChild(owner.address, tokenId, 'test');
            const childTokenId = yield registry.childIdOf(tokenId, 'test');
            (0, chai_1.expect)(yield registry.ownerOf(childTokenId)).to.be.equal(owner.address);
            const { req, signature } = yield buildExecuteParams('burnChild(uint256,string)', [tokenId, 'test'], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
            yield forwarder.execute(req, signature);
            yield (0, chai_1.expect)(registry.ownerOf(childTokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
            (0, chai_1.expect)(yield registry.ownerOf(tokenId)).to.be.equal(owner.address);
        }));
        it('should execute `resolveTo` for token', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomain('test_goo__12', owner.address);
            yield (0, chai_1.expect)(registry.resolverOf(tokenId)).to.be.revertedWith('');
            const { req, signature } = yield buildExecuteParams('resolveTo(address,uint256)', [resolver.address, tokenId], owner, tokenId);
            (0, chai_1.expect)(yield forwarder.verify(req, signature)).to.be.equal(true);
            yield forwarder.execute(req, signature);
            (0, chai_1.expect)(yield registry.resolverOf(tokenId)).to.be.equal(resolver.address);
        }));
    });
});
