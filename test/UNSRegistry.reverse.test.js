const { ethers } = require('hardhat');
const { expect } = require('chai');
const { buildExecuteFunc } = require('./helpers/metatx');
const { TLD } = require('./helpers/constants');
const { mintDomain, mintRandomDomain } = require('./helpers/registry');

describe('UNSRegistry (reverse)', () => {
  let UNSRegistry, unsRegistry, buildExecuteParams;
  let signers, coinbase, owner, receiver, reader;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner, receiver, reader] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
  });

  beforeEach(async () => {
    unsRegistry = await UNSRegistry.deploy();
    await unsRegistry.initialize(coinbase.address);
    await unsRegistry.mintTLD(TLD.CRYPTO, 'crypto');
    await unsRegistry.mintTLD(TLD.X, 'x');
    await unsRegistry.setTokenURIPrefix('/');

    buildExecuteParams = buildExecuteFunc(unsRegistry.interface, unsRegistry.address, unsRegistry);

    await unsRegistry.addProxyReader(reader.address);
  });

  describe('Minting', () => {
    it('should set reverse record on minting', async () => {
      const mintTx = await unsRegistry.mintWithRecords(owner.address, ['testminting', 'crypto'], [], []);
      const mintTxReceipt = await mintTx.wait();

      const newUriEventIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'NewURI');
      const setReverseIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'SetReverse');

      expect(newUriEventIndex).to.be.greaterThan(0);
      expect(setReverseIndex).to.be.greaterThan(0);
    });

    describe('mintWithRecords(address,string[],string[],string[])', async () => {
      it('should set reverse resolution on mint', async () => {
        const labels = ['reversemint4', 'crypto'];
        const tokenId = await unsRegistry.namehash(labels);

        await unsRegistry.mintWithRecords(coinbase.address, labels, ['key_1'], ['value_1']);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
      });

      it('should produce SetReverse event after NewURI', async () => {
        const labels = ['reversemint41', 'crypto'];
        const tokenId = await unsRegistry.namehash(labels);

        const mintTx = await unsRegistry.mintWithRecords(coinbase.address, labels, ['key_1'], ['value_1']);
        const mintTxReceipt = await mintTx.wait();

        const newUriEventIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'NewURI');
        const setReverseIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'SetReverse');

        expect(setReverseIndex).to.be.greaterThan(0);

        expect(mintTxReceipt.events[setReverseIndex].args).to.deep.equal([coinbase.address, tokenId]);
        expect(setReverseIndex).to.be.greaterThan(newUriEventIndex);
      });

      it('should not set reverse resolution if already set', async () => {
        const tokenId = await mintDomain(unsRegistry, coinbase.address, ['reversemint42', 'crypto']);
        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);

        const labels = ['reversemint43', 'crypto'];

        await expect(unsRegistry.mintWithRecords(coinbase.address, labels, ['key_1'], ['value_1'])).not.to.emit(
          unsRegistry,
          'SetReverse',
        );

        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
      });
    });
  });

  describe('General', () => {
    it('should set reverse record', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, ['res_1', 'x'], true);
      const _unsRegistry = unsRegistry.connect(owner);

      await expect(_unsRegistry['setReverse(uint256)'](tokenId))
        .to.emit(unsRegistry, 'SetReverse')
        .withArgs(owner.address, tokenId.toString());

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
    });

    it('should not resolve reverse record if reader is ProxyReader and token is upgraded', async () => {
      const tokenId = await mintRandomDomain(unsRegistry, owner, 'x');

      await unsRegistry.upgradeAll([tokenId]);

      expect(await unsRegistry.connect(reader).reverseOf(owner.address)).to.be.equal(0);
      expect(await unsRegistry.connect(coinbase).reverseOf(owner.address)).to.be.equal(tokenId);
    });

    it('should set reverse record (case-insensitive address)', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, ['res_1', 'x'], true);
      const _unsRegistry = unsRegistry.connect(owner);

      await expect(_unsRegistry['setReverse(uint256)'](tokenId))
        .to.emit(unsRegistry, 'SetReverse')
        .withArgs(owner.address, tokenId.toString());

      expect(await unsRegistry.reverseOf(ethers.utils.getAddress(owner.address))).to.be.equal(tokenId);
      expect(await unsRegistry.reverseOf(owner.address.toLowerCase())).to.be.equal(tokenId);
    });

    it('revert setting reverse record by non-owner', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, ['res_2', 'x'], true);
      const _unsRegistry = unsRegistry.connect(receiver);

      await expect(_unsRegistry['setReverse(uint256)'](tokenId)).to.be.revertedWith('Registry: SENDER_IS_NOT_OWNER');

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
    });

    it('should remove reverse record on tranfer', async () => {
      const tokenId = await mintRandomDomain(unsRegistry, owner, 'x');
      const _unsRegistry = unsRegistry.connect(owner);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);

      await _unsRegistry.transferFrom(owner.address, receiver.address, tokenId);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
      expect(await unsRegistry.reverseOf(receiver.address)).to.be.equal(0);
    });

    it('should remove reverse record on transfer only for current domain', async () => {
      const tokenId = await mintRandomDomain(unsRegistry, owner, 'x');
      const tokenId2 = await mintRandomDomain(unsRegistry, owner, 'x');

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);

      await unsRegistry.connect(owner).transferFrom(owner.address, receiver.address, tokenId2);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
      expect(await unsRegistry.reverseOf(receiver.address)).to.be.equal(0);
    });

    it('should remove reverse record', async () => {
      await mintDomain(unsRegistry, owner, ['rem_3', 'x']);
      const _unsRegistry = unsRegistry.connect(owner);

      await expect(_unsRegistry.removeReverse()).to.emit(unsRegistry, 'RemoveReverse').withArgs(owner.address);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
    });

    it('revert removing reverse record when there no reverse', async () => {
      const _unsRegistry = unsRegistry.connect(owner);

      await expect(_unsRegistry.removeReverse()).to.be.revertedWith('Registry: REVERSE_RECORD_IS_EMPTY');

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
    });
  });

  describe('MetaTx', () => {
    it('should set reverse record', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, ['res_mtx_1', 'x'], true);

      const { req, signature } = await buildExecuteParams('setReverse(uint256)', [tokenId], owner, tokenId);
      await unsRegistry.execute(req, signature);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
    });

    it('revert setting reverse record by non-owner', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, ['res_mtx_2', 'x'], true);

      const { req, signature } = await buildExecuteParams('setReverse(uint256)', [tokenId], receiver, tokenId);
      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_OWNER');

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
    });

    it('revert setting reverse record when non-token based nonce', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, ['res_mtx_4', 'x'], true);

      const { req, signature } = await buildExecuteParams('setReverse(uint256)', [tokenId], owner, 1);
      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: TOKEN_INVALID');

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
    });

    it('should remove reverse record', async () => {
      await mintDomain(unsRegistry, owner, ['rem_mtx_4', 'x']);

      const { req, signature } = await buildExecuteParams('removeReverse()', [], owner, owner.address);
      await unsRegistry.execute(req, signature);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
    });
  });
});
