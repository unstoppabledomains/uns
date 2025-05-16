import { ethers, network } from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import {
  AuthorizationRequest,
  getBytes,
  hashAuthorization,
  TransactionRequest,
  verifyAuthorization,
  AuthorizationLike,
  Wallet,
  Authorization,
} from 'ethers';
import { getContractFactory } from '@nomicfoundation/hardhat-ethers/types';
import { WorkerSmartAccount, Faucet, Test, UserSmartAccount } from '../../types/contracts/smartAccounts';
import { ERC20Mock } from '../../types/contracts/mocks';

describe('Sepolia eip7702 test', () => {
  let signers: SignerWithAddress[], owner: SignerWithAddress;
  let testSA: Test;
  let faucet: Faucet;
  let workerSAImplementation: WorkerSmartAccount;
  let userSAImplementation: UserSmartAccount;
  let erc20Mock: ERC20Mock;

  before(async () => {
    signers = await ethers.getSigners();
    [owner] = signers;

    testSA = await ethers.getContractAt('Test', '0xDe1DAdcF11a7447C3D093e97FdbD513f488cE3b4');

    faucet = await ethers.getContractAt('Faucet', '0x6d619039a9b036daa319231E8EFFb08A7De95660');
    workerSAImplementation = await ethers.getContractAt(
      'WorkerSmartAccount',
      '0x5f907b9412b604926e25c765da8211eE20cd2F63',
    );
    userSAImplementation = await ethers.getContractAt(
      'UserSmartAccount',
      '0xecACC65a8Bcaa328E9BDFa810Bd5c8e708a6381E',
    );

    erc20Mock = await ethers.getContractAt('ERC20Mock', '0x2774EA020b346CBf64C9FC50Cf7c4a24E3F6A383');
  });

  it('delegate worker EOA to workerSmartAccountImplementation', async () => {
    const workerWallet = new Wallet(
      '0x8b4768f8e54b31a275d072b4579c1c6401812f0e5b1d321dbbfdc8a117cf2d3b',
      ethers.provider,
    );

    const userWallet = new Wallet(
      '0x7339d492ad0ccc89e77ed3fa3a1189f92856c6b68dffe25905d604453dd86416',
      ethers.provider,
    );

    await erc20Mock.mint(userWallet.address, ethers.parseUnits('200', 18));

    const userAuth: Authorization = await userWallet.authorize({ address: userSAImplementation });

    const erc20TransferData = erc20Mock.interface.encodeFunctionData('transfer', [
      workerWallet.address,
      ethers.parseUnits('100', 18),
    ]);

    const userCall = {
      to: erc20Mock.target,
      value: 0,
      data: erc20TransferData,
    };

    const data = workerSAImplementation.interface.encodeFunctionData('executeAndCheckBalance', [
      [userCall],
      userWallet.address,
      getBytes(userAuth.signature.toString()),
    ]);

    const tx: TransactionRequest = {
      to: workerWallet.address,
      type: 4,
      authorizationList: [userAuth],
      maxFeePerGas: ethers.parseUnits('50', 'gwei'),
      maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei'),
      gasLimit: 50000,
      data: data,
    };

    console.log('Sending transaction with authorization...');
    const txResponse = await workerWallet.sendTransaction(tx);
    console.log('Transaction responce: ', txResponse);

    const workerAsContract: Test = await ethers.getContractAt('Test', workerWallet.address);

    const greeting = await workerAsContract.helloEIP7702();
    console.log(greeting);
  });
});

async function deploySmartAccounts (owner: SignerWithAddress) {
  const Faucet = await ethers.getContractFactory('Faucet');
  const faucet = await Faucet.connect(owner).deploy();

  const WorkerSmartAccount = await ethers.getContractFactory('WorkerSmartAccount');
  const workerSmartAccountImplementation = await WorkerSmartAccount.connect(owner).deploy(await faucet.target);

  const UserSmartAccount = await ethers.getContractFactory('UserSmartAccount');
  const userSmartAccountImplementation = await UserSmartAccount.connect(owner).deploy();

  console.log('Faucet address: ', faucet.target);
  console.log('WorkerSmartAccount address: ', workerSmartAccountImplementation.target);
  console.log('UserSmartAccount address: ', userSmartAccountImplementation.target);

  return {
    faucet,
    workerSmartAccountImplementation,
    userSmartAccountImplementation,
  };
}

async function delegateWorker (owner: Wallet, workerSmartAccountImplementation: WorkerSmartAccount) {
  const workerWallet = new Wallet(
    '0x8b4768f8e54b31a275d072b4579c1c6401812f0e5b1d321dbbfdc8a117cf2d3b',
    ethers.provider,
  );
}
