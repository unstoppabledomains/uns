import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { AuthorizationRequest, Wallet, Authorization } from 'ethers';
import { expect } from 'chai';
import { network } from 'hardhat';
import { WorkerSmartAccount, Faucet } from '../../types/contracts/smartAccounts';
import { MintingManager, UNSRegistry } from '../../types/contracts';
import { MintingManagerForwarder } from '../../types/contracts/metatx';
import { deployProxy, mintUnsTlds } from '../../src/helpers';
import { ERC20Mock } from '../../types/contracts/mocks';
import { buildExecuteFunc, ExecuteFunc } from '../helpers/metatx';
import { Reverter } from '../helpers/reverter';

describe('Worker Smart Account', () => {
  const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

  const reverter = new Reverter();
  let buildExecuteParams: ExecuteFunc;

  let signers: SignerWithAddress[],
    owner: SignerWithAddress,
    minter: SignerWithAddress,
    user: SignerWithAddress,
    random: SignerWithAddress;
  let faucet: Faucet;
  let workerSAImplementation: WorkerSmartAccount;
  let erc20Mock: ERC20Mock;
  let mintingManager: MintingManager;
  let unsRegistry: UNSRegistry;
  let mintingManagerForwarder: MintingManagerForwarder;

  before(async () => {
    signers = await ethers.getSigners();
    [owner, minter, user, random] = signers;

    const faucetFactory = await ethers.getContractFactory('Faucet');
    faucet = await faucetFactory.deploy(ethers.parseEther('0.1'));

    const workerSmartAccountFactory = await ethers.getContractFactory('WorkerSmartAccount');
    workerSAImplementation = await workerSmartAccountFactory.deploy(faucet.target, ethers.parseEther('0.1'));

    const erc20Factory = await ethers.getContractFactory('ERC20Mock');
    erc20Mock = await erc20Factory.deploy();

    const mintingManagerFactory = await ethers.getContractFactory('MintingManager');
    mintingManager = await deployProxy(mintingManagerFactory.connect(owner), [], { initializer: false });

    const unsRegistryFactory = await ethers.getContractFactory('UNSRegistry');
    unsRegistry = await unsRegistryFactory.deploy();
    await unsRegistry.initialize(mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

    const mintingManagerForwarderFactory = await ethers.getContractFactory('MintingManagerForwarder');
    mintingManagerForwarder = await mintingManagerForwarderFactory.deploy(mintingManager.getAddress());

    await mintingManager.initialize(
      await unsRegistry.getAddress(),
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      await mintingManagerForwarder.getAddress(),
    );
    await mintingManager.addMinter(await minter.address);
    await mintingManager.setTokenURIPrefix('/');
    await mintUnsTlds(mintingManager, owner);

    buildExecuteParams = buildExecuteFunc(
      mintingManager.interface,
      await mintingManager.getAddress(),
      mintingManagerForwarder,
    );

    await reverter.snapshot();
  });

  afterEach(reverter.revert);

  describe('basic tests', async () => {
    let userWallet: Wallet;
    let workerWallet: Wallet;
    let txOrigin: Wallet;

    beforeEach(async () => {
      // Using ethers wallets because hardhat signer doesn't support EIP7702 yet
      workerWallet = new ethers.Wallet(Wallet.createRandom().privateKey, ethers.provider);
      userWallet = new ethers.Wallet(Wallet.createRandom().privateKey, ethers.provider);
      txOrigin = new ethers.Wallet(Wallet.createRandom().privateKey, ethers.provider);
    });

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

    it('should not be possible to call worker wallet execute not from self', async () => {
      const initialWorkerBalance = ethers.parseEther('0');

      await owner.sendTransaction({
        to: workerWallet.address,
        value: initialWorkerBalance,
      });

      await owner.sendTransaction({
        to: userWallet.address,
        value: ethers.parseEther('0.1'),
      });

      await faucet.addAuthorizedWorkers([workerWallet.address]);

      const authRequest: AuthorizationRequest = {
        address: workerSAImplementation.target,
        nonce: await workerWallet.getNonce(),
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
      const initialWorkerBalance = ethers.parseEther('0');

      await owner.sendTransaction({
        to: workerWallet.address,
        value: initialWorkerBalance,
      });

      await owner.sendTransaction({
        to: userWallet.address,
        value: ethers.parseEther('0.1'),
      });

      await faucet.addAuthorizedWorkers([workerWallet.address]);

      const authRequest: AuthorizationRequest = {
        address: workerSAImplementation.target,
        nonce: await workerWallet.getNonce(),
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

  describe('complex tests', async () => {
    let workerWallet: Wallet;
    let workerAsContract: WorkerSmartAccount;

    beforeEach(async () => {
      // Using ethers wallets because hardhat signer doesn't support EIP7702 yet
      workerWallet = new ethers.Wallet(Wallet.createRandom().privateKey, ethers.provider);

      await owner.sendTransaction({
        to: workerWallet.address,
        value: ethers.parseEther('1'),
      });

      await owner.sendTransaction({
        to: user.address,
        value: ethers.parseEther('1'),
      });

      const workerAuth: Authorization = await workerWallet.authorize({
        address: workerSAImplementation.target,
        nonce: (await workerWallet.getNonce()) + 1,
      });

      await faucet.addAuthorizedWorkers([workerWallet.address]);

      await workerWallet.sendTransaction({
        to: workerWallet.address,
        value: ethers.parseEther('0'),
        type: 4,
        authorizationList: [workerAuth],
        gasLimit: 50000,
      });

      workerAsContract = await ethers.getContractAt('WorkerSmartAccount', workerWallet.address);
    });

    it('should be possible to make a multicall to minting manager minting domains having signatures from minters', async () => {
      const labels1 = ['blabla', 'crypto'];
      const tokenId1 = await unsRegistry.namehash(labels1);

      const labels2 = ['blabla2', 'crypto'];
      const tokenId2 = await unsRegistry.namehash(labels2);

      const { req: req1, signature: signature1 } = await buildExecuteParams(
        'issueWithRecords(address,string[],string[],string[],bool)',
        [user.address, labels1, [], [], true],
        minter,
        tokenId1,
      );

      const mmForwarderCallData1 = mintingManagerForwarder.interface.encodeFunctionData('execute', [req1, signature1]);

      const { req: req2, signature: signature2 } = await buildExecuteParams(
        'issueWithRecords(address,string[],string[],string[],bool)',
        [user.address, labels2, [], [], true],
        minter,
        tokenId2,
      );

      const mmForwarderCallData2 = mintingManagerForwarder.interface.encodeFunctionData('execute', [req2, signature2]);

      await workerAsContract
        .connect(workerWallet)
        .executeBatch(
          [mintingManagerForwarder.target, mintingManagerForwarder.target],
          [mmForwarderCallData1, mmForwarderCallData2],
          [0, 0],
        );

      expect(await unsRegistry.ownerOf(tokenId1)).to.be.equal(user.address);
      expect(await unsRegistry.ownerOf(tokenId2)).to.be.equal(user.address);
    });

    it('should be possible to make a multicall to minting manager to transfer domains from different users', async () => {
      const labels1 = ['blabla', 'crypto'];
      const tokenId1 = await unsRegistry.namehash(labels1);

      const labels2 = ['blabla2', 'crypto'];
      const tokenId2 = await unsRegistry.namehash(labels2);

      const { req: req1, signature: signature1 } = await buildExecuteParams(
        'issueWithRecords(address,string[],string[],string[],bool)',
        [user.address, labels1, [], [], true],
        minter,
        tokenId1,
      );

      const { req: req2, signature: signature2 } = await buildExecuteParams(
        'issueWithRecords(address,string[],string[],string[],bool)',
        [user.address, labels2, [], [], true],
        minter,
        tokenId2,
      );

      await mintingManagerForwarder.connect(minter).execute(req1, signature1);
      await mintingManagerForwarder.connect(minter).execute(req2, signature2);

      expect(await unsRegistry.ownerOf(tokenId1)).to.be.equal(user.address);
      expect(await unsRegistry.ownerOf(tokenId2)).to.be.equal(user.address);

      const buildExecuteParamsUnsRegistry = buildExecuteFunc(
        unsRegistry.interface,
        await unsRegistry.getAddress(),
        unsRegistry,
      );

      const { req: reqTransfer1, signature: signatureTransfer1 } = await buildExecuteParamsUnsRegistry(
        'safeTransferFrom(address,address,uint256)',
        [user.address, random.address, tokenId1],
        user,
        tokenId1,
      );

      const { req: reqTransfer2, signature: signatureTransfer2 } = await buildExecuteParamsUnsRegistry(
        'safeTransferFrom(address,address,uint256)',
        [user.address, random.address, tokenId2],
        user,
        tokenId2,
      );

      const unsRegistryForwarderCallData1 = unsRegistry.interface.encodeFunctionData('execute', [
        reqTransfer1,
        signatureTransfer1,
      ]);
      const unsRegistryForwarderCallData2 = unsRegistry.interface.encodeFunctionData('execute', [
        reqTransfer2,
        signatureTransfer2,
      ]);

      await workerAsContract
        .connect(workerWallet)
        .executeBatch(
          [unsRegistry.target, unsRegistry.target],
          [unsRegistryForwarderCallData1, unsRegistryForwarderCallData2],
          [0, 0],
        );

      expect(await unsRegistry.ownerOf(tokenId1)).to.be.equal(random.address);
      expect(await unsRegistry.ownerOf(tokenId2)).to.be.equal(random.address);
    });
  });
});
