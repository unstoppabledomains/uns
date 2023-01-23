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
const metatx_1 = require("../../types/factories/contracts/metatx");
const contracts_1 = require("../../types/factories/dot-crypto/contracts");
const controllers_1 = require("../../types/factories/dot-crypto/contracts/controllers");
const constants_1 = require("../helpers/constants");
const metatx_2 = require("../helpers/metatx");
describe('CNSRegistry (consumption)', () => {
    let forwarder, registry, mintingController, signatureController;
    let signers, owner, receiver, spender;
    let buildExecuteParams;
    const mintDomain = (label, owner) => __awaiter(void 0, void 0, void 0, function* () {
        yield mintingController.mintSLD(owner, label);
        return yield registry.childIdOf(constants_1.TLD.CRYPTO, label);
    });
    function percDiff(a, b) {
        return -((a - b) / a) * 100;
    }
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [owner, receiver, spender] = signers;
        registry = yield new contracts_1.CNSRegistry__factory(owner).deploy();
        mintingController = yield new controllers_1.MintingController__factory(owner).deploy(registry.address);
        signatureController = yield new controllers_1.SignatureController__factory(owner).deploy(registry.address);
        yield registry.addController(mintingController.address);
        yield registry.addController(signatureController.address);
        forwarder = yield new metatx_1.CNSRegistryForwarder__factory(owner).deploy(signatureController.address);
        buildExecuteParams = (0, metatx_2.buildExecuteFunc)(registry.interface, signatureController.address, forwarder);
    }));
    it('`transferFrom` consumption', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = [];
        const label = 'cons-d1-';
        const tokenId = yield mintDomain(label, owner.address);
        const directTx = yield registry
            .connect(owner)
            .transferFrom(owner.address, receiver.address, tokenId);
        const directTxReceipt = yield directTx.wait();
        const tokenIdFor = yield mintDomain(label + 'for', owner.address);
        const dataFor = registry.interface.encodeFunctionData('transferFrom', [
            owner.address,
            receiver.address,
            tokenIdFor,
        ]);
        const nonceFor = yield signatureController.nonceOf(tokenIdFor);
        const signatureFor = yield (0, metatx_2.sign)(dataFor, signatureController.address, nonceFor, owner);
        const forTx = yield signatureController
            .connect(spender)
            .transferFromFor(owner.address, receiver.address, tokenIdFor, signatureFor);
        const forTxReceipt = yield forTx.wait();
        const tokenIdForward = yield mintDomain(label + 'forward', owner.address);
        const { req, signature } = yield buildExecuteParams('transferFrom(address,address,uint256)', [owner.address, receiver.address, tokenIdForward], owner, tokenIdForward);
        const forwardTx = yield forwarder.connect(spender).execute(req, signature);
        const forwardTxReceipt = yield forwardTx.wait();
        result.push({
            selector: 'transferFrom(address,address,uint256)',
            directTx: directTxReceipt.gasUsed.toString(),
            forTx: forTxReceipt.gasUsed.toString(),
            diff1: percDiff(directTxReceipt.gasUsed.toNumber(), forTxReceipt.gasUsed.toNumber()).toFixed(2) + ' %',
            forwardTx: forwardTxReceipt.gasUsed.toString(),
            diff2: percDiff(forTxReceipt.gasUsed.toNumber(), forwardTxReceipt.gasUsed.toNumber()).toFixed(2) + ' %',
        });
        console.table(result);
    }));
});
