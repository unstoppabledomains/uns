const { ethers } = require('hardhat');
const { expect } = require('chai');

const { sign, buildExecuteFunc } = require('./helpers/metatx');
const { EMPTY_SIGNATURE, TLD } = require('./helpers/constants');
const { mintDomain } = require('./helpers/registry');

const { utils, BigNumber } = ethers;

describe('UNSRegistry (metatx)', () => {
  let UNSRegistry, unsRegistry, buildExecuteParams;
  let signers, coinbase, owner, nonOwner, receiver, accessControl, operator, spender;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner, nonOwner, receiver, accessControl, operator, spender] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');

    unsRegistry = await UNSRegistry.deploy();
    await unsRegistry.initialize(coinbase.address);
    await unsRegistry.mint('0xdead000000000000000000000000000000000000', TLD.CRYPTO, 'crypto');
    await unsRegistry.setTokenURIPrefix('/');

    buildExecuteParams = buildExecuteFunc(unsRegistry.interface, unsRegistry.address, unsRegistry);
  });

  describe('General', () => {
    const receiverAddress = '0x1234567890123456789012345678901234567890';

    it('should transfer using meta-setOwner', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.CRYPTO, 'res_label_113a');

      const { req, signature } = await buildExecuteParams(
        'setOwner(address,uint256)',
        [receiver.address, tokenId],
        owner, tokenId);
      await unsRegistry.execute(req, signature);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });

    it('should revert transfer using meta-setOwner when nonce invalidated', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.CRYPTO, 'res_label_0896');

      const { req, signature } = await buildExecuteParams(
        'setOwner(address,uint256)',
        [receiver.address, tokenId],
        owner, tokenId);
      await unsRegistry.connect(owner).set('key', 'value', tokenId);

      await expect(unsRegistry.execute(req, signature)).to.be
        .revertedWith('UNSRegistryForwarder: SIGNATURE_INVALID');
    });

    it('should setApprovalForAll using meta-setApprovalForAll', async () => {
      const { req, signature } = await buildExecuteParams(
        'setApprovalForAll(address,bool)',
        [operator.address, true],
        owner, 0);

      await unsRegistry.execute(req, signature);
      expect(await unsRegistry.isApprovedForAll(owner.address, operator.address)).to.be.equal(true);
    });

    it('should revert meta-setApprovalForAll for non-onwer', async () => {
      const { req, signature } = await buildExecuteParams(
        'setApprovalForAll(address,bool)',
        [operator.address, true],
        nonOwner, 0);

      await expect(unsRegistry.execute({ ...req, from: owner.address }, signature)).to.be
        .revertedWith('UNSRegistryForwarder: SIGNATURE_INVALID');
    });

    it('should transfer using meta-transferFrom', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.CRYPTO, 'meta_1591');

      const { req, signature } = await buildExecuteParams(
        'transferFrom(address,address,uint256)',
        [owner.address, receiverAddress, tokenId],
        owner, tokenId);
      await unsRegistry.execute(req, signature);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiverAddress);
    });

    it('should revert meta-transferFrom for non-onwer', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.CRYPTO, 'meta_6458');

      const { req, signature } = await buildExecuteParams(
        'transferFrom(address,address,uint256)',
        [nonOwner.address, receiverAddress, tokenId],
        nonOwner, tokenId);

      await expect(unsRegistry.execute(req, signature)).to.be
        .revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    it('should transfer using meta-safeTransferFrom', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.CRYPTO, 'meta_10235');

      const { req, signature } = await buildExecuteParams(
        'safeTransferFrom(address,address,uint256)',
        [owner.address, receiverAddress, tokenId],
        owner, tokenId);
      await unsRegistry.execute(req, signature);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiverAddress);
    });

    it('should revert meta-safeTransferFrom for non-onwer', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.CRYPTO, 'meta_e5iuw');

      const { req, signature } = await buildExecuteParams(
        'safeTransferFrom(address,address,uint256)',
        [nonOwner.address, receiverAddress, tokenId],
        nonOwner, tokenId);

      await expect(unsRegistry.execute(req, signature)).to.be
        .revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    // TODO: add tests for safeTransferFrom(address,address,uint256,bytes)

    it('should burn using meta-burn', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.CRYPTO, 'meta_ar093');
      const { req, signature } = await buildExecuteParams('burn(uint256)', [tokenId], owner, tokenId);
      await unsRegistry.execute(req, signature);

      await expect(unsRegistry.ownerOf(tokenId)).to.be
        .revertedWith('ERC721: owner query for nonexistent token');
    });

    it('should revert meta-burn for non-onwer', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, TLD.CRYPTO, 'meta_53dg3');
      const { req, signature } = await buildExecuteParams('burn(uint256)', [tokenId], nonOwner, tokenId);

      await expect(unsRegistry.execute(req, signature)).to.be
        .revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });
  });

  describe('ABI-based', () => {
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
          paramValueMap.tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, funcSigHash);

          const req = await buidRequest(func, coinbase.address, paramValueMap.tokenId, paramValueMap);
          const signature = await sign(req.data, unsRegistry.address, req.nonce, coinbase);
          await unsRegistry.execute(req, signature);
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
        'depositToPolygon', // requires rootChainManager contract
        'onERC721Received',
      ];

      const getFuncs = () => {
        return registryFuncs()
          .filter(x => x.inputs.filter(i => i.name === 'tokenId').length)
          .filter(x => !excluded.includes(x.name));
      };

      before(async () => {
        paramValueMap.from = owner.address;
        paramValueMap.to = receiver.address;

        await unsRegistry.addKey(paramValueMap.key);
      });

      it('should execute all functions successfully', async () => {
        for (const func of getFuncs()) {
          const funcSigHash = utils.id(`${funcFragmentToSig(func)}_ok`);
          paramValueMap.tokenId = await mintDomain(unsRegistry, owner, TLD.CRYPTO, funcSigHash);

          const req = await buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
          const signature = await sign(req.data, unsRegistry.address, req.nonce, owner);
          await unsRegistry.execute(req, signature);
        }
      });

      it('should revert execution of all token-based functions when used signature', async () => {
        for (const func of getFuncs()) {
          const funcSig = funcFragmentToSig(func);
          const funcSigHash = utils.id(`${funcSig}_doubleUse`);
          paramValueMap.tokenId = await mintDomain(unsRegistry, owner, TLD.CRYPTO, funcSigHash);

          const req = await buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
          const signature = await sign(req.data, unsRegistry.address, req.nonce, owner);
          await unsRegistry.execute(req, signature);

          await expect(unsRegistry.execute(req, signature)).to.be
            .revertedWith('UNSRegistryForwarder: SIGNATURE_INVALID');
        }
      });

      it('should revert execution of all token-based functions when nonce invalidated', async () => {
        for (const func of getFuncs()) {
          const funcSig = funcFragmentToSig(func);
          const funcSigHash = utils.id(`${funcSig}_nonceInvalidated`);
          paramValueMap.tokenId = await mintDomain(unsRegistry, owner, TLD.CRYPTO, funcSigHash);

          const req = await buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
          const signature = await sign(req.data, unsRegistry.address, req.nonce, owner);

          await unsRegistry.connect(owner).set('key', 'value', paramValueMap.tokenId);

          await expect(unsRegistry.execute(req, signature)).to.be
            .revertedWith('UNSRegistryForwarder: SIGNATURE_INVALID');
        }
      });

      it('should fail execution of all token-based functions when tokenId does not match', async () => {
        for (const func of getFuncs()) {
          const funcSig = funcFragmentToSig(func);
          const funcSigHash = utils.id(`${funcSig}_wrongToken`);
          paramValueMap.tokenId = await mintDomain(unsRegistry, owner, TLD.CRYPTO, funcSigHash);

          const tokenIdForwarder = await unsRegistry.childIdOf(TLD.CRYPTO, utils.id(`_${funcSig}`));
          const req = await buidRequest(func, owner.address, tokenIdForwarder, paramValueMap);

          const signature = await sign(req.data, unsRegistry.address, req.nonce, owner);
          await expect(unsRegistry.execute(req, signature)).to.be
            .revertedWith('Registry: TOKEN_INVALID');
        }
      });

      it('should fail execution of all token-based functions when tokenId is empty', async () => {
        for (const func of getFuncs()) {
          const funcSigHash = utils.id(`${funcFragmentToSig(func)}_emptyTokenId`);
          paramValueMap.tokenId = await mintDomain(unsRegistry, owner, TLD.CRYPTO, funcSigHash);

          const req = await buidRequest(func, owner.address, 0, paramValueMap);

          const signature = await sign(req.data, unsRegistry.address, req.nonce, owner);
          await expect(unsRegistry.execute(req, signature)).to.be
            .revertedWith('Registry: TOKEN_INVALID');
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
        'setRootChainManager',
        'setCNSRegistry',
      ];

      before(async () => {
        paramValueMap.tld = TLD.CRYPTO;
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
          const signature = await sign(req.data, unsRegistry.address, req.nonce, coinbase);
          await unsRegistry.execute(req, signature);
        }
      });

      it('should revert execution of all functions when used signature', async () => {
        for (const func of getFuncs()) {
          const funcSig = funcFragmentToSig(func);
          paramValueMap.label = utils.id(`${funcSig}_doubleUse`);
          paramValueMap.key = utils.id(`${funcSig}_doubleUse`);

          const tokenIdForwarder = await unsRegistry.childIdOf(TLD.CRYPTO, utils.id(`_${funcSig}`));
          const req = await buidRequest(func, coinbase.address, tokenIdForwarder, paramValueMap);
          const signature = await sign(req.data, unsRegistry.address, req.nonce, coinbase);
          await unsRegistry.execute(req, signature);

          await expect(unsRegistry.execute(req, signature)).to.be
            .revertedWith('UNSRegistryForwarder: SIGNATURE_INVALID');
        }
      });

      it('should revert execution of all functions when used signature and tokenId is empty', async () => {
        for (const func of getFuncs()) {
          const funcSig = funcFragmentToSig(func);
          paramValueMap.label = utils.id(`${funcSig}_doubleUse_0`);

          const tokenId = 0;
          const nonce = await unsRegistry.nonceOf(tokenId);
          const req = await buidRequest(func, coinbase.address, tokenId, paramValueMap);
          const signature = await sign(req.data, unsRegistry.address, req.nonce, coinbase);
          await unsRegistry.execute(req, signature);

          expect(await unsRegistry.nonceOf(tokenId)).to.be.equal(nonce.add(1));
          await expect(unsRegistry.execute(req, signature)).to.be
            .revertedWith('UNSRegistryForwarder: SIGNATURE_INVALID');
        }
      });
    });
  });

  describe('Old metatx', () => {
    describe('transferFromFor', () => {
      it('should transfer', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_34fw');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData(
          'transferFrom(address,address,uint256)',
          [owner.address, receiver.address, tok],
        );
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), owner);

        await unsRegistry.connect(spender)
          .transferFromFor(owner.address, receiver.address, tok, signature);

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(receiver.address);
      });

      it('should revert transfer by non-owner', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_wr');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData(
          'transferFrom(address,address,uint256)',
          [owner.address, receiver.address, tok],
        );
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), nonOwner);

        await expect(
          unsRegistry.connect(spender).transferFromFor(owner.address, nonOwner.address, tok, signature),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });

      it('should revert when signature is invalid', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_mv6rg');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData(
          'transferFrom(address,address,uint256)',
          [owner.address, receiver.address, tok],
        );
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), owner);

        await expect(
          unsRegistry.connect(spender).transferFromFor(owner.address, nonOwner.address, tok, signature),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');

        await expect(
          unsRegistry.connect(spender).transferFromFor(owner.address, nonOwner.address, tok, '0x'),
        ).to.be.revertedWith('ECDSA: invalid signature length');

        await expect(
          unsRegistry.connect(spender).transferFromFor(owner.address, nonOwner.address, tok, EMPTY_SIGNATURE),
        ).to.be.revertedWith('ECDSA: invalid signature');

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });
    });

    describe('safeTransferFromFor', () => {
      const funcSig = 'safeTransferFromFor(address,address,uint256,bytes)';

      it('should transfer', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_fc24');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData(
          'safeTransferFrom(address,address,uint256)',
          [owner.address, receiver.address, tok],
        );
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), owner);

        await unsRegistry.connect(spender)[funcSig](owner.address, receiver.address, tok, signature);

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(receiver.address);
      });

      it('should revert transfer by non-owner', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_dfgb34');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData(
          'safeTransferFrom(address,address,uint256)',
          [owner.address, receiver.address, tok],
        );
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), nonOwner);

        await expect(
          unsRegistry.connect(spender)[funcSig](owner.address, nonOwner.address, tok, signature),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });

      it('should revert when signature is invalid', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_sdr654');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData(
          'safeTransferFrom(address,address,uint256)',
          [owner.address, receiver.address, tok],
        );
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), owner);

        await expect(
          unsRegistry.connect(spender)[funcSig](owner.address, nonOwner.address, tok, signature),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');

        await expect(
          unsRegistry.connect(spender)[funcSig](owner.address, nonOwner.address, tok, '0x'),
        ).to.be.revertedWith('ECDSA: invalid signature length');

        await expect(
          unsRegistry.connect(spender)[funcSig](owner.address, nonOwner.address, tok, EMPTY_SIGNATURE),
        ).to.be.revertedWith('ECDSA: invalid signature');

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });
    });

    describe('safeTransferFromFor data', () => {
      const funcSig = 'safeTransferFromFor(address,address,uint256,bytes,bytes)';

      it('should transfer', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_vnm4');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData(
          'safeTransferFrom(address,address,uint256,bytes)',
          [owner.address, receiver.address, tok, '0x'],
        );
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), owner);

        await unsRegistry.connect(spender)[funcSig](owner.address, receiver.address, tok, '0x', signature);

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(receiver.address);
      });

      it('should revert transfer by non-owner', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_sv32');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData(
          'safeTransferFrom(address,address,uint256,bytes)',
          [owner.address, receiver.address, tok, '0x'],
        );
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), nonOwner);

        await expect(
          unsRegistry.connect(spender)[funcSig](owner.address, receiver.address, tok, '0x', signature),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });

      it('should revert when signature is invalid', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_sdff34');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData(
          'safeTransferFrom(address,address,uint256,bytes)',
          [owner.address, receiver.address, tok, '0x'],
        );
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), owner);

        await expect(
          unsRegistry.connect(spender)[funcSig](owner.address, nonOwner.address, tok, '0x', signature),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');

        await expect(
          unsRegistry.connect(spender)[funcSig](owner.address, nonOwner.address, tok, '0x', '0x'),
        ).to.be.revertedWith('ECDSA: invalid signature length');

        await expect(
          unsRegistry.connect(spender)[funcSig](owner.address, nonOwner.address, tok, '0x', EMPTY_SIGNATURE),
        ).to.be.revertedWith('ECDSA: invalid signature');

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });
    });

    describe('burnFor', () => {
      it('should burn', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_vcxw4');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData('burn(uint256)', [tok]);
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), owner);

        await unsRegistry.connect(spender).burnFor(tok, signature);

        await expect(unsRegistry.ownerOf(tok)).to.be.revertedWith('ERC721: owner query for nonexistent token');
      });

      it('should revert burn by non-owner', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_aa31v');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData('burn(uint256)', [tok]);
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), nonOwner);

        await expect(
          unsRegistry.connect(spender).burnFor(tok, signature),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });

      it('should revert when signature is invalid', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_lld431');
        await unsRegistry.mint(owner.address, tok, '');

        const wrongTok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_lld431_wrong');
        await unsRegistry.mint(owner.address, wrongTok, '');

        const data = unsRegistry.interface.encodeFunctionData('burn(uint256)', [tok]);
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), owner);

        await expect(
          unsRegistry.connect(spender).burnFor(wrongTok, signature),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');

        await expect(
          unsRegistry.connect(spender).burnFor(tok, '0x'),
        ).to.be.revertedWith('ECDSA: invalid signature length');

        await expect(
          unsRegistry.connect(spender).burnFor(tok, EMPTY_SIGNATURE),
        ).to.be.revertedWith('ECDSA: invalid signature');

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });
    });

    describe('resetFor', () => {
      it('should reset', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_wfv331');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData('reset(uint256)', [tok]);
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), owner);

        await unsRegistry.connect(spender).resetFor(tok, signature);

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });

      it('should revert reset by non-owner', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_cvs11');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData('burn(uint256)', [tok]);
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), nonOwner);

        await expect(
          unsRegistry.connect(spender).resetFor(tok, signature),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });

      it('should revert when signature is invalid', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_lg212');
        await unsRegistry.mint(owner.address, tok, '');

        const wrongTok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_lg212_wrong');
        await unsRegistry.mint(owner.address, wrongTok, '');

        const data = unsRegistry.interface.encodeFunctionData('burn(uint256)', [tok]);
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), owner);

        await expect(
          unsRegistry.connect(spender).resetFor(wrongTok, signature),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');

        await expect(
          unsRegistry.connect(spender).resetFor(tok, '0x'),
        ).to.be.revertedWith('ECDSA: invalid signature length');

        await expect(
          unsRegistry.connect(spender).resetFor(tok, EMPTY_SIGNATURE),
        ).to.be.revertedWith('ECDSA: invalid signature');

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });
    });

    describe('setFor', () => {
      it('should set', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_llsk113');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData('set(string,string,uint256)', ['key1', 'v1', tok]);
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), owner);

        await unsRegistry.connect(spender).setFor('key1', 'v1', tok, signature);

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
        expect(await unsRegistry.get('key1', tok)).to.be.equal('v1');
      });

      it('should revert set by non-owner', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_cvl8s');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData('set(string,string,uint256)', ['', '', tok]);
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), nonOwner);

        await expect(
          unsRegistry.connect(spender).setFor('', '', tok, signature),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });

      it('should revert when signature is invalid', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_vldm3');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData('set(string,string,uint256)', ['', '', tok]);
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), owner);

        await expect(
          unsRegistry.connect(spender).setFor('aaa', '', tok, signature),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');

        await expect(
          unsRegistry.connect(spender).setFor('', '', tok, '0x'),
        ).to.be.revertedWith('ECDSA: invalid signature length');

        await expect(
          unsRegistry.connect(spender).setFor('', '', tok, EMPTY_SIGNATURE),
        ).to.be.revertedWith('ECDSA: invalid signature');

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });
    });

    describe('setManyFor', () => {
      const funcSig = 'setMany(string[],string[],uint256)';

      it('should set many', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_dwe110');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData(funcSig, [['key1'], ['1v'], tok]);
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), owner);

        await unsRegistry.connect(spender).setManyFor(['key1'], ['1v'], tok, signature);

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
        expect(await unsRegistry.get('key1', tok)).to.be.equal('1v');
      });

      it('should revert setMany by non-owner', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_kcmn23');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData(funcSig, [[''], [''], tok]);
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), nonOwner);

        await expect(
          unsRegistry.connect(spender).setManyFor([''], [''], tok, signature),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });

      it('should revert when signature is invalid', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_sdn31');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface.encodeFunctionData(funcSig, [['key'], [''], tok]);
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), owner);

        await expect(
          unsRegistry.connect(spender).setManyFor([''], [''], tok, signature),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');

        await expect(
          unsRegistry.connect(spender).setManyFor([''], [''], tok, '0x'),
        ).to.be.revertedWith('ECDSA: invalid signature length');

        await expect(
          unsRegistry.connect(spender).setManyFor([''], [''], tok, EMPTY_SIGNATURE),
        ).to.be.revertedWith('ECDSA: invalid signature');

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });
    });

    describe('reconfigureFor', () => {
      it('should reconfigure', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_cbc24');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface
          .encodeFunctionData('reconfigure(string[],string[],uint256)', [['key2'], ['1v'], tok]);
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), owner);

        await unsRegistry.connect(spender).reconfigureFor(['key2'], ['1v'], tok, signature);

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
        expect(await unsRegistry.get('key2', tok)).to.be.equal('1v');
      });

      it('should revert reconfigure by non-owner', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_safv3');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface
          .encodeFunctionData('reconfigure(string[],string[],uint256)', [[''], [''], tok]);
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), nonOwner);

        await expect(
          unsRegistry.connect(spender).reconfigureFor([''], [''], tok, signature),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });

      it('should revert when signature is invalid', async () => {
        const tok = await unsRegistry.childIdOf(TLD.CRYPTO, 'label_sfv421');
        await unsRegistry.mint(owner.address, tok, '');

        const data = unsRegistry.interface
          .encodeFunctionData('reconfigure(string[],string[],uint256)', [['1'], [''], tok]);
        const signature = await sign(data, unsRegistry.address, await unsRegistry.nonceOf(tok), owner);

        await expect(
          unsRegistry.connect(spender).reconfigureFor([''], [''], tok, signature),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');

        await expect(
          unsRegistry.connect(spender).reconfigureFor([''], [''], tok, '0x'),
        ).to.be.revertedWith('ECDSA: invalid signature length');

        await expect(
          unsRegistry.connect(spender).reconfigureFor([''], [''], tok, EMPTY_SIGNATURE),
        ).to.be.revertedWith('ECDSA: invalid signature');

        expect(await unsRegistry.ownerOf(tok)).to.be.equal(owner.address);
      });
    });
  });
});
