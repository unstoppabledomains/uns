// process.env.HARDHAT_NETWORK = 'sandbox';

const { ethers, network } = require('hardhat');
const { expect } = require('chai');

const UNSNetworkConfig = require('../uns-config.json');
const Sandbox = require('.');

describe('Sandbox', async () => {
  const domainPrefix = 'sandbox';

  let UNSRegistry, MintingManager;
  let unsRegistry, mintingManager;
  let signers, owner, minter, sandbox;

  before(async () => {
    sandbox = await Sandbox.start({ verbose: true });

    signers = await ethers.getSigners();
    [owner, minter] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    MintingManager = await ethers.getContractFactory('MintingManager');

    const { contracts } = UNSNetworkConfig.networks[network.config.chainId];

    unsRegistry = await UNSRegistry.attach(contracts.UNSRegistry.address);
    mintingManager = await MintingManager.attach(contracts.MintingManager.address);
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
