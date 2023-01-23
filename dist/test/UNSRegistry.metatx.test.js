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
const metatx_1 = require("./helpers/metatx");
const constants_1 = require("./helpers/constants");
const registry_1 = require("./helpers/registry");
const proxy_1 = require("./helpers/proxy");
describe('UNSRegistry (metatx)', () => {
    let unsRegistry, buildExecuteParams;
    let signers, coinbase, owner, nonOwner, receiver, accessControl, operator;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [coinbase, owner, nonOwner, receiver, accessControl, operator] = signers;
        unsRegistry = yield new contracts_1.UNSRegistry__factory(coinbase).deploy();
        yield unsRegistry.initialize(coinbase.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
        yield unsRegistry.mintTLD(constants_1.TLD.CRYPTO, 'crypto');
        yield unsRegistry.setTokenURIPrefix('/');
        buildExecuteParams = (0, metatx_1.buildExecuteFunc)(unsRegistry.interface, unsRegistry.address, unsRegistry);
    }));
    describe('General', () => {
        const receiverAddress = '0x1234567890123456789012345678901234567890';
        it('should transfer using meta-setOwner', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, ['res_label_113a', 'crypto']);
            const { req, signature } = yield buildExecuteParams('setOwner(address,uint256)', [receiver.address, tokenId], owner, tokenId);
            yield unsRegistry.execute(req, signature);
            (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
        }));
        it('should revert transfer using meta-setOwner when nonce invalidated', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, ['res_label_0896', 'crypto']);
            const { req, signature } = yield buildExecuteParams('setOwner(address,uint256)', [receiver.address, tokenId], owner, tokenId);
            yield unsRegistry.connect(owner).set('key', 'value', tokenId);
            yield (0, chai_1.expect)(unsRegistry.execute(req, signature)).to.be.revertedWith('UNSRegistryForwarder: SIGNATURE_INVALID');
        }));
        it('should setApprovalForAll using meta-setApprovalForAll', () => __awaiter(void 0, void 0, void 0, function* () {
            const { req, signature } = yield buildExecuteParams('setApprovalForAll(address,bool)', [operator.address, true], owner, 0);
            yield unsRegistry.execute(req, signature);
            (0, chai_1.expect)(yield unsRegistry.isApprovedForAll(owner.address, operator.address)).to.be.equal(true);
        }));
        it('should revert meta-setApprovalForAll for non-onwer', () => __awaiter(void 0, void 0, void 0, function* () {
            const { req, signature } = yield buildExecuteParams('setApprovalForAll(address,bool)', [operator.address, true], nonOwner, 0);
            yield (0, chai_1.expect)(unsRegistry.execute(Object.assign(Object.assign({}, req), { from: owner.address }), signature)).to.be.revertedWith('UNSRegistryForwarder: SIGNATURE_INVALID');
        }));
        it('should transfer using meta-transferFrom', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, ['meta_1591', 'crypto']);
            const { req, signature } = yield buildExecuteParams('transferFrom(address,address,uint256)', [owner.address, receiverAddress, tokenId], owner, tokenId);
            yield unsRegistry.execute(req, signature);
            (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(receiverAddress);
        }));
        it('should revert meta-transferFrom for non-onwer', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, ['meta_6458', 'crypto']);
            const { req, signature } = yield buildExecuteParams('transferFrom(address,address,uint256)', [nonOwner.address, receiverAddress, tokenId], nonOwner, tokenId);
            yield (0, chai_1.expect)(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
        }));
        it('should transfer using meta-safeTransferFrom', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, ['meta_10235', 'crypto']);
            const { req, signature } = yield buildExecuteParams('safeTransferFrom(address,address,uint256)', [owner.address, receiverAddress, tokenId], owner, tokenId);
            yield unsRegistry.execute(req, signature);
            (0, chai_1.expect)(yield unsRegistry.ownerOf(tokenId)).to.be.equal(receiverAddress);
        }));
        it('should revert meta-safeTransferFrom for non-onwer', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, ['meta_e5iuw', 'crypto']);
            const { req, signature } = yield buildExecuteParams('safeTransferFrom(address,address,uint256)', [nonOwner.address, receiverAddress, tokenId], nonOwner, tokenId);
            yield (0, chai_1.expect)(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
        }));
        it('should burn using meta-burn', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, ['meta_ar093', 'crypto']);
            const { req, signature } = yield buildExecuteParams('burn(uint256)', [tokenId], owner, tokenId);
            yield unsRegistry.execute(req, signature);
            yield (0, chai_1.expect)(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: invalid token ID');
        }));
        it('should revert meta-burn for non-onwer', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, ['meta_53dg3', 'crypto']);
            const { req, signature } = yield buildExecuteParams('burn(uint256)', [tokenId], nonOwner, tokenId);
            yield (0, chai_1.expect)(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
        }));
    });
    describe('ABI-based', () => {
        const registryFuncs = () => {
            return Object.values(unsRegistry.interface.functions).filter((fragment) => !['view', 'pure'].includes(fragment.stateMutability));
        };
        const buidRequest = (fragment, from, tokenId, paramsMap) => __awaiter(void 0, void 0, void 0, function* () {
            const contract = unsRegistry;
            const req = {
                from,
                gas: '200000',
                tokenId,
                nonce: Number(yield unsRegistry.nonceOf(tokenId)),
                data: contract.interface.encodeFunctionData((0, proxy_1.getFuncSignature)(fragment), fragment.inputs.map((x) => paramsMap[x.name])),
            };
            return req;
        });
        describe('Token-based functions (token should not be minted)', () => {
            const paramValueMap = {
                uri: 'label',
                data: '0x',
                keys: ['key1'],
                values: ['value1'],
                to: '',
                tokenId: '',
            };
            const included = [
                'issueWithRecords',
            ];
            const getFuncs = () => {
                return registryFuncs()
                    .filter((x) => x.inputs.filter((i) => i.name === 'tokenId').length)
                    .filter((x) => included.includes(x.name) ||
                    included.includes((0, proxy_1.getFuncSignature)(x)));
            };
            before(() => __awaiter(void 0, void 0, void 0, function* () {
                paramValueMap.to = receiver.address;
            }));
            it('should execute all functions successfully', () => __awaiter(void 0, void 0, void 0, function* () {
                for (const func of getFuncs()) {
                    const funcSigHash = ethers_1.utils.id(`${(0, proxy_1.getFuncSignature)(func)}_excl`);
                    paramValueMap.tokenId = (yield unsRegistry.namehash([
                        funcSigHash, 'crypto'
                    ])).toHexString();
                    const req = yield buidRequest(func, coinbase.address, paramValueMap.tokenId, paramValueMap);
                    const signature = yield (0, metatx_1.sign)(req.data, unsRegistry.address, req.nonce, coinbase);
                    yield unsRegistry.execute(req, signature);
                }
            }));
        });
        describe('Token-based functions (token should be minted)', () => {
            const paramValueMap = {
                label: 'label',
                data: '0x',
                key: 'key_t1',
                keys: ['key_t1'],
                keyHash: ethers_1.BigNumber.from(ethers_1.utils.id('key_t1')),
                keyHashes: [ethers_1.BigNumber.from(ethers_1.utils.id('key_t1'))],
                value: 'value',
                values: ['value1'],
                from: '',
                to: '',
                tokenId: ethers_1.BigNumber.from('0x0'),
            };
            const excluded = [
                'mintTLD',
                'mint',
                'issue',
                'issueWithRecords',
                'unlockWithRecords',
                'transferFromFor',
                'burnFor',
                'resetFor',
                'setFor',
                'setManyFor',
                'reconfigureFor',
                'depositToPolygon',
                'withdrawFromPolygon',
                'onERC721Received',
                'setReverse',
                'removeReverse',
                'addProxyReader',
            ];
            const getFuncs = () => {
                return registryFuncs()
                    .filter((x) => x.inputs.filter((i) => i.name === 'tokenId').length)
                    .filter((x) => !excluded.includes(x.name));
            };
            before(() => __awaiter(void 0, void 0, void 0, function* () {
                paramValueMap.from = owner.address;
                paramValueMap.to = receiver.address;
                yield unsRegistry.addKey(paramValueMap.key);
            }));
            it('should execute all functions successfully', () => __awaiter(void 0, void 0, void 0, function* () {
                for (const func of getFuncs()) {
                    const funcSigHash = ethers_1.utils.id(`${(0, proxy_1.getFuncSignature)(func)}_ok`);
                    paramValueMap.tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, [funcSigHash, 'crypto']);
                    const req = yield buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
                    const signature = yield (0, metatx_1.sign)(req.data, unsRegistry.address, req.nonce, owner);
                    yield unsRegistry.execute(req, signature);
                }
            }));
            it('should revert execution of all token-based functions when used signature', () => __awaiter(void 0, void 0, void 0, function* () {
                for (const func of getFuncs()) {
                    const funcSig = (0, proxy_1.getFuncSignature)(func);
                    const funcSigHash = ethers_1.utils.id(`${funcSig}_doubleUse`);
                    paramValueMap.tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, [funcSigHash, 'crypto']);
                    const req = yield buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
                    const signature = yield (0, metatx_1.sign)(req.data, unsRegistry.address, req.nonce, owner);
                    yield unsRegistry.execute(req, signature);
                    yield (0, chai_1.expect)(unsRegistry.execute(req, signature)).to.be.revertedWith('UNSRegistryForwarder: SIGNATURE_INVALID');
                }
            }));
            it('should revert execution of all token-based functions when nonce invalidated', () => __awaiter(void 0, void 0, void 0, function* () {
                for (const func of getFuncs()) {
                    const funcSig = (0, proxy_1.getFuncSignature)(func);
                    const funcSigHash = ethers_1.utils.id(`${funcSig}_nonceInvalidated`);
                    paramValueMap.tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, [funcSigHash, 'crypto']);
                    const req = yield buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
                    const signature = yield (0, metatx_1.sign)(req.data, unsRegistry.address, req.nonce, owner);
                    yield unsRegistry
                        .connect(owner)
                        .set('key', 'value', paramValueMap.tokenId);
                    yield (0, chai_1.expect)(unsRegistry.execute(req, signature)).to.be.revertedWith('UNSRegistryForwarder: SIGNATURE_INVALID');
                }
            }));
            it('should fail execution of all token-based functions when tokenId does not match', () => __awaiter(void 0, void 0, void 0, function* () {
                for (const func of getFuncs()) {
                    const funcSig = (0, proxy_1.getFuncSignature)(func);
                    const funcSigHash = ethers_1.utils.id(`${funcSig}_wrongToken`);
                    paramValueMap.tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, [funcSigHash, 'crypto']);
                    const tokenIdForwarder = yield unsRegistry.namehash([ethers_1.utils.id(`_${funcSig}`), 'crypto']);
                    const req = yield buidRequest(func, owner.address, tokenIdForwarder, paramValueMap);
                    const signature = yield (0, metatx_1.sign)(req.data, unsRegistry.address, req.nonce, owner);
                    yield (0, chai_1.expect)(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: TOKEN_INVALID');
                }
            }));
            it('should fail execution of all token-based functions when tokenId is empty', () => __awaiter(void 0, void 0, void 0, function* () {
                for (const func of getFuncs()) {
                    const funcSigHash = ethers_1.utils.id(`${(0, proxy_1.getFuncSignature)(func)}_emptyTokenId`);
                    paramValueMap.tokenId = yield (0, registry_1.mintDomain)(unsRegistry, owner, [funcSigHash, 'crypto']);
                    const req = yield buidRequest(func, owner.address, 0, paramValueMap);
                    const signature = yield (0, metatx_1.sign)(req.data, unsRegistry.address, req.nonce, owner);
                    yield (0, chai_1.expect)(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: TOKEN_INVALID');
                }
            }));
        });
        describe('Non-Token functions', () => {
            const paramValueMap = {
                labels: ['label', 'crypto'],
                data: '0x',
                role: '0x1000000000000000000000000000000000000000000000000000000000000000',
                key: 'key_nt1',
                keys: ['key_nt1'],
                values: ['value1'],
                approved: true,
                prefix: '/',
                tld: ethers_1.BigNumber.from('0x0'),
                account: '',
                to: '',
                operator: '',
            };
            const excluded = [
                'execute',
                'initialize',
                'transferOwnership',
                'renounceOwnership',
                'deposit',
                'removeReverse',
                'addProxyReader',
            ];
            before(() => __awaiter(void 0, void 0, void 0, function* () {
                paramValueMap.tld = constants_1.TLD.CRYPTO;
                paramValueMap.account = accessControl.address;
                paramValueMap.to = owner.address;
                paramValueMap.operator = operator.address;
            }));
            const getFuncs = () => {
                return registryFuncs()
                    .filter((x) => !x.inputs.filter((i) => i.name === 'tokenId').length)
                    .filter((x) => !excluded.includes(x.name));
            };
            it('should execute all functions successfully', () => __awaiter(void 0, void 0, void 0, function* () {
                for (const func of getFuncs()) {
                    const funcSig = (0, proxy_1.getFuncSignature)(func);
                    paramValueMap.labels = [ethers_1.utils.id(`${funcSig}_label`), 'crypto'];
                    const req = yield buidRequest(func, coinbase.address, 0, paramValueMap);
                    const signature = yield (0, metatx_1.sign)(req.data, unsRegistry.address, req.nonce, coinbase);
                    yield unsRegistry.execute(req, signature);
                }
            }));
            it('should revert execution of all functions when used signature', () => __awaiter(void 0, void 0, void 0, function* () {
                for (const func of getFuncs()) {
                    const funcSig = (0, proxy_1.getFuncSignature)(func);
                    paramValueMap.labels = [ethers_1.utils.id(`${funcSig}_doubleUse`), 'crypto'];
                    paramValueMap.key = ethers_1.utils.id(`${funcSig}_doubleUse`);
                    const tokenIdForwarder = yield unsRegistry.namehash([ethers_1.utils.id(`_${funcSig}`), 'crypto']);
                    const req = yield buidRequest(func, coinbase.address, tokenIdForwarder, paramValueMap);
                    const signature = yield (0, metatx_1.sign)(req.data, unsRegistry.address, req.nonce, coinbase);
                    yield unsRegistry.execute(req, signature);
                    yield (0, chai_1.expect)(unsRegistry.execute(req, signature)).to.be.revertedWith('UNSRegistryForwarder: SIGNATURE_INVALID');
                }
            }));
            it('should revert execution of all functions when used signature and tokenId is empty', () => __awaiter(void 0, void 0, void 0, function* () {
                for (const func of getFuncs()) {
                    const funcSig = (0, proxy_1.getFuncSignature)(func);
                    paramValueMap.labels = [ethers_1.utils.id(`${funcSig}_doubleUse_0`), 'crypto'];
                    const tokenId = 0;
                    const nonce = yield unsRegistry.nonceOf(tokenId);
                    const req = yield buidRequest(func, coinbase.address, tokenId, paramValueMap);
                    const signature = yield (0, metatx_1.sign)(req.data, unsRegistry.address, req.nonce, coinbase);
                    yield unsRegistry.execute(req, signature);
                    (0, chai_1.expect)(yield unsRegistry.nonceOf(tokenId)).to.be.equal(nonce.add(1));
                    yield (0, chai_1.expect)(unsRegistry.execute(req, signature)).to.be.revertedWith('UNSRegistryForwarder: SIGNATURE_INVALID');
                }
            }));
        });
    });
});
