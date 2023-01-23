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
const metatx_1 = require("../types/factories/contracts/metatx");
const DummyStateSender_sol_1 = require("../types/factories/contracts/@maticnetwork/pos-portal/DummyStateSender.sol");
const SimpleCheckpointManager_sol_1 = require("../types/factories/contracts/@maticnetwork/pos-portal/SimpleCheckpointManager.sol");
const MintableERC721Predicate_sol_1 = require("../types/factories/contracts/@maticnetwork/pos-portal/MintableERC721Predicate.sol");
const RootChainManager_sol_1 = require("../types/factories/contracts/@maticnetwork/pos-portal/RootChainManager.sol");
const polygon_1 = require("./helpers/polygon");
const metatx_2 = require("./helpers/metatx");
const constants_1 = require("./helpers/constants");
describe('RootRegistry', () => {
    let l1UnsRegistry, l2UnsRegistry, mintingManager, cnsRegistry;
    let resolver, mintingController, uriPrefixController, signatureController;
    let cnsForwarder;
    let rootChainManager, predicate, stateSender, checkpointManager;
    let registryOwner, rcmOwner, predicateOwner, owner, spender;
    let buildExecuteCnsParams, buildExecuteUnsParams;
    const abiCoder = new ethers_1.utils.AbiCoder();
    const mintDomainL1 = (owner, labels) => __awaiter(void 0, void 0, void 0, function* () {
        yield mintingManager.issueWithRecords(owner, labels, [], [], true);
        return yield l1UnsRegistry.namehash(labels);
    });
    const mintDomainL2 = (owner, labels) => __awaiter(void 0, void 0, void 0, function* () {
        yield l2UnsRegistry.mintWithRecords(owner, labels, [], [], true);
        return yield l2UnsRegistry.namehash(labels);
    });
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        [registryOwner, rcmOwner, predicateOwner, owner, spender] = yield hardhat_1.ethers.getSigners();
        l1UnsRegistry = yield new contracts_1.UNSRegistry__factory(registryOwner).connect(registryOwner).deploy();
        cnsRegistry = yield new contracts_2.CNSRegistry__factory(registryOwner).deploy();
        mintingController = yield new controllers_1.MintingController__factory(registryOwner).deploy(cnsRegistry.address);
        yield cnsRegistry.addController(mintingController.address);
        signatureController = yield new controllers_1.SignatureController__factory(registryOwner).deploy(cnsRegistry.address);
        yield cnsRegistry.addController(signatureController.address);
        cnsForwarder = yield new metatx_1.CNSRegistryForwarder__factory(registryOwner).deploy(signatureController.address);
        resolver = yield new contracts_2.Resolver__factory(registryOwner).deploy(cnsRegistry.address, mintingController.address);
        uriPrefixController = yield new controllers_1.URIPrefixController__factory(registryOwner).deploy(cnsRegistry.address);
        yield cnsRegistry.addController(uriPrefixController.address);
        mintingManager = yield new contracts_1.MintingManager__factory(registryOwner).deploy();
        yield mintingController.addMinter(mintingManager.address);
        yield uriPrefixController.addWhitelisted(mintingManager.address);
        l2UnsRegistry = yield new contracts_1.UNSRegistry__factory(registryOwner).connect(registryOwner).deploy();
        stateSender = yield new DummyStateSender_sol_1.DummyStateSender__factory(registryOwner).deploy();
        checkpointManager = yield new SimpleCheckpointManager_sol_1.SimpleCheckpointManager__factory(rcmOwner).deploy();
        predicate = yield new MintableERC721Predicate_sol_1.MintableERC721Predicate__factory(predicateOwner).connect(predicateOwner).deploy();
        yield predicate.initialize(predicateOwner.address);
        rootChainManager = yield new RootChainManager_sol_1.RootChainManager__factory(rcmOwner).connect(rcmOwner).deploy();
        yield rootChainManager.initialize(rcmOwner.address);
        yield rootChainManager.setCheckpointManager(checkpointManager.address);
        yield rootChainManager.setStateSender(stateSender.address);
        yield rootChainManager.registerPredicate(ethers_1.utils.keccak256(l1UnsRegistry.address), predicate.address);
        yield rootChainManager.mapToken(l1UnsRegistry.address, l2UnsRegistry.address, ethers_1.utils.keccak256(l1UnsRegistry.address));
        yield predicate.grantRole(yield predicate.MANAGER_ROLE(), rootChainManager.address);
        yield l1UnsRegistry.initialize(mintingManager.address, cnsRegistry.address, rootChainManager.address, constants_1.ZERO_ADDRESS);
        yield l2UnsRegistry.initialize(registryOwner.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, registryOwner.address);
        yield l2UnsRegistry.mintTLD(constants_1.TLD.WALLET, 'wallet');
        yield mintingManager.initialize(l1UnsRegistry.address, mintingController.address, uriPrefixController.address, resolver.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
        yield mintingManager.addMinter(registryOwner.address);
        yield mintingManager.setTokenURIPrefix('https://metadata.unstoppabledomains.ooo/metadata/');
        buildExecuteCnsParams = (0, metatx_2.buildExecuteFunc)(cnsRegistry.interface, signatureController.address, cnsForwarder);
        buildExecuteUnsParams = (0, metatx_2.buildExecuteFunc)(l1UnsRegistry.interface, l1UnsRegistry.address, l1UnsRegistry);
    }));
    describe('Deposit', () => {
        describe('One-step deposit', () => {
            it('should deposit token through UNS registry', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield mintDomainL1(owner.address, ['poly-1d-as2', 'wallet']);
                yield (0, chai_1.expect)(l1UnsRegistry.connect(owner).depositToPolygon(tokenId))
                    .to.emit(predicate, 'LockedMintableERC721')
                    .withArgs(l1UnsRegistry.address, owner.address, l1UnsRegistry.address, tokenId);
                (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(predicate.address);
            }));
            it('should meta-deposit token through UNS registry', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield mintDomainL1(owner.address, ['poly-1d-bp2', 'wallet']);
                const { req, signature } = yield buildExecuteUnsParams('depositToPolygon(uint256)', [tokenId], owner, tokenId);
                yield (0, chai_1.expect)(l1UnsRegistry.execute(req, signature))
                    .to.emit(predicate, 'LockedMintableERC721')
                    .withArgs(l1UnsRegistry.address, owner.address, l1UnsRegistry.address, tokenId);
                (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(predicate.address);
            }));
            it('should deposit CNS domains through MintingManager', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield mintDomainL1(owner.address, ['poly-1md-aq1', 'crypto']);
                (0, chai_1.expect)(yield cnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
                yield cnsRegistry
                    .connect(owner)['safeTransferFrom(address,address,uint256,bytes)'](owner.address, l1UnsRegistry.address, tokenId, abiCoder.encode(['bool'], [true]));
                yield (0, chai_1.expect)(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
                (0, chai_1.expect)(yield l1UnsRegistry.exists(tokenId)).to.be.equal(true);
                (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(predicate.address);
            }));
            it('should mate-deposit CNS domains through MintingManager', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield mintDomainL1(owner.address, ['poly-1md-bl1', 'crypto']);
                (0, chai_1.expect)(yield cnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
                const { req, signature } = yield buildExecuteCnsParams('safeTransferFrom(address,address,uint256,bytes)', [owner.address, l1UnsRegistry.address, tokenId, abiCoder.encode(['bool'], [true])], owner, tokenId);
                yield cnsForwarder.execute(req, signature);
                yield (0, chai_1.expect)(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
                (0, chai_1.expect)(yield l1UnsRegistry.exists(tokenId)).to.be.equal(true);
                (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(predicate.address);
            }));
            it('should mate-deposit(legacy) CNS domains through MintingManager', () => __awaiter(void 0, void 0, void 0, function* () {
                const funcSig = 'safeTransferFromFor(address,address,uint256,bytes,bytes)';
                const tokenId = yield mintDomainL1(owner.address, ['poly-1md-al1', 'crypto']);
                (0, chai_1.expect)(yield cnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
                const data = cnsRegistry.interface.encodeFunctionData('safeTransferFrom(address,address,uint256,bytes)', [
                    owner.address,
                    l1UnsRegistry.address,
                    tokenId,
                    abiCoder.encode(['bool'], [true]),
                ]);
                const nonce = yield signatureController.nonceOf(tokenId);
                const signature = yield (0, metatx_2.sign)(data, signatureController.address, nonce, owner);
                yield signatureController
                    .connect(spender)[funcSig](owner.address, l1UnsRegistry.address, tokenId, abiCoder.encode(['bool'], [true]), signature);
                yield (0, chai_1.expect)(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
                (0, chai_1.expect)(yield l1UnsRegistry.exists(tokenId)).to.be.equal(true);
                (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(predicate.address);
            }));
        });
        describe('Two-steps deposit', () => {
            it('should deposit token', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield mintDomainL1(owner.address, ['poly-2d-aq1', 'wallet']);
                yield l1UnsRegistry.connect(owner).approve(predicate.address, tokenId);
                const data = ethers_1.utils.defaultAbiCoder.encode(['uint256'], [tokenId]);
                yield (0, chai_1.expect)(rootChainManager.connect(owner).depositFor(owner.address, l1UnsRegistry.address, data))
                    .to.emit(predicate, 'LockedMintableERC721')
                    .withArgs(owner.address, owner.address, l1UnsRegistry.address, tokenId);
                (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(predicate.address);
            }));
        });
        describe('CNS -> UNS migration', () => {
            it('should migrate CNS domain to UNS through safeTransferFrom', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield mintDomainL1(owner.address, ['cns-uns-aq1', 'crypto']);
                (0, chai_1.expect)(yield cnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
                yield cnsRegistry
                    .connect(owner)['safeTransferFrom(address,address,uint256)'](owner.address, l1UnsRegistry.address, tokenId);
                yield (0, chai_1.expect)(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
                (0, chai_1.expect)(yield l1UnsRegistry.exists(tokenId)).to.be.equal(true);
                (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
            }));
            it('should meta-migrate CNS domain to UNS through safeTransferFrom', () => __awaiter(void 0, void 0, void 0, function* () {
                const funcSig = 'safeTransferFromFor(address,address,uint256,bytes)';
                const tokenId = yield mintDomainL1(owner.address, ['cns-uns-maq1', 'crypto']);
                (0, chai_1.expect)(yield cnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
                const data = cnsRegistry.interface.encodeFunctionData('safeTransferFrom(address,address,uint256)', [
                    owner.address,
                    l1UnsRegistry.address,
                    tokenId,
                ]);
                const nonce = yield signatureController.nonceOf(tokenId);
                const signature = yield (0, metatx_2.sign)(data, signatureController.address, nonce, owner);
                yield signatureController.connect(spender)[funcSig](owner.address, l1UnsRegistry.address, tokenId, signature);
                yield (0, chai_1.expect)(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
                (0, chai_1.expect)(yield l1UnsRegistry.exists(tokenId)).to.be.equal(true);
                (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
            }));
            it('should migrate CNS domain to UNS through safeTransferFrom(data)', () => __awaiter(void 0, void 0, void 0, function* () {
                const tokenId = yield mintDomainL1(owner.address, ['cns-uns-aq2', 'crypto']);
                (0, chai_1.expect)(yield cnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
                yield cnsRegistry
                    .connect(owner)['safeTransferFrom(address,address,uint256,bytes)'](owner.address, l1UnsRegistry.address, tokenId, abiCoder.encode(['bool'], [false]));
                yield (0, chai_1.expect)(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
                (0, chai_1.expect)(yield l1UnsRegistry.exists(tokenId)).to.be.equal(true);
                (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
            }));
            it('should meta-migrate CNS domain to UNS through safeTransferFrom(data)', () => __awaiter(void 0, void 0, void 0, function* () {
                const funcSig = 'safeTransferFromFor(address,address,uint256,bytes,bytes)';
                const tokenId = yield mintDomainL1(owner.address, ['cns-uns-maq2', 'crypto']);
                (0, chai_1.expect)(yield cnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
                const data = cnsRegistry.interface.encodeFunctionData('safeTransferFrom(address,address,uint256,bytes)', [
                    owner.address,
                    l1UnsRegistry.address,
                    tokenId,
                    abiCoder.encode(['bool'], [false]),
                ]);
                const nonce = yield signatureController.nonceOf(tokenId);
                const signature = yield (0, metatx_2.sign)(data, signatureController.address, nonce, owner);
                yield signatureController
                    .connect(spender)[funcSig](owner.address, l1UnsRegistry.address, tokenId, abiCoder.encode(['bool'], [false]), signature);
                yield (0, chai_1.expect)(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
                (0, chai_1.expect)(yield l1UnsRegistry.exists(tokenId)).to.be.equal(true);
                (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
            }));
            it('should revert when UNS registry receives token from random ERC721', () => __awaiter(void 0, void 0, void 0, function* () {
                const randomERC721 = yield new contracts_2.CNSRegistry__factory(registryOwner).deploy();
                yield randomERC721.controlledMintChild(owner.address, constants_1.TLD.CRYPTO, 'fake-cns-uns-te1');
                const tokenId = yield randomERC721.childIdOf(constants_1.TLD.CRYPTO, 'fake-cns-uns-te1');
                yield (0, chai_1.expect)(randomERC721
                    .connect(owner)['safeTransferFrom(address,address,uint256)'](owner.address, l1UnsRegistry.address, tokenId)).to.be.revertedWith('Registry: ERC721_RECEIVING_PROHIBITED');
            }));
        });
    });
    describe('Withdraw through predicate', () => {
        it('should withdraw a domain', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomainL1(owner.address, ['poly-1w-as1', 'wallet']);
            yield l1UnsRegistry.connect(owner).depositToPolygon(tokenId);
            (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(predicate.address);
            const inputData = (0, polygon_1.buildPredicateExitInput)(owner.address, constants_1.ZERO_ADDRESS, tokenId);
            yield predicate.exitTokens(constants_1.ZERO_ADDRESS, l1UnsRegistry.address, inputData);
            (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
        }));
        it('should mint a domain on withdraw while it was minted on L2', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield l1UnsRegistry.namehash(['poly-1wm-as1', 'wallet']);
            yield (0, chai_1.expect)(l1UnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: invalid token ID');
            const inputData = (0, polygon_1.buildPredicateExitInput)(owner.address, constants_1.ZERO_ADDRESS, tokenId);
            yield predicate.exitTokens(constants_1.ZERO_ADDRESS, l1UnsRegistry.address, inputData);
            (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
        }));
        it('should revert mint by non-predicate', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield l1UnsRegistry.namehash(['poly-1w-revert', 'wallet']);
            yield (0, chai_1.expect)(l1UnsRegistry['mint(address,uint256)'](owner.address, tokenId)).to.be.revertedWith('Registry: INSUFFICIENT_PERMISSIONS');
        }));
        it('should revert mint by non-predicate', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield l1UnsRegistry.namehash(['poly-1w-revert', 'wallet']);
            yield (0, chai_1.expect)(l1UnsRegistry['mint(address,uint256,bytes)'](owner.address, tokenId, '0x00')).to.be.revertedWith('Registry: INSUFFICIENT_PERMISSIONS');
        }));
    });
    describe('Withdraw', () => {
        const expectNewHeaderBlockEventEmitted = (setCheckPointTx, checkpointData) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, chai_1.expect)(setCheckPointTx)
                .to.emit(checkpointManager, 'NewHeaderBlock')
                .withArgs(rcmOwner.address, checkpointData.header.number, 0, checkpointData.number, checkpointData.number, ethers_1.utils.hexlify(checkpointData.header.root));
        });
        it('should be able to exit through rootChainManager', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomainL2(owner.address, ['poly-ex-1', 'wallet']);
            const txn = yield l2UnsRegistry.connect(owner).burn(tokenId, { gasPrice: 1000000000 });
            const receipt = yield txn.wait();
            const { setCheckPointTx, checkpointData } = yield (0, polygon_1.writeCheckpoint)(checkpointManager, rcmOwner, txn);
            yield expectNewHeaderBlockEventEmitted(setCheckPointTx, checkpointData);
            const data = yield (0, polygon_1.buildExitInput)(checkpointManager, receipt, checkpointData);
            yield rootChainManager.exit(data);
            (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
        }));
        it('should be able to exit through UNS registry', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomainL2(owner.address, ['poly-ex-2', 'wallet']);
            const txn = yield l2UnsRegistry.connect(owner).burn(tokenId, { gasPrice: 1000000000 });
            const receipt = yield txn.wait();
            const { setCheckPointTx, checkpointData } = yield (0, polygon_1.writeCheckpoint)(checkpointManager, rcmOwner, txn);
            yield expectNewHeaderBlockEventEmitted(setCheckPointTx, checkpointData);
            const data = yield (0, polygon_1.buildExitInput)(checkpointManager, receipt, checkpointData);
            yield l1UnsRegistry.connect(owner).withdrawFromPolygon(data, tokenId, [], []);
            (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
        }));
        it('should be able to exit through UNS registry with records update', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomainL2(owner.address, ['poly-ex-2up', 'wallet']);
            const txn = yield l2UnsRegistry.connect(owner).burn(tokenId, { gasPrice: 1000000000 });
            const receipt = yield txn.wait();
            const { setCheckPointTx, checkpointData } = yield (0, polygon_1.writeCheckpoint)(checkpointManager, rcmOwner, txn);
            yield expectNewHeaderBlockEventEmitted(setCheckPointTx, checkpointData);
            const data = yield (0, polygon_1.buildExitInput)(checkpointManager, receipt, checkpointData);
            yield l1UnsRegistry.connect(owner).withdrawFromPolygon(data, tokenId, ['k1'], ['v1']);
            (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
            (0, chai_1.expect)(yield l1UnsRegistry.get('k1', tokenId)).to.be.eql('v1');
        }));
        it('should be able to meta-exit through UNS registry with records update', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield mintDomainL2(owner.address, ['poly-ex-meta2up', 'wallet']);
            const txn = yield l2UnsRegistry.connect(owner).burn(tokenId, { gasPrice: 1000000000 });
            const receipt = yield txn.wait();
            const { setCheckPointTx, checkpointData } = yield (0, polygon_1.writeCheckpoint)(checkpointManager, rcmOwner, txn);
            yield expectNewHeaderBlockEventEmitted(setCheckPointTx, checkpointData);
            const data = yield (0, polygon_1.buildExitInput)(checkpointManager, receipt, checkpointData);
            const { req, signature } = yield buildExecuteUnsParams('withdrawFromPolygon(bytes,uint256,string[],string[])', [data, tokenId, ['k2'], ['v2']], owner, tokenId);
            yield l1UnsRegistry.execute(req, signature);
            (0, chai_1.expect)(yield l1UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
            (0, chai_1.expect)(yield l1UnsRegistry.get('k2', tokenId)).to.be.eql('v2');
        }));
    });
});
