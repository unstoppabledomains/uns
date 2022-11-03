import { ethers } from 'hardhat';
import { expect } from 'chai';
import namehash from 'eth-ens-namehash';
import { utils, BigNumber } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { UNSRegistry } from '../types/contracts';
import { UNSRegistryMock } from '../types/contracts/mocks';
import { UNSRegistry__factory } from '../types/factories/contracts';
import { UNSRegistryMock__factory } from '../types/factories/contracts/mocks';
import { TLD, ZERO_ADDRESS } from './helpers/constants';
import { mintDomain, mintRandomDomain } from './helpers/registry';


describe('UNSRegistry', () => {
  let unsRegistry: UNSRegistry;
  let unsRegistryMock: UNSRegistryMock;

  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    owner: SignerWithAddress,
    reader: SignerWithAddress,
    receiver: SignerWithAddress,
    accounts: string[];

  const root = TLD.CRYPTO;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner, reader, receiver] = signers;
    [, ...accounts] = signers.map((s) => s.address);

    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();

    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistry.mintTLD(root, 'crypto');
    await unsRegistry.setTokenURIPrefix('/');
    await unsRegistry.addProxyReader(reader.address);

    // mock
    unsRegistryMock = await new UNSRegistryMock__factory(coinbase).deploy();
    await unsRegistryMock.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistryMock.mintTLD(root, 'crypto');
    await unsRegistryMock.setTokenURIPrefix('/');
    await unsRegistryMock.addProxyReader(reader.address);
  });

  describe('General', () => {
    it('should return zero root', async () => {
      expect(await unsRegistry.root()).to.be.equal(0);
    });

    it('should resolve properly', async () => {
      const tokenId = await mintDomain(unsRegistry, coinbase.address, ['resolution', 'crypto']);
      expect(await unsRegistry.resolverOf(tokenId)).to.be.equal(unsRegistry.address);

      await unsRegistry.burn(tokenId);
      expect(await unsRegistry.resolverOf(tokenId)).to.be.equal(ZERO_ADDRESS);

      await mintDomain(unsRegistry, coinbase.address, ['resolution', 'crypto']);
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
      const tokenId = await mintRandomDomain(unsRegistry, coinbase.address, 'crypto');
      await unsRegistry.set('key_82', 'value_23', tokenId);
      expect(await unsRegistry.get('key_82', tokenId)).to.be.equal('value_23');

      await expect(unsRegistry.setOwner(receiver.address, tokenId))
        .to.emit(unsRegistry, 'Transfer')
        .withArgs(coinbase.address, receiver.address, tokenId);
      expect(await unsRegistry.get('key_82', tokenId)).to.be.equal('value_23');
    });

    for (const key of Object.keys(TLD)) {
      it(`should be possible to mint .${key} domain`, async () => {
        const tokenId = await mintDomain(unsRegistry, coinbase.address, [`mint-${key}`, key]);
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      });
    }

    describe('namehash', () => {
      it('should return valid namehash', async () => {
        const tokenId = await unsRegistry.namehash(['12ew3', 'crypto']);
        expect(tokenId).to.be.equal(namehash.hash('12ew3.crypto'));
      });

      it('should revert when childId lable is empty', async () => {
        await expect(unsRegistry.namehash(['', 'crypto'])).to.be.revertedWith('Registry: LABEL_EMPTY');
      });
    });

    describe('exists', () => {
      it('should return true when token exists', async () => {
        const tokenId = await mintRandomDomain(unsRegistry, coinbase.address, 'crypto');
        expect(await unsRegistry.exists(tokenId)).to.be.equal(true);
      });

      it('should return false when token exists', async () => {
        const tok = await unsRegistry.namehash(['token_doesnt_exists_1094u', 'crypto']);
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

    describe('burn', () => {
      let tokenId: BigNumber;

      beforeEach(async () => {
        tokenId = await mintRandomDomain(unsRegistry, coinbase.address, 'crypto');
      });

      it('should burn the domain', async () => {
        expect(await unsRegistry.exists(tokenId)).to.be.equal(true);

        await unsRegistry.burn(tokenId);

        expect(await unsRegistry.exists(tokenId)).to.be.equal(false);
      });

      it('should revert if not owner', async () => {
        await expect(unsRegistry.connect(signers[1]).burn(tokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('should reset records on burn', async () => {
        const tokenId = await mintDomain(unsRegistry, coinbase.address, ['token-to-burn', 'crypto']);
        await unsRegistry.set('key_31', 'value_23', tokenId);
        expect(await unsRegistry.get('key_31', tokenId)).to.be.equal('value_23');

        await expect(unsRegistry.burn(tokenId)).to.emit(unsRegistry, 'ResetRecords').withArgs(tokenId);
        expect(await unsRegistry.get('key_31', tokenId)).to.be.equal('');

        await mintDomain(unsRegistry, coinbase.address, ['token-to-burn', 'crypto']);
        expect(await unsRegistry.get('key_31', tokenId)).to.be.equal('');
      });

      it('should revert if tokenId is upgraded', async () => {
        tokenId = await mintRandomDomain(unsRegistryMock, coinbase.address, 'crypto');
        await unsRegistryMock.upgradeAll([tokenId]);

        await expect(unsRegistryMock.burn(tokenId)).to.be.revertedWith('Registry: TOKEN_UPGRADED');
      });
    });
  });

  describe('Registry (minting)', () => {
    describe('mintWithRecords(address,uint256,string,string[],string[])', async () => {
      it('should mint domain with no records', async () => {
        const tokenId = await mintDomain(unsRegistry, coinbase, ['label_12324', 'crypto']);
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      });

      it('should mint domain with record', async () => {
        const tokenId = await mintDomain(
          unsRegistry,
          coinbase.address,
          ['label_38f6', 'crypto'],
          false,
          ['key_1'],
          ['value_1'],
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.get('key_1', tokenId)).to.be.eql('value_1');
      });

      it('should mint subdomain', async () => {
        const labels = ['label_38g', 'crypto'];
        await mintDomain(unsRegistry, coinbase.address, labels);

        labels.unshift('sub');
        const tokenId = await mintDomain(unsRegistry, coinbase.address, labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      });

      it('should produce NewURI event', async () => {
        const labels = ['label_38f7', 'crypto'];
        const tokenId = await unsRegistry.namehash(labels);

        await expect(
          unsRegistry.mintWithRecords(
            coinbase.address,
            labels,
            ['key1'],
            ['42'],
          ),
        ).to.emit(unsRegistry, 'NewURI')
          .withArgs(tokenId, 'label_38f7.crypto');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      });

      it('should not allow minting subdomain if not minting manager', async () => {
        const labels = ['label_38qwe', 'crypto'];
        await mintDomain(unsRegistry, owner, labels);

        labels.unshift('sub');
        const _registry = unsRegistry.connect(owner);
        await expect(mintDomain(_registry, owner, labels)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_MINTING_MANAGER',
        );
      });
    });
  });

  describe('Registry (ownership management)', () => {
    let tokenId;

    beforeEach(async () => {
      tokenId = await mintRandomDomain(unsRegistry, coinbase.address, 'crypto');
    });

    describe('setOwner', () => {
      it('sets owner correctly', async () => {
        await unsRegistry.setOwner(owner.address, tokenId);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('sets owner correctly even if token is upgraded', async () => {
        tokenId = await mintRandomDomain(unsRegistryMock, coinbase.address, 'crypto');
        await unsRegistryMock.upgradeAll([tokenId]);

        await unsRegistryMock.setOwner(owner.address, tokenId);

        expect(await unsRegistryMock.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('produces ERC721 error when transfering upgraded token to zero address', async () => {
        tokenId = await mintRandomDomain(unsRegistryMock, coinbase.address, 'crypto');
        await unsRegistryMock.upgradeAll([tokenId]);

        await expect(unsRegistryMock.setOwner(ZERO_ADDRESS, tokenId)).to.be.revertedWith(
          'ERC721: transfer to the zero address',
        );
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

      it('transfers domain correctly even if token is upgraded', async () => {
        tokenId = await mintRandomDomain(unsRegistryMock, coinbase.address, 'crypto');
        await unsRegistryMock.upgradeAll([tokenId]);

        await unsRegistryMock.transferFrom(coinbase.address, owner.address, tokenId);

        expect(await unsRegistryMock.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('should reset records on transfer', async () => {
        await unsRegistry.set('key_23', 'value_23', tokenId);
        expect(await unsRegistry.get('key_23', tokenId)).to.be.equal('value_23');

        await expect(unsRegistry.transferFrom(coinbase.address, accounts[0], tokenId))
          .to.emit(unsRegistry, 'ResetRecords')
          .withArgs(tokenId);

        expect(await unsRegistry.get('key_23', tokenId)).to.be.equal('');
      });
    });

    describe('safeTransferFrom(address,address,uint256)', () => {
      it('transfers domain correctly', async () => {
        await unsRegistry['safeTransferFrom(address,address,uint256)'](coinbase.address, owner.address, tokenId);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('transfers domain correctly even if token is upgraded', async () => {
        tokenId = await mintRandomDomain(unsRegistryMock, coinbase.address, 'crypto');
        await unsRegistryMock.upgradeAll([tokenId]);

        await unsRegistryMock['safeTransferFrom(address,address,uint256)'](coinbase.address, owner.address, tokenId);

        expect(await unsRegistryMock.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('should reset records on safe transfer', async () => {
        await unsRegistry.set('key_12', 'value_23', tokenId);
        expect(await unsRegistry.get('key_12', tokenId)).to.be.equal('value_23');

        await expect(unsRegistry['safeTransferFrom(address,address,uint256)'](coinbase.address, accounts[0], tokenId))
          .to.emit(unsRegistry, 'ResetRecords')
          .withArgs(tokenId);

        expect(await unsRegistry.get('key_12', tokenId)).to.be.equal('');
      });
    });

    describe('safeTransferFrom(address,address,uint256,bytes)', () => {
      it('transfers domain correctly', async () => {
        await unsRegistry['safeTransferFrom(address,address,uint256,bytes)'](
          coinbase.address,
          owner.address,
          tokenId,
          '0x',
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('transfers domain correctly even if token is upgraded', async () => {
        tokenId = await mintRandomDomain(unsRegistryMock, coinbase.address, 'crypto');
        await unsRegistryMock.upgradeAll([tokenId]);

        await unsRegistryMock['safeTransferFrom(address,address,uint256,bytes)'](
          coinbase.address,
          owner.address,
          tokenId,
          '0x',
        );

        expect(await unsRegistryMock.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('should reset records on safe transfer with data', async () => {
        await unsRegistry.set('key_12', 'value_23', tokenId);
        expect(await unsRegistry.get('key_12', tokenId)).to.be.equal('value_23');

        await expect(
          unsRegistry['safeTransferFrom(address,address,uint256,bytes)'](coinbase.address, accounts[0], tokenId, '0x'),
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
      tokenId = await mintRandomDomain(unsRegistry, coinbase.address, 'crypto');
    });

    describe('set & get', () => {
      it('should be able to set and resolve record', async () => {
        await unsRegistry.set('key', 'value', tokenId);

        expect(await unsRegistry.get('key', tokenId)).to.be.equal('value');
      });

      it('should return empty value if token is upgraded and is being read from proxy reader', async () => {
        tokenId = await mintRandomDomain(unsRegistryMock, coinbase.address, 'crypto');
        await unsRegistryMock.upgradeAll([tokenId]);

        await unsRegistryMock.set('key', 'value', tokenId);

        expect(await unsRegistryMock.connect(reader).get('key', tokenId)).to.equal('');
        expect(await unsRegistryMock.connect(coinbase).get('key', tokenId)).to.equal('value');
      });

      it('should fail if not owner', async () => {
        tokenId = await mintRandomDomain(unsRegistryMock, coinbase.address, 'crypto');
        await expect(unsRegistryMock.connect(signers[1]).set('key', 'value', tokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('should fail if token is not minted', async () => {
        const tokenId = await unsRegistry.namehash(['some_invalid_label', 'crypto']);

        await expect(unsRegistry.set('key', 'value', tokenId)).to.be.revertedWith('ERC721: invalid token ID');
      });

      it('should emit NewKey event new keys added', async () => {
        const key = 'new-key';
        const value = 'value';

        await expect(unsRegistry.set(key, value, tokenId))
          .to.emit(unsRegistry, 'NewKey')
          .withArgs(tokenId, utils.id(key), key);

        await expect(unsRegistry.set(key, value, tokenId)).not.to.emit(unsRegistry, 'NewKey');
      });

      it('should emit correct Set event', async () => {
        const key = 'new-key';
        const value = 'value';

        await expect(unsRegistry.set(key, value, tokenId))
          .to.emit(unsRegistry, 'Set')
          .withArgs(tokenId, utils.id(key), utils.id(value), key, value);
      });
    });

    describe('setMany & getMany', () => {
      it('should be able to set records multiple times and resolve them', async () => {
        await unsRegistry.setMany(['key1'], ['value1'], tokenId);
        await unsRegistry.setMany(['key2', 'key3'], ['value2', 'value3'], tokenId);
        await unsRegistry.setMany(['key4', 'key5', 'key6'], ['value4', 'value5', 'value6'], tokenId);
        expect(await unsRegistry.getMany(['key1', 'key2', 'key3', 'key4', 'key5', 'key6'], tokenId)).to.be.eql([
          'value1',
          'value2',
          'value3',
          'value4',
          'value5',
          'value6',
        ]);
      });

      it('should return empty values if token is upgraded and is being read from proxy reader', async () => {
        tokenId = await mintRandomDomain(unsRegistryMock, coinbase.address, 'crypto');
        await unsRegistryMock.upgradeAll([tokenId]);

        await unsRegistryMock.setMany(['key1', 'key2'], ['value1', 'value2'], tokenId);

        expect(await unsRegistryMock.connect(reader).getMany(['key1', 'key2'], tokenId)).to.deep.equal(['', '']);

        expect(await unsRegistryMock.connect(coinbase).getMany(['key1', 'key2'], tokenId)).to.deep.equal([
          'value1',
          'value2',
        ]);
      });

      it('should fail on setMany if not owner', async () => {
        await expect(unsRegistry.connect(signers[1]).setMany(['key'], ['value'], tokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );

        expect(await unsRegistry.connect(signers[1]).getMany(['key'], tokenId)).to.be.deep.equal(['']);
      });
    });

    describe('reset', () => {
      it('should reset all records', async () => {
        await unsRegistry.setMany(['key1', 'key2'], ['value1', 'value2'], tokenId);

        await expect(unsRegistry.reset(tokenId)).to.emit(unsRegistry, 'ResetRecords').withArgs(tokenId.toString());

        expect(
          await unsRegistry.getMany(['key1', 'key2'], tokenId),
        ).to.deep.equal(['', '']);
      });

      it('should fail if not owner', async () => {
        await unsRegistry.setMany(['key1', 'key2'], ['value1', 'value2'], tokenId);

        await expect(unsRegistry.connect(signers[1]).reset(tokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );

        expect(
          await unsRegistry.getMany(['key1', 'key2'], tokenId),
        ).to.deep.equal(['value1', 'value2']);
      });
    });

    describe('geyKey & getKeys', () => {
      it('should get key by hash', async () => {
        const expectedKey = 'new-hashed-key';
        await unsRegistry.set(expectedKey, 'value', tokenId);

        const keyFromHash = await unsRegistry.getKey(BigNumber.from(utils.id(expectedKey)));
        expect(keyFromHash).to.be.equal(expectedKey);
      });

      it('should get many keys by hashes', async () => {
        const expectedKeys = ['keyhash-many-1', 'keyhash-many-2'];
        await unsRegistry.setMany(expectedKeys, ['value', 'value'], tokenId);

        const expectedKeyHashes = expectedKeys.map((key) => BigNumber.from(utils.id(key)));
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
          unsRegistry.connect(signers[1]).reconfigure(['new-key'], ['new-value'], tokenId),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
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

      it('should return empty value by keyhash if reader is ProxyReader and token is upgraded', async () => {
        const key = 'get-key-by-hash-key';
        const value = 'get-key-by-hash-value';

        tokenId = await mintRandomDomain(unsRegistryMock, coinbase.address, 'crypto');
        await unsRegistryMock.set(key, value, tokenId);
        await unsRegistryMock.upgradeAll([tokenId]);

        expect((await unsRegistryMock.connect(reader).getByHash(utils.id(key), tokenId)).value).to.be.equal('');

        expect((await unsRegistryMock.connect(coinbase).getByHash(utils.id(key), tokenId)).value).to.be.equal(value);
      });

      it('should get multiple values by hashes', async () => {
        const keys = ['key-to-hash-1', 'key-to-hash-2'];
        const expectedValues = ['value-42', 'value-43'];
        await unsRegistry.setMany(keys, expectedValues, tokenId);

        const hashedKeys = keys.map((key) => BigNumber.from(utils.id(key)));
        const result = await unsRegistry.getManyByHash(hashedKeys, tokenId);
        expect(result).to.be.eql([keys, expectedValues]);
      });

      it('should return empty values by keyhashes if reader is ProxyReader and token is upgraded', async () => {
        const keys = ['key-to-hash-1', 'key-to-hash-2'];
        const values = ['value-42', 'value-43'];

        tokenId = await mintRandomDomain(unsRegistryMock, coinbase.address, 'crypto');
        await unsRegistryMock.setMany(keys, values, tokenId);
        await unsRegistryMock.upgradeAll([tokenId]);

        const hashedKeys = keys.map((key) => BigNumber.from(utils.id(key)));

        const [, resultingValues] = await unsRegistryMock.connect(reader).getManyByHash(hashedKeys, tokenId);

        expect(resultingValues).to.be.deep.equal(['', '']);

        expect(
          await unsRegistryMock.connect(coinbase).getManyByHash(hashedKeys, tokenId),
        ).to.be.deep.equal([keys, values]);
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

        await expect(unsRegistry.setByHash(keyHash, 'value', tokenId)).to.be.revertedWith(
          'RecordStorage: KEY_NOT_FOUND',
        );
      });

      it('should set records(1) by hash', async () => {
        const expectedKey = 'key_2w12c';
        const keyHash = await initializeKey(expectedKey);

        await unsRegistry.setManyByHash([keyHash], ['value'], tokenId);

        expect(await unsRegistry.getByHash(keyHash, tokenId)).to.be.eql([expectedKey, 'value']);
      });

      it('should set records(2) by hash', async () => {
        const key1 = 'key_3m3c';
        const key2 = 'key_9v3f';
        const key1Hash = await initializeKey(key1);
        const key2Hash = await initializeKey(key2);

        await unsRegistry.setManyByHash([key1Hash, key2Hash], ['value1', 'value2'], tokenId);

        expect(await unsRegistry.getManyByHash([key1Hash, key2Hash], tokenId)).to.be.eql([
          [key1, key2],
          ['value1', 'value2'],
        ]);
      });

      it('should revert setting records by hash when at least one key is not registered', async () => {
        const key1 = 'key_2d83c';
        const key2 = 'key_4o83f';
        const key1Hash = await initializeKey(key1);
        const key2Hash = BigNumber.from(utils.id(key2));

        await expect(unsRegistry.setManyByHash([key1Hash, key2Hash], ['value1', 'value2'], tokenId)).to.be.revertedWith(
          'RecordStorage: KEY_NOT_FOUND',
        );
      });

      it('should not consume additional gas if key hash was set before', async () => {
        const newKeyHashTx = await unsRegistry.set(
          'keyhash-gas',
          'value',
          tokenId,
        );
        const newKeyHashTxReceipt = await newKeyHashTx.wait();
        const exitsKeyHashTx = await unsRegistry.set(
          'keyhash-gas',
          'value',
          tokenId,
        );
        const exitsKeyHashTxReceipt = await exitsKeyHashTx.wait();

        expect(newKeyHashTxReceipt.gasUsed).to.be.above(
          exitsKeyHashTxReceipt.gasUsed,
        );

        const newKeyHashTx2 = await unsRegistry.setMany(
          ['keyhash-gas-1', 'keyhash-gas-2'],
          ['value-1', 'value-2'],
          tokenId,
        );
        const newKeyHashTxReceipt2 = await newKeyHashTx2.wait();
        const exitsKeyHashTx2 = await unsRegistry.setMany(
          ['keyhash-gas-1', 'keyhash-gas-2'],
          ['value-1', 'value-2'],
          tokenId,
        );
        const exitsKeyHashTxReceipt2 = await exitsKeyHashTx2.wait();

        expect(newKeyHashTxReceipt2.gasUsed).to.be.above(
          exitsKeyHashTxReceipt2.gasUsed,
        );

        const newKeyHashTx3 = await unsRegistry.setMany(
          ['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'],
          ['value-1', 'value-2', 'value-3'],
          tokenId,
        );
        const newKeyHashTxReceipt3 = await newKeyHashTx3.wait();
        const exitsKeyHashTx3 = await unsRegistry.setMany(
          ['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'],
          ['value-1', 'value-2', 'value-3'],
          tokenId,
        );
        const exitsKeyHashTxReceipt3 = await exitsKeyHashTx3.wait();

        expect(newKeyHashTxReceipt3.gasUsed).to.be.above(
          exitsKeyHashTxReceipt3.gasUsed,
        );
      });
    });
  });
});
