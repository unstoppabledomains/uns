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
const contracts_1 = require("../types/factories/contracts");
const mocks_1 = require("../types/factories/contracts/mocks");
const contracts_2 = require("../types/factories/dot-crypto/contracts");
const controllers_1 = require("../types/factories/dot-crypto/contracts/controllers");
const constants_1 = require("./helpers/constants");
describe('MintingManager', () => {
    const DomainNamePrefix = 'uns-devtest-';
    let unsRegistry, unsRegistryMock, unsOperator, cnsRegistry, resolver, mintingController, uriPrefixController, mintingManager, mintingManagerMock, proxyReader;
    let signers, domainSuffix;
    let coinbase, receiver, developer, spender;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [coinbase] = signers;
    }));
    describe('Ownership', () => {
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            [, , receiver] = signers;
            unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
            mintingManager = yield new contracts_1.MintingManager__factory(coinbase).deploy();
            yield unsRegistry.initialize(mintingManager.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
            yield mintingManager.initialize(unsRegistry.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
        }));
        it('should transfer ownership', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, chai_1.expect)(yield mintingManager.owner()).to.be.equal(coinbase.address);
            yield mintingManager.transferOwnership(receiver.address);
            (0, chai_1.expect)(yield mintingManager.owner()).to.be.equal(receiver.address);
            yield (0, chai_1.expect)(mintingManager.connect(coinbase).pause()).to.be.revertedWith('Ownable: caller is not the owner');
        }));
    });
    describe('addProxyReaders', () => __awaiter(void 0, void 0, void 0, function* () {
        let proxyReader2;
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            [, , receiver] = signers;
            unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
            mintingManager = yield new contracts_1.MintingManager__factory(coinbase).deploy();
            cnsRegistry = yield new contracts_2.CNSRegistry__factory(coinbase).deploy();
            unsRegistryMock = yield new mocks_1.UNSRegistryMock__factory(coinbase).deploy();
            mintingManagerMock = yield new mocks_1.MintingManagerMock__factory(coinbase).deploy();
            yield unsRegistryMock.initialize(mintingManagerMock.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
            yield mintingManagerMock.initialize(unsRegistryMock.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
            yield mintingManagerMock.addMinter(coinbase.address);
            proxyReader = yield new contracts_1.ProxyReader__factory(coinbase).deploy();
            yield proxyReader.initialize(unsRegistryMock.address, cnsRegistry.address);
            proxyReader2 = yield new contracts_1.ProxyReader__factory(coinbase).deploy();
            yield proxyReader2.initialize(unsRegistryMock.address, cnsRegistry.address);
        }));
        it('adds ProxyReader addresses', () => __awaiter(void 0, void 0, void 0, function* () {
            const labels = ['add-proxy-readers-test', 'crypto'];
            yield mintingManagerMock.issueWithRecords(receiver.address, labels, [], [], true);
            const tokenId = yield unsRegistryMock.namehash(labels);
            yield mintingManagerMock.addProxyReaders([proxyReader.address, proxyReader2.address]);
            yield mintingManagerMock.upgradeAll([tokenId]);
            yield unsRegistryMock.connect(receiver).set('key', 'value', tokenId);
            const [, , result] = yield proxyReader.connect(receiver).callStatic.getData(['key'], tokenId);
            const [, , result2] = yield proxyReader2.callStatic.getData(['key'], tokenId);
            (0, chai_1.expect)(result).to.deep.equal(['']);
            (0, chai_1.expect)(result2).to.deep.equal(['']);
        }));
        it('should revert if not owner', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, chai_1.expect)(mintingManager.connect(signers[1]).addProxyReaders([proxyReader.address])).to.be.revertedWith('Ownable: caller is not the owner');
        }));
    }));
    describe('setOperator', () => __awaiter(void 0, void 0, void 0, function* () {
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            [, , receiver] = signers;
            unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
            mintingManager = yield new contracts_1.MintingManager__factory(coinbase).deploy();
            unsOperator = yield new contracts_1.UNSOperator__factory(coinbase).deploy();
            yield unsRegistry.initialize(mintingManager.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
            yield mintingManager.initialize(unsRegistry.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
            yield mintingManager.addMinter(coinbase.address);
        }));
        it('saves UNSOperator address', () => __awaiter(void 0, void 0, void 0, function* () {
            yield mintingManager.connect(coinbase).setOperator(unsOperator.address);
            const labels = ['uns-operator-subdomain-test', 'crypto'];
            yield mintingManager.connect(coinbase).issueWithRecords(receiver.address, labels, [], [], true);
            yield unsRegistry.connect(receiver).approve(unsOperator.address, yield unsRegistry.namehash(labels));
            const subdomainLabels = ['sub', ...labels];
            yield mintingManager.connect(coinbase).issueWithRecords(coinbase.address, subdomainLabels, [], [], true);
            const subdomainTokenId = yield unsRegistry.namehash(subdomainLabels);
            (0, chai_1.expect)(yield unsRegistry.ownerOf(subdomainTokenId)).to.equal(coinbase.address);
        }));
        it('should revert if not owner', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, chai_1.expect)(mintingManager.connect(signers[1]).setOperator(unsOperator.address)).to.be.revertedWith('Ownable: caller is not the owner');
        }));
    }));
    describe('TLD management', () => {
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            [, spender] = signers;
            unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
            mintingManager = yield new contracts_1.MintingManager__factory(coinbase).deploy();
            yield unsRegistry.initialize(mintingManager.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
            yield mintingManager.initialize(unsRegistry.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
            yield mintingManager.addMinter(coinbase.address);
        }));
        describe('addTld', () => __awaiter(void 0, void 0, void 0, function* () {
            it('should add new TLD', () => __awaiter(void 0, void 0, void 0, function* () {
                const _tld = 'test';
                const _hashname = eth_ens_namehash_1.default.hash(_tld);
                const labels = ['test-1', _tld];
                yield (0, chai_1.expect)(mintingManager.addTld(_tld)).to.emit(mintingManager, 'NewTld').withArgs(_hashname, _tld);
                yield mintingManager.issueWithRecords(coinbase.address, labels, [], [], true);
                const tokenId = yield unsRegistry.namehash(labels);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
                (0, chai_1.expect)(yield unsRegistry.exists(_hashname)).to.be.equal(true);
            }));
            it('should revert adding TLD when non-owner', () => __awaiter(void 0, void 0, void 0, function* () {
                const _tld = 'test1';
                yield (0, chai_1.expect)(mintingManager.connect(spender).addTld(_tld)).to.be.revertedWith('Ownable: caller is not the owner');
            }));
            it('should have all supported tlds minted', () => __awaiter(void 0, void 0, void 0, function* () {
                for (const key of Object.keys(constants_1.TLD)) {
                    (0, chai_1.expect)(yield unsRegistry.ownerOf(constants_1.TLD[key])).to.be.equal(mintingManager.address);
                }
            }));
        }));
        describe('removeTld', () => __awaiter(void 0, void 0, void 0, function* () {
            it('should be able to remove existing TLD', () => __awaiter(void 0, void 0, void 0, function* () {
                const tld = 'test-removing-tld';
                const hashname = eth_ens_namehash_1.default.hash(tld);
                yield mintingManager.addTld(tld);
                yield (0, chai_1.expect)(mintingManager.removeTld(hashname)).to.emit(mintingManager, 'RemoveTld').withArgs(hashname);
                yield (0, chai_1.expect)(mintingManager.issueWithRecords(coinbase.address, ['sld-domain-qq', tld], [], [], true)).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
            }));
            it('should revert removing TLD when not registred', () => __awaiter(void 0, void 0, void 0, function* () {
                const hashname = eth_ens_namehash_1.default.hash('test-removing-tld-not-existing');
                yield (0, chai_1.expect)(mintingManager.removeTld(hashname)).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
            }));
            it('should revert removing TLD when non-owner', () => __awaiter(void 0, void 0, void 0, function* () {
                const tld = 'test-removing-tld-when-not-owner';
                const hashname = eth_ens_namehash_1.default.hash(tld);
                yield mintingManager.addTld(tld);
                yield (0, chai_1.expect)(mintingManager.connect(spender).removeTld(hashname)).to.be.revertedWith('Ownable: caller is not the owner');
            }));
        }));
    });
    describe('Claiming', () => {
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            [, developer, receiver] = signers;
            unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
            mintingManager = yield new contracts_1.MintingManager__factory(coinbase).deploy();
            yield unsRegistry.initialize(mintingManager.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
            yield mintingManager.initialize(unsRegistry.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
            yield mintingManager.setTokenURIPrefix('/');
        }));
        beforeEach(() => {
            domainSuffix = `prefixed-domain-${Math.floor(Math.random() * 1000)}`;
        });
        describe('claim(uint256,string)', () => {
            it('should mint prefixed domain', () => __awaiter(void 0, void 0, void 0, function* () {
                yield mintingManager.connect(developer).functions['claim(uint256,string)'](constants_1.TLD.WALLET, domainSuffix);
                const tokenId = yield unsRegistry.namehash([`${DomainNamePrefix}${domainSuffix}`, 'wallet']);
                (0, chai_1.expect)(yield unsRegistry.tokenURI(tokenId)).to.be.equal(`/${tokenId}`);
            }));
            it('should send domain to requester', () => __awaiter(void 0, void 0, void 0, function* () {
                yield mintingManager.connect(developer).functions['claim(uint256,string)'](constants_1.TLD.WALLET, domainSuffix);
                const tokenId = yield unsRegistry.namehash([`${DomainNamePrefix}${domainSuffix}`, 'wallet']);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(developer.address);
            }));
            it('should revert minting same domain twice', () => __awaiter(void 0, void 0, void 0, function* () {
                const minter = mintingManager.connect(developer);
                yield minter.functions['claim(uint256,string)'](constants_1.TLD.WALLET, domainSuffix);
                yield (0, chai_1.expect)(minter.functions['claim(uint256,string)'](constants_1.TLD.WALLET, domainSuffix)).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
            }));
            it('should revert minting legacy CNS free domains', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(mintingManager.connect(developer).functions['claim(uint256,string)'](constants_1.TLD.WALLET, 'udtestdev-t1')).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
            }));
        });
        describe('claimTo(address,uint256,string)', () => {
            it('should mint domain to receiver', () => __awaiter(void 0, void 0, void 0, function* () {
                yield mintingManager
                    .connect(developer)
                    .functions['claimTo(address,uint256,string)'](receiver.address, constants_1.TLD.WALLET, domainSuffix);
                const tokenId = yield unsRegistry.namehash([`${DomainNamePrefix}${domainSuffix}`, 'wallet']);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
            }));
            it('should revert minting legacy CNS free domains', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(mintingManager
                    .connect(developer)
                    .functions['claimTo(address,uint256,string)'](receiver.address, constants_1.TLD.CRYPTO, 'udtestdev-t2')).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
            }));
        });
        describe('claimToWithRecords(address,uint256,string,string[],string[])', () => {
            const selector = 'claimToWithRecords(address,uint256,string,string[],string[])';
            it('should mint domain to receiver with predefined keys', () => __awaiter(void 0, void 0, void 0, function* () {
                const minter = mintingManager.connect(developer);
                yield minter.functions[selector](receiver.address, constants_1.TLD.WALLET, domainSuffix, ['key'], ['value']);
                const tokenId = yield unsRegistry.namehash([`${DomainNamePrefix}${domainSuffix}`, 'wallet']);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
                (0, chai_1.expect)(yield unsRegistry.getMany(['key'], tokenId)).to.be.eql(['value']);
            }));
            it('should mint domain with empty keys', () => __awaiter(void 0, void 0, void 0, function* () {
                const minter = mintingManager.connect(developer);
                yield minter.functions[selector](receiver.address, constants_1.TLD.WALLET, domainSuffix, [], []);
                const tokenId = yield unsRegistry.namehash([`${DomainNamePrefix}${domainSuffix}`, 'wallet']);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
                (0, chai_1.expect)(yield unsRegistry.getMany(['key1', 'key2'], tokenId)).to.be.eql(['', '']);
            }));
            it('should revert minting legacy CNS free domains', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(mintingManager.connect(developer).functions[selector](receiver.address, constants_1.TLD.CRYPTO, 'udtestdev-t3', [], [])).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
            }));
        });
    });
    describe('Minting', () => {
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            [, , receiver, spender] = signers;
            unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
            unsOperator = yield new contracts_1.UNSOperator__factory(coinbase).deploy();
            mintingManager = yield new contracts_1.MintingManager__factory(coinbase).deploy();
            yield unsRegistry.initialize(mintingManager.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
            yield mintingManager.initialize(unsRegistry.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, unsOperator.address, constants_1.ZERO_ADDRESS);
            yield mintingManager.addMinter(coinbase.address);
            yield mintingManager.setTokenURIPrefix('/');
        }));
        describe('mint second level domain', () => {
            it('should revert minting when tld is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(mintingManager.issueWithRecords(coinbase.address, ['test-2ka3', 'unknown'], [], [], true)).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
            }));
            it('should mint .wallet domain', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = ['test-2dp', 'wallet'];
                yield mintingManager.issueWithRecords(coinbase.address, labels, [], [], true);
                const tokenId = yield unsRegistry.namehash(labels);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
            }));
            it('should mint .crypto damain in UNS registry when CNS registry undefined', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = ['test-uc-3v8n', 'crypto'];
                yield mintingManager.issueWithRecords(coinbase.address, labels, [], [], true);
                const tokenId = yield unsRegistry.namehash(labels);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
            }));
            it('should revert minting legacy CNS free domains', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(mintingManager.issueWithRecords(coinbase.address, ['udtestdev-t5', 'crypto'], [], [], true)).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
            }));
        });
        describe('mint subdomain', () => {
            it('should revert minting when account is not the SLD owner', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = ['test-1sub', 'wallet'];
                yield mintingManager.connect(coinbase).issueWithRecords(coinbase.address, labels, [], [], true);
                labels.unshift('sub');
                yield (0, chai_1.expect)(mintingManager.connect(receiver).issueWithRecords(coinbase.address, labels, [], [], true)).to.be.revertedWith('MintingManager: SENDER_IS_NOT_APPROVED_OR_OWNER');
            }));
            it('should mint when account is minter and parent domain is approved for UNSOperator', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = ['test-1sub-operator', 'wallet'];
                yield mintingManager.connect(coinbase).issueWithRecords(receiver.address, labels, [], [], true);
                const parentTokenId = yield unsRegistry.namehash(labels);
                yield unsRegistry.connect(receiver).approve(unsOperator.address, parentTokenId);
                const subdomainLabels = ['sub', ...labels];
                const tokenId = yield unsRegistry.namehash(subdomainLabels);
                yield mintingManager.connect(coinbase).issueWithRecords(receiver.address, subdomainLabels, [], [], true);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.equal(receiver.address);
            }));
            it('should revert when domain is approved for UNSOperator and account is not owner or minter', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = ['test-1sub-operator2', 'wallet'];
                yield mintingManager.connect(coinbase).issueWithRecords(receiver.address, labels, [], [], true);
                const parentTokenId = yield unsRegistry.namehash(labels);
                yield unsRegistry.connect(receiver).approve(unsOperator.address, parentTokenId);
                labels.unshift('sub');
                yield (0, chai_1.expect)(mintingManager.connect(spender).issueWithRecords(receiver.address, labels, [], [], true)).to.be.revertedWith('MintingManager: SENDER_IS_NOT_APPROVED_OR_OWNER');
            }));
            it('should mint when account is owner and parent domain is approved for UNSOperator', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = ['test-1sub-operator3', 'wallet'];
                yield mintingManager.connect(coinbase).issueWithRecords(receiver.address, labels, [], [], true);
                const parentTokenId = yield unsRegistry.namehash(labels);
                yield unsRegistry.connect(receiver).approve(unsOperator.address, parentTokenId);
                const subdomainLabels = ['sub', ...labels];
                const tokenId = yield unsRegistry.namehash(subdomainLabels);
                yield mintingManager.connect(receiver).issueWithRecords(receiver.address, subdomainLabels, [], [], true);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.equal(receiver.address);
            }));
            it('should mint .wallet subdomain', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = ['test-1sub2', 'wallet'];
                yield mintingManager.connect(coinbase).issueWithRecords(coinbase.address, labels, [], [], true);
                labels.unshift('sub');
                yield mintingManager.connect(coinbase).issueWithRecords(receiver.address, labels, [], [], true);
                const tokenId = yield unsRegistry.namehash(labels);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
            }));
            it('should mint .crypto subdomain in UNS registry when CNS registry undefined', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = ['test-1sub3', 'crypto'];
                yield mintingManager.connect(coinbase).issueWithRecords(coinbase.address, labels, [], [], true);
                labels.unshift('sub');
                yield mintingManager.connect(coinbase).issueWithRecords(receiver.address, labels, [], [], true);
                const tokenId = yield unsRegistry.namehash(labels);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
            }));
            it('should mint subdomain by a token operator', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = ['test-10sub-2', 'wallet'];
                const tokenId = yield unsRegistry.namehash(labels);
                yield mintingManager.connect(coinbase).issueWithRecords(coinbase.address, labels, [], [], false);
                yield unsRegistry.connect(coinbase).approve(receiver.address, tokenId);
                labels.unshift('sub');
                yield mintingManager.connect(receiver).issueWithRecords(receiver.address, labels, [], [], false);
                const subTokenId = yield unsRegistry.namehash(labels);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(subTokenId)).to.be.equal(receiver.address);
            }));
            it('should mint subdomain by an operator', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = ['test-11sub-2', 'wallet'];
                yield mintingManager.connect(coinbase).issueWithRecords(coinbase.address, labels, [], [], false);
                yield unsRegistry.connect(coinbase).setApprovalForAll(receiver.address, true);
                labels.unshift('sub');
                yield mintingManager.connect(receiver).issueWithRecords(receiver.address, labels, [], [], false);
                const subTokenId = yield unsRegistry.namehash(labels);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(subTokenId)).to.be.equal(receiver.address);
            }));
        });
        describe('label verification', () => {
            it('should not allow to mint domains with invalid labels', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = [
                    '',
                    ' ',
                    'Q',
                    'qwertY',
                    'qwErty',
                    '*',
                    '$3123',
                    '\tq',
                    'q\n',
                    '@',
                    'k.h',
                    '-asd',
                    'dsa2-',
                    '-dddd-',
                    '-',
                    '--',
                    '-----',
                ];
                yield mintingManager.issueWithRecords(coinbase.address, ['test1', 'x'], [], [], true);
                for (const label of labels) {
                    if (label) {
                        yield (0, chai_1.expect)(mintingManager.issueWithRecords(coinbase.address, [label, 'test1', 'x'], [], [], true)).to.be.revertedWith('MintingManager: LABEL_INVALID');
                    }
                    yield (0, chai_1.expect)(mintingManager.claim(constants_1.TLD.X, label)).to.be.revertedWith('MintingManager: LABEL_INVALID');
                    yield (0, chai_1.expect)(mintingManager.claimTo(coinbase.address, constants_1.TLD.X, label)).to.be.revertedWith('MintingManager: LABEL_INVALID');
                    yield (0, chai_1.expect)(mintingManager.claimToWithRecords(coinbase.address, constants_1.TLD.X, label, [], [])).to.be.revertedWith('MintingManager: LABEL_INVALID');
                }
            }));
            it('should allow to mint domains with valid labels', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = [
                    'q',
                    '1',
                    'q1',
                    '1q',
                    '1-q',
                    'qwerty',
                    'qw-erty',
                    'qw3rty',
                    'qw3-rty1',
                    'test-test1-test2',
                ];
                yield mintingManager.issueWithRecords(coinbase.address, ['test2', 'x'], [], [], false);
                for (const label of labels) {
                    const domainLabels = [label, 'x'];
                    const subdomainLabels = [label, 'test2', 'x'];
                    yield mintingManager.issueWithRecords(coinbase.address, domainLabels, [], [], true);
                    yield mintingManager.issueWithRecords(coinbase.address, subdomainLabels, [], [], true);
                    const domainTokenId = yield unsRegistry.namehash(domainLabels);
                    (0, chai_1.expect)(yield unsRegistry.ownerOf(domainTokenId)).to.be.equal(coinbase.address);
                    const subdomainTkenId = yield unsRegistry.namehash(domainLabels);
                    (0, chai_1.expect)(yield unsRegistry.ownerOf(subdomainTkenId)).to.be.equal(coinbase.address);
                }
            }));
        });
    });
    describe('Tld-based minting', () => {
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
            cnsRegistry = yield new contracts_2.CNSRegistry__factory(coinbase).deploy();
            mintingController = yield new controllers_1.MintingController__factory(coinbase).deploy(cnsRegistry.address);
            yield cnsRegistry.addController(mintingController.address);
            resolver = yield new contracts_2.Resolver__factory(coinbase).deploy(cnsRegistry.address, mintingController.address);
            uriPrefixController = yield new controllers_1.URIPrefixController__factory(coinbase).deploy(cnsRegistry.address);
            yield cnsRegistry.addController(uriPrefixController.address);
            mintingManager = yield new contracts_1.MintingManager__factory(coinbase).deploy();
            yield unsRegistry.initialize(mintingManager.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
            yield mintingController.addMinter(mintingManager.address);
            yield uriPrefixController.addWhitelisted(mintingManager.address);
            yield mintingManager.initialize(unsRegistry.address, mintingController.address, uriPrefixController.address, resolver.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
            yield mintingManager.addMinter(coinbase.address);
            yield mintingManager.setTokenURIPrefix('/');
        }));
        it('should have registered all tlds', () => __awaiter(void 0, void 0, void 0, function* () {
            Object.values(constants_1.TLD).forEach((tld) => __awaiter(void 0, void 0, void 0, function* () {
                (0, chai_1.expect)(yield unsRegistry.exists(tld)).to.be.equal(true);
            }));
        }));
        describe('claim(uint256,string)', () => {
            it('should claim .crypto domain in CNS registry', () => __awaiter(void 0, void 0, void 0, function* () {
                yield mintingManager['claim(uint256,string)'](constants_1.TLD.CRYPTO, 'test-c221');
                const tokenId = yield cnsRegistry.childIdOf(constants_1.TLD.CRYPTO, `${DomainNamePrefix}test-c221`);
                (0, chai_1.expect)(yield cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
                yield (0, chai_1.expect)(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: invalid token ID');
                (0, chai_1.expect)(yield cnsRegistry.tokenURI(tokenId)).to.be.eql('/uns-devtest-test-c221.crypto');
                (0, chai_1.expect)(yield cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
            }));
            it('should claim .wallet domain in UNS registry', () => __awaiter(void 0, void 0, void 0, function* () {
                yield mintingManager['claim(uint256,string)'](constants_1.TLD.WALLET, 'test-c029');
                const tokenId = yield cnsRegistry.childIdOf(constants_1.TLD.WALLET, `${DomainNamePrefix}test-c029`);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
                yield (0, chai_1.expect)(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
                (0, chai_1.expect)(yield unsRegistry.tokenURI(tokenId)).to.be.equal(`/${tokenId}`);
            }));
        });
        describe('claimTo(address,uint256,string)', () => {
            it('should claim .crypto domain in CNS registry', () => __awaiter(void 0, void 0, void 0, function* () {
                yield mintingManager['claimTo(address,uint256,string)'](coinbase.address, constants_1.TLD.CRYPTO, 'test-cd983');
                const tokenId = yield cnsRegistry.childIdOf(constants_1.TLD.CRYPTO, `${DomainNamePrefix}test-cd983`);
                (0, chai_1.expect)(yield cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
                yield (0, chai_1.expect)(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: invalid token ID');
                (0, chai_1.expect)(yield cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
            }));
            it('should claim .wallet domain in UNS registry', () => __awaiter(void 0, void 0, void 0, function* () {
                yield mintingManager['claimTo(address,uint256,string)'](coinbase.address, constants_1.TLD.WALLET, 'test-cdsi47');
                const tokenId = yield cnsRegistry.childIdOf(constants_1.TLD.WALLET, `${DomainNamePrefix}test-cdsi47`);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
                yield (0, chai_1.expect)(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
            }));
        });
        describe('claimToWithRecords(address,uint256,string,string[],string[])', () => {
            const selector = 'claimToWithRecords(address,uint256,string,string[],string[])';
            it('should mint with records .crypto domain in CNS registry', () => __awaiter(void 0, void 0, void 0, function* () {
                yield mintingManager[selector](coinbase.address, constants_1.TLD.CRYPTO, 'test-c039', ['key1'], ['value3']);
                const tokenId = yield cnsRegistry.childIdOf(constants_1.TLD.CRYPTO, `${DomainNamePrefix}test-c039`);
                (0, chai_1.expect)(yield cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
                yield (0, chai_1.expect)(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: invalid token ID');
                (0, chai_1.expect)(yield resolver.get('key1', tokenId)).to.be.eql('value3');
                (0, chai_1.expect)(yield cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
            }));
            it('should claim with records .wallet domain in UNS registry', () => __awaiter(void 0, void 0, void 0, function* () {
                yield mintingManager[selector](coinbase.address, constants_1.TLD.WALLET, 'test-c846', ['key9'], ['value2']);
                const tokenId = yield cnsRegistry.childIdOf(constants_1.TLD.WALLET, `${DomainNamePrefix}test-c846`);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
                yield (0, chai_1.expect)(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
                (0, chai_1.expect)(yield unsRegistry.get('key9', tokenId)).to.be.eql('value2');
            }));
        });
        describe('issueWithRecords(address,string[],string[],string[],bool)', () => {
            it('should mint with records .crypto domain in CNS registry', () => __awaiter(void 0, void 0, void 0, function* () {
                yield mintingManager.issueWithRecords(coinbase.address, ['test-m110-2', 'crypto'], ['key1'], ['value1'], true);
                const tokenId = yield cnsRegistry.childIdOf(constants_1.TLD.CRYPTO, 'test-m110-2');
                (0, chai_1.expect)(yield cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
                yield (0, chai_1.expect)(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: invalid token ID');
                (0, chai_1.expect)(yield resolver.get('key1', tokenId)).to.be.eql('value1');
                (0, chai_1.expect)(yield cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
            }));
            it('should mint with records .wallet domain in UNS registry', () => __awaiter(void 0, void 0, void 0, function* () {
                yield mintingManager.issueWithRecords(coinbase.address, ['test-mcm332-2', 'wallet'], ['key1'], ['value1'], true);
                const tokenId = yield cnsRegistry.childIdOf(constants_1.TLD.WALLET, 'test-mcm332-2');
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
                yield (0, chai_1.expect)(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
                (0, chai_1.expect)(yield unsRegistry.get('key1', tokenId)).to.be.eql('value1');
            }));
            it('should issue with records returned .wallet domains in UNS registry', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = ['returned1-2', 'wallet'];
                yield mintingManager.issueWithRecords(signers[2].address, labels, ['key1'], ['value1'], true);
                const tokenId = yield unsRegistry.namehash(labels);
                const labelsSub = ['sub', 'returned1-2', 'wallet'];
                yield mintingManager
                    .connect(signers[2])
                    .issueWithRecords(signers[2].address, labelsSub, ['key1'], ['value1'], true);
                const tokenIdSub = yield unsRegistry.namehash(labelsSub);
                yield unsRegistry.connect(signers[2]).setOwner(mintingManager.address, tokenIdSub);
                yield unsRegistry.connect(signers[2]).setOwner(mintingManager.address, tokenId);
                yield mintingManager.issueWithRecords(signers[1].address, labels, ['key1'], ['value2'], true);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.eql(signers[1].address);
                (0, chai_1.expect)(yield unsRegistry.get('key1', tokenId)).to.be.eql('value2');
                (0, chai_1.expect)(yield unsRegistry.reverseOf(signers[1].address)).to.be.equal(tokenId);
                yield mintingManager
                    .connect(signers[1])
                    .issueWithRecords(signers[1].address, labelsSub, ['key1'], ['value2'], true);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenIdSub)).to.be.eql(signers[1].address);
                (0, chai_1.expect)(yield unsRegistry.get('key1', tokenIdSub)).to.be.eql('value2');
                (0, chai_1.expect)(yield unsRegistry.reverseOf(signers[1].address)).to.be.equal(tokenId);
            }));
            it('should issue with records but without reverse returned .wallet domains in UNS registry', () => __awaiter(void 0, void 0, void 0, function* () {
                const labels = ['returned-reverse-1', 'wallet'];
                yield mintingManager.issueWithRecords(signers[2].address, labels, ['key1'], ['value1'], true);
                const tokenId = yield unsRegistry.namehash(labels);
                const labelsSub = ['sub', 'returned-reverse-1', 'wallet'];
                yield mintingManager
                    .connect(signers[2])
                    .issueWithRecords(signers[2].address, labelsSub, ['key1'], ['value1'], true);
                const tokenIdSub = yield unsRegistry.namehash(labelsSub);
                yield unsRegistry.connect(signers[2]).setOwner(mintingManager.address, tokenIdSub);
                yield unsRegistry.connect(signers[2]).setOwner(mintingManager.address, tokenId);
                yield unsRegistry.connect(signers[1]).removeReverse();
                yield mintingManager.issueWithRecords(signers[1].address, labels, ['key1'], ['value2'], false);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.eql(signers[1].address);
                (0, chai_1.expect)(yield unsRegistry.get('key1', tokenId)).to.be.eql('value2');
                (0, chai_1.expect)(yield unsRegistry.reverseOf(signers[1].address)).to.be.equal(0);
                yield mintingManager
                    .connect(signers[1])
                    .issueWithRecords(signers[1].address, labelsSub, ['key1'], ['value2'], true);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenIdSub)).to.be.eql(signers[1].address);
                (0, chai_1.expect)(yield unsRegistry.get('key1', tokenIdSub)).to.be.eql('value2');
                (0, chai_1.expect)(yield unsRegistry.reverseOf(signers[1].address)).to.be.equal(tokenIdSub);
            }));
            it('should revert minting legacy CNS free domains', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(mintingManager.issueWithRecords(coinbase.address, ['udtestdev-t8', 'crypto'], ['key1'], ['value1'], true)).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
            }));
        });
    });
    describe('CNS Resolver management', () => {
        before(() => __awaiter(void 0, void 0, void 0, function* () {
            unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
            mintingManager = yield new contracts_1.MintingManager__factory(coinbase).deploy();
            yield unsRegistry.initialize(mintingManager.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
            yield mintingManager.initialize(unsRegistry.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
        }));
        it('should return zero resolver when initialized by zero address', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, chai_1.expect)(yield mintingManager.cnsResolver()).to.be.equal(constants_1.ZERO_ADDRESS);
        }));
    });
    describe('Blocklist', () => {
        describe('Domain blocklisting', () => {
            before(() => __awaiter(void 0, void 0, void 0, function* () {
                unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
                mintingManager = yield new contracts_1.MintingManager__factory(coinbase).deploy();
                yield unsRegistry.initialize(mintingManager.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
                yield mintingManager.initialize(unsRegistry.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
                yield mintingManager.addMinter(coinbase.address);
            }));
            it('should block token after mint', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield unsRegistry.namehash(['test-block-49vh', 'wallet']);
                (0, chai_1.expect)(yield mintingManager.isBlocked(tokenId)).to.be.equal(false);
                yield mintingManager.issueWithRecords(coinbase.address, ['test-block-49vh', 'wallet'], [], [], true);
                (0, chai_1.expect)(yield mintingManager.isBlocked(tokenId)).to.be.equal(true);
            }));
            it('should revert minting when token blocked', () => __awaiter(void 0, void 0, void 0, function* () {
                yield mintingManager.issueWithRecords(coinbase.address, ['test-block-3pef', 'wallet'], [], [], true);
                yield (0, chai_1.expect)(mintingManager.issueWithRecords(coinbase.address, ['test-block-3pef', 'wallet'], [], [], true)).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
            }));
            it('should revert claim when blocked', () => __awaiter(void 0, void 0, void 0, function* () {
                yield mintingManager.claim(constants_1.TLD.WALLET, 'test-block-90dh');
                yield (0, chai_1.expect)(mintingManager.claim(constants_1.TLD.WALLET, 'test-block-90dh')).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
            }));
            it('should revert claimTo when blocked', () => __awaiter(void 0, void 0, void 0, function* () {
                yield mintingManager.claimTo(coinbase.address, constants_1.TLD.WALLET, 'test-block-8fdb');
                yield (0, chai_1.expect)(mintingManager.claimTo(coinbase.address, constants_1.TLD.WALLET, 'test-block-8fdb')).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
            }));
            it('should revert claim with records when blocked', () => __awaiter(void 0, void 0, void 0, function* () {
                yield mintingManager.claimToWithRecords(coinbase.address, constants_1.TLD.WALLET, 'test-block-u4nf', [], []);
                yield (0, chai_1.expect)(mintingManager.claimToWithRecords(coinbase.address, constants_1.TLD.WALLET, 'test-block-u4nf', [], [])).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
            }));
            it('should revert minting when token burnt', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield unsRegistry.namehash(['test-block-1md0', 'wallet']);
                yield mintingManager.issueWithRecords(coinbase.address, ['test-block-1md0', 'wallet'], [], [], true);
                yield unsRegistry.burn(tokenId);
                yield (0, chai_1.expect)(mintingManager.issueWithRecords(coinbase.address, ['test-block-1md0', 'wallet'], [], [], true)).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
            }));
        });
    });
    describe('Pausable', () => {
        describe('Paused minting', () => {
            before(() => __awaiter(void 0, void 0, void 0, function* () {
                unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
                mintingManager = yield new contracts_1.MintingManager__factory(coinbase).deploy();
                yield unsRegistry.initialize(mintingManager.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
                yield mintingManager.initialize(unsRegistry.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
                yield mintingManager.addMinter(coinbase.address);
                yield mintingManager.pause();
            }));
            it('should revert claim when paused', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(mintingManager['claim(uint256,string)'](constants_1.TLD.WALLET, 'test-paused-mint')).to.be.revertedWith('Pausable: PAUSED');
            }));
            it('should revert claimTo when paused', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(mintingManager['claimTo(address,uint256,string)'](coinbase.address, constants_1.TLD.WALLET, 'test-paused-mint')).to.be.revertedWith('Pausable: PAUSED');
            }));
            it('should revert claim with resords when paused', () => __awaiter(void 0, void 0, void 0, function* () {
                const selector = 'claimToWithRecords(address,uint256,string,string[],string[])';
                yield (0, chai_1.expect)(mintingManager[selector](coinbase.address, constants_1.TLD.WALLET, 'test-paused-mint', [], [])).to.be.revertedWith('Pausable: PAUSED');
            }));
            it('should revert mint when paused', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(mintingManager.issueWithRecords(coinbase.address, ['test-paused-mint', 'wallet'], [], [], true)).to.be.revertedWith('Pausable: PAUSED');
            }));
            it('should revert mint with records when paused', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(mintingManager.issueWithRecords(coinbase.address, ['test-paused-mint', 'wallet'], [], [], true)).to.be.revertedWith('Pausable: PAUSED');
            }));
        });
        describe('Pausable management', () => {
            beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
                [, developer] = signers;
                unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
                mintingManager = yield new contracts_1.MintingManager__factory(coinbase).deploy();
                yield unsRegistry.initialize(mintingManager.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
                yield mintingManager.initialize(unsRegistry.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
                yield mintingManager.addMinter(coinbase.address);
            }));
            it('should revert pausing when called by non-owner', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(mintingManager.connect(developer).pause()).to.be.revertedWith('Ownable: caller is not the owner');
            }));
            it('should revert pausing when already paused', () => __awaiter(void 0, void 0, void 0, function* () {
                yield mintingManager.pause();
                yield (0, chai_1.expect)(mintingManager.pause()).to.be.revertedWith('Pausable: PAUSED');
            }));
            it('should revert unpausing when called by non-owner', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(mintingManager.connect(developer).unpause()).to.be.revertedWith('Ownable: caller is not the owner');
            }));
            it('should revert unpausing when not paused', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, chai_1.expect)(mintingManager.unpause()).to.be.revertedWith('Pausable: NOT_PAUSED');
            }));
            it('should pause and unpause', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield unsRegistry.namehash(['test-pausable', 'wallet']);
                yield (0, chai_1.expect)(mintingManager.pause()).to.emit(mintingManager, 'Paused').withArgs(coinbase.address);
                yield (0, chai_1.expect)(mintingManager.issueWithRecords(coinbase.address, ['test-pausable', 'wallet'], [], [], true)).to.be.revertedWith('Pausable: PAUSED');
                yield (0, chai_1.expect)(mintingManager.unpause()).to.emit(mintingManager, 'Unpaused').withArgs(coinbase.address);
                yield mintingManager.issueWithRecords(coinbase.address, ['test-pausable', 'wallet'], [], [], true);
                (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
            }));
        });
    });
});
