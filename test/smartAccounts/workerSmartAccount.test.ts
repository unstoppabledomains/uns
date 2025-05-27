import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { AuthorizationRequest, Wallet, Authorization } from 'ethers';
import { WorkerSmartAccount, Faucet, Test, UserSmartAccount } from '../../types/contracts/smartAccounts';
import { ERC20Mock } from '../../types/contracts/mocks';

describe('Sepolia eip7702 test', () => {
  let signers: SignerWithAddress[], owner: SignerWithAddress;
  let faucet: Faucet;
  let workerSAImplementation: WorkerSmartAccount;
  let erc20Mock: ERC20Mock;

  let userWallet: Wallet;
  let workerWallet: Wallet;
  let txOrigin: Wallet;

  before(async () => {
    signers = await ethers.getSigners();
    [owner] = signers;

    const faucetFactory = await ethers.getContractFactory('Faucet');

    faucet = await faucetFactory.deploy(ethers.parseEther('0.1'));

    const workerSmartAccountFactory = await ethers.getContractFactory('WorkerSmartAccount');
    workerSAImplementation = await workerSmartAccountFactory.deploy(faucet.target, ethers.parseEther('0.1'));

    const erc20Factory = await ethers.getContractFactory('ERC20Mock');
    erc20Mock = await erc20Factory.deploy();

    // 0x170054D75a1288eC60C58dD12b21b0331A5b50DC
    workerWallet = new Wallet('0x8b4768f8e54b31a275d072b4579c1c6401812f0e5b1d321dbbfdc8a117cf2d3b', ethers.provider);

    // 0x6fe8D579f9Bdc96A2748F60dC3f4330fB7222A05
    userWallet = new Wallet('0x7339d492ad0ccc89e77ed3fa3a1189f92856c6b68dffe25905d604453dd86416', ethers.provider);

    // 0x2bc0B2feed78Eda6eDB57BD90117b9c74Ee85034
    txOrigin = new Wallet('0x38cb9fcb7adda7998500defe68b425a9b8e6d839dda9691519137bd687cb8a49', ethers.provider);
  });

  it('test', async () => {
    await owner.sendTransaction({
      to: faucet.target,
      value: ethers.parseEther('1'),
    });

    await owner.sendTransaction({
      to: workerWallet.address,
      value: ethers.parseEther('0.09'),
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

    console.log('Sending transaction with authorization...');
    const txResponse = await workerAsContract
      .connect(workerWallet)
      .executeBatchAndEnsureBalance([erc20Mock.target], [erc20TransferData], [ethers.parseEther('0')], {
        authorizationList: [workerAuth],
        gasLimit: 200000,
      });
    console.log('Transaction responce: ', txResponse);

    const workerBalance = await erc20Mock.balanceOf(workerWallet.address);
    console.log('worker balance: ', workerBalance);

    const userBalance = await erc20Mock.balanceOf(userWallet.address);
    console.log('user balance: ', userBalance);

    console.log('worker balance: ', await ethers.provider.getBalance(workerWallet.address));
  });
});
