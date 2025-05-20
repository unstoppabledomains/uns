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

  let userWallet: Wallet;
  let workerWallet: Wallet;
  let txOrigin: Wallet;

  before(async () => {
    signers = await ethers.getSigners();
    [owner] = signers;

    testSA = await ethers.getContractAt('Test', '0xDe1DAdcF11a7447C3D093e97FdbD513f488cE3b4');

    faucet = await ethers.getContractAt('Faucet', '0x3756b465bd9cb1ab75cCaf6dabeA3ff8637b9e1E');
    workerSAImplementation = await ethers.getContractAt(
      'WorkerSmartAccount',
      '0xEE27D087896F9C90e7C97EDf6C307B4CdE1C279B',
    );
    userSAImplementation = await ethers.getContractAt(
      'UserSmartAccount',
      '0x2D1fb5a57FB136C4E14A070c014E18546bf55d74',
    );

    erc20Mock = await ethers.getContractAt('ERC20Mock', '0x2774EA020b346CBf64C9FC50Cf7c4a24E3F6A383');

    // 0x170054D75a1288eC60C58dD12b21b0331A5b50DC
    workerWallet = new Wallet('0x8b4768f8e54b31a275d072b4579c1c6401812f0e5b1d321dbbfdc8a117cf2d3b', ethers.provider);

    // 0x6fe8D579f9Bdc96A2748F60dC3f4330fB7222A05
    userWallet = new Wallet('0x7339d492ad0ccc89e77ed3fa3a1189f92856c6b68dffe25905d604453dd86416', ethers.provider);

    // 0x2bc0B2feed78Eda6eDB57BD90117b9c74Ee85034
    txOrigin = new Wallet('0x38cb9fcb7adda7998500defe68b425a9b8e6d839dda9691519137bd687cb8a49', ethers.provider);
  });

  it.skip('setup', async () => {
    await erc20Mock.mint(userWallet.address, 200);

    const workerAuth: Authorization = await workerWallet.authorize({ address: workerSAImplementation });

    const tx: TransactionRequest = {
      to: workerWallet.address,
      type: 4,
      authorizationList: [workerAuth],
      maxFeePerGas: ethers.parseUnits('50', 'gwei'),
      maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei'),
      gasLimit: 50000,
    };

    await txOrigin.sendTransaction(tx);

    const workerAsContract: WorkerSmartAccount = await ethers.getContractAt(
      'WorkerSmartAccount',
      workerWallet.address,
    );

    const greeting = await workerAsContract.helloEIP7702();
    console.log(greeting);
  });

  it('test', async () => {
    const unlimitedDeadline = ethers.MaxUint256;
    const userAuth: Authorization = await userWallet.authorize({ address: userSAImplementation.target });

    const userAsContract: UserSmartAccount = await ethers.getContractAt('UserSmartAccount', userWallet.address);

    const erc20TransferData = erc20Mock.interface.encodeFunctionData('transfer', [workerWallet.address, 100]);

    const userCall = {
      to: erc20Mock.target.toString(),
      value: ethers.parseEther('0'),
      data: erc20TransferData,
    };

    // Create the typed data hash
    const domain = {
      name: 'UserSmartAccount',
      version: '1',
      chainId: (await ethers.provider.getNetwork()).chainId,
      verifyingContract: userWallet.address,
    };

    const types = {
      SmartAccountExecute: [
        { name: 'nonce', type: 'uint256' },
        { name: 'callsHash', type: 'bytes32' },
        { name: 'deadline', type: 'uint256' },
      ],
    };

    const value = {
      nonce: await userAsContract.nonce(),
      callsHash: await encodeCalls([userCall]),
      deadline: unlimitedDeadline,
    };

    const signature = await userWallet.signTypedData(domain, types, value);
    const { v, r, s } = ethers.Signature.from(signature);

    const workerAsContract: WorkerSmartAccount = await ethers.getContractAt(
      'WorkerSmartAccount',
      workerWallet.address,
    );
    console.log('Sending transaction with authorization...');
    const txResponse = await workerAsContract
      .connect(workerWallet)
      .executeAndCheckBalance(
        [userCall],
        userWallet.address,
        unlimitedDeadline,
        { v, r, s },
        { authorizationList: [userAuth], gasLimit: 200000 },
      );
    console.log('Transaction responce: ', txResponse);

    const greeting = await userAsContract.helloEIP7702();
    console.log(greeting);

    const userBalance = await erc20Mock.balanceOf(userWallet.address);
    console.log('user balance: ', userBalance);

    const workerBalance = await erc20Mock.balanceOf(workerWallet.address);
    console.log('worker balance: ', workerBalance);

    const txOriginBalance = await erc20Mock.balanceOf(txOrigin.address);
    console.log('txOrigin balance: ', txOriginBalance);
  });

  it.skip('random test', async () => {
    await owner.sendTransaction({
      to: faucet.target,
      value: ethers.parseEther('0.3'),
    });
  });
});

async function deploySmartAccounts (owner: SignerWithAddress) {
  const Faucet = await ethers.getContractFactory('Faucet');
  const faucet = await Faucet.connect(owner).deploy(ethers.parseEther('0.1'));

  const WorkerSmartAccount = await ethers.getContractFactory('WorkerSmartAccount');
  const workerSmartAccountImplementation = await WorkerSmartAccount.connect(owner).deploy(
    await faucet.target,
    ethers.parseEther('0.1'),
  );

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

async function encodeCalls (calls: { to: string; value: bigint; data: string }[]): Promise<string> {
  let encodedCalls = '0x0000000000000000000000000000000000000000000000000000000000000000';

  for (const call of calls) {
    const packedData = ethers.concat([encodedCalls, call.to, ethers.toBeHex(call.value, 32), call.data]);
    encodedCalls = ethers.keccak256(packedData);
  }

  return encodedCalls;
}
