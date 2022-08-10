const { ethers } = require('hardhat');
const { expect } = require('chai');
const namehash = require('eth-ens-namehash');

const { TLD, ZERO_ADDRESS, DEAD_ADDRESS } = require('./helpers/constants');
const { mintDomain } = require('./helpers/registry');

const { utils, BigNumber } = ethers;

describe('UNSRegistry', () => {
  let UNSRegistry, CNSRegistry, ERC721ReceiverMock;
  let unsRegistry, cnsRegistry;
  let signers, coinbase, owner, receiver, accounts;

  const root = TLD.CRYPTO;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner, , receiver] = signers;
    [, ...accounts] = signers.map((s) => s.address);

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    CNSRegistry = await ethers.getContractFactory('CNSRegistry');
    ERC721ReceiverMock = await ethers.getContractFactory('ERC721ReceiverMock');

    unsRegistry = await UNSRegistry.deploy();
    await unsRegistry.initialize(coinbase.address);
    await unsRegistry['mint(address,uint256,string)'](
      DEAD_ADDRESS,
      root,
      'crypto',
    );
    await unsRegistry.setTokenURIPrefix('/');

    cnsRegistry = await CNSRegistry.deploy();
  });

  describe('General', () => {
    it('should return zero root', async () => {
      expect(await unsRegistry.root()).to.be.equal(0);
    });

    it('should resolve properly', async () => {
      const tokenId = await mintDomain(
        unsRegistry,
        coinbase.address,
        TLD.CRYPTO,
        'resolution',
      );
      expect(await unsRegistry.resolverOf(tokenId)).to.be.equal(
        unsRegistry.address,
      );

      await unsRegistry.burn(tokenId);
      expect(await unsRegistry.resolverOf(tokenId)).to.be.equal(ZERO_ADDRESS);

      await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'resolution');
      expect(await unsRegistry.resolverOf(tokenId)).to.be.equal(
        unsRegistry.address,
      );
    });

    it('should set URI prefix', async () => {
      expect(await unsRegistry.tokenURI(root)).to.be.equal(`/${root}`);

      await unsRegistry.setTokenURIPrefix('prefix-');
      expect(await unsRegistry.tokenURI(root)).to.be.equal(`prefix-${root}`);

      await unsRegistry.setTokenURIPrefix('/');
      expect(await unsRegistry.tokenURI(root)).to.be.equal(`/${root}`);
    });

    it('should emit Transfer event on set owner', async () => {
      const tokenId = await mintDomain(
        unsRegistry,
        coinbase.address,
        TLD.CRYPTO,
      );
      await unsRegistry.set('key_82', 'value_23', tokenId);
      expect(await unsRegistry.get('key_82', tokenId)).to.be.equal('value_23');

      await expect(unsRegistry.setOwner(receiver.address, tokenId))
        .to.emit(unsRegistry, 'Transfer')
        .withArgs(coinbase.address, receiver.address, tokenId);
      expect(await unsRegistry.get('key_82', tokenId)).to.be.equal('value_23');
    });

    describe('childIdOf', () => {
      it('should return valid childId', async () => {
        const tokenId = await unsRegistry.childIdOf(root, '12ew3');
        expect(tokenId).to.be.equal(namehash.hash('12ew3.crypto'));
      });

      it('should revert when childId lable is empty', async () => {
        await expect(unsRegistry.childIdOf(root, '')).to.be.revertedWith(
          'Registry: LABEL_EMPTY',
        );
      });
    });

    describe('exists', () => {
      it('should return true when token exists', async () => {
        const tokenId = await mintDomain(
          unsRegistry,
          coinbase.address,
          TLD.CRYPTO,
        );
        expect(await unsRegistry.exists(tokenId)).to.be.equal(true);
      });

      it('should return false when token exists', async () => {
        const tok = await unsRegistry.childIdOf(
          root,
          'token_doesnt_exists_1094u',
        );
        expect(await unsRegistry.exists(tok)).to.be.equal(false);
      });
    });

    describe('supportsInterface', () => {
      it('should support IERC165Upgradeable interface', async () => {
        expect(await unsRegistry.supportsInterface('0x01ffc9a7')).to.be.equal(
          true,
        );
      });

      it('should support IERC721Upgradeable interface', async () => {
        expect(await unsRegistry.supportsInterface('0x80ac58cd')).to.be.equal(
          true,
        );
      });

      it('should support IERC721MetadataUpgradeable interface', async () => {
        expect(await unsRegistry.supportsInterface('0x5b5e139f')).to.be.equal(
          true,
        );
      });

      it('should not support random interface', async () => {
        expect(await unsRegistry.supportsInterface('0x01010101')).to.be.equal(
          false,
        );
      });
    });

    it('should have right metadata', async () => {
      expect(await unsRegistry.name()).to.be.eql('Unstoppable Domains');
      expect(await unsRegistry.symbol()).to.be.eql('UD');
    });

    describe('burn', () => {
      let tokenId;

      beforeEach(async () => {
        tokenId = await mintDomain(
          unsRegistry,
          coinbase.address,
          TLD.CRYPTO,
        );
      });

      it('should burn the domain', async () => {
        expect(await unsRegistry.exists(tokenId)).to.be.true;

        await unsRegistry.burn(tokenId);

        expect(await unsRegistry.exists(tokenId)).to.be.false;
      });

      it('should revert if not owner', async () => {
        await expect(unsRegistry.connect(signers[1]).burn(tokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('should reset records on burn', async () => {
        const tokenId = await mintDomain(
          unsRegistry,
          coinbase.address,
          TLD.CRYPTO,
          'token-to-burn',
        );
        await unsRegistry.set('key_31', 'value_23', tokenId);
        expect(await unsRegistry.get('key_31', tokenId)).to.be.equal('value_23');

        await expect(unsRegistry.burn(tokenId))
          .to.emit(unsRegistry, 'ResetRecords')
          .withArgs(tokenId);
        expect(await unsRegistry.get('key_31', tokenId)).to.be.equal('');

        await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'token-to-burn');
        expect(await unsRegistry.get('key_31', tokenId)).to.be.equal('');
      });

      it('should revert if tokenId is deprecated', async () => {
        await unsRegistry.deprecateTokens([tokenId]);

        await expect(unsRegistry.burn(tokenId))
          .to.be.revertedWith('Registry: TOKEN_DEPRECATED');
      });
    });

    describe('deprecateTokens', async () => {
      it('should reset records and reverse resolution properly', async () => {
        const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO);
        const tokenId2 = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO);
        const tokenId3 = await mintDomain(unsRegistry, owner.address, TLD.CRYPTO);

        await unsRegistry.set('token1-key', 42, tokenId);
        await unsRegistry.setReverse(tokenId);

        await unsRegistry.setMany(['token2-key', 'token2-key2'], [42, 44], tokenId2);

        await unsRegistry.connect(owner).setMany(['token3-key', 'token3-key2'], [42, 44], tokenId3);
        await unsRegistry.connect(owner).setReverse(tokenId3);

        await unsRegistry.connect(coinbase).deprecateTokens([
          tokenId,
          tokenId2,
          tokenId3,
        ]);

        expect(await unsRegistry.get('token1-key', tokenId)).to.be.equal('');
        expect(await unsRegistry.reverseOf(coinbase.address)).to.be.equal(0);
        expect(await unsRegistry.getMany(['token2-key', 'token2-key2'], tokenId2)).to.be.deep.equal(['', '']);
        expect(await unsRegistry.getMany(['token3-key', 'token3-key2'], tokenId3)).to.be.deep.equal(['', '']);
        expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
      });

      it('should revert if one of the tokens does not exist', async () => {
        const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO);
        const tokenId2 = utils.id('burned-domain');

        await expect(
          unsRegistry.connect(coinbase).deprecateTokens([
            tokenId,
            tokenId2,
          ]),
        ).to.be.revertedWith('ERC721: invalid token ID');
      });

      it('should not allow deprecating tokens if not minting manager', async () => {
        const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO);

        await expect(
          unsRegistry.connect(signers[1]).deprecateTokens([tokenId]),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_MINTING_MANAGER');
      });
    });
  });

  describe('Registry (minting)', () => {
    describe('mint(address,uint256,string)', async () => {
      const selector = 'mint(address,uint256,string)';

      it('should mint domains', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_22');

        await unsRegistry.functions[selector](
          coinbase.address,
          tokenId,
          'label_22.crypto',
        );
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );

        // should fail to mint existing token
        await expect(
          unsRegistry.callStatic[selector](
            coinbase.address,
            tokenId,
            'label_22',
          ),
        ).to.be.revertedWith('ERC721: token already minted');
        await expect(
          unsRegistry.callStatic[selector](accounts[0], tokenId, 'label_22'),
        ).to.be.revertedWith('ERC721: token already minted');

        // should be able to mint burned domain
        await unsRegistry.burn(tokenId);
        await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'label_22');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });

      it('should produce NewURI event', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_23');

        await expect(
          unsRegistry.functions[selector](
            coinbase.address,
            tokenId,
            'label_23.crypto',
          ),
        )
          .to.emit(unsRegistry, 'NewURI')
          .withArgs(tokenId, 'label_23.crypto');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });
    });

    describe('safeMint(address,uint256,string)', async () => {
      const selector = 'safeMint(address,uint256,string)';

      it('should safely mint domains', async () => {
        const tokenId = await unsRegistry.childIdOf(root, 'label_93');
        await unsRegistry.functions[selector](
          coinbase.address,
          tokenId,
          'label_93',
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );

        // should fail to safely mint existing token contract
        await expect(
          unsRegistry.callStatic[selector](
            coinbase.address,
            tokenId,
            'label_93',
          ),
        ).to.be.revertedWith('ERC721: token already minted');

        await unsRegistry.burn(tokenId);

        // should fail to safely mint token to non reciever contract
        await expect(
          unsRegistry.callStatic[selector](
            cnsRegistry.address,
            tokenId,
            'label_93',
          ),
        ).to.be.revertedWith(
          'ERC721: transfer to non ERC721Receiver implementer',
        );

        const tokenReceiver = await ERC721ReceiverMock.deploy();
        await unsRegistry.functions[selector](
          tokenReceiver.address,
          tokenId,
          'label_93',
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          tokenReceiver.address,
        );
      });

      it('should produce NewURI event', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_94');

        await expect(
          unsRegistry.functions[selector](
            coinbase.address,
            tokenId,
            'label_94.crypto',
          ),
        )
          .to.emit(unsRegistry, 'NewURI')
          .withArgs(tokenId, 'label_94.crypto');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });
    });

    describe('safeMint(address,uint256,string,bytes)', async () => {
      const selector = 'safeMint(address,uint256,string,bytes)';

      it('should safely mint(data) domains', async () => {
        const tokenId = await unsRegistry.childIdOf(root, 'label_s23');
        await unsRegistry.functions[selector](
          coinbase.address,
          tokenId,
          'label_93',
          '0x',
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );

        // should fail to safely mint existing token contract
        await expect(
          unsRegistry.callStatic[selector](
            coinbase.address,
            tokenId,
            'label_s23',
            '0x',
          ),
        ).to.be.revertedWith('ERC721: token already minted');

        await unsRegistry.burn(tokenId);

        // should fail to safely mint token to non reciever contract
        await expect(
          unsRegistry.callStatic[selector](
            cnsRegistry.address,
            tokenId,
            'label_s23',
            '0x',
          ),
        ).to.be.revertedWith(
          'ERC721: transfer to non ERC721Receiver implementer',
        );

        const tokenReceiver = await ERC721ReceiverMock.deploy();
        await unsRegistry.functions[selector](
          tokenReceiver.address,
          tokenId,
          'label_s23',
          '0x',
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          tokenReceiver.address,
        );
      });

      it('should produce NewURI event', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_s24');

        await expect(
          unsRegistry.functions[selector](
            coinbase.address,
            tokenId,
            'label_s24.crypto',
            '0x',
          ),
        )
          .to.emit(unsRegistry, 'NewURI')
          .withArgs(tokenId, 'label_s24.crypto');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });
    });

    describe('mintWithRecords(address,uint256,string,string[],string[])', async () => {
      it('should mint domain with no records', async () => {
        const tokenId = await unsRegistry.childIdOf(root, 'label_12324');
        await unsRegistry.mintWithRecords(
          coinbase.address,
          tokenId,
          'label_12324',
          [],
          [],
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });

      it('should mint domain with record', async () => {
        const tokenId = await unsRegistry.childIdOf(root, 'label_38f6');
        await unsRegistry.mintWithRecords(
          coinbase.address,
          tokenId,
          'label_38f6',
          ['key_1'],
          ['value_1'],
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
        expect(await unsRegistry.get('key_1', tokenId)).to.be.eql('value_1');
      });

      it('should produce NewURI event', async () => {
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_38f7');

        await expect(
          unsRegistry.mintWithRecords(
            coinbase.address,
            tokenId,
            'label_38f7.crypto',
            ['key1'],
            [42],
          ),
        )
          .to.emit(unsRegistry, 'NewURI')
          .withArgs(tokenId, 'label_38f7.crypto');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });
    });

    describe('safeMintWithRecords(address,uint256,string,string[],string[])', async () => {
      const selector =
        'safeMintWithRecords(address,uint256,string,string[],string[])';

      it('should safely mint domain with no records', async () => {
        const tokenId = await unsRegistry.childIdOf(root, 'label_312er');
        await unsRegistry[selector](
          coinbase.address,
          tokenId,
          'label_312er',
          [],
          [],
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });

      it('should safely mint domain with record', async () => {
        const tokenId = await unsRegistry.childIdOf(root, 'label_dvf321');
        await unsRegistry[selector](
          coinbase.address,
          tokenId,
          'label_dvf321',
          ['key_1'],
          ['value_1'],
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
        expect(await unsRegistry.get('key_1', tokenId)).to.be.eql('value_1');
      });

      it('should produce NewURI event', async () => {
        const tokenId = await unsRegistry.childIdOf(root, 'label_dvf322');

        await expect(
          unsRegistry[selector](
            coinbase.address,
            tokenId,
            'label_dvf322.crypto',
            ['key_1'],
            ['value_1'],
          ),
        )
          .to.emit(unsRegistry, 'NewURI')
          .withArgs(tokenId, 'label_dvf322.crypto');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });
    });

    describe('safeMintWithRecords(address,uint256,string,string[],string[],bytes)', async () => {
      const selector =
        'safeMintWithRecords(address,uint256,string,string[],string[],bytes)';

      it('should safely mint(data) domain with no records', async () => {
        const tokenId = await unsRegistry.childIdOf(root, 'label_134qwf');
        await unsRegistry[selector](
          coinbase.address,
          tokenId,
          'label_134qwf',
          [],
          [],
          '0x',
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });

      it('should safely mint(data) domain with record', async () => {
        const tokenId = await unsRegistry.childIdOf(root, 'label_dsf311');
        await unsRegistry[selector](
          coinbase.address,
          tokenId,
          'label_dsf311',
          ['key_1'],
          ['value_1'],
          '0x',
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
        expect(await unsRegistry.get('key_1', tokenId)).to.be.eql('value_1');
      });

      it('should produce NewURI event', async () => {
        const tokenId = await unsRegistry.childIdOf(root, 'label_dvf333');

        await expect(
          unsRegistry[selector](
            coinbase.address,
            tokenId,
            'label_dvf333.crypto',
            ['key_1'],
            ['value_1'],
            '0x',
          ),
        )
          .to.emit(unsRegistry, 'NewURI')
          .withArgs(tokenId, 'label_dvf333.crypto');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });
    });
  });

  describe('Registry (ownership management)', () => {
    let tokenId;

    beforeEach(async () => {
      tokenId = await mintDomain(
        unsRegistry,
        coinbase.address,
        TLD.CRYPTO,
      );
    });

    describe('setOwner', () => {
      it('sets owner correctly', async () => {
        await unsRegistry.setOwner(owner.address, tokenId);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('can set owner to 0xdead correctly', async () => {
        await unsRegistry.setOwner(DEAD_ADDRESS, tokenId);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(DEAD_ADDRESS);
      });

      it('reverts transaction if tokenId is deprecated', async () => {
        await unsRegistry.deprecateTokens([tokenId]);

        await expect(unsRegistry.setOwner(owner.address, tokenId))
          .to.be.revertedWith('Registry: DEPRECATED_TOKEN_TRANSFER_ADDRESS_INVALID');
      });

      it('can set owner to 0xdead when tokenId is deprecated', async () => {
        await unsRegistry.deprecateTokens([tokenId]);

        await unsRegistry.setOwner(DEAD_ADDRESS, tokenId);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(DEAD_ADDRESS);
      });

      it('should not reset records on set owner', async () => {
        await unsRegistry.set('key_16', 'value_23', tokenId);
        expect(await unsRegistry.get('key_16', tokenId)).to.be.equal('value_23');

        await expect(unsRegistry.setOwner(owner.address, tokenId))
          .to.not.emit(unsRegistry, 'ResetRecords')
          .withArgs(tokenId);
        expect(await unsRegistry.get('key_16', tokenId)).to.be.equal('value_23');
      });
    });

    describe('transferFrom', () => {
      it('transfers domain correctly', async () => {
        await unsRegistry.transferFrom(coinbase.address, owner.address, tokenId);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('can transferFrom to 0xdead correctly', async () => {
        await unsRegistry.transferFrom(coinbase.address, DEAD_ADDRESS, tokenId);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(DEAD_ADDRESS);
      });

      it('reverts transaction if tokenId is deprecated', async () => {
        const tokenId = await mintDomain(
          unsRegistry,
          coinbase.address,
          TLD.CRYPTO,
        );

        await unsRegistry.deprecateTokens([tokenId]);

        await expect(unsRegistry.transferFrom(coinbase.address, owner.address, tokenId))
          .to.be.revertedWith('Registry: DEPRECATED_TOKEN_TRANSFER_ADDRESS_INVALID');
      });

      it('can transfer ownership to 0xdead when tokenId is deprecated', async () => {
        await unsRegistry.deprecateTokens([tokenId]);

        await unsRegistry.transferFrom(coinbase.address, DEAD_ADDRESS, tokenId);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(DEAD_ADDRESS);
      });

      it('should reset records on transfer', async () => {
        await unsRegistry.set('key_23', 'value_23', tokenId);
        expect(await unsRegistry.get('key_23', tokenId)).to.be.equal('value_23');

        await expect(
          unsRegistry.transferFrom(coinbase.address, accounts[0], tokenId),
        ).to.emit(unsRegistry, 'ResetRecords')
          .withArgs(tokenId);

        expect(await unsRegistry.get('key_23', tokenId)).to.be.equal('');
      });
    });

    describe('safeTransferFrom(address,address,uint256)', () => {
      it('transfers domain correctly', async () => {
        await unsRegistry['safeTransferFrom(address,address,uint256)'](
          coinbase.address, owner.address, tokenId,
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('can transferFrom to 0xdead correctly', async () => {
        await unsRegistry['safeTransferFrom(address,address,uint256)'](
          coinbase.address, DEAD_ADDRESS, tokenId,
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(DEAD_ADDRESS);
      });

      it('reverts transaction if tokenId is deprecated', async () => {
        await unsRegistry.deprecateTokens([tokenId]);
        const safeTransferFrom = unsRegistry['safeTransferFrom(address,address,uint256)'];

        await expect(safeTransferFrom(coinbase.address, owner.address, tokenId))
          .to.be.revertedWith('Registry: DEPRECATED_TOKEN_TRANSFER_ADDRESS_INVALID');
      });

      it('can transfer ownership to 0xdead when tokenId is deprecated', async () => {
        await unsRegistry.deprecateTokens([tokenId]);

        await unsRegistry['safeTransferFrom(address,address,uint256)'](
          coinbase.address, DEAD_ADDRESS, tokenId,
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(DEAD_ADDRESS);
      });

      it('should reset records on safe transfer', async () => {
        await unsRegistry.set('key_12', 'value_23', tokenId);
        expect(await unsRegistry.get('key_12', tokenId)).to.be.equal('value_23');

        await expect(
          unsRegistry['safeTransferFrom(address,address,uint256)'](
            coinbase.address,
            accounts[0],
            tokenId,
          ),
        ).to.emit(unsRegistry, 'ResetRecords')
          .withArgs(tokenId);

        expect(await unsRegistry.get('key_12', tokenId)).to.be.equal('');
      });
    });

    describe('safeTransferFrom(address,address,uint256,bytes)', () => {
      it('transfers domain correctly', async () => {
        await unsRegistry['safeTransferFrom(address,address,uint256,bytes)'](
          coinbase.address, owner.address, tokenId, '0x',
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('can transferFrom to 0xdead correctly', async () => {
        await unsRegistry['safeTransferFrom(address,address,uint256,bytes)'](
          coinbase.address, DEAD_ADDRESS, tokenId, '0x',
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(DEAD_ADDRESS);
      });

      it('reverts transaction if tokenId is deprecated', async () => {
        await unsRegistry.deprecateTokens([tokenId]);
        const safeTransferFrom = unsRegistry['safeTransferFrom(address,address,uint256,bytes)'];

        await expect(safeTransferFrom(coinbase.address, owner.address, tokenId, '0x'))
          .to.be.revertedWith('Registry: DEPRECATED_TOKEN_TRANSFER_ADDRESS_INVALID');
      });

      it('can transfer ownership to 0xdead when tokenId is deprecated', async () => {
        await unsRegistry.deprecateTokens([tokenId]);

        await unsRegistry['safeTransferFrom(address,address,uint256,bytes)'](
          coinbase.address, DEAD_ADDRESS, tokenId, '0x',
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(DEAD_ADDRESS);
      });

      it('should reset records on safe transfer with data', async () => {
        await unsRegistry.set('key_12', 'value_23', tokenId);
        expect(await unsRegistry.get('key_12', tokenId)).to.be.equal('value_23');

        await expect(
          unsRegistry['safeTransferFrom(address,address,uint256,bytes)'](
            coinbase.address,
            accounts[0],
            tokenId,
            '0x',
          ),
        )
          .to.emit(unsRegistry, 'ResetRecords')
          .withArgs(tokenId);
        expect(await unsRegistry.get('key_12', tokenId)).to.be.equal('');
      });
    });
  });

  describe('Registry (records management)', () => {
    const initializeKey = async (key) => {
      await unsRegistry.addKey(key);
      return BigNumber.from(utils.id(key));
    };

    let tokenId;

    beforeEach(async () => {
      tokenId = await mintDomain(
        unsRegistry,
        coinbase.address,
        TLD.CRYPTO,
      );
    });

    describe('set & get', () => {
      it('should be able to set and resolve record', async () => {
        await unsRegistry.set('key', 'value', tokenId);

        expect(await unsRegistry.get('key', tokenId)).to.be.equal('value');
      });

      it('should fail if not owner', async () => {
        await expect(unsRegistry.connect(signers[1]).set('key', 'value', tokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('should fail if token is not minted', async () => {
        const tokenId = await unsRegistry.childIdOf(root, 'some_invalid_label');

        await expect(unsRegistry.set('key', 'value', tokenId)).to.be.revertedWith(
          'ERC721: invalid token ID',
        );
      });

      it('should emit NewKey event new keys added', async () => {
        const key = 'new-key';
        const value = 'value';

        await expect(unsRegistry.set(key, value, tokenId))
          .to.emit(unsRegistry, 'NewKey')
          .withArgs(tokenId, utils.id(key), key);

        await expect(unsRegistry.set(key, value, tokenId)).not.to.emit(
          unsRegistry,
          'NewKey',
        );
      });

      it('should emit correct Set event', async () => {
        const key = 'new-key';
        const value = 'value';

        await expect(unsRegistry.set(key, value, tokenId))
          .to.emit(unsRegistry, 'Set')
          .withArgs(tokenId, utils.id(key), utils.id(value), key, value);
      });

      it('should revert transaction if on set tokenId is deprecated', async () => {
        await unsRegistry.deprecateTokens([tokenId]);

        await expect(unsRegistry.set('key', 'value', tokenId))
          .to.be.revertedWith('Registry: TOKEN_DEPRECATED');

        expect(await unsRegistry.get('key', tokenId))
          .to.be.equal('');
      });
    });

    describe('setMany & getMany', () => {
      it('should be able to set records multiple times and resolve them', async () => {
        await unsRegistry.setMany(['key1'], ['value1'], tokenId);
        await unsRegistry.setMany(
          ['key2', 'key3'],
          ['value2', 'value3'],
          tokenId,
        );
        await unsRegistry.setMany(
          ['key4', 'key5', 'key6'],
          ['value4', 'value5', 'value6'],
          tokenId,
        );
        expect(
          await unsRegistry.getMany(
            ['key1', 'key2', 'key3', 'key4', 'key5', 'key6'],
            tokenId,
          ),
        ).to.be.eql(['value1', 'value2', 'value3', 'value4', 'value5', 'value6']);
      });

      it('should fail on setMany if not owner', async () => {
        await expect(unsRegistry.connect(signers[1]).setMany(['key'], ['value'], tokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );

        expect(
          await unsRegistry.connect(signers[1]).getMany(
            ['key'],
            tokenId,
          ),
        ).to.be.deep.equal(['']);
      });

      it('should revert transaction on set if tokenId is deprecated', async () => {
        await unsRegistry.deprecateTokens([tokenId]);

        await expect(unsRegistry.setMany(['key'], ['value'], tokenId))
          .to.be.revertedWith('Registry: TOKEN_DEPRECATED');

        expect(await unsRegistry.getMany(['key'], tokenId))
          .to.be.deep.equal(['']);
      });
    });

    describe('reset', () => {
      it('should reset all records', async () => {
        await unsRegistry.setMany(
          ['key1', 'key2'],
          ['value1', 'value2'],
          tokenId,
        );

        await expect(unsRegistry.reset(tokenId))
          .to.emit(unsRegistry, 'ResetRecords')
          .withArgs(tokenId.toString());

        expect(
          await unsRegistry.getMany(
            ['key1', 'key2'],
            tokenId,
          ),
        ).to.be.deep.eql(['', '']);
      });

      it('should fail if not owner', async () => {
        await unsRegistry.setMany(
          ['key1', 'key2'],
          ['value1', 'value2'],
          tokenId,
        );

        await expect(unsRegistry.connect(signers[1]).reset(tokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );

        expect(
          await unsRegistry.getMany(
            ['key1', 'key2'],
            tokenId,
          ),
        ).to.be.deep.eql(['value1', 'value2']);
      });
    });

    describe('geyKey & getKeys', () => {
      it('should get key by hash', async () => {
        const expectedKey = 'new-hashed-key';
        await unsRegistry.set(expectedKey, 'value', tokenId);

        const keyFromHash = await unsRegistry.getKey(
          BigNumber.from(utils.id(expectedKey)),
        );
        expect(keyFromHash).to.be.equal(expectedKey);
      });

      it('should get many keys by hashes', async () => {
        const expectedKeys = ['keyhash-many-1', 'keyhash-many-2'];
        await unsRegistry.setMany(expectedKeys, ['value', 'value'], tokenId);

        const expectedKeyHashes = expectedKeys.map((key) =>
          BigNumber.from(utils.id(key)),
        );
        const keysFromHashes = await unsRegistry.getKeys(expectedKeyHashes);
        expect(keysFromHashes).to.be.eql(expectedKeys);
      });
    });

    describe('reconfigure', () => {
      it('should reconfigure resolver with new values', async () => {
        await unsRegistry.set('old-key', 'old-value', tokenId);
        await unsRegistry.reconfigure(['new-key'], ['new-value'], tokenId);

        expect(await unsRegistry.get('old-key', tokenId)).to.be.equal('');
        expect(await unsRegistry.get('new-key', tokenId)).to.be.eql('new-value');
      });

      it('should fail when trying to reconfigure non-owned domain', async () => {
        await expect(
          unsRegistry
            .connect(signers[1])
            .reconfigure(['new-key'], ['new-value'], tokenId),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('should revert transaction if tokenId is deprecated', async () => {
        await unsRegistry.deprecateTokens([tokenId]);

        await expect(unsRegistry.reconfigure(['new-key'], ['new-value'], tokenId))
          .to.be.revertedWith('Registry: TOKEN_DEPRECATED');
      });
    });

    describe('record operations by hashes', async () => {
      it('should get value by key hash', async () => {
        const key = 'get-key-by-hash-key';
        const expectedValue = 'get-key-by-hash-value';
        await unsRegistry.set(key, expectedValue, tokenId);

        const result = await unsRegistry.getByHash(utils.id(key), tokenId);
        expect(result.value).to.be.equal(expectedValue);
        expect(result.key).to.be.equal(key);
      });

      it('should get multiple values by hashes', async () => {
        const keys = ['key-to-hash-1', 'key-to-hash-2'];
        const expectedValues = ['value-42', 'value-43'];
        await unsRegistry.setMany(keys, expectedValues, tokenId);

        const hashedKeys = keys.map((key) => BigNumber.from(utils.id(key)));
        const result = await unsRegistry.getManyByHash(hashedKeys, tokenId);
        expect(result).to.be.eql([keys, expectedValues]);
      });

      it('should set record by hash', async () => {
        const expectedKey = 'key_23c';
        const keyHash = await initializeKey(expectedKey);

        await unsRegistry.setByHash(keyHash, 'value', tokenId);

        const [key, value] = await unsRegistry.getByHash(keyHash, tokenId);
        expect([key, value]).to.be.eql([expectedKey, 'value']);
      });

      it('should revert setting record by hash when key is not registered', async () => {
        const expectedKey = 'key_23f3c';
        const keyHash = BigNumber.from(utils.id(expectedKey));

        await expect(
          unsRegistry.setByHash(keyHash, 'value', tokenId),
        ).to.be.revertedWith('RecordStorage: KEY_NOT_FOUND');
      });

      it('should revert setting record by hash if tokenId is deprecated', async () => {
        const key = 'key_23c';
        const keyHash = await initializeKey(key);

        await unsRegistry.deprecateTokens([tokenId]);

        await expect(unsRegistry.setByHash(keyHash, 'value', tokenId))
          .to.be.revertedWith('Registry: TOKEN_DEPRECATED');

        expect(await unsRegistry.get(key, tokenId)).to.be.equal('');
      });

      it('should set records(1) by hash', async () => {
        const expectedKey = 'key_2w12c';
        const keyHash = await initializeKey(expectedKey);

        await unsRegistry.setManyByHash([keyHash], ['value'], tokenId);

        expect(await unsRegistry.getByHash(keyHash, tokenId)).to.be.eql([
          expectedKey,
          'value',
        ]);
      });

      it('should revert setting multiple records by hash if tokenId is deprecated', async () => {
        const key = 'key_26c';
        const keyHash = await initializeKey(key);

        await unsRegistry.deprecateTokens([tokenId]);

        await expect(unsRegistry.setManyByHash([keyHash], ['value'], tokenId))
          .to.be.revertedWith('Registry: TOKEN_DEPRECATED');

        expect(await unsRegistry.get(key, tokenId)).to.be.eql('');
      });

      it('should set records(2) by hash', async () => {
        const key1 = 'key_3m3c';
        const key2 = 'key_9v3f';
        const key1Hash = await initializeKey(key1);
        const key2Hash = await initializeKey(key2);

        await unsRegistry.setManyByHash(
          [key1Hash, key2Hash],
          ['value1', 'value2'],
          tokenId,
        );

        expect(
          await unsRegistry.getManyByHash([key1Hash, key2Hash], tokenId),
        ).to.be.eql([
          [key1, key2],
          ['value1', 'value2'],
        ]);
      });

      it('should revert setting records by hash when at least one key is not registered', async () => {
        const key1 = 'key_2d83c';
        const key2 = 'key_4o83f';
        const key1Hash = await initializeKey(key1);
        const key2Hash = BigNumber.from(utils.id(key2));

        await expect(
          unsRegistry.setManyByHash(
            [key1Hash, key2Hash],
            ['value1', 'value2'],
            tokenId,
          ),
        ).to.be.revertedWith('RecordStorage: KEY_NOT_FOUND');
      });

      it('should not consume additional gas if key hash was set before', async () => {
        let newKeyHashTx = await unsRegistry.set('keyhash-gas', 'value', tokenId);
        newKeyHashTx.receipt = await newKeyHashTx.wait();
        let exitsKeyHashTx = await unsRegistry.set(
          'keyhash-gas',
          'value',
          tokenId,
        );
        exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
        expect(newKeyHashTx.receipt.gasUsed).to.be.above(
          exitsKeyHashTx.receipt.gasUsed,
        );

        newKeyHashTx = await unsRegistry.setMany(
          ['keyhash-gas-1', 'keyhash-gas-2'],
          ['value-1', 'value-2'],
          tokenId,
        );
        newKeyHashTx.receipt = await newKeyHashTx.wait();
        exitsKeyHashTx = await unsRegistry.setMany(
          ['keyhash-gas-1', 'keyhash-gas-2'],
          ['value-1', 'value-2'],
          tokenId,
        );
        exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
        expect(newKeyHashTx.receipt.gasUsed).to.be.above(
          exitsKeyHashTx.receipt.gasUsed,
        );

        newKeyHashTx = await unsRegistry.setMany(
          ['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'],
          ['value-1', 'value-2', 'value-3'],
          tokenId,
        );
        newKeyHashTx.receipt = await newKeyHashTx.wait();
        exitsKeyHashTx = await unsRegistry.setMany(
          ['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'],
          ['value-1', 'value-2', 'value-3'],
          tokenId,
        );
        exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
        expect(newKeyHashTx.receipt.gasUsed).to.be.above(
          exitsKeyHashTx.receipt.gasUsed,
        );
      });
    });
  });
});
