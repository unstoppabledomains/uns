const { expectRevert, constants } = require('@openzeppelin/test-helpers');
const { utils } = require('web3');

const Registry = artifacts.require('Registry.sol');
const MintingController = artifacts.require('controller/MintingController.sol');
const ProxyReader = artifacts.require('ProxyReader.sol');

const { ZERO_ADDRESS } = constants;

contract('ProxyReader', ([coinbase, ...accounts]) => {
	const domainName = 'test_42';
	const keys = ['test.key1', 'test.key2'];
	const values = ['test.value1', 'test.value2'];
	let registry, proxy, tokenId, mintingController;

  describe('ProxyReader', async () => {
    before(async () => {
      registry = await Registry.new();
      mintingController = await MintingController.new(registry.address);
      await registry.addController(mintingController.address);

      await mintingController.mintSLD(coinbase, domainName);
      tokenId = await registry.childIdOf(await registry.root(), domainName);
      
      proxy = await ProxyReader.new(registry.address);
    });

    it('should revert when registry is empty', async () => {
      await expectRevert(ProxyReader.new(ZERO_ADDRESS), 'Registry is empty');
    });

    it('should support IERC165 interface', async () => {
      const isSupport = await proxy.supportsInterface('0x01ffc9a7');
      assert.isTrue(isSupport);
    });

    describe('IRegistryReader', () => {
      it('should support IRegistryReader interface', async () => {
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
        const expected = await registry.root();
        assert.equal(result.toString(), expected.toString());
      });
    });

    describe('IRecordReader', () => {
      it('should support IRecordReader interface', async () => {
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
        const keyHash = utils.keccak256(keys[0]);
        const result = await proxy.getByHash(keyHash, tokenId);
        const expected = await registry.getByHash(keyHash, tokenId);
        assert.equal(result.toString(), expected.toString());
      });

      it('should proxy getManyByHash call', async () => {
        const keyHash = utils.keccak256(keys[0]);
        const result = await proxy.getManyByHash([keyHash], tokenId);
        const expected = await registry.getManyByHash([keyHash], tokenId);
        assert.deepEqual(result, expected);
      });
    });

    describe('IDataReader', () => {
      it('should support IDataReader interface', async () => {
        const isSupport = await proxy.supportsInterface('0x46d43268');
        assert.isTrue(isSupport);
      });

      describe('getData', () => {
        it('should return data by keys', async () => {
          // arrange
          const _domainName = 'hey_hoy_121'
          await mintingController.mintSLD(coinbase, _domainName);
          const _tokenId = await registry.childIdOf(await registry.root(), _domainName);

          // act
          const data = await proxy.getData.call(keys, _tokenId);

          // asserts
          assert.equal(data.owner, coinbase);
          assert.deepEqual(data.values, ['','']);
        });
      });

      describe('getDataForMany', () => {
        it('should return empty lists for empty list of tokens', async () => {
          const data = await proxy.getDataForMany.call([], [])

          assert.deepEqual(data.owners, []);
          assert.deepEqual(data.values, []);
        });

        it('should return data for multiple tokens', async () => {
          // arrange
          const _domainName = 'test_1291'
          await mintingController.mintSLD(accounts[0], _domainName);
          const _tokenId = await registry.childIdOf(await registry.root(), _domainName);
          for (let i = 0; i < keys.length; i++) {
              await registry.set(keys[i], values[i], tokenId);
          }

          // act
          const data = await proxy.getDataForMany.call(keys, [tokenId, _tokenId]);
          
          // assert
          assert.deepEqual(data.owners, [coinbase, accounts[0]]);
          assert.deepEqual(data.values, [['test.value1', 'test.value2'], ["", ""]]);
        });

        it('should return owners for multiple tokens (including unknown)', async () => {
          // arrange
          const unknownTokenId = await registry.childIdOf(await registry.root(), 'unknown');

          // act
          const data = await proxy.getDataForMany.call([], [tokenId, unknownTokenId]);
          
          // assert
          assert.deepEqual(data.owners, [coinbase, ZERO_ADDRESS]);
          assert.deepEqual(data.values, [[], []]);
        });
      });

      describe('getDataByHash', () => {
        it('should return data by hashes', async () => {
          // arrange
          const hashes = keys.map(utils.keccak256);
          for (let i = 0; i < keys.length; i++) {
              await registry.set(keys[i], values[i], tokenId);
          }

          // act
          const data = await proxy.getDataByHash.call(hashes, tokenId);

          // assert
          assert.equal(data.owner, coinbase);
          assert.deepEqual(data.keys, keys);
          assert.deepEqual(data.values, values);
        });
      });

      describe('getDataByHashForMany', () => {
        it('should return empty lists for empty list of tokens', async () => {
          const data = await proxy.getDataByHashForMany.call([], [])

          assert.deepEqual(data.owners, []);
          assert.deepEqual(data.keys, []);
          assert.deepEqual(data.values, []);
        });

        it('should return data for multiple tokens', async () => {
          // arrange
          const _domainName = 'test_1082q'
          await mintingController.mintSLD(accounts[0], _domainName);
          const _tokenId = await registry.childIdOf(await registry.root(), _domainName);
          const hashes = keys.map(utils.keccak256);
          for (let i = 0; i < keys.length; i++) {
              await registry.set(keys[i], values[i], tokenId);
          }

          // act
          const data = await proxy.getDataByHashForMany.call(hashes, [tokenId, _tokenId]);
          
          // assert
          assert.deepEqual(data.owners, [coinbase, accounts[0]]);
          assert.deepEqual(data.keys, [['test.key1', 'test.key2'], ['test.key1', 'test.key2']]);
          assert.deepEqual(data.values, [['test.value1', 'test.value2'], ['', '']]);
        });

        it('should return owners for multiple tokens (including unknown)', async () => {
          // arrange
          const unknownTokenId = await registry.childIdOf(await registry.root(), 'unknown');

          // act
          const data = await proxy.getDataByHashForMany.call([], [tokenId, unknownTokenId]);
          
          // assert
          assert.deepEqual(data.owners, [coinbase, ZERO_ADDRESS]);
          assert.deepEqual(data.keys, [[], []]);
          assert.deepEqual(data.values, [[], []]);
        });
      });

      describe('ownerOfForMany', () => {
        it('should return empty owner for unknown token', async () => {
          const unknownTokenId = await registry.childIdOf(await registry.root(), 'unknown');
          const owners = await proxy.ownerOfForMany.call([unknownTokenId]);
          assert.deepEqual(owners, [ZERO_ADDRESS]);
        });

        it('should return empty list for empty list of tokens', async () => {
          const owners = await proxy.ownerOfForMany.call([]);
          assert.deepEqual(owners, []);
        });

        it('should return owners for multiple tokens', async () => {
          // arrange
          const _domainName = 'test_1211'
          await mintingController.mintSLD(accounts[0], _domainName);
          const _tokenId = await registry.childIdOf(await registry.root(), _domainName);

          // act
          const owners = await proxy.ownerOfForMany.call([tokenId, _tokenId]);
          
          // assert
          assert.deepEqual(owners, [coinbase, accounts[0]]);
        });

        it('should return owners for multiple tokens (including unknown)', async () => {
          // arrange
          const unknownTokenId = await registry.childIdOf(await registry.root(), 'unknown');

          // act
          const owners = await proxy.ownerOfForMany.call([tokenId, unknownTokenId]);
          
          // assert
          assert.deepEqual(owners, [coinbase, ZERO_ADDRESS]);
        });
      });
    });
  });
});
