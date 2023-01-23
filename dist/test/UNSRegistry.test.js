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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const chai_1 = require("chai");
const eth_ens_namehash_1 = __importDefault(require("eth-ens-namehash"));
const ethers_1 = require("ethers");
const contracts_1 = require("../types/factories/contracts");
const mocks_1 = require("../types/factories/contracts/mocks");
const constants_1 = require("./helpers/constants");
const registry_1 = require("./helpers/registry");
describe('UNSRegistry', () => {
    let unsRegistry;
    let unsRegistryMock;
    let signers, coinbase, owner, reader, receiver, accounts;
    const root = constants_1.TLD.CRYPTO;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [coinbase, owner, reader, receiver] = signers;
        [, ...accounts] = signers.map((s) => s.address);
        unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
        yield unsRegistry.initialize(coinbase.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
        yield unsRegistry.mintTLD(root, 'crypto');
        yield unsRegistry.setTokenURIPrefix('/');
        yield unsRegistry.addProxyReader(reader.address);
        unsRegistryMock = yield new mocks_1.UNSRegistryMock__factory(coinbase).deploy();
        yield unsRegistryMock.initialize(coinbase.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
        yield unsRegistryMock.mintTLD(root, 'crypto');
        yield unsRegistryMock.setTokenURIPrefix('/');
        yield unsRegistryMock.addProxyReader(reader.address);
    }));
    describe('General', () => {
        it('should return zero root', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, chai_1.expect)(yield unsRegistry.root()).to.be.equal(0);
        }));
        it('should resolve properly', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, ['resolution', 'crypto']);
            (0, chai_1.expect)(yield unsRegistry.resolverOf(tokenId)).to.be.equal(unsRegistry.address);
            yield unsRegistry.burn(tokenId);
            (0, chai_1.expect)(yield unsRegistry.resolverOf(tokenId)).to.be.equal(constants_1.ZERO_ADDRESS);
            yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, ['resolution', 'crypto']);
            (0, chai_1.expect)(yield unsRegistry.resolverOf(tokenId)).to.be.equal(unsRegistry.address);
        }));
        it('should set URI prefix', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, chai_1.expect)(yield unsRegistry.tokenURI(root)).to.be.equal(`/${root}`);
            yield unsRegistry.setTokenURIPrefix('prefix-');
            (0, chai_1.expect)(yield unsRegistry.tokenURI(root)).to.be.equal(`prefix-${root}`);
            yield unsRegistry.setTokenURIPrefix('/');
            (0, chai_1.expect)(yield unsRegistry.tokenURI(root)).to.be.equal(`/${root}`);
        }));
        it('should emit Transfer event on set owner', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistry, coinbase.address, 'crypto');
            yield unsRegistry.set('key_82', 'value_23', tokenId);
            (0, chai_1.expect)(yield unsRegistry.get('key_82', tokenId)).to.be.equal('value_23');
            yield (0, chai_1.expect)(unsRegistry.setOwner(receiver.address, tokenId))
                .to.emit(unsRegistry, 'Transfer')
                .withArgs(coinbase.address, receiver.address, tokenId);
            (0, chai_1.expect)(yield unsRegistry.get('key_82', tokenId)).to.be.equal('value_23');
        }));
        for (const key of Object.keys(constants_1.TLD)) {
            it(`should be possible to mint .${key} domain`, () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, [`mint-${key}`, key]);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
            }));
        }
        describe('namehash', () => {
            it('should return valid namehash', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield unsRegistry.namehash(['12ew3', 'crypto']);
                (0, chai_1.expect)(tokenId).to.be.equal(eth_ens_namehash_1.default.hash('12ew3.crypto'));
            }));
            it('should revert when childId lable is empty', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(unsRegistry.namehash(['', 'crypto'])).to.be.revertedWith('Registry: LABEL_EMPTY');
            }));
        });
        describe('exists', () => {
            it('should return true when token exists', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistry, coinbase.address, 'crypto');
                (0, chai_1.expect)(yield unsRegistry.exists(tokenId)).to.be.equal(true);
            }));
            it('should return false when token exists', () => __awaiter(void 0, void 0, void 0, function* () {
                const tok = yield unsRegistry.namehash(['token_doesnt_exists_1094u', 'crypto']);
                (0, chai_1.expect)(yield unsRegistry.exists(tok)).to.be.equal(false);
            }));
        });
        describe('supportsInterface', () => {
            it('should support IERC165Upgradeable interface', () => __awaiter(void 0, void 0, void 0, function* () {
                (0, chai_1.expect)(yield unsRegistry.supportsInterface('0x01ffc9a7')).to.be.equal(true);
            }));
            it('should support IERC721Upgradeable interface', () => __awaiter(void 0, void 0, void 0, function* () {
                (0, chai_1.expect)(yield unsRegistry.supportsInterface('0x80ac58cd')).to.be.equal(true);
            }));
            it('should support IERC721MetadataUpgradeable interface', () => __awaiter(void 0, void 0, void 0, function* () {
                (0, chai_1.expect)(yield unsRegistry.supportsInterface('0x5b5e139f')).to.be.equal(true);
            }));
            it('should not support random interface', () => __awaiter(void 0, void 0, void 0, function* () {
                (0, chai_1.expect)(yield unsRegistry.supportsInterface('0x01010101')).to.be.equal(false);
            }));
        });
        it('should have right metadata', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, chai_1.expect)(yield unsRegistry.name()).to.be.eql('Unstoppable Domains');
            (0, chai_1.expect)(yield unsRegistry.symbol()).to.be.eql('UD');
        }));
        describe('burn', () => {
            let tokenId;
            beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
                tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistry, coinbase.address, 'crypto');
            }));
            it('should burn the domain', () => __awaiter(void 0, void 0, void 0, function* () {
                (0, chai_1.expect)(yield unsRegistry.exists(tokenId)).to.be.equal(true);
                yield unsRegistry.burn(tokenId);
                (0, chai_1.expect)(yield unsRegistry.exists(tokenId)).to.be.equal(false);
            }));
            it('should revert if not owner', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(unsRegistry.connect(signers[1]).burn(tokenId)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
            }));
            it('should reset records on burn', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, ['token-to-burn', 'crypto']);
                yield unsRegistry.set('key_31', 'value_23', tokenId);
                (0, chai_1.expect)(yield unsRegistry.get('key_31', tokenId)).to.be.equal('value_23');
                yield (0, chai_1.expect)(unsRegistry.burn(tokenId)).to.emit(unsRegistry, 'ResetRecords').withArgs(tokenId);
                (0, chai_1.expect)(yield unsRegistry.get('key_31', tokenId)).to.be.equal('');
                yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, ['token-to-burn', 'crypto']);
                (0, chai_1.expect)(yield unsRegistry.get('key_31', tokenId)).to.be.equal('');
            }));
            it('should revert if tokenId is upgraded', () => __awaiter(void 0, void 0, void 0, function* () {
                tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistryMock, coinbase.address, 'crypto');
                yield unsRegistryMock.upgradeAll([tokenId]);
                yield (0, chai_1.expect)(unsRegistryMock.burn(tokenId)).to.be.revertedWith('Registry: TOKEN_UPGRADED');
            }));
        });
    });
    describe('Registry (minting)', () => {
        describe('mintWithRecords(address,string[],string[],string[],bool)', () => __awaiter(void 0, void 0, void 0, function* () {
            it('should mint domain with no records', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase, ['label_12324_2', 'crypto']);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
            }));
            it('should mint domain with record', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, ['label_38f6', 'crypto'], false, ['key_1'], ['value_1']);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
                (0, chai_1.expect)(yield unsRegistry.get('key_1', tokenId)).to.be.eql('value_1');
            }));
            it('should mint subdomain', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = ['label_38g', 'crypto'];
                yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, labels);
                labels.unshift('sub');
                const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, labels);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
            }));
            it('should produce NewURI event', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = ['label_38f7', 'crypto'];
                const tokenId = yield unsRegistry.namehash(labels);
                yield (0, chai_1.expect)(unsRegistry.mintWithRecords(coinbase.address, labels, ['key1'], ['42'], true)).to.emit(unsRegistry, 'NewURI')
                    .withArgs(tokenId, 'label_38f7.crypto');
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
            }));
            it('should not allow minting subdomain if not minting manager', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = ['label_38qwe', 'crypto'];
                yield (0, registry_1.mintDomain)(unsRegistry, owner, labels);
                labels.unshift('sub');
                const _registry = unsRegistry.connect(owner);
                yield (0, chai_1.expect)((0, registry_1.mintDomain)(_registry, owner, labels)).to.be.revertedWith('Registry: SENDER_IS_NOT_MINTING_MANAGER');
            }));
        }));
        describe('unlockWithRecords(address,uint256,string[],string[],bool)', () => __awaiter(void 0, void 0, void 0, function* () {
            it('should properly unlock domain and set new records without reverse', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase, ['label_12324_unlock2', 'crypto'], true, ['key'], ['value']);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
                (0, chai_1.expect)(yield unsRegistry.get('key', tokenId)).to.be.equal('value');
                yield unsRegistry.connect(coinbase).unlockWithRecords(receiver.address, tokenId, ['new-key'], ['new-value'], false);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
                (0, chai_1.expect)(yield unsRegistry.get('new-key', tokenId)).to.be.equal('new-value');
                (0, chai_1.expect)(yield unsRegistry.reverseOf(receiver.address)).to.be.equal(0);
            }));
            it('should properly unlock domain and set new records with reverse', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase, ['label_12324_unlock3', 'crypto'], false, ['key'], ['value']);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
                (0, chai_1.expect)(yield unsRegistry.get('key', tokenId)).to.be.equal('value');
                yield unsRegistry.connect(coinbase).unlockWithRecords(receiver.address, tokenId, ['new-key'], ['new-value'], true);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
                (0, chai_1.expect)(yield unsRegistry.get('new-key', tokenId)).to.be.equal('new-value');
                (0, chai_1.expect)(yield unsRegistry.reverseOf(receiver.address)).to.be.equal(tokenId);
            }));
        }));
    });
    describe('Registry (ownership management)', () => {
        let tokenId;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistry, coinbase.address, 'crypto');
        }));
        describe('setOwner', () => {
            it('sets owner correctly', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.setOwner(owner.address, tokenId);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
            }));
            it('sets owner correctly even if token is upgraded', () => __awaiter(void 0, void 0, void 0, function* () {
                tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistryMock, coinbase.address, 'crypto');
                yield unsRegistryMock.upgradeAll([tokenId]);
                yield unsRegistryMock.setOwner(owner.address, tokenId);
                (0, chai_1.expect)(yield unsRegistryMock.ownerOf(tokenId)).to.be.equal(owner.address);
            }));
            it('produces ERC721 error when transfering upgraded token to zero address', () => __awaiter(void 0, void 0, void 0, function* () {
                tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistryMock, coinbase.address, 'crypto');
                yield unsRegistryMock.upgradeAll([tokenId]);
                yield (0, chai_1.expect)(unsRegistryMock.setOwner(constants_1.ZERO_ADDRESS, tokenId)).to.be.revertedWith('ERC721: transfer to the zero address');
            }));
            it('should not reset records on set owner', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.set('key_16', 'value_23', tokenId);
                (0, chai_1.expect)(yield unsRegistry.get('key_16', tokenId)).to.be.equal('value_23');
                yield (0, chai_1.expect)(unsRegistry.setOwner(owner.address, tokenId))
                    .to.not.emit(unsRegistry, 'ResetRecords')
                    .withArgs(tokenId);
                (0, chai_1.expect)(yield unsRegistry.get('key_16', tokenId)).to.be.equal('value_23');
            }));
        });
        describe('transferFrom', () => {
            it('transfers domain correctly', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.transferFrom(coinbase.address, owner.address, tokenId);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
            }));
            it('transfers domain correctly even if token is upgraded', () => __awaiter(void 0, void 0, void 0, function* () {
                tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistryMock, coinbase.address, 'crypto');
                yield unsRegistryMock.upgradeAll([tokenId]);
                yield unsRegistryMock.transferFrom(coinbase.address, owner.address, tokenId);
                (0, chai_1.expect)(yield unsRegistryMock.ownerOf(tokenId)).to.be.equal(owner.address);
            }));
            it('should reset records on transfer', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.set('key_23', 'value_23', tokenId);
                (0, chai_1.expect)(yield unsRegistry.get('key_23', tokenId)).to.be.equal('value_23');
                yield (0, chai_1.expect)(unsRegistry.transferFrom(coinbase.address, accounts[0], tokenId))
                    .to.emit(unsRegistry, 'ResetRecords')
                    .withArgs(tokenId);
                (0, chai_1.expect)(yield unsRegistry.get('key_23', tokenId)).to.be.equal('');
            }));
        });
        describe('safeTransferFrom(address,address,uint256)', () => {
            it('transfers domain correctly', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry['safeTransferFrom(address,address,uint256)'](coinbase.address, owner.address, tokenId);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
            }));
            it('transfers domain correctly even if token is upgraded', () => __awaiter(void 0, void 0, void 0, function* () {
                tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistryMock, coinbase.address, 'crypto');
                yield unsRegistryMock.upgradeAll([tokenId]);
                yield unsRegistryMock['safeTransferFrom(address,address,uint256)'](coinbase.address, owner.address, tokenId);
                (0, chai_1.expect)(yield unsRegistryMock.ownerOf(tokenId)).to.be.equal(owner.address);
            }));
            it('should reset records on safe transfer', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.set('key_12', 'value_23', tokenId);
                (0, chai_1.expect)(yield unsRegistry.get('key_12', tokenId)).to.be.equal('value_23');
                yield (0, chai_1.expect)(unsRegistry['safeTransferFrom(address,address,uint256)'](coinbase.address, accounts[0], tokenId))
                    .to.emit(unsRegistry, 'ResetRecords')
                    .withArgs(tokenId);
                (0, chai_1.expect)(yield unsRegistry.get('key_12', tokenId)).to.be.equal('');
            }));
        });
        describe('safeTransferFrom(address,address,uint256,bytes)', () => {
            it('transfers domain correctly', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry['safeTransferFrom(address,address,uint256,bytes)'](coinbase.address, owner.address, tokenId, '0x');
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
            }));
            it('transfers domain correctly even if token is upgraded', () => __awaiter(void 0, void 0, void 0, function* () {
                tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistryMock, coinbase.address, 'crypto');
                yield unsRegistryMock.upgradeAll([tokenId]);
                yield unsRegistryMock['safeTransferFrom(address,address,uint256,bytes)'](coinbase.address, owner.address, tokenId, '0x');
                (0, chai_1.expect)(yield unsRegistryMock.ownerOf(tokenId)).to.be.equal(owner.address);
            }));
            it('should reset records on safe transfer with data', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.set('key_12', 'value_23', tokenId);
                (0, chai_1.expect)(yield unsRegistry.get('key_12', tokenId)).to.be.equal('value_23');
                yield (0, chai_1.expect)(unsRegistry['safeTransferFrom(address,address,uint256,bytes)'](coinbase.address, accounts[0], tokenId, '0x'))
                    .to.emit(unsRegistry, 'ResetRecords')
                    .withArgs(tokenId);
                (0, chai_1.expect)(yield unsRegistry.get('key_12', tokenId)).to.be.equal('');
            }));
        });
    });
    describe('Registry (records management)', () => {
        const initializeKey = (key) => __awaiter(void 0, void 0, void 0, function* () {
            yield unsRegistry.addKey(key);
            return ethers_1.BigNumber.from(ethers_1.utils.id(key));
        });
        let tokenId;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistry, coinbase.address, 'crypto');
        }));
        describe('set & get', () => {
            it('should be able to set and resolve record', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.set('key', 'value', tokenId);
                (0, chai_1.expect)(yield unsRegistry.get('key', tokenId)).to.be.equal('value');
            }));
            it('should return empty value if token is upgraded and is being read from proxy reader', () => __awaiter(void 0, void 0, void 0, function* () {
                tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistryMock, coinbase.address, 'crypto');
                yield unsRegistryMock.upgradeAll([tokenId]);
                yield unsRegistryMock.set('key', 'value', tokenId);
                (0, chai_1.expect)(yield unsRegistryMock.connect(reader).get('key', tokenId)).to.equal('');
                (0, chai_1.expect)(yield unsRegistryMock.connect(coinbase).get('key', tokenId)).to.equal('value');
            }));
            it('should fail if not owner', () => __awaiter(void 0, void 0, void 0, function* () {
                tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistryMock, coinbase.address, 'crypto');
                yield (0, chai_1.expect)(unsRegistryMock.connect(signers[1]).set('key', 'value', tokenId)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
            }));
            it('should fail if token is not minted', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield unsRegistry.namehash(['some_invalid_label', 'crypto']);
                yield (0, chai_1.expect)(unsRegistry.set('key', 'value', tokenId)).to.be.revertedWith('ERC721: invalid token ID');
            }));
            it('should emit NewKey event new keys added', () => __awaiter(void 0, void 0, void 0, function* () {
                const key = 'new-key';
                const value = 'value';
                yield (0, chai_1.expect)(unsRegistry.set(key, value, tokenId))
                    .to.emit(unsRegistry, 'NewKey')
                    .withArgs(tokenId, ethers_1.utils.id(key), key);
                yield (0, chai_1.expect)(unsRegistry.set(key, value, tokenId)).not.to.emit(unsRegistry, 'NewKey');
            }));
            it('should emit correct Set event', () => __awaiter(void 0, void 0, void 0, function* () {
                const key = 'new-key';
                const value = 'value';
                yield (0, chai_1.expect)(unsRegistry.set(key, value, tokenId))
                    .to.emit(unsRegistry, 'Set')
                    .withArgs(tokenId, ethers_1.utils.id(key), ethers_1.utils.id(value), key, value);
            }));
        });
        describe('setMany & getMany', () => {
            it('should be able to set records multiple times and resolve them', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.setMany(['key1'], ['value1'], tokenId);
                yield unsRegistry.setMany(['key2', 'key3'], ['value2', 'value3'], tokenId);
                yield unsRegistry.setMany(['key4', 'key5', 'key6'], ['value4', 'value5', 'value6'], tokenId);
                (0, chai_1.expect)(yield unsRegistry.getMany(['key1', 'key2', 'key3', 'key4', 'key5', 'key6'], tokenId)).to.be.eql([
                    'value1',
                    'value2',
                    'value3',
                    'value4',
                    'value5',
                    'value6',
                ]);
            }));
            it('should return empty values if token is upgraded and is being read from proxy reader', () => __awaiter(void 0, void 0, void 0, function* () {
                tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistryMock, coinbase.address, 'crypto');
                yield unsRegistryMock.upgradeAll([tokenId]);
                yield unsRegistryMock.setMany(['key1', 'key2'], ['value1', 'value2'], tokenId);
                (0, chai_1.expect)(yield unsRegistryMock.connect(reader).getMany(['key1', 'key2'], tokenId)).to.deep.equal(['', '']);
                (0, chai_1.expect)(yield unsRegistryMock.connect(coinbase).getMany(['key1', 'key2'], tokenId)).to.deep.equal([
                    'value1',
                    'value2',
                ]);
            }));
            it('should fail on setMany if not owner', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(unsRegistry.connect(signers[1]).setMany(['key'], ['value'], tokenId)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
                (0, chai_1.expect)(yield unsRegistry.connect(signers[1]).getMany(['key'], tokenId)).to.be.deep.equal(['']);
            }));
        });
        describe('reset', () => {
            it('should reset all records', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.setMany(['key1', 'key2'], ['value1', 'value2'], tokenId);
                yield (0, chai_1.expect)(unsRegistry.reset(tokenId)).to.emit(unsRegistry, 'ResetRecords').withArgs(tokenId.toString());
                (0, chai_1.expect)(yield unsRegistry.getMany(['key1', 'key2'], tokenId)).to.deep.equal(['', '']);
            }));
            it('should fail if not owner', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.setMany(['key1', 'key2'], ['value1', 'value2'], tokenId);
                yield (0, chai_1.expect)(unsRegistry.connect(signers[1]).reset(tokenId)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
                (0, chai_1.expect)(yield unsRegistry.getMany(['key1', 'key2'], tokenId)).to.deep.equal(['value1', 'value2']);
            }));
        });
        describe('geyKey & getKeys', () => {
            it('should get key by hash', () => __awaiter(void 0, void 0, void 0, function* () {
                const expectedKey = 'new-hashed-key';
                yield unsRegistry.set(expectedKey, 'value', tokenId);
                const keyFromHash = yield unsRegistry.getKey(ethers_1.BigNumber.from(ethers_1.utils.id(expectedKey)));
                (0, chai_1.expect)(keyFromHash).to.be.equal(expectedKey);
            }));
            it('should get many keys by hashes', () => __awaiter(void 0, void 0, void 0, function* () {
                const expectedKeys = ['keyhash-many-1', 'keyhash-many-2'];
                yield unsRegistry.setMany(expectedKeys, ['value', 'value'], tokenId);
                const expectedKeyHashes = expectedKeys.map((key) => ethers_1.BigNumber.from(ethers_1.utils.id(key)));
                const keysFromHashes = yield unsRegistry.getKeys(expectedKeyHashes);
                (0, chai_1.expect)(keysFromHashes).to.be.eql(expectedKeys);
            }));
        });
        describe('reconfigure', () => {
            it('should reconfigure resolver with new values', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.set('old-key', 'old-value', tokenId);
                yield unsRegistry.reconfigure(['new-key'], ['new-value'], tokenId);
                (0, chai_1.expect)(yield unsRegistry.get('old-key', tokenId)).to.be.equal('');
                (0, chai_1.expect)(yield unsRegistry.get('new-key', tokenId)).to.be.eql('new-value');
            }));
            it('should fail when trying to reconfigure non-owned domain', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(unsRegistry.connect(signers[1]).reconfigure(['new-key'], ['new-value'], tokenId)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
            }));
        });
        describe('record operations by hashes', () => __awaiter(void 0, void 0, void 0, function* () {
            it('should get value by key hash', () => __awaiter(void 0, void 0, void 0, function* () {
                const key = 'get-key-by-hash-key';
                const expectedValue = 'get-key-by-hash-value';
                yield unsRegistry.set(key, expectedValue, tokenId);
                const result = yield unsRegistry.getByHash(ethers_1.utils.id(key), tokenId);
                (0, chai_1.expect)(result.value).to.be.equal(expectedValue);
                (0, chai_1.expect)(result.key).to.be.equal(key);
            }));
            it('should return empty value by keyhash if reader is ProxyReader and token is upgraded', () => __awaiter(void 0, void 0, void 0, function* () {
                const key = 'get-key-by-hash-key';
                const value = 'get-key-by-hash-value';
                tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistryMock, coinbase.address, 'crypto');
                yield unsRegistryMock.set(key, value, tokenId);
                yield unsRegistryMock.upgradeAll([tokenId]);
                (0, chai_1.expect)((yield unsRegistryMock.connect(reader).getByHash(ethers_1.utils.id(key), tokenId)).value).to.be.equal('');
                (0, chai_1.expect)((yield unsRegistryMock.connect(coinbase).getByHash(ethers_1.utils.id(key), tokenId)).value).to.be.equal(value);
            }));
            it('should get multiple values by hashes', () => __awaiter(void 0, void 0, void 0, function* () {
                const keys = ['key-to-hash-1', 'key-to-hash-2'];
                const expectedValues = ['value-42', 'value-43'];
                yield unsRegistry.setMany(keys, expectedValues, tokenId);
                const hashedKeys = keys.map((key) => ethers_1.BigNumber.from(ethers_1.utils.id(key)));
                const result = yield unsRegistry.getManyByHash(hashedKeys, tokenId);
                (0, chai_1.expect)(result).to.be.eql([keys, expectedValues]);
            }));
            it('should return empty values by keyhashes if reader is ProxyReader and token is upgraded', () => __awaiter(void 0, void 0, void 0, function* () {
                const keys = ['key-to-hash-1', 'key-to-hash-2'];
                const values = ['value-42', 'value-43'];
                tokenId = yield (0, registry_1.mintRandomDomain)(unsRegistryMock, coinbase.address, 'crypto');
                yield unsRegistryMock.setMany(keys, values, tokenId);
                yield unsRegistryMock.upgradeAll([tokenId]);
                const hashedKeys = keys.map((key) => ethers_1.BigNumber.from(ethers_1.utils.id(key)));
                const [, resultingValues] = yield unsRegistryMock.connect(reader).getManyByHash(hashedKeys, tokenId);
                (0, chai_1.expect)(resultingValues).to.be.deep.equal(['', '']);
                (0, chai_1.expect)(yield unsRegistryMock.connect(coinbase).getManyByHash(hashedKeys, tokenId)).to.be.deep.equal([keys, values]);
            }));
            it('should set record by hash', () => __awaiter(void 0, void 0, void 0, function* () {
                const expectedKey = 'key_23c';
                const keyHash = yield initializeKey(expectedKey);
                yield unsRegistry.setByHash(keyHash, 'value', tokenId);
                const [key, value] = yield unsRegistry.getByHash(keyHash, tokenId);
                (0, chai_1.expect)([key, value]).to.be.eql([expectedKey, 'value']);
            }));
            it('should revert setting record by hash when key is not registered', () => __awaiter(void 0, void 0, void 0, function* () {
                const expectedKey = 'key_23f3c';
                const keyHash = ethers_1.BigNumber.from(ethers_1.utils.id(expectedKey));
                yield (0, chai_1.expect)(unsRegistry.setByHash(keyHash, 'value', tokenId)).to.be.revertedWith('RecordStorage: KEY_NOT_FOUND');
            }));
            it('should set records(1) by hash', () => __awaiter(void 0, void 0, void 0, function* () {
                const expectedKey = 'key_2w12c';
                const keyHash = yield initializeKey(expectedKey);
                yield unsRegistry.setManyByHash([keyHash], ['value'], tokenId);
                (0, chai_1.expect)(yield unsRegistry.getByHash(keyHash, tokenId)).to.be.eql([expectedKey, 'value']);
            }));
            it('should set records(2) by hash', () => __awaiter(void 0, void 0, void 0, function* () {
                const key1 = 'key_3m3c';
                const key2 = 'key_9v3f';
                const key1Hash = yield initializeKey(key1);
                const key2Hash = yield initializeKey(key2);
                yield unsRegistry.setManyByHash([key1Hash, key2Hash], ['value1', 'value2'], tokenId);
                (0, chai_1.expect)(yield unsRegistry.getManyByHash([key1Hash, key2Hash], tokenId)).to.be.eql([
                    [key1, key2],
                    ['value1', 'value2'],
                ]);
            }));
            it('should revert setting records by hash when at least one key is not registered', () => __awaiter(void 0, void 0, void 0, function* () {
                const key1 = 'key_2d83c';
                const key2 = 'key_4o83f';
                const key1Hash = yield initializeKey(key1);
                const key2Hash = ethers_1.BigNumber.from(ethers_1.utils.id(key2));
                yield (0, chai_1.expect)(unsRegistry.setManyByHash([key1Hash, key2Hash], ['value1', 'value2'], tokenId)).to.be.revertedWith('RecordStorage: KEY_NOT_FOUND');
            }));
            it('should not consume additional gas if key hash was set before', () => __awaiter(void 0, void 0, void 0, function* () {
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
        }));
    });
});
