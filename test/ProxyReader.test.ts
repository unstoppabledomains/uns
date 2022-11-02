import { ethers } from 'hardhat';
import { expect } from 'chai';


import { utils, BigNumber } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Result } from 'ethers/lib/utils';
import { ProxyReader__factory, UNSRegistry__factory } from '../types/factories/contracts';
import { ProxyReader, UNSRegistry } from '../types/contracts';
import { CNSRegistry, Resolver } from '../types/dot-crypto/contracts';
import { MintingController } from '../types/dot-crypto/contracts/controllers';
import { CNSRegistry__factory, Resolver__factory } from '../types/factories/dot-crypto/contracts';
import { MintingController__factory } from '../types/factories/dot-crypto/contracts/controllers';
import { mintDomain } from './helpers/registry';
import { DEAD_ADDRESS, ZERO_ADDRESS, TLD } from './helpers/constants';
import { getInterfaceId } from './helpers/proxy';

describe('ProxyReader', () => {
  const domainName = 'test_42';
  const keys = ['test.key1', 'test.key2'];
  const values = ['test.value1', 'test.value2'];

  let unsRegistry: UNSRegistry;
  let cnsRegistry: CNSRegistry;
  let resolver: Resolver;
  let mintingController: MintingController;
  let proxyReader: ProxyReader;

  let signers: SignerWithAddress[], coinbase: SignerWithAddress, accounts: string[];

  let walletTokenId: BigNumber, cryptoTokenId: BigNumber;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;
    [, ...accounts] = signers.map(s => s.address);

    // deploy UNS
    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
    await unsRegistry.initialize(coinbase.address);
    await unsRegistry.setTokenURIPrefix('/');

    // deploy CNS
    cnsRegistry = await new CNSRegistry__factory(coinbase).deploy();
    mintingController = await new MintingController__factory(coinbase).deploy(cnsRegistry.address);
    await cnsRegistry.addController(mintingController.address);
    resolver = await new Resolver__factory(coinbase).deploy(cnsRegistry.address, mintingController.address);

    // mint .wallet TLD
    await unsRegistry.mintTLD(TLD.WALLET, 'wallet');

    // mint .wallet
    walletTokenId = await mintDomain(unsRegistry, coinbase.address, [domainName, 'wallet']);

    // mint .crypto
    cryptoTokenId = await unsRegistry.namehash([domainName, 'crypto']);
    await mintingController.mintSLDWithResolver(coinbase.address, domainName, resolver.address);

    proxyReader = await new ProxyReader__factory(coinbase).deploy(unsRegistry.address, cnsRegistry.address);
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
        'tokenURI', 'isApprovedOrOwner', 'resolverOf', 'namehash', 'balanceOf',
        'ownerOf', 'getApproved', 'isApprovedForAll', 'exists', 'reverseOf',
      ];

      const interfaceId = getInterfaceId(proxyReader, functions);

      expect(await proxyReader.supportsInterface(interfaceId)).to.be.equal(true);
    });

    it('should revert isApprovedForAll call', async () => {
      await expect(
        proxyReader.isApprovedForAll(accounts[0], accounts[1]),
      ).to.be.revertedWith('ProxyReader: UNSUPPORTED_METHOD');
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
        const resolverResult = await cnsRegistry.getApproved(cryptoTokenId);

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
        await cnsRegistry.approve(accounts[0], cryptoTokenId);

        const proxyResult = await proxyReader.getApproved(cryptoTokenId);
        const resolverResult = await cnsRegistry.getApproved(cryptoTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(accounts[0]);
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
        const resolverResult = await cnsRegistry.isApprovedOrOwner(accounts[1], cryptoTokenId);

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
        await cnsRegistry.approve(accounts[0], cryptoTokenId);

        const proxyResult = await proxyReader.isApprovedOrOwner(accounts[0], cryptoTokenId);
        const resolverResult = await cnsRegistry.isApprovedOrOwner(accounts[0], cryptoTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(true);
      });
    });

    describe('ownerOf', () => {
      it('should return empty owner for unknown domain', async () => {
        const unknownTokenId = await unsRegistry.namehash(['unknown', 'crypto']);
        const owners = await proxyReader.callStatic.ownerOf(unknownTokenId);

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
        const resolverResult = await cnsRegistry.ownerOf(cryptoTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(coinbase.address);
      });
    });

    describe('resolverOf', () => {
      it('should return resolver of .wallet domain', async () => {
        const proxyResult = await proxyReader.resolverOf(walletTokenId);
        const resolverResult = await unsRegistry.resolverOf(walletTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(unsRegistry.address);
      });

      it('should return resolver of .crypto domain', async () => {
        const proxyResult = await proxyReader.resolverOf(cryptoTokenId);
        const resolverResult = await cnsRegistry.resolverOf(cryptoTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(resolver.address);
      });
    });

    describe('tokenURI', () => {
      it('should return tokenURI of .wallet domain', async () => {
        const proxyResult = await proxyReader.tokenURI(walletTokenId);
        const resolverResult = await unsRegistry.tokenURI(walletTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be
          .equal('/40559307672254207728557027035302885851369665055277251407821151545011532191308');
      });

      it('should return tokenURI of .crypto domain', async () => {
        const proxyResult = await proxyReader.tokenURI(cryptoTokenId);
        const resolverResult = await cnsRegistry.tokenURI(cryptoTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal('test_42.crypto');
      });
    });

    describe('namehash', () => {
      it('should return namehash of .wallet domain', async () => {
        const proxyResult = await proxyReader.namehash(['test', 'wallet']);
        const resolverResult = await unsRegistry.namehash(['test', 'wallet']);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be
          .equal('50586162622368517199428676025463367639931450566950616867100918499864570754504');
      });

      it('should return namehash of .crypto domain', async () => {
        const proxyResult = await proxyReader.namehash(['test', 'crypto']);

        const resolverResult = await cnsRegistry.childIdOf(TLD.CRYPTO, 'test');

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be
          .equal('82856763987730893573226808376519199326595862773989062576563108342755511775491');
      });
    });

    describe('balanceOf', () => {
      it('should aggregate balance from all registries', async () => {
        const _domainName = 'hey_hoy_23bkkcbv';
        const account = accounts[7];
        await mintingController.mintSLD(account, _domainName);
        await mintDomain(unsRegistry, account, [_domainName, 'wallet']);

        const proxyResult = await proxyReader.balanceOf(account);
        const resolverResult1 = await unsRegistry.balanceOf(account);
        const resolverResult2 = await cnsRegistry.balanceOf(account);
        expect(proxyResult).to.be.equal(resolverResult1.add(resolverResult2));
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
        const unknownTokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, 'unknown');

        expect(await proxyReader.exists(unknownTokenId)).to.be.equal(false);
      });

      it('should return true for .wallet domain', async () => {
        const tokenId = await mintDomain(unsRegistry, accounts[3], ['hey_hoy_97hds', 'wallet']);
        expect(await proxyReader.exists(tokenId)).to.be.equal(true);
      });

      it('should return true for .crypto domain', async () => {
        const _domainName = 'hey_hoy_97hds';
        const cryptoTokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, _domainName);
        await mintingController.mintSLD(accounts[3], _domainName);

        expect(await proxyReader.exists(cryptoTokenId)).to.be.equal(true);
      });

      it('should return true for .crypto TLD', async () => {
        expect(await proxyReader.exists(TLD.CRYPTO)).to.be.equal(true);
      });

      it('should return true for .wallet TLD', async () => {
        expect(await proxyReader.exists(TLD.WALLET)).to.be.equal(true);
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
        await resolver.set('get_key_134', 'value12', cryptoTokenId);

        const proxyResult = await proxyReader.get('get_key_134', cryptoTokenId);
        const resolverResult = await resolver.get('get_key_134', cryptoTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal('value12');
      });

      it('should resolve empty record value for .crypto domain when token not found', async () => {
        const _tokenId = await unsRegistry.namehash(['test-sgh-q1', 'crypto']);

        const proxyResult = await proxyReader.get('get_key_134', _tokenId);

        expect(proxyResult).to.be.equal('');
      });

      it('should resolve empty record value for .crypto domain when resolver not found', async () => {
        const tokenId = await unsRegistry.namehash(['test-sgh-q1', 'crypto']);
        await mintingController.mintSLD(coinbase.address, 'test-sgh-q1');

        const proxyResult = await proxyReader.get('get_key_134', tokenId);

        expect(proxyResult).to.be.equal('');
      });

      it('should resolve empty record value for .crypto domain when resolver is 0xdead', async () => {
        const tokenId = await unsRegistry.namehash(['test-sgh-q1-2', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q1-2', DEAD_ADDRESS);

        const proxyResult = await proxyReader.get('get_key_134', tokenId);

        expect(proxyResult).to.be.equal('');
      });

      it('should resolve empty record value for .crypto domain when resolver is EOA', async () => {
        const tokenId = await unsRegistry.namehash(['test-sgh-q1-3', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q1-3', coinbase.address);

        const proxyResult = await proxyReader.get('get_key_134', tokenId);

        expect(proxyResult).to.be.equal('');
      });

      it('should resolve empty record value for .crypto domain when resolver is not valid', async () => {
        const tokenId = await unsRegistry.namehash(['test-sgh-q1-4', 'crypto']);
        const nonResolverAddress = proxyReader.address;

        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q1-4', nonResolverAddress);

        const proxyResult = await proxyReader.get('get_key_134', tokenId);

        expect(proxyResult).to.be.equal('');
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
        await resolver.set(key, value, cryptoTokenId);

        const proxyResult = await proxyReader.getMany([key], cryptoTokenId);
        const resolverResult = await resolver.getMany([key], cryptoTokenId);

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
          await resolver.set(keys[i], values[i], cryptoTokenId);
        }

        const result = await proxyReader.getMany(keys, cryptoTokenId);
        expect(result).to.be.eql(values);
      });

      it('should resolve empty records value for .crypto domain when token not found', async () => {
        const tokenId = await unsRegistry.namehash(['test-sgh-q2', 'crypto']);

        const proxyResult = await proxyReader.getMany(keys, tokenId);

        expect(proxyResult).to.be.eql(['', '']);
      });

      it('should resolve empty records value for .crypto domain when resolver not found', async () => {
        const _tokenId = await unsRegistry.namehash(['test-sgh-q2', 'crypto']);
        await mintingController.mintSLD(coinbase.address, 'test-sgh-q2');

        const proxyResult = await proxyReader.getMany(keys, _tokenId);

        expect(proxyResult).to.be.eql(['', '']);
      });

      it('should resolve empty records value for .crypto domain when resolver is 0xdead', async () => {
        const _tokenId = await unsRegistry.namehash(['test-sgh-q2-2', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q2-2', DEAD_ADDRESS);

        const proxyResult = await proxyReader.getMany(keys, _tokenId);

        expect(proxyResult).to.be.eql(['', '']);
      });

      it('should resolve empty records value for .crypto domain when resolver is EOA', async () => {
        const _tokenId = await unsRegistry.namehash(['test-sgh-q2-3', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q2-3', coinbase.address);

        const proxyResult = await proxyReader.getMany(keys, _tokenId);

        expect(proxyResult).to.be.eql(['', '']);
      });

      it('should resolve empty records value for .crypto domain when resolver is not valid', async () => {
        const _tokenId = await unsRegistry.namehash(['test-sgh-q2-4', 'crypto']);
        const nonResolverAddress = proxyReader.address;

        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q2-4', nonResolverAddress);

        const proxyResult = await proxyReader.getMany(keys, _tokenId);

        expect(proxyResult).to.be.eql(['', '']);
      });
    });

    describe('getByHash', () => {
      it('should return value of record for .wallet domain', async () => {
        const keyHash = utils.id('get_key_4235');
        await unsRegistry.set('get_key_4235', 'value1454', walletTokenId);

        const proxyResult = await proxyReader.getByHash(keyHash, walletTokenId);
        const resolverResult = await unsRegistry.getByHash(keyHash, walletTokenId);

        expect(proxyResult).to.be.eql(resolverResult);
        expect(resolverResult).to.be.eql(['get_key_4235', 'value1454']);
      });

      it('should return value of record for .crypto domain', async () => {
        const keyHash = utils.id('get_key_0946');
        await resolver.set('get_key_0946', 'value4521', cryptoTokenId);

        const proxyResult = await proxyReader.getByHash(keyHash, cryptoTokenId);
        const resolverResult = await resolver.getByHash(keyHash, cryptoTokenId);

        expect(proxyResult).to.be.eql(resolverResult);
        expect(resolverResult).to.be.eql(['get_key_0946', 'value4521']);
      });

      it('should resolve empty record value for .crypto domain when token not found', async () => {
        const keyHash = utils.id('get_key_0946');
        const tokenId = await unsRegistry.namehash(['test-sgh-q3', 'crypto']);

        const proxyResult = await proxyReader.getByHash(keyHash, tokenId);

        expect(proxyResult).to.be.eql(['', '']);
      });

      it('should resolve empty record value for .crypto domain when resolver not found', async () => {
        const keyHash = utils.id('get_key_0946');
        const tokenId = await unsRegistry.namehash(['test-sgh-q3', 'crypto']);
        await mintingController.mintSLD(coinbase.address, 'test-sgh-q3');

        const proxyResult = await proxyReader.getByHash(keyHash, tokenId);

        expect(proxyResult).to.be.eql(['', '']);
      });

      it('should resolve empty record value for .crypto domain when resolver is 0xdead', async () => {
        const keyHash = utils.id('get_key_0946');
        const tokenId = await unsRegistry.namehash(['test-sgh-q3-2', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q3-2', DEAD_ADDRESS);

        const proxyResult = await proxyReader.getByHash(keyHash, tokenId);

        expect(proxyResult).to.be.eql(['', '']);
      });

      it('should resolve empty record value for .crypto domain when resolver is EOA', async () => {
        const keyHash = utils.id('get_key_0946');
        const tokenId = await unsRegistry.namehash(['test-sgh-q3-3', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q3-3', coinbase.address);

        const proxyResult = await proxyReader.getByHash(keyHash, tokenId);

        expect(proxyResult).to.be.eql(['', '']);
      });

      it('should resolve empty record value for .crypto domain when resolver is not valid', async () => {
        const keyHash = utils.id('get_key_0946');

        const tokenId = await unsRegistry.namehash(['test-sgh-q3-4', 'crypto']);
        const nonResolverAddress = proxyReader.address;

        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q3-4', nonResolverAddress);

        const proxyResult = await proxyReader.getByHash(keyHash, tokenId);

        expect(proxyResult).to.be.eql(['', '']);
      });
    });

    describe('getManyByHash', () => {
      it('should return list with empty value for unregistered key', async () => {
        const keyHash = utils.id('key_aaaaaa');
        const result = await proxyReader.getManyByHash([keyHash], walletTokenId);
        expect(result[0]).to.be.eql(['']);
      });

      it('should return list with single value for .wallet domain', async () => {
        const [key] = keys;
        const [value] = values;
        const keyHash = utils.id(key);
        await unsRegistry.set(key, value, walletTokenId);

        const proxyResult = await proxyReader.getManyByHash([keyHash], walletTokenId);
        const resolverResult = await unsRegistry.getManyByHash([keyHash], walletTokenId);

        expect(proxyResult).to.be.eql(resolverResult);
        expect(resolverResult).to.be.eql([[key], [value]]);
      });

      it('should return list with single value for .crypto domain', async () => {
        const [key] = keys;
        const [value] = values;
        const keyHash = utils.id(key);
        await resolver.set(key, value, cryptoTokenId);

        const proxyResult = await proxyReader.getManyByHash([keyHash], cryptoTokenId);
        const resolverResult = await resolver.getManyByHash([keyHash], cryptoTokenId);

        expect(proxyResult).to.be.eql(resolverResult);
        expect(resolverResult).to.be.eql([[key], [value]]);
      });

      it('should resolve empty records value for .crypto domain when token not found', async () => {
        const keyHash = utils.id(keys[0]);
        const tokenId = await unsRegistry.namehash(['test-sgh-q4', 'crypto']);

        const proxyResult = await proxyReader.getManyByHash([keyHash], tokenId);

        expect(proxyResult).to.be.eql([[''], ['']]);
      });

      it('should resolve empty records value for .crypto domain when resolver not found', async () => {
        const keyHash = utils.id(keys[0]);
        const tokenId = await unsRegistry.namehash(['test-sgh-q5', 'crypto']);
        await mintingController.mintSLD(coinbase.address, 'test-sgh-q5');

        const proxyResult = await proxyReader.getManyByHash([keyHash], tokenId);

        expect(proxyResult).to.be.eql([[''], ['']]);
      });

      it('should resolve empty records value for .crypto domain when resolver is 0xdead', async () => {
        const keyHash = utils.id(keys[0]);
        const tokenId = await unsRegistry.namehash([ 'test-sgh-q5-2', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q5-2', DEAD_ADDRESS);

        const proxyResult = await proxyReader.getManyByHash([keyHash], tokenId);

        expect(proxyResult).to.be.eql([[''], ['']]);
      });

      it('should resolve empty records value for .crypto domain when resolver is EOA', async () => {
        const keyHash = utils.id(keys[0]);
        const tokenId = await unsRegistry.namehash(['test-sgh-q5-3', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q5-3', coinbase.address);

        const proxyResult = await proxyReader.getManyByHash([keyHash], tokenId);

        expect(proxyResult).to.be.eql([[''], ['']]);
      });

      it('should resolve empty records value for .crypto domain when resolver is not valid', async () => {
        const keyHash = utils.id(keys[0]);

        const tokenId = await unsRegistry.namehash(['test-sgh-q5-4', 'crypto']);
        const nonResolverAddress = proxyReader.address;

        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q5-4', nonResolverAddress);

        const proxyResult = await proxyReader.getManyByHash([keyHash], tokenId);

        expect(proxyResult).to.be.eql([[''], ['']]);
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
        const tokenId = await unsRegistry.namehash(['hey_hoy_1037', 'wallet']);

        // act
        const data = await proxyReader.callStatic.getData(keys, tokenId);

        // asserts
        expect(data).to.be.eql([ZERO_ADDRESS, ZERO_ADDRESS, ['', '']]);
      });

      it('should return empty data for non-existing .crypto domain', async () => {
        // arrange
        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, 'hey_hoy_1037');

        // act
        const data = await proxyReader.callStatic.getData(keys, tokenId);

        // asserts
        expect(data).to.be.eql([ZERO_ADDRESS, ZERO_ADDRESS, ['', '']]);
      });

      it('should return data for .crypto domain', async () => {
        // arrange
        const _domainName = 'hey_hoy_121';
        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, _domainName);
        await mintingController.mintSLDWithResolver(coinbase.address, _domainName, resolver.address);

        // act
        const data = await proxyReader.callStatic.getData(keys, tokenId);

        // asserts
        expect(data).to.be.eql([resolver.address, coinbase.address, ['', '']]);
      });

      it('should return data for .wallet domain', async () => {
        // arrange
        const tokenId = await mintDomain(unsRegistry, coinbase.address, ['hey_hoy_121', 'wallet']);

        // act
        const data = await proxyReader.callStatic.getData(keys, tokenId);

        // asserts
        expect(data).to.be.eql([unsRegistry.address, coinbase.address, ['', '']]);
      });

      it('should return data for .crypto domain when resolver is 0xdead', async () => {
        const tokenId = await unsRegistry.namehash(['hey-hoy-re-2723', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'hey-hoy-re-2723', DEAD_ADDRESS);

        const data = await proxyReader.getData(keys, tokenId);

        expect(data).to.be.eql([DEAD_ADDRESS, coinbase.address, ['', '']]);
      });

      it('should return data for .crypto domain when resolver is EOA', async () => {
        const tokenId = await unsRegistry.namehash(['hey-hoy-re-3723', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'hey-hoy-re-3723', coinbase.address);

        const data = await proxyReader.getData(keys, tokenId);

        expect(data).to.be.eql([coinbase.address, coinbase.address, ['', '']]);
      });

      it('should return data for .crypto domain when resolver is not valid', async () => {
        const tokenId = await unsRegistry.namehash(['hey-hoy-re-4723', 'crypto']);
        const nonResolverAddress = proxyReader.address;

        await mintingController.mintSLDWithResolver(coinbase.address, 'hey-hoy-re-4723', nonResolverAddress);

        const data = await proxyReader.getData(keys, tokenId);

        expect(data).to.be.eql([nonResolverAddress, coinbase.address, ['', '']]);
      });
    });

    describe('getDataForMany', () => {
      it('should return empty lists for empty list of domains', async () => {
        const data = await proxyReader.callStatic.getDataForMany([], []);

        expect(data).to.be.eql([[], [], []]);
      });

      it('should return empty data for non-existing .crypto|.wallet domains', async () => {
        // arrange
        const _domainName = 'hey_hoy_1037';
        const _walletTokenId = await unsRegistry.namehash([_domainName, 'wallet']);
        const _cryptoTokenId = await unsRegistry.namehash([_domainName, 'crypto']);

        // act
        const data = await proxyReader.callStatic.getDataForMany(keys, [_walletTokenId, _cryptoTokenId]);

        // asserts
        expect(data).to.be.eql([[ZERO_ADDRESS, ZERO_ADDRESS], [ZERO_ADDRESS, ZERO_ADDRESS], [['', ''], ['', '']]]);
      });

      it('should return data for multiple .crypto|.wallet domains', async () => {
        // arrange
        const _domainName = 'test_1291';
        const _cryptoTokenId = await unsRegistry.namehash([_domainName, 'crypto']);
        const _walletTokenId = await mintDomain(unsRegistry, coinbase.address, [_domainName, 'wallet']);
        await mintingController.mintSLDWithResolver(coinbase.address, _domainName, resolver.address);
        for (let i = 0; i < keys.length; i++) {
          await resolver.set(keys[i], values[i], _cryptoTokenId);
          await unsRegistry.set(keys[i], values[i], _walletTokenId);
        }

        // act
        const data = await proxyReader.callStatic.getDataForMany(keys, [_walletTokenId, _cryptoTokenId]);

        // assert
        expect(data).to.be.eql([
          [unsRegistry.address, resolver.address],
          [coinbase.address, coinbase.address],
          [['test.value1', 'test.value2'], ['test.value1', 'test.value2']],
        ]);
      });

      it('should return owners for multiple tokens (including unknown)', async () => {
        // arrange
        const unknownTokenId = await unsRegistry.namehash(['unknown', 'crypto']);

        // act
        const data = await proxyReader.callStatic.getDataForMany([], [walletTokenId, unknownTokenId]);

        // assert
        expect(data).to.be.eql([
          [unsRegistry.address, ZERO_ADDRESS],
          [coinbase.address, ZERO_ADDRESS],
          [[], []],
        ]);
      });
    });

    describe('getDataByHash', () => {
      it('should return empty data for non-existing .wallet domain', async () => {
        // arrange
        const hashes = keys.map(utils.id);
        const _domainName = 'hey_hoy_29224';
        const _tokenId = await unsRegistry.namehash([_domainName, 'wallet']);

        // act
        const data = await proxyReader.callStatic.getDataByHash(hashes, _tokenId);

        // asserts
        expect(data).to.be.eql([ZERO_ADDRESS, ZERO_ADDRESS, ['', ''], ['', '']]);
      });

      it('should return empty data for non-existing .crypto domain', async () => {
        // arrange
        const hashes = keys.map(utils.id);
        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, 'hey_hoy_29228');

        // act
        const data = await proxyReader.callStatic.getDataByHash(hashes, tokenId);

        // asserts
        expect(data).to.be.eql([ZERO_ADDRESS, ZERO_ADDRESS, ['', ''], ['', '']]);
      });

      it('should return data by hashes for .crypto domain', async () => {
        // arrange
        const hashes = keys.map(utils.id);
        const _domainName = 'hey_hoy_292';
        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, _domainName);
        await mintingController.mintSLDWithResolver(coinbase.address, _domainName, resolver.address);
        for (let i = 0; i < keys.length; i++) {
          await resolver.set(keys[i], values[i], tokenId);
        }

        // act
        const data = await proxyReader.callStatic.getDataByHash(hashes, tokenId);

        // assert
        expect(data).to.be.eql([
          resolver.address,
          coinbase.address,
          keys,
          values,
        ]);
      });

      it('should return data by hashes for .wallet domain', async () => {
        // arrange
        const hashes = keys.map(utils.id);
        const tokenId = await mintDomain(unsRegistry, coinbase.address, ['hey_hoy_292', 'wallet']);
        for (let i = 0; i < keys.length; i++) {
          await unsRegistry.set(keys[i], values[i], tokenId);
        }

        // act
        const data = await proxyReader.callStatic.getDataByHash(hashes, tokenId);

        // assert
        expect(data).to.be.eql([
          unsRegistry.address,
          coinbase.address,
          keys,
          values,
        ]);
      });

      it('should return data for .crypto domain when resolver is 0xdead', async () => {
        const hashes = keys.map(utils.id);
        const tokenId = await unsRegistry.namehash(['hey-hoy-reh-2723', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'hey-hoy-reh-2723', DEAD_ADDRESS);

        const data = await proxyReader.getDataByHash(hashes, tokenId);

        expect(data).to.be.eql([DEAD_ADDRESS, coinbase.address, ['', ''], ['', '']]);
      });

      it('should return data for .crypto domain when resolver is EOA', async () => {
        const hashes = keys.map(utils.id);
        const tokenId = await unsRegistry.namehash(['hey-hoy-reh-3723', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'hey-hoy-reh-3723', coinbase.address);

        const data = await proxyReader.getDataByHash(hashes, tokenId);

        expect(data).to.be.eql([coinbase.address, coinbase.address, ['', ''], ['', '']]);
      });

      it('should return data for .crypto domain when resolver is not valid', async () => {
        const hashes = keys.map(utils.id);

        const tokenId = await unsRegistry.namehash(['hey-hoy-reh-4723', 'crypto']);
        const nonResolverAddress = proxyReader.address;

        await mintingController.mintSLDWithResolver(coinbase.address, 'hey-hoy-reh-4723', nonResolverAddress);

        const data = await proxyReader.getDataByHash(hashes, tokenId);

        expect(data).to.be.eql([nonResolverAddress, coinbase.address, ['', ''], ['', '']]);
      });
    });

    describe('getDataByHashForMany', () => {
      it('should return empty lists for empty list of domains', async () => {
        const data = await proxyReader.callStatic.getDataByHashForMany([], []);

        expect(data).to.be.eql([[], [], [], []]);
      });

      it('should return empty data for non-existing .crypto|.wallet domains', async () => {
        // arrange
        const hashes = keys.map(utils.id);
        const _domainName = 'hey_hoy_1037';
        const _walletTokenId = await unsRegistry.namehash([_domainName, 'wallet']);
        const _cryptoTokenId = await unsRegistry.namehash([_domainName, 'crypto']);

        // act
        const data = await proxyReader.callStatic.getDataByHashForMany(hashes, [_walletTokenId, _cryptoTokenId]);

        // asserts
        expect(data).to.be.eql([
          [ZERO_ADDRESS, ZERO_ADDRESS],
          [ZERO_ADDRESS, ZERO_ADDRESS],
          [['', ''], ['', '']],
          [['', ''], ['', '']],
        ]);
      });

      it('should return data for multiple .crypto|.wallet domains', async () => {
        // arrange
        const hashes = keys.map(utils.id);
        const _domainName = 'test_1082q';
        const _cryptoTokenId = await unsRegistry.namehash([_domainName, 'crypto']);
        const _walletTokenId = await mintDomain(unsRegistry, coinbase.address, ['test_1082q', 'wallet']);
        await mintingController.mintSLDWithResolver(coinbase.address, _domainName, resolver.address);

        for (let i = 0; i < keys.length; i++) {
          await resolver.set(keys[i], values[i], _cryptoTokenId);
          await unsRegistry.set(keys[i], values[i], _walletTokenId);
        }

        // act
        const data = await proxyReader.callStatic.getDataByHashForMany(hashes, [_walletTokenId, _cryptoTokenId]);

        // assert
        expect(data).to.be.eql([
          [unsRegistry.address, resolver.address],
          [coinbase.address, coinbase.address],
          [['test.key1', 'test.key2'], ['test.key1', 'test.key2']],
          [['test.value1', 'test.value2'], ['test.value1', 'test.value2']],
        ]);
      });

      it('should return owners for multiple domains (including unknown)', async () => {
        // arrange
        const unknownTokenId = await unsRegistry.namehash(['unknown', 'crypto']);

        // act
        const data = await proxyReader.callStatic.getDataByHashForMany([], [walletTokenId, unknownTokenId]);

        // assert
        expect(data).to.be.eql([
          [unsRegistry.address, ZERO_ADDRESS],
          [coinbase.address, ZERO_ADDRESS],
          [[], []],
          [[], []],
        ]);
      });
    });

    describe('ownerOfForMany', () => {
      it('should return empty owner for unknown domain', async () => {
        const unknownTokenId = await unsRegistry.namehash(['unknown', 'crypto']);
        const owners = await proxyReader.callStatic.ownerOfForMany([unknownTokenId]);

        expect(owners).to.be.eql([ZERO_ADDRESS]);
      });

      it('should return empty list for empty list of domains', async () => {
        const owners = await proxyReader.callStatic.ownerOfForMany([]);
        expect(owners).to.be.eql([]);
      });

      it('should return owners for multiple .crypto|.wallet domains', async () => {
        // arrange
        const _domainName = 'test_125t';
        const _cryptoTokenId = await unsRegistry.namehash([_domainName, 'crypto']);
        const _walletTokenId = await mintDomain(unsRegistry, accounts[0], ['test_125t', 'wallet']);
        await mintingController.mintSLDWithResolver(coinbase.address, _domainName, resolver.address);

        // act
        const owners = await proxyReader.callStatic.ownerOfForMany([walletTokenId, _walletTokenId, _cryptoTokenId]);

        // assert
        expect(owners).to.be.eql([coinbase.address, accounts[0], coinbase.address]);
      });

      it('should return owners for multiple domains (including unknown)', async () => {
        // arrange
        const unknownTokenId = await unsRegistry.namehash(['unknown', 'crypto']);

        // act
        const owners = await proxyReader.callStatic.ownerOfForMany([walletTokenId, unknownTokenId]);

        // assert
        expect(owners).to.be.eql([coinbase.address, ZERO_ADDRESS]);
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
      const unknownTokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, 'unknown');

      const address = await proxyReader.registryOf(unknownTokenId);
      expect(address).to.be.equal(ZERO_ADDRESS);
    });

    it('should return value for .wallet domain', async () => {
      const tokenId = await mintDomain(unsRegistry, accounts[3], ['hey_hoy_98hds', 'wallet']);
      const address = await proxyReader.registryOf(tokenId);

      expect(address).to.be.equal(unsRegistry.address);
    });

    it('should return value for .crypto domain', async () => {
      const _domainName = 'hey_hoy_98hds';
      const _cryptoTokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, _domainName);
      await mintingController.mintSLD(accounts[3], _domainName);

      const address = await proxyReader.registryOf(_cryptoTokenId);
      expect(address).to.be.equal(cnsRegistry.address);
    });

    it('should return value for .crypto TLD', async () => {
      const address = await proxyReader.registryOf(TLD.CRYPTO);
      expect(address).to.be.equal(cnsRegistry.address);
    });

    it('should return value for .wallet TLD', async () => {
      const address = await proxyReader.registryOf(TLD.WALLET);
      expect(address).to.be.equal(unsRegistry.address);
    });
  });

  describe('Multicall', () => {
    const abiCoder = new utils.AbiCoder();

    it('should return owners', async () => {
      const unknownTokenId = await unsRegistry.namehash(['unknown', 'crypto']);
      const owners = await proxyReader.callStatic.multicall([
        proxyReader.interface.encodeFunctionData('ownerOf', [unknownTokenId]),
        proxyReader.interface.encodeFunctionData('ownerOf', [walletTokenId]),
        proxyReader.interface.encodeFunctionData('ownerOf', [cryptoTokenId]),
      ]);

      const results = owners.map(owner => abiCoder.decode(['address'], owner)[0]);
      expect(results).to.be.eql([ZERO_ADDRESS, coinbase.address, coinbase.address]);
    });

    it('should return existance of tokens', async () => {
      const unknownTokenId = await unsRegistry.namehash(['unknown', 'crypto']);
      const owners = await proxyReader.callStatic.multicall([
        proxyReader.interface.encodeFunctionData('exists', [unknownTokenId]),
        proxyReader.interface.encodeFunctionData('exists', [walletTokenId]),
        proxyReader.interface.encodeFunctionData('exists', [cryptoTokenId]),
      ]);

      const results = owners.map(owner => abiCoder.decode(['bool'], owner)[0]);
      expect(results).to.be.eql([false, true, true]);
    });

    it('should return token uri\'s for UNS and CNS', async () => {
      const owners = await proxyReader.callStatic.multicall([
        proxyReader.interface.encodeFunctionData('tokenURI', [cryptoTokenId]),
        proxyReader.interface.encodeFunctionData('tokenURI', [walletTokenId]),
      ]);

      const results = owners.map(owner => abiCoder.decode(['string'], owner)[0]);
      expect(results).to.be.eql([
        'test_42.crypto',
        '/40559307672254207728557027035302885851369665055277251407821151545011532191308',
      ]);
    });

    it('should return heterogeneous call results', async () => {
      await resolver.set('het_key_111', 'het_value_1', cryptoTokenId);

      const data = await proxyReader.callStatic.multicall([
        proxyReader.interface.encodeFunctionData('ownerOf', [cryptoTokenId]),
        proxyReader.interface.encodeFunctionData('get', ['het_key_111', cryptoTokenId]),
        proxyReader.interface.encodeFunctionData('getData', [['het_key_111'], cryptoTokenId]),
        proxyReader.interface.encodeFunctionData('ownerOfForMany', [[walletTokenId, cryptoTokenId]]),
        proxyReader.interface.encodeFunctionData('registryOf', [walletTokenId]),
      ]);

      const results: Result[] = [];

      [
        ['address'],
        ['string'],
        ['address', 'address', 'string[]'],
        ['address[]'],
        ['address'],
      ].forEach((output, i) => {
        results.push(abiCoder.decode(output, data[i]));
      });

      expect(results).to.be.eql([
        [coinbase.address],
        ['het_value_1'],
        [
          resolver.address,
          coinbase.address,
          ['het_value_1'],
        ],
        [[coinbase.address, coinbase.address]],
        [unsRegistry.address],
      ]);
    });
  });
});
