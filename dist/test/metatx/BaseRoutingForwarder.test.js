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
describe('BaseRoutingForwarder', () => {
    let forwarder, registry, mintingController, signatureController;
    let signers, owner, receiver;
    const mintDomain = (label, owner) => __awaiter(void 0, void 0, void 0, function* () {
        yield mintingController.mintSLD(owner, label);
        return yield registry.childIdOf(constants_1.TLD.CRYPTO, label);
    });
    let buildExecuteParams, buildExecuteRoutingParams;
    const buildTransfer = (from, toAddress, tokenId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield buildExecuteParams('transferFrom(address,address,uint256)', [from.address, toAddress, tokenId], from, tokenId);
    });
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [owner, receiver] = signers;
        const BaseRoutingForwarder = yield hardhat_1.ethers.getContractFactory('BaseRoutingForwarderMock');
        registry = yield new contracts_1.CNSRegistry__factory(owner).deploy();
        mintingController = yield new controllers_1.MintingController__factory(owner).deploy(registry.address);
        signatureController = yield new controllers_1.SignatureController__factory(owner).deploy(registry.address);
        yield registry.addController(mintingController.address);
        yield registry.addController(signatureController.address);
        forwarder = yield BaseRoutingForwarder.deploy();
        buildExecuteParams = (0, metatx_1.buildExecuteFunc)(registry.interface, signatureController.address, forwarder);
        buildExecuteRoutingParams = (0, metatx_1.buildExecuteFunc)(forwarder.interface, forwarder.address, forwarder);
    }));
    it('should build valid `transferFrom` route calldata', () => __awaiter(void 0, void 0, void 0, function* () {
        const tokenId = yield registry.childIdOf(constants_1.TLD.CRYPTO, 'test_foob_1');
        const { req, signature } = yield buildTransfer(owner, receiver.address, tokenId);
        const expectedData = signatureController.interface.encodeFunctionData('transferFromFor', [owner.address, receiver.address, tokenId, signature]);
        const calldata = yield forwarder.callStatic.buildRouteData(req, signature);
        (0, chai_1.expect)(calldata).to.be.equal(expectedData);
    }));
    it('should build valid `putString(string)` route calldata', () => __awaiter(void 0, void 0, void 0, function* () {
        const tokenId = yield registry.childIdOf(constants_1.TLD.CRYPTO, 'test_foob_3');
        const { req, signature } = yield buildExecuteRoutingParams('putString(string)', ['vv'], owner, tokenId);
        const expectedData = forwarder.interface.encodeFunctionData('putStringFor(string,bytes)', ['vv', signature]);
        const calldata = yield forwarder.callStatic.buildRouteData(req, signature);
        (0, chai_1.expect)(calldata).to.be.equal(expectedData);
    }));
    it('should build valid `putUint(uint)` route calldata', () => __awaiter(void 0, void 0, void 0, function* () {
        const tokenId = yield registry.childIdOf(constants_1.TLD.CRYPTO, 'test_foob_4');
        const { req, signature } = yield buildExecuteRoutingParams('putUint(uint256)', [1], owner, tokenId);
        const expectedData = forwarder.interface.encodeFunctionData('putUintFor(uint256,bytes)', [1, signature]);
        const calldata = yield forwarder.callStatic.buildRouteData(req, signature);
        (0, chai_1.expect)(calldata).to.be.equal(expectedData);
    }));
    it('should build valid `putUintArr(uint256[])` route calldata', () => __awaiter(void 0, void 0, void 0, function* () {
        const tokenId = yield registry.childIdOf(constants_1.TLD.CRYPTO, 'test_foob_5');
        const { req, signature } = yield buildExecuteRoutingParams('putUintArr(uint256[])', [[1, 2]], owner, tokenId);
        const expectedData = forwarder.interface.encodeFunctionData('putUintArrFor(uint256[],bytes)', [[1, 2], signature]);
        const calldata = yield forwarder.callStatic.buildRouteData(req, signature);
        (0, chai_1.expect)(calldata).to.be.equal(expectedData);
    }));
    it('should revert when unknown function call', () => __awaiter(void 0, void 0, void 0, function* () {
        const tokenId = yield mintDomain('test_foob_2', owner.address);
        const data = registry.interface.encodeFunctionData('setOwner', [
            receiver.address,
            tokenId,
        ]);
        const nonce = yield forwarder.nonceOf(tokenId);
        const signature = yield (0, metatx_1.sign)(data, signatureController.address, nonce, owner);
        const req = { from: owner.address, nonce, tokenId, data };
        yield (0, chai_1.expect)(forwarder.callStatic.buildRouteData(req, signature)).to.be.revertedWith('RoutingForwarder: ROUTE_UNKNOWN');
    }));
});
