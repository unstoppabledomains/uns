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
const mocks_1 = require("../../types/factories/contracts/mocks");
const constants_1 = require("./../helpers/constants");
describe('MinterRole', () => {
    let minterRole;
    let signers, coinbase, minter, faucet, receiver, minter2, minter3;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        signers = yield hardhat_1.ethers.getSigners();
        [coinbase, minter, faucet, receiver, minter2, minter3] = signers;
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        minterRole = yield new mocks_1.MinterRoleMock__factory(coinbase).deploy();
        yield minterRole.initialize();
        yield minterRole.addMinter(minter.address);
    }));
    describe('manage minter accounts', () => {
        it('should add minter account', () => __awaiter(void 0, void 0, void 0, function* () {
            yield minterRole.connect(coinbase).addMinter(minter2.address);
            (0, chai_1.expect)(yield minterRole.isMinter(minter2.address)).to.be.equal(true);
        }));
        it('revert adding minter account by non-owner account', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, chai_1.expect)(minterRole.connect(minter).addMinter(minter2.address)).to.be.revertedWith('Ownable: caller is not the owner');
        }));
        it('should add multiple minter accounts', () => __awaiter(void 0, void 0, void 0, function* () {
            yield minterRole.connect(coinbase).addMinters([minter2.address, minter3.address]);
            (0, chai_1.expect)(yield minterRole.isMinter(minter2.address)).to.be.equal(true);
            (0, chai_1.expect)(yield minterRole.isMinter(minter3.address)).to.be.equal(true);
        }));
        it('revert adding multiple minter accounts by non-owner account', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, chai_1.expect)(minterRole.connect(minter).addMinters([minter2.address, minter3.address])).to.be.revertedWith('Ownable: caller is not the owner');
        }));
        it('should remove minter account', () => __awaiter(void 0, void 0, void 0, function* () {
            yield minterRole.connect(coinbase).removeMinter(minter.address);
            (0, chai_1.expect)(yield minterRole.isMinter(minter.address)).to.be.equal(false);
        }));
        it('revert remove minter account by non-owner account', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, chai_1.expect)(minterRole.connect(minter).removeMinter(minter.address)).to.be.revertedWith('Ownable: caller is not the owner');
        }));
        it('should remove multiple minter accounts', () => __awaiter(void 0, void 0, void 0, function* () {
            yield minterRole.connect(coinbase).removeMinters([minter.address]);
            (0, chai_1.expect)(yield minterRole.isMinter(minter.address)).to.be.equal(false);
        }));
        it('revert removing multiple minter accounts by non-owner account', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, chai_1.expect)(minterRole.connect(minter).removeMinters([minter.address])).to.be.revertedWith('Ownable: caller is not the owner');
        }));
    });
    describe('ownership', () => {
        it('should add minter by new owner', () => __awaiter(void 0, void 0, void 0, function* () {
            yield minterRole.connect(coinbase).transferOwnership(receiver.address);
            yield minterRole.connect(receiver).addMinter(minter2.address);
            (0, chai_1.expect)(yield minterRole.isMinter(minter2.address)).to.be.equal(true);
        }));
        it('should remove minter by new owner', () => __awaiter(void 0, void 0, void 0, function* () {
            yield minterRole.connect(coinbase).transferOwnership(receiver.address);
            yield minterRole.connect(receiver).removeMinter(minter.address);
            (0, chai_1.expect)(yield minterRole.isMinter(minter.address)).to.be.equal(false);
        }));
        it('revert managing minters when ownership transferred', () => __awaiter(void 0, void 0, void 0, function* () {
            yield minterRole.connect(coinbase).transferOwnership(receiver.address);
            yield (0, chai_1.expect)(minterRole.connect(minter).addMinter(minter2.address)).to.be.revertedWith('Ownable: caller is not the owner');
            yield (0, chai_1.expect)(minterRole.connect(minter).addMinters([minter2.address])).to.be.revertedWith('Ownable: caller is not the owner');
            yield (0, chai_1.expect)(minterRole.connect(minter).removeMinter(minter.address)).to.be.revertedWith('Ownable: caller is not the owner');
            yield (0, chai_1.expect)(minterRole.connect(minter).removeMinters([minter.address])).to.be.revertedWith('Ownable: caller is not the owner');
        }));
        it('revert adding minter when ownership renounced', () => __awaiter(void 0, void 0, void 0, function* () {
            yield minterRole.connect(coinbase).renounceOwnership();
            yield (0, chai_1.expect)(minterRole.connect(minter).addMinter(minter2.address)).to.be.revertedWith('Ownable: caller is not the owner');
            yield (0, chai_1.expect)(minterRole.connect(minter).addMinters([minter2.address])).to.be.revertedWith('Ownable: caller is not the owner');
            yield (0, chai_1.expect)(minterRole.connect(minter).removeMinter(minter.address)).to.be.revertedWith('Ownable: caller is not the owner');
            yield (0, chai_1.expect)(minterRole.connect(minter).removeMinters([minter.address])).to.be.revertedWith('Ownable: caller is not the owner');
        }));
    });
    describe('renounce minter account', () => {
        it('should renounce minter account 1', () => __awaiter(void 0, void 0, void 0, function* () {
            yield minterRole.connect(minter).renounceMinter();
            (0, chai_1.expect)(yield minterRole.isMinter(minter.address)).to.be.equal(false);
            yield (0, chai_1.expect)(minterRole.connect(minter).olnyMinterFunc()).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
        }));
        it('should renounce minter account 2', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, chai_1.expect)(yield minterRole.isMinter(coinbase.address)).to.be.equal(false);
            yield minterRole.connect(coinbase).renounceMinter();
            (0, chai_1.expect)(yield minterRole.isMinter(coinbase.address)).to.be.equal(false);
            yield (0, chai_1.expect)(minterRole.connect(coinbase).olnyMinterFunc()).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
        }));
        it('should renounce minter account 3', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, chai_1.expect)(yield minterRole.isMinter(faucet.address)).to.be.equal(false);
            yield minterRole.connect(faucet).renounceMinter();
            (0, chai_1.expect)(yield minterRole.isMinter(faucet.address)).to.be.equal(false);
            yield (0, chai_1.expect)(minterRole.connect(faucet).olnyMinterFunc()).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
        }));
    });
    describe('close minter account', () => {
        it('revert when closing by non-minter account', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, chai_1.expect)(minterRole.connect(receiver).closeMinter(receiver.address)).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
        }));
        it('revert when zero account', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, chai_1.expect)(minterRole.connect(minter).closeMinter(constants_1.ZERO_ADDRESS)).to.be.revertedWith('MinterRole: RECEIVER_IS_EMPTY');
        }));
        it('close minter without forwarding funds', () => __awaiter(void 0, void 0, void 0, function* () {
            const initBalance = yield faucet.getBalance();
            yield minterRole.connect(minter).closeMinter(faucet.address, { value: 0 });
            yield (0, chai_1.expect)(minterRole.olnyMinterFunc()).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
            (0, chai_1.expect)(yield faucet.getBalance()).to.be.equal(initBalance);
        }));
        it('close minter with forwarding funds', () => __awaiter(void 0, void 0, void 0, function* () {
            const value = 1;
            const initBalance = yield faucet.getBalance();
            yield minterRole.connect(minter).closeMinter(faucet.address, { value });
            yield (0, chai_1.expect)(minterRole.olnyMinterFunc()).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
            (0, chai_1.expect)(yield faucet.getBalance()).to.be.equal(ethers_1.BigNumber.from(initBalance).add(value));
        }));
    });
    describe('rotate minter account', () => {
        it('revert when rotateing by non-minter account', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, chai_1.expect)(minterRole.connect(receiver).rotateMinter(receiver.address)).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
        }));
        it('revert when zero account', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, chai_1.expect)(minterRole.connect(minter).rotateMinter(constants_1.ZERO_ADDRESS)).to.be.revertedWith('MinterRole: RECEIVER_IS_EMPTY');
        }));
        it('rotate minter without defining value', () => __awaiter(void 0, void 0, void 0, function* () {
            const initBalance = yield receiver.getBalance();
            yield minterRole.connect(minter).rotateMinter(receiver.address);
            yield (0, chai_1.expect)(minterRole.olnyMinterFunc()).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
            (0, chai_1.expect)(yield receiver.getBalance()).to.be.equal(initBalance);
        }));
        it('rotate minter without forwarding funds', () => __awaiter(void 0, void 0, void 0, function* () {
            const initBalance = yield receiver.getBalance();
            yield minterRole.connect(minter).rotateMinter(receiver.address, { value: 0 });
            yield (0, chai_1.expect)(minterRole.olnyMinterFunc()).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
            (0, chai_1.expect)(yield receiver.getBalance()).to.be.equal(initBalance);
        }));
        it('rotate minter with forwarding funds', () => __awaiter(void 0, void 0, void 0, function* () {
            const value = 3;
            const initBalance = yield receiver.getBalance();
            yield minterRole.connect(minter).rotateMinter(receiver.address, { value });
            yield (0, chai_1.expect)(minterRole.olnyMinterFunc()).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
            (0, chai_1.expect)(yield receiver.getBalance()).to.be.equal(ethers_1.BigNumber.from(initBalance).add(value));
        }));
    });
});
