const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai');

const { utils, BigNumber } = ethers;

describe('UNSRegistry (proxy)', () => {
  const cryptoRoot = BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');

  let UNSRegistry, unsRegistry;
  let signers, owner, receiver;

  const mintDomain = async (label, owner) => {
    const tokenId = await unsRegistry.childIdOf(cryptoRoot, label);
    await unsRegistry.mint(owner, tokenId, 'resolution');
    return tokenId;
  };

  beforeEach(async () => {
    signers = await ethers.getSigners();
    [owner, receiver] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');

    unsRegistry = await upgrades.deployProxy(UNSRegistry, [owner.address], { initializer: 'initialize' });
    await unsRegistry.mint('0xdead000000000000000000000000000000000000', cryptoRoot, 'crypto');
    await unsRegistry.setTokenURIPrefix('/');
  });

  describe('Registry', () => {
    it('should construct itself correctly', async () => {
      expect(cryptoRoot).to.be.equal('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');
    });

    it('should resolve properly', async () => {
      const tokenId = await mintDomain('resolution', owner.address);
      await unsRegistry.burn(tokenId);

      await unsRegistry.mint(owner.address, tokenId, 'resolution');
      await unsRegistry.transferFrom(owner.address, receiver.address, tokenId);
    });

    it('should set URI prefix', async () => {
      const tok = cryptoRoot;
      expect(await unsRegistry.tokenURI(tok)).to.be.equal(`/${tok}`);

      await unsRegistry.setTokenURIPrefix('prefix-');
      expect(await unsRegistry.tokenURI(tok)).to.be.equal(`prefix-${tok}`);

      await unsRegistry.setTokenURIPrefix('/');
      expect(await unsRegistry.tokenURI(tok)).to.be.equal(`/${tok}`);
    });
  });

  describe('Resolver', () => {
    it('should resolve tokens', async () => {
      const tok = await unsRegistry.childIdOf(cryptoRoot, 'label_931');

      // should fail to set name if not owner
      await expect(
        unsRegistry.set('key', 'value', tok),
      ).to.be.revertedWith('ERC721: operator query for nonexistent token');

      await unsRegistry.mint(owner.address, tok, 'label_931');
      await unsRegistry.set('key', 'value', tok);
      expect(await unsRegistry.get('key', tok)).to.be.equal('value');

      // should setMany
      await unsRegistry.setMany(['key1'], ['value1'], tok);
      await unsRegistry.setMany(['key2', 'key3'], ['value2', 'value3'], tok);
      await unsRegistry.setMany(['key4', 'key5', 'key6'], ['value4', 'value5', 'value6'], tok);
      expect(await unsRegistry.getMany(['key1', 'key2', 'key3', 'key4', 'key5', 'key6'], tok))
        .to.be.eql(['value1', 'value2', 'value3', 'value4', 'value5', 'value6']);

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
      const tok = await mintDomain('heyhash', owner.address);
      const expectedKey = 'new-hashed-key';

      await unsRegistry.set(expectedKey, 'value', tok);

      const keyFromHash = await unsRegistry.getKey(BigNumber.from(utils.id(expectedKey)));
      expect(keyFromHash).to.be.equal(expectedKey);
    });

    it('should get many keys by hashes', async () => {
      const tok = await mintDomain('heyhash-many', owner.address);
      const expectedKeys = ['keyhash-many-1', 'keyhash-many-2'];

      await unsRegistry.setMany(expectedKeys, ['value', 'value'], tok);

      const expectedKeyHashes = expectedKeys.map(key => BigNumber.from(utils.id(key)));
      const keysFromHashes = await unsRegistry.getKeys(expectedKeyHashes);
      expect(keysFromHashes).to.be.eql(expectedKeys);
    });

    it('should not consume additional gas if key hash was set before', async () => {
      const tok = await mintDomain('heyhash-gas', owner.address);
      let newKeyHashTx = await unsRegistry.set('keyhash-gas', 'value', tok);
      newKeyHashTx.receipt = await newKeyHashTx.wait();
      let exitsKeyHashTx = await unsRegistry.set('keyhash-gas', 'value', tok);
      exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
      expect(newKeyHashTx.receipt.gasUsed).to.be.above(exitsKeyHashTx.receipt.gasUsed);

      newKeyHashTx = await unsRegistry.setMany(['keyhash-gas-1', 'keyhash-gas-2'], ['value-1', 'value-2'], tok);
      newKeyHashTx.receipt = await newKeyHashTx.wait();
      exitsKeyHashTx = await unsRegistry.setMany(['keyhash-gas-1', 'keyhash-gas-2'], ['value-1', 'value-2'], tok);
      exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
      expect(newKeyHashTx.receipt.gasUsed).to.be.above(exitsKeyHashTx.receipt.gasUsed);

      newKeyHashTx = await unsRegistry.setMany(
        ['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'], ['value-1', 'value-2', 'value-3'], tok);
      newKeyHashTx.receipt = await newKeyHashTx.wait();
      exitsKeyHashTx = await unsRegistry.setMany(
        ['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'], ['value-1', 'value-2', 'value-3'], tok);
      exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
      expect(newKeyHashTx.receipt.gasUsed).to.be.above(exitsKeyHashTx.receipt.gasUsed);
    });

    it('should get value by key hash', async () => {
      const tok = await mintDomain('get-key-by-hash', owner.address);
      const key = 'get-key-by-hash-key';
      const expectedValue = 'get-key-by-hash-value';

      await unsRegistry.set(key, expectedValue, tok);

      const result = await unsRegistry.getByHash(utils.id(key), tok);
      expect(result.value).to.be.equal(expectedValue);
      expect(result.key).to.be.equal(key);
    });

    it('should get multiple values by hashes', async () => {
      const tok = await mintDomain('get-many-keys-by-hash', owner.address);
      const keys = ['key-to-hash-1', 'key-to-hash-2'];
      const expectedValues = ['value-42', 'value-43'];

      await unsRegistry.setMany(keys, expectedValues, tok);

      const hashedKeys = keys.map(key => BigNumber.from(utils.id(key)));
      const result = await unsRegistry.getManyByHash(hashedKeys, tok);
      expect(result).to.be.eql([keys, expectedValues]);
    });

    it('should emit NewKey event new keys added', async () => {
      const tok = await mintDomain('new-key', owner.address);
      const key = 'new-key';
      const value = 'value';

      await expect(unsRegistry.set(key, value, tok))
        .to.emit(unsRegistry, 'NewKey')
        .withArgs(tok, utils.id(key), key);

      await expect(unsRegistry.set(key, value, tok))
        .not.to.emit(unsRegistry, 'NewKey');
    });

    it('should emit correct Set event', async () => {
      const tok = await mintDomain('check-set-event', owner.address);
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
      const tok = await mintDomain('reconfigure', owner.address);
      await unsRegistry.set('old-key', 'old-value', tok);
      await unsRegistry.reconfigure(['new-key'], ['new-value'], tok);

      expect(await unsRegistry.get('old-key', tok)).to.be.equal('');
      expect(await unsRegistry.get('new-key', tok)).to.be.equal('new-value');

      // should fail when trying to reconfigure non-owned domain
      await expect(
        unsRegistry.connect(signers[1]).reconfigure(['new-key'], ['new-value'], tok),
      ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });
  });
});
