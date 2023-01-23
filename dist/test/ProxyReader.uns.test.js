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
const proxy_1 = require("./helpers/proxy");
const registry_1 = require("./helpers/registry");
const constants_1 = require("./helpers/constants");
describe('ProxyReader (UNS only)', () => {
    const domainName = 'test_42';
    const keys = ['test.key1', 'test.key2'];
    const values = ['test.value1', 'test.value2'];
    let unsRegistry, proxyReader;
    let signers, coinbase, accounts;
    let walletTokenId, cryptoTokenId;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [coinbase] = signers;
        [, ...accounts] = signers.map(s => s.address);
        unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
        yield unsRegistry.initialize(coinbase.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
        yield unsRegistry.setTokenURIPrefix('/');
        yield unsRegistry.mintTLD(constants_1.TLD.WALLET, 'wallet');
        yield unsRegistry.mintTLD(constants_1.TLD.CRYPTO, 'crypto');
        walletTokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase, [domainName, 'wallet'], true);
        cryptoTokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase, [domainName, 'crypto'], true);
        proxyReader = yield new contracts_1.ProxyReader__factory(coinbase).deploy();
        yield proxyReader.initialize(unsRegistry.address, constants_1.ZERO_ADDRESS);
    }));
    it('should support IERC165 interface', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, chai_1.expect)(yield proxyReader.supportsInterface('0x01ffc9a7')).to.be.equal(true);
    }));
    describe('IRegistryReader', () => {
        it('should support IRegistryReader interface', () => __awaiter(void 0, void 0, void 0, function* () {
            const functions = [
                'tokenURI', 'isApprovedOrOwner', 'resolverOf', 'namehash', 'balanceOf',
                'ownerOf', 'getApproved', 'isApprovedForAll', 'exists', 'reverseOf',
            ];
            const interfaceId = (0, proxy_1.getInterfaceId)(proxyReader, functions);
            (0, chai_1.expect)(yield proxyReader.supportsInterface(interfaceId)).to.be.equal(true);
        }));
        it('should revert isApprovedForAll call', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, chai_1.expect)(proxyReader.isApprovedForAll(accounts[0], accounts[1])).to.be.revertedWith('ProxyReader: UNSUPPORTED_METHOD');
        }));
        describe('getApproved', () => {
            it('should return approved zero-address .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const proxyResult = yield proxyReader.getApproved(walletTokenId);
                const resolverResult = yield unsRegistry.getApproved(walletTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal(constants_1.ZERO_ADDRESS);
            }));
            it('should return approved zero-address .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const proxyResult = yield proxyReader.getApproved(cryptoTokenId);
                const resolverResult = yield unsRegistry.getApproved(cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal(constants_1.ZERO_ADDRESS);
            }));
            it('should return approved address .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.approve(accounts[0], walletTokenId);
                const proxyResult = yield proxyReader.getApproved(walletTokenId);
                const resolverResult = yield unsRegistry.getApproved(walletTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal(accounts[0]);
            }));
            it('should return approved address .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.approve(accounts[0], cryptoTokenId);
                const proxyResult = yield proxyReader.getApproved(cryptoTokenId);
                const resolverResult = yield unsRegistry.getApproved(cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal(accounts[0]);
            }));
            it('should return zero address when token does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
                const proxyResult = yield proxyReader.getApproved(1);
                (0, chai_1.expect)(proxyResult).to.be.equal(constants_1.ZERO_ADDRESS);
            }));
        });
        describe('isApprovedOrOwner', () => {
            it('should return false for not-approved .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const proxyResult = yield proxyReader.isApprovedOrOwner(accounts[1], walletTokenId);
                const resolverResult = yield unsRegistry.isApprovedOrOwner(accounts[1], walletTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal(false);
            }));
            it('should return false for not-approved .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const proxyResult = yield proxyReader.isApprovedOrOwner(accounts[1], cryptoTokenId);
                const resolverResult = yield unsRegistry.isApprovedOrOwner(accounts[1], cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal(false);
            }));
            it('should return whether approved address .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.approve(accounts[0], walletTokenId);
                const proxyResult = yield proxyReader.isApprovedOrOwner(accounts[0], walletTokenId);
                const resolverResult = yield unsRegistry.isApprovedOrOwner(accounts[0], walletTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal(true);
            }));
            it('should return whether approved address .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.approve(accounts[0], cryptoTokenId);
                const proxyResult = yield proxyReader.isApprovedOrOwner(accounts[0], cryptoTokenId);
                const resolverResult = yield unsRegistry.isApprovedOrOwner(accounts[0], cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal(true);
            }));
            it('should return false value when token does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
                const proxyResult = yield proxyReader.isApprovedOrOwner(accounts[0], 1);
                (0, chai_1.expect)(proxyResult).to.be.equal(false);
            }));
        });
        describe('ownerOf', () => {
            it('should return empty owner for unknown domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const unknownTokenId = yield unsRegistry.namehash(['unknown', 'crypto']);
                const owners = yield proxyReader.callStatic.ownerOf(unknownTokenId);
                (0, chai_1.expect)(owners).to.be.equal(constants_1.ZERO_ADDRESS);
            }));
            it('should return owner of .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const proxyResult = yield proxyReader.ownerOf(walletTokenId);
                const resolverResult = yield unsRegistry.ownerOf(walletTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal(coinbase.address);
            }));
            it('should return owner of .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const proxyResult = yield proxyReader.ownerOf(cryptoTokenId);
                const resolverResult = yield unsRegistry.ownerOf(cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal(coinbase.address);
            }));
        });
        describe('resolverOf', () => {
            it('should return resolver of .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const proxyResult = yield proxyReader.resolverOf(walletTokenId);
                const resolverResult = yield unsRegistry.resolverOf(walletTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal(unsRegistry.address);
            }));
            it('should return resolver of .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const proxyResult = yield proxyReader.resolverOf(cryptoTokenId);
                const resolverResult = yield unsRegistry.resolverOf(cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal(unsRegistry.address);
            }));
            it('should return false value when token does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
                const proxyResult = yield proxyReader.resolverOf(1);
                (0, chai_1.expect)(proxyResult).to.be.equal(constants_1.ZERO_ADDRESS);
            }));
        });
        describe('tokenURI', () => {
            it('should return tokenURI of .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const proxyResult = yield proxyReader.tokenURI(walletTokenId);
                const resolverResult = yield unsRegistry.tokenURI(walletTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be
                    .equal('/40559307672254207728557027035302885851369665055277251407821151545011532191308');
            }));
            it('should return tokenURI of .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const proxyResult = yield proxyReader.tokenURI(cryptoTokenId);
                const resolverResult = yield unsRegistry.tokenURI(cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be
                    .equal('/107771857897517834290909154724501010203356272148473478760301214125032721342346');
            }));
            it('should return empty tokenURI when token does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
                const proxyResult = yield proxyReader.tokenURI(1);
                (0, chai_1.expect)(proxyResult).to.be.equal('');
            }));
        });
        describe('namehash', () => {
            it('should return namehash of .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const proxyResult = yield proxyReader.namehash(['test', 'wallet']);
                const resolverResult = yield unsRegistry.namehash(['test', 'wallet']);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be
                    .equal('50586162622368517199428676025463367639931450566950616867100918499864570754504');
            }));
            it('should return namehash of .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const proxyResult = yield proxyReader.namehash(['test', 'crypto']);
                const resolverResult = yield unsRegistry.namehash(['test', 'crypto']);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be
                    .equal('82856763987730893573226808376519199326595862773989062576563108342755511775491');
            }));
        });
        describe('balanceOf', () => {
            it('should aggregate balance from all registries', () => __awaiter(void 0, void 0, void 0, function* () {
                const _domainName = 'hey_hoy_23bkkcbv';
                const account = accounts[7];
                yield (0, registry_1.mintDomain)(unsRegistry, account, [_domainName, 'crypto']);
                yield (0, registry_1.mintDomain)(unsRegistry, account, [_domainName, 'wallet']);
                const proxyResult = yield proxyReader.balanceOf(account);
                const result = yield unsRegistry.balanceOf(account);
                (0, chai_1.expect)(proxyResult).to.be.equal(result);
            }));
        });
        describe('exists', () => {
            it('should return false for zero tokenId', () => __awaiter(void 0, void 0, void 0, function* () {
                (0, chai_1.expect)(yield proxyReader.exists(0)).to.be.equal(false);
            }));
            it('should return false for unknown .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const unknownTokenId = yield unsRegistry.namehash(['unknown', 'wallet']);
                (0, chai_1.expect)(yield proxyReader.exists(unknownTokenId)).to.be.equal(false);
            }));
            it('should return false for unknown .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const unknownTokenId = yield unsRegistry.namehash(['unknown', 'crypto']);
                (0, chai_1.expect)(yield proxyReader.exists(unknownTokenId)).to.be.equal(false);
            }));
            it('should return true for .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, accounts[3], ['hey_hoy_97hds', 'wallet']);
                (0, chai_1.expect)(yield proxyReader.exists(tokenId)).to.be.equal(true);
            }));
            it('should return true for .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, accounts[3], ['hey_hoy_97hds', 'crypto']);
                (0, chai_1.expect)(yield proxyReader.exists(tokenId)).to.be.equal(true);
            }));
            it('should return true for .crypto TLD', () => __awaiter(void 0, void 0, void 0, function* () {
                (0, chai_1.expect)(yield proxyReader.exists(constants_1.TLD.CRYPTO)).to.be.equal(true);
            }));
            it('should return true for .wallet TLD', () => __awaiter(void 0, void 0, void 0, function* () {
                (0, chai_1.expect)(yield proxyReader.exists(constants_1.TLD.WALLET)).to.be.equal(true);
            }));
        });
        describe('reverseOf', () => {
            it('should return empty reverse record when it is not set', () => __awaiter(void 0, void 0, void 0, function* () {
                (0, chai_1.expect)(yield proxyReader.reverseOf(coinbase.address)).to.be.equal(0);
            }));
            it('should return reverse record', () => __awaiter(void 0, void 0, void 0, function* () {
                const owner = signers[3];
                const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner.address, ['hey_hoy_11sfg', 'wallet']);
                yield unsRegistry.connect(owner)['setReverse(uint256)'](tokenId);
                (0, chai_1.expect)(yield proxyReader.reverseOf(owner.address)).to.be.equal(tokenId);
            }));
        });
    });
    describe('IRecordReader', () => {
        it('should support IRecordReader interface', () => __awaiter(void 0, void 0, void 0, function* () {
            const functions = ['get', 'getByHash', 'getMany', 'getManyByHash'];
            const interfaceId = (0, proxy_1.getInterfaceId)(proxyReader, functions);
            (0, chai_1.expect)(yield proxyReader.supportsInterface(interfaceId)).to.be.equal(true);
        }));
        describe('get', () => {
            it('should return value of record for .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.set('get_key_39', 'value1', walletTokenId);
                const proxyResult = yield proxyReader.get('get_key_39', walletTokenId);
                const resolverResult = yield unsRegistry.get('get_key_39', walletTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal('value1');
            }));
            it('should return value of record for .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                yield unsRegistry.set('get_key_134', 'value12', cryptoTokenId);
                const proxyResult = yield proxyReader.get('get_key_134', cryptoTokenId);
                const resolverResult = yield unsRegistry.get('get_key_134', cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal('value12');
            }));
        });
        describe('getMany', () => {
            it('should return list with empty value for unregistered key', () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield proxyReader.getMany([keys[0]], walletTokenId);
                (0, chai_1.expect)(result.length).to.be.equal(1);
                (0, chai_1.expect)(result[0]).to.be.equal('');
            }));
            it('should return list with single value for .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const [key] = keys;
                const [value] = values;
                yield unsRegistry.set(key, value, walletTokenId);
                const proxyResult = yield proxyReader.getMany([key], walletTokenId);
                const resolverResult = yield unsRegistry.getMany([key], walletTokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.eql([value]);
            }));
            it('should return list with single value for .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const [key] = keys;
                const [value] = values;
                yield unsRegistry.set(key, value, cryptoTokenId);
                const proxyResult = yield proxyReader.getMany([key], cryptoTokenId);
                const resolverResult = yield unsRegistry.getMany([key], cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.eql([value]);
            }));
            it('should return list with multiple values for .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                for (let i = 0; i < keys.length; i++) {
                    yield unsRegistry.set(keys[i], values[i], walletTokenId);
                }
                const result = yield proxyReader.getMany(keys, walletTokenId);
                (0, chai_1.expect)(result).to.be.eql(values);
            }));
            it('should return list with multiple values for .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                for (let i = 0; i < keys.length; i++) {
                    yield unsRegistry.set(keys[i], values[i], cryptoTokenId);
                }
                const result = yield proxyReader.getMany(keys, cryptoTokenId);
                (0, chai_1.expect)(result).to.be.eql(values);
            }));
        });
        describe('getByHash', () => {
            it('should return value of record for .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const keyHash = ethers_1.utils.id('get_key_4235');
                yield unsRegistry.set('get_key_4235', 'value1454', walletTokenId);
                const proxyResult = yield proxyReader.getByHash(keyHash, walletTokenId);
                const resolverResult = yield unsRegistry.getByHash(keyHash, walletTokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.eql(['get_key_4235', 'value1454']);
            }));
            it('should return value of record for .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const keyHash = ethers_1.utils.id('get_key_0946');
                yield unsRegistry.set('get_key_0946', 'value4521', cryptoTokenId);
                const proxyResult = yield proxyReader.getByHash(keyHash, cryptoTokenId);
                const resolverResult = yield unsRegistry.getByHash(keyHash, cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.eql(['get_key_0946', 'value4521']);
            }));
        });
        describe('getManyByHash', () => {
            it('should return list with empty value for unregistered key', () => __awaiter(void 0, void 0, void 0, function* () {
                const keyHash = ethers_1.utils.id('key_aaaaaa');
                const result = yield proxyReader.getManyByHash([keyHash], walletTokenId);
                (0, chai_1.expect)(result[0]).to.be.eql(['']);
            }));
            it('should return list with single value for .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const [key] = keys;
                const [value] = values;
                const keyHash = ethers_1.utils.id(key);
                yield unsRegistry.set(key, value, walletTokenId);
                const proxyResult = yield proxyReader.getManyByHash([keyHash], walletTokenId);
                const resolverResult = yield unsRegistry.getManyByHash([keyHash], walletTokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.eql([[key], [value]]);
            }));
            it('should return list with single value for .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const [key] = keys;
                const [value] = values;
                const keyHash = ethers_1.utils.id(key);
                yield unsRegistry.set(key, value, cryptoTokenId);
                const proxyResult = yield proxyReader.getManyByHash([keyHash], cryptoTokenId);
                const resolverResult = yield unsRegistry.getManyByHash([keyHash], cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.eql([[key], [value]]);
            }));
        });
    });
    describe('IDataReader', () => {
        it('should support IDataReader interface', () => __awaiter(void 0, void 0, void 0, function* () {
            const functions = ['getData', 'getDataForMany', 'getDataByHash', 'getDataByHashForMany', 'ownerOfForMany'];
            const interfaceId = (0, proxy_1.getInterfaceId)(proxyReader, functions);
            (0, chai_1.expect)(yield proxyReader.supportsInterface(interfaceId)).to.be.equal(true);
        }));
        describe('getData', () => {
            it('should return empty data for non-existing .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const _domainName = 'hey_hoy_1037';
                const _tokenId = yield unsRegistry.namehash([_domainName, 'wallet']);
                const data = yield proxyReader.callStatic.getData(keys, _tokenId);
                (0, chai_1.expect)(data).to.be.eql([constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, ['', '']]);
            }));
            it('should return empty data for non-existing .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const _domainName = 'hey_hoy_1037';
                const _tokenId = yield unsRegistry.namehash([_domainName, 'crypto']);
                const data = yield proxyReader.callStatic.getData(keys, _tokenId);
                (0, chai_1.expect)(data).to.be.eql([constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, ['', '']]);
            }));
            it('should return data for .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, ['hey_hoy_121', 'crypto']);
                const data = yield proxyReader.callStatic.getData(keys, tokenId);
                (0, chai_1.expect)(data).to.be.eql([unsRegistry.address, coinbase.address, ['', '']]);
            }));
            it('should return data for .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, ['hey_hoy_121', 'wallet']);
                const data = yield proxyReader.callStatic.getData(keys, tokenId);
                (0, chai_1.expect)(data).to.be.eql([unsRegistry.address, coinbase.address, ['', '']]);
            }));
        });
        describe('getDataForMany', () => {
            it('should return empty lists for empty list of domains', () => __awaiter(void 0, void 0, void 0, function* () {
                const data = yield proxyReader.callStatic.getDataForMany([], []);
                (0, chai_1.expect)(data).to.be.eql([[], [], []]);
            }));
            it('should return empty data for non-existing .crypto|.wallet domains', () => __awaiter(void 0, void 0, void 0, function* () {
                const _domainName = 'hey_hoy_1037';
                const _walletTokenId = yield unsRegistry.namehash([_domainName, 'wallet']);
                const _cryptoTokenId = yield unsRegistry.namehash([_domainName, 'crypto']);
                const data = yield proxyReader.callStatic.getDataForMany(keys, [_walletTokenId, _cryptoTokenId]);
                (0, chai_1.expect)(data).to.be.eql([[constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS], [constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS], [['', ''], ['', '']]]);
            }));
            it('should return data for multiple .crypto|.wallet domains', () => __awaiter(void 0, void 0, void 0, function* () {
                const _domainName = 'test_1291';
                const _walletTokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, [_domainName, 'wallet']);
                const _cryptoTokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, [_domainName, 'crypto']);
                for (let i = 0; i < keys.length; i++) {
                    yield unsRegistry.set(keys[i], values[i], _walletTokenId);
                    yield unsRegistry.set(keys[i], values[i], _cryptoTokenId);
                }
                const data = yield proxyReader.callStatic.getDataForMany(keys, [_walletTokenId, _cryptoTokenId]);
                (0, chai_1.expect)(data).to.be.eql([
                    [unsRegistry.address, unsRegistry.address],
                    [coinbase.address, coinbase.address],
                    [['test.value1', 'test.value2'], ['test.value1', 'test.value2']],
                ]);
            }));
            it('should return owners for multiple tokens (including unknown)', () => __awaiter(void 0, void 0, void 0, function* () {
                const unknownTokenId = yield unsRegistry.namehash(['unknown', 'crypto']);
                const data = yield proxyReader.callStatic.getDataForMany([], [walletTokenId, unknownTokenId]);
                (0, chai_1.expect)(data).to.be.eql([
                    [unsRegistry.address, constants_1.ZERO_ADDRESS],
                    [coinbase.address, constants_1.ZERO_ADDRESS],
                    [[], []],
                ]);
            }));
        });
        describe('getDataByHash', () => {
            it('should return empty data for non-existing .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const hashes = keys.map(ethers_1.utils.id);
                const _domainName = 'hey_hoy_29224';
                const _tokenId = yield unsRegistry.namehash([_domainName, 'wallet']);
                const data = yield proxyReader.callStatic.getDataByHash(hashes, _tokenId);
                (0, chai_1.expect)(data).to.be.eql([constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, keys, ['', '']]);
            }));
            it('should return empty data for non-existing .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const hashes = keys.map(ethers_1.utils.id);
                const _domainName = 'hey_hoy_29228';
                const _tokenId = yield unsRegistry.namehash([_domainName, 'crypto']);
                const data = yield proxyReader.callStatic.getDataByHash(hashes, _tokenId);
                (0, chai_1.expect)(data).to.be.eql([constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, keys, ['', '']]);
            }));
            it('should return data by hashes for .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const hashes = keys.map(ethers_1.utils.id);
                const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, ['hey_hoy_292', 'crypto']);
                for (let i = 0; i < keys.length; i++) {
                    yield unsRegistry.set(keys[i], values[i], tokenId);
                }
                const data = yield proxyReader.callStatic.getDataByHash(hashes, tokenId);
                (0, chai_1.expect)(data).to.be.eql([
                    unsRegistry.address,
                    coinbase.address,
                    keys,
                    values,
                ]);
            }));
            it('should return data by hashes for .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const hashes = keys.map(ethers_1.utils.id);
                const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, ['hey_hoy_292', 'wallet']);
                for (let i = 0; i < keys.length; i++) {
                    yield unsRegistry.set(keys[i], values[i], tokenId);
                }
                const data = yield proxyReader.callStatic.getDataByHash(hashes, tokenId);
                (0, chai_1.expect)(data).to.be.eql([
                    unsRegistry.address,
                    coinbase.address,
                    keys,
                    values,
                ]);
            }));
        });
        describe('getDataByHashForMany', () => {
            it('should return empty lists for empty list of domains', () => __awaiter(void 0, void 0, void 0, function* () {
                const data = yield proxyReader.callStatic.getDataByHashForMany([], []);
                (0, chai_1.expect)(data).to.be.eql([[], [], [], []]);
            }));
            it('should return empty data for non-existing .crypto|.wallet domains', () => __awaiter(void 0, void 0, void 0, function* () {
                const hashes = keys.map(ethers_1.utils.id);
                const _domainName = 'hey_hoy_1037';
                const _walletTokenId = yield unsRegistry.namehash([_domainName, 'wallet']);
                const _cryptoTokenId = yield unsRegistry.namehash([_domainName, 'crypto']);
                const data = yield proxyReader.callStatic.getDataByHashForMany(hashes, [_walletTokenId, _cryptoTokenId]);
                (0, chai_1.expect)(data).to.be.eql([
                    [constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS],
                    [constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS],
                    [keys, keys],
                    [['', ''], ['', '']],
                ]);
            }));
            it('should return data for multiple .crypto|.wallet domains', () => __awaiter(void 0, void 0, void 0, function* () {
                const hashes = keys.map(ethers_1.utils.id);
                const _domainName = 'test_1082q';
                const _walletTokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, [_domainName, 'wallet']);
                const _cryptoTokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, [_domainName, 'crypto']);
                for (let i = 0; i < keys.length; i++) {
                    yield unsRegistry.set(keys[i], values[i], _walletTokenId);
                    yield unsRegistry.set(keys[i], values[i], _cryptoTokenId);
                }
                const data = yield proxyReader.callStatic.getDataByHashForMany(hashes, [_walletTokenId, _cryptoTokenId]);
                (0, chai_1.expect)(data).to.be.eql([
                    [unsRegistry.address, unsRegistry.address],
                    [coinbase.address, coinbase.address],
                    [['test.key1', 'test.key2'], ['test.key1', 'test.key2']],
                    [['test.value1', 'test.value2'], ['test.value1', 'test.value2']],
                ]);
            }));
            it('should return owners for multiple domains (including unknown)', () => __awaiter(void 0, void 0, void 0, function* () {
                const unknownTokenId = yield unsRegistry.namehash(['unknown', 'crypto']);
                const data = yield proxyReader.callStatic.getDataByHashForMany([], [walletTokenId, unknownTokenId]);
                (0, chai_1.expect)(data).to.be.eql([
                    [unsRegistry.address, constants_1.ZERO_ADDRESS],
                    [coinbase.address, constants_1.ZERO_ADDRESS],
                    [[], []],
                    [[], []],
                ]);
            }));
        });
        describe('ownerOfForMany', () => {
            it('should return empty owner for unknown domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const unknownTokenId = yield unsRegistry.namehash(['unknown', 'crypto']);
                const owners = yield proxyReader.callStatic.ownerOfForMany([unknownTokenId]);
                (0, chai_1.expect)(owners).to.be.eql([constants_1.ZERO_ADDRESS]);
            }));
            it('should return empty list for empty list of domains', () => __awaiter(void 0, void 0, void 0, function* () {
                const owners = yield proxyReader.callStatic.ownerOfForMany([]);
                (0, chai_1.expect)(owners).to.be.eql([]);
            }));
            it('should return owners for multiple .crypto|.wallet domains', () => __awaiter(void 0, void 0, void 0, function* () {
                const _domainName = 'test_125t';
                const _walletTokenId = yield (0, registry_1.mintDomain)(unsRegistry, accounts[0], [_domainName, 'wallet']);
                const _cryptoTokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, [_domainName, 'crypto']);
                const owners = yield proxyReader.callStatic.ownerOfForMany([walletTokenId, _walletTokenId, _cryptoTokenId]);
                (0, chai_1.expect)(owners).to.be.eql([coinbase.address, accounts[0], coinbase.address]);
            }));
            it('should return owners for multiple domains (including unknown)', () => __awaiter(void 0, void 0, void 0, function* () {
                const unknownTokenId = yield unsRegistry.namehash(['unknown', 'crypto']);
                const owners = yield proxyReader.callStatic.ownerOfForMany([walletTokenId, unknownTokenId]);
                (0, chai_1.expect)(owners).to.be.eql([coinbase.address, constants_1.ZERO_ADDRESS]);
            }));
        });
    });
    describe('registryOf', () => {
        it('should return zero for zero tokenId', () => __awaiter(void 0, void 0, void 0, function* () {
            const address = yield proxyReader.registryOf(0);
            (0, chai_1.expect)(address).to.be.equal(constants_1.ZERO_ADDRESS);
        }));
        it('should return error for unknown .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
            const unknownTokenId = yield unsRegistry.namehash(['unknown', 'wallet']);
            const address = yield proxyReader.registryOf(unknownTokenId);
            (0, chai_1.expect)(address).to.be.equal(constants_1.ZERO_ADDRESS);
        }));
        it('should return error for unknown .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
            const unknownTokenId = yield unsRegistry.namehash(['unknown', 'crypto']);
            const address = yield proxyReader.registryOf(unknownTokenId);
            (0, chai_1.expect)(address).to.be.equal(constants_1.ZERO_ADDRESS);
        }));
        it('should return value for .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, accounts[3], ['hey_hoy_98hds', 'wallet']);
            const address = yield proxyReader.registryOf(tokenId);
            (0, chai_1.expect)(address).to.be.equal(unsRegistry.address);
        }));
        it('should return value for .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, accounts[3], ['hey_hoy_98hds', 'crypto']);
            const address = yield proxyReader.registryOf(tokenId);
            (0, chai_1.expect)(address).to.be.equal(unsRegistry.address);
        }));
        it('should return value for .crypto TLD', () => __awaiter(void 0, void 0, void 0, function* () {
            const address = yield proxyReader.registryOf(constants_1.TLD.CRYPTO);
            (0, chai_1.expect)(address).to.be.equal(unsRegistry.address);
        }));
        it('should return value for .wallet TLD', () => __awaiter(void 0, void 0, void 0, function* () {
            const address = yield proxyReader.registryOf(constants_1.TLD.WALLET);
            (0, chai_1.expect)(address).to.be.equal(unsRegistry.address);
        }));
    });
});
