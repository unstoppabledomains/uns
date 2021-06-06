const { ZERO_ADDRESS } = require('./helpers/constants');
const { signTypedData } = require('./helpers/metatx');

const { utils, BigNumber } = ethers;

describe('Registry', () => {
  let Registry, SimpleMock;
  let registry, root;
  let signers, coinbase, accounts;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner, nonOwner, receiver, accessControl, operator] = signers;
    [, ...accounts] = signers.map(s => s.address);

    Registry = await ethers.getContractFactory('contracts/Registry.sol:Registry');
    SimpleMock = await ethers.getContractFactory('SimpleMock');

    root = BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');

    registry = await Registry.deploy();
    await registry.initialize(coinbase.address);
    await registry.mintTLD('0xdead000000000000000000000000000000000000', root);
    await registry.setTokenURIPrefix('/');
  })

  describe('Registry', () => {
    it('should construct itself correctly', async () => {
      assert.equal(root.toHexString(), '0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');
    })

    it('should resolve properly', async () => {
      const tok = await registry.childIdOf(root, 'resolution');

      await registry.mintSLD(coinbase.address, root, 'resolution');
      assert.equal(await registry.resolverOf(tok), registry.address);

      await registry.burn(tok);
      assert.equal(await registry.resolverOf(tok), ZERO_ADDRESS);

      await registry.mintSLD(coinbase.address, root, 'resolution');
      assert.equal(await registry.resolverOf(tok), registry.address);

      await registry.transferFrom(coinbase.address, accounts[0], tok);
    })

    it('should set URI prefix', async () => {
      assert.equal(await registry.tokenURI(root), `/${root}`);

      await registry.setTokenURIPrefix('prefix-');
      assert.equal(await registry.tokenURI(root), `prefix-${root}`);

      await registry.setTokenURIPrefix('/');
      assert.equal(await registry.tokenURI(root), `/${root}`);
    })
  });

  describe('Registry (SLD minter)', () => {
    it('minting SLDs', async () => {
      await registry.mintSLD(coinbase.address, root, 'label_22');
  
      const tok = await registry.childIdOf(root, 'label_22');
      assert.equal(coinbase.address, await registry.ownerOf(tok));
  
      // should fail to mint existing token
      await expect(
        registry.callStatic.mintSLD(coinbase.address, root, 'label_22')
      ).to.be.revertedWith('ERC721: token already minted');
      await expect(
        registry.callStatic.mintSLD(accounts[0], root, 'label_22')
      ).to.be.revertedWith('ERC721: token already minted');
  
      await registry.burn(tok);
      await registry.mintSLD(coinbase.address, root, 'label_22');
  
      assert.equal(coinbase.address, await registry.ownerOf(tok));
    })

    it('safe minting SLDs', async () => {
      const tok = await registry.childIdOf(root, 'label_93');
      await registry.functions['safeMintSLD(address,uint256,string)'](coinbase.address, root, 'label_93');
  
      assert.equal(coinbase.address, await registry.ownerOf(tok));
  
      // should fail to safely mint existing token contract
      await expect(
        registry.callStatic['safeMintSLD(address,uint256,string)'](coinbase.address, root, 'label_93')
      ).to.be.revertedWith('ERC721: token already minted');
  
      await registry.burn(tok)
  
      // should fail to safely mint token to non reciever contract
      await expect(
        registry.callStatic['safeMintSLD(address,uint256,string)'](registry.address, root, 'label_93')
      ).to.be.revertedWith('ERC721: transfer to non ERC721Receiver implementer');
  
      const simple = await SimpleMock.deploy();
      await registry.functions['safeMintSLD(address,uint256,string)'](simple.address, root, 'label_93');
  
      assert.equal(simple.address, await registry.ownerOf(tok));
    })
  });

  describe('Registry (records management)', () => {
    const initializeDomain = async (name) => {
      const tok = await registry.childIdOf(root, name);
      await registry.mintSLD(coinbase.address, root, name);
      return tok;
    }

    it('should resolve tokens', async () => {
      const tok = await registry.childIdOf(root, 'label_931')
  
      // should fail to set name if not owner
      await expect(
        registry.set('key', 'value', tok)
      ).to.be.revertedWith('ERC721: operator query for nonexistent token');

      await registry.mintSLD(coinbase.address, root, 'label_931')
      await registry.set('key', 'value', tok)
  
      assert.equal(
        await registry.get('key', tok),
        'value',
        'should resolve to resolver',
      )

      // should setMany
      await registry.setMany(['key1'], ['value1'], tok)
      await registry.setMany(['key2', 'key3'], ['value2', 'value3'], tok)
      await registry.setMany(['key4', 'key5', 'key6'], ['value4', 'value5', 'value6'], tok)
      assert.deepEqual(
        await registry.getMany(['key1', 'key2', 'key3', 'key4', 'key5', 'key6'], tok),
        ['value1', 'value2', 'value3', 'value4', 'value5', 'value6']
      );

      // should reset
      await expect(registry.reset(tok))
        .to.emit(registry, 'ResetRecords')
        .withArgs(tok.toString());
  
      // should fail to set name if not owned
      await expect(
        registry.connect(signers[1]).set('key', 'value', tok)
      ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    })

    it('should get key by hash', async () => {
      const tok = await initializeDomain('heyhash')
      const expectedKey = 'new-hashed-key'
      await registry.set(expectedKey, 'value', tok)
      const keyFromHash = await registry.getKey(BigNumber.from(utils.id(expectedKey)))
  
      assert.equal(keyFromHash, expectedKey)
    })

    it('should get many keys by hashes', async () => {
      const tok = await initializeDomain('heyhash-many')
      const expectedKeys = ['keyhash-many-1', 'keyhash-many-2']
      await registry.setMany(expectedKeys, ['value', 'value'], tok)
      const expectedKeyHashes = expectedKeys.map(key => BigNumber.from(utils.id(key)));
      const keysFromHashes = await registry.getKeys(expectedKeyHashes)

      assert.deepEqual(keysFromHashes, expectedKeys)
    })

    it('should not consume additional gas if key hash was set before', async () => {
      const tok = await initializeDomain('heyhash-gas')
      let newKeyHashTx = await registry.set('keyhash-gas', 'value', tok)
      newKeyHashTx.receipt = await newKeyHashTx.wait();
      let exitsKeyHashTx = await registry.set('keyhash-gas', 'value', tok)
      exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
      assert.isAbove(newKeyHashTx.receipt.gasUsed, exitsKeyHashTx.receipt.gasUsed)

      newKeyHashTx = await registry.setMany(['keyhash-gas-1', 'keyhash-gas-2'], ['value-1', 'value-2'], tok)
      newKeyHashTx.receipt = await newKeyHashTx.wait();
      exitsKeyHashTx = await registry.setMany(['keyhash-gas-1', 'keyhash-gas-2'], ['value-1', 'value-2'], tok)
      exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
      assert.isAbove(newKeyHashTx.receipt.gasUsed, exitsKeyHashTx.receipt.gasUsed)

      newKeyHashTx = await registry.setMany(['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'], ['value-1', 'value-2', 'value-3'], tok)
      newKeyHashTx.receipt = await newKeyHashTx.wait();
      exitsKeyHashTx = await registry.setMany(['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'], ['value-1', 'value-2', 'value-3'], tok)
      exitsKeyHashTx.receipt = await exitsKeyHashTx.wait();
      assert.isAbove(newKeyHashTx.receipt.gasUsed, exitsKeyHashTx.receipt.gasUsed)
    })

    it('should get value by key hash', async () => {
      const tok = await initializeDomain('get-key-by-hash')
      const key = 'get-key-by-hash-key'
      const expectedValue = 'get-key-by-hash-value'
      await registry.set(key, expectedValue, tok)
      const result = await registry.getByHash(utils.id(key), tok)
  
      assert.equal(result.value, expectedValue)
      assert.equal(result.key, key)
    })

    it('should get multiple values by hashes', async () => {
      const tok = await initializeDomain('get-many-keys-by-hash')
      const keys = ['key-to-hash-1', 'key-to-hash-2']
      const expectedValues = ['value-42', 'value-43']
      await registry.setMany(keys, expectedValues, tok)
      const hashedKeys = keys.map(key => BigNumber.from(utils.id(key)));
      const result = await registry.getManyByHash(hashedKeys, tok)
  
      assert.deepEqual(result, [keys, expectedValues])
    })

    it('should emit NewKey event new keys added', async () => {
      const tok = await initializeDomain('new-key')
      const key = 'new-key'
      const value = 'value';

      await expect(registry.set(key, value, tok))
        .to.emit(registry, 'NewKey')
        .withArgs(tok, utils.id(key), key);

      await expect(registry.set(key, value, tok))
        .not.to.emit(registry, 'NewKey')
    })

    it('should emit correct Set event', async () => {
      const tok = await initializeDomain('check-set-event')
      const key = 'new-key'
      const value = 'value';

      await expect(registry.set(key, value, tok))
        .to.emit(registry, 'Set')
        .withArgs(
          tok,
          utils.id(key),
          utils.id(value),
          key,
          value,
        );
    })

    it('should reconfigure resolver with new values', async () => {
      const tok = await initializeDomain('reconfigure')
      await registry.set('old-key', 'old-value', tok)
      await registry.reconfigure(['new-key'], ['new-value'], tok)
  
      assert.equal(await registry.get('old-key', tok), '')
      assert.equal(await registry.get('new-key', tok), 'new-value')

      // should fail when trying to reconfigure non-owned domain
      await expect(
        registry.connect(signers[1]).reconfigure(['new-key'], ['new-value'], tok)
      ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    })
  });

  describe('Metatx', () => {
    const receiverAddress = '0x1234567890123456789012345678901234567890';

    const getReason = (returnData) => {
      let reason;
      if (returnData && returnData.slice(2, 10).toString('hex') === '08c379a0') {
        var abiCoder = new utils.AbiCoder();
        reason = abiCoder.decode(['string'], '0x' + returnData.slice(10))[0];
      }
      return reason;
    }

    it('should transfer using meta-setOwner', async () => {
      const tok = await registry.childIdOf(root, 'res_label_113a');
      await registry.mintSLD(owner.address, root, 'res_label_113a');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(owner.address)),
        data: registry.interface.encodeFunctionData('setOwner', [receiver.address, tok]),
      };
      const sig = await signTypedData(registry.address, owner, req);
      await registry.execute(req, sig);

      assert.equal(receiver.address, await registry.ownerOf(tok))
    })

    it('should setApprovalForAll using meta-setApprovalForAll', async () => {
      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: 0,
        nonce: Number(await registry.nonceOf(owner.address)),
        data: registry.interface.encodeFunctionData('setApprovalForAll', [operator.address, true]),
      };
      const sig = await signTypedData(registry.address, owner, req);
      const [success, ] = await registry.callStatic.execute(req, sig);
      expect(success).to.be.true;
    })

    it('should revert meta-setApprovalForAll for non-onwer', async () => {
      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: 0,
        nonce: Number(await registry.nonceOf(owner.address)),
        data: registry.interface.encodeFunctionData('setApprovalForAll', [operator.address, true]),
      };
      const sig = await signTypedData(registry.address, nonOwner, req);
      await expect(registry.execute(req, sig)).to.be
        .revertedWith('RegistryForwarder: signature does not match request');
    })

    it('should transfer using meta-transferFrom', async () => {
      const tok = await registry.childIdOf(root, 'meta_1591');
      await registry.mintSLD(owner.address, root, 'meta_1591');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData('transferFrom', [owner.address, receiverAddress, tok]),
      };
      const sig = await signTypedData(registry.address, owner, req);
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok), receiverAddress);
    })

    it('should revert meta-transferFrom for non-onwer', async () => {
      const tok = await registry.childIdOf(root, 'meta_6458');
      await registry.mintSLD(owner.address, root, 'meta_6458');

      const req = {
        from: nonOwner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData('transferFrom', [nonOwner.address, receiverAddress, tok]),
      };
      const sig = await signTypedData(registry.address, nonOwner, req);
      const [success, ] = await registry.callStatic.execute(req, sig);
      expect(success).to.be.false;
    })

    it('should transfer using meta-safeTransferFrom', async () => {
      const tok = await registry.childIdOf(root, 'meta_10235');
      await registry.mintSLD(owner.address, root, 'meta_10235');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData(
          'safeTransferFrom(address,address,uint256)',
          [owner.address, receiverAddress, tok]
        ),
      };
      const sig = await signTypedData(registry.address, owner, req);
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok), receiverAddress);
    })

    it('should revert meta-safeTransferFrom for non-onwer', async () => {
      const tok = await registry.childIdOf(root, 'meta_e5iuw');
      await registry.mintSLD(owner.address, root, 'meta_e5iuw');

      const req = {
        from: nonOwner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData(
          'safeTransferFrom(address,address,uint256)',
          [nonOwner.address, receiverAddress, tok]
        ),
      };
      const sig = await signTypedData(registry.address, nonOwner, req);
      const [success, ] = await registry.callStatic.execute(req, sig);
      expect(success).to.be.false;
    })

    // TODO: add tests for safeTransferFrom(address,address,uint256,bytes)

    it('should burn using meta-burn', async () => {
      const tok = await registry.childIdOf(root, 'meta_ar093');
      await registry.mintSLD(owner.address, root, 'meta_ar093');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData('burn', [tok]),
      };
      const sig = await signTypedData(registry.address, owner, req);
      await registry.execute(req, sig);
  
      await expect(registry.ownerOf(tok)).to.be.revertedWith('ERC721: owner query for nonexistent token');
    })

    it('should revert meta-burn for non-onwer', async () => {
      const tok = await registry.childIdOf(root, 'meta_53dg3');
      await registry.mintSLD(owner.address, root, 'meta_53dg3');

      const req = {
        from: nonOwner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData('burn', [tok]),
      };
      const sig = await signTypedData(registry.address, nonOwner, req);
      const [success, ] = await registry.callStatic.execute(req, sig);
      expect(success).to.be.false;
    })

    describe('ABI-based tests', () => {
      const registryFuncs = () => {
        return Registry.interface.fragments
          .filter(x => x.type === 'function' && !['view', 'pure'].includes(x.stateMutability))
      }

      const buidRequest = async (fragment, from, reqId, paramsMap) => {
        const funcSig = funcFragmentToSig(fragment);
        const req = {
          from,
          gas: '200000',
          tokenId: reqId,
          nonce: Number(await registry.nonceOf(reqId)),
          data: registry.interface.encodeFunctionData(funcSig, fragment.inputs.map(x => paramsMap[x.name])),
        };
        return req;
      }

      const funcFragmentToSig = (fragment) => {
        return `${fragment.name}(${fragment.inputs.map(x => `${x.type} ${x.name}`).join(',')})`;
      };

      describe('Token-based functions', () => {
        const paramValueMap = {
          label: 'label',
          '_data': '0x',
          key: 'key1',
          value: 'value',
          keys: ['key1'],
          values: ['value1']
        }

        const excluded = ['mintTLD'];

        const getFuncs = () => {
          return registryFuncs()
            .filter(x => x.inputs.filter(i => i.name === 'tokenId').length)
            .filter(x => !excluded.includes(x.name));
        }

        const mintToken = async (owner, label) => {
          await registry.mintSLD(owner.address, root, label);
        }

        before(async () => {
          paramValueMap.from = owner.address;
          paramValueMap.to = receiver.address;
        })

        it('should execute all functions successfully', async () => {
          for(const func of getFuncs()) {
            const funcSigHash = utils.id(`${funcFragmentToSig(func)}_ok`);
            paramValueMap.tokenId = await registry.childIdOf(root, funcSigHash);
            await mintToken(owner, funcSigHash);

            const req = await buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
            const sig = await signTypedData(registry.address, owner, req);
            const [success, returnData] = await registry.callStatic.execute(req, sig);

            if(!success) {
              console.error(getReason(returnData));
            }
            expect(success).to.be.true;
          }
        })

        it('should revert execution of all token-based functions when used signature', async () => {
          for(const func of getFuncs()) {
            const funcSig = funcFragmentToSig(func)
            const funcSigHash = utils.id(`${funcSig}_doubleUse`);
            paramValueMap.tokenId = await registry.childIdOf(root, funcSigHash);
            await mintToken(owner, funcSigHash);

            const req = await buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
            const sig = await signTypedData(registry.address, owner, req);

            const [success, returnData] = await registry.callStatic.execute(req, sig);
            if(!success) {
              console.log(funcSig, func.inputs.map(x => paramValueMap[x.name]));
              console.error(getReason(returnData));
            }
            expect(success).to.be.true;

            await registry.execute(req, sig);

            await expect(registry.execute(req, sig)).to.be
              .revertedWith('RegistryForwarder: signature does not match request');
          }
        })

        it('should fail execution of all token-based functions when tokenId does not match', async () => {
          for(const func of getFuncs()) {
            const funcSig = funcFragmentToSig(func);
            const funcSigHash = utils.id(`${funcSig}_wrongToken`);

            paramValueMap.tokenId = await registry.childIdOf(root, funcSigHash);
            await mintToken(owner, funcSigHash);

            const tokenIdForwarder = await registry.childIdOf(root, utils.id(`_${funcSig}`));
            const req = await buidRequest(func, owner.address, tokenIdForwarder, paramValueMap);
            const sig = await signTypedData(registry.address, owner, req);
            const [success, returnData] = await registry.callStatic.execute(req, sig);

            expect(success).to.be.false;
            expect(getReason(returnData)).to.be.eql('ERC2771RegistryContext: TOKEN_INVALID');
          }
        })

        it('should fail execution of all token-based functions when tokenId is empty', async () => {
          for(const func of getFuncs()) {
            const funcSigHash = utils.id(`${funcFragmentToSig(func)}_emptyTokenId`);
            paramValueMap.tokenId = await registry.childIdOf(root, funcSigHash);
            await mintToken(owner, funcSigHash);

            const req = await buidRequest(func, owner.address, 0, paramValueMap);
            const sig = await signTypedData(registry.address, owner, req);
            const [success, returndata] = await registry.callStatic.execute(req, sig);

            expect(success).to.be.false;
            expect(getReason(returndata)).to.be.eql('ERC2771RegistryContext: TOKEN_INVALID');
          }
        })
      })

      describe('Non-Token functions', () => {
        const paramValueMap = {
          label: 'label',
          '_data': '0x',
          role: '0x1000000000000000000000000000000000000000000000000000000000000000',
          keys: ['key1'],
          values: ['value1'],
          approved: true,
          prefix: '/'
        };

        const excluded = [
          'execute',
          'multicall',
          'initialize',
          'transferOwnership',  // might influence tests
          'renounceOwnership',  // might influence tests
        ];

        before(async () => {
          paramValueMap.tld = root;
          paramValueMap.account = accessControl.address;
          paramValueMap.to = owner.address;
          paramValueMap.operator = operator.address;
        })

        const getFuncs = () => {
          return registryFuncs()
            .filter(x => !x.inputs.filter(i => i.name === 'tokenId').length)
            .filter(x => !excluded.includes(x.name));
        }

        it('should execute all functions successfully', async () => {
          for(const func of getFuncs()) {
            const funcSig = funcFragmentToSig(func);
            paramValueMap.label = utils.id(`${funcSig}_label`);

            const req = await buidRequest(func, coinbase.address, 0, paramValueMap);
            const sig = await signTypedData(registry.address, coinbase, req);
            const [success, returnData] = await registry.callStatic.execute(req, sig);

            if(!success) {
              console.log(funcSig, func.inputs.map(x => paramValueMap[x.name]));
              console.error(getReason(returnData));
            }
            expect(success).to.be.true;
          }
        })

        it('should revert execution of all functions when used signature', async () => {
          for(const func of getFuncs()) {
            const funcSig = funcFragmentToSig(func);
            paramValueMap.label = utils.id(`${funcSig}_doubleUse`);

            const tokenIdForwarder = await registry.childIdOf(root, utils.id(`_${funcSig}`));
            const req = await buidRequest(func, coinbase.address, tokenIdForwarder, paramValueMap);
            const sig = await signTypedData(registry.address, coinbase, req);

            const [success, returnData] = await registry.callStatic.execute(req, sig);
            if(!success) {
              console.log(funcSig, func.inputs.map(x => paramValueMap[x.name]));
              console.error(getReason(returnData));
            }
            expect(success).to.be.true;

            await registry.execute(req, sig);

            await expect(registry.execute(req, sig)).to.be
              .revertedWith('RegistryForwarder: signature does not match request');
          }
        })

        it('should revert execution of all functions when used signature and tokenId is empty', async () => {
          for(const func of getFuncs()) {
            const funcSig = funcFragmentToSig(func);
            paramValueMap.label = utils.id(`${funcSig}_doubleUse_0`);

            const tokenId = 0;
            const nonce = await registry.nonceOf(tokenId);
            const req = await buidRequest(func, coinbase.address, tokenId, paramValueMap);
            const sig = await signTypedData(registry.address, coinbase, req);

            const [success, returnData] = await registry.callStatic.execute(req, sig);
            if(!success) {
              console.log(funcSig, func.inputs.map(x => paramValueMap[x.name]));
              console.error(getReason(returnData));
            }
            expect(success).to.be.true;

            await registry.execute(req, sig);

            expect(await registry.nonceOf(tokenId)).to.be.equal(nonce.add(1));
            await expect(registry.execute(req, sig)).to.be
              .revertedWith('RegistryForwarder: signature does not match request');
          }
        })
      })
    })
  });

  describe('Multicall', () => {
    it('should mint multiple domains', async () => {
      const tok1 = await registry.childIdOf(root, 'mul_z13');
      const tok2 = await registry.childIdOf(root, 'mul_z20');

      await registry.multicall([
        registry.interface.encodeFunctionData('mintSLD', [owner.address, root, 'mul_z13']),
        registry.interface.encodeFunctionData('mintSLD', [receiver.address, root, 'mul_z20'])
      ]);

      assert.equal(owner.address, await registry.ownerOf(tok1));
      assert.equal(receiver.address, await registry.ownerOf(tok2));
    });

    it('should set multiple records', async () => {
      const tok = await registry.childIdOf(root, 'mul_m39');
      await registry.mintSLD(owner.address, root, 'mul_m39');

      await registry.connect(owner).multicall([
        registry.interface.encodeFunctionData('set', ['key1', 'value1', tok]),
        registry.interface.encodeFunctionData('set', ['key2', 'value2', tok])
      ]);

      assert.equal(owner.address, await registry.ownerOf(tok));
      assert.equal('value1', await registry.get('key1', tok));
      assert.equal('value2', await registry.get('key2', tok));
    });

    it.skip('should ', async () => {
      const tok1 = await registry.childIdOf(root, 'mul_s79');
      await registry.mintSLD(coinbase.address, root, 'mul_s79');

      const tok2 = await registry.childIdOf(root, 'mul_l20');
      await registry.mintSLD(coinbase.address, root, 'mul_l20');

      const s = await registry.multicall([
        registry.interface.encodeFunctionData('set', ['key1', 'value1', tok1]),
        registry.interface.encodeFunctionData('set', ['key2', 'value2', tok1])
      ]);
      s.receipt = await s.wait();
      console.log(s.receipt.gasUsed.toString());

      const t = await registry.setMany(['key1', 'key2'], ['value1', 'value2'], tok2);
      t.receipt = await t.wait();
      console.log(t.receipt.gasUsed.toString());
    });
  })
})
