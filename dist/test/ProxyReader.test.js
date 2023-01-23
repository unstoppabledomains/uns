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
const contracts_2 = require("../types/factories/dot-crypto/contracts");
const controllers_1 = require("../types/factories/dot-crypto/contracts/controllers");
const registry_1 = require("./helpers/registry");
const constants_1 = require("./helpers/constants");
const proxy_1 = require("./helpers/proxy");
describe('ProxyReader', () => {
    const domainName = 'test_42';
    const keys = ['test.key1', 'test.key2'];
    const values = ['test.value1', 'test.value2'];
    let unsRegistry;
    let cnsRegistry;
    let resolver;
    let mintingController;
    let proxyReader;
    let signers, coinbase, accounts;
    let walletTokenId, cryptoTokenId;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [coinbase] = signers;
        [, ...accounts] = signers.map(s => s.address);
        unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
        yield unsRegistry.initialize(coinbase.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
        yield unsRegistry.setTokenURIPrefix('/');
        cnsRegistry = yield new contracts_2.CNSRegistry__factory(coinbase).deploy();
        mintingController = yield new controllers_1.MintingController__factory(coinbase).deploy(cnsRegistry.address);
        yield cnsRegistry.addController(mintingController.address);
        resolver = yield new contracts_2.Resolver__factory(coinbase).deploy(cnsRegistry.address, mintingController.address);
        yield unsRegistry.mintTLD(constants_1.TLD.WALLET, 'wallet');
        walletTokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, [domainName, 'wallet']);
        cryptoTokenId = yield unsRegistry.namehash([domainName, 'crypto']);
        yield mintingController.mintSLDWithResolver(coinbase.address, domainName, resolver.address);
        proxyReader = yield new contracts_1.ProxyReader__factory(coinbase).deploy();
        yield proxyReader.initialize(unsRegistry.address, cnsRegistry.address);
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
                const resolverResult = yield cnsRegistry.getApproved(cryptoTokenId);
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
                yield cnsRegistry.approve(accounts[0], cryptoTokenId);
                const proxyResult = yield proxyReader.getApproved(cryptoTokenId);
                const resolverResult = yield cnsRegistry.getApproved(cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal(accounts[0]);
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
                const resolverResult = yield cnsRegistry.isApprovedOrOwner(accounts[1], cryptoTokenId);
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
                yield cnsRegistry.approve(accounts[0], cryptoTokenId);
                const proxyResult = yield proxyReader.isApprovedOrOwner(accounts[0], cryptoTokenId);
                const resolverResult = yield cnsRegistry.isApprovedOrOwner(accounts[0], cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal(true);
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
                const resolverResult = yield cnsRegistry.ownerOf(cryptoTokenId);
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
                const resolverResult = yield cnsRegistry.resolverOf(cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal(resolver.address);
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
                const resolverResult = yield cnsRegistry.tokenURI(cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal('test_42.crypto');
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
                const resolverResult = yield cnsRegistry.childIdOf(constants_1.TLD.CRYPTO, 'test');
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be
                    .equal('82856763987730893573226808376519199326595862773989062576563108342755511775491');
            }));
        });
        describe('balanceOf', () => {
            it('should aggregate balance from all registries', () => __awaiter(void 0, void 0, void 0, function* () {
                const _domainName = 'hey_hoy_23bkkcbv';
                const account = accounts[7];
                yield mintingController.mintSLD(account, _domainName);
                yield (0, registry_1.mintDomain)(unsRegistry, account, [_domainName, 'wallet']);
                const proxyResult = yield proxyReader.balanceOf(account);
                const resolverResult1 = yield unsRegistry.balanceOf(account);
                const resolverResult2 = yield cnsRegistry.balanceOf(account);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult1.add(resolverResult2));
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
                const unknownTokenId = yield cnsRegistry.childIdOf(constants_1.TLD.CRYPTO, 'unknown');
                (0, chai_1.expect)(yield proxyReader.exists(unknownTokenId)).to.be.equal(false);
            }));
            it('should return true for .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, accounts[3], ['hey_hoy_97hds', 'wallet']);
                (0, chai_1.expect)(yield proxyReader.exists(tokenId)).to.be.equal(true);
            }));
            it('should return true for .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const _domainName = 'hey_hoy_97hds';
                const cryptoTokenId = yield cnsRegistry.childIdOf(constants_1.TLD.CRYPTO, _domainName);
                yield mintingController.mintSLD(accounts[3], _domainName);
                (0, chai_1.expect)(yield proxyReader.exists(cryptoTokenId)).to.be.equal(true);
            }));
            it('should return true for .crypto TLD', () => __awaiter(void 0, void 0, void 0, function* () {
                (0, chai_1.expect)(yield proxyReader.exists(constants_1.TLD.CRYPTO)).to.be.equal(true);
            }));
            it('should return true for .wallet TLD', () => __awaiter(void 0, void 0, void 0, function* () {
                (0, chai_1.expect)(yield proxyReader.exists(constants_1.TLD.WALLET)).to.be.equal(true);
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
                yield resolver.set('get_key_134', 'value12', cryptoTokenId);
                const proxyResult = yield proxyReader.get('get_key_134', cryptoTokenId);
                const resolverResult = yield resolver.get('get_key_134', cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.equal('value12');
            }));
            it('should resolve empty record value for .crypto domain when token not found', () => __awaiter(void 0, void 0, void 0, function* () {
                const _tokenId = yield unsRegistry.namehash(['test-sgh-q1', 'crypto']);
                const proxyResult = yield proxyReader.get('get_key_134', _tokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal('');
            }));
            it('should resolve empty record value for .crypto domain when resolver not found', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield unsRegistry.namehash(['test-sgh-q1', 'crypto']);
                yield mintingController.mintSLD(coinbase.address, 'test-sgh-q1');
                const proxyResult = yield proxyReader.get('get_key_134', tokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal('');
            }));
            it('should resolve empty record value for .crypto domain when resolver is 0xdead', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield unsRegistry.namehash(['test-sgh-q1-2', 'crypto']);
                yield mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q1-2', constants_1.DEAD_ADDRESS);
                const proxyResult = yield proxyReader.get('get_key_134', tokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal('');
            }));
            it('should resolve empty record value for .crypto domain when resolver is EOA', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield unsRegistry.namehash(['test-sgh-q1-3', 'crypto']);
                yield mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q1-3', coinbase.address);
                const proxyResult = yield proxyReader.get('get_key_134', tokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal('');
            }));
            it('should resolve empty record value for .crypto domain when resolver is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield unsRegistry.namehash(['test-sgh-q1-4', 'crypto']);
                const nonResolverAddress = proxyReader.address;
                yield mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q1-4', nonResolverAddress);
                const proxyResult = yield proxyReader.get('get_key_134', tokenId);
                (0, chai_1.expect)(proxyResult).to.be.equal('');
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
                yield resolver.set(key, value, cryptoTokenId);
                const proxyResult = yield proxyReader.getMany([key], cryptoTokenId);
                const resolverResult = yield resolver.getMany([key], cryptoTokenId);
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
                    yield resolver.set(keys[i], values[i], cryptoTokenId);
                }
                const result = yield proxyReader.getMany(keys, cryptoTokenId);
                (0, chai_1.expect)(result).to.be.eql(values);
            }));
            it('should resolve empty records value for .crypto domain when token not found', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield unsRegistry.namehash(['test-sgh-q2', 'crypto']);
                const proxyResult = yield proxyReader.getMany(keys, tokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(['', '']);
            }));
            it('should resolve empty records value for .crypto domain when resolver not found', () => __awaiter(void 0, void 0, void 0, function* () {
                const _tokenId = yield unsRegistry.namehash(['test-sgh-q2', 'crypto']);
                yield mintingController.mintSLD(coinbase.address, 'test-sgh-q2');
                const proxyResult = yield proxyReader.getMany(keys, _tokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(['', '']);
            }));
            it('should resolve empty records value for .crypto domain when resolver is 0xdead', () => __awaiter(void 0, void 0, void 0, function* () {
                const _tokenId = yield unsRegistry.namehash(['test-sgh-q2-2', 'crypto']);
                yield mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q2-2', constants_1.DEAD_ADDRESS);
                const proxyResult = yield proxyReader.getMany(keys, _tokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(['', '']);
            }));
            it('should resolve empty records value for .crypto domain when resolver is EOA', () => __awaiter(void 0, void 0, void 0, function* () {
                const _tokenId = yield unsRegistry.namehash(['test-sgh-q2-3', 'crypto']);
                yield mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q2-3', coinbase.address);
                const proxyResult = yield proxyReader.getMany(keys, _tokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(['', '']);
            }));
            it('should resolve empty records value for .crypto domain when resolver is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
                const _tokenId = yield unsRegistry.namehash(['test-sgh-q2-4', 'crypto']);
                const nonResolverAddress = proxyReader.address;
                yield mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q2-4', nonResolverAddress);
                const proxyResult = yield proxyReader.getMany(keys, _tokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(['', '']);
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
                yield resolver.set('get_key_0946', 'value4521', cryptoTokenId);
                const proxyResult = yield proxyReader.getByHash(keyHash, cryptoTokenId);
                const resolverResult = yield resolver.getByHash(keyHash, cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.eql(['get_key_0946', 'value4521']);
            }));
            it('should resolve empty record value for .crypto domain when token not found', () => __awaiter(void 0, void 0, void 0, function* () {
                const keyHash = ethers_1.utils.id('get_key_0946');
                const tokenId = yield unsRegistry.namehash(['test-sgh-q3', 'crypto']);
                const proxyResult = yield proxyReader.getByHash(keyHash, tokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(['', '']);
            }));
            it('should resolve empty record value for .crypto domain when resolver not found', () => __awaiter(void 0, void 0, void 0, function* () {
                const keyHash = ethers_1.utils.id('get_key_0946');
                const tokenId = yield unsRegistry.namehash(['test-sgh-q3', 'crypto']);
                yield mintingController.mintSLD(coinbase.address, 'test-sgh-q3');
                const proxyResult = yield proxyReader.getByHash(keyHash, tokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(['', '']);
            }));
            it('should resolve empty record value for .crypto domain when resolver is 0xdead', () => __awaiter(void 0, void 0, void 0, function* () {
                const keyHash = ethers_1.utils.id('get_key_0946');
                const tokenId = yield unsRegistry.namehash(['test-sgh-q3-2', 'crypto']);
                yield mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q3-2', constants_1.DEAD_ADDRESS);
                const proxyResult = yield proxyReader.getByHash(keyHash, tokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(['', '']);
            }));
            it('should resolve empty record value for .crypto domain when resolver is EOA', () => __awaiter(void 0, void 0, void 0, function* () {
                const keyHash = ethers_1.utils.id('get_key_0946');
                const tokenId = yield unsRegistry.namehash(['test-sgh-q3-3', 'crypto']);
                yield mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q3-3', coinbase.address);
                const proxyResult = yield proxyReader.getByHash(keyHash, tokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(['', '']);
            }));
            it('should resolve empty record value for .crypto domain when resolver is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
                const keyHash = ethers_1.utils.id('get_key_0946');
                const tokenId = yield unsRegistry.namehash(['test-sgh-q3-4', 'crypto']);
                const nonResolverAddress = proxyReader.address;
                yield mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q3-4', nonResolverAddress);
                const proxyResult = yield proxyReader.getByHash(keyHash, tokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(['', '']);
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
                yield resolver.set(key, value, cryptoTokenId);
                const proxyResult = yield proxyReader.getManyByHash([keyHash], cryptoTokenId);
                const resolverResult = yield resolver.getManyByHash([keyHash], cryptoTokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql(resolverResult);
                (0, chai_1.expect)(resolverResult).to.be.eql([[key], [value]]);
            }));
            it('should resolve empty records value for .crypto domain when token not found', () => __awaiter(void 0, void 0, void 0, function* () {
                const keyHash = ethers_1.utils.id(keys[0]);
                const tokenId = yield unsRegistry.namehash(['test-sgh-q4', 'crypto']);
                const proxyResult = yield proxyReader.getManyByHash([keyHash], tokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql([[''], ['']]);
            }));
            it('should resolve empty records value for .crypto domain when resolver not found', () => __awaiter(void 0, void 0, void 0, function* () {
                const keyHash = ethers_1.utils.id(keys[0]);
                const tokenId = yield unsRegistry.namehash(['test-sgh-q5', 'crypto']);
                yield mintingController.mintSLD(coinbase.address, 'test-sgh-q5');
                const proxyResult = yield proxyReader.getManyByHash([keyHash], tokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql([[''], ['']]);
            }));
            it('should resolve empty records value for .crypto domain when resolver is 0xdead', () => __awaiter(void 0, void 0, void 0, function* () {
                const keyHash = ethers_1.utils.id(keys[0]);
                const tokenId = yield unsRegistry.namehash(['test-sgh-q5-2', 'crypto']);
                yield mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q5-2', constants_1.DEAD_ADDRESS);
                const proxyResult = yield proxyReader.getManyByHash([keyHash], tokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql([[''], ['']]);
            }));
            it('should resolve empty records value for .crypto domain when resolver is EOA', () => __awaiter(void 0, void 0, void 0, function* () {
                const keyHash = ethers_1.utils.id(keys[0]);
                const tokenId = yield unsRegistry.namehash(['test-sgh-q5-3', 'crypto']);
                yield mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q5-3', coinbase.address);
                const proxyResult = yield proxyReader.getManyByHash([keyHash], tokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql([[''], ['']]);
            }));
            it('should resolve empty records value for .crypto domain when resolver is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
                const keyHash = ethers_1.utils.id(keys[0]);
                const tokenId = yield unsRegistry.namehash(['test-sgh-q5-4', 'crypto']);
                const nonResolverAddress = proxyReader.address;
                yield mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q5-4', nonResolverAddress);
                const proxyResult = yield proxyReader.getManyByHash([keyHash], tokenId);
                (0, chai_1.expect)(proxyResult).to.be.eql([[''], ['']]);
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
                const tokenId = yield unsRegistry.namehash(['hey_hoy_1037', 'wallet']);
                const data = yield proxyReader.callStatic.getData(keys, tokenId);
                (0, chai_1.expect)(data).to.be.eql([constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, ['', '']]);
            }));
            it('should return empty data for non-existing .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield cnsRegistry.childIdOf(constants_1.TLD.CRYPTO, 'hey_hoy_1037');
                const data = yield proxyReader.callStatic.getData(keys, tokenId);
                (0, chai_1.expect)(data).to.be.eql([constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, ['', '']]);
            }));
            it('should return data for .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const _domainName = 'hey_hoy_121';
                const tokenId = yield cnsRegistry.childIdOf(constants_1.TLD.CRYPTO, _domainName);
                yield mintingController.mintSLDWithResolver(coinbase.address, _domainName, resolver.address);
                const data = yield proxyReader.callStatic.getData(keys, tokenId);
                (0, chai_1.expect)(data).to.be.eql([resolver.address, coinbase.address, ['', '']]);
            }));
            it('should return data for .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, ['hey_hoy_121', 'wallet']);
                const data = yield proxyReader.callStatic.getData(keys, tokenId);
                (0, chai_1.expect)(data).to.be.eql([unsRegistry.address, coinbase.address, ['', '']]);
            }));
            it('should return data for .crypto domain when resolver is 0xdead', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield unsRegistry.namehash(['hey-hoy-re-2723', 'crypto']);
                yield mintingController.mintSLDWithResolver(coinbase.address, 'hey-hoy-re-2723', constants_1.DEAD_ADDRESS);
                const data = yield proxyReader.getData(keys, tokenId);
                (0, chai_1.expect)(data).to.be.eql([constants_1.DEAD_ADDRESS, coinbase.address, ['', '']]);
            }));
            it('should return data for .crypto domain when resolver is EOA', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield unsRegistry.namehash(['hey-hoy-re-3723', 'crypto']);
                yield mintingController.mintSLDWithResolver(coinbase.address, 'hey-hoy-re-3723', coinbase.address);
                const data = yield proxyReader.getData(keys, tokenId);
                (0, chai_1.expect)(data).to.be.eql([coinbase.address, coinbase.address, ['', '']]);
            }));
            it('should return data for .crypto domain when resolver is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield unsRegistry.namehash(['hey-hoy-re-4723', 'crypto']);
                const nonResolverAddress = proxyReader.address;
                yield mintingController.mintSLDWithResolver(coinbase.address, 'hey-hoy-re-4723', nonResolverAddress);
                const data = yield proxyReader.getData(keys, tokenId);
                (0, chai_1.expect)(data).to.be.eql([nonResolverAddress, coinbase.address, ['', '']]);
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
                const _cryptoTokenId = yield unsRegistry.namehash([_domainName, 'crypto']);
                const _walletTokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, [_domainName, 'wallet']);
                yield mintingController.mintSLDWithResolver(coinbase.address, _domainName, resolver.address);
                for (let i = 0; i < keys.length; i++) {
                    yield resolver.set(keys[i], values[i], _cryptoTokenId);
                    yield unsRegistry.set(keys[i], values[i], _walletTokenId);
                }
                const data = yield proxyReader.callStatic.getDataForMany(keys, [_walletTokenId, _cryptoTokenId]);
                (0, chai_1.expect)(data).to.be.eql([
                    [unsRegistry.address, resolver.address],
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
                (0, chai_1.expect)(data).to.be.eql([constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, ['', ''], ['', '']]);
            }));
            it('should return empty data for non-existing .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const hashes = keys.map(ethers_1.utils.id);
                const tokenId = yield cnsRegistry.childIdOf(constants_1.TLD.CRYPTO, 'hey_hoy_29228');
                const data = yield proxyReader.callStatic.getDataByHash(hashes, tokenId);
                (0, chai_1.expect)(data).to.be.eql([constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, ['', ''], ['', '']]);
            }));
            it('should return data by hashes for .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const hashes = keys.map(ethers_1.utils.id);
                const _domainName = 'hey_hoy_292';
                const tokenId = yield cnsRegistry.childIdOf(constants_1.TLD.CRYPTO, _domainName);
                yield mintingController.mintSLDWithResolver(coinbase.address, _domainName, resolver.address);
                for (let i = 0; i < keys.length; i++) {
                    yield resolver.set(keys[i], values[i], tokenId);
                }
                const data = yield proxyReader.callStatic.getDataByHash(hashes, tokenId);
                (0, chai_1.expect)(data).to.be.eql([
                    resolver.address,
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
            it('should return data for .crypto domain when resolver is 0xdead', () => __awaiter(void 0, void 0, void 0, function* () {
                const hashes = keys.map(ethers_1.utils.id);
                const tokenId = yield unsRegistry.namehash(['hey-hoy-reh-2723', 'crypto']);
                yield mintingController.mintSLDWithResolver(coinbase.address, 'hey-hoy-reh-2723', constants_1.DEAD_ADDRESS);
                const data = yield proxyReader.getDataByHash(hashes, tokenId);
                (0, chai_1.expect)(data).to.be.eql([constants_1.DEAD_ADDRESS, coinbase.address, ['', ''], ['', '']]);
            }));
            it('should return data for .crypto domain when resolver is EOA', () => __awaiter(void 0, void 0, void 0, function* () {
                const hashes = keys.map(ethers_1.utils.id);
                const tokenId = yield unsRegistry.namehash(['hey-hoy-reh-3723', 'crypto']);
                yield mintingController.mintSLDWithResolver(coinbase.address, 'hey-hoy-reh-3723', coinbase.address);
                const data = yield proxyReader.getDataByHash(hashes, tokenId);
                (0, chai_1.expect)(data).to.be.eql([coinbase.address, coinbase.address, ['', ''], ['', '']]);
            }));
            it('should return data for .crypto domain when resolver is not valid', () => __awaiter(void 0, void 0, void 0, function* () {
                const hashes = keys.map(ethers_1.utils.id);
                const tokenId = yield unsRegistry.namehash(['hey-hoy-reh-4723', 'crypto']);
                const nonResolverAddress = proxyReader.address;
                yield mintingController.mintSLDWithResolver(coinbase.address, 'hey-hoy-reh-4723', nonResolverAddress);
                const data = yield proxyReader.getDataByHash(hashes, tokenId);
                (0, chai_1.expect)(data).to.be.eql([nonResolverAddress, coinbase.address, ['', ''], ['', '']]);
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
                    [['', ''], ['', '']],
                    [['', ''], ['', '']],
                ]);
            }));
            it('should return data for multiple .crypto|.wallet domains', () => __awaiter(void 0, void 0, void 0, function* () {
                const hashes = keys.map(ethers_1.utils.id);
                const _domainName = 'test_1082q';
                const _cryptoTokenId = yield unsRegistry.namehash([_domainName, 'crypto']);
                const _walletTokenId = yield (0, registry_1.mintDomain)(unsRegistry, coinbase.address, ['test_1082q', 'wallet']);
                yield mintingController.mintSLDWithResolver(coinbase.address, _domainName, resolver.address);
                for (let i = 0; i < keys.length; i++) {
                    yield resolver.set(keys[i], values[i], _cryptoTokenId);
                    yield unsRegistry.set(keys[i], values[i], _walletTokenId);
                }
                const data = yield proxyReader.callStatic.getDataByHashForMany(hashes, [_walletTokenId, _cryptoTokenId]);
                (0, chai_1.expect)(data).to.be.eql([
                    [unsRegistry.address, resolver.address],
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
                const _cryptoTokenId = yield unsRegistry.namehash([_domainName, 'crypto']);
                const _walletTokenId = yield (0, registry_1.mintDomain)(unsRegistry, accounts[0], ['test_125t', 'wallet']);
                yield mintingController.mintSLDWithResolver(coinbase.address, _domainName, resolver.address);
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
            const unknownTokenId = yield cnsRegistry.childIdOf(constants_1.TLD.CRYPTO, 'unknown');
            const address = yield proxyReader.registryOf(unknownTokenId);
            (0, chai_1.expect)(address).to.be.equal(constants_1.ZERO_ADDRESS);
        }));
        it('should return value for .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, accounts[3], ['hey_hoy_98hds', 'wallet']);
            const address = yield proxyReader.registryOf(tokenId);
            (0, chai_1.expect)(address).to.be.equal(unsRegistry.address);
        }));
        it('should return value for .crypto domain', () => __awaiter(void 0, void 0, void 0, function* () {
            const _domainName = 'hey_hoy_98hds';
            const _cryptoTokenId = yield cnsRegistry.childIdOf(constants_1.TLD.CRYPTO, _domainName);
            yield mintingController.mintSLD(accounts[3], _domainName);
            const address = yield proxyReader.registryOf(_cryptoTokenId);
            (0, chai_1.expect)(address).to.be.equal(cnsRegistry.address);
        }));
        it('should return value for .crypto TLD', () => __awaiter(void 0, void 0, void 0, function* () {
            const address = yield proxyReader.registryOf(constants_1.TLD.CRYPTO);
            (0, chai_1.expect)(address).to.be.equal(cnsRegistry.address);
        }));
        it('should return value for .wallet TLD', () => __awaiter(void 0, void 0, void 0, function* () {
            const address = yield proxyReader.registryOf(constants_1.TLD.WALLET);
            (0, chai_1.expect)(address).to.be.equal(unsRegistry.address);
        }));
    });
    describe('Multicall', () => {
        const abiCoder = new ethers_1.utils.AbiCoder();
        it('should return owners', () => __awaiter(void 0, void 0, void 0, function* () {
            const unknownTokenId = yield unsRegistry.namehash(['unknown', 'crypto']);
            const owners = yield proxyReader.callStatic.multicall([
                proxyReader.interface.encodeFunctionData('ownerOf', [unknownTokenId]),
                proxyReader.interface.encodeFunctionData('ownerOf', [walletTokenId]),
                proxyReader.interface.encodeFunctionData('ownerOf', [cryptoTokenId]),
            ]);
            const results = owners.map(owner => abiCoder.decode(['address'], owner)[0]);
            (0, chai_1.expect)(results).to.be.eql([constants_1.ZERO_ADDRESS, coinbase.address, coinbase.address]);
        }));
        it('should return existance of tokens', () => __awaiter(void 0, void 0, void 0, function* () {
            const unknownTokenId = yield unsRegistry.namehash(['unknown', 'crypto']);
            const owners = yield proxyReader.callStatic.multicall([
                proxyReader.interface.encodeFunctionData('exists', [unknownTokenId]),
                proxyReader.interface.encodeFunctionData('exists', [walletTokenId]),
                proxyReader.interface.encodeFunctionData('exists', [cryptoTokenId]),
            ]);
            const results = owners.map(owner => abiCoder.decode(['bool'], owner)[0]);
            (0, chai_1.expect)(results).to.be.eql([false, true, true]);
        }));
        it('should return token uri\'s for UNS and CNS', () => __awaiter(void 0, void 0, void 0, function* () {
            const owners = yield proxyReader.callStatic.multicall([
                proxyReader.interface.encodeFunctionData('tokenURI', [cryptoTokenId]),
                proxyReader.interface.encodeFunctionData('tokenURI', [walletTokenId]),
            ]);
            const results = owners.map(owner => abiCoder.decode(['string'], owner)[0]);
            (0, chai_1.expect)(results).to.be.eql([
                'test_42.crypto',
                '/40559307672254207728557027035302885851369665055277251407821151545011532191308',
            ]);
        }));
        it('should return heterogeneous call results', () => __awaiter(void 0, void 0, void 0, function* () {
            yield resolver.set('het_key_111', 'het_value_1', cryptoTokenId);
            const data = yield proxyReader.callStatic.multicall([
                proxyReader.interface.encodeFunctionData('ownerOf', [cryptoTokenId]),
                proxyReader.interface.encodeFunctionData('get', ['het_key_111', cryptoTokenId]),
                proxyReader.interface.encodeFunctionData('getData', [['het_key_111'], cryptoTokenId]),
                proxyReader.interface.encodeFunctionData('ownerOfForMany', [[walletTokenId, cryptoTokenId]]),
                proxyReader.interface.encodeFunctionData('registryOf', [walletTokenId]),
            ]);
            const results = [];
            [
                ['address'],
                ['string'],
                ['address', 'address', 'string[]'],
                ['address[]'],
                ['address'],
            ].forEach((output, i) => {
                results.push(abiCoder.decode(output, data[i]));
            });
            (0, chai_1.expect)(results).to.be.eql([
                [coinbase.address],
                ['het_value_1'],
                [
                    resolver.address,
                    coinbase.address,
                    ['het_value_1'],
                ],
                [[coinbase.address, coinbase.address]],
                [unsRegistry.address],
            ]);
        }));
    });
});
