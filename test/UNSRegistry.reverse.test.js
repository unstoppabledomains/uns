const { ethers } = require('hardhat');
const { expect } = require('chai');

const { buildExecuteFunc } = require('./helpers/metatx');
const { TLD, DEAD_ADDRESS } = require('./helpers/constants');
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
      TLD.CRYPTO,
      'crypto',
    );
    await unsRegistry.setTokenURIPrefix('/');

    buildExecuteParams = buildExecuteFunc(unsRegistry.interface, unsRegistry.address, unsRegistry);
  });

  describe('Minting', () => {
    it('should set reverse record on minting', async () => {
      const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'testminting.crypto');
      const mintFunction = unsRegistry['mint(address,uint256,string)'];

      const mintTx = await mintFunction(owner.address, tokenId, 'testminting.crypto');
      const mintTxReceipt = await mintTx.wait();

      const newUriEventIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'NewURI');
      const setReverseIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'SetReverse');

      expect(newUriEventIndex).to.be.greaterThan(0);
      expect(setReverseIndex).to.be.greaterThan(0);
    });

    describe('mint(address,uint256,string)', async () => {
      const selector = 'mint(address,uint256,string)';

      it('should set reverse resolution on mint', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint1');

        await unsRegistry.functions[selector](coinbase.address, tokenId, 'reversemint1.crypto');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
      });

      it('should produce SetReverse event after NewURI', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint11');

        const mintTx = await unsRegistry.functions[selector](coinbase.address, tokenId, 'reversemint11.crypto');
        const mintTxReceipt = await mintTx.wait();

        const newUriEventIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'NewURI');
        const setReverseIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'SetReverse');

        expect(setReverseIndex).to.be.greaterThan(0);

        expect(mintTxReceipt.events[setReverseIndex].args).to.deep.equal([coinbase.address, tokenId]);
        expect(setReverseIndex).to.be.greaterThan(newUriEventIndex);
      });

      it('should not set reverse resolution if already set', async () => {
        const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'reversemint12.crypto');
        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);

        const anotherTokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint13');

        await expect(unsRegistry.functions[selector](coinbase.address, anotherTokenId, 'reversemint13.crypto'))
          .not.to.emit(unsRegistry, 'SetReverse');

        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
      });

      it('should not set reverse resolution when minting to 0xdead address', async () => {
        const address = DEAD_ADDRESS;
        await unsRegistry.functions[selector](address, TLD.WALLET, 'wallet');

        expect(await unsRegistry.reverseOf(address)).to.be.equal(0);
      });
    });

    describe('safeMint(address,uint256,string)', async () => {
      const selector = 'safeMint(address,uint256,string)';

      it('should set reverse resolution on mint', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint2');

        await unsRegistry.functions[selector](coinbase.address, tokenId, 'reversemint2.crypto');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
      });

      it('should produce SetReverse event after NewURI', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint21');

        const mintTx = await unsRegistry.functions[selector](coinbase.address, tokenId, 'reversemint21.crypto');
        const mintTxReceipt = await mintTx.wait();

        const newUriEventIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'NewURI');
        const setReverseIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'SetReverse');

        expect(setReverseIndex).to.be.greaterThan(0);

        expect(mintTxReceipt.events[setReverseIndex].args).to.deep.equal([coinbase.address, tokenId]);
        expect(setReverseIndex).to.be.greaterThan(newUriEventIndex);
      });

      it('should not set reverse resolution if already set', async () => {
        const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'reversemint22.crypto');
        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);

        const anotherTokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint23');

        await expect(unsRegistry.functions[selector](coinbase.address, anotherTokenId, 'reversemint23.crypto'))
          .not.to.emit(unsRegistry, 'SetReverse');

        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
      });
    });

    describe('safeMint(address,uint256,string,bytes)', async () => {
      const selector = 'safeMint(address,uint256,string,bytes)';

      it('should set reverse resolution on mint', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint3');

        await unsRegistry.functions[selector](coinbase.address, tokenId, 'reversemint3.crypto', '0x');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
      });

      it('should produce SetReverse event after NewURI', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint31');

        const mintTx = await unsRegistry.functions[selector](coinbase.address, tokenId, 'reversemint31.crypto', '0x');
        const mintTxReceipt = await mintTx.wait();

        const newUriEventIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'NewURI');
        const setReverseIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'SetReverse');

        expect(setReverseIndex).to.be.greaterThan(0);

        expect(mintTxReceipt.events[setReverseIndex].args).to.deep.equal([coinbase.address, tokenId]);
        expect(setReverseIndex).to.be.greaterThan(newUriEventIndex);
      });

      it('should not set reverse resolution if already set', async () => {
        const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'reversemint32.crypto');
        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);

        const anotherTokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint33');

        await expect(unsRegistry.functions[selector](coinbase.address, anotherTokenId, 'reversemint33.crypto', '0x'))
          .not.to.emit(unsRegistry, 'SetReverse');

        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
      });
    });

    describe('mintWithRecords(address,uint256,string,string[],string[])', async () => {
      it('should set reverse resolution on mint', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint4');

        await unsRegistry.mintWithRecords(coinbase.address, tokenId, 'reversemint4.crypto', ['key_1'], ['value_1']);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
      });

      it('should produce SetReverse event after NewURI', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint41');

        const mintTx = await unsRegistry.mintWithRecords(
          coinbase.address,
          tokenId,
          'reversemint41.crypto',
          ['key_1'], ['value_1'],
        );
        const mintTxReceipt = await mintTx.wait();

        const newUriEventIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'NewURI');
        const setReverseIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'SetReverse');

        expect(setReverseIndex).to.be.greaterThan(0);

        expect(mintTxReceipt.events[setReverseIndex].args).to.deep.equal([coinbase.address, tokenId]);
        expect(setReverseIndex).to.be.greaterThan(newUriEventIndex);
      });

      it('should not set reverse resolution if already set', async () => {
        const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'reversemint42.crypto');
        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);

        const anotherTokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint43');

        await expect(
          unsRegistry.mintWithRecords(coinbase.address, anotherTokenId, 'reversemint43.crypto', ['key_1'], ['value_1']),
        ).not.to.emit(unsRegistry, 'SetReverse');

        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
      });
    });

    describe('safeMintWithRecords(address,uint256,string,string[],string[])', async () => {
      const selector = 'safeMintWithRecords(address,uint256,string,string[],string[])';

      it('should set reverse resolution on mint', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint5');
        await unsRegistry[selector](coinbase.address, tokenId, 'reversemint5.crypto', ['key_1'], ['value_1']);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.get('key_1', tokenId)).to.be.eql('value_1');
        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
      });

      it('should produce SetReverse event after NewURI', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint51');

        const mintTx = await unsRegistry[selector](
          coinbase.address,
          tokenId,
          'reversemint51.crypto',
          ['key_1'], ['value_1'],
        );
        const mintTxReceipt = await mintTx.wait();

        const newUriEventIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'NewURI');
        const setReverseIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'SetReverse');

        expect(setReverseIndex).to.be.greaterThan(0);

        expect(mintTxReceipt.events[setReverseIndex].args).to.deep.equal([coinbase.address, tokenId]);
        expect(setReverseIndex).to.be.greaterThan(newUriEventIndex);
      });

      it('should not set reverse resolution if already set', async () => {
        const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'reversemint52.crypto');
        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);

        const anotherTokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint53');

        await expect(
          unsRegistry[selector](coinbase.address, anotherTokenId, 'reversemint53.crypto', ['key_1'], ['value_1']),
        ).not.to.emit(unsRegistry, 'SetReverse');

        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
      });
    });

    describe('safeMintWithRecords(address,uint256,string,string[],string[],bytes)', async () => {
      const selector = 'safeMintWithRecords(address,uint256,string,string[],string[],bytes)';

      it('should set reverse resolution on mint', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint6');
        await unsRegistry[selector](coinbase.address, tokenId, 'reversemint6.crypto', ['key_1'], ['value_1'], '0x');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.get('key_1', tokenId)).to.be.eql('value_1');
        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
      });

      it('should produce SetReverse event after NewURI', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint61');

        const mintTx = await unsRegistry[selector](
          coinbase.address,
          tokenId,
          'reversemint61.crypto',
          ['key_1'], ['value_1'],
          '0x',
        );
        const mintTxReceipt = await mintTx.wait();

        const newUriEventIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'NewURI');
        const setReverseIndex = mintTxReceipt.events.findIndex(({ event }) => event === 'SetReverse');

        expect(setReverseIndex).to.be.greaterThan(0);

        expect(mintTxReceipt.events[setReverseIndex].args).to.deep.equal([coinbase.address, tokenId]);
        expect(setReverseIndex).to.be.greaterThan(newUriEventIndex);
      });

      it('should not set reverse resolution if already set', async () => {
        const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'reversemint62.crypto');
        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);

        const anotherTokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'reversemint63');

        await expect(
          unsRegistry[selector](coinbase.address, anotherTokenId, 'reversemint63.crypto', ['key_1'], ['value_1'], '0x'),
        ).not.to.emit(unsRegistry, 'SetReverse');

        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(tokenId);
      });
    });
  });

  describe('General', () => {
    it('should set reverse record', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'res_1', true);
      const _unsRegistry = unsRegistry.connect(owner);

      await expect(_unsRegistry.setReverse(tokenId))
        .to.emit(unsRegistry, 'SetReverse')
        .withArgs(owner.address, tokenId.toString());

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
    });

    it('should set reverse record (case-insensitive address)', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'res_1', true);
      const _unsRegistry = unsRegistry.connect(owner);

      await expect(_unsRegistry.setReverse(tokenId))
        .to.emit(unsRegistry, 'SetReverse')
        .withArgs(owner.address, tokenId.toString());

      expect(await unsRegistry.reverseOf(ethers.utils.getAddress(owner.address))).to.be.equal(tokenId);
      expect(await unsRegistry.reverseOf(owner.address.toLowerCase())).to.be.equal(tokenId);
    });

    it('revert setting reverse record by non-owner', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'res_2', true);
      const _unsRegistry = unsRegistry.connect(receiver);

      await expect(_unsRegistry.setReverse(tokenId)).to.be.revertedWith(
        'Registry: SENDER_IS_NOT_OWNER',
      );

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
    });

    it('should revert setting reverse record if tokenId is deprecated', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'res_1', true);

      await unsRegistry.deprecateTokens([tokenId]);

      const _unsRegistry = unsRegistry.connect(owner);

      await expect(_unsRegistry.setReverse(tokenId))
        .to.be.revertedWith('Registry: TOKEN_DEPRECATED')

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
    });

    it('should remove reverse record on tranfer', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'rem_2');
      const _unsRegistry = unsRegistry.connect(owner);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);

      await _unsRegistry.transferFrom(owner.address, receiver.address, tokenId);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
      expect(await unsRegistry.reverseOf(receiver.address)).to.be.equal(0);
    });

    it('should remove reverse record', async () => {
      await mintDomain(unsRegistry, owner, TLD.X, 'rem_3');
      const _unsRegistry = unsRegistry.connect(owner);

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
      const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'res_mtx_1', true);

      const { req, signature } = await buildExecuteParams(
        'setReverse(uint256)',
        [tokenId],
        owner, tokenId);
      await unsRegistry.execute(req, signature);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);
    });

    it('revert setting reverse record by non-owner', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'res_mtx_2', true);

      const { req, signature } = await buildExecuteParams(
        'setReverse(uint256)',
        [tokenId], receiver, tokenId,
      );
      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith(
        'Registry: SENDER_IS_NOT_OWNER',
      );

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
    });

    it('should revert setting reverse record if tokenId is deprecated', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'res_metatx_3', true);

      await unsRegistry.deprecateTokens([tokenId]);

      const { req, signature } = await buildExecuteParams(
        'setReverse(uint256)',
        [tokenId], owner, tokenId,
      );
      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith(
        'Registry: TOKEN_DEPRECATED',
      );
    });

    it('revert setting reverse record when non-token based nonce', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.X, 'res_mtx_4', true);

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
      await mintDomain(unsRegistry, owner, TLD.X, 'rem_mtx_4');

      const { req, signature } = await buildExecuteParams('removeReverse()', [], owner, owner.address);
      await unsRegistry.execute(req, signature);

      expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
    });
  });
});
