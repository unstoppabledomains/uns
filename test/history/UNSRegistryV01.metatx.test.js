const { ethers } = require('hardhat');
const { expect } = require('chai');

const { signTypedData } = require('./../helpers/metatx');

const { utils, BigNumber } = ethers;

describe('UNSRegistryV01 (metatx)', () => {
  let UNSRegistry;
  let unsRegistry, root;
  let signers, coinbase, owner, nonOwner, receiver, accessControl, operator;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner, nonOwner, receiver, accessControl, operator] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistryV01');

    root = BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');

    unsRegistry = await UNSRegistry.deploy();
    await unsRegistry.initialize(coinbase.address);
    await unsRegistry.mint('0xdead000000000000000000000000000000000000', root, 'crypto');
    await unsRegistry.setTokenURIPrefix('/');
  });

  describe('General', () => {
    const receiverAddress = '0x1234567890123456789012345678901234567890';

    it('should transfer using meta-setOwner', async () => {
      const owner = signers[1];
      const receiver = signers[2];
      const tok = await unsRegistry.childIdOf(root, 'res_label_113a');
      await unsRegistry.mint(owner.address, tok, 'res_label_113a');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await unsRegistry.nonceOf(owner.address)),
        data: unsRegistry.interface.encodeFunctionData('setOwner', [receiver.address, tok]),
      };
      const sig = await signTypedData(unsRegistry.address, owner, req);
      await unsRegistry.execute(req, sig);

      expect(await unsRegistry.ownerOf(tok)).to.be.equal(receiver.address);
    });

    it('should revert transfer using meta-setOwner when nonce invalidated', async () => {
      const owner = signers[1];
      const receiver = signers[2];
      const tok = await unsRegistry.childIdOf(root, 'res_label_0896');
      await unsRegistry.mint(owner.address, tok, 'res_label_0896');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await unsRegistry.nonceOf(owner.address)),
        data: unsRegistry.interface.encodeFunctionData('setOwner', [receiver.address, tok]),
      };
      const sig = await signTypedData(unsRegistry.address, owner, req);

      await unsRegistry.connect(owner).set('key', 'value', tok);

      await expect(unsRegistry.execute(req, sig)).to.be
        .revertedWith('RegistryForwarder: SIGNATURE_INVALID');
    });

    it('should setApprovalForAll using meta-setApprovalForAll', async () => {
      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: 0,
        nonce: Number(await unsRegistry.nonceOf(owner.address)),
        data: unsRegistry.interface.encodeFunctionData('setApprovalForAll', [operator.address, true]),
      };
      const sig = await signTypedData(unsRegistry.address, owner, req);
      const [success ] = await unsRegistry.callStatic.execute(req, sig);
      expect(success).to.be.equal(true);
    });

    it('should revert meta-setApprovalForAll for non-onwer', async () => {
      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: 0,
        nonce: Number(await unsRegistry.nonceOf(owner.address)),
        data: unsRegistry.interface.encodeFunctionData('setApprovalForAll', [operator.address, true]),
      };
      const sig = await signTypedData(unsRegistry.address, nonOwner, req);
      await expect(unsRegistry.execute(req, sig)).to.be
        .revertedWith('RegistryForwarder: SIGNATURE_INVALID');
    });

    it('should transfer using meta-transferFrom', async () => {
      const tok = await unsRegistry.childIdOf(root, 'meta_1591');
      await unsRegistry.mint(owner.address, tok, 'meta_1591');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await unsRegistry.nonceOf(tok)),
        data: unsRegistry.interface.encodeFunctionData('transferFrom', [owner.address, receiverAddress, tok]),
      };
      const sig = await signTypedData(unsRegistry.address, owner, req);
      await unsRegistry.execute(req, sig);

      expect(await unsRegistry.ownerOf(tok)).to.be.equal(receiverAddress);
    });

    it('should revert meta-transferFrom for non-onwer', async () => {
      const tok = await unsRegistry.childIdOf(root, 'meta_6458');
      await unsRegistry.mint(owner.address, tok, 'meta_6458');

      const req = {
        from: nonOwner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await unsRegistry.nonceOf(tok)),
        data: unsRegistry.interface.encodeFunctionData('transferFrom', [nonOwner.address, receiverAddress, tok]),
      };
      const sig = await signTypedData(unsRegistry.address, nonOwner, req);
      const [success ] = await unsRegistry.callStatic.execute(req, sig);
      expect(success).to.be.equal(false);
    });

    it('should transfer using meta-safeTransferFrom', async () => {
      const tok = await unsRegistry.childIdOf(root, 'meta_10235');
      await unsRegistry.mint(owner.address, tok, 'meta_10235');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await unsRegistry.nonceOf(tok)),
        data: unsRegistry.interface.encodeFunctionData(
          'safeTransferFrom(address,address,uint256)',
          [owner.address, receiverAddress, tok],
        ),
      };
      const sig = await signTypedData(unsRegistry.address, owner, req);
      await unsRegistry.execute(req, sig);

      expect(await unsRegistry.ownerOf(tok)).to.be.equal(receiverAddress);
    });

    it('should revert meta-safeTransferFrom for non-onwer', async () => {
      const tok = await unsRegistry.childIdOf(root, 'meta_e5iuw');
      await unsRegistry.mint(owner.address, tok, 'meta_e5iuw');

      const req = {
        from: nonOwner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await unsRegistry.nonceOf(tok)),
        data: unsRegistry.interface.encodeFunctionData(
          'safeTransferFrom(address,address,uint256)',
          [nonOwner.address, receiverAddress, tok],
        ),
      };
      const sig = await signTypedData(unsRegistry.address, nonOwner, req);
      const [success ] = await unsRegistry.callStatic.execute(req, sig);
      expect(success).to.be.equal(false);
    });

    // TODO: add tests for safeTransferFrom(address,address,uint256,bytes)

    it('should burn using meta-burn', async () => {
      const tok = await unsRegistry.childIdOf(root, 'meta_ar093');
      await unsRegistry.mint(owner.address, tok, 'meta_ar093');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await unsRegistry.nonceOf(tok)),
        data: unsRegistry.interface.encodeFunctionData('burn', [tok]),
      };
      const sig = await signTypedData(unsRegistry.address, owner, req);
      await unsRegistry.execute(req, sig);

      await expect(unsRegistry.ownerOf(tok)).to.be.revertedWith('ERC721: owner query for nonexistent token');
    });

    it('should revert meta-burn for non-onwer', async () => {
      const tok = await unsRegistry.childIdOf(root, 'meta_53dg3');
      await unsRegistry.mint(owner.address, tok, 'meta_53dg3');

      const req = {
        from: nonOwner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await unsRegistry.nonceOf(tok)),
        data: unsRegistry.interface.encodeFunctionData('burn', [tok]),
      };
      const sig = await signTypedData(unsRegistry.address, nonOwner, req);
      const [success ] = await unsRegistry.callStatic.execute(req, sig);
      expect(success).to.be.equal(false);
    });
  });

  describe('ABI-based', () => {
    const getReason = (returnData) => {
      let reason;
      if (returnData && returnData.slice(2, 10).toString('hex') === '08c379a0') {
        const abiCoder = new utils.AbiCoder();
        reason = abiCoder.decode(['string'], '0x' + returnData.slice(10))[0];
      }
      return reason;
    };

    const registryFuncs = () => {
      return UNSRegistry.interface.fragments
        .filter(x => x.type === 'function' && !['view', 'pure'].includes(x.stateMutability));
    };

    const buidRequest = async (fragment, from, tokenId, paramsMap) => {
      const funcSig = funcFragmentToSig(fragment);

      const req = {
        from,
        gas: '200000',
        tokenId,
        nonce: Number(await unsRegistry.nonceOf(tokenId)),
        data: unsRegistry.interface.encodeFunctionData(funcSig, fragment.inputs.map(x => paramsMap[x.name])),
      };
      return req;
    };

    const funcFragmentToSig = (fragment) => {
      return `${fragment.name}(${fragment.inputs.map(x => `${x.type} ${x.name}`).join(',')})`;
    };

    describe('Token-based functions (token should not be minted)', () => {
      const paramValueMap = {
        uri: 'label',
        data: '0x',
        keys: ['key1'],
        values: ['value1'],
      };

      const included = [
        'mint',
        'safeMint',
        'mintWithRecords',
        'safeMintWithRecords',
      ];

      const getFuncs = () => {
        return registryFuncs()
          .filter(x => x.inputs.filter(i => i.name === 'tokenId').length)
          .filter(x => included.includes(x.name));
      };

      before(async () => {
        paramValueMap.to = receiver.address;
      });

      it('should execute all functions successfully', async () => {
        for (const func of getFuncs()) {
          const funcSigHash = utils.id(`${funcFragmentToSig(func)}_excl`);
          paramValueMap.tokenId = await unsRegistry.childIdOf(root, funcSigHash);

          const req = await buidRequest(func, coinbase.address, paramValueMap.tokenId, paramValueMap);
          const sig = await signTypedData(unsRegistry.address, coinbase, req);
          const [success, returnData] = await unsRegistry.callStatic.execute(req, sig);

          if (!success) {
            console.error(getReason(returnData));
          }
          expect(success).to.be.equal(true);
        }
      });
    });

    describe('Token-based functions (token should be minted)', () => {
      const paramValueMap = {
        label: 'label',
        data: '0x',
        key: 'key_t1',
        keys: ['key_t1'],
        keyHash: BigNumber.from(utils.id('key_t1')),
        keyHashes: [BigNumber.from(utils.id('key_t1'))],
        value: 'value',
        values: ['value1'],
      };

      const excluded = [
        'mint',
        'safeMint',
        'mintWithRecords',
        'safeMintWithRecords',
        'transferFromFor',
        'safeTransferFromFor',
        'burnFor',
        'resetFor',
        'setFor',
        'setManyFor',
        'reconfigureFor',
      ];

      const getFuncs = () => {
        return registryFuncs()
          .filter(x => x.inputs.filter(i => i.name === 'tokenId').length)
          .filter(x => !excluded.includes(x.name));
      };

      const mintToken = async (owner, tokenId, label) => {
        await unsRegistry.mint(owner.address, tokenId, label);
      };

      before(async () => {
        paramValueMap.from = owner.address;
        paramValueMap.to = receiver.address;

        await unsRegistry.addKey(paramValueMap.key);
      });

      it('should execute all functions successfully', async () => {
        for (const func of getFuncs()) {
          const funcSigHash = utils.id(`${funcFragmentToSig(func)}_ok`);
          paramValueMap.tokenId = await unsRegistry.childIdOf(root, funcSigHash);
          await mintToken(owner, paramValueMap.tokenId, funcSigHash);

          const req = await buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
          const sig = await signTypedData(unsRegistry.address, owner, req);
          const [success, returnData] = await unsRegistry.callStatic.execute(req, sig);

          if (!success) {
            console.error(getReason(returnData));
          }
          expect(success).to.be.equal(true);
        }
      });

      it('should revert execution of all token-based functions when used signature', async () => {
        for (const func of getFuncs()) {
          const funcSig = funcFragmentToSig(func);
          const funcSigHash = utils.id(`${funcSig}_doubleUse`);
          paramValueMap.tokenId = await unsRegistry.childIdOf(root, funcSigHash);
          await mintToken(owner, paramValueMap.tokenId, funcSigHash);

          const req = await buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
          const sig = await signTypedData(unsRegistry.address, owner, req);

          const [success, returnData] = await unsRegistry.callStatic.execute(req, sig);
          if (!success) {
            console.log(funcSig, func.inputs.map(x => paramValueMap[x.name]));
            console.error(getReason(returnData));
          }
          expect(success).to.be.equal(true);

          await unsRegistry.execute(req, sig);

          await expect(unsRegistry.execute(req, sig)).to.be
            .revertedWith('RegistryForwarder: SIGNATURE_INVALID');
        }
      });

      it('should revert execution of all token-based functions when nonce invalidated', async () => {
        for (const func of getFuncs()) {
          const funcSig = funcFragmentToSig(func);
          const funcSigHash = utils.id(`${funcSig}_nonceInvalidated`);
          paramValueMap.tokenId = await unsRegistry.childIdOf(root, funcSigHash);
          await mintToken(owner, paramValueMap.tokenId, funcSigHash);

          const req = await buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
          const sig = await signTypedData(unsRegistry.address, owner, req);

          await unsRegistry.connect(owner).set('key', 'value', paramValueMap.tokenId);

          await expect(unsRegistry.execute(req, sig)).to.be
            .revertedWith('RegistryForwarder: SIGNATURE_INVALID');
        }
      });

      it('should fail execution of all token-based functions when tokenId does not match', async () => {
        for (const func of getFuncs()) {
          const funcSig = funcFragmentToSig(func);
          const funcSigHash = utils.id(`${funcSig}_wrongToken`);

          paramValueMap.tokenId = await unsRegistry.childIdOf(root, funcSigHash);
          await mintToken(owner, paramValueMap.tokenId, funcSigHash);

          const tokenIdForwarder = await unsRegistry.childIdOf(root, utils.id(`_${funcSig}`));
          const req = await buidRequest(func, owner.address, tokenIdForwarder, paramValueMap);
          const sig = await signTypedData(unsRegistry.address, owner, req);
          const [success, returnData] = await unsRegistry.callStatic.execute(req, sig);

          expect(success).to.be.equal(false);
          expect(getReason(returnData)).to.be.equal('Registry: TOKEN_INVALID');
        }
      });

      it('should fail execution of all token-based functions when tokenId is empty', async () => {
        for (const func of getFuncs()) {
          const funcSigHash = utils.id(`${funcFragmentToSig(func)}_emptyTokenId`);
          paramValueMap.tokenId = await unsRegistry.childIdOf(root, funcSigHash);
          await mintToken(owner, paramValueMap.tokenId, funcSigHash);

          const req = await buidRequest(func, owner.address, 0, paramValueMap);
          const sig = await signTypedData(unsRegistry.address, owner, req);
          const [success, returndata] = await unsRegistry.callStatic.execute(req, sig);

          expect(success).to.be.equal(false);
          expect(getReason(returndata)).to.be.equal('Registry: TOKEN_INVALID');
        }
      });
    });

    describe('Non-Token functions', () => {
      const paramValueMap = {
        label: 'label',
        data: '0x',
        role: '0x1000000000000000000000000000000000000000000000000000000000000000',
        key: 'key_nt1',
        keys: ['key_nt1'],
        values: ['value1'],
        approved: true,
        prefix: '/',
      };

      const excluded = [
        'execute',
        'initialize',
        'transferOwnership', // might influence tests
        'renounceOwnership', // might influence tests
      ];

      before(async () => {
        paramValueMap.tld = root;
        paramValueMap.account = accessControl.address;
        paramValueMap.to = owner.address;
        paramValueMap.operator = operator.address;
      });

      const getFuncs = () => {
        return registryFuncs()
          .filter(x => !x.inputs.filter(i => i.name === 'tokenId').length)
          .filter(x => !excluded.includes(x.name));
      };

      it('should execute all functions successfully', async () => {
        for (const func of getFuncs()) {
          const funcSig = funcFragmentToSig(func);
          paramValueMap.label = utils.id(`${funcSig}_label`);

          const req = await buidRequest(func, coinbase.address, 0, paramValueMap);
          const sig = await signTypedData(unsRegistry.address, coinbase, req);
          const [success, returnData] = await unsRegistry.callStatic.execute(req, sig);

          if (!success) {
            console.log(funcSig, func.inputs.map(x => paramValueMap[x.name]));
            console.error(getReason(returnData));
          }
          expect(success).to.be.equal(true);
        }
      });

      it('should revert execution of all functions when used signature', async () => {
        for (const func of getFuncs()) {
          const funcSig = funcFragmentToSig(func);
          paramValueMap.label = utils.id(`${funcSig}_doubleUse`);
          paramValueMap.key = utils.id(`${funcSig}_doubleUse`);

          const tokenIdForwarder = await unsRegistry.childIdOf(root, utils.id(`_${funcSig}`));
          const req = await buidRequest(func, coinbase.address, tokenIdForwarder, paramValueMap);
          const sig = await signTypedData(unsRegistry.address, coinbase, req);

          const [success, returnData] = await unsRegistry.callStatic.execute(req, sig);
          if (!success) {
            console.log(funcSig, func.inputs.map(x => paramValueMap[x.name]));
            console.error(getReason(returnData));
          }
          expect(success).to.be.equal(true);

          await unsRegistry.execute(req, sig);

          await expect(unsRegistry.execute(req, sig)).to.be
            .revertedWith('RegistryForwarder: SIGNATURE_INVALID');
        }
      });

      it('should revert execution of all functions when used signature and tokenId is empty', async () => {
        for (const func of getFuncs()) {
          const funcSig = funcFragmentToSig(func);
          paramValueMap.label = utils.id(`${funcSig}_doubleUse_0`);

          const tokenId = 0;
          const nonce = await unsRegistry.nonceOf(tokenId);
          const req = await buidRequest(func, coinbase.address, tokenId, paramValueMap);
          const sig = await signTypedData(unsRegistry.address, coinbase, req);

          const [success, returnData] = await unsRegistry.callStatic.execute(req, sig);
          if (!success) {
            console.log(funcSig, func.inputs.map(x => paramValueMap[x.name]));
            console.error(getReason(returnData));
          }
          expect(success).to.be.equal(true);

          await unsRegistry.execute(req, sig);

          expect(await unsRegistry.nonceOf(tokenId)).to.be.equal(nonce.add(1));
          await expect(unsRegistry.execute(req, sig)).to.be
            .revertedWith('RegistryForwarder: SIGNATURE_INVALID');
        }
      });
    });
  });
});
