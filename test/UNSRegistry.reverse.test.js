const { ethers } = require('hardhat');
const { expect } = require('chai');

const { TLD } = require('./helpers/constants');
const { mintDomain } = require('./helpers/registry');

describe('UNSRegistry (reverse)', () => {
  let UNSRegistry;
  let unsRegistry;
  let signers, coinbase, owner, receiver;

  beforeEach(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner, receiver] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');

    unsRegistry = await UNSRegistry.deploy();
    await unsRegistry.initialize(coinbase.address);
    await unsRegistry['mint(address,uint256,string)'](
      '0xdead000000000000000000000000000000000000',
      TLD.X,
      'crypto',
    );
    await unsRegistry.setTokenURIPrefix('/');
  });

  it('should set reverse record', async () => {
    const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'res_1');
    const _unsRegistry = unsRegistry.connect(owner);

    await expect(_unsRegistry.setReverse(tokenId))
      .to.emit(unsRegistry, 'SetReverse')
      .withArgs(owner.address, tokenId.toString());

    expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
  });

  it('revert setting reverse record by non-owner', async () => {
    const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'res_2');
    const _unsRegistry = unsRegistry.connect(receiver);

    await expect(_unsRegistry.setReverse(tokenId)).to.be.revertedWith(
      'Registry: SENDER_IS_NOT_OWNER',
    );

    expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
  });

  it('should remove reverse record on tranfer', async () => {
    const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'rem_2');
    const _unsRegistry = unsRegistry.connect(owner);

    await _unsRegistry.setReverse(tokenId);
    expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);

    await _unsRegistry.transferFrom(owner.address, receiver.address, tokenId);

    expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
    expect(await unsRegistry.reverseOf(receiver.address)).to.be.equal(0);
  });

  it('should remove reverse record', async () => {
    const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'rem_3');
    const _unsRegistry = unsRegistry.connect(owner);
    await _unsRegistry.setReverse(tokenId);

    await expect(_unsRegistry.removeReverse())
      .to.emit(unsRegistry, 'RemoveReverse')
      .withArgs(owner.address);

    expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
  });

  it('revert removing reverse record when there no reverse', async () => {
    const _unsRegistry = unsRegistry.connect(owner);

    await expect(_unsRegistry.removeReverse()).to.be.revertedWith(
      'Registry: REVERSE_RECORD_IS_EMPTY',
    );

    expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
  });
});
