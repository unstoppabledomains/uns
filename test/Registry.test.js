const namehash = require('eth-ens-namehash');
const { ZERO_ADDRESS } = require('./helpers/constants');

const { utils, BigNumber } = ethers;

describe('Registry', () => {
  let Registry, ERC721ReceiverMock;
  let registry, root;
  let signers, coinbase, accounts;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner, nonOwner, receiver, accessControl, operator] = signers;
    [, ...accounts] = signers.map(s => s.address);

    Registry = await ethers.getContractFactory('contracts/Registry.sol:Registry');
    ERC721ReceiverMock = await ethers.getContractFactory('ERC721ReceiverMock');

    root = BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');

    registry = await Registry.deploy();
    await registry.initialize(coinbase.address);
    await registry.mint('0xdead000000000000000000000000000000000000', root, 'crypto');
    await registry.setTokenURIPrefix('/');
  })

  describe('General', () => {
    it('should return zero root', async () => {
      assert.equal(await registry.root(), 0);
    })

    it('should resolve properly', async () => {
      const tok = await registry.childIdOf(root, 'resolution');

      await registry.mint(coinbase.address, tok, 'resolution');
      assert.equal(await registry.resolverOf(tok), registry.address);

      await registry.burn(tok);
      assert.equal(await registry.resolverOf(tok), ZERO_ADDRESS);

      await registry.mint(coinbase.address, tok, 'resolution');
      assert.equal(await registry.resolverOf(tok), registry.address);
    })

    it('should set URI prefix', async () => {
      assert.equal(await registry.tokenURI(root), `/${root}`);

      await registry.setTokenURIPrefix('prefix-');
      assert.equal(await registry.tokenURI(root), `prefix-${root}`);

      await registry.setTokenURIPrefix('/');
      assert.equal(await registry.tokenURI(root), `/${root}`);
    })

    it('should emit Transfer event on set owner', async () => {
      const tok = await registry.childIdOf(root, 'tok_aq_sj');
      await registry.mint(coinbase.address, tok, 'tok_aq_sj');
      await registry.set('key_82', 'value_23', tok);
      assert.equal(await registry.get('key_82', tok), 'value_23');

      await expect(registry.setOwner(receiver.address, tok))
        .to.emit(registry, 'Transfer').withArgs(coinbase.address, receiver.address, tok);
      assert.equal(await registry.get('key_82', tok), 'value_23');
    })

    describe('childIdOf', () => {
      it('should return valid childId', async () => {
        const tokenId = await registry.childIdOf(root, '12ew3');
        assert.equal(tokenId.toHexString(), namehash.hash('12ew3.crypto'));
      })
  
      it('should revert when childId lable is empty', async () => {
        await expect(registry.childIdOf(root, '')).to.be
          .revertedWith('Registry: LABEL_EMPTY');
      })
    })

    describe('exists', () => {
      it('should return true when token exists', async () => {
        const tok = await registry.childIdOf(root, 'token_exists_11ew3');
        await registry.mint(coinbase.address, tok, 'token_exists_11ew3');
        assert.equal(await registry.exists(tok), true);
      })
  
      it('should return false when token exists', async () => {
        const tok = await registry.childIdOf(root, 'token_doesnt_exists_1094u');
        assert.equal(await registry.exists(tok), false);
      })
    })

    describe('supportsInterface', () => {
      it('should support IERC165Upgradeable interface', async () => {
        assert.equal(await registry.supportsInterface('0x01ffc9a7'), true);
      })

      it('should support IERC721Upgradeable interface', async () => {
        assert.equal(await registry.supportsInterface('0x80ac58cd'), true);
      })

      it('should support IERC721MetadataUpgradeable interface', async () => {
        assert.equal(await registry.supportsInterface('0x5b5e139f'), true);
      })

      it('should not support random interface', async () => {
        assert.equal(await registry.supportsInterface('0x01010101'), false);
      })
    })
  });

  describe('Registry (minting)', () => {
    it('should mint domains', async () => {
      const tok = await registry.childIdOf(root, 'label_22');
      await registry.mint(coinbase.address, tok, 'label_22');
  
      assert.equal(coinbase.address, await registry.ownerOf(tok));
  
      // should fail to mint existing token
      await expect(
        registry.callStatic.mint(coinbase.address, tok, 'label_22')
      ).to.be.revertedWith('ERC721: token already minted');
      await expect(
        registry.callStatic.mint(accounts[0], tok, 'label_22')
      ).to.be.revertedWith('ERC721: token already minted');
  
      await registry.burn(tok);
      await registry.mint(coinbase.address, tok, 'label_22');
  
      assert.equal(coinbase.address, await registry.ownerOf(tok));
    })

    it('should safely mint domains', async () => {
      const tok = await registry.childIdOf(root, 'label_93');
      await registry.functions['safeMint(address,uint256,string)'](coinbase.address, tok, 'label_93');
  
      assert.equal(coinbase.address, await registry.ownerOf(tok));
  
      // should fail to safely mint existing token contract
      await expect(
        registry.callStatic['safeMint(address,uint256,string)'](coinbase.address, tok, 'label_93')
      ).to.be.revertedWith('ERC721: token already minted');
  
      await registry.burn(tok)
  
      // should fail to safely mint token to non reciever contract
      await expect(
        registry.callStatic['safeMint(address,uint256,string)'](registry.address, tok, 'label_93')
      ).to.be.revertedWith('ERC721: transfer to non ERC721Receiver implementer');
  
      const tokenReceiver = await ERC721ReceiverMock.deploy();
      await registry.functions['safeMint(address,uint256,string)'](tokenReceiver.address, tok, 'label_93');
  
      assert.equal(tokenReceiver.address, await registry.ownerOf(tok));
    })

    it('should safely mint(data) domains', async () => {
      const tok = await registry.childIdOf(root, 'label_s23');
      await registry.functions['safeMint(address,uint256,string,bytes)'](coinbase.address, tok, 'label_93', '0x');

      assert.equal(coinbase.address, await registry.ownerOf(tok));

      // should fail to safely mint existing token contract
      await expect(
        registry.callStatic['safeMint(address,uint256,string)'](coinbase.address, tok, 'label_s23')
      ).to.be.revertedWith('ERC721: token already minted');

      await registry.burn(tok)

      // should fail to safely mint token to non reciever contract
      await expect(
        registry.callStatic['safeMint(address,uint256,string)'](registry.address, tok, 'label_s23')
      ).to.be.revertedWith('ERC721: transfer to non ERC721Receiver implementer');

      const tokenReceiver = await ERC721ReceiverMock.deploy();
      await registry.functions['safeMint(address,uint256,string)'](tokenReceiver.address, tok, 'label_s23');

      assert.equal(tokenReceiver.address, await registry.ownerOf(tok));
    })

    it('should mint domain with no records', async () => {
      const tok = await registry.childIdOf(root, 'label_12324');
      await registry.mintWithRecords(coinbase.address, tok, 'label_12324', [], []);

      assert.equal(coinbase.address, await registry.ownerOf(tok));
    })

    it('should mint domain with record', async () => {
      const tok = await registry.childIdOf(root, 'label_38f6');
      await registry.mintWithRecords(coinbase.address, tok, 'label_38f6', ['key_1'], ['value_1']);

      assert.equal(coinbase.address, await registry.ownerOf(tok));
      expect(await registry.get('key_1', tok)).to.be.eql('value_1');
    })

    it('should safely mint domain with no records', async () => {
      const tok = await registry.childIdOf(root, 'label_312er');
      await registry['safeMintWithRecords(address,uint256,string,string[],string[])']
        (coinbase.address, tok, 'label_312er', [], []);

      assert.equal(coinbase.address, await registry.ownerOf(tok));
    })

    it('should safely mint domain with record', async () => {
      const tok = await registry.childIdOf(root, 'label_dvf321');
      await registry['safeMintWithRecords(address,uint256,string,string[],string[])']
        (coinbase.address, tok, 'label_dvf321', ['key_1'], ['value_1']);

      assert.equal(coinbase.address, await registry.ownerOf(tok));
      expect(await registry.get('key_1', tok)).to.be.eql('value_1');
    })

    it('should safely mint(data) domain with no records', async () => {
      const tok = await registry.childIdOf(root, 'label_134qwf');
      await registry['safeMintWithRecords(address,uint256,string,string[],string[],bytes)']
        (coinbase.address, tok, 'label_134qwf', [], [], '0x');
  
      assert.equal(coinbase.address, await registry.ownerOf(tok));
    })

    it('should safely mint(data) domain with record', async () => {
      const tok = await registry.childIdOf(root, 'label_dsf311');
      await registry['safeMintWithRecords(address,uint256,string,string[],string[],bytes)']
        (coinbase.address, tok, 'label_dsf311', ['key_1'], ['value_1'], '0x');

      assert.equal(coinbase.address, await registry.ownerOf(tok));
      expect(await registry.get('key_1', tok)).to.be.eql('value_1');
    })
  });

  describe('Registry (records management)', () => {
    const initializeDomain = async (name) => {
      const tok = await registry.childIdOf(root, name);
      await registry.mint(coinbase.address, tok, name);
      return tok;
    }

    const initializeKey = async (key) => {
      const keyHash = BigNumber.from(utils.id(key));
      await registry.addKey(key);
      return keyHash;
    }

    it('should resolve tokens', async () => {
      const tok = await registry.childIdOf(root, 'label_931')

      // should fail to set name if not owner
      await expect(
        registry.set('key', 'value', tok)
      ).to.be.revertedWith('ERC721: operator query for nonexistent token');

      await registry.mint(coinbase.address, tok, 'label_931')
      await registry.set('key', 'value', tok)

      assert.equal(
        await registry.get('key', tok),
        'value',
        'should resolve to resolver',
      )

      // should setMany
      await registry.setMany(['key1'], ['value1'], tok)
      await registry.setMany(['key2', 'key3'], ['value2', 'value3'], tok)
      await registry.setMany(['key4', 'key5', 'key6'], ['value4', 'value5', 'value6'], tok)
      assert.deepEqual(
        await registry.getMany(['key1', 'key2', 'key3', 'key4', 'key5', 'key6'], tok),
        ['value1', 'value2', 'value3', 'value4', 'value5', 'value6']
      );

      // should reset
      await expect(registry.reset(tok))
        .to.emit(registry, 'ResetRecords')
        .withArgs(tok.toString());
  
      // should fail to set name if not owned
      await expect(
        registry.connect(signers[1]).set('key', 'value', tok)
      ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    })

    it('should get key by hash', async () => {
      const tok = await initializeDomain('heyhash')
      const expectedKey = 'new-hashed-key'
      await registry.set(expectedKey, 'value', tok)
      const keyFromHash = await registry.getKey(BigNumber.from(utils.id(expectedKey)))
  
      assert.equal(keyFromHash, expectedKey)
    })

    it('should get many keys by hashes', async () => {
      const tok = await initializeDomain('heyhash-many')
      const expectedKeys = ['keyhash-many-1', 'keyhash-many-2']
      await registry.setMany(expectedKeys, ['value', 'value'], tok)
      const expectedKeyHashes = expectedKeys.map(key => BigNumber.from(utils.id(key)));
      const keysFromHashes = await registry.getKeys(expectedKeyHashes)

      assert.deepEqual(keysFromHashes, expectedKeys)
    })

    it('should not consume additional gas if key hash was set before', async () => {
      const tok = await initializeDomain('heyhash-gas')
      let newKeyHashTx = await registry.set('keyhash-gas', 'value', tok)
      newKeyHashTx.receipt = await newKeyHashTx.wait();
      let exitsKeyHashTx = await registry.set('keyhash-gas', 'value', tok)
      exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
      assert.isAbove(newKeyHashTx.receipt.gasUsed, exitsKeyHashTx.receipt.gasUsed)

      newKeyHashTx = await registry.setMany(['keyhash-gas-1', 'keyhash-gas-2'], ['value-1', 'value-2'], tok)
      newKeyHashTx.receipt = await newKeyHashTx.wait();
      exitsKeyHashTx = await registry.setMany(['keyhash-gas-1', 'keyhash-gas-2'], ['value-1', 'value-2'], tok)
      exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
      assert.isAbove(newKeyHashTx.receipt.gasUsed, exitsKeyHashTx.receipt.gasUsed)

      newKeyHashTx = await registry.setMany(['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'], ['value-1', 'value-2', 'value-3'], tok)
      newKeyHashTx.receipt = await newKeyHashTx.wait();
      exitsKeyHashTx = await registry.setMany(['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'], ['value-1', 'value-2', 'value-3'], tok)
      exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
      assert.isAbove(newKeyHashTx.receipt.gasUsed, exitsKeyHashTx.receipt.gasUsed)
    })

    it('should get value by key hash', async () => {
      const tok = await initializeDomain('get-key-by-hash')
      const key = 'get-key-by-hash-key'
      const expectedValue = 'get-key-by-hash-value'
      await registry.set(key, expectedValue, tok)
      const result = await registry.getByHash(utils.id(key), tok)

      assert.equal(result.value, expectedValue)
      assert.equal(result.key, key)
    })

    it('should get multiple values by hashes', async () => {
      const tok = await initializeDomain('get-many-keys-by-hash')
      const keys = ['key-to-hash-1', 'key-to-hash-2']
      const expectedValues = ['value-42', 'value-43']
      await registry.setMany(keys, expectedValues, tok)
      const hashedKeys = keys.map(key => BigNumber.from(utils.id(key)));
      const result = await registry.getManyByHash(hashedKeys, tok)

      assert.deepEqual(result, [keys, expectedValues])
    })

    it('should emit NewKey event new keys added', async () => {
      const tok = await initializeDomain('new-key')
      const key = 'new-key'
      const value = 'value';

      await expect(registry.set(key, value, tok))
        .to.emit(registry, 'NewKey')
        .withArgs(tok, utils.id(key), key);

      await expect(registry.set(key, value, tok))
        .not.to.emit(registry, 'NewKey')
    })

    it('should emit correct Set event', async () => {
      const tok = await initializeDomain('check-set-event')
      const key = 'new-key'
      const value = 'value';

      await expect(registry.set(key, value, tok))
        .to.emit(registry, 'Set')
        .withArgs(
          tok,
          utils.id(key),
          utils.id(value),
          key,
          value,
        );
    })

    it('should reconfigure resolver with new values', async () => {
      const tok = await initializeDomain('reconfigure')
      await registry.set('old-key', 'old-value', tok)
      await registry.reconfigure(['new-key'], ['new-value'], tok)
  
      assert.equal(await registry.get('old-key', tok), '')
      assert.equal(await registry.get('new-key', tok), 'new-value')

      // should fail when trying to reconfigure non-owned domain
      await expect(
        registry.connect(signers[1]).reconfigure(['new-key'], ['new-value'], tok)
      ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    })

    it('should set record by hash', async () => {
      const tok = await initializeDomain('sk_2q1');
      const expectedKey = 'key_23c';
      const keyHash = await initializeKey(expectedKey);

      await registry.setByHash(keyHash, 'value', tok);

      const [key, value] = await registry.getByHash(keyHash, tok);
      assert.deepEqual([key, value], [expectedKey, 'value']);
    })

    it('should revert setting record by hash when key is not registered', async () => {
      const tok = await initializeDomain('sk_2p3');
      const expectedKey = 'key_23f3c';
      const keyHash = BigNumber.from(utils.id(expectedKey));

      await expect(
        registry.setByHash(keyHash, 'value', tok)
      ).to.be.revertedWith('RecordStorage: KEY_NOT_FOUND');
    })

    it('should set records(1) by hash', async () => {
      const tok = await initializeDomain('sk_q93');
      const expectedKey = 'key_2w12c';
      const keyHash = await initializeKey(expectedKey);

      await registry.setManyByHash([keyHash], ['value'], tok);

      assert.deepEqual(await registry.getByHash(keyHash, tok), [expectedKey, 'value']);
    })

    it('should set records(2) by hash', async () => {
      const tok = await initializeDomain('sk_8s6b1');
      const key1 = 'key_3m3c';
      const key2 = 'key_9v3f';
      const key1Hash = await initializeKey(key1);
      const key2Hash = await initializeKey(key2);

      await registry.setManyByHash([key1Hash, key2Hash], ['value1', 'value2'], tok);

      assert.deepEqual(
        await registry.getManyByHash([key1Hash, key2Hash], tok),
        [[key1, key2],['value1', 'value2']]
      );
    })

    it('should revert setting records by hash when at least one key is not registered', async () => {
      const tok = await initializeDomain('sk_30q13');
      const key1 = 'key_2d83c';
      const key2 = 'key_4o83f';
      const key1Hash = await initializeKey(key1);
      const key2Hash = BigNumber.from(utils.id(key2));

      await expect(
        registry.setManyByHash([key1Hash, key2Hash], ['value1', 'value2'], tok)
      ).to.be.revertedWith('RecordStorage: KEY_NOT_FOUND');
    })

    it('should reset records on transfer', async () => {
      const tok = await registry.childIdOf(root, 'tok_aa_23');
      await registry.mint(coinbase.address, tok, 'tok_aa_23');
      await registry.set('key_23', 'value_23', tok);
      assert.equal(await registry.get('key_23', tok), 'value_23');

      await expect(registry.transferFrom(coinbase.address, accounts[0], tok))
        .to.emit(registry, 'ResetRecords').withArgs(tok);
      assert.equal(await registry.get('key_23', tok), '');
    })

    it('should reset records on safe transfer', async () => {
      const tok = await registry.childIdOf(root, 'tok_aw_23');
      await registry.mint(coinbase.address, tok, 'tok_aw_23');
      await registry.set('key_13', 'value_23', tok);
      assert.equal(await registry.get('key_13', tok), 'value_23');

      await expect(registry['safeTransferFrom(address,address,uint256)'](coinbase.address, accounts[0], tok))
        .to.emit(registry, 'ResetRecords').withArgs(tok);
      assert.equal(await registry.get('key_13', tok), '');
    })

    it('should reset records on safe transfer with data', async () => {
      const tok = await registry.childIdOf(root, 'tok_ae_23');
      await registry.mint(coinbase.address, tok, 'tok_ae_23');
      await registry.set('key_12', 'value_23', tok);
      assert.equal(await registry.get('key_12', tok), 'value_23');

      await expect(registry['safeTransferFrom(address,address,uint256,bytes)'](coinbase.address, accounts[0], tok, '0x'))
        .to.emit(registry, 'ResetRecords').withArgs(tok);
      assert.equal(await registry.get('key_12', tok), '');
    })

    it('should reset records on burn', async () => {
      const tok = await registry.childIdOf(root, 'tok_hj_23');
      await registry.mint(coinbase.address, tok, 'tok_hj_23');
      await registry.set('key_31', 'value_23', tok);
      assert.equal(await registry.get('key_31', tok), 'value_23');

      await expect(registry.burn(tok))
        .to.emit(registry, 'ResetRecords').withArgs(tok);
      assert.equal(await registry.get('key_31', tok), '');

      await registry.mint(coinbase.address, tok, 'tok_hj_23');
      assert.equal(await registry.get('key_31', tok), '');
    })

    it('should not reset records on set owner', async () => {
      const tok = await registry.childIdOf(root, 'tok_aq_23');
      await registry.mint(coinbase.address, tok, 'tok_aq_23');
      await registry.set('key_16', 'value_23', tok);
      assert.equal(await registry.get('key_16', tok), 'value_23');

      await expect(registry.setOwner(owner.address, tok))
        .to.not.emit(registry, 'ResetRecords').withArgs(tok);
      assert.equal(await registry.get('key_16', tok), 'value_23');
    })
  });
})
