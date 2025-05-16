import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { AbiCoder, id, Result } from 'ethers';
import { ProxyReader__factory, UNSRegistry__factory } from '../types/factories/contracts';
import { ProxyReader, UNSRegistry } from '../types/contracts';
import { CNSRegistry, Resolver } from '../types/dot-crypto/contracts';
import { MintingController } from '../types/dot-crypto/contracts/controllers';
import { CNSRegistry__factory, Resolver__factory } from '../types/factories/dot-crypto/contracts';
import { MintingController__factory } from '../types/factories/dot-crypto/contracts/controllers';
import { getContractAddress } from '../src/helpers';
import { TLD } from '../src/tlds';
import { mintDomain } from './helpers/registry';
import { DEAD_ADDRESS, ZERO_ADDRESS } from './helpers/constants';
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

  let walletTokenId: bigint, cryptoTokenId: bigint;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;
    [, ...accounts] = signers.map((s) => s.address);

    // deploy UNS
    unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistry.setTokenURIPrefix('/');

    // deploy CNS
    cnsRegistry = await new CNSRegistry__factory().connect(coinbase).deploy();
    mintingController = await new MintingController__factory()
      .connect(coinbase)
      .deploy(await cnsRegistry.getAddress());
    await cnsRegistry.addController(await mintingController.getAddress());
    resolver = await new Resolver__factory()
      .connect(coinbase)
      .deploy(await cnsRegistry.getAddress(), await mintingController.getAddress());

    // mint .wallet TLD
    await unsRegistry.mintTLD(TLD.wallet.hash, 'wallet');

    // mint .wallet
    walletTokenId = await mintDomain({ unsRegistry, owner: coinbase.address, labels: [domainName, 'wallet'] });

    // mint .crypto
    cryptoTokenId = await unsRegistry.namehash([domainName, 'crypto']);
    await mintingController.mintSLDWithResolver(coinbase.address, domainName, await resolver.getAddress());

    proxyReader = await new ProxyReader__factory().connect(coinbase).deploy();
    await proxyReader.initialize(await unsRegistry.getAddress(), await cnsRegistry.getAddress());
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
        expect(resolverResult).to.be.equal(await unsRegistry.getAddress());
      });

      it('should return resolver of .crypto domain', async () => {
        const proxyResult = await proxyReader.resolverOf(cryptoTokenId);
        const resolverResult = await cnsRegistry.resolverOf(cryptoTokenId);

        expect(proxyResult).to.be.equal(resolverResult);
        expect(resolverResult).to.be.equal(await resolver.getAddress());
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
        expect(resolverResult).to.be.equal(
          '50586162622368517199428676025463367639931450566950616867100918499864570754504',
        );
      });

      it('should return namehash of .crypto domain', async () => {
        const proxyResult = await proxyReader.namehash(['test', 'crypto']);

        const resolverResult = await cnsRegistry.childIdOf(TLD.crypto.hash, 'test');

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
        await mintingController.mintSLD(account, _domainName);
        await mintDomain({ unsRegistry, owner: account, labels: [_domainName, 'wallet'] });

        const proxyResult = await proxyReader.balanceOf(account);
        const resolverResult1 = await unsRegistry.balanceOf(account);
        const resolverResult2 = await cnsRegistry.balanceOf(account);
        expect(proxyResult).to.be.equal(resolverResult1 + resolverResult2);
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
        const unknownTokenId = await cnsRegistry.childIdOf(TLD.crypto.hash, 'unknown');

        expect(await proxyReader.exists(unknownTokenId)).to.be.equal(false);
      });

      it('should return true for .wallet domain', async () => {
        const tokenId = await mintDomain({ unsRegistry, owner: accounts[3], labels: ['hey_hoy_97hds', 'wallet'] });
        expect(await proxyReader.exists(tokenId)).to.be.equal(true);
      });

      it('should return true for .crypto domain', async () => {
        const _domainName = 'hey_hoy_97hds';
        const cryptoTokenId = await cnsRegistry.childIdOf(TLD.crypto.hash, _domainName);
        await mintingController.mintSLD(accounts[3], _domainName);

        expect(await proxyReader.exists(cryptoTokenId)).to.be.equal(true);
      });

      it('should return true for .crypto TLD', async () => {
        expect(await proxyReader.exists(TLD.crypto.hash)).to.be.equal(true);
      });

      it('should return true for .wallet TLD', async () => {
        expect(await proxyReader.exists(TLD.wallet.hash)).to.be.equal(true);
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
        const nonResolverAddress = await getContractAddress(proxyReader);

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
        const nonResolverAddress = await getContractAddress(proxyReader);

        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q2-4', nonResolverAddress);

        const proxyResult = await proxyReader.getMany(keys, _tokenId);

        expect(proxyResult).to.be.eql(['', '']);
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
        await resolver.set('get_key_0946', 'value4521', cryptoTokenId);

        const proxyResult = await proxyReader.getByHash(keyHash, cryptoTokenId);
        const resolverResult = await resolver.getByHash(keyHash, cryptoTokenId);

        expect(proxyResult).to.be.eql(resolverResult);
        expect(resolverResult).to.be.eql(['get_key_0946', 'value4521']);
      });

      it('should resolve empty record value for .crypto domain when token not found', async () => {
        const keyHash = id('get_key_0946');
        const tokenId = await unsRegistry.namehash(['test-sgh-q3', 'crypto']);

        const proxyResult = await proxyReader.getByHash(keyHash, tokenId);

        expect(proxyResult).to.be.eql(['', '']);
      });

      it('should resolve empty record value for .crypto domain when resolver not found', async () => {
        const keyHash = id('get_key_0946');
        const tokenId = await unsRegistry.namehash(['test-sgh-q3', 'crypto']);
        await mintingController.mintSLD(coinbase.address, 'test-sgh-q3');

        const proxyResult = await proxyReader.getByHash(keyHash, tokenId);

        expect(proxyResult).to.be.eql(['', '']);
      });

      it('should resolve empty record value for .crypto domain when resolver is 0xdead', async () => {
        const keyHash = id('get_key_0946');
        const tokenId = await unsRegistry.namehash(['test-sgh-q3-2', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q3-2', DEAD_ADDRESS);

        const proxyResult = await proxyReader.getByHash(keyHash, tokenId);

        expect(proxyResult).to.be.eql(['', '']);
      });

      it('should resolve empty record value for .crypto domain when resolver is EOA', async () => {
        const keyHash = id('get_key_0946');
        const tokenId = await unsRegistry.namehash(['test-sgh-q3-3', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q3-3', coinbase.address);

        const proxyResult = await proxyReader.getByHash(keyHash, tokenId);

        expect(proxyResult).to.be.eql(['', '']);
      });

      it('should resolve empty record value for .crypto domain when resolver is not valid', async () => {
        const keyHash = id('get_key_0946');

        const tokenId = await unsRegistry.namehash(['test-sgh-q3-4', 'crypto']);
        const nonResolverAddress = await getContractAddress(proxyReader);

        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q3-4', nonResolverAddress);

        const proxyResult = await proxyReader.getByHash(keyHash, tokenId);

        expect(proxyResult).to.be.eql(['', '']);
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
        await resolver.set(key, value, cryptoTokenId);

        const proxyResult = await proxyReader.getManyByHash([keyHash], cryptoTokenId);
        const resolverResult = await resolver.getManyByHash([keyHash], cryptoTokenId);

        expect(proxyResult).to.be.eql(resolverResult);
        expect(resolverResult).to.be.eql([[key], [value]]);
      });

      it('should resolve empty records value for .crypto domain when token not found', async () => {
        const keyHash = id(keys[0]);
        const tokenId = await unsRegistry.namehash(['test-sgh-q4', 'crypto']);

        const proxyResult = await proxyReader.getManyByHash([keyHash], tokenId);

        expect(proxyResult).to.be.eql([[''], ['']]);
      });

      it('should resolve empty records value for .crypto domain when resolver not found', async () => {
        const keyHash = id(keys[0]);
        const tokenId = await unsRegistry.namehash(['test-sgh-q5', 'crypto']);
        await mintingController.mintSLD(coinbase.address, 'test-sgh-q5');

        const proxyResult = await proxyReader.getManyByHash([keyHash], tokenId);

        expect(proxyResult).to.be.eql([[''], ['']]);
      });

      it('should resolve empty records value for .crypto domain when resolver is 0xdead', async () => {
        const keyHash = id(keys[0]);
        const tokenId = await unsRegistry.namehash(['test-sgh-q5-2', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q5-2', DEAD_ADDRESS);

        const proxyResult = await proxyReader.getManyByHash([keyHash], tokenId);

        expect(proxyResult).to.be.eql([[''], ['']]);
      });

      it('should resolve empty records value for .crypto domain when resolver is EOA', async () => {
        const keyHash = id(keys[0]);
        const tokenId = await unsRegistry.namehash(['test-sgh-q5-3', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'test-sgh-q5-3', coinbase.address);

        const proxyResult = await proxyReader.getManyByHash([keyHash], tokenId);

        expect(proxyResult).to.be.eql([[''], ['']]);
      });

      it('should resolve empty records value for .crypto domain when resolver is not valid', async () => {
        const keyHash = id(keys[0]);

        const tokenId = await unsRegistry.namehash(['test-sgh-q5-4', 'crypto']);
        const nonResolverAddress = await getContractAddress(proxyReader);

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
        const data = await proxyReader.getData.staticCall(keys, tokenId);

        // asserts
        expect(data).to.be.eql([ZERO_ADDRESS, ZERO_ADDRESS, ['', '']]);
      });

      it('should return empty data for non-existing .crypto domain', async () => {
        // arrange
        const tokenId = await cnsRegistry.childIdOf(TLD.crypto.hash, 'hey_hoy_1037');

        // act
        const data = await proxyReader.getData.staticCall(keys, tokenId);

        // asserts
        expect(data).to.be.eql([ZERO_ADDRESS, ZERO_ADDRESS, ['', '']]);
      });

      it('should return data for .crypto domain', async () => {
        // arrange
        const _domainName = 'hey_hoy_121';
        const tokenId = await cnsRegistry.childIdOf(TLD.crypto.hash, _domainName);
        await mintingController.mintSLDWithResolver(coinbase.address, _domainName, await resolver.getAddress());

        // act
        const data = await proxyReader.getData.staticCall(keys, tokenId);

        // asserts
        expect(data).to.be.eql([await resolver.getAddress(), coinbase.address, ['', '']]);
      });

      it('should return data for .wallet domain', async () => {
        // arrange
        const tokenId = await mintDomain({ unsRegistry, owner: coinbase.address, labels: ['hey_hoy_121', 'wallet'] });

        // act
        const data = await proxyReader.getData.staticCall(keys, tokenId);

        // asserts
        expect(data).to.be.eql([await unsRegistry.getAddress(), coinbase.address, ['', '']]);
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
        const nonResolverAddress = await getContractAddress(proxyReader);

        await mintingController.mintSLDWithResolver(coinbase.address, 'hey-hoy-re-4723', nonResolverAddress);

        const data = await proxyReader.getData(keys, tokenId);

        expect(data).to.be.eql([nonResolverAddress, coinbase.address, ['', '']]);
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
        const _cryptoTokenId = await unsRegistry.namehash([_domainName, 'crypto']);
        const _walletTokenId = await mintDomain({ unsRegistry, owner: coinbase, labels: [_domainName, 'wallet'] });
        await mintingController.mintSLDWithResolver(coinbase.address, _domainName, await resolver.getAddress());
        for (let i = 0; i < keys.length; i++) {
          await resolver.set(keys[i], values[i], _cryptoTokenId);
          await unsRegistry.set(keys[i], values[i], _walletTokenId);
        }

        // act
        const data = await proxyReader.getDataForMany.staticCall(keys, [_walletTokenId, _cryptoTokenId]);

        // assert
        expect(data).to.be.eql([
          [await unsRegistry.getAddress(), await resolver.getAddress()],
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
        expect(data).to.be.eql([ZERO_ADDRESS, ZERO_ADDRESS, ['', ''], ['', '']]);
      });

      it('should return empty data for non-existing .crypto domain', async () => {
        // arrange
        const hashes = keys.map(id);
        const tokenId = await cnsRegistry.childIdOf(TLD.crypto.hash, 'hey_hoy_29228');

        // act
        const data = await proxyReader.getDataByHash.staticCall(hashes, tokenId);

        // asserts
        expect(data).to.be.eql([ZERO_ADDRESS, ZERO_ADDRESS, ['', ''], ['', '']]);
      });

      it('should return data by hashes for .crypto domain', async () => {
        // arrange
        const hashes = keys.map(id);
        const _domainName = 'hey_hoy_292';
        const tokenId = await cnsRegistry.childIdOf(TLD.crypto.hash, _domainName);
        await mintingController.mintSLDWithResolver(coinbase.address, _domainName, await resolver.getAddress());
        for (let i = 0; i < keys.length; i++) {
          await resolver.set(keys[i], values[i], tokenId);
        }

        // act
        const data = await proxyReader.getDataByHash.staticCall(hashes, tokenId);

        // assert
        expect(data).to.be.eql([await resolver.getAddress(), coinbase.address, keys, values]);
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

      it('should return data for .crypto domain when resolver is 0xdead', async () => {
        const hashes = keys.map(id);
        const tokenId = await unsRegistry.namehash(['hey-hoy-reh-2723', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'hey-hoy-reh-2723', DEAD_ADDRESS);

        const data = await proxyReader.getDataByHash(hashes, tokenId);

        expect(data).to.be.eql([DEAD_ADDRESS, coinbase.address, ['', ''], ['', '']]);
      });

      it('should return data for .crypto domain when resolver is EOA', async () => {
        const hashes = keys.map(id);
        const tokenId = await unsRegistry.namehash(['hey-hoy-reh-3723', 'crypto']);
        await mintingController.mintSLDWithResolver(coinbase.address, 'hey-hoy-reh-3723', coinbase.address);

        const data = await proxyReader.getDataByHash(hashes, tokenId);

        expect(data).to.be.eql([coinbase.address, coinbase.address, ['', ''], ['', '']]);
      });

      it('should return data for .crypto domain when resolver is not valid', async () => {
        const hashes = keys.map(id);

        const tokenId = await unsRegistry.namehash(['hey-hoy-reh-4723', 'crypto']);
        const nonResolverAddress = await getContractAddress(proxyReader);

        await mintingController.mintSLDWithResolver(coinbase.address, 'hey-hoy-reh-4723', nonResolverAddress);

        const data = await proxyReader.getDataByHash(hashes, tokenId);

        expect(data).to.be.eql([nonResolverAddress, coinbase.address, ['', ''], ['', '']]);
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
          [
            ['', ''],
            ['', ''],
          ],
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
        const _cryptoTokenId = await unsRegistry.namehash([_domainName, 'crypto']);
        const _walletTokenId = await mintDomain({ unsRegistry, owner: coinbase, labels: ['test_1082q', 'wallet'] });
        await mintingController.mintSLDWithResolver(coinbase.address, _domainName, await resolver.getAddress());

        for (let i = 0; i < keys.length; i++) {
          await resolver.set(keys[i], values[i], _cryptoTokenId);
          await unsRegistry.set(keys[i], values[i], _walletTokenId);
        }

        // act
        const data = await proxyReader.getDataByHashForMany.staticCall(hashes, [_walletTokenId, _cryptoTokenId]);

        // assert
        expect(data).to.be.eql([
          [await unsRegistry.getAddress(), await resolver.getAddress()],
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
        const _cryptoTokenId = await unsRegistry.namehash([_domainName, 'crypto']);
        const _walletTokenId = await mintDomain({ unsRegistry, owner: accounts[0], labels: ['test_125t', 'wallet'] });
        await mintingController.mintSLDWithResolver(coinbase.address, _domainName, await resolver.getAddress());

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
      await resolver.reset(cryptoTokenId);
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

      it('should return most specific record by address keys for UNS domains', async () => {
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

      it('should return most specific record by address keys for UNS domains with skipped levels', async () => {
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

      it('should return most specific record by address keys for CNS domains', async () => {
        const [tokenKey, legacyTokenKey1, legacyTokenKey2, networkKey, familyKey] = await proxyReader.getAddressKeys(
          'ETH',
          'USDC',
        );

        await resolver.set(familyKey, 'family-level-record', cryptoTokenId);
        expect(await getAddress('ETH', 'USDC', cryptoTokenId)).to.equal('family-level-record');

        await resolver.set(networkKey, 'network-level-record', cryptoTokenId);
        expect(await getAddress('ETH', 'USDC', cryptoTokenId)).to.equal('network-level-record');

        await resolver.set(legacyTokenKey2, 'legacy-key-2-record', cryptoTokenId);
        expect(await getAddress('ETH', 'USDC', cryptoTokenId)).to.equal('legacy-key-2-record');

        await resolver.set(legacyTokenKey1, 'legacy-key-1-record', cryptoTokenId);
        expect(await getAddress('ETH', 'USDC', cryptoTokenId)).to.equal('legacy-key-1-record');

        await resolver.set(tokenKey, 'token-level-record', cryptoTokenId);
        expect(await getAddress('ETH', 'USDC', cryptoTokenId)).to.equal('token-level-record');
      });

      it('should return most specific record by address keys for CNS domains with skipped levels', async () => {
        const [tokenKey, legacyTokenKey, , , familyKey] = await proxyReader.getAddressKeys('ETH', 'USDC');

        await resolver.set(tokenKey, 'token-level-record', cryptoTokenId);
        expect(await getAddress('ETH', 'USDC', cryptoTokenId)).to.equal('token-level-record');

        await resolver.set(familyKey, 'family-level-record', cryptoTokenId);
        expect(await getAddress('ETH', 'USDC', cryptoTokenId)).to.equal('token-level-record');

        await resolver.set(tokenKey, '', cryptoTokenId);

        expect(await getAddress('ETH', 'USDC', cryptoTokenId)).to.equal('family-level-record');

        await resolver.set(legacyTokenKey, 'legacy-key-1-record', cryptoTokenId);
        expect(await getAddress('ETH', 'USDC', cryptoTokenId)).to.equal('legacy-key-1-record');
      });

      it('should return empty string if family is not defined', async () => {
        expect(await getAddress('UDTOKEN', 'UDTOKEN', walletTokenId)).to.equal('');
      });

      it('should return empty string if token does not exist', async () => {
        expect(await getAddress('ETH', 'USDC', BigInt(0x42))).to.equal('');
      });
    });

    describe('getAddressKey', () => {
      it('should return most specific record key by address keys for UNS domains', async () => {
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

      it('should return most specific record key by address keys for UNS domains with skipped levels', async () => {
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

      it('should return most specific record key by address keys for CNS domains', async () => {
        const [tokenKey, legacyTokenKey, networkKey, familyKey] = await proxyReader.getAddressKeys('ETH', 'USDC');

        await resolver.set(familyKey, '42', cryptoTokenId);
        expect(await proxyReader.getAddressKey('ETH', 'USDC', cryptoTokenId)).to.equal(familyKey);

        await resolver.set(networkKey, '42', cryptoTokenId);
        expect(await proxyReader.getAddressKey('ETH', 'USDC', cryptoTokenId)).to.equal(networkKey);

        await resolver.set(legacyTokenKey, '42', cryptoTokenId);
        expect(await proxyReader.getAddressKey('ETH', 'USDC', cryptoTokenId)).to.equal(legacyTokenKey);

        await resolver.set(tokenKey, '42', cryptoTokenId);
        expect(await proxyReader.getAddressKey('ETH', 'USDC', cryptoTokenId)).to.equal(tokenKey);
      });

      it('should return most specific record key by address keys for CNS domains with skipped levels', async () => {
        const [tokenKey, legacyTokenKey, , , familyKey] = await proxyReader.getAddressKeys('ETH', 'USDC');

        await resolver.set(tokenKey, '42', cryptoTokenId);
        expect(await proxyReader.getAddressKey('ETH', 'USDC', cryptoTokenId)).to.equal(tokenKey);

        await resolver.set(familyKey, '42', cryptoTokenId);
        expect(await proxyReader.getAddressKey('ETH', 'USDC', cryptoTokenId)).to.equal(tokenKey);

        await resolver.set(tokenKey, '', cryptoTokenId);

        expect(await proxyReader.getAddressKey('ETH', 'USDC', cryptoTokenId)).to.equal(familyKey);

        await resolver.set(legacyTokenKey, 'legacy-key-1-record', cryptoTokenId);
        expect(await proxyReader.getAddressKey('ETH', 'USDC', cryptoTokenId)).to.equal(legacyTokenKey);
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
      const unknownTokenId = await cnsRegistry.childIdOf(TLD.crypto.hash, 'unknown');

      const address = await proxyReader.registryOf(unknownTokenId);
      expect(address).to.be.equal(ZERO_ADDRESS);
    });

    it('should return value for .wallet domain', async () => {
      const tokenId = await mintDomain({ unsRegistry, owner: accounts[3], labels: ['hey_hoy_98hds', 'wallet'] });
      const address = await proxyReader.registryOf(tokenId);

      expect(address).to.be.equal(await unsRegistry.getAddress());
    });

    it('should return value for .crypto domain', async () => {
      const _domainName = 'hey_hoy_98hds';
      const _cryptoTokenId = await cnsRegistry.childIdOf(TLD.crypto.hash, _domainName);
      await mintingController.mintSLD(accounts[3], _domainName);

      const address = await proxyReader.registryOf(_cryptoTokenId);
      expect(address).to.be.equal(await cnsRegistry.getAddress());
    });

    it('should return value for .crypto TLD', async () => {
      const address = await proxyReader.registryOf(TLD.crypto.hash);
      expect(address).to.be.equal(await cnsRegistry.getAddress());
    });

    it('should return value for .wallet TLD', async () => {
      const address = await proxyReader.registryOf(TLD.wallet.hash);
      expect(address).to.be.equal(await unsRegistry.getAddress());
    });
  });

  describe('Multicall', () => {
    const abiCoder = new AbiCoder();

    it('should return owners', async () => {
      const unknownTokenId = await unsRegistry.namehash(['unknown', 'crypto']);
      const owners = await proxyReader.multicall.staticCall([
        proxyReader.interface.encodeFunctionData('ownerOf', [unknownTokenId]),
        proxyReader.interface.encodeFunctionData('ownerOf', [walletTokenId]),
        proxyReader.interface.encodeFunctionData('ownerOf', [cryptoTokenId]),
      ]);

      const results = owners.map((owner) => abiCoder.decode(['address'], owner)[0]);
      expect(results).to.be.eql([ZERO_ADDRESS, coinbase.address, coinbase.address]);
    });

    it('should return existance of tokens', async () => {
      const unknownTokenId = await unsRegistry.namehash(['unknown', 'crypto']);
      const owners = await proxyReader.multicall.staticCall([
        proxyReader.interface.encodeFunctionData('exists', [unknownTokenId]),
        proxyReader.interface.encodeFunctionData('exists', [walletTokenId]),
        proxyReader.interface.encodeFunctionData('exists', [cryptoTokenId]),
      ]);

      const results = owners.map((owner) => abiCoder.decode(['bool'], owner)[0]);
      expect(results).to.be.eql([false, true, true]);
    });

    it('should return token uri\'s for UNS and CNS', async () => {
      const owners = await proxyReader.multicall.staticCall([
        proxyReader.interface.encodeFunctionData('tokenURI', [cryptoTokenId]),
        proxyReader.interface.encodeFunctionData('tokenURI', [walletTokenId]),
      ]);

      const results = owners.map((owner) => abiCoder.decode(['string'], owner)[0]);
      expect(results).to.be.eql([
        'test_42.crypto',
        '/40559307672254207728557027035302885851369665055277251407821151545011532191308',
      ]);
    });

    it('should return heterogeneous call results', async () => {
      await resolver.set('het_key_111', 'het_value_1', cryptoTokenId);

      const data = await proxyReader.multicall.staticCall([
        proxyReader.interface.encodeFunctionData('ownerOf', [cryptoTokenId]),
        proxyReader.interface.encodeFunctionData('get', ['het_key_111', cryptoTokenId]),
        proxyReader.interface.encodeFunctionData('getData', [['het_key_111'], cryptoTokenId]),
        proxyReader.interface.encodeFunctionData('ownerOfForMany', [[walletTokenId, cryptoTokenId]]),
        proxyReader.interface.encodeFunctionData('registryOf', [walletTokenId]),
      ]);

      const results: Result[] = [];

      [['address'], ['string'], ['address', 'address', 'string[]'], ['address[]'], ['address']].forEach(
        (output, i) => {
          results.push(abiCoder.decode(output, data[i]));
        },
      );

      expect(results).to.be.eql([
        [coinbase.address],
        ['het_value_1'],
        [await resolver.getAddress(), coinbase.address, ['het_value_1']],
        [[coinbase.address, coinbase.address]],
        [await unsRegistry.getAddress()],
      ]);
    });
  });

  describe('Owner functions', () => {
    let reader: SignerWithAddress;

    before(() => {
      [, reader] = signers;
    });

    describe('addBlockchainNetworks(string[],string[])', () => {
      const selector = 'addBlockchainNetworks(string[],string[])';

      it('should save blockchain networks to families mapping', async () => {
        await proxyReader.connect(coinbase)[selector](['NETWORK', 'NETWORK2'], ['FAMILY', 'FAMILY2']);

        const [key1] = await proxyReader.getAddressKeys('NETWORK', 'TOKEN');
        const [key2] = await proxyReader.getAddressKeys('NETWORK2', 'TOKEN2');

        expect(key1).to.equal('token.FAMILY.NETWORK.TOKEN.address');
        expect(key2).to.equal('token.FAMILY2.NETWORK2.TOKEN2.address');

        await proxyReader.connect(coinbase)[selector](['NETWORK'], ['ANOTHER_FAMILY']);

        const [key3] = await proxyReader.getAddressKeys('NETWORK', 'TOKEN');
        expect(key3).to.equal('token.ANOTHER_FAMILY.NETWORK.TOKEN.address');
      });

      it('should emit SetNetworkFamily event', async () => {
        await expect(proxyReader.connect(coinbase)[selector](['MATIC'], ['ETH']))
          .to.emit(proxyReader, 'SetNetworkFamily')
          .withArgs('MATIC');

        await expect(proxyReader.connect(coinbase)[selector](['MATIC', 'BSC'], ['ETH', 'ETH']))
          .to.emit(proxyReader, 'SetNetworkFamily')
          .withArgs('BSC');
      });

      it('should revert if not owner', async () => {
        await expect(proxyReader.connect(reader)[selector]([], [])).to.be.revertedWith(
          'Ownable: caller is not the owner',
        );
      });

      it('should revert if args arrays have different lengths', async () => {
        await expect(proxyReader.connect(coinbase)[selector](['NETWORK'], [])).to.be.revertedWith(
          'ProxyReader: LENGTH_NOT_EQUAL',
        );
      });
    });

    describe('addBlockchainNetworks(string[],string)', () => {
      const selector = 'addBlockchainNetworks(string[],string)';

      it('should save blockchain networks to families mapping', async () => {
        await proxyReader.connect(coinbase)[selector](['NETWORK', 'NETWORK2'], 'FAMILY');

        const [key1] = await proxyReader.getAddressKeys('NETWORK', 'TOKEN');
        const [key2] = await proxyReader.getAddressKeys('NETWORK2', 'TOKEN2');

        expect(key1).to.equal('token.FAMILY.NETWORK.TOKEN.address');
        expect(key2).to.equal('token.FAMILY.NETWORK2.TOKEN2.address');

        await proxyReader.connect(coinbase)[selector](['NETWORK2'], 'ANOTHER_FAMILY');

        const [key3] = await proxyReader.getAddressKeys('NETWORK2', 'TOKEN');
        expect(key3).to.equal('token.ANOTHER_FAMILY.NETWORK2.TOKEN.address');
      });

      it('should emit SetNetworkFamily event', async () => {
        await expect(proxyReader.connect(coinbase)[selector](['MATIC'], 'ETH'))
          .to.emit(proxyReader, 'SetNetworkFamily')
          .withArgs('MATIC');

        await expect(proxyReader.connect(coinbase)[selector](['MATIC', 'BSC'], 'ETH'))
          .to.emit(proxyReader, 'SetNetworkFamily')
          .withArgs('BSC');
      });

      it('should revert if not owner', async () => {
        await expect(proxyReader.connect(reader)[selector](['NETWORK'], 'TOKEN')).to.be.revertedWith(
          'Ownable: caller is not the owner',
        );
      });
    });

    describe('addLegacyRecords(string[],string[][])', () => {
      it('should save legacy keys and overwrite existing', async () => {
        await proxyReader
          .connect(coinbase)
          ['addBlockchainNetworks(string[],string)'](['SOME_NETWORK', 'SOME_OTHER_NETWORK'], 'SOME_FAMILY');

        await proxyReader
          .connect(coinbase)
          .addLegacyRecords(
            ['token.SOME_FAMILY.SOME_NETWORK.TOKEN.address', 'token.SOME_FAMILY.SOME_OTHER_NETWORK.TOKEN.address'],
            [['legacyRecord', 'legacyRecord2'], ['otherLegacyRecord']],
          );

        const keys = await proxyReader.getAddressKeys('SOME_NETWORK', 'TOKEN');
        const keys2 = await proxyReader.getAddressKeys('SOME_OTHER_NETWORK', 'TOKEN');

        expect(keys.length).to.equal(5);
        expect(keys[1]).to.equal('legacyRecord');
        expect(keys[2]).to.equal('legacyRecord2');

        expect(keys2.length).to.equal(4);
        expect(keys2[1]).to.equal('otherLegacyRecord');

        await proxyReader
          .connect(coinbase)
          .addLegacyRecords(
            ['token.SOME_FAMILY.SOME_NETWORK.TOKEN.address'],
            [['legacyRecord', 'legacyRecord2', 'legacyRecord3']],
          );

        const keys3 = await proxyReader.getAddressKeys('SOME_NETWORK', 'TOKEN');

        expect(keys3.length).to.equal(6);
        expect(keys3[1]).to.equal('legacyRecord');
        expect(keys3[2]).to.equal('legacyRecord2');
        expect(keys3[3]).to.equal('legacyRecord3');

        await proxyReader.connect(coinbase).addLegacyRecords(['token.SOME_FAMILY.SOME_NETWORK.TOKEN.address'], [[]]);

        const keys4 = await proxyReader.getAddressKeys('SOME_NETWORK', 'TOKEN');
        expect(keys4.length).to.equal(3);
      });

      it('should emit SetLegacyRecords event', async () => {
        const tokenKey1 = 'token.FAMILY.NETWORK.TOKEN.address';
        const tokenKey2 = 'token.FAMILY2.NETWORK.TOKEN.address';

        await expect(proxyReader.connect(coinbase).addLegacyRecords([tokenKey1], [[]]))
          .to.emit(proxyReader, 'SetLegacyRecords')
          .withArgs(tokenKey1);

        await expect(proxyReader.connect(coinbase).addLegacyRecords([tokenKey1, tokenKey2], [[], []]))
          .to.emit(proxyReader, 'SetLegacyRecords')
          .withArgs(tokenKey2);
      });

      it('should revert if args arrays have different lengths', async () => {
        await expect(proxyReader.connect(coinbase).addLegacyRecords(['RECORD_KEY'], [])).to.be.revertedWith(
          'ProxyReader: LENGTH_NOT_EQUAL',
        );
      });

      it('should revert if not owner', async () => {
        await expect(proxyReader.connect(reader).addLegacyRecords([], [])).to.be.revertedWith(
          'Ownable: caller is not the owner',
        );
      });
    });
  });

  describe('Ownable', () => {
    let newOwner: SignerWithAddress;

    before(() => {
      [, newOwner] = signers;
    });

    it('has an owner', async () => {
      expect(await proxyReader.owner()).to.equal(coinbase.address);
    });

    describe('transferOwnership', () => {
      it('changes owner after transfer', async () => {
        await expect(proxyReader.transferOwnership(newOwner.address))
          .to.emit(proxyReader, 'OwnershipTransferred')
          .withArgs(coinbase.address, newOwner.address);

        expect(await proxyReader.owner()).to.equal(newOwner.address);
      });

      it('reverts if non-owner', async () => {
        await expect(proxyReader.transferOwnership(newOwner.address)).to.be.revertedWith(
          'Ownable: caller is not the owner',
        );
      });

      it('guards ownership against stuck state', async function () {
        await expect(proxyReader.connect(newOwner).transferOwnership(ZERO_ADDRESS)).to.be.revertedWith(
          'Ownable: new owner is the zero address',
        );
      });
    });

    describe('renounceOwnership', () => {
      it('loses ownership after renouncement', async function () {
        await expect(proxyReader.connect(newOwner).renounceOwnership())
          .to.emit(proxyReader, 'OwnershipTransferred')
          .withArgs(newOwner.address, ZERO_ADDRESS);

        expect(await proxyReader.owner()).to.equal(ZERO_ADDRESS);
      });

      it('prevents non-owners from renouncement', async function () {
        await expect(proxyReader.renounceOwnership()).to.be.revertedWith('Ownable: caller is not the owner');
      });
    });
  });
});
