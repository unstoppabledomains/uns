const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai');

const { ZERO_ADDRESS, TLD } = require('./helpers/constants');
const { buildExecuteFunc } = require('./helpers/metatx');

describe('MintingManager (metatx)', () => {
  let UNSRegistry, MintingManager, MintingManagerForwarder;
  let unsRegistry, mintingManager, forwarder, buildExecuteParams;
  let signers, coinbase, receiver;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, receiver] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    MintingManager = await ethers.getContractFactory('MintingManager');
    MintingManagerForwarder = await ethers.getContractFactory('MintingManagerForwarder');
  });

  beforeEach(async () => {
    unsRegistry = await UNSRegistry.deploy();

    mintingManager = await upgrades.deployProxy(MintingManager, [], { initializer: false });
    await unsRegistry.initialize(mintingManager.address);

    forwarder = await MintingManagerForwarder.deploy(mintingManager.address);

    await mintingManager.initialize(unsRegistry.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS, forwarder.address);
    await mintingManager.addMinter(coinbase.address);
    await mintingManager.setTokenURIPrefix('/');

    buildExecuteParams = buildExecuteFunc(mintingManager.interface, mintingManager.address, forwarder);
  });

  it('should mint through forwarder', async () => {
    const tokenId = await unsRegistry.childIdOf(TLD.WALLET, 'test-qw11');
    const { req, signature } = await buildExecuteParams(
      'mintSLD(address,uint256,string)',
      [receiver.address, TLD.WALLET, 'test-qw11'],
      coinbase, tokenId);

    await forwarder.execute(req, signature);

    expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
  });

  it('should revert forwarding when forwarder not trusted', async () => {
    const tokenId = await unsRegistry.childIdOf(TLD.WALLET, 'test-qw11');
    const { req, signature } = await buildExecuteParams(
      'mintSLD(address,uint256,string)',
      [receiver.address, TLD.WALLET, 'test-qw11'],
      coinbase, tokenId);

    await mintingManager.setForwarder(ZERO_ADDRESS);

    await expect(
      forwarder.execute(req, signature),
    ).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
  });

  it('should revert execution when signature is not valid', async () => {
    const tokenId = await unsRegistry.childIdOf(TLD.WALLET, 'test-qw1341');
    const { req, signature } = await buildExecuteParams(
      'mintSLD(address,uint256,string)',
      [receiver.address, TLD.WALLET, 'test-qw1341'],
      coinbase, tokenId);

    await expect(forwarder.execute({ ...req, from: receiver.address }, signature)).to.be
      .revertedWith('MintingManagerForwarder: SIGNATURE_INVALID');
  });

  it('should revert execution when used signature', async () => {
    const tokenId = await unsRegistry.childIdOf(TLD.WALLET, 'test-qw1341');
    const { req, signature } = await buildExecuteParams(
      'mintSLD(address,uint256,string)',
      [receiver.address, TLD.WALLET, 'test-qw1341'],
      coinbase, tokenId);

    await forwarder.execute(req, signature);

    await expect(forwarder.execute(req, signature)).to.be
      .revertedWith('MintingManagerForwarder: SIGNATURE_INVALID');
  });
});
