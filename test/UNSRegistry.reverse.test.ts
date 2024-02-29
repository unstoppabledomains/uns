import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { UNSRegistry } from '../types/contracts';
import { UNSRegistryMock } from '../types/contracts/mocks';
import { UNSRegistry__factory } from '../types/factories/contracts';
import { UNSRegistryMock__factory } from '../types/factories/contracts/mocks';
import { buildExecuteFunc, ExecuteFunc } from './helpers/metatx';
import { TLD, ZERO_ADDRESS } from './helpers/constants';
import { mintDomain } from './helpers/registry';

describe('UNSRegistry (reverse)', () => {
  let unsRegistry: UNSRegistry;
  let unsRegistryMock: UNSRegistryMock;

  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    owner: SignerWithAddress,
    receiver: SignerWithAddress,
    reader: SignerWithAddress;
  let buildExecuteParams: ExecuteFunc;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner, receiver, reader] = signers;
  });

  beforeEach(async () => {
    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();

    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistry.mintTLD(TLD.CRYPTO, 'crypto');
    await unsRegistry.mintTLD(TLD.X, 'x');
    await unsRegistry.setTokenURIPrefix('/');

    buildExecuteParams = buildExecuteFunc(
      unsRegistry.interface,
      unsRegistry.address,
      unsRegistry,
    );

    await unsRegistry.addProxyReader(reader.address);

    // mock
    unsRegistryMock = await new UNSRegistryMock__factory(coinbase).deploy();
    await unsRegistryMock.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistryMock.mintTLD(TLD.CRYPTO, 'crypto');
    await unsRegistryMock.mintTLD(TLD.X, 'x');
    await unsRegistryMock.setTokenURIPrefix('/');
    await unsRegistryMock.addProxyReader(reader.address);
  });

  describe('Minting', () => {
    it('should produce NewURI and SetReverse events', async () => {
      const mintTx = await unsRegistry.mintWithRecords(
        owner.address,
        ['testminting', 'crypto'],
        [],
        [],
        true,
      );
      const mintTxReceipt = await mintTx.wait();

      const newUriEventIndex = mintTxReceipt.events?.findIndex(
        ({ event }) => event === 'NewURI',
      );
      const setReverseIndex = mintTxReceipt.events?.findIndex(
        ({ event }) => event === 'SetReverse',
      );

      expect(newUriEventIndex).to.be.greaterThan(0);
      expect(setReverseIndex).to.be.greaterThan(0);
    });

    it('should only produce NewURI and not SetReverse events with setReverse = false', async () => {
      const mintTx = await unsRegistry.mintWithRecords(
        owner.address,
        ['testminting2', 'crypto'],
        [],
        [],
        false,
      );
      const mintTxReceipt = await mintTx.wait();

      const newUriEventIndex = mintTxReceipt.events?.findIndex(
        ({ event }) => event === 'NewURI',
      );
      const setReverseIndex = mintTxReceipt.events?.findIndex(
        ({ event }) => event === 'SetReverse',
      );

      expect(newUriEventIndex).to.be.greaterThan(0);
      expect(setReverseIndex).to.be.equal(-1);
    });

    it('should set reverse resolution on mint', async () => {
      const labels = ['reversemint4_2', 'crypto'];
      const uri = labels.join('.');
      const tokenId = await unsRegistry.namehash(labels);

      await unsRegistry.mintWithRecords(
        coinbase.address,
        labels,
        ['key_1'],
        ['value_1'],
        true,
      );

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
        coinbase.address,
      );
      expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(
        tokenId,
      );
      expect(await unsRegistry.reverseNameOf(coinbase.address)).to.be.equal(
        uri,
      );
    });

    it('should not set reverse resolution on mint if withReverse = false', async () => {
      const labels = ['reversemint4_21', 'crypto'];
      const tokenId = await unsRegistry.namehash(labels);

      await unsRegistry.mintWithRecords(
        coinbase.address,
        labels,
        ['key_1'],
        ['value_1'],
        false,
      );

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
        coinbase.address,
      );
      expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(
        ZERO_ADDRESS,
      );
      expect(await unsRegistry.reverseNameOf(coinbase.address)).to.be.equal(
        '',
      );
    });

    it('should produce SetReverse event after NewURI', async () => {
      const labels = ['reversemint41_2', 'crypto'];
      const tokenId = await unsRegistry.namehash(labels);

      const mintTx = await unsRegistry.mintWithRecords(
        coinbase.address,
        labels,
        ['key_1'],
        ['value_1'],
        true,
      );
      const mintTxReceipt = await mintTx.wait();

      const newUriEventIndex = mintTxReceipt.events?.findIndex(
        ({ event }) => event === 'NewURI',
      );
      const setReverseIndex = mintTxReceipt.events?.findIndex(
        ({ event }) => event === 'SetReverse',
      );

      expect(setReverseIndex).to.be.greaterThan(0);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(mintTxReceipt.events?.[setReverseIndex!].args).to.deep.equal([
        coinbase.address,
        tokenId,
      ]);

      expect(setReverseIndex).to.be.greaterThan(newUriEventIndex);
    });

    it('should not set reverse resolution if already set', async () => {
      const labels = ['reversemint42_2', 'crypto'];
      const uri = labels.join('.');
      const tokenId = await mintDomain({ unsRegistry, owner: coinbase.address, labels });
      expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(
        tokenId,
      );
      expect(await unsRegistry.reverseNameOf(coinbase.address)).to.be.equal(
        uri,
      );

      const labels1 = ['reversemint43', 'crypto'];

      await expect(
        unsRegistry.mintWithRecords(
          coinbase.address,
          labels1,
          ['key_1'],
          ['value_1'],
          true,
        ),
      ).not.to.emit(unsRegistry, 'SetReverse');

      expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(
        tokenId,
      );
      expect(await unsRegistry.reverseNameOf(coinbase.address)).to.be.equal(
        uri,
      );
    });
  });

  describe('General', () => {
    it('should set reverse record', async () => {
      const labels = ['res_1', 'x'];
      const uri = labels.join('.');
      const tokenId = await mintDomain({
        unsRegistry,
        owner,
        labels: ['res_1', 'x'],
        withoutReverse: true,
      }      );
      const _unsRegistry = unsRegistry.connect(owner);

      await expect(_unsRegistry['setReverse(string[])'](labels))
        .to.emit(unsRegistry, 'SetReverse')
        .withArgs(owner.address, tokenId.toString());

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
      expect(await unsRegistry.reverseNameOf(owner.address)).to.be.equal(uri);
    });

    it('should not resolve reverse record if reader is ProxyReader and token is upgraded', async () => {
      const labels = ['upgraded-token-1', 'x'];
      const uri = labels.join('.');
      const tokenId = await mintDomain({ unsRegistry: unsRegistryMock, owner, labels: labels });

      await unsRegistryMock.upgradeAll([tokenId]);

      expect(await unsRegistryMock.connect(reader).reverseOf(owner.address)).to.be.equal(0);
      expect(await unsRegistryMock.connect(coinbase).reverseOf(owner.address)).to.be.equal(tokenId);

      expect(await unsRegistryMock.connect(reader).reverseNameOf(owner.address)).to.be.equal('');
      expect(await unsRegistryMock.connect(coinbase).reverseNameOf(owner.address)).to.be.equal(uri);
    });

    it('should set reverse record (case-insensitive address)', async () => {
      const labels = ['res_1', 'x'];
      const uri = labels.join('.');
      const tokenId = await mintDomain({
        unsRegistry,
        owner,
        labels,
        withoutReverse: true,
      });
      const _unsRegistry = unsRegistry.connect(owner);

      await expect(_unsRegistry['setReverse(string[])'](labels))
        .to.emit(unsRegistry, 'SetReverse')
        .withArgs(owner.address, tokenId.toString());

      expect(
        await unsRegistry.reverseOf(ethers.utils.getAddress(owner.address)),
      ).to.be.equal(tokenId);
      expect(
        await unsRegistry.reverseOf(owner.address.toLowerCase()),
      ).to.be.equal(tokenId);

      expect(
        await unsRegistry.reverseNameOf(ethers.utils.getAddress(owner.address)),
      ).to.be.equal(uri);
      expect(
        await unsRegistry.reverseNameOf(owner.address.toLowerCase()),
      ).to.be.equal(uri);
    });

    it('revert setting reverse record by non-owner', async () => {
      const labels = ['res_2', 'x'];
      await mintDomain({
        unsRegistry,
        owner,
        labels: ['res_2', 'x'],
        withoutReverse: true,
      });
      const _unsRegistry = unsRegistry.connect(receiver);

      await expect(
        _unsRegistry['setReverse(string[])'](labels),
      ).to.be.revertedWith('Registry: SENDER_IS_NOT_OWNER');

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
    });

    it('should remove reverse record on tranfer', async () => {
      const labels = ['remove-reverse-record-1', 'x'];
      const uri = labels.join('.');
      const tokenId = await mintDomain({ unsRegistry, owner, labels });
      const _unsRegistry = unsRegistry.connect(owner);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
      expect(await unsRegistry.reverseNameOf(owner.address)).to.be.equal(uri);

      await _unsRegistry.transferFrom(owner.address, receiver.address, tokenId);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
      expect(await unsRegistry.reverseOf(receiver.address)).to.be.equal(0);

      expect(await unsRegistry.reverseNameOf(owner.address)).to.be.equal('');
      expect(await unsRegistry.reverseNameOf(receiver.address)).to.be.equal('');
    });

    it('should remove reverse record on transfer only for current domain', async () => {
      const labels = ['remove-reverse-multiple', 'x'];
      const uri = labels.join('.');
      const labels2 = ['remove-reverse-multiple-1', 'x'];
      const tokenId = await mintDomain({ unsRegistry, owner, labels });
      const tokenId2 = await mintDomain({ unsRegistry, owner, labels: labels2 });

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
      expect(await unsRegistry.reverseNameOf(owner.address)).to.be.equal(uri);

      await unsRegistry
        .connect(owner)
        .transferFrom(owner.address, receiver.address, tokenId2);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
      expect(await unsRegistry.reverseOf(receiver.address)).to.be.equal(0);

      expect(await unsRegistry.reverseNameOf(owner.address)).to.be.equal(uri);
      expect(await unsRegistry.reverseNameOf(receiver.address)).to.be.equal('');
    });

    it('should remove reverse record', async () => {
      const labels = ['rem_3', 'x'];
      const uri = labels.join('.');
      const tokenId = await mintDomain({ unsRegistry, owner, labels });
      const _unsRegistry = unsRegistry.connect(owner);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
      expect(await unsRegistry.reverseNameOf(owner.address)).to.be.equal(uri);

      await expect(_unsRegistry.removeReverse())
        .to.emit(unsRegistry, 'RemoveReverse')
        .withArgs(owner.address);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
      expect(await unsRegistry.reverseNameOf(owner.address)).to.be.equal('');
    });

    it('revert removing reverse record when there no reverse', async () => {
      const _unsRegistry = unsRegistry.connect(owner);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
      expect(await unsRegistry.reverseNameOf(owner.address)).to.be.equal('');

      await expect(_unsRegistry.removeReverse()).to.be.revertedWith(
        'Registry: REVERSE_RECORD_IS_EMPTY',
      );
    });

    it('should set reverse resolution for labels', async () => {
      const labels = ['unhash1', 'x'];
      const uri = labels.join('.');
      const tokenId = await mintDomain({
        unsRegistry,
        owner,
        labels,
        withoutReverse: true,
      });
      const _unsRegistry = unsRegistry.connect(owner);
      await expect(_unsRegistry['setReverse(string[])'](labels))
        .to.emit(_unsRegistry, 'SetReverse')
        .withArgs(owner.address, tokenId.toString());
      expect(await _unsRegistry.reverseNameOf(owner.address)).to.be.equal(uri);
      expect(await _unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
    });

    it('should not allow to set reverse resolution by non owner for labels', async () => {
      const labels = ['non-owner-unhash-1', 'x'];
      await mintDomain({
        unsRegistry,
        owner,
        labels,
        withoutReverse: true,
      });

      const _unsRegistry = unsRegistry.connect(reader);
      await expect(_unsRegistry['setReverse(string[])'](labels))
        .to.be.revertedWith('Registry: SENDER_IS_NOT_OWNER');
    });
  });

  describe('MetaTx', () => {
    it('should set reverse record', async () => {
      const labels = ['res_mtx_1', 'x'];
      const uri = labels.join('.');
      const tokenId = await mintDomain({
        unsRegistry,
        owner,
        labels,
        withoutReverse: true,
      });

      const params = await buildExecuteParams(
        'setReverse(string[])',
        [labels],
        owner,
        tokenId,
      );
      await unsRegistry.execute(params.req, params.signature);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
      expect(await unsRegistry.reverseNameOf(owner.address)).to.be.equal(uri);
    });

    it('revert setting reverse record by non-owner', async () => {
      const labels = ['res_mtx_2', 'x'];
      const tokenId = await mintDomain({
        unsRegistry,
        owner,
        labels,
        withoutReverse: true,
      });

      const params = await buildExecuteParams(
        'setReverse(string[])',
        [labels],
        receiver,
        tokenId,
      );
      await expect(unsRegistry.execute(params.req, params.signature)).to.be.revertedWith(
        'Registry: SENDER_IS_NOT_OWNER',
      );

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
      expect(await unsRegistry.reverseNameOf(owner.address)).to.be.equal('');
    });

    it('revert setting reverse record when non-token based nonce', async () => {
      const labels = ['res_mtx_4', 'x'];
      await mintDomain({
        unsRegistry,
        owner,
        labels,
        withoutReverse: true,
      });

      const params = await buildExecuteParams(
        'setReverse(string[])',
        [labels],
        owner,
        1,
      );
      await expect(unsRegistry.execute(params.req, params.signature)).to.be.revertedWith(
        'Registry: TOKEN_INVALID',
      );

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
      expect(await unsRegistry.reverseNameOf(owner.address)).to.be.equal('');
    });

    it('should remove reverse record', async () => {
      const labels = ['rem_mtx_4', 'x'];
      const uri = labels.join('.');
      const tokenId = await mintDomain({ unsRegistry, owner, labels });
      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
      expect(await unsRegistry.reverseNameOf(owner.address)).to.be.equal(uri);

      const { req, signature } = await buildExecuteParams(
        'removeReverse()',
        [],
        owner,
        owner.address,
      );
      await unsRegistry.execute(req, signature);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
      expect(await unsRegistry.reverseNameOf(owner.address)).to.be.equal('');
    });
  });
});
