import { ethers } from 'hardhat';
import { expect } from 'chai';
import { BigNumberish, FunctionFragment, id, Fragment, BaseContract, solidityPacked } from 'ethers';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { UNSRegistry } from '../types/contracts';
import { UNSRegistry__factory } from '../types/factories/contracts';
import { sign, buildExecuteFunc, ExecuteFunc } from './helpers/metatx';
import { TLD, ZERO_ADDRESS } from './helpers/constants';
import { mintDomain, mintRandomDomain } from './helpers/registry';
import { getFuncSignature } from './helpers/proxy';
import { getLatestBlockTimestamp, increaseTimeBy } from './helpers/utils';

describe('UNSRegistry (metatx)', () => {
  let unsRegistry: UNSRegistry, buildExecuteParams: ExecuteFunc;
  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    owner: SignerWithAddress,
    nonOwner: SignerWithAddress,
    receiver: SignerWithAddress,
    accessControl: SignerWithAddress,
    operator: SignerWithAddress;

  let latestBlockTimestamp: number;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner, nonOwner, receiver, accessControl, operator] = signers;

    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();

    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistry.mintTLD(TLD.crypto.hash, 'crypto');
    await unsRegistry.setTokenURIPrefix('/');

    buildExecuteParams = buildExecuteFunc(unsRegistry.interface, await unsRegistry.getAddress(), unsRegistry);
  });

  beforeEach(async () => {
    latestBlockTimestamp = await getLatestBlockTimestamp();
  });

  describe('General', () => {
    const receiverAddress = '0x1234567890123456789012345678901234567890';

    it('should transfer using meta-setOwner', async () => {
      const tokenId = await mintDomain({ unsRegistry, owner, labels: ['res_label_113a', 'crypto'] });

      const { req, signature } = await buildExecuteParams(
        'setOwner(address,uint256)',
        [receiver.address, tokenId],
        owner,
        tokenId,
      );
      await unsRegistry.execute(req, signature);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });

    it('should revert transfer using meta-setOwner when nonce invalidated', async () => {
      const tokenId = await mintDomain({ unsRegistry, owner, labels: ['res_label_0896', 'crypto'] });

      const { req, signature } = await buildExecuteParams(
        'setOwner(address,uint256)',
        [receiver.address, tokenId],
        owner,
        tokenId,
      );
      await unsRegistry.connect(owner).set('key', 'value', tokenId);

      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('UNSRegistryForwarder: SIGNATURE_INVALID');
    });

    it('should revert meta-setOwner for non-onwer', async () => {
      const tokenId = await mintDomain({ unsRegistry, owner, labels: ['res_label_0899', 'crypto'] });

      const { req, signature } = await buildExecuteParams(
        'setOwner(address,uint256)',
        [receiver.address, tokenId],
        nonOwner,
        tokenId,
      );

      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    it('should revert meta-setOwner for expired token', async () => {
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      const tokenId = await mintDomain({
        unsRegistry,
        owner,
        labels: ['res_label_0899_expired', 'com'],
        expiry,
      });
      await increaseTimeBy(60 * 60 * 24);

      const { req, signature } = await buildExecuteParams(
        'setOwner(address,uint256)',
        [receiver.address, tokenId],
        owner,
        tokenId,
      );

      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    it('should setApprovalForAll using meta-setApprovalForAll', async () => {
      const { req, signature } = await buildExecuteParams(
        'setApprovalForAll(address,bool)',
        [operator.address, true],
        owner,
        0,
      );

      await unsRegistry.execute(req, signature);
      expect(await unsRegistry.isApprovedForAll(owner.address, operator.address)).to.be.equal(true);
    });

    it('should revert meta-setApprovalForAll for non-onwer', async () => {
      const { req, signature } = await buildExecuteParams(
        'setApprovalForAll(address,bool)',
        [operator.address, true],
        nonOwner,
        0,
      );

      await expect(unsRegistry.execute({ ...req, from: owner.address }, signature)).to.be.revertedWith(
        'UNSRegistryForwarder: SIGNATURE_INVALID',
      );
    });

    it('should transfer using meta-transferFrom', async () => {
      const tokenId = await mintDomain({ unsRegistry, owner, labels: ['meta_1591', 'crypto'] });

      const { req, signature } = await buildExecuteParams(
        'transferFrom(address,address,uint256)',
        [owner.address, receiverAddress, tokenId],
        owner,
        tokenId,
      );
      await unsRegistry.execute(req, signature);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiverAddress);
    });

    it('should revert meta-transferFrom for non-onwer', async () => {
      const tokenId = await mintDomain({ unsRegistry, owner, labels: ['meta_6458', 'crypto'] });

      const { req, signature } = await buildExecuteParams(
        'transferFrom(address,address,uint256)',
        [nonOwner.address, receiverAddress, tokenId],
        nonOwner,
        tokenId,
      );

      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    it('should revert meta-transferFrom for expired token', async () => {
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      const tokenId = await mintDomain({
        unsRegistry,
        owner,
        labels: ['meta_6458_expired', 'com'],
        expiry,
      });

      await increaseTimeBy(60 * 60 * 24);

      const { req, signature } = await buildExecuteParams(
        'transferFrom(address,address,uint256)',
        [nonOwner.address, receiverAddress, tokenId],
        nonOwner,
        tokenId,
      );

      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    it('should transfer using meta-safeTransferFrom', async () => {
      const tokenId = await mintDomain({ unsRegistry, owner, labels: ['meta_10235', 'crypto'] });

      const { req, signature } = await buildExecuteParams(
        'safeTransferFrom(address,address,uint256)',
        [owner.address, receiverAddress, tokenId],
        owner,
        tokenId,
      );
      await unsRegistry.execute(req, signature);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiverAddress);
    });

    it('should revert meta-safeTransferFrom for non-onwer', async () => {
      const tokenId = await mintDomain({ unsRegistry, owner, labels: ['meta_e5iuw', 'crypto'] });

      const { req, signature } = await buildExecuteParams(
        'safeTransferFrom(address,address,uint256)',
        [nonOwner.address, receiverAddress, tokenId],
        nonOwner,
        tokenId,
      );

      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    it('should revert meta-safeTransferFrom for expired token', async () => {
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      const tokenId = await mintDomain({
        unsRegistry,
        owner,
        labels: ['meta_e5iuw_expired', 'com'],
        expiry,
      });
      await increaseTimeBy(60 * 60 * 24);

      const { req, signature } = await buildExecuteParams(
        'safeTransferFrom(address,address,uint256)',
        [owner.address, receiverAddress, tokenId],
        owner,
        tokenId,
      );

      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    it('should transfer using meta-safeTransferFrom with bytes', async () => {
      const tokenId = await mintDomain({ unsRegistry, owner, labels: ['meta_10235-b', 'crypto'] });

      const { req, signature } = await buildExecuteParams(
        'safeTransferFrom(address,address,uint256,bytes)',
        [owner.address, receiverAddress, tokenId, '0x'],
        owner,
        tokenId,
      );
      await unsRegistry.execute(req, signature);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiverAddress);
    });

    it('should revert meta-safeTransferFrom for non-onwer with bytes', async () => {
      const tokenId = await mintDomain({ unsRegistry, owner, labels: ['meta_e5iuw-b', 'crypto'] });

      const { req, signature } = await buildExecuteParams(
        'safeTransferFrom(address,address,uint256, bytes)',
        [nonOwner.address, receiverAddress, tokenId, '0x'],
        nonOwner,
        tokenId,
      );

      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    it('should revert meta-safeTransferFrom for expired token', async () => {
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      const tokenId = await mintDomain({
        unsRegistry,
        owner,
        labels: ['meta_e5iuw_expired-b', 'com'],
        expiry,
      });
      await increaseTimeBy(60 * 60 * 24);

      const { req, signature } = await buildExecuteParams(
        'safeTransferFrom(address,address,uint256,bytes)',
        [owner.address, receiverAddress, tokenId, '0x'],
        owner,
        tokenId,
      );

      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    it('should burn using meta-burn', async () => {
      const tokenId = await mintDomain({ unsRegistry, owner, labels: ['meta_ar093', 'crypto'] });

      const { req, signature } = await buildExecuteParams('burn(uint256)', [tokenId], owner, tokenId);
      await unsRegistry.execute(req, signature);

      await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: invalid token ID');
    });

    it('should revert meta-burn for non-onwer', async () => {
      const tokenId = await mintDomain({ unsRegistry, owner, labels: ['meta_53dg3', 'crypto'] });

      const { req, signature } = await buildExecuteParams('burn(uint256)', [tokenId], nonOwner, tokenId);

      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });
  });

  describe('ABI-based', () => {
    const registryFuncs = () => {
      return Object.values(unsRegistry.interface.fragments).filter((fragment: Fragment) => {
        if (fragment instanceof FunctionFragment) {
          return !['view', 'pure'].includes(fragment.stateMutability);
        }

        return false;
      }) as FunctionFragment[];
    };

    const buidRequest = async (
      fragment: FunctionFragment,
      from: string,
      tokenId: BigNumberish,
      paramsMap: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    ) => {
      const contract = unsRegistry as BaseContract;

      const req = {
        from,
        gas: '200000',
        tokenId,
        nonce: Number(await unsRegistry.nonceOf(tokenId)),
        data: contract.interface.encodeFunctionData(
          getFuncSignature(fragment),
          fragment.inputs.map((x) => paramsMap[x.name]),
        ),
      };
      return req;
    };

    describe('Token-based functions (token should not be minted)', () => {
      const paramValueMap = {
        keys: ['key1'],
        values: ['value1'],
        uri: 'awesome-uri',
        labels: ['token-based', 'crypto'],
        tokenId: BigInt(0),
        to: '',
      };

      const included = ['issueWithRecords', 'unlockWithRecords', 'unlock', 'mintTLD'];

      const getFuncs = () => {
        return registryFuncs().filter((x) => included.includes(x.name) || included.includes(getFuncSignature(x)));
      };

      before(async () => {
        paramValueMap.to = receiver.address;
        paramValueMap.tokenId = await unsRegistry.namehash(paramValueMap.labels);
      });

      it('should execute all functions successfully', async () => {
        for (const func of getFuncs()) {
          const req = await buidRequest(func, coinbase.address, paramValueMap.tokenId, paramValueMap);
          const signature = await sign(req.data, await unsRegistry.getAddress(), req.nonce, coinbase);
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
        keyHash: BigInt(id('key_t1')),
        keyHashes: [BigInt(id('key_t1'))],
        value: 'value',
        values: ['value1'],
        from: '',
        to: '',
        tokenId: BigInt('0x0'),
      };

      const excluded = [
        'mintTLD',
        'mint',
        'issue',
        'issueWithRecords',
        'unlockWithRecords',
        'transferFromFor',
        'burnFor',
        'resetFor',
        'setFor',
        'setManyFor',
        'reconfigureFor',
        'depositToPolygon', // requires rootChainManager contract
        'withdrawFromPolygon', // requires rootChainManager contract
        'onERC721Received',
        'setReverse',
        'removeReverse',
        'addProxyReader',
        'setExpiry', // onlyMintingManager action, covered in separate test case
        'unlock', // onlyMintingManager action, covered in a separate test case
      ];

      const getFuncs = () => {
        return registryFuncs()
          .filter((x) => x.inputs.filter((i) => i.name === 'tokenId').length)
          .filter((x) => !excluded.includes(x.name));
      };

      before(async () => {
        paramValueMap.from = owner.address;
        paramValueMap.to = receiver.address;

        await unsRegistry.addKey(paramValueMap.key);
      });

      it('should execute all functions successfully', async () => {
        for (const func of getFuncs()) {
          const funcSigHash = id(`${getFuncSignature(func)}_ok`);

          paramValueMap.tokenId = await mintDomain({ unsRegistry, owner, labels: [funcSigHash, 'crypto'] });

          const req = await buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
          const signature = await sign(req.data, await unsRegistry.getAddress(), req.nonce, owner);
          await unsRegistry.execute(req, signature);
        }
      });

      it('should revert execution of all token-based functions when used signature', async () => {
        for (const func of getFuncs()) {
          const funcSig = getFuncSignature(func);
          const funcSigHash = id(`${funcSig}_doubleUse`);

          paramValueMap.tokenId = await mintDomain({ unsRegistry, owner, labels: [funcSigHash, 'crypto'] });

          const req = await buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
          const signature = await sign(req.data, await unsRegistry.getAddress(), req.nonce, owner);
          await unsRegistry.execute(req, signature);

          await expect(unsRegistry.execute(req, signature)).to.be.revertedWith(
            'UNSRegistryForwarder: SIGNATURE_INVALID',
          );
        }
      });

      it('should revert execution of all token-based functions when nonce invalidated', async () => {
        for (const func of getFuncs()) {
          const funcSig = getFuncSignature(func);
          const funcSigHash = id(`${funcSig}_nonceInvalidated`);

          paramValueMap.tokenId = await mintDomain({ unsRegistry, owner, labels: [funcSigHash, 'crypto'] });

          const req = await buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
          const signature = await sign(req.data, await unsRegistry.getAddress(), req.nonce, owner);

          await unsRegistry.connect(owner).set('key', 'value', paramValueMap.tokenId);

          await expect(unsRegistry.execute(req, signature)).to.be.revertedWith(
            'UNSRegistryForwarder: SIGNATURE_INVALID',
          );
        }
      });

      it('should fail execution of all token-based functions when tokenId does not match', async () => {
        for (const func of getFuncs()) {
          const funcSig = getFuncSignature(func);
          const funcSigHash = id(`${funcSig}_wrongToken`);

          paramValueMap.tokenId = await mintDomain({ unsRegistry, owner, labels: [funcSigHash, 'crypto'] });

          const tokenIdForwarder = await unsRegistry.namehash([id(`_${funcSig}`), 'crypto']);
          const req = await buidRequest(func, owner.address, tokenIdForwarder, paramValueMap);

          const signature = await sign(req.data, await unsRegistry.getAddress(), req.nonce, owner);
          await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: TOKEN_INVALID');
        }
      });

      it('should fail execution of all token-based functions when tokenId is empty', async () => {
        for (const func of getFuncs()) {
          const funcSigHash = id(`${getFuncSignature(func)}_emptyTokenId`);

          paramValueMap.tokenId = await mintDomain({ unsRegistry, owner, labels: [funcSigHash, 'crypto'] });

          const req = await buidRequest(func, owner.address, 0, paramValueMap);

          const signature = await sign(req.data, await unsRegistry.getAddress(), req.nonce, owner);
          await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: TOKEN_INVALID');
        }
      });

      it('should execute setExpiry via forwarder', async () => {
        const expiry = latestBlockTimestamp + 60 * 60 * 24;

        const tokenId = await mintRandomDomain({
          unsRegistry,
          owner,
          tld: 'com',
          expiry,
        });
        const newExpiry = expiry + 60 * 60 * 24;

        const func = unsRegistry.interface.getFunction('setExpiry');
        const req = await buidRequest(func, coinbase.address, 0, {
          expiry: newExpiry,
          tokenId,
        });

        const signature = await sign(req.data, await unsRegistry.getAddress(), req.nonce, coinbase);

        await unsRegistry.execute(req, signature);

        expect(await unsRegistry.expiryOf(tokenId)).to.eq(newExpiry);
      });

      it('should execute unlock via forwarder', async () => {
        const expiry = latestBlockTimestamp + 60 * 60 * 24;
        const tokenId = await mintRandomDomain({
          unsRegistry,
          owner,
          tld: 'com',
          expiry,
        });

        const func = unsRegistry.interface.getFunction('unlock');
        const req = await buidRequest(func, coinbase.address, 0, {
          to: receiver.address,
          tokenId,
        });

        const signature = await sign(req.data, await unsRegistry.getAddress(), req.nonce, coinbase);

        await unsRegistry.execute(req, signature);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(receiver.address);
      });
    });

    describe('Non-Token functions', () => {
      const paramValueMap = {
        labels: ['label', 'crypto'],
        domains: [['domain-label', 'crypto']],
        data: '0x',
        role: '0x1000000000000000000000000000000000000000000000000000000000000000',
        key: 'key_nt1',
        keys: ['key_nt1'],
        values: ['value1'],
        approved: true,
        prefix: '/',
        tld: BigInt('0x0'),
        account: '',
        to: '',
        operator: '',
      };

      const excluded = [
        'execute',
        'initialize',
        'transferOwnership', // might influence tests
        'renounceOwnership', // might influence tests
        'deposit', // requires childChainManager contract
        'removeReverse',
        'addProxyReader',
        'setReverse', // covered in separate test case
        'unlockWithRecords', // covered in separate test case
        'unlock', // covered in separate test case
        'multicall',
      ];

      before(async () => {
        paramValueMap.tld = TLD.crypto.hash;
        paramValueMap.account = accessControl.address;
        paramValueMap.to = owner.address;
        paramValueMap.operator = operator.address;
      });

      const getFuncs = () => {
        return registryFuncs()
          .filter((x) => !x.inputs.filter((i) => i.name === 'tokenId').length)
          .filter((x) => !excluded.includes(x.name));
      };

      it('should execute all functions successfully', async () => {
        for (const func of getFuncs()) {
          const funcSig = getFuncSignature(func);
          paramValueMap.labels = [id(`${funcSig}_label`), 'crypto'];

          const req = await buidRequest(func, coinbase.address, 0, paramValueMap);
          const signature = await sign(req.data, await unsRegistry.getAddress(), req.nonce, coinbase);
          await unsRegistry.execute(req, signature);
        }
      });

      it('should execute setReverse(string[]) correctly', async () => {
        const setReverseFunc = registryFuncs()
          .filter((x) => !x.inputs.filter((i) => i.name === 'tokenId').length)
          .filter((x) => x.name === 'setReverse')[0];
        const funcSig = getFuncSignature(setReverseFunc);
        paramValueMap.labels = [id(`${funcSig}_label`), 'crypto'];
        const tokenId = await mintDomain({ unsRegistry, owner, labels: paramValueMap.labels });
        const req = await buidRequest(setReverseFunc, owner.address, tokenId, paramValueMap);
        const signature = await sign(req.data, await unsRegistry.getAddress(), req.nonce, owner);
        await unsRegistry.execute(req, signature);
      });

      it('should execute unlockWithRecords(address,string[],string[],string[],bool) correctly', async () => {
        const unlockWithRecordsLabels = registryFuncs()
          .filter((x) => !x.inputs.filter((i) => i.name === 'tokenId').length)
          .filter((x) => x.name === 'unlockWithRecords')[0];
        const funcSig = getFuncSignature(unlockWithRecordsLabels);
        paramValueMap.labels = [id(`${funcSig}_label`), 'crypto'];
        const tokenId = await mintDomain({ unsRegistry, owner, labels: paramValueMap.labels });
        const req = await buidRequest(unlockWithRecordsLabels, coinbase.address, tokenId, paramValueMap);
        const signature = await sign(req.data, await unsRegistry.getAddress(), req.nonce, coinbase);
        await unsRegistry.execute(req, signature);
      });

      it('should revert execution of all functions when used signature', async () => {
        for (const func of getFuncs()) {
          const funcSig = getFuncSignature(func);
          paramValueMap.labels = [id(`${funcSig}_doubleUse`), 'crypto'];
          paramValueMap.key = id(`${funcSig}_doubleUse`);

          const tokenIdForwarder = await unsRegistry.namehash([id(`_${funcSig}`), 'crypto']);
          const req = await buidRequest(func, coinbase.address, tokenIdForwarder, paramValueMap);
          const signature = await sign(req.data, await unsRegistry.getAddress(), req.nonce, coinbase);
          await unsRegistry.execute(req, signature);

          await expect(unsRegistry.execute(req, signature)).to.be.revertedWith(
            'UNSRegistryForwarder: SIGNATURE_INVALID',
          );
        }
      });

      it('should revert execution of all functions when used signature and tokenId is empty', async () => {
        for (const func of getFuncs()) {
          const funcSig = getFuncSignature(func);
          paramValueMap.labels = [id(`${funcSig}_doubleUse_0`), 'crypto'];

          const tokenId = 0;
          const nonce = await unsRegistry.nonceOf(tokenId);
          const req = await buidRequest(func, coinbase.address, tokenId, paramValueMap);
          const signature = await sign(req.data, await unsRegistry.getAddress(), req.nonce, coinbase);
          await unsRegistry.execute(req, signature);

          expect(await unsRegistry.nonceOf(tokenId)).to.be.equal(nonce + BigInt(1));
          await expect(unsRegistry.execute(req, signature)).to.be.revertedWith(
            'UNSRegistryForwarder: SIGNATURE_INVALID',
          );
        }
      });
    });
  });

  describe('Multicall', () => {
    it('should execute meta tx with multicall', async () => {
      const labels = ['res_label_mb3', 'crypto'];
      const tokenId = await unsRegistry.namehash(labels);

      const { req, signature } = await buildExecuteParams(
        'multicall(bytes[])',
        [
          [
            unsRegistry.interface.encodeFunctionData('mintWithRecords', [coinbase.address, labels, [], [], false]),
            unsRegistry.interface.encodeFunctionData('setOwner', [receiver.address, tokenId]),
          ],
        ],
        coinbase,
        tokenId,
      );
      await unsRegistry.connect(nonOwner).execute(req, signature);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });

    it('should execute meta tx with multicall with expirable domain', async () => {
      const labels = ['res_label_mb3_expirable', 'com'];
      const tokenId = await unsRegistry.namehash(labels);

      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      const { req, signature } = await buildExecuteParams(
        'multicall(bytes[])',
        [
          [
            unsRegistry.interface.encodeFunctionData('mintWithRecords', [coinbase.address, labels, [], [], false]),
            unsRegistry.interface.encodeFunctionData('setExpiry', [expiry, tokenId]),
            unsRegistry.interface.encodeFunctionData('setOwner', [receiver.address, tokenId]),
          ],
        ],
        coinbase,
        tokenId,
      );
      await unsRegistry.connect(nonOwner).execute(req, signature);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
      expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(expiry);
    });

    it('should execute multiple meta txs through multicall', async () => {
      const labels = ['res_label_m1', 'crypto'];
      const tokenId = await unsRegistry.namehash(labels);

      const mintMetaParams = await buildExecuteParams(
        'mintWithRecords(address,string[],string[],string[],bool)',
        [owner.address, labels, [], [], false],
        coinbase,
        tokenId,
        BigInt(0),
      );

      const transferMetaParams = await buildExecuteParams(
        'setOwner(address,uint256)',
        [receiver.address, tokenId],
        owner,
        tokenId,
        BigInt(1),
      );

      await unsRegistry.multicall([
        unsRegistry.interface.encodeFunctionData('execute', [mintMetaParams.req, mintMetaParams.signature]),
        unsRegistry.interface.encodeFunctionData('execute', [transferMetaParams.req, transferMetaParams.signature]),
      ]);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });

    it('should execute multiple regular and meta txs through multicall', async () => {
      const labels = ['res_label_m2', 'crypto'];
      const tokenId = await unsRegistry.namehash(labels);

      const transferMetaParams = await buildExecuteParams(
        'setOwner(address,uint256)',
        [receiver.address, tokenId],
        owner,
        tokenId,
        BigInt(0),
      );

      await unsRegistry.multicall([
        unsRegistry.interface.encodeFunctionData('mintWithRecords', [owner.address, labels, [], [], false]),
        unsRegistry.interface.encodeFunctionData('execute', [transferMetaParams.req, transferMetaParams.signature]),
      ]);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });

    it('should not allow passing malicious calldata to meta tx multicall', async () => {
      const labels = ['res_label_m1x', 'crypto'];
      const tokenId = await mintDomain({ unsRegistry, owner, labels });

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);

      const { req, signature } = await buildExecuteParams(
        'multicall(bytes[])',
        [
          [
            solidityPacked(
              ['bytes', 'address', 'uint256'],
              [
                unsRegistry.interface.encodeFunctionData('setOwner', [nonOwner.address, tokenId]),
                owner.address,
                tokenId,
              ],
            ),
          ],
        ],
        nonOwner,
        tokenId,
      );

      await expect(unsRegistry.connect(nonOwner).execute(req, signature)).to.be.revertedWith(
        'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
      );
    });
  });
});
