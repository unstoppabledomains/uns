const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai');

const { utils, BigNumber } = ethers;

describe('Registry (proxy)', () => {
  let UNSRegistry, unsRegistry, root;
  let signers, coinbase, accounts;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, ...accounts] = signers.map(s => s.address);

    UNSRegistry = await ethers.getContractFactory('contracts/UNSRegistry.sol:UNSRegistry');

    root = BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');

    unsRegistry = await upgrades.deployProxy(UNSRegistry, [coinbase], { initializer: 'initialize' });
    await unsRegistry.mint('0xdead000000000000000000000000000000000000', root, 'crypto');
    await unsRegistry.setTokenURIPrefix('/');
  });

  describe('Registry', () => {
    it('should construct itself correctly', async () => {
      assert.equal(
        root.toHexString(),
        '0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f',
        'good root',
      );
    });

    it('should resolve properly', async () => {
      const tok = await unsRegistry.childIdOf(root, 'resolution');

      await unsRegistry.mint(coinbase, tok, 'resolution');

      await unsRegistry.burn(tok);

      await unsRegistry.mint(coinbase, tok, 'resolution');

      await unsRegistry.transferFrom(coinbase, accounts[0], tok);
    });

    it('should set URI prefix', async () => {
      const tok = root;
      assert.equal(await unsRegistry.tokenURI(tok), `/${tok}`);

      await unsRegistry.setTokenURIPrefix('prefix-');
      assert.equal(await unsRegistry.tokenURI(tok), `prefix-${tok}`);

      await unsRegistry.setTokenURIPrefix('/');
      assert.equal(await unsRegistry.tokenURI(tok), `/${tok}`);
    });
  });

  describe('Resolver', () => {
    const initializeDomain = async (name) => {
      const tok = await unsRegistry.childIdOf(root, name);
      await unsRegistry.mint(coinbase, tok, name);
      return tok;
    };

    it('should resolve tokens', async () => {
      const tok = await unsRegistry.childIdOf(root, 'label_931');

      // should fail to set name if not owner
      await expect(
        unsRegistry.set('key', 'value', tok),
      ).to.be.revertedWith('ERC721: operator query for nonexistent token');

      await unsRegistry.mint(coinbase, tok, 'label_931');
      await unsRegistry.set('key', 'value', tok);

      assert.equal(
        await unsRegistry.get('key', tok),
        'value',
        'should resolve to resolver',
      );

      // should setMany
      await unsRegistry.setMany(['key1'], ['value1'], tok);
      await unsRegistry.setMany(['key2', 'key3'], ['value2', 'value3'], tok);
      await unsRegistry.setMany(['key4', 'key5', 'key6'], ['value4', 'value5', 'value6'], tok);
      assert.deepEqual(
        await unsRegistry.getMany(['key1', 'key2', 'key3', 'key4', 'key5', 'key6'], tok),
        ['value1', 'value2', 'value3', 'value4', 'value5', 'value6'],
      );

      // should reset
      await expect(unsRegistry.reset(tok))
        .to.emit(unsRegistry, 'ResetRecords')
        .withArgs(tok.toString());

      // should fail to set name if not owned
      await expect(
        unsRegistry.connect(signers[1]).set('key', 'value', tok),
      ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    it('should get key by hash', async () => {
      const tok = await initializeDomain('heyhash');
      const expectedKey = 'new-hashed-key';
      await unsRegistry.set(expectedKey, 'value', tok);
      const keyFromHash = await unsRegistry.getKey(BigNumber.from(utils.id(expectedKey)));

      assert.equal(keyFromHash, expectedKey);
    });

    it('should get many keys by hashes', async () => {
      const tok = await initializeDomain('heyhash-many');
      const expectedKeys = ['keyhash-many-1', 'keyhash-many-2'];
      await unsRegistry.setMany(expectedKeys, ['value', 'value'], tok);
      const expectedKeyHashes = expectedKeys.map(key => BigNumber.from(utils.id(key)));
      const keysFromHashes = await unsRegistry.getKeys(expectedKeyHashes);

      assert.deepEqual(keysFromHashes, expectedKeys);
    });

    it('should not consume additional gas if key hash was set before', async () => {
      const tok = await initializeDomain('heyhash-gas');
      let newKeyHashTx = await unsRegistry.set('keyhash-gas', 'value', tok);
      newKeyHashTx.receipt = await newKeyHashTx.wait();
      let exitsKeyHashTx = await unsRegistry.set('keyhash-gas', 'value', tok);
      exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
      assert.isAbove(newKeyHashTx.receipt.gasUsed, exitsKeyHashTx.receipt.gasUsed);

      newKeyHashTx = await unsRegistry.setMany(['keyhash-gas-1', 'keyhash-gas-2'], ['value-1', 'value-2'], tok);
      newKeyHashTx.receipt = await newKeyHashTx.wait();
      exitsKeyHashTx = await unsRegistry.setMany(['keyhash-gas-1', 'keyhash-gas-2'], ['value-1', 'value-2'], tok);
      exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
      assert.isAbove(newKeyHashTx.receipt.gasUsed, exitsKeyHashTx.receipt.gasUsed);

      newKeyHashTx = await unsRegistry.setMany(
        ['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'], ['value-1', 'value-2', 'value-3'], tok);
      newKeyHashTx.receipt = await newKeyHashTx.wait();
      exitsKeyHashTx = await unsRegistry.setMany(
        ['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'], ['value-1', 'value-2', 'value-3'], tok);
      exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
      assert.isAbove(newKeyHashTx.receipt.gasUsed, exitsKeyHashTx.receipt.gasUsed);
    });

    it('should get value by key hash', async () => {
      const tok = await initializeDomain('get-key-by-hash');
      const key = 'get-key-by-hash-key';
      const expectedValue = 'get-key-by-hash-value';
      await unsRegistry.set(key, expectedValue, tok);
      const result = await unsRegistry.getByHash(utils.id(key), tok);

      assert.equal(result.value, expectedValue);
      assert.equal(result.key, key);
    });

    it('should get multiple values by hashes', async () => {
      const tok = await initializeDomain('get-many-keys-by-hash');
      const keys = ['key-to-hash-1', 'key-to-hash-2'];
      const expectedValues = ['value-42', 'value-43'];
      await unsRegistry.setMany(keys, expectedValues, tok);
      const hashedKeys = keys.map(key => BigNumber.from(utils.id(key)));
      const result = await unsRegistry.getManyByHash(hashedKeys, tok);

      assert.deepEqual(result, [keys, expectedValues]);
    });

    it('should emit NewKey event new keys added', async () => {
      const tok = await initializeDomain('new-key');
      const key = 'new-key';
      const value = 'value';

      await expect(unsRegistry.set(key, value, tok))
        .to.emit(unsRegistry, 'NewKey')
        .withArgs(tok, utils.id(key), key);

      await expect(unsRegistry.set(key, value, tok))
        .not.to.emit(unsRegistry, 'NewKey');
    });

    it('should emit correct Set event', async () => {
      const tok = await initializeDomain('check-set-event');
      const key = 'new-key';
      const value = 'value';

      await expect(unsRegistry.set(key, value, tok))
        .to.emit(unsRegistry, 'Set')
        .withArgs(
          tok,
          utils.id(key),
          utils.id(value),
          key,
          value,
        );
    });

    it('should reconfigure resolver with new values', async () => {
      const tok = await initializeDomain('reconfigure');
      await unsRegistry.set('old-key', 'old-value', tok);
      await unsRegistry.reconfigure(['new-key'], ['new-value'], tok);

      assert.equal(await unsRegistry.get('old-key', tok), '');
      assert.equal(await unsRegistry.get('new-key', tok), 'new-value');

      // should fail when trying to reconfigure non-owned domain
      await expect(
        unsRegistry.connect(signers[1]).reconfigure(['new-key'], ['new-value'], tok),
      ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });
  });
});
