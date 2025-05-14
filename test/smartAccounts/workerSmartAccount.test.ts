import { ethers, network } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import {
  AuthorizationRequest,
  getBytes,
  hashAuthorization,
  Signature,
  TransactionRequest,
  verifyAuthorization,
  AuthorizationLike,
  SignatureLike,
} from 'ethers';
import { WorkerSmartAccount, Faucet } from '../../types/contracts/smartAccounts';

describe('MintingManager (metatx)', () => {
  let faucet: Faucet;
  let workerSmartAccountImplementation: WorkerSmartAccount;
  let signers: SignerWithAddress[], owner: SignerWithAddress, worker: SignerWithAddress, user: SignerWithAddress;

  before(async () => {
    signers = await ethers.getSigners();
    [owner, worker, user] = signers;

    const Faucet = await ethers.getContractFactory('Faucet');
    faucet = await Faucet.connect(owner).deploy();

    const WorkerSmartAccount = await ethers.getContractFactory('WorkerSmartAccount');
    workerSmartAccountImplementation = await WorkerSmartAccount.connect(owner).deploy(await faucet.target);
  });

  it('delegate worker EOA to workerSmartAccountImplementation', async () => {
    const authorization: AuthorizationRequest = {
      address: workerSmartAccountImplementation.target,
      nonce: 0, // Start with nonce 0
      chainId: (await ethers.provider.getNetwork()).chainId,
    };

    // Get authorization hash
    const authHash: string = hashAuthorization(authorization);

    // Sign the authorization
    const signature: string = await worker.signMessage(getBytes(authHash));

    // Create proper AuthorizationLike object
    const authLike: AuthorizationLike = {
      address: workerSmartAccountImplementation.target as string,
      nonce: authorization.nonce!,
      chainId: authorization.chainId!,
      signature: signature, // Use the raw signature string directly
    };

    // Transaction request with authorization
    const tx: TransactionRequest = {
      to: owner.address,
      value: ethers.parseEther('0'),
      type: 4,
      authorizationList: [authLike],
      maxFeePerGas: ethers.parseUnits('50', 'gwei'),
      maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei'),
      gasLimit: 250000,
    };

    // Send transaction
    console.log('Sending transaction with authorization...');
    const txResponse = await owner.sendTransaction(tx);
    console.log('Transaction hash:', txResponse.hash);

    // Wait for confirmation
    const receipt = await txResponse.wait();
    console.log('Transaction confirmed in block:', receipt?.blockNumber);

    const workerAsContract: WorkerSmartAccount = await ethers.getContractAt('WorkerSmartAccount', worker.address);

    const greeting = await workerAsContract.helloEIP7702();
    console.log(greeting);
  });
});
