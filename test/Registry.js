const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
const { utils } = require('web3');

const Registry = artifacts.require('Registry.sol')
const MintingController = artifacts.require('controller/MintingController.sol')

contract('Registry', function([coinbase, ...accounts]) {
  let mintingController, registry

  before(async () => {
    registry = await Registry.new();
    mintingController = await MintingController.new(registry.address);
    await registry.addController(mintingController.address);
  })

  describe('Registry', () => {
    it('should construct itself correctly', async () => {
      const root = await registry.root()

      assert.equal(
        root.toString(16),
        'f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f',
        'good root',
      )
    })

    it('should resolve properly', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'resolution')

      await mintingController.mintSLD(coinbase, 'resolution')

      await registry.burn(tok)

      await mintingController.mintSLD(coinbase, 'resolution')

      await registry.transferFrom(coinbase, accounts[0], tok)
    })

    it('should mint children', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'otherlabel')

      await mintingController.mintSLD(coinbase, 'otherlabel')

      await registry.mintChild(coinbase, tok, '3ld')

      const threeld = await registry.childIdOf(tok, '3ld')

      assert.equal(
        coinbase,
        await registry.ownerOf(threeld),
        'should mint token correctly',
      )

      await registry.mintChild(coinbase, threeld, '4ld')

      const fourld = await registry.childIdOf(threeld, '4ld')

      assert.equal(
        coinbase,
        await registry.ownerOf(fourld),
        'should mint token correctly',
      )

      await registry.burn(fourld)

      await registry.mintChild(coinbase, threeld, '4ld')

      assert.equal(
        coinbase,
        await registry.ownerOf(fourld),
        'should mint token correctly',
      )

      // should fail to mint existing token
      await expectRevert(
        registry.mintChild(coinbase, tok, '3ld'),
        'ERC721: token already minted',
      );

      // should fail to mint existing without permission
      await expectRevert.unspecified(
        registry.mintChild(coinbase, tok, '3ld', {from: accounts[0]}),
      );
    })

    it('should transfer children', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'transfer')

      // should fail to transfer non-existing token
      await expectRevert(
        registry.transferFromChild(coinbase, accounts[0], 1, ''),
        'ERC721: operator query for nonexistent token'
      )

      await mintingController.mintSLD(coinbase, 'transfer')

      await registry.mintChild(coinbase, tok, '3ld')

      await registry.transferFromChild(coinbase, accounts[0], tok, '3ld')

      const threeld = await registry.childIdOf(tok, '3ld')

      assert.equal(
        accounts[0],
        await registry.ownerOf(threeld),
        'should transfer token correctly',
      )

      // should fail to transfer token without permission
      await expectRevert(
        registry.transferFromChild(accounts[1], accounts[2], tok, '3ld'),
        'ERC721: transfer of token that is not own'
      )

      await registry.transferFromChild(accounts[0], coinbase, tok, '3ld')

      assert.equal(
        coinbase,
        await registry.ownerOf(threeld),
        'should transfer token correctly',
      )
    })

    it('should burn children', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'burn')

      // should fail to burn non-existing token
      await expectRevert(
        registry.burnChild(1, ''),
        'ERC721: operator query for nonexistent token'
      );

      await mintingController.mintSLD(coinbase, 'burn')

      await registry.mintChild(coinbase, tok, '3ld')

      await registry.childIdOf(tok, '3ld')

      await registry.burnChild(tok, '3ld')

      // should burn token correctly
      await expectRevert(
        registry.burnChild(tok, '3ld'),
        'ERC721: owner query for nonexistent token'
      );

      await registry.mintChild(coinbase, tok, '3ld')

      await registry.transferFrom(coinbase, accounts[0], tok)

      // should fail to burn token without permission
      await expectRevert.unspecified(registry.burnChild(tok, '3ld'));
    })

    it('should mint/burn/transfer metadata', async () => {
      assert.equal(
        await registry.tokenURI(await registry.root()),
        'crypto',
        'good root token URI',
      )

      const tok = await registry.childIdOf(await registry.root(), 'label')

      await mintingController.mintSLD(coinbase, 'label')

      assert.equal(
        await registry.tokenURI(tok),
        'label.crypto',
        'good sld token URI',
      )

      // should fail to get non existent tokenURI
      await expectRevert.unspecified(registry.tokenURI(1));

      const threeldTok = await registry.childIdOf(tok, '3ld')

      await registry.mintChild(coinbase, tok, '3ld')

      assert.equal(
        await registry.tokenURI(threeldTok),
        '3ld.label.crypto',
        'good 3ld token URI',
      )

      await registry.burn(threeldTok)

      // should fail to get non existent tokenURI
      await expectRevert.unspecified(registry.tokenURI(threeldTok));
    })

    it('should set URI prefix', async () => {
      assert.equal(
        await registry.tokenURI(await registry.root()),
        'crypto',
        'good root token URI',
      )

      await registry.controlledSetTokenURIPrefix('prefix-')

      assert.equal(
        await registry.tokenURI(await registry.root()),
        'prefix-crypto',
        'good URI prefix',
      )

      await registry.controlledSetTokenURIPrefix('')

      assert.equal(
        await registry.tokenURI(await registry.root()),
        'crypto',
        'good URI prefix',
      )
    })
  });

  describe('Resolver', () => {
    const initializeDomain = async (name) => {
      const tok = await registry.childIdOf(await registry.root(), name);
      await mintingController.mintSLD(coinbase, name);
      return tok;
    }

    it('should resolve tokens', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'label_931')
  
      // should fail to set name if not owner
      await expectRevert(
        registry.set('key', 'value', tok),
        'ERC721: operator query for nonexistent token',
      );

      await mintingController.mintSLD(coinbase, 'label_931')
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
      const receipt = await registry.reset(tok);
      expectEvent(receipt, 'ResetRecords', {tokenId: tok.toString()});
  
      // should fail to set name if not owned
      await expectRevert(
        registry.set('key', 'value', tok, {from: accounts[1]}),
        'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
      );
    })

    it('should get key by hash', async () => {
      const tok = await initializeDomain('heyhash')
      const expectedKey = 'new-hashed-key'
      await registry.set(expectedKey, 'value', tok)
      const expectedKeyHash = utils.keccak256(expectedKey)
      const keyFromHash = await registry.hashToKey(utils.hexToNumberString(expectedKeyHash))
  
      assert.equal(keyFromHash, expectedKey)
    })

    it('should get many keys by hashes', async () => {
      const tok = await initializeDomain('heyhash-many')
      const expectedKeys = ['keyhash-many-1', 'keyhash-many-2']
      await registry.setMany(expectedKeys, ['value', 'value'], tok)
      const expectedKeyHashes = expectedKeys.map(key => {
        const keyHash = utils.keccak256(key)
        return utils.hexToNumberString(keyHash)
      });
      const keysFromHashes = await registry.hashesToKeys(expectedKeyHashes)
  
      assert.deepEqual(keysFromHashes, expectedKeys)
    })

    it('should not consume additional gas if key hash was set before', async () => {
      const tok = await initializeDomain('heyhash-gas')
      let newKeyHashTx = await registry.set('keyhash-gas', 'value', tok)
      let exitsKeyHashTx = await registry.set('keyhash-gas', 'value', tok)
      assert.isAbove(newKeyHashTx.receipt.gasUsed, exitsKeyHashTx.receipt.gasUsed)

      newKeyHashTx = await registry.setMany(['keyhash-gas-1', 'keyhash-gas-2'], ['value-1', 'value-2'], tok)
      exitsKeyHashTx = await registry.setMany(['keyhash-gas-1', 'keyhash-gas-2'], ['value-1', 'value-2'], tok)
      assert.isAbove(newKeyHashTx.receipt.gasUsed, exitsKeyHashTx.receipt.gasUsed)

      newKeyHashTx = await registry.setMany(['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'], ['value-1', 'value-2', 'value-3'], tok)
      exitsKeyHashTx = await registry.setMany(['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'], ['value-1', 'value-2', 'value-3'], tok)
      assert.isAbove(newKeyHashTx.receipt.gasUsed, exitsKeyHashTx.receipt.gasUsed)
    })

    it('should get value by key hash', async () => {
      const tok = await initializeDomain('get-key-by-hash')
      const key = 'get-key-by-hash-key'
      const expectedValue = 'get-key-by-hash-value'
      await registry.set(key, expectedValue, tok)
      const keyHash = utils.keccak256(key)
      const result = await registry.getByHash(keyHash, tok)
  
      assert.equal(result.value, expectedValue)
      assert.equal(result.key, key)
    })

    it('should get multiple values by hashes', async () => {
      const tok = await initializeDomain('get-many-keys-by-hash')
      const keys = ['key-to-hash-1', 'key-to-hash-2']
      const expectedValues = ['value-42', 'value-43']
      await registry.setMany(keys, expectedValues, tok)
      const hashedKeys = keys.map(key => {
        const keyHash = utils.keccak256(key)
        return utils.hexToNumberString(keyHash)
      });
      const result = await registry.getManyByHash(hashedKeys, tok)
  
      assert.deepEqual(result.values, expectedValues)
      assert.deepEqual(result.keys, keys)
    })

    it('should emit NewKey event new keys added', async () => {
      const tok = await initializeDomain('new-key')
      const key = 'new-key'
      const value = 'value';
      let receipt = await registry.set(key, value, tok)
      expectEvent(receipt, 'NewKey', {
        tokenId: tok.toString(),
        keyIndex: utils.keccak256(key),
        key: key
      });
  
      receipt = await registry.set(key, value, tok);
      const event = receipt.logs.find(e => e.event == 'NewKey')
      assert.isUndefined(event)
    })

    it('should emit correct Set event', async () => {
      const tok = await initializeDomain('check-set-event')
      const key = 'new-key'
      const value = 'value';
      const receipt = await registry.set(key, value, tok)

      expectEvent(receipt, 'Set', {
        tokenId: tok.toString(),
        keyIndex: utils.keccak256(key),
        valueIndex: utils.keccak256(value),
        key: key,
        value: value,
      });
    })

    it('should reconfigure resolver with new values', async () => {
      const tok = await initializeDomain('reconfigure')
      await registry.set('old-key', 'old-value', tok)
      await registry.reconfigure(['new-key'], ['new-value'], tok)
  
      assert.equal(await registry.get('old-key', tok), '')
      assert.equal(await registry.get('new-key', tok), 'new-value')

      // should fail when trying to reconfigure non-owned domain
      await expectRevert(
        registry.reconfigure(['new-key'], ['new-value'], tok, { from: accounts[1] }),
        'Registry: SENDER_IS_NOT_APPROVED_OR_OWNE'
      );
    })
  });
})
