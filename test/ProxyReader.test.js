const { ZERO_ADDRESS } = require('./helpers/constants');

const { utils } = ethers;

describe('ProxyReader', () => {
  const domainName = 'test_42';
  const keys = ['test.key1', 'test.key2'];
  const values = ['test.value1', 'test.value2'];
  let Registry, ProxyReader;
  let registry, root, proxy, tokenId;
  let signers, coinbase, accounts;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, ...accounts] = signers.map(s => s.address);

    Registry = await ethers.getContractFactory('Registry');
    ProxyReader = await ethers.getContractFactory('ProxyReader');

    registry = await Registry.deploy();
    await registry.initialize();

    root = await registry.root();

    await registry.mintSLD(coinbase, domainName);
    tokenId = await registry.childIdOf(root, domainName);

    proxy = await ProxyReader.deploy(registry.address);
  });

  it('should revert when registry is empty', async () => {
    await expect(
      ProxyReader.deploy(ZERO_ADDRESS)
    ).to.be.revertedWith('Registry is empty');
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
      * bytes4(keccak256(abi.encodePacked('isController(address)'))) == 0xb429afeb
      * bytes4(keccak256(abi.encodePacked('balanceOf(address)'))) == 0x70a08231
      * bytes4(keccak256(abi.encodePacked('ownerOf(uint256)'))) == 0x6352211e
      * bytes4(keccak256(abi.encodePacked('getApproved(uint256)'))) == 0x081812fc
      * bytes4(keccak256(abi.encodePacked('isApprovedForAll(address,address)'))) == 0xe985e9c5
      * bytes4(keccak256(abi.encodePacked('root()'))) == 0xebf0c717
      *
      * => 0x06fdde03 ^ 0x95d89b41 ^ 0xc87b56dd ^ 0x430c2081 ^
      *    0xb3f9e4cb ^ 0x68b62d32 ^ 0xb429afeb ^ 0x70a08231 ^
      *    0x6352211e ^ 0x081812fc ^ 0xe985e9c5 ^ 0xebf0c717 == 0x6eabca0d
      */
      const isSupport = await proxy.supportsInterface('0x6eabca0d');
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

    it('should proxy tokenURI call', async () => {
      const result = await proxy.tokenURI(tokenId);
      const expected = await registry.tokenURI(tokenId);
      assert.equal(result, expected);
    });

    it('should proxy isApprovedOrOwner call', async () => {
      const result = await proxy.isApprovedOrOwner(accounts[0], tokenId);
      const expected = await registry.isApprovedOrOwner(accounts[0], tokenId);
      assert.equal(result, expected);
    });

    it('should proxy resolverOf call', async () => {
        const result = await proxy.resolverOf(tokenId);
        const expected = await registry.resolverOf(tokenId);
        assert.equal(result, expected);
    });

    it('should proxy childIdOf call', async () => {
      const result = await proxy.childIdOf(tokenId, 't1');
      const expected = await registry.childIdOf(tokenId, 't1');
      assert.equal(result.toString(), expected.toString());
    });

    it('should proxy isController call', async () => {
      const result = await proxy.isController(accounts[0]);
      const expected = await registry.isController(accounts[0]);
      assert.equal(result, expected);
    });

    it('should proxy balanceOf call', async () => {
      const result = await proxy.balanceOf(accounts[0]);
      const expected = await registry.balanceOf(accounts[0]);
      assert.equal(result.toString(), expected.toString());
    });

    it('should proxy ownerOf call', async () => {
      const result = await proxy.ownerOf(tokenId);
      const expected = await registry.ownerOf(tokenId);
      assert.equal(result, expected);
    });

    it('should proxy getApproved call', async () => {
      const result = await proxy.getApproved(tokenId);
      const expected = await registry.getApproved(tokenId);
      assert.equal(result, expected);
    });

    it('should proxy isApprovedForAll call', async () => {
      const result = await proxy.isApprovedForAll(accounts[0], accounts[1]);
      const expected = await registry.isApprovedForAll(accounts[0], accounts[1]);
      assert.equal(result, expected);
    });

    it('should proxy root call', async () => {
      const result = await proxy.root();
      const expected = root;
      assert.equal(result.toString(), expected.toString());
    });
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

    describe('getMany', () => {
      it('should return list with empty value for unregistered key', async () => {
        const result = await proxy.getMany([keys[0]], tokenId);
        assert.equal(result.length, 1);
        assert.equal(result[0], '');
      });

      it('should return list with single value', async () => {
        const [key] = keys;
        const [value] = values;
        await registry.set(key, value, tokenId);

        const result = await proxy.getMany([key], tokenId);
        assert.equal(result.length, 1);
        assert.equal(result[0], value);
      });

      it('should return list with multiple values', async () => {
        for (let i = 0; i < keys.length; i++) {
          await registry.set(keys[i], values[i], tokenId);
        }

        const result = await proxy.getMany(keys, tokenId);
        assert.deepEqual(result, values);
      });
    });

    it('should proxy get call', async () => {
      const result = await proxy.get(keys[0], tokenId);
      const expected = await registry.get(keys[0], tokenId);
      assert.equal(result, expected);
    });

    it('should proxy getByHash call', async () => {
      const keyHash = utils.id(keys[0]);
      const result = await proxy.getByHash(keyHash, tokenId);
      const expected = await registry.getByHash(keyHash, tokenId);
      assert.equal(result.toString(), expected.toString());
    });

    it('should proxy getManyByHash call', async () => {
      const keyHash = utils.id(keys[0]);
      const result = await proxy.getManyByHash([keyHash], tokenId);
      const expected = await registry.getManyByHash([keyHash], tokenId);
      assert.deepEqual(result, expected);
    });
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
        const _tokenId = await registry.childIdOf(root, _domainName);

        // act
        const data = await proxy.callStatic.getData(keys, _tokenId);

        // asserts
        assert.deepEqual(data, [ZERO_ADDRESS, ['','']]);
      });

      it('should return data by keys', async () => {
        // arrange
        const _domainName = 'hey_hoy_121';
        await registry.mintSLD(coinbase, _domainName);
        const _tokenId = await registry.childIdOf(root, _domainName);

        // act
        const data = await proxy.callStatic.getData(keys, _tokenId);

        // asserts
        assert.deepEqual(data, [coinbase, ['','']]);
      });
    });

    describe('getDataForMany', () => {
      it('should return empty lists for empty list of tokens', async () => {
        const data = await proxy.callStatic.getDataForMany([], [])

        assert.deepEqual(data, [[],[]]);
      });

      it('should return data for multiple tokens', async () => {
        // arrange
        const _domainName = 'test_1291'
        await registry.mintSLD(accounts[0], _domainName);
        const _tokenId = await registry.childIdOf(root, _domainName);
        for (let i = 0; i < keys.length; i++) {
            await registry.set(keys[i], values[i], tokenId);
        }

        // act
        const data = await proxy.callStatic.getDataForMany(keys, [tokenId, _tokenId]);
        
        // assert
        assert.deepEqual(data, [
          [coinbase, accounts[0]],
          [['test.value1', 'test.value2'], ['', '']]
        ]);
      });

      it('should return owners for multiple tokens (including unknown)', async () => {
        // arrange
        const unknownTokenId = await registry.childIdOf(root, 'unknown');

        // act
        const data = await proxy.callStatic.getDataForMany([], [tokenId, unknownTokenId]);
        
        // assert
        assert.deepEqual(data, [
          [coinbase, ZERO_ADDRESS],
          [[], []]
        ]);
      });
    });

    describe('getDataByHash', () => {
      it('should return data by hashes', async () => {
        // arrange
        const hashes = keys.map(utils.id);
        for (let i = 0; i < keys.length; i++) {
            await registry.set(keys[i], values[i], tokenId);
        }

        // act
        const data = await proxy.callStatic.getDataByHash(hashes, tokenId);

        // assert
        assert.deepEqual(data, [
          coinbase,
          keys,
          values
        ]);
      });
    });

    describe('getDataByHashForMany', () => {
      it('should return empty lists for empty list of tokens', async () => {
        const data = await proxy.callStatic.getDataByHashForMany([], [])

        assert.deepEqual(data, [[], [], []]);
      });

      it('should return data for multiple tokens', async () => {
        // arrange
        const _domainName = 'test_1082q'
        await registry.mintSLD(accounts[0], _domainName);
        const _tokenId = await registry.childIdOf(root, _domainName);
        const hashes = keys.map(utils.id);
        for (let i = 0; i < keys.length; i++) {
            await registry.set(keys[i], values[i], tokenId);
        }

        // act
        const data = await proxy.callStatic.getDataByHashForMany(hashes, [tokenId, _tokenId]);
        
        // assert
        assert.deepEqual(data, [
          [coinbase, accounts[0]],
          [['test.key1', 'test.key2'], ['test.key1', 'test.key2']],
          [['test.value1', 'test.value2'], ['', '']]
        ]);
      });

      it('should return owners for multiple tokens (including unknown)', async () => {
        // arrange
        const unknownTokenId = await registry.childIdOf(root, 'unknown');

        // act
        const data = await proxy.callStatic.getDataByHashForMany([], [tokenId, unknownTokenId]);
        
        // assert
        assert.deepEqual(data, [
          [coinbase, ZERO_ADDRESS],
          [[], []],
          [[], []]
        ]);
      });
    });

    describe('ownerOfForMany', () => {
      it('should return empty owner for unknown token', async () => {
        const unknownTokenId = await registry.childIdOf(root, 'unknown');
        const owners = await proxy.callStatic.ownerOfForMany([unknownTokenId]);
        assert.deepEqual(owners, [ZERO_ADDRESS]);
      });

      it('should return empty list for empty list of tokens', async () => {
        const owners = await proxy.callStatic.ownerOfForMany([]);
        assert.deepEqual(owners, []);
      });

      it('should return owners for multiple tokens', async () => {
        // arrange
        const _domainName = 'test_1211'
        await registry.mintSLD(accounts[0], _domainName);
        const _tokenId = await registry.childIdOf(root, _domainName);

        // act
        const owners = await proxy.callStatic.ownerOfForMany([tokenId, _tokenId]);
        
        // assert
        assert.deepEqual(owners, [coinbase, accounts[0]]);
      });

      it('should return owners for multiple tokens (including unknown)', async () => {
        // arrange
        const unknownTokenId = await registry.childIdOf(root, 'unknown');

        // act
        const owners = await proxy.callStatic.ownerOfForMany([tokenId, unknownTokenId]);
        
        // assert
        assert.deepEqual(owners, [coinbase, ZERO_ADDRESS]);
      });
    });
  });

  describe('IRegistryProvider', () => {
    it('should proxy registry call', async () => {
        const result = await proxy.registry();
        assert.equal(result, registry.address);
    });
  });
});
