// process.env.HARDHAT_NETWORK = 'sandbox';
import { Sandbox } from '.';
import { expect } from 'chai';
import { ethers, network } from 'hardhat';
import { readNetworkConfig } from '../src/config';
import { MintingManager__factory, UNSRegistry__factory } from '../typechain-types/factories/contracts';
import { MintingManager, UNSRegistry } from '../typechain-types/contracts';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('Sandbox', async () => {
  const domainPrefix = 'sandbox';

  let unsRegistry: UNSRegistry, mintingManager: MintingManager;
  let signers: SignerWithAddress[], owner: SignerWithAddress, minter: SignerWithAddress;

  let sandbox: Sandbox;

  before(async () => {
    sandbox = await Sandbox.start({ verbose: true });

    signers = await ethers.getSigners();
    [owner, minter] = signers;

    const {contracts} = readNetworkConfig().networks[network.config.chainId!];

    unsRegistry = new UNSRegistry__factory(owner).attach(contracts.UNSRegistry.address);
    mintingManager = new MintingManager__factory(owner).attach(contracts.MintingManager.address);
  });

  beforeEach(async () => {
    await sandbox.reset();
  });

  after(async () => {
    await sandbox.stop();
  });

  it('should mint a token', async () => {
    const labels = [`${domainPrefix}_wallet_0`, 'wallet'];

    const tx = await mintingManager.connect(minter).issueWithRecords(owner.address, labels, [], []);
    await tx.wait();

    const _walletTokenId = await unsRegistry.namehash(labels);
    expect(await unsRegistry.ownerOf(_walletTokenId)).to.be.eq(owner.address);
  });

  it('should mint same token as prev test', async () => {
    const labels = [`${domainPrefix}_wallet_0`, 'wallet'];

    const tx = await mintingManager.connect(minter).issueWithRecords(owner.address, labels, [], []);
    await tx.wait();

    const _walletTokenId = await unsRegistry.namehash(labels);
    expect(await unsRegistry.ownerOf(_walletTokenId)).to.be.eq(owner.address);
  });
});
