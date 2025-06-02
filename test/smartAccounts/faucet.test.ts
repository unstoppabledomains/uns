import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { Faucet } from '../../types/contracts/smartAccounts';
import { Reverter } from '../helpers/reverter';
import { deployProxy } from '../../src/helpers';

describe('Faucet', () => {
  const reverter: Reverter = new Reverter();

  let signers: SignerWithAddress[];
  let owner: SignerWithAddress;
  let worker1: SignerWithAddress;
  let worker2: SignerWithAddress;
  let random: SignerWithAddress;
  let faucet: Faucet;

  const WORKER_FUNDING_AMOUNT = ethers.parseEther('0.1');
  const WORKER_BALANCE_THRESHOLD = WORKER_FUNDING_AMOUNT;

  before(async () => {
    signers = await ethers.getSigners();
    [owner, worker1, worker2, random] = signers;

    const faucetFactory = await ethers.getContractFactory('Faucet');
    faucet = await deployProxy(faucetFactory, [WORKER_FUNDING_AMOUNT, WORKER_BALANCE_THRESHOLD]);

    await reverter.snapshot();
  });

  afterEach(reverter.revert);

  describe('constructor', () => {
    it('should set the correct worker funding amount', async () => {
      expect(await faucet.workerFundingAmount()).to.equal(WORKER_FUNDING_AMOUNT);
    });

    it('should set the deployer as owner', async () => {
      expect(await faucet.owner()).to.equal(owner.address);
    });

    it('should not allow reinitialization', async () => {
      await expect(faucet.initialize(WORKER_FUNDING_AMOUNT, WORKER_BALANCE_THRESHOLD)).to.be.revertedWith(
        'Initializable: contract is already initialized',
      );
    });
  });

  describe('worker authorization', () => {
    it('should allow owner to add authorized workers', async () => {
      await faucet.addAuthorizedWorkers([worker1.address, worker2.address]);
      expect(await faucet.authorizedWorkers(worker1.address)).to.be.true;
      expect(await faucet.authorizedWorkers(worker2.address)).to.be.true;
    });

    it('should allow owner to remove authorized workers', async () => {
      await faucet.addAuthorizedWorkers([worker1.address, worker2.address]);
      await faucet.removeAuthorizedWorkers([worker1.address]);
      expect(await faucet.authorizedWorkers(worker1.address)).to.be.false;
      expect(await faucet.authorizedWorkers(worker2.address)).to.be.true;
    });

    it('should not allow non-owner to add authorized workers', async () => {
      await expect(faucet.connect(random).addAuthorizedWorkers([worker1.address])).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('should not allow non-owner to remove authorized workers', async () => {
      await faucet.addAuthorizedWorkers([worker1.address]);
      await expect(faucet.connect(random).removeAuthorizedWorkers([worker1.address])).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });

  describe('worker withdrawals', () => {
    beforeEach(async () => {
      await faucet.addAuthorizedWorkers([worker1.address]);
      await owner.sendTransaction({
        to: faucet.target,
        value: ethers.parseEther('1'),
      });
    });

    it('should allow authorized worker to withdraw funding amount', async () => {
      const initialBalance = await ethers.provider.getBalance(worker1.address);
      const tx = await faucet.connect(worker1).fundWorker();
      const receipt = await tx.wait();
      const gasUsed = receipt?.gasUsed || BigInt(0);
      const gasPrice = tx.gasPrice || BigInt(0);
      const gasCost = gasUsed * gasPrice;

      const finalBalance = await ethers.provider.getBalance(worker1.address);
      expect(finalBalance - initialBalance).to.equal(WORKER_FUNDING_AMOUNT - gasCost);
    });

    it('should not allow unauthorized worker to withdraw', async () => {
      expect(await faucet.authorizedWorkers(worker2.address)).to.be.false;

      await expect(faucet.connect(worker2).fundWorker()).to.be.revertedWith('Faucet: Not an authorized worker');
    });

    it('should fail if contract has insufficient balance', async () => {
      await faucet.connect(owner).withdrawAll();
      await expect(faucet.connect(worker1).fundWorker()).to.be.revertedWith('Faucet: Transfer failed');
    });
  });

  describe('owner withdrawals', () => {
    beforeEach(async () => {
      await owner.sendTransaction({
        to: faucet.target,
        value: ethers.parseEther('1'),
      });
    });

    it('should allow owner to withdraw specific amount', async () => {
      const withdrawAmount = ethers.parseEther('0.5');
      const initialBalance = await ethers.provider.getBalance(owner.address);
      const tx = await faucet.connect(owner).withdraw(withdrawAmount);
      const receipt = await tx.wait();
      const gasUsed = receipt?.gasUsed || BigInt(0);
      const gasPrice = tx.gasPrice || BigInt(0);
      const gasCost = gasUsed * gasPrice;

      const finalBalance = await ethers.provider.getBalance(owner.address);
      expect(finalBalance - initialBalance).to.equal(withdrawAmount - gasCost);
    });

    it('should allow owner to withdraw all funds', async () => {
      const initialBalance = await ethers.provider.getBalance(owner.address);
      const contractBalance = await ethers.provider.getBalance(faucet.target);
      const tx = await faucet.connect(owner).withdrawAll();
      const receipt = await tx.wait();
      const gasUsed = receipt?.gasUsed || BigInt(0);
      const gasPrice = tx.gasPrice || BigInt(0);
      const gasCost = gasUsed * gasPrice;

      const finalBalance = await ethers.provider.getBalance(owner.address);
      const finalContractBalance = await ethers.provider.getBalance(faucet.target);
      expect(finalContractBalance).to.equal(BigInt(0));
      expect(finalBalance - initialBalance).to.equal(contractBalance - gasCost);
    });

    it('should not allow non-owner to withdraw specific amount', async () => {
      await expect(faucet.connect(random).withdraw(ethers.parseEther('0.5'))).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('should not allow non-owner to withdraw all funds', async () => {
      await expect(faucet.connect(random).withdrawAll()).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('should fail if trying to withdraw more than balance', async () => {
      const contractBalance = await ethers.provider.getBalance(faucet.target);
      await expect(faucet.connect(owner).withdraw(contractBalance + BigInt(1))).to.be.revertedWith(
        'Faucet: Insufficient balance',
      );
    });
  });

  describe('worker funding amount management', () => {
    it('should allow owner to set worker funding amount', async () => {
      const newAmount = ethers.parseEther('0.2');
      await faucet.connect(owner).setWorkerFundingAmount(newAmount);
      expect(await faucet.workerFundingAmount()).to.equal(newAmount);
    });

    it('should not allow non-owner to set worker funding amount', async () => {
      await expect(faucet.connect(random).setWorkerFundingAmount(ethers.parseEther('0.2'))).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });

  describe('worker balance threshold management', () => {
    it('should set the correct worker balance threshold in constructor', async () => {
      expect(await faucet.workerBalanceThreshold()).to.equal(WORKER_BALANCE_THRESHOLD);
    });

    it('should allow owner to set worker balance threshold', async () => {
      const newThreshold = ethers.parseEther('0.3');
      await faucet.connect(owner).setWorkerBalanceThreshold(newThreshold);
      expect(await faucet.workerBalanceThreshold()).to.equal(newThreshold);
    });

    it('should not allow non-owner to set worker balance threshold', async () => {
      await expect(faucet.connect(random).setWorkerBalanceThreshold(ethers.parseEther('0.3'))).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });

  describe('receive function', () => {
    it('should accept ETH deposits', async () => {
      const depositAmount = ethers.parseEther('1');
      const initialBalance = await ethers.provider.getBalance(faucet.target);
      await owner.sendTransaction({
        to: faucet.target,
        value: depositAmount,
      });
      const finalBalance = await ethers.provider.getBalance(faucet.target);
      expect(finalBalance - initialBalance).to.equal(depositAmount);
    });
  });
});
