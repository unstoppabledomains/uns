const { ethers } = require('hardhat');
const { expect } = require('chai');

const { buildExecuteFunc } = require('./helpers/metatx');
const { TLD } = require('./helpers/constants');
const { mintDomain } = require('./helpers/registry');

describe('UNSRegistry (reverse)', () => {
  let UNSRegistry, unsRegistry, buildExecuteParams;
  let signers, coinbase, owner, receiver;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner, receiver] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
  });

  beforeEach(async () => {
    unsRegistry = await UNSRegistry.deploy();
    await unsRegistry.initialize(coinbase.address);
    await unsRegistry['mint(address,uint256,string)'](
      '0xdead000000000000000000000000000000000000',
      TLD.X,
      'crypto',
    );
    await unsRegistry.setTokenURIPrefix('/');

    buildExecuteParams = buildExecuteFunc(unsRegistry.interface, unsRegistry.address, unsRegistry);
  });

  describe('General', () => {
    it('should set reverse record', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'res_1');
      const _unsRegistry = unsRegistry.connect(owner);

      await expect(_unsRegistry.setReverse(tokenId))
        .to.emit(unsRegistry, 'SetReverse')
        .withArgs(owner.address, tokenId.toString());

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
    });

    it('should set reverse record (case-insensitive address)', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'res_1');
      const _unsRegistry = unsRegistry.connect(owner);

      await expect(_unsRegistry.setReverse(tokenId))
        .to.emit(unsRegistry, 'SetReverse')
        .withArgs(owner.address, tokenId.toString());

      expect(await unsRegistry.reverseOf(ethers.utils.getAddress(owner.address))).to.be.equal(tokenId);
      expect(await unsRegistry.reverseOf(owner.address.toLowerCase())).to.be.equal(tokenId);
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

  describe('MetaTx', () => {
    it('should set reverse record', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'res_mtx_1');

      const { req, signature } = await buildExecuteParams(
        'setReverse(uint256)',
        [tokenId],
        owner, tokenId);
      await unsRegistry.execute(req, signature);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
    });

    it('revert setting reverse record by non-owner', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'res_mtx_2');

      const { req, signature } = await buildExecuteParams(
        'setReverse(uint256)',
        [tokenId], receiver, tokenId,
      );
      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith(
        'Registry: SENDER_IS_NOT_OWNER',
      );

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
    });

    it('revert setting reverse record when non-token based nonce', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'res_mtx_3');

      const { req, signature } = await buildExecuteParams(
        'setReverse(uint256)',
        [tokenId], owner, 1,
      );
      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith(
        'Registry: TOKEN_INVALID',
      );

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
    });

    it('should remove reverse record', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'rem_mtx_4');
      await unsRegistry.connect(owner).setReverse(tokenId);

      const { req, signature } = await buildExecuteParams('removeReverse()', [], owner, owner.address);
      await unsRegistry.execute(req, signature);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
    });
  });
});
