// process.env.HARDHAT_NETWORK = 'sandbox';

const { ethers, network } = require('hardhat');
const { expect } = require('chai');

const UNSNetworkConfig = require('../uns-config.json');
const Sandbox = require('.');

const { BigNumber } = ethers;

describe('Sandbox', async () => {
  const domainPrefix = 'sandbox';
  const walletRoot = BigNumber.from('0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230');

  let UNSRegistry, MintingManager;
  let unsRegistry, mintingManager;
  let signers, coinbase, sandbox;

  before(async () => {
    sandbox = await Sandbox.create();
    await sandbox.start();

    signers = await ethers.getSigners();
    [coinbase] = signers;

    UNSRegistry = await ethers.getContractFactory('contracts/UNSRegistry.sol:UNSRegistry');
    MintingManager = await ethers.getContractFactory('contracts/MintingManager.sol:MintingManager');

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
    const _domainName = `${domainPrefix}_wallet_0`;

    const tx = await mintingManager.connect(coinbase)
      .mintSLD(coinbase.address, walletRoot, _domainName);
    await tx.wait();

    const _walletTokenId = await unsRegistry.childIdOf(walletRoot, _domainName);
    expect(await unsRegistry.ownerOf(_walletTokenId)).to.be.eq(coinbase.address);
  });

  it('should mint same token as prev test', async () => {
    const _domainName = `${domainPrefix}_wallet_0`;

    const tx = await mintingManager.connect(coinbase)
      .mintSLD(coinbase.address, walletRoot, _domainName);
    await tx.wait();

    const _walletTokenId = await unsRegistry.childIdOf(walletRoot, _domainName);
    expect(await unsRegistry.ownerOf(_walletTokenId)).to.be.eq(coinbase.address);
  });
});
