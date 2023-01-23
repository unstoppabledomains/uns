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
const DummyStateSender_sol_1 = require("../types/factories/contracts/@maticnetwork/pos-portal/DummyStateSender.sol");
const MintableERC721Predicate_sol_1 = require("../types/factories/contracts/@maticnetwork/pos-portal/MintableERC721Predicate.sol");
const RootChainManager_sol_1 = require("../types/factories/contracts/@maticnetwork/pos-portal/RootChainManager.sol");
const constants_1 = require("./helpers/constants");
describe('ChildRegistry', () => {
    let l1UnsRegistry, l2UnsRegistry, mintingManager, rootChainManager, predicate, stateSender;
    let registryOwner, rcmOwner, predicateOwner, owner;
    const abiCoder = new ethers_1.utils.AbiCoder();
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        [registryOwner, rcmOwner, predicateOwner, owner] =
            yield hardhat_1.ethers.getSigners();
        l1UnsRegistry = (yield new contracts_1.UNSRegistry__factory(registryOwner).deploy()).connect(registryOwner);
        mintingManager = yield new contracts_1.MintingManager__factory(registryOwner).deploy();
        l2UnsRegistry = (yield new contracts_1.UNSRegistry__factory(registryOwner).deploy()).connect(registryOwner);
        stateSender = yield new DummyStateSender_sol_1.DummyStateSender__factory(registryOwner).deploy();
        predicate = (yield new MintableERC721Predicate_sol_1.MintableERC721Predicate__factory(registryOwner).deploy()).connect(predicateOwner);
        yield predicate.initialize(predicateOwner.address);
        rootChainManager = (yield new RootChainManager_sol_1.RootChainManager__factory(registryOwner).deploy()).connect(rcmOwner);
        yield rootChainManager.initialize(rcmOwner.address);
        yield rootChainManager.setStateSender(stateSender.address);
        yield rootChainManager.registerPredicate(ethers_1.utils.keccak256(l1UnsRegistry.address), predicate.address);
        yield rootChainManager.mapToken(l1UnsRegistry.address, l2UnsRegistry.address, ethers_1.utils.keccak256(l1UnsRegistry.address));
        yield predicate.grantRole(yield predicate.MANAGER_ROLE(), rootChainManager.address);
        yield l1UnsRegistry.initialize(mintingManager.address, constants_1.ZERO_ADDRESS, rootChainManager.address, constants_1.ZERO_ADDRESS);
        yield l2UnsRegistry.initialize(mintingManager.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, registryOwner.address);
        yield mintingManager.initialize(l2UnsRegistry.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
        yield mintingManager.addMinter(registryOwner.address);
    }));
    describe('Management of childChainManager', () => __awaiter(void 0, void 0, void 0, function* () {
        let tempL2UnsRegistry;
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            tempL2UnsRegistry = (yield new contracts_1.UNSRegistry__factory(registryOwner).deploy()).connect(registryOwner);
            yield tempL2UnsRegistry.initialize(registryOwner.address, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS, constants_1.ZERO_ADDRESS);
        }));
        it('should revert when childChainManager is empty', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield tempL2UnsRegistry.namehash(['l2-te1', 'crypto']);
            yield (0, chai_1.expect)(tempL2UnsRegistry.deposit(owner.address, abiCoder.encode(['uint256'], [tokenId]))).to.be.revertedWith('Registry: INSUFFICIENT_PERMISSIONS');
        }));
    }));
    describe('Deposit', () => {
        it('should deposit one token', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId = yield l2UnsRegistry.namehash(['l2-aq1', 'crypto']);
            yield (0, chai_1.expect)(l2UnsRegistry.deposit(owner.address, abiCoder.encode(['uint256'], [tokenId])))
                .to.emit(l2UnsRegistry, 'Transfer')
                .withArgs(constants_1.ZERO_ADDRESS, owner.address, tokenId);
            (0, chai_1.expect)(yield l2UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
        }));
        it('should deposit multiple tokens', () => __awaiter(void 0, void 0, void 0, function* () {
            const tokenId1 = yield l2UnsRegistry.namehash(['l2-eq1', 'crypto']);
            const tokenId2 = yield l2UnsRegistry.namehash(['l2-eq2', 'crypto']);
            yield (0, chai_1.expect)(l2UnsRegistry.deposit(owner.address, abiCoder.encode(['uint256[]'], [[tokenId1, tokenId2]])))
                .to.emit(l2UnsRegistry, 'Transfer')
                .withArgs(constants_1.ZERO_ADDRESS, owner.address, tokenId1);
            (0, chai_1.expect)(yield l2UnsRegistry.ownerOf(tokenId1)).to.be.equal(owner.address);
            (0, chai_1.expect)(yield l2UnsRegistry.ownerOf(tokenId2)).to.be.equal(owner.address);
        }));
    });
});
