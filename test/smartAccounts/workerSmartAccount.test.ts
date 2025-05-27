import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { AuthorizationRequest, Wallet, Authorization } from 'ethers';
import { expect } from 'chai';
import { network } from 'hardhat';
import { WorkerSmartAccount, Faucet } from '../../types/contracts/smartAccounts';
import { ERC20Mock } from '../../types/contracts/mocks';

describe('Worker Smart Account', () => {
  let signers: SignerWithAddress[], owner: SignerWithAddress;
  let faucet: Faucet;
  let workerSAImplementation: WorkerSmartAccount;
  let erc20Mock: ERC20Mock;

  let userWallet: Wallet;
  let workerWallet: Wallet;
  let txOrigin: Wallet;

  let snapshotId: string;

  before(async () => {
    signers = await ethers.getSigners();
    [owner] = signers;

    const faucetFactory = await ethers.getContractFactory('Faucet');
    faucet = await faucetFactory.deploy(ethers.parseEther('0.1'));

    const workerSmartAccountFactory = await ethers.getContractFactory('WorkerSmartAccount');
    workerSAImplementation = await workerSmartAccountFactory.deploy(faucet.target, ethers.parseEther('0.1'));

    const erc20Factory = await ethers.getContractFactory('ERC20Mock');
    erc20Mock = await erc20Factory.deploy();

    snapshotId = await network.provider.send('evm_snapshot');
  });

  beforeEach(async () => {
    // Using ethers wallets because hardhat signer doesn't support EIP7702 yet
    workerWallet = new ethers.Wallet(Wallet.createRandom().privateKey, ethers.provider);
    userWallet = new ethers.Wallet(Wallet.createRandom().privateKey, ethers.provider);
    txOrigin = new ethers.Wallet(Wallet.createRandom().privateKey, ethers.provider);
  });

  afterEach(async () => {
    await network.provider.send('evm_revert', [snapshotId]);
  });

  describe('', async () => {
    it('should be possible to make a random call from worker wallet through worker smart account', async () => {
      const initialWorkerBalance = ethers.parseEther('0.09');

      await owner.sendTransaction({
        to: faucet.target,
        value: ethers.parseEther('1'),
      });

      await owner.sendTransaction({
        to: workerWallet.address,
        value: initialWorkerBalance,
      });

      await faucet.addAuthorizedWorkers([workerWallet.address]);

      const authRequest: AuthorizationRequest = {
        address: workerSAImplementation.target,
        nonce: (await workerWallet.getNonce()) + 1,
      };

      const workerAuth: Authorization = await workerWallet.authorize(authRequest);

      const workerAsContract: WorkerSmartAccount = await ethers.getContractAt(
        'WorkerSmartAccount',
        workerWallet.address,
      );

      await erc20Mock.mint(workerWallet.address, 200);

      const erc20TransferData = erc20Mock.interface.encodeFunctionData('transfer', [userWallet.address, 100]);

      await workerAsContract
        .connect(workerWallet)
        .executeBatchAndEnsureBalance([erc20Mock.target], [erc20TransferData], [ethers.parseEther('0')], {
          authorizationList: [workerAuth],
          gasLimit: 200000,
        });

      const workerBalance = await erc20Mock.balanceOf(workerWallet.address);
      const userBalance = await erc20Mock.balanceOf(userWallet.address);
      const workerEthBalance = await ethers.provider.getBalance(workerWallet.address);

      expect(workerBalance).to.equal(BigInt(100));
      expect(userBalance).to.equal(BigInt(100));
      expect(workerEthBalance).to.be.gt(initialWorkerBalance);
    });

    it('should be possible to make a multicall from worker wallet through worker smart account', async () => {
      const initialWorkerBalance = ethers.parseEther('0.09');

      await owner.sendTransaction({
        to: workerWallet.address,
        value: initialWorkerBalance,
      });

      await faucet.addAuthorizedWorkers([workerWallet.address]);

      const authRequest: AuthorizationRequest = {
        address: workerSAImplementation.target,
        nonce: (await workerWallet.getNonce()) + 1,
      };

      const workerAuth: Authorization = await workerWallet.authorize(authRequest);

      const workerAsContract: WorkerSmartAccount = await ethers.getContractAt(
        'WorkerSmartAccount',
        workerWallet.address,
      );

      await erc20Mock.mint(workerWallet.address, 300);

      const erc20TransferData1 = erc20Mock.interface.encodeFunctionData('transfer', [userWallet.address, 100]);
      const erc20TransferData2 = erc20Mock.interface.encodeFunctionData('transfer', [txOrigin.address, 150]);

      await workerAsContract
        .connect(workerWallet)
        .executeBatch(
          [erc20Mock.target, erc20Mock.target],
          [erc20TransferData1, erc20TransferData2],
          [ethers.parseEther('0'), ethers.parseEther('0')],
          {
            authorizationList: [workerAuth],
            gasLimit: 200000,
          },
        );

      const workerBalance = await erc20Mock.balanceOf(workerWallet.address);
      const userBalance = await erc20Mock.balanceOf(userWallet.address);
      const txOriginBalance = await erc20Mock.balanceOf(txOrigin.address);
      const workerEthBalance = await ethers.provider.getBalance(workerWallet.address);

      expect(workerBalance).to.equal(BigInt(50));
      expect(userBalance).to.equal(BigInt(100));
      expect(txOriginBalance).to.equal(BigInt(150));
    });

    it('should be possible to make a multicall and add balance', async () => {
      const initialWorkerBalance = ethers.parseEther('0.09');

      await owner.sendTransaction({
        to: faucet.target,
        value: ethers.parseEther('1'),
      });

      await owner.sendTransaction({
        to: workerWallet.address,
        value: initialWorkerBalance,
      });

      await faucet.addAuthorizedWorkers([workerWallet.address]);

      const authRequest: AuthorizationRequest = {
        address: workerSAImplementation.target,
        nonce: (await workerWallet.getNonce()) + 1,
      };

      const workerAuth: Authorization = await workerWallet.authorize(authRequest);

      const workerAsContract: WorkerSmartAccount = await ethers.getContractAt(
        'WorkerSmartAccount',
        workerWallet.address,
      );

      await erc20Mock.mint(workerWallet.address, 300);

      const erc20TransferData1 = erc20Mock.interface.encodeFunctionData('transfer', [userWallet.address, 100]);
      const erc20TransferData2 = erc20Mock.interface.encodeFunctionData('transfer', [txOrigin.address, 150]);

      await workerAsContract
        .connect(workerWallet)
        .executeBatchAndEnsureBalance(
          [erc20Mock.target, erc20Mock.target],
          [erc20TransferData1, erc20TransferData2],
          [ethers.parseEther('0'), ethers.parseEther('0')],
          {
            authorizationList: [workerAuth],
            gasLimit: 200000,
          },
        );

      const workerBalance = await erc20Mock.balanceOf(workerWallet.address);
      const userBalance = await erc20Mock.balanceOf(userWallet.address);
      const txOriginBalance = await erc20Mock.balanceOf(txOrigin.address);
      const workerEthBalance = await ethers.provider.getBalance(workerWallet.address);

      expect(workerBalance).to.equal(BigInt(50));
      expect(userBalance).to.equal(BigInt(100));
      expect(txOriginBalance).to.equal(BigInt(150));
      expect(workerEthBalance).to.be.gt(initialWorkerBalance);
    });

    it('should be possible to make a multicall to minting manager minting domains having signatures from minters', async () => {});

    it('should not be possible to call worker wallet execute not from self', async () => {
      const initialWorkerBalance = ethers.parseEther('0.09');

      await owner.sendTransaction({
        to: workerWallet.address,
        value: initialWorkerBalance,
      });

      await owner.sendTransaction({
        to: userWallet.address,
        value: ethers.parseEther('1'),
      });

      await faucet.addAuthorizedWorkers([workerWallet.address]);

      const authRequest: AuthorizationRequest = {
        address: workerSAImplementation.target,
        nonce: (await workerWallet.getNonce()) + 1,
      };

      const workerAuth: Authorization = await workerWallet.authorize(authRequest);

      const workerAsContract: WorkerSmartAccount = await ethers.getContractAt(
        'WorkerSmartAccount',
        workerWallet.address,
      );

      await erc20Mock.mint(workerWallet.address, 200);

      const erc20TransferData = erc20Mock.interface.encodeFunctionData('transfer', [userWallet.address, 100]);

      await expect(
        workerAsContract
          .connect(userWallet)
          .executeBatch([erc20Mock.target], [erc20TransferData], [ethers.parseEther('0')], {
            authorizationList: [workerAuth],
            gasLimit: 200000,
          }),
      ).to.be.revertedWith('WorkerSmartAccount: Can be only called from self');
    });

    it('should not be possible to call worker wallet executeAndEnsureBalance not from self', async () => {
      const initialWorkerBalance = ethers.parseEther('0.09');

      await owner.sendTransaction({
        to: workerWallet.address,
        value: initialWorkerBalance,
      });

      await owner.sendTransaction({
        to: userWallet.address,
        value: ethers.parseEther('1'),
      });

      await faucet.addAuthorizedWorkers([workerWallet.address]);

      const authRequest: AuthorizationRequest = {
        address: workerSAImplementation.target,
        nonce: (await workerWallet.getNonce()) + 1,
      };

      const workerAuth: Authorization = await workerWallet.authorize(authRequest);

      const workerAsContract: WorkerSmartAccount = await ethers.getContractAt(
        'WorkerSmartAccount',
        workerWallet.address,
      );

      await erc20Mock.mint(workerWallet.address, 200);

      const erc20TransferData = erc20Mock.interface.encodeFunctionData('transfer', [userWallet.address, 100]);

      await expect(
        workerAsContract
          .connect(userWallet)
          .executeBatchAndEnsureBalance([erc20Mock.target], [erc20TransferData], [ethers.parseEther('0')], {
            authorizationList: [workerAuth],
            gasLimit: 200000,
          }),
      ).to.be.revertedWith('WorkerSmartAccount: Can be only called from self');
    });

    it('should not be possible to call workerSmartAccount contract at all', async () => {
      const initialWorkerBalance = ethers.parseEther('0.09');

      await owner.sendTransaction({
        to: workerWallet.address,
        value: initialWorkerBalance,
      });

      await faucet.addAuthorizedWorkers([workerWallet.address]);

      const authRequest: AuthorizationRequest = {
        address: workerSAImplementation.target,
        nonce: (await workerWallet.getNonce()) + 1,
      };

      const workerAuth: Authorization = await workerWallet.authorize(authRequest);

      await erc20Mock.mint(workerWallet.address, 200);

      const erc20TransferData = erc20Mock.interface.encodeFunctionData('transfer', [userWallet.address, 100]);

      await expect(
        workerSAImplementation
          .connect(workerWallet)
          .executeBatch([erc20Mock.target], [erc20TransferData], [ethers.parseEther('0')], {
            authorizationList: [workerAuth],
            gasLimit: 200000,
          }),
      ).to.be.revertedWith('WorkerSmartAccount: Can be only called from self');
    });
  });
});
