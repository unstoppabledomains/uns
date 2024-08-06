import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { id } from 'ethers';
import { ProxyReader, UNSRegistry } from '../types/contracts';
import { ProxyReader__factory, UNSRegistry__factory } from '../types/factories/contracts';
import { TLD } from '../src/tlds';
import { getInterfaceId } from './helpers/proxy';
import { mintDomain } from './helpers/registry';
import { ZERO_ADDRESS } from './helpers/constants';

describe('ProxyReader (UNS only)', () => {
  const domainName = 'test_42';
  const keys = ['test.key1', 'test.key2'];
  const values = ['test.value1', 'test.value2'];

  let unsRegistry: UNSRegistry, proxyReader: ProxyReader;
  let signers: SignerWithAddress[], coinbase: SignerWithAddress, accounts: string[];
  let walletTokenId: bigint, cryptoTokenId: bigint;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;
    [, ...accounts] = signers.map((s) => s.address);

    // deploy UNS
    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistry.setTokenURIPrefix('/');

    // mint TLDs
    await unsRegistry.mintTLD(TLD.wallet.hash, 'wallet');
    await unsRegistry.mintTLD(TLD.crypto.hash, 'crypto');

    // mint .wallet
    walletTokenId = await mintDomain({
      unsRegistry,
      owner: coinbase,
      labels: [domainName, 'wallet'],
      withoutReverse: true,
    });

    // mint .crypto
    cryptoTokenId = await mintDomain({
      unsRegistry,
      owner: coinbase,
      labels: [domainName, 'crypto'],
      withoutReverse: true,
    });

    proxyReader = await new ProxyReader__factory(coinbase).deploy();
    await proxyReader.initialize(unsRegistry.getAddress(), ZERO_ADDRESS);
  });

  it('should support IERC165 interface', async () => {
    /*
     * bytes4(keccak256(abi.encodePacked('supportsInterface(bytes4)'))) == 0x01ffc9a7
     */
    expect(await proxyReader.supportsInterface('0x01ffc9a7')).to.be.equal(true);
  });

  describe('IRegistryReader', () => {
    it('should support IRegistryReader interface', async () => {
      const functions = [
        'tokenURI',
        'isApprovedOrOwner',
        'resolverOf',
        'namehash',
        'balanceOf',
        'ownerOf',
        'getApproved',
        'isApprovedForAll',
        'exists',
        'reverseOf',
        'reverseNameOf',
      ];

      const interfaceId = getInterfaceId(proxyReader, functions);
      expect(await proxyReader.supportsInterface(interfaceId)).to.be.equal(true);
    });

    it('should revert isApprovedForAll call', async () => {
      await expect(proxyReader.isApprovedForAll(accounts[0], accounts[1])).to.be.revertedWith(
        'ProxyReader: UNSUPPORTED_METHOD',
      );
    });

    describe('getApproved', () => {
      it('should return approved zero-address .wallet domain', async () => {
        const proxyResult = await proxyReader.getApproved(walletTokenId);
        const resolverResult = await unsRegistry.getApproved(walletTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(ZERO_ADDRESS);
      });

      it('should return approved zero-address .crypto domain', async () => {
        const proxyResult = await proxyReader.getApproved(cryptoTokenId);
        const resolverResult = await unsRegistry.getApproved(cryptoTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(ZERO_ADDRESS);
      });

      it('should return approved address .wallet domain', async () => {
        await unsRegistry.approve(accounts[0], walletTokenId);

        const proxyResult = await proxyReader.getApproved(walletTokenId);
        const resolverResult = await unsRegistry.getApproved(walletTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(accounts[0]);
      });

      it('should return approved address .crypto domain', async () => {
        await unsRegistry.approve(accounts[0], cryptoTokenId);

        const proxyResult = await proxyReader.getApproved(cryptoTokenId);
        const resolverResult = await unsRegistry.getApproved(cryptoTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(accounts[0]);
      });

      it('should return zero address when token does not exist', async () => {
        const proxyResult = await proxyReader.getApproved(1);
        expect(proxyResult).to.be.equal(ZERO_ADDRESS);
      });
    });

    describe('isApprovedOrOwner', () => {
      it('should return false for not-approved .wallet domain', async () => {
        const proxyResult = await proxyReader.isApprovedOrOwner(accounts[1], walletTokenId);
        const resolverResult = await unsRegistry.isApprovedOrOwner(accounts[1], walletTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(false);
      });

      it('should return false for not-approved .crypto domain', async () => {
        const proxyResult = await proxyReader.isApprovedOrOwner(accounts[1], cryptoTokenId);
        const resolverResult = await unsRegistry.isApprovedOrOwner(accounts[1], cryptoTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(false);
      });

      it('should return whether approved address .wallet domain', async () => {
        await unsRegistry.approve(accounts[0], walletTokenId);

        const proxyResult = await proxyReader.isApprovedOrOwner(accounts[0], walletTokenId);
        const resolverResult = await unsRegistry.isApprovedOrOwner(accounts[0], walletTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(true);
      });

      it('should return whether approved address .crypto domain', async () => {
        await unsRegistry.approve(accounts[0], cryptoTokenId);

        const proxyResult = await proxyReader.isApprovedOrOwner(accounts[0], cryptoTokenId);
        const resolverResult = await unsRegistry.isApprovedOrOwner(accounts[0], cryptoTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(true);
      });

      it('should return false value when token does not exist', async () => {
        const proxyResult = await proxyReader.isApprovedOrOwner(accounts[0], 1);
        expect(proxyResult).to.be.equal(false);
      });
    });

    describe('ownerOf', () => {
      it('should return empty owner for unknown domain', async () => {
        const unknownTokenId = await unsRegistry.namehash(['unknown', 'crypto']);
        const owners = await proxyReader.ownerOf.staticCall(unknownTokenId);
        expect(owners).to.be.equal(ZERO_ADDRESS);
      });

      it('should return owner of .wallet domain', async () => {
        const proxyResult = await proxyReader.ownerOf(walletTokenId);
        const resolverResult = await unsRegistry.ownerOf(walletTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(coinbase.address);
      });

      it('should return owner of .crypto domain', async () => {
        const proxyResult = await proxyReader.ownerOf(cryptoTokenId);
        const resolverResult = await unsRegistry.ownerOf(cryptoTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(coinbase.address);
      });
    });

    describe('resolverOf', () => {
      it('should return resolver of .wallet domain', async () => {
        const proxyResult = await proxyReader.resolverOf(walletTokenId);
        const resolverResult = await unsRegistry.resolverOf(walletTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(await unsRegistry.getAddress());
      });

      it('should return resolver of .crypto domain', async () => {
        const proxyResult = await proxyReader.resolverOf(cryptoTokenId);
        const resolverResult = await unsRegistry.resolverOf(cryptoTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(await unsRegistry.getAddress());
      });

      it('should return false value when token does not exist', async () => {
        const proxyResult = await proxyReader.resolverOf(1);
        expect(proxyResult).to.be.equal(ZERO_ADDRESS);
      });
    });

    describe('tokenURI', () => {
      it('should return tokenURI of .wallet domain', async () => {
        const proxyResult = await proxyReader.tokenURI(walletTokenId);
        const resolverResult = await unsRegistry.tokenURI(walletTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(
          '/40559307672254207728557027035302885851369665055277251407821151545011532191308',
        );
      });

      it('should return tokenURI of .crypto domain', async () => {
        const proxyResult = await proxyReader.tokenURI(cryptoTokenId);
        const resolverResult = await unsRegistry.tokenURI(cryptoTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(
          '/107771857897517834290909154724501010203356272148473478760301214125032721342346',
        );
      });

      it('should return empty tokenURI when token does not exist', async () => {
        const proxyResult = await proxyReader.tokenURI(1);
        expect(proxyResult).to.be.equal('');
      });
    });

    describe('namehash', () => {
      it('should return namehash of .wallet domain', async () => {
        const proxyResult = await proxyReader.namehash(['test', 'wallet']);
        const resolverResult = await unsRegistry.namehash(['test', 'wallet']);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(
          '50586162622368517199428676025463367639931450566950616867100918499864570754504',
        );
      });

      it('should return namehash of .crypto domain', async () => {
        const proxyResult = await proxyReader.namehash(['test', 'crypto']);
        const resolverResult = await unsRegistry.namehash(['test', 'crypto']);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(
          '82856763987730893573226808376519199326595862773989062576563108342755511775491',
        );
      });
    });

    describe('balanceOf', () => {
      it('should aggregate balance from all registries', async () => {
        const _domainName = 'hey_hoy_23bkkcbv';
        const account = accounts[7];
        await mintDomain({ unsRegistry, owner: account, labels: [_domainName, 'crypto'] });
        await mintDomain({ unsRegistry, owner: account, labels: [_domainName, 'wallet'] });

        const proxyResult = await proxyReader.balanceOf(account);
        const result = await unsRegistry.balanceOf(account);
        expect(proxyResult).to.be.equal(result);
      });
    });

    describe('exists', () => {
      it('should return false for zero tokenId', async () => {
        expect(await proxyReader.exists(0)).to.be.equal(false);
      });

      it('should return false for unknown .wallet domain', async () => {
        const unknownTokenId = await unsRegistry.namehash(['unknown', 'wallet']);

        expect(await proxyReader.exists(unknownTokenId)).to.be.equal(false);
      });

      it('should return false for unknown .crypto domain', async () => {
        const unknownTokenId = await unsRegistry.namehash(['unknown', 'crypto']);

        expect(await proxyReader.exists(unknownTokenId)).to.be.equal(false);
      });

      it('should return true for .wallet domain', async () => {
        const tokenId = await mintDomain({ unsRegistry, owner: accounts[3], labels: ['hey_hoy_97hds', 'wallet'] });
        expect(await proxyReader.exists(tokenId)).to.be.equal(true);
      });

      it('should return true for .crypto domain', async () => {
        const tokenId = await mintDomain({ unsRegistry, owner: accounts[3], labels: ['hey_hoy_97hds', 'crypto'] });
        expect(await proxyReader.exists(tokenId)).to.be.equal(true);
      });

      it('should return true for .crypto TLD', async () => {
        expect(await proxyReader.exists(TLD.crypto.hash)).to.be.equal(true);
      });

      it('should return true for .wallet TLD', async () => {
        expect(await proxyReader.exists(TLD.wallet.hash)).to.be.equal(true);
      });
    });

    describe('reverseOf', () => {
      it('should return empty reverse record when it is not set', async () => {
        expect(await proxyReader.reverseOf(coinbase.address)).to.be.equal(0);
        expect(await proxyReader.reverseNameOf(coinbase.address)).to.be.equal('');
      });

      it('should return reverse record', async () => {
        const owner = signers[3];
        const labels = ['hey_hoy_11sfg', 'wallet'];
        const uri = labels.join('.');
        const tokenId = await mintDomain({ unsRegistry, owner, labels: ['hey_hoy_11sfg', 'wallet'] });
        await unsRegistry.connect(owner)['setReverse(string[])'](labels);

        expect(await proxyReader.reverseOf(owner.address)).to.be.equal(tokenId);
        expect(await proxyReader.reverseNameOf(owner.address)).to.be.equal(uri);
      });
    });
  });

  describe('IRecordReader', () => {
    it('should support IRecordReader interface', async () => {
      const functions = ['get', 'getByHash', 'getMany', 'getManyByHash'];

      const interfaceId = getInterfaceId(proxyReader, functions);
      expect(await proxyReader.supportsInterface(interfaceId)).to.be.equal(true);
    });

    describe('get', () => {
      it('should return value of record for .wallet domain', async () => {
        await unsRegistry.set('get_key_39', 'value1', walletTokenId);

        const proxyResult = await proxyReader.get('get_key_39', walletTokenId);
        const resolverResult = await unsRegistry.get('get_key_39', walletTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal('value1');
      });

      it('should return value of record for .crypto domain', async () => {
        await unsRegistry.set('get_key_134', 'value12', cryptoTokenId);

        const proxyResult = await proxyReader.get('get_key_134', cryptoTokenId);
        const resolverResult = await unsRegistry.get('get_key_134', cryptoTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal('value12');
      });
    });

    describe('getMany', () => {
      it('should return list with empty value for unregistered key', async () => {
        const result = await proxyReader.getMany([keys[0]], walletTokenId);

        expect(result.length).to.be.equal(1);
        expect(result[0]).to.be.equal('');
      });

      it('should return list with single value for .wallet domain', async () => {
        const [key] = keys;
        const [value] = values;
        await unsRegistry.set(key, value, walletTokenId);

        const proxyResult = await proxyReader.getMany([key], walletTokenId);
        const resolverResult = await unsRegistry.getMany([key], walletTokenId);

        expect(proxyResult).to.be.eql(resolverResult);
        expect(resolverResult).to.be.eql([value]);
      });

      it('should return list with single value for .crypto domain', async () => {
        const [key] = keys;
        const [value] = values;
        await unsRegistry.set(key, value, cryptoTokenId);

        const proxyResult = await proxyReader.getMany([key], cryptoTokenId);
        const resolverResult = await unsRegistry.getMany([key], cryptoTokenId);

        expect(proxyResult).to.be.eql(resolverResult);
        expect(resolverResult).to.be.eql([value]);
      });

      it('should return list with multiple values for .wallet domain', async () => {
        for (let i = 0; i < keys.length; i++) {
          await unsRegistry.set(keys[i], values[i], walletTokenId);
        }

        const result = await proxyReader.getMany(keys, walletTokenId);
        expect(result).to.be.eql(values);
      });

      it('should return list with multiple values for .crypto domain', async () => {
        for (let i = 0; i < keys.length; i++) {
          await unsRegistry.set(keys[i], values[i], cryptoTokenId);
        }

        const result = await proxyReader.getMany(keys, cryptoTokenId);
        expect(result).to.be.eql(values);
      });
    });

    describe('getByHash', () => {
      it('should return value of record for .wallet domain', async () => {
        const keyHash = id('get_key_4235');
        await unsRegistry.set('get_key_4235', 'value1454', walletTokenId);

        const proxyResult = await proxyReader.getByHash(keyHash, walletTokenId);
        const resolverResult = await unsRegistry.getByHash(keyHash, walletTokenId);

        expect(proxyResult).to.be.eql(resolverResult);
        expect(resolverResult).to.be.eql(['get_key_4235', 'value1454']);
      });

      it('should return value of record for .crypto domain', async () => {
        const keyHash = id('get_key_0946');
        await unsRegistry.set('get_key_0946', 'value4521', cryptoTokenId);

        const proxyResult = await proxyReader.getByHash(keyHash, cryptoTokenId);
        const resolverResult = await unsRegistry.getByHash(keyHash, cryptoTokenId);

        expect(proxyResult).to.be.eql(resolverResult);
        expect(resolverResult).to.be.eql(['get_key_0946', 'value4521']);
      });
    });

    describe('getManyByHash', () => {
      it('should return list with empty value for unregistered key', async () => {
        const keyHash = id('key_aaaaaa');
        const result = await proxyReader.getManyByHash([keyHash], walletTokenId);
        expect(result[0]).to.be.eql(['']);
      });

      it('should return list with single value for .wallet domain', async () => {
        const [key] = keys;
        const [value] = values;
        const keyHash = id(key);
        await unsRegistry.set(key, value, walletTokenId);

        const proxyResult = await proxyReader.getManyByHash([keyHash], walletTokenId);
        const resolverResult = await unsRegistry.getManyByHash([keyHash], walletTokenId);

        expect(proxyResult).to.be.eql(resolverResult);
        expect(resolverResult).to.be.eql([[key], [value]]);
      });

      it('should return list with single value for .crypto domain', async () => {
        const [key] = keys;
        const [value] = values;
        const keyHash = id(key);
        await unsRegistry.set(key, value, cryptoTokenId);

        const proxyResult = await proxyReader.getManyByHash([keyHash], cryptoTokenId);
        const resolverResult = await unsRegistry.getManyByHash([keyHash], cryptoTokenId);

        expect(proxyResult).to.be.eql(resolverResult);
        expect(resolverResult).to.be.eql([[key], [value]]);
      });
    });
  });

  describe('IDataReader', () => {
    it('should support IDataReader interface', async () => {
      const functions = ['getData', 'getDataForMany', 'getDataByHash', 'getDataByHashForMany', 'ownerOfForMany'];

      const interfaceId = getInterfaceId(proxyReader, functions);
      expect(await proxyReader.supportsInterface(interfaceId)).to.be.equal(true);
    });

    describe('getData', () => {
      it('should return empty data for non-existing .wallet domain', async () => {
        // arrange
        const _domainName = 'hey_hoy_1037';
        const _tokenId = await unsRegistry.namehash([_domainName, 'wallet']);

        // act
        const data = await proxyReader.getData.staticCall(keys, _tokenId);

        // asserts
        expect(data).to.be.eql([ZERO_ADDRESS, ZERO_ADDRESS, ['', '']]);
      });

      it('should return empty data for non-existing .crypto domain', async () => {
        // arrange
        const _domainName = 'hey_hoy_1037';
        const _tokenId = await unsRegistry.namehash([_domainName, 'crypto']);

        // act
        const data = await proxyReader.getData.staticCall(keys, _tokenId);

        // asserts
        expect(data).to.be.eql([ZERO_ADDRESS, ZERO_ADDRESS, ['', '']]);
      });

      it('should return data for .crypto domain', async () => {
        // arrange
        const tokenId = await mintDomain({ unsRegistry, owner: coinbase.address, labels: ['hey_hoy_121', 'crypto'] });

        // act
        const data = await proxyReader.getData.staticCall(keys, tokenId);

        // asserts
        expect(data).to.be.eql([await unsRegistry.getAddress(), coinbase.address, ['', '']]);
      });

      it('should return data for .wallet domain', async () => {
        // arrange
        const tokenId = await mintDomain({ unsRegistry, owner: coinbase.address, labels: ['hey_hoy_121', 'wallet'] });

        // act
        const data = await proxyReader.getData.staticCall(keys, tokenId);

        // asserts
        expect(data).to.be.eql([await unsRegistry.getAddress(), coinbase.address, ['', '']]);
      });
    });

    describe('getDataForMany', () => {
      it('should return empty lists for empty list of domains', async () => {
        const data = await proxyReader.getDataForMany.staticCall([], []);

        expect(data).to.be.eql([[], [], []]);
      });

      it('should return empty data for non-existing .crypto|.wallet domains', async () => {
        // arrange
        const _domainName = 'hey_hoy_1037';
        const _walletTokenId = await unsRegistry.namehash([_domainName, 'wallet']);
        const _cryptoTokenId = await unsRegistry.namehash([_domainName, 'crypto']);

        // act
        const data = await proxyReader.getDataForMany.staticCall(keys, [_walletTokenId, _cryptoTokenId]);

        // asserts
        expect(data).to.be.eql([
          [ZERO_ADDRESS, ZERO_ADDRESS],
          [ZERO_ADDRESS, ZERO_ADDRESS],
          [
            ['', ''],
            ['', ''],
          ],
        ]);
      });

      it('should return data for multiple .crypto|.wallet domains', async () => {
        // arrange
        const _domainName = 'test_1291';
        const _walletTokenId = await mintDomain({ unsRegistry, owner: coinbase, labels: [_domainName, 'wallet'] });
        const _cryptoTokenId = await mintDomain({ unsRegistry, owner: coinbase, labels: [_domainName, 'crypto'] });

        for (let i = 0; i < keys.length; i++) {
          await unsRegistry.set(keys[i], values[i], _walletTokenId);
          await unsRegistry.set(keys[i], values[i], _cryptoTokenId);
        }

        // act
        const data = await proxyReader.getDataForMany.staticCall(keys, [_walletTokenId, _cryptoTokenId]);

        // assert
        expect(data).to.be.eql([
          [await unsRegistry.getAddress(), await unsRegistry.getAddress()],
          [coinbase.address, coinbase.address],
          [
            ['test.value1', 'test.value2'],
            ['test.value1', 'test.value2'],
          ],
        ]);
      });

      it('should return owners for multiple tokens (including unknown)', async () => {
        // arrange
        const unknownTokenId = await unsRegistry.namehash(['unknown', 'crypto']);

        // act
        const data = await proxyReader.getDataForMany.staticCall([], [walletTokenId, unknownTokenId]);

        // assert
        expect(data).to.be.eql([
          [await unsRegistry.getAddress(), ZERO_ADDRESS],
          [coinbase.address, ZERO_ADDRESS],
          [[], []],
        ]);
      });
    });

    describe('getDataByHash', () => {
      it('should return empty data for non-existing .wallet domain', async () => {
        // arrange
        const hashes = keys.map(id);
        const _domainName = 'hey_hoy_29224';
        const _tokenId = await unsRegistry.namehash([_domainName, 'wallet']);

        // act
        const data = await proxyReader.getDataByHash.staticCall(hashes, _tokenId);

        // asserts
        expect(data).to.be.eql([ZERO_ADDRESS, ZERO_ADDRESS, keys, ['', '']]);
      });

      it('should return empty data for non-existing .crypto domain', async () => {
        // arrange
        const hashes = keys.map(id);
        const _domainName = 'hey_hoy_29228';
        const _tokenId = await unsRegistry.namehash([_domainName, 'crypto']);

        // act
        const data = await proxyReader.getDataByHash.staticCall(hashes, _tokenId);

        // asserts
        expect(data).to.be.eql([ZERO_ADDRESS, ZERO_ADDRESS, keys, ['', '']]);
      });

      it('should return data by hashes for .crypto domain', async () => {
        // arrange
        const hashes = keys.map(id);
        const tokenId = await mintDomain({ unsRegistry, owner: coinbase.address, labels: ['hey_hoy_292', 'crypto'] });
        for (let i = 0; i < keys.length; i++) {
          await unsRegistry.set(keys[i], values[i], tokenId);
        }

        // act
        const data = await proxyReader.getDataByHash.staticCall(hashes, tokenId);

        // assert
        expect(data).to.be.eql([await unsRegistry.getAddress(), coinbase.address, keys, values]);
      });

      it('should return data by hashes for .wallet domain', async () => {
        // arrange
        const hashes = keys.map(id);
        const tokenId = await mintDomain({ unsRegistry, owner: coinbase.address, labels: ['hey_hoy_292', 'wallet'] });
        for (let i = 0; i < keys.length; i++) {
          await unsRegistry.set(keys[i], values[i], tokenId);
        }

        // act
        const data = await proxyReader.getDataByHash.staticCall(hashes, tokenId);

        // assert
        expect(data).to.be.eql([await unsRegistry.getAddress(), coinbase.address, keys, values]);
      });
    });

    describe('getDataByHashForMany', () => {
      it('should return empty lists for empty list of domains', async () => {
        const data = await proxyReader.getDataByHashForMany.staticCall([], []);

        expect(data).to.be.eql([[], [], [], []]);
      });

      it('should return empty data for non-existing .crypto|.wallet domains', async () => {
        // arrange
        const hashes = keys.map(id);
        const _domainName = 'hey_hoy_1037';
        const _walletTokenId = await unsRegistry.namehash([_domainName, 'wallet']);
        const _cryptoTokenId = await unsRegistry.namehash([_domainName, 'crypto']);

        // act
        const data = await proxyReader.getDataByHashForMany.staticCall(hashes, [_walletTokenId, _cryptoTokenId]);

        // asserts
        expect(data).to.be.eql([
          [ZERO_ADDRESS, ZERO_ADDRESS],
          [ZERO_ADDRESS, ZERO_ADDRESS],
          [keys, keys],
          [
            ['', ''],
            ['', ''],
          ],
        ]);
      });

      it('should return data for multiple .crypto|.wallet domains', async () => {
        // arrange
        const hashes = keys.map(id);
        const _domainName = 'test_1082q';
        const _walletTokenId = await mintDomain({ unsRegistry, owner: coinbase, labels: [_domainName, 'wallet'] });
        const _cryptoTokenId = await mintDomain({ unsRegistry, owner: coinbase, labels: [_domainName, 'crypto'] });

        for (let i = 0; i < keys.length; i++) {
          await unsRegistry.set(keys[i], values[i], _walletTokenId);
          await unsRegistry.set(keys[i], values[i], _cryptoTokenId);
        }

        // act
        const data = await proxyReader.getDataByHashForMany.staticCall(hashes, [_walletTokenId, _cryptoTokenId]);

        // assert
        expect(data).to.be.eql([
          [await unsRegistry.getAddress(), await unsRegistry.getAddress()],
          [coinbase.address, coinbase.address],
          [
            ['test.key1', 'test.key2'],
            ['test.key1', 'test.key2'],
          ],
          [
            ['test.value1', 'test.value2'],
            ['test.value1', 'test.value2'],
          ],
        ]);
      });

      it('should return owners for multiple domains (including unknown)', async () => {
        // arrange
        const unknownTokenId = await unsRegistry.namehash(['unknown', 'crypto']);

        // act
        const data = await proxyReader.getDataByHashForMany.staticCall([], [walletTokenId, unknownTokenId]);

        // assert
        expect(data).to.be.eql([
          [await unsRegistry.getAddress(), ZERO_ADDRESS],
          [coinbase.address, ZERO_ADDRESS],
          [[], []],
          [[], []],
        ]);
      });
    });

    describe('ownerOfForMany', () => {
      it('should return empty owner for unknown domain', async () => {
        const unknownTokenId = await unsRegistry.namehash(['unknown', 'crypto']);
        const owners = await proxyReader.ownerOfForMany.staticCall([unknownTokenId]);
        expect(owners).to.be.eql([ZERO_ADDRESS]);
      });

      it('should return empty list for empty list of domains', async () => {
        const owners = await proxyReader.ownerOfForMany.staticCall([]);
        expect(owners).to.be.eql([]);
      });

      it('should return owners for multiple .crypto|.wallet domains', async () => {
        // arrange
        const _domainName = 'test_125t';
        const _walletTokenId = await mintDomain({ unsRegistry, owner: accounts[0], labels: [_domainName, 'wallet'] });
        const _cryptoTokenId = await mintDomain({ unsRegistry, owner: coinbase, labels: [_domainName, 'crypto'] });

        // act
        const owners = await proxyReader.ownerOfForMany.staticCall([walletTokenId, _walletTokenId, _cryptoTokenId]);

        // assert
        expect(owners).to.be.eql([coinbase.address, accounts[0], coinbase.address]);
      });

      it('should return owners for multiple domains (including unknown)', async () => {
        // arrange
        const unknownTokenId = await unsRegistry.namehash(['unknown', 'crypto']);

        // act
        const owners = await proxyReader.ownerOfForMany.staticCall([walletTokenId, unknownTokenId]);

        // assert
        expect(owners).to.be.eql([coinbase.address, ZERO_ADDRESS]);
      });
    });
  });

  describe('IAddressReader', () => {
    const usdcLegacyKey = 'crypto.USDC.address';
    const usdcEthLegacyKey = 'crypto.USDC.version.ETH.address';
    const usdcMaticLegacyKey = 'crypto.USDC.version.MATIC.address';

    const ethLegacyKey = 'crypto.ETH.address';

    beforeEach(async () => {
      await proxyReader['addBlockchainNetworks(string[],string[])'](['MATIC', 'ETH'], ['ETH', 'ETH']);

      await proxyReader.addLegacyRecords(['token.ETH.MATIC.USDC.address'], [[usdcMaticLegacyKey, usdcLegacyKey]]);
      await proxyReader.addLegacyRecords(['token.ETH.ETH.USDC.address'], [[usdcEthLegacyKey, usdcLegacyKey]]);

      await proxyReader.addLegacyRecords(['token.ETH.ETH.ETH.address'], [[ethLegacyKey]]);
    });

    afterEach(async () => {
      await unsRegistry.reset(walletTokenId);
    });

    it('should support IAddressReader interface', async () => {
      const functions = ['getAddressKeys', 'getAddress', 'getAddressKey'];
      const interfaceId = getInterfaceId(proxyReader, functions);

      expect(await proxyReader.supportsInterface(interfaceId)).to.be.equal(true);
    });

    describe('getAddressKeys', () => {
      it('returns the list of address keys and legacy keys in the correct order', async () => {
        expect(await proxyReader.getAddressKeys('ETH', 'USDC')).to.deep.equal([
          'token.ETH.ETH.USDC.address',
          usdcEthLegacyKey,
          usdcLegacyKey,
          'token.ETH.ETH.address',
          'token.ETH.address',
        ]);

        expect(await proxyReader.getAddressKeys('MATIC', 'USDC')).to.deep.equal([
          'token.ETH.MATIC.USDC.address',
          usdcMaticLegacyKey,
          usdcLegacyKey,
          'token.ETH.MATIC.address',
          'token.ETH.address',
        ]);

        expect(await proxyReader.getAddressKeys('ETH', 'ETH')).to.deep.equal([
          'token.ETH.ETH.ETH.address',
          ethLegacyKey,
          'token.ETH.ETH.address',
          'token.ETH.address',
        ]);
      });

      it('returns the list of address keys without legacy keys if they are not defined', async () => {
        expect(await proxyReader.getAddressKeys('ETH', 'USDT')).to.deep.equal([
          'token.ETH.ETH.USDT.address',
          'token.ETH.ETH.address',
          'token.ETH.address',
        ]);

        expect(await proxyReader.getAddressKeys('MATIC', 'MATIC')).to.deep.equal([
          'token.ETH.MATIC.MATIC.address',
          'token.ETH.MATIC.address',
          'token.ETH.address',
        ]);
      });

      it('returns empty list when family is not defined', async () => {
        expect(await proxyReader.getAddressKeys('UDTOKEN', 'UDTOKEN')).to.deep.equal([]);
      });
    });

    describe('getAddress', () => {
      const getAddress = async (network: string, token: string, tokenId: bigint) => {
        return await proxyReader.getFunction('getAddress')(network, token, tokenId);
      };

      it('should return most specific record by address keys', async () => {
        const [tokenKey, legacyTokenKey1, legacyTokenKey2, networkKey, familyKey] = await proxyReader.getAddressKeys(
          'ETH',
          'USDC',
        );

        await unsRegistry.set(familyKey, 'family-level-record', walletTokenId);
        expect(await getAddress('ETH', 'USDC', walletTokenId)).to.equal('family-level-record');

        await unsRegistry.set(networkKey, 'network-level-record', walletTokenId);
        expect(await getAddress('ETH', 'USDC', walletTokenId)).to.equal('network-level-record');

        await unsRegistry.set(legacyTokenKey2, 'legacy-key-2-record', walletTokenId);
        expect(await getAddress('ETH', 'USDC', walletTokenId)).to.equal('legacy-key-2-record');

        await unsRegistry.set(legacyTokenKey1, 'legacy-key-1-record', walletTokenId);
        expect(await getAddress('ETH', 'USDC', walletTokenId)).to.equal('legacy-key-1-record');

        await unsRegistry.set(tokenKey, 'token-level-record', walletTokenId);
        expect(await getAddress('ETH', 'USDC', walletTokenId)).to.equal('token-level-record');
      });

      it('should return most specific record by address keys with skipped levels', async () => {
        const [tokenKey, legacyTokenKey, , , familyKey] = await proxyReader.getAddressKeys('ETH', 'USDC');

        await unsRegistry.set(tokenKey, 'token-level-record', walletTokenId);
        expect(await getAddress('ETH', 'USDC', walletTokenId)).to.equal('token-level-record');

        await unsRegistry.set(familyKey, 'family-level-record', walletTokenId);
        expect(await getAddress('ETH', 'USDC', walletTokenId)).to.equal('token-level-record');

        await unsRegistry.set(tokenKey, '', walletTokenId);

        expect(await getAddress('ETH', 'USDC', walletTokenId)).to.equal('family-level-record');

        await unsRegistry.set(legacyTokenKey, 'legacy-key-1-record', walletTokenId);
        expect(await getAddress('ETH', 'USDC', walletTokenId)).to.equal('legacy-key-1-record');
      });

      it('should return empty string if family is not defined', async () => {
        expect(await getAddress('UDTOKEN', 'UDTOKEN', walletTokenId)).to.equal('');
      });

      it('should return empty string if token does not exist', async () => {
        expect(await getAddress('ETH', 'USDC', BigInt(42))).to.equal('');
      });
    });

    describe('getAddressKey', () => {
      it('should return most specific record key by address keys', async () => {
        const [tokenKey, legacyTokenKey, networkKey, familyKey] = await proxyReader.getAddressKeys('ETH', 'USDC');

        await unsRegistry.set(familyKey, '42', walletTokenId);
        expect(await proxyReader.getAddressKey('ETH', 'USDC', walletTokenId)).to.equal(familyKey);

        await unsRegistry.set(networkKey, '42', walletTokenId);
        expect(await proxyReader.getAddressKey('ETH', 'USDC', walletTokenId)).to.equal(networkKey);

        await unsRegistry.set(legacyTokenKey, '42', walletTokenId);
        expect(await proxyReader.getAddressKey('ETH', 'USDC', walletTokenId)).to.equal(legacyTokenKey);

        await unsRegistry.set(tokenKey, '42', walletTokenId);
        expect(await proxyReader.getAddressKey('ETH', 'USDC', walletTokenId)).to.equal(tokenKey);
      });

      it('should return most specific record key by address keys with skipped levels', async () => {
        const [tokenKey, legacyTokenKey, , , familyKey] = await proxyReader.getAddressKeys('ETH', 'USDC');

        await unsRegistry.set(tokenKey, '42', walletTokenId);
        expect(await proxyReader.getAddressKey('ETH', 'USDC', walletTokenId)).to.equal(tokenKey);

        await unsRegistry.set(familyKey, '42', walletTokenId);
        expect(await proxyReader.getAddressKey('ETH', 'USDC', walletTokenId)).to.equal(tokenKey);

        await unsRegistry.set(tokenKey, '', walletTokenId);

        expect(await proxyReader.getAddressKey('ETH', 'USDC', walletTokenId)).to.equal(familyKey);

        await unsRegistry.set(legacyTokenKey, '42', walletTokenId);
        expect(await proxyReader.getAddressKey('ETH', 'USDC', walletTokenId)).to.equal(legacyTokenKey);
      });

      it('should return empty string if token does not exist', async () => {
        expect(await proxyReader.getAddressKey('ETH', 'USDC', 0x42)).to.equal('');
      });

      it('should return empty string if family is not defined', async () => {
        expect(await proxyReader.getAddressKey('UDTOKEN', 'UDTOKEN', walletTokenId)).to.equal('');
      });
    });
  });

  describe('registryOf', () => {
    it('should return zero for zero tokenId', async () => {
      const address = await proxyReader.registryOf(0);
      expect(address).to.be.equal(ZERO_ADDRESS);
    });

    it('should return error for unknown .wallet domain', async () => {
      const unknownTokenId = await unsRegistry.namehash(['unknown', 'wallet']);
      const address = await proxyReader.registryOf(unknownTokenId);
      expect(address).to.be.equal(ZERO_ADDRESS);
    });

    it('should return error for unknown .crypto domain', async () => {
      const unknownTokenId = await unsRegistry.namehash(['unknown', 'crypto']);
      const address = await proxyReader.registryOf(unknownTokenId);
      expect(address).to.be.equal(ZERO_ADDRESS);
    });

    it('should return value for .wallet domain', async () => {
      const tokenId = await mintDomain({ unsRegistry, owner: accounts[3], labels: ['hey_hoy_98hds', 'wallet'] });
      const address = await proxyReader.registryOf(tokenId);
      expect(address).to.be.equal(await unsRegistry.getAddress());
    });

    it('should return value for .crypto domain', async () => {
      const tokenId = await mintDomain({ unsRegistry, owner: accounts[3], labels: ['hey_hoy_98hds', 'crypto'] });
      const address = await proxyReader.registryOf(tokenId);
      expect(address).to.be.equal(await unsRegistry.getAddress());
    });

    it('should return value for .crypto TLD', async () => {
      const address = await proxyReader.registryOf(TLD.crypto.hash);
      expect(address).to.be.equal(await unsRegistry.getAddress());
    });

    it('should return value for .wallet TLD', async () => {
      const address = await proxyReader.registryOf(TLD.wallet.hash);
      expect(address).to.be.equal(await unsRegistry.getAddress());
    });
  });
});
