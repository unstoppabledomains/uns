import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { Authorization, Wallet } from 'ethers';
import { FaucetSA } from '../../types/contracts/smartAccounts';
import { Reverter } from '../helpers/reverter';

describe('Faucet', () => {
  const reverter: Reverter = new Reverter();

  let signers: SignerWithAddress[];
  let owner: SignerWithAddress;
  let worker1: SignerWithAddress;
  let worker2: SignerWithAddress;
  let random: SignerWithAddress;
  let faucetSA: FaucetSA;
  let faucetWallet: Wallet;
  let faucet: FaucetSA;

  const WORKER_FUNDING_AMOUNT = ethers.parseEther('0.1');

  before(async () => {
    signers = await ethers.getSigners();
    [owner, worker1, worker2, random] = signers;

    const faucetFactory = await ethers.getContractFactory('FaucetSA');
    faucetSA = await faucetFactory.deploy();

    faucetWallet = new ethers.Wallet(Wallet.createRandom().privateKey, ethers.provider);

    const faucetAuth: Authorization = await faucetWallet.authorize({ address: faucetSA.target, nonce: 1 });

    await owner.sendTransaction({
      to: faucetWallet.address,
      value: ethers.parseEther('1'),
    });

    await faucetWallet.sendTransaction({
      to: faucetWallet.address,
      value: 0,
      type: 4,
      authorizationList: [faucetAuth],
      gasLimit: 50000,
    });

    faucet = await ethers.getContractAt('FaucetSA', faucetWallet.address);

    await faucet.connect(faucetWallet).setWorkerBalanceThreshold(ethers.parseEther('0.1'));
    await faucet.connect(faucetWallet).setWorkerFundingAmount(ethers.parseEther('0.1'));

    await reverter.snapshot();
  });

  afterEach(reverter.revert);

  describe('worker authorization', () => {
    it('should allow self to add authorized workers', async () => {
      await faucet.connect(faucetWallet).addAuthorizedWorkers([worker1.address, worker2.address]);
      expect(await faucet.authorizedWorkers(worker1.address)).to.be.true;
      expect(await faucet.authorizedWorkers(worker2.address)).to.be.true;
    });

    it('should allow self to remove authorized workers', async () => {
      await faucet.connect(faucetWallet).addAuthorizedWorkers([worker1.address, worker2.address]);
      await faucet.connect(faucetWallet).removeAuthorizedWorkers([worker1.address]);
      expect(await faucet.authorizedWorkers(worker1.address)).to.be.false;
      expect(await faucet.authorizedWorkers(worker2.address)).to.be.true;
    });

    it('should not allow non-self to add authorized workers', async () => {
      await expect(faucet.connect(random).addAuthorizedWorkers([worker1.address])).to.be.revertedWithCustomError(
        faucet,
        'NotSelf',
      );
    });

    it('should not allow non-self to remove authorized workers', async () => {
      await faucet.connect(faucetWallet).addAuthorizedWorkers([worker1.address]);
      await expect(faucet.connect(random).removeAuthorizedWorkers([worker1.address])).to.be.revertedWithCustomError(
        faucet,
        'NotSelf',
      );
    });
  });

  describe('worker withdrawals', () => {
    beforeEach(async () => {
      await faucet.connect(faucetWallet).addAuthorizedWorkers([worker1.address]);
    });

    it('should allow authorized worker to withdraw funding amount', async () => {
      const initialWorkerBalance = await ethers.provider.getBalance(worker1.address);
      const initialFaucetBalance = await ethers.provider.getBalance(faucet.target);

      const tx = await faucet.connect(worker1).fundWorker();
      const receipt = await tx.wait();
      const gasUsed = receipt?.gasUsed || BigInt(0);
      const gasPrice = tx.gasPrice || BigInt(0);
      const gasCost = gasUsed * gasPrice;

      const finalWorkerBalance = await ethers.provider.getBalance(worker1.address);
      const finalFaucetBalance = await ethers.provider.getBalance(faucet.target);

      expect(finalWorkerBalance - initialWorkerBalance).to.equal(WORKER_FUNDING_AMOUNT - gasCost);
      expect(initialFaucetBalance - finalFaucetBalance).to.equal(WORKER_FUNDING_AMOUNT);
    });

    it('should not allow unauthorized worker to withdraw', async () => {
      expect(await faucet.authorizedWorkers(worker2.address)).to.be.false;

      await expect(faucet.connect(worker2).fundWorker()).to.be.revertedWithCustomError(faucet, 'NotAuthorizedWorker');
    });

    it('should fail if contract has insufficient balance', async () => {
      await faucetWallet.sendTransaction({
        to: owner.address,
        value: ethers.parseEther('0.95'),
      });
      await expect(faucet.connect(worker1).fundWorker()).to.be.revertedWithCustomError(faucet, 'TransferFailed');
    });
  });

  describe('worker funding amount and threshold management', () => {
    it('should allow self to set worker funding amount', async () => {
      const newAmount = ethers.parseEther('0.2');
      await faucet.connect(faucetWallet).setWorkerFundingAmount(newAmount);
      expect(await faucet.workerFundingAmount()).to.equal(newAmount);
    });

    it('should not allow non-self to set worker funding amount', async () => {
      await expect(
        faucet.connect(random).setWorkerFundingAmount(ethers.parseEther('0.2')),
      ).to.be.revertedWithCustomError(faucet, 'NotSelf');
    });

    it('should allow self to set worker balance threshold', async () => {
      const newThreshold = ethers.parseEther('0.3');
      await faucet.connect(faucetWallet).setWorkerBalanceThreshold(newThreshold);
      expect(await faucet.workerBalanceThreshold()).to.equal(newThreshold);
    });

    it('should not allow non-self to set worker balance threshold', async () => {
      await expect(
        faucet.connect(random).setWorkerBalanceThreshold(ethers.parseEther('0.3')),
      ).to.be.revertedWithCustomError(faucet, 'NotSelf');
    });
  });

  describe('receive function', () => {
    it('should accept ETH deposits with receive', async () => {
      const depositAmount = ethers.parseEther('1');
      const initialBalance = await ethers.provider.getBalance(faucet.target);
      await owner.sendTransaction({
        to: faucet.target,
        value: depositAmount,
      });
      const finalBalance = await ethers.provider.getBalance(faucet.target);
      expect(finalBalance - initialBalance).to.equal(depositAmount);
    });

    it('should accept ETH deposits with fallback', async () => {
      const depositAmount = ethers.parseEther('1');
      const initialBalance = await ethers.provider.getBalance(faucet.target);
      await owner.sendTransaction({
        to: faucet.target,
        value: depositAmount,
        data: '0x1234',
      });
      const finalBalance = await ethers.provider.getBalance(faucet.target);
      expect(finalBalance - initialBalance).to.equal(depositAmount);
    });
  });
});
