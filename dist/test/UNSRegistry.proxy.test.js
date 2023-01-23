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
const contracts_1 = require("../types/factories/contracts");
const registry_1 = require("./helpers/registry");
const constants_1 = require("./helpers/constants");
const metatx_1 = require("./helpers/metatx");
describe('UNSRegistry (proxy)', () => {
    let unsRegistry;
    let unsRegistryFactory;
    let buildExecuteParams;
    let signers, owner, receiver;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [owner, receiver] = signers;
        unsRegistryFactory = new contracts_1.UNSRegistry__factory(owner);
        unsRegistry = (yield hardhat_1.upgrades.deployProxy(unsRegistryFactory, [owner.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS], {
            initializer: 'initialize',
        }));
        yield unsRegistry.mintTLD(constants_1.TLD.CRYPTO, 'crypto');
        yield unsRegistry.setTokenURIPrefix('/');
        buildExecuteParams = (0, metatx_1.buildExecuteFunc)(unsRegistry.interface, unsRegistry.address, unsRegistry);
    }));
    describe('Registry', () => {
        it('should construct itself correctly', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, chai_1.expect)(constants_1.TLD.CRYPTO).to.be.equal('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');
        }));
        it('should resolve properly', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner.address, ['resolution', 'crypto']);
            yield unsRegistry.burn(tokenId);
            yield (0, registry_1.mintDomain)(unsRegistry, owner.address, ['resolution', 'crypto']);
            yield unsRegistry.transferFrom(owner.address, receiver.address, tokenId);
        }));
        it('should set URI prefix', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = constants_1.TLD.CRYPTO;
            (0, chai_1.expect)(yield unsRegistry.tokenURI(tokenId)).to.be.equal(`/${tokenId}`);
            yield unsRegistry.setTokenURIPrefix('prefix-');
            (0, chai_1.expect)(yield unsRegistry.tokenURI(tokenId)).to.be.equal(`prefix-${tokenId}`);
            yield unsRegistry.setTokenURIPrefix('/');
            (0, chai_1.expect)(yield unsRegistry.tokenURI(tokenId)).to.be.equal(`/${tokenId}`);
        }));
    });
    describe('Resolver', () => {
        it('should resolve tokens', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield unsRegistry.namehash(['label_931', 'crypto']);
            yield (0, chai_1.expect)(unsRegistry.set('key', 'value', tokenId)).to.be.revertedWith('ERC721: invalid token ID');
            yield (0, registry_1.mintDomain)(unsRegistry, owner.address, ['label_931', 'crypto']);
            yield unsRegistry.set('key', 'value', tokenId);
            (0, chai_1.expect)(yield unsRegistry.get('key', tokenId)).to.be.equal('value');
            yield unsRegistry.setMany(['key1'], ['value1'], tokenId);
            yield unsRegistry.setMany(['key2', 'key3'], ['value2', 'value3'], tokenId);
            yield unsRegistry.setMany(['key4', 'key5', 'key6'], ['value4', 'value5', 'value6'], tokenId);
            (0, chai_1.expect)(yield unsRegistry.getMany(['key1', 'key2', 'key3', 'key4', 'key5', 'key6'], tokenId)).to.be.eql(['value1', 'value2', 'value3', 'value4', 'value5', 'value6']);
            yield (0, chai_1.expect)(unsRegistry.reset(tokenId))
                .to.emit(unsRegistry, 'ResetRecords')
                .withArgs(tokenId.toString());
            yield (0, chai_1.expect)(unsRegistry.connect(signers[1]).set('key', 'value', tokenId)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
        }));
        it('should get key by hash', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner.address, ['heyhash', 'crypto']);
            const expectedKey = 'new-hashed-key';
            yield unsRegistry.set(expectedKey, 'value', tokenId);
            const keyFromHash = yield unsRegistry.getKey(ethers_1.BigNumber.from(ethers_1.utils.id(expectedKey)));
            (0, chai_1.expect)(keyFromHash).to.be.equal(expectedKey);
        }));
        it('should get many keys by hashes', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner.address, ['heyhash-many', 'crypto']);
            const expectedKeys = ['keyhash-many-1', 'keyhash-many-2'];
            yield unsRegistry.setMany(expectedKeys, ['value', 'value'], tokenId);
            const expectedKeyHashes = expectedKeys.map((key) => ethers_1.BigNumber.from(ethers_1.utils.id(key)));
            const keysFromHashes = yield unsRegistry.getKeys(expectedKeyHashes);
            (0, chai_1.expect)(keysFromHashes).to.be.eql(expectedKeys);
        }));
        it('should not consume additional gas if key hash was set before', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner.address, ['heyhash-gas', 'crypto']);
            const newKeyHashTx = yield unsRegistry.set('keyhash-gas', 'value', tokenId);
            const newKeyHashTxReceipt = yield newKeyHashTx.wait();
            const exitsKeyHashTx = yield unsRegistry.set('keyhash-gas', 'value', tokenId);
            const exitsKeyHashTxReceipt = yield exitsKeyHashTx.wait();
            (0, chai_1.expect)(newKeyHashTxReceipt.gasUsed).to.be.above(exitsKeyHashTxReceipt.gasUsed);
            const newKeyHashTx2 = yield unsRegistry.setMany(['keyhash-gas-1', 'keyhash-gas-2'], ['value-1', 'value-2'], tokenId);
            const newKeyHashTxReceipt2 = yield newKeyHashTx2.wait();
            const exitsKeyHashTx2 = yield unsRegistry.setMany(['keyhash-gas-1', 'keyhash-gas-2'], ['value-1', 'value-2'], tokenId);
            const exitsKeyHashTxReceipt2 = yield exitsKeyHashTx2.wait();
            (0, chai_1.expect)(newKeyHashTxReceipt2.gasUsed).to.be.above(exitsKeyHashTxReceipt2.gasUsed);
            const newKeyHashTx3 = yield unsRegistry.setMany(['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'], ['value-1', 'value-2', 'value-3'], tokenId);
            const newKeyHashTxReceipt3 = yield newKeyHashTx3.wait();
            const exitsKeyHashTx3 = yield unsRegistry.setMany(['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'], ['value-1', 'value-2', 'value-3'], tokenId);
            const exitsKeyHashTxReceipt3 = yield exitsKeyHashTx3.wait();
            (0, chai_1.expect)(newKeyHashTxReceipt3.gasUsed).to.be.above(exitsKeyHashTxReceipt3.gasUsed);
        }));
        it('should get value by key hash', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner.address, ['get-key-by-hash', 'crypto']);
            const key = 'get-key-by-hash-key';
            const expectedValue = 'get-key-by-hash-value';
            yield unsRegistry.set(key, expectedValue, tokenId);
            const result = yield unsRegistry.getByHash(ethers_1.utils.id(key), tokenId);
            (0, chai_1.expect)(result.value).to.be.equal(expectedValue);
            (0, chai_1.expect)(result.key).to.be.equal(key);
        }));
        it('should get multiple values by hashes', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner.address, ['get-many-keys-by-hash', 'crypto']);
            const keys = ['key-to-hash-1', 'key-to-hash-2'];
            const expectedValues = ['value-42', 'value-43'];
            yield unsRegistry.setMany(keys, expectedValues, tokenId);
            const hashedKeys = keys.map((key) => ethers_1.BigNumber.from(ethers_1.utils.id(key)));
            const result = yield unsRegistry.getManyByHash(hashedKeys, tokenId);
            (0, chai_1.expect)(result).to.be.eql([keys, expectedValues]);
        }));
        it('should emit NewKey event new keys added', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner.address, ['new-key', 'crypto']);
            const key = 'new-key';
            const value = 'value';
            yield (0, chai_1.expect)(unsRegistry.set(key, value, tokenId))
                .to.emit(unsRegistry, 'NewKey')
                .withArgs(tokenId, ethers_1.utils.id(key), key);
            yield (0, chai_1.expect)(unsRegistry.set(key, value, tokenId)).not.to.emit(unsRegistry, 'NewKey');
        }));
        it('should emit correct Set event', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner.address, ['check-set-event', 'crypto']);
            const key = 'new-key';
            const value = 'value';
            yield (0, chai_1.expect)(unsRegistry.set(key, value, tokenId))
                .to.emit(unsRegistry, 'Set')
                .withArgs(tokenId, ethers_1.utils.id(key), ethers_1.utils.id(value), key, value);
        }));
        it('should reconfigure resolver with new values', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner.address, ['reconfigure', 'crypto']);
            yield unsRegistry.set('old-key', 'old-value', tokenId);
            yield unsRegistry.reconfigure(['new-key'], ['new-value'], tokenId);
            (0, chai_1.expect)(yield unsRegistry.get('old-key', tokenId)).to.be.equal('');
            (0, chai_1.expect)(yield unsRegistry.get('new-key', tokenId)).to.be.equal('new-value');
            yield (0, chai_1.expect)(unsRegistry
                .connect(signers[1])
                .reconfigure(['new-key'], ['new-value'], tokenId)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
        }));
        it('should keep forwarding storage layout consistent after upgrade', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner.address, ['up_state_domain_2', 'crypto']);
            (0, chai_1.expect)(yield unsRegistry.nonceOf(tokenId)).to.be.equal(0);
            const params1 = yield buildExecuteParams('transferFrom(address,address,uint256)', [owner.address, receiver.address, tokenId], owner, tokenId);
            yield unsRegistry.execute(params1.req, params1.signature);
            (0, chai_1.expect)(yield unsRegistry.nonceOf(tokenId)).to.be.equal(1);
            unsRegistry = (yield hardhat_1.upgrades.upgradeProxy(unsRegistry.address, unsRegistryFactory));
            (0, chai_1.expect)(yield unsRegistry.nonceOf(tokenId)).to.be.equal(1);
            const params2 = yield buildExecuteParams('transferFrom(address,address,uint256)', [receiver.address, owner.address, tokenId], receiver, tokenId);
            yield unsRegistry.execute(params2.req, params2.signature);
            (0, chai_1.expect)(yield unsRegistry.nonceOf(tokenId)).to.be.equal(2);
        }));
    });
});
