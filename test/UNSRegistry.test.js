const { ethers } = require('hardhat');
const { expect } = require('chai');
const namehash = require('eth-ens-namehash');

const { TLD, ZERO_ADDRESS } = require('./helpers/constants');
const { mintDomain } = require('./helpers/registry');

const { utils, BigNumber } = ethers;

describe('UNSRegistry', () => {
  let UNSRegistry, CNSRegistry, ERC721ReceiverMock;
  let unsRegistry, cnsRegistry, root;
  let signers, coinbase, owner, receiver, accounts;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner, , receiver] = signers;
    [, ...accounts] = signers.map(s => s.address);

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    CNSRegistry = await ethers.getContractFactory('CNSRegistry');
    ERC721ReceiverMock = await ethers.getContractFactory('ERC721ReceiverMock');

    root = BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');

    unsRegistry = await UNSRegistry.deploy();
    await unsRegistry.initialize(coinbase.address);
    await unsRegistry['mint(address,uint256,string)'](
      '0xdead000000000000000000000000000000000000', root, 'crypto');
    await unsRegistry.setTokenURIPrefix('/');

    cnsRegistry = await CNSRegistry.deploy();
  });

  describe('General', () => {
    it('should return zero root', async () => {
      expect(await unsRegistry.root()).to.be.equal(0);
    });

    it('should resolve properly', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'resolution');
      expect(await unsRegistry.resolverOf(tokenId)).to.be.equal(unsRegistry.address);

      await unsRegistry.burn(tokenId);
      expect(await unsRegistry.resolverOf(tokenId)).to.be.equal(ZERO_ADDRESS);

      await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'resolution');
      expect(await unsRegistry.resolverOf(tokenId)).to.be.equal(unsRegistry.address);
    });

    it('should set URI prefix', async () => {
      expect(await unsRegistry.tokenURI(root)).to.be.equal(`/${root}`);

      await unsRegistry.setTokenURIPrefix('prefix-');
      expect(await unsRegistry.tokenURI(root)).to.be.equal(`prefix-${root}`);

      await unsRegistry.setTokenURIPrefix('/');
      expect(await unsRegistry.tokenURI(root)).to.be.equal(`/${root}`);
    });

    it('should emit Transfer event on set owner', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'tok_aq_sj');
      await unsRegistry.set('key_82', 'value_23', tokenId);
      expect(await unsRegistry.get('key_82', tokenId)).to.be.equal('value_23');

      await expect(unsRegistry.setOwner(receiver.address, tokenId))
        .to.emit(unsRegistry, 'Transfer').withArgs(coinbase.address, receiver.address, tokenId);
      expect(await unsRegistry.get('key_82', tokenId)).to.be.equal('value_23');
    });

    describe('childIdOf', () => {
      it('should return valid childId', async () => {
        const tokenId = await unsRegistry.childIdOf(root, '12ew3');
        expect(tokenId).to.be.equal(namehash.hash('12ew3.crypto'));
      });

      it('should revert when childId lable is empty', async () => {
        await expect(unsRegistry.childIdOf(root, '')).to.be
          .revertedWith('Registry: LABEL_EMPTY');
      });
    });

    describe('exists', () => {
      it('should return true when token exists', async () => {
        const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'token_exists_11ew3');
        expect(await unsRegistry.exists(tokenId)).to.be.equal(true);
      });

      it('should return false when token exists', async () => {
        const tok = await unsRegistry.childIdOf(root, 'token_doesnt_exists_1094u');
        expect(await unsRegistry.exists(tok)).to.be.equal(false);
      });
    });

    describe('supportsInterface', () => {
      it('should support IERC165Upgradeable interface', async () => {
        expect(await unsRegistry.supportsInterface('0x01ffc9a7')).to.be.equal(true);
      });

      it('should support IERC721Upgradeable interface', async () => {
        expect(await unsRegistry.supportsInterface('0x80ac58cd')).to.be.equal(true);
      });

      it('should support IERC721MetadataUpgradeable interface', async () => {
        expect(await unsRegistry.supportsInterface('0x5b5e139f')).to.be.equal(true);
      });

      it('should not support random interface', async () => {
        expect(await unsRegistry.supportsInterface('0x01010101')).to.be.equal(false);
      });
    });

    it('should have right metadata', async () => {
      expect(await unsRegistry.name()).to.be.eql('Unstoppable Domains');
      expect(await unsRegistry.symbol()).to.be.eql('UD');
    });
  });

  describe('Registry (minting)', () => {
    it('should mint domains', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'label_22');
      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);

      // should fail to mint existing token
      await expect(
        unsRegistry.callStatic['mint(address,uint256,string)'](coinbase.address, tokenId, 'label_22'),
      ).to.be.revertedWith('ERC721: token already minted');
      await expect(
        unsRegistry.callStatic['mint(address,uint256,string)'](accounts[0], tokenId, 'label_22'),
      ).to.be.revertedWith('ERC721: token already minted');

      await unsRegistry.burn(tokenId);
      await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'label_22');

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
    });

    it('should safely mint domains', async () => {
      const tokenId = await unsRegistry.childIdOf(root, 'label_93');
      await unsRegistry.functions['safeMint(address,uint256,string)'](coinbase.address, tokenId, 'label_93');

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);

      // should fail to safely mint existing token contract
      await expect(
        unsRegistry.callStatic['safeMint(address,uint256,string)'](coinbase.address, tokenId, 'label_93'),
      ).to.be.revertedWith('ERC721: token already minted');

      await unsRegistry.burn(tokenId);

      // should fail to safely mint token to non reciever contract
      await expect(
        unsRegistry.callStatic['safeMint(address,uint256,string)'](cnsRegistry.address, tokenId, 'label_93'),
      ).to.be.revertedWith('ERC721: transfer to non ERC721Receiver implementer');

      const tokenReceiver = await ERC721ReceiverMock.deploy();
      await unsRegistry.functions['safeMint(address,uint256,string)'](tokenReceiver.address, tokenId, 'label_93');

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(tokenReceiver.address);
    });

    it('should safely mint(data) domains', async () => {
      const tokenId = await unsRegistry.childIdOf(root, 'label_s23');
      await unsRegistry.functions['safeMint(address,uint256,string,bytes)'](
        coinbase.address, tokenId, 'label_93', '0x');

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);

      // should fail to safely mint existing token contract
      await expect(
        unsRegistry.callStatic['safeMint(address,uint256,string)'](coinbase.address, tokenId, 'label_s23'),
      ).to.be.revertedWith('ERC721: token already minted');

      await unsRegistry.burn(tokenId);

      // should fail to safely mint token to non reciever contract
      await expect(
        unsRegistry.callStatic['safeMint(address,uint256,string)'](cnsRegistry.address, tokenId, 'label_s23'),
      ).to.be.revertedWith('ERC721: transfer to non ERC721Receiver implementer');

      const tokenReceiver = await ERC721ReceiverMock.deploy();
      await unsRegistry.functions['safeMint(address,uint256,string)'](tokenReceiver.address, tokenId, 'label_s23');

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(tokenReceiver.address);
    });

    it('should mint domain with no records', async () => {
      const tokenId = await unsRegistry.childIdOf(root, 'label_12324');
      await unsRegistry.mintWithRecords(coinbase.address, tokenId, 'label_12324', [], []);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
    });

    it('should mint domain with record', async () => {
      const tokenId = await unsRegistry.childIdOf(root, 'label_38f6');
      await unsRegistry.mintWithRecords(coinbase.address, tokenId, 'label_38f6', ['key_1'], ['value_1']);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      expect(await unsRegistry.get('key_1', tokenId)).to.be.eql('value_1');
    });

    it('should safely mint domain with no records', async () => {
      const funcSig = 'safeMintWithRecords(address,uint256,string,string[],string[])';
      const tokenId = await unsRegistry.childIdOf(root, 'label_312er');
      await unsRegistry[funcSig](coinbase.address, tokenId, 'label_312er', [], []);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
    });

    it('should safely mint domain with record', async () => {
      const funcSig = 'safeMintWithRecords(address,uint256,string,string[],string[])';
      const tokenId = await unsRegistry.childIdOf(root, 'label_dvf321');
      await unsRegistry[funcSig](coinbase.address, tokenId, 'label_dvf321', ['key_1'], ['value_1']);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      expect(await unsRegistry.get('key_1', tokenId)).to.be.eql('value_1');
    });

    it('should safely mint(data) domain with no records', async () => {
      const funcSig = 'safeMintWithRecords(address,uint256,string,string[],string[],bytes)';
      const tokenId = await unsRegistry.childIdOf(root, 'label_134qwf');
      await unsRegistry[funcSig](coinbase.address, tokenId, 'label_134qwf', [], [], '0x');

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
    });

    it('should safely mint(data) domain with record', async () => {
      const funcSig = 'safeMintWithRecords(address,uint256,string,string[],string[],bytes)';
      const tokenId = await unsRegistry.childIdOf(root, 'label_dsf311');
      await unsRegistry[funcSig](coinbase.address, tokenId, 'label_dsf311', ['key_1'], ['value_1'], '0x');

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      expect(await unsRegistry.get('key_1', tokenId)).to.be.eql('value_1');
    });
  });

  describe('UNS Registry (records management)', () => {
    const initializeKey = async (key) => {
      await unsRegistry.addKey(key);
      return BigNumber.from(utils.id(key));
    };

    it('should resolve tokens', async () => {
      const tokenId = await unsRegistry.childIdOf(root, 'label_931');

      // should fail to set name if not owner
      await expect(
        unsRegistry.set('key', 'value', tokenId),
      ).to.be.revertedWith('ERC721: operator query for nonexistent token');

      await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'label_931');
      await unsRegistry.set('key', 'value', tokenId);

      expect(await unsRegistry.get('key', tokenId)).to.be.equal('value');

      // should setMany
      await unsRegistry.setMany(['key1'], ['value1'], tokenId);
      await unsRegistry.setMany(['key2', 'key3'], ['value2', 'value3'], tokenId);
      await unsRegistry.setMany(['key4', 'key5', 'key6'], ['value4', 'value5', 'value6'], tokenId);
      expect(await unsRegistry.getMany(['key1', 'key2', 'key3', 'key4', 'key5', 'key6'], tokenId))
        .to.be.eql(['value1', 'value2', 'value3', 'value4', 'value5', 'value6']);

      // should reset
      await expect(unsRegistry.reset(tokenId))
        .to.emit(unsRegistry, 'ResetRecords')
        .withArgs(tokenId.toString());

      // should fail to set name if not owned
      await expect(
        unsRegistry.connect(signers[1]).set('key', 'value', tokenId),
      ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    it('should get key by hash', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'heyhash');
      const expectedKey = 'new-hashed-key';
      await unsRegistry.set(expectedKey, 'value', tokenId);

      const keyFromHash = await unsRegistry.getKey(BigNumber.from(utils.id(expectedKey)));
      expect(keyFromHash).to.be.equal(expectedKey);
    });

    it('should get many keys by hashes', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'heyhash-many');
      const expectedKeys = ['keyhash-many-1', 'keyhash-many-2'];
      await unsRegistry.setMany(expectedKeys, ['value', 'value'], tokenId);

      const expectedKeyHashes = expectedKeys.map(key => BigNumber.from(utils.id(key)));
      const keysFromHashes = await unsRegistry.getKeys(expectedKeyHashes);
      expect(keysFromHashes).to.be.eql(expectedKeys);
    });

    it('should not consume additional gas if key hash was set before', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'heyhash-gas');
      let newKeyHashTx = await unsRegistry.set('keyhash-gas', 'value', tokenId);
      newKeyHashTx.receipt = await newKeyHashTx.wait();
      let exitsKeyHashTx = await unsRegistry.set('keyhash-gas', 'value', tokenId);
      exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
      expect(newKeyHashTx.receipt.gasUsed).to.be.above(exitsKeyHashTx.receipt.gasUsed);

      newKeyHashTx = await unsRegistry.setMany(['keyhash-gas-1', 'keyhash-gas-2'], ['value-1', 'value-2'], tokenId);
      newKeyHashTx.receipt = await newKeyHashTx.wait();
      exitsKeyHashTx = await unsRegistry.setMany(['keyhash-gas-1', 'keyhash-gas-2'], ['value-1', 'value-2'], tokenId);
      exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
      expect(newKeyHashTx.receipt.gasUsed).to.be.above(exitsKeyHashTx.receipt.gasUsed);

      newKeyHashTx = await unsRegistry.setMany(
        ['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'], ['value-1', 'value-2', 'value-3'], tokenId);
      newKeyHashTx.receipt = await newKeyHashTx.wait();
      exitsKeyHashTx = await unsRegistry.setMany(
        ['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'], ['value-1', 'value-2', 'value-3'], tokenId);
      exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
      expect(newKeyHashTx.receipt.gasUsed).to.be.above(exitsKeyHashTx.receipt.gasUsed);
    });

    it('should get value by key hash', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'get-key-by-hash');
      const key = 'get-key-by-hash-key';
      const expectedValue = 'get-key-by-hash-value';
      await unsRegistry.set(key, expectedValue, tokenId);

      const result = await unsRegistry.getByHash(utils.id(key), tokenId);
      expect(result.value).to.be.equal(expectedValue);
      expect(result.key).to.be.equal(key);
    });

    it('should get multiple values by hashes', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'get-many-keys-by-hash');
      const keys = ['key-to-hash-1', 'key-to-hash-2'];
      const expectedValues = ['value-42', 'value-43'];
      await unsRegistry.setMany(keys, expectedValues, tokenId);

      const hashedKeys = keys.map(key => BigNumber.from(utils.id(key)));
      const result = await unsRegistry.getManyByHash(hashedKeys, tokenId);
      expect(result).to.be.eql([keys, expectedValues]);
    });

    it('should emit NewKey event new keys added', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'new-key');
      const key = 'new-key';
      const value = 'value';

      await expect(unsRegistry.set(key, value, tokenId))
        .to.emit(unsRegistry, 'NewKey')
        .withArgs(tokenId, utils.id(key), key);

      await expect(unsRegistry.set(key, value, tokenId))
        .not.to.emit(unsRegistry, 'NewKey');
    });

    it('should emit correct Set event', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'check-set-event');
      const key = 'new-key';
      const value = 'value';

      await expect(unsRegistry.set(key, value, tokenId))
        .to.emit(unsRegistry, 'Set')
        .withArgs(
          tokenId,
          utils.id(key),
          utils.id(value),
          key,
          value,
        );
    });

    it('should reconfigure resolver with new values', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'reconfigure');
      await unsRegistry.set('old-key', 'old-value', tokenId);
      await unsRegistry.reconfigure(['new-key'], ['new-value'], tokenId);

      expect(await unsRegistry.get('old-key', tokenId)).to.be.equal('');
      expect(await unsRegistry.get('new-key', tokenId)).to.be.eql('new-value');

      // should fail when trying to reconfigure non-owned domain
      await expect(
        unsRegistry.connect(signers[1]).reconfigure(['new-key'], ['new-value'], tokenId),
      ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    it('should set record by hash', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'sk_2q1');
      const expectedKey = 'key_23c';
      const keyHash = await initializeKey(expectedKey);

      await unsRegistry.setByHash(keyHash, 'value', tokenId);

      const [key, value] = await unsRegistry.getByHash(keyHash, tokenId);
      expect([key, value]).to.be.eql([expectedKey, 'value']);
    });

    it('should revert setting record by hash when key is not registered', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'sk_2p3');
      const expectedKey = 'key_23f3c';
      const keyHash = BigNumber.from(utils.id(expectedKey));

      await expect(
        unsRegistry.setByHash(keyHash, 'value', tokenId),
      ).to.be.revertedWith('RecordStorage: KEY_NOT_FOUND');
    });

    it('should set records(1) by hash', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'sk_q93');
      const expectedKey = 'key_2w12c';
      const keyHash = await initializeKey(expectedKey);

      await unsRegistry.setManyByHash([keyHash], ['value'], tokenId);

      expect(await unsRegistry.getByHash(keyHash, tokenId)).to.be.eql([expectedKey, 'value']);
    });

    it('should set records(2) by hash', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'sk_8s6b1');
      const key1 = 'key_3m3c';
      const key2 = 'key_9v3f';
      const key1Hash = await initializeKey(key1);
      const key2Hash = await initializeKey(key2);

      await unsRegistry.setManyByHash([key1Hash, key2Hash], ['value1', 'value2'], tokenId);

      expect(await unsRegistry.getManyByHash([key1Hash, key2Hash], tokenId))
        .to.be.eql([[key1, key2], ['value1', 'value2']]);
    });

    it('should revert setting records by hash when at least one key is not registered', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'sk_30q13');
      const key1 = 'key_2d83c';
      const key2 = 'key_4o83f';
      const key1Hash = await initializeKey(key1);
      const key2Hash = BigNumber.from(utils.id(key2));

      await expect(
        unsRegistry.setManyByHash([key1Hash, key2Hash], ['value1', 'value2'], tokenId),
      ).to.be.revertedWith('RecordStorage: KEY_NOT_FOUND');
    });

    it('should reset records on transfer', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'tok_aa_23');
      await unsRegistry.set('key_23', 'value_23', tokenId);
      expect(await unsRegistry.get('key_23', tokenId)).to.be.equal('value_23');

      await expect(unsRegistry.transferFrom(coinbase.address, accounts[0], tokenId))
        .to.emit(unsRegistry, 'ResetRecords').withArgs(tokenId);
      expect(await unsRegistry.get('key_23', tokenId)).to.be.equal('');
    });

    it('should reset records on safe transfer', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'tok_aw_23');
      await unsRegistry.set('key_13', 'value_23', tokenId);
      expect(await unsRegistry.get('key_13', tokenId)).to.be.equal('value_23');

      await expect(unsRegistry['safeTransferFrom(address,address,uint256)'](coinbase.address, accounts[0], tokenId))
        .to.emit(unsRegistry, 'ResetRecords').withArgs(tokenId);
      expect(await unsRegistry.get('key_13', tokenId)).to.be.equal('');
    });

    it('should reset records on safe transfer with data', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'tok_ae_23');
      await unsRegistry.set('key_12', 'value_23', tokenId);
      expect(await unsRegistry.get('key_12', tokenId)).to.be.equal('value_23');

      await expect(
        unsRegistry['safeTransferFrom(address,address,uint256,bytes)'](coinbase.address, accounts[0], tokenId, '0x'),
      ).to.emit(unsRegistry, 'ResetRecords').withArgs(tokenId);
      expect(await unsRegistry.get('key_12', tokenId)).to.be.equal('');
    });

    it('should reset records on burn', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'tok_hj_23');
      await unsRegistry.set('key_31', 'value_23', tokenId);
      expect(await unsRegistry.get('key_31', tokenId)).to.be.equal('value_23');

      await expect(unsRegistry.burn(tokenId))
        .to.emit(unsRegistry, 'ResetRecords').withArgs(tokenId);
      expect(await unsRegistry.get('key_31', tokenId)).to.be.equal('');

      await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'tok_hj_23');
      expect(await unsRegistry.get('key_31', tokenId)).to.be.equal('');
    });

    it('should not reset records on set owner', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, TLD.CRYPTO, 'tok_aq_23');
      await unsRegistry.set('key_16', 'value_23', tokenId);
      expect(await unsRegistry.get('key_16', tokenId)).to.be.equal('value_23');

      await expect(unsRegistry.setOwner(owner.address, tokenId))
        .to.not.emit(unsRegistry, 'ResetRecords').withArgs(tokenId);
      expect(await unsRegistry.get('key_16', tokenId)).to.be.equal('value_23');
    });
  });
});
