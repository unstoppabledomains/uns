const { ZERO_ADDRESS } = require('./helpers/constants');

const { utils, BigNumber } = ethers;

describe('ProxyReader', () => {
  const domainName = 'test_42';
  const keys = ['test.key1', 'test.key2'];
  const values = ['test.value1', 'test.value2'];

  const cryptoRoot = BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');
  const walletRoot = BigNumber.from('0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230');

  let Registry, CryptoRegistry, CryptoResolver, CryptoMintingController, ProxyReader;
  let registry, cryptoRegistry, cryptoResolver, cryptoMintingController, proxy;
  let signers, coinbase, accounts;
  let tokenId_wallet, tokenId_crypto;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;
    [, ...accounts] = signers.map(s => s.address);

    Registry = await ethers.getContractFactory('contracts/Registry.sol:Registry');
    CryptoRegistry = await ethers.getContractFactory('contracts/cns/CryptoRegistry.sol:CryptoRegistry');
    CryptoResolver = await ethers.getContractFactory('contracts/cns/CryptoResolver.sol:CryptoResolver');
    CryptoMintingController = await ethers.getContractFactory('contracts/cns/CryptoMintingController.sol:CryptoMintingController');
    ProxyReader = await ethers.getContractFactory('contracts/ProxyReader.sol:ProxyReader');

    registry = await Registry.deploy();
    await registry.initialize(coinbase.address);
    await registry.setTokenURIPrefix('/');

    cryptoRegistry = await CryptoRegistry.deploy();
    cryptoMintingController = await CryptoMintingController.deploy(cryptoRegistry.address);
    await cryptoRegistry.addController(cryptoMintingController.address);
    cryptoResolver = await CryptoResolver.deploy(cryptoRegistry.address, cryptoMintingController.address);

    // mint .crypto
    tokenId_wallet = await registry.childIdOf(walletRoot, domainName);
    await registry.mintSLD(coinbase.address, walletRoot, domainName);

    // mint .wallet
    tokenId_crypto = await registry.childIdOf(cryptoRoot, domainName);
    await cryptoMintingController.mintSLDWithResolver(coinbase.address, domainName, cryptoResolver.address);

    proxy = await ProxyReader.deploy(registry.address, cryptoRegistry.address);
  });

  it('should support IERC165 interface', async () => {
    /*
     * bytes4(keccak256(abi.encodePacked('supportsInterface(bytes4)'))) == 0x01ffc9a7
     */
    const isSupport = await proxy.supportsInterface('0x01ffc9a7');
    assert.isTrue(isSupport);
  });

  describe('IRegistryReader', () => {
    it('should support IRegistryReader interface', async () => {
      /*
      * bytes4(keccak256(abi.encodePacked('name()'))) == 0x06fdde03
      * bytes4(keccak256(abi.encodePacked('symbol()'))) == 0x95d89b41
      * bytes4(keccak256(abi.encodePacked('tokenURI(uint256)'))) == 0xc87b56dd
      * bytes4(keccak256(abi.encodePacked('isApprovedOrOwner(address,uint256)'))) == 0x430c2081
      * bytes4(keccak256(abi.encodePacked('resolverOf(uint256)'))) == 0xb3f9e4cb
      * bytes4(keccak256(abi.encodePacked('childIdOf(uint256,string)'))) == 0x68b62d32
      * bytes4(keccak256(abi.encodePacked('balanceOf(address)'))) == 0x70a08231
      * bytes4(keccak256(abi.encodePacked('ownerOf(uint256)'))) == 0x6352211e
      * bytes4(keccak256(abi.encodePacked('getApproved(uint256)'))) == 0x081812fc
      * bytes4(keccak256(abi.encodePacked('isApprovedForAll(address,address)'))) == 0xe985e9c5
      * bytes4(keccak256(abi.encodePacked('root()'))) == 0xebf0c717
      *
      * => 0x06fdde03 ^ 0x95d89b41 ^ 0xc87b56dd ^ 0x430c2081 ^
      *    0xb3f9e4cb ^ 0x68b62d32 ^ 0x70a08231 ^ 0x6352211e ^
      *    0x081812fc ^ 0xe985e9c5 ^ 0xebf0c717 == 0xda8265e6
      */
      const isSupport = await proxy.supportsInterface('0xda8265e6');
      assert.isTrue(isSupport);
    });

    it('should proxy name call', async () => {
      const result = await proxy.name();
      const expected = await registry.name();
      assert.equal(result, expected);
    });

    it('should proxy symbol call', async () => {
      const result = await proxy.symbol();
      const expected = await registry.symbol();
      assert.equal(result, expected);
    });

    it('should proxy balanceOf call', async () => {
      const result = await proxy.balanceOf(accounts[0]);
      const expected = await registry.balanceOf(accounts[0]);
      assert.equal(result.toString(), expected.toString());
    });

    it('should proxy isApprovedForAll call', async () => {
      const result = await proxy.isApprovedForAll(accounts[0], accounts[1]);
      const expected = await registry.isApprovedForAll(accounts[0], accounts[1]);
      assert.equal(result, expected);
    });

    it('should proxy root call', async () => {
      const result = await proxy.root();
      assert.equal(result.toString(), '0');
    });

    describe('getApproved', () => {
      it('should return approved zero-address .wallet domain', async () => {
        const proxyResult = await proxy.getApproved(tokenId_wallet);
        const resolverResult = await registry.getApproved(tokenId_wallet);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, ZERO_ADDRESS);
      });

      it('should return approved zero-address .crypto domain', async () => {
        const proxyResult = await proxy.getApproved(tokenId_crypto);
        const resolverResult = await cryptoRegistry.getApproved(tokenId_crypto);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, ZERO_ADDRESS);
      });

      it('should return approved address .wallet domain', async () => {
        await registry.approve(accounts[0], tokenId_wallet);

        const proxyResult = await proxy.getApproved(tokenId_wallet);
        const resolverResult = await registry.getApproved(tokenId_wallet);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, accounts[0]);
      });

      it('should return approved address .crypto domain', async () => {
        await cryptoRegistry.approve(accounts[0], tokenId_crypto);

        const proxyResult = await proxy.getApproved(tokenId_crypto);
        const resolverResult = await cryptoRegistry.getApproved(tokenId_crypto);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, accounts[0]);
      });
    })

    describe('isApprovedOrOwner', () => {
      it('should return false for not-approved .wallet domain', async () => {
        const proxyResult = await proxy.isApprovedOrOwner(accounts[1], tokenId_wallet);
        const resolverResult = await registry.isApprovedOrOwner(accounts[1], tokenId_wallet);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, false);
      });

      it('should return false for not-approved .crypto domain', async () => {
        const proxyResult = await proxy.isApprovedOrOwner(accounts[1], tokenId_crypto);
        const resolverResult = await cryptoRegistry.isApprovedOrOwner(accounts[1], tokenId_crypto);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, false);
      });

      it('should return whether approved address .wallet domain', async () => {
        await registry.approve(accounts[0], tokenId_wallet);

        const proxyResult = await proxy.isApprovedOrOwner(accounts[0], tokenId_wallet);
        const resolverResult = await registry.isApprovedOrOwner(accounts[0], tokenId_wallet);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, true);
      });

      it('should return whether approved address .crypto domain', async () => {
        await cryptoRegistry.approve(accounts[0], tokenId_crypto);

        const proxyResult = await proxy.isApprovedOrOwner(accounts[0], tokenId_crypto);
        const resolverResult = await cryptoRegistry.isApprovedOrOwner(accounts[0], tokenId_crypto);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, true);
      });
    })

    describe('ownerOf', () => {
      it('should return owner of .wallet domain', async () => {
        const proxyResult = await proxy.ownerOf(tokenId_wallet);
        const resolverResult = await registry.ownerOf(tokenId_wallet);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, coinbase.address);
      });

      it('should return owner of .crypto domain', async () => {
        const proxyResult = await proxy.ownerOf(tokenId_crypto);
        const resolverResult = await cryptoRegistry.ownerOf(tokenId_crypto);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, coinbase.address);
      });
    })

    describe('resolverOf', () => {
      it('should return resolver of .wallet domain', async () => {
        const proxyResult = await proxy.resolverOf(tokenId_wallet);
        const resolverResult = await registry.resolverOf(tokenId_wallet);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, registry.address);
      });

      it('should return resolver of .crypto domain', async () => {
        const proxyResult = await proxy.resolverOf(tokenId_crypto);
        const resolverResult = await cryptoRegistry.resolverOf(tokenId_crypto);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, cryptoResolver.address);
      });
    })

    describe('tokenURI', () => {
      it('should return tokenURI of .wallet domain', async () => {
        const proxyResult = await proxy.tokenURI(tokenId_wallet);
        const resolverResult = await registry.tokenURI(tokenId_wallet);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, '/40559307672254207728557027035302885851369665055277251407821151545011532191308');
      });

      it('should return tokenURI of .crypto domain', async () => {
        const proxyResult = await proxy.tokenURI(tokenId_crypto);
        const resolverResult = await cryptoRegistry.tokenURI(tokenId_crypto);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, 'test_42.crypto');
      });
    })

    describe('childIdOf', () => {
      it('should return childIdOf of .wallet domain', async () => {
        const proxyResult = await proxy.childIdOf(walletRoot, 'test');
        const resolverResult = await registry.childIdOf(walletRoot, 'test');

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult.toString(), '50586162622368517199428676025463367639931450566950616867100918499864570754504');
      });

      it('should return childIdOf of .crypto domain', async () => {
        const proxyResult = await proxy.childIdOf(cryptoRoot, 'test');
        const resolverResult = await cryptoRegistry.childIdOf(cryptoRoot, 'test');

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult.toString(), '82856763987730893573226808376519199326595862773989062576563108342755511775491');
      });
    })
  });

  describe('IRecordReader', () => {
    it('should support IRecordReader interface', async () => {
      /*
       * bytes4(keccak256(abi.encodePacked('get(string,uint256)'))) == 0x1be5e7ed
       * bytes4(keccak256(abi.encodePacked('getByHash(uint256,uint256)'))) == 0x672b9f81
       * bytes4(keccak256(abi.encodePacked('getMany(string[],uint256)'))) == 0x1bd8cc1a
       * bytes4(keccak256(abi.encodePacked('getManyByHash(uint256[],uint256)'))) == 0xb85afd28
       *
       * => 0x1be5e7ed ^ 0x672b9f81 ^ 0x1bd8cc1a ^ 0xb85afd28 == 0xdf4c495e
       */
      const isSupport = await proxy.supportsInterface('0xdf4c495e');
      assert.isTrue(isSupport);
    });

    describe('get', () => {
      it('should return value of record for .wallet domain', async () => {
        await registry.set('get_key_39', 'value1', tokenId_wallet);

        const proxyResult = await proxy.get('get_key_39', tokenId_wallet);
        const resolverResult = await registry.get('get_key_39', tokenId_wallet);

        assert.equal(proxyResult, resolverResult);
        assert.equal(resolverResult, 'value1');
      });

      it('should return value of record for .crypto domain', async () => {
        await cryptoResolver.set('get_key_134', 'value12', tokenId_crypto);

        const proxyResult = await proxy.get('get_key_134', tokenId_crypto);
        const resolverResult = await cryptoResolver.get('get_key_134', tokenId_crypto);

        assert.equal(proxyResult, resolverResult);
        assert.equal(resolverResult, 'value12');
      });
    })

    describe('getMany', () => {
      it('should return list with empty value for unregistered key', async () => {
        const result = await proxy.getMany([keys[0]], tokenId_wallet);
        assert.equal(result.length, 1);
        assert.equal(result[0], '');
      });

      it('should return list with single value for .wallet domain', async () => {
        const [key] = keys;
        const [value] = values;
        await registry.set(key, value, tokenId_wallet);

        const proxyResult = await proxy.getMany([key], tokenId_wallet);
        const resolverResult = await registry.getMany([key], tokenId_wallet);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, [value]);
      });

      it('should return list with single value for .crypto domain', async () => {
        const [key] = keys;
        const [value] = values;
        await cryptoResolver.set(key, value, tokenId_crypto);

        const proxyResult = await proxy.getMany([key], tokenId_crypto);
        const resolverResult = await cryptoResolver.getMany([key], tokenId_crypto);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, [value]);
      });

      it('should return list with multiple values for .wallet domain', async () => {
        for (let i = 0; i < keys.length; i++) {
          await registry.set(keys[i], values[i], tokenId_wallet);
        }

        const result = await proxy.getMany(keys, tokenId_wallet);
        assert.deepEqual(result, values);
      });

      it('should return list with multiple values for .crypto domain', async () => {
        for (let i = 0; i < keys.length; i++) {
          await cryptoResolver.set(keys[i], values[i], tokenId_crypto);
        }

        const result = await proxy.getMany(keys, tokenId_crypto);
        assert.deepEqual(result, values);
      });
    });

    describe('getByHash', () => {
      it('should return value of record for .wallet domain', async () => {
        const keyHash = utils.id('get_key_4235');
        await registry.set('get_key_4235', 'value1454', tokenId_wallet);

        const proxyResult = await proxy.getByHash(keyHash, tokenId_wallet);
        const resolverResult = await registry.getByHash(keyHash, tokenId_wallet);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, ['get_key_4235', 'value1454']);
      });

      it('should return value of record for .crypto domain', async () => {
        const keyHash = utils.id('get_key_0946');
        await cryptoResolver.set('get_key_0946', 'value4521', tokenId_crypto);

        const proxyResult = await proxy.getByHash(keyHash, tokenId_crypto);
        const resolverResult = await cryptoResolver.getByHash(keyHash, tokenId_crypto);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, ['get_key_0946', 'value4521']);
      });
    })

    describe('getManyByHash', () => {
      it('should return list with empty value for unregistered key', async () => {
        const keyHash = utils.id('key_aaaaaa');
        const result = await proxy.getManyByHash([keyHash], tokenId_wallet);
        assert.deepEqual(result[0], ['']);
      });

      it('should return list with single value for .wallet domain', async () => {
        const [key] = keys;
        const [value] = values;
        const keyHash = utils.id(key);
        await registry.set(key, value, tokenId_wallet);

        const proxyResult = await proxy.getManyByHash([keyHash], tokenId_wallet);
        const resolverResult = await registry.getManyByHash([keyHash], tokenId_wallet);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, [[key], [value]]);
      });

      it('should return list with single value for .crypto domain', async () => {
        const [key] = keys;
        const [value] = values;
        const keyHash = utils.id(key);
        await cryptoResolver.set(key, value, tokenId_crypto);

        const proxyResult = await proxy.getManyByHash([keyHash], tokenId_crypto);
        const resolverResult = await cryptoResolver.getManyByHash([keyHash], tokenId_crypto);

        assert.deepEqual(proxyResult, resolverResult);
        assert.deepEqual(resolverResult, [[key], [value]]);
      });
    })
  });

  describe('IDataReader', () => {
    it('should support IDataReader interface', async () => {
      /*
       * bytes4(keccak256(abi.encodePacked('getData(string[],uint256)'))) == 0x91015f6b
       * bytes4(keccak256(abi.encodePacked('getDataForMany(string[],uint256[])'))) == 0x933c051d
       * bytes4(keccak256(abi.encodePacked('getDataByHash(uint256[],uint256)'))) == 0x03280755
       * bytes4(keccak256(abi.encodePacked('getDataByHashForMany(uint256[],uint256[])'))) == 0x869b8884
       * bytes4(keccak256(abi.encodePacked('ownerOfForMany(uint256[])'))) == 0xc15ae7cf
       *
       * => 0x91015f6b ^ 0x933c051d ^ 0x03280755 ^
       *    0x869b8884 ^ 0xc15ae7cf == 0x46d43268
       */
      const isSupport = await proxy.supportsInterface('0x46d43268');
      assert.isTrue(isSupport);
    });

    describe('getData', () => {
      it('should return zero owner for non-existing token', async () => {
        // arrange
        const _domainName = 'hey_hoy_1037';
        const _tokenId = await registry.childIdOf(cryptoRoot, _domainName);

        // act
        const data = await proxy.callStatic.getData(keys, _tokenId);

        // asserts
        assert.deepEqual(data, [ZERO_ADDRESS, ZERO_ADDRESS, ['','']]);
      });

      it('should return data for .crypto domain', async () => {
        // arrange
        const _domainName = 'hey_hoy_121';
        const _tokenId = await cryptoRegistry.childIdOf(cryptoRoot, _domainName);
        await cryptoMintingController.mintSLDWithResolver(coinbase.address, _domainName, cryptoResolver.address);

        // act
        const data = await proxy.callStatic.getData(keys, _tokenId);

        // asserts
        assert.deepEqual(data, [cryptoResolver.address, coinbase.address, ['','']]);
      });

      it('should return data for .wallet domain', async () => {
        // arrange
        const _domainName = 'hey_hoy_121';
        const _tokenId = await registry.childIdOf(walletRoot, _domainName);
        await registry.mintSLD(coinbase.address, walletRoot, _domainName);

        // act
        const data = await proxy.callStatic.getData(keys, _tokenId);

        // asserts
        assert.deepEqual(data, [registry.address, coinbase.address, ['','']]);
      });
    });

    describe('getDataForMany', () => {
      it('should return empty lists for empty list of domains', async () => {
        const data = await proxy.callStatic.getDataForMany([], [])

        assert.deepEqual(data, [[],[],[]]);
      });

      it('should return data for multiple .crypto|.wallet domains', async () => {
        // arrange
        const _domainName = 'test_1291'
        const _tokenId_wallet = await registry.childIdOf(walletRoot, _domainName);
        const _tokenId_crypto = await registry.childIdOf(cryptoRoot, _domainName);
        await registry.mintSLD(coinbase.address, walletRoot, _domainName);
        await cryptoMintingController.mintSLDWithResolver(coinbase.address, _domainName, cryptoResolver.address);

        for (let i = 0; i < keys.length; i++) {
            await registry.set(keys[i], values[i], _tokenId_wallet);
            await cryptoResolver.set(keys[i], values[i], _tokenId_crypto);
        }

        // act
        const data = await proxy.callStatic.getDataForMany(keys, [_tokenId_wallet, _tokenId_crypto]);

        // assert
        assert.deepEqual(data, [
          [registry.address, cryptoResolver.address],
          [coinbase.address, coinbase.address],
          [['test.value1', 'test.value2'], ['test.value1', 'test.value2']]
        ]);
      });

      it('should return owners for multiple tokens (including unknown)', async () => {
        // arrange
        const unknownTokenId = await registry.childIdOf(cryptoRoot, 'unknown');

        // act
        const data = await proxy.callStatic.getDataForMany([], [tokenId_wallet, unknownTokenId]);
        
        // assert
        assert.deepEqual(data, [
          [registry.address, ZERO_ADDRESS],
          [coinbase.address, ZERO_ADDRESS],
          [[], []]
        ]);
      });
    });

    describe('getDataByHash', () => {
      it('should return data by hashes for .crypto domain', async () => {
        // arrange
        const hashes = keys.map(utils.id);
        const _domainName = 'hey_hoy_292';
        const _tokenId = await cryptoRegistry.childIdOf(cryptoRoot, _domainName);
        await cryptoMintingController.mintSLDWithResolver(coinbase.address, _domainName, cryptoResolver.address);
        for (let i = 0; i < keys.length; i++) {
            await cryptoResolver.set(keys[i], values[i], _tokenId);
        }

        // act
        const data = await proxy.callStatic.getDataByHash(hashes, _tokenId);

        // assert
        assert.deepEqual(data, [
          cryptoResolver.address,
          coinbase.address,
          keys,
          values
        ]);
      });

      it('should return data by hashes for .wallet domain', async () => {
        // arrange
        const hashes = keys.map(utils.id);
        const _domainName = 'hey_hoy_292';
        const _tokenId = await registry.childIdOf(walletRoot, _domainName);
        await registry.mintSLD(coinbase.address, walletRoot, _domainName);
        for (let i = 0; i < keys.length; i++) {
            await registry.set(keys[i], values[i], _tokenId);
        }

        // act
        const data = await proxy.callStatic.getDataByHash(hashes, _tokenId);

        // assert
        assert.deepEqual(data, [
          registry.address,
          coinbase.address,
          keys,
          values
        ]);
      });
    });

    describe('getDataByHashForMany', () => {
      it('should return empty lists for empty list of domains', async () => {
        const data = await proxy.callStatic.getDataByHashForMany([], [])

        assert.deepEqual(data, [[], [], [], []]);
      });

      it('should return data for multiple .crypto|.wallet domains', async () => {
        // arrange
        const hashes = keys.map(utils.id);
        const _domainName = 'test_1082q'
        const _tokenId_wallet = await registry.childIdOf(walletRoot, _domainName);
        const _tokenId_crypto = await registry.childIdOf(cryptoRoot, _domainName);
        await registry.mintSLD(coinbase.address, walletRoot, _domainName);
        await cryptoMintingController.mintSLDWithResolver(coinbase.address, _domainName, cryptoResolver.address);

        for (let i = 0; i < keys.length; i++) {
            await registry.set(keys[i], values[i], _tokenId_wallet);
            await cryptoResolver.set(keys[i], values[i], _tokenId_crypto);
        }

        // act
        const data = await proxy.callStatic.getDataByHashForMany(hashes, [_tokenId_wallet, _tokenId_crypto]);

        // assert
        assert.deepEqual(data, [
          [registry.address, cryptoResolver.address],
          [coinbase.address, coinbase.address],
          [['test.key1', 'test.key2'], ['test.key1', 'test.key2']],
          [['test.value1', 'test.value2'], ['test.value1', 'test.value2']]
        ]);
      });

      it('should return owners for multiple domains (including unknown)', async () => {
        // arrange
        const unknownTokenId = await registry.childIdOf(cryptoRoot, 'unknown');

        // act
        const data = await proxy.callStatic.getDataByHashForMany([], [tokenId_wallet, unknownTokenId]);

        // assert
        assert.deepEqual(data, [
          [registry.address, ZERO_ADDRESS],
          [coinbase.address, ZERO_ADDRESS],
          [[], []],
          [[], []]
        ]);
      });
    });

    describe('ownerOfForMany', () => {
      it('should return empty owner for unknown domain', async () => {
        const unknownTokenId = await registry.childIdOf(cryptoRoot, 'unknown');
        const owners = await proxy.callStatic.ownerOfForMany([unknownTokenId]);
        assert.deepEqual(owners, [ZERO_ADDRESS]);
      });

      it('should return empty list for empty list of domains', async () => {
        const owners = await proxy.callStatic.ownerOfForMany([]);
        assert.deepEqual(owners, []);
      });

      it('should return owners for multiple .crypto|.wallet domains', async () => {
        // arrange
        const _domainName = 'test_1211'
        const _tokenId_wallet = await registry.childIdOf(walletRoot, _domainName);
        const _tokenId_crypto = await registry.childIdOf(cryptoRoot, _domainName);
        await registry.mintSLD(accounts[0], walletRoot, _domainName);
        await cryptoMintingController.mintSLDWithResolver(coinbase.address, _domainName, cryptoResolver.address);

        // act
        const owners = await proxy.callStatic.ownerOfForMany([tokenId_wallet, _tokenId_wallet, _tokenId_crypto]);

        // assert
        assert.deepEqual(owners, [coinbase.address, accounts[0], coinbase.address]);
      });

      it('should return owners for multiple domains (including unknown)', async () => {
        // arrange
        const unknownTokenId = await registry.childIdOf(cryptoRoot, 'unknown');

        // act
        const owners = await proxy.callStatic.ownerOfForMany([tokenId_wallet, unknownTokenId]);

        // assert
        assert.deepEqual(owners, [coinbase.address, ZERO_ADDRESS]);
      });
    });
  });
});
