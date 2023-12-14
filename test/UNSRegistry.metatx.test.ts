import { ethers } from 'hardhat';
import { expect } from 'chai';
import { utils, BigNumber, Contract, BigNumberish } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { FunctionFragment } from 'ethers/lib/utils';
import { UNSRegistry } from '../types/contracts';
import { UNSRegistry__factory } from '../types/factories/contracts';
import { sign, buildExecuteFunc, ExecuteFunc } from './helpers/metatx';
import { TLD, ZERO_ADDRESS } from './helpers/constants';
import { mintDomain } from './helpers/registry';
import { getFuncSignature } from './helpers/proxy';

describe('UNSRegistry (metatx)', () => {
  let unsRegistry: UNSRegistry, buildExecuteParams: ExecuteFunc;
  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    owner: SignerWithAddress,
    nonOwner: SignerWithAddress,
    receiver: SignerWithAddress,
    accessControl: SignerWithAddress,
    operator: SignerWithAddress;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner, nonOwner, receiver, accessControl, operator] = signers;

    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();

    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistry.mintTLD(TLD.CRYPTO, 'crypto');
    await unsRegistry.setTokenURIPrefix('/');

    buildExecuteParams = buildExecuteFunc(unsRegistry.interface, unsRegistry.address, unsRegistry);
  });

  describe('General', () => {
    const receiverAddress = '0x1234567890123456789012345678901234567890';

    it('should transfer using meta-setOwner', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, ['res_label_113a', 'crypto']);

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
      const tokenId = await mintDomain(unsRegistry, owner, ['res_label_0896', 'crypto']);

      const { req, signature } = await buildExecuteParams(
        'setOwner(address,uint256)',
        [receiver.address, tokenId],
        owner,
        tokenId,
      );
      await unsRegistry.connect(owner).set('key', 'value', tokenId);

      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('UNSRegistryForwarder: SIGNATURE_INVALID');
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
      const tokenId = await mintDomain(unsRegistry, owner, ['meta_1591', 'crypto']);

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
      const tokenId = await mintDomain(unsRegistry, owner, ['meta_6458', 'crypto']);

      const { req, signature } = await buildExecuteParams(
        'transferFrom(address,address,uint256)',
        [nonOwner.address, receiverAddress, tokenId],
        nonOwner,
        tokenId,
      );

      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    it('should transfer using meta-safeTransferFrom', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, ['meta_10235', 'crypto']);

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
      const tokenId = await mintDomain(unsRegistry, owner, ['meta_e5iuw', 'crypto']);

      const { req, signature } = await buildExecuteParams(
        'safeTransferFrom(address,address,uint256)',
        [nonOwner.address, receiverAddress, tokenId],
        nonOwner,
        tokenId,
      );

      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });

    // TODO: add tests for safeTransferFrom(address,address,uint256,bytes)

    it('should burn using meta-burn', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, ['meta_ar093', 'crypto']);

      const { req, signature } = await buildExecuteParams('burn(uint256)', [tokenId], owner, tokenId);
      await unsRegistry.execute(req, signature);

      await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: invalid token ID');
    });

    it('should revert meta-burn for non-onwer', async () => {
      const tokenId = await mintDomain(unsRegistry, owner, ['meta_53dg3', 'crypto']);

      const { req, signature } = await buildExecuteParams('burn(uint256)', [tokenId], nonOwner, tokenId);

      await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });
  });

  describe('ABI-based', () => {
    const registryFuncs = () => {
      return Object.values(unsRegistry.interface.functions).filter(
        (fragment: FunctionFragment) => !['view', 'pure'].includes(fragment.stateMutability),
      );
    };

    const buidRequest = async (
      fragment: FunctionFragment,
      from: string,
      tokenId: BigNumberish,
      paramsMap: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    ) => {
      const contract: Contract = unsRegistry;

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
        uri: 'label',
        data: '0x',
        keys: ['key1'],
        values: ['value1'],
        to: '',
        tokenId: '',
      };

      const included = ['issueWithRecords'];

      const getFuncs = () => {
        return registryFuncs()
          .filter((x) => x.inputs.filter((i) => i.name === 'tokenId').length)
          .filter((x) => included.includes(x.name) || included.includes(getFuncSignature(x)));
      };

      before(async () => {
        paramValueMap.to = receiver.address;
      });

      it('should execute all functions successfully', async () => {
        for (const func of getFuncs()) {
          const funcSigHash = utils.id(`${getFuncSignature(func)}_excl`);
          paramValueMap.tokenId = (await unsRegistry.namehash([funcSigHash, 'crypto'])).toHexString();

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
        from: '',
        to: '',
        tokenId: BigNumber.from('0x0'),
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
          const funcSigHash = utils.id(`${getFuncSignature(func)}_ok`);

          paramValueMap.tokenId = await mintDomain(unsRegistry, owner, [funcSigHash, 'crypto']);

          const req = await buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
          const signature = await sign(req.data, unsRegistry.address, req.nonce, owner);
          await unsRegistry.execute(req, signature);
        }
      });

      it('should revert execution of all token-based functions when used signature', async () => {
        for (const func of getFuncs()) {
          const funcSig = getFuncSignature(func);
          const funcSigHash = utils.id(`${funcSig}_doubleUse`);

          paramValueMap.tokenId = await mintDomain(unsRegistry, owner, [funcSigHash, 'crypto']);

          const req = await buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
          const signature = await sign(req.data, unsRegistry.address, req.nonce, owner);
          await unsRegistry.execute(req, signature);

          await expect(unsRegistry.execute(req, signature)).to.be.revertedWith(
            'UNSRegistryForwarder: SIGNATURE_INVALID',
          );
        }
      });

      it('should revert execution of all token-based functions when nonce invalidated', async () => {
        for (const func of getFuncs()) {
          const funcSig = getFuncSignature(func);
          const funcSigHash = utils.id(`${funcSig}_nonceInvalidated`);

          paramValueMap.tokenId = await mintDomain(unsRegistry, owner, [funcSigHash, 'crypto']);

          const req = await buidRequest(func, owner.address, paramValueMap.tokenId, paramValueMap);
          const signature = await sign(req.data, unsRegistry.address, req.nonce, owner);

          await unsRegistry.connect(owner).set('key', 'value', paramValueMap.tokenId);

          await expect(unsRegistry.execute(req, signature)).to.be.revertedWith(
            'UNSRegistryForwarder: SIGNATURE_INVALID',
          );
        }
      });

      it('should fail execution of all token-based functions when tokenId does not match', async () => {
        for (const func of getFuncs()) {
          const funcSig = getFuncSignature(func);
          const funcSigHash = utils.id(`${funcSig}_wrongToken`);

          paramValueMap.tokenId = await mintDomain(unsRegistry, owner, [funcSigHash, 'crypto']);

          const tokenIdForwarder = await unsRegistry.namehash([utils.id(`_${funcSig}`), 'crypto']);
          const req = await buidRequest(func, owner.address, tokenIdForwarder, paramValueMap);

          const signature = await sign(req.data, unsRegistry.address, req.nonce, owner);
          await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: TOKEN_INVALID');
        }
      });

      it('should fail execution of all token-based functions when tokenId is empty', async () => {
        for (const func of getFuncs()) {
          const funcSigHash = utils.id(`${getFuncSignature(func)}_emptyTokenId`);

          paramValueMap.tokenId = await mintDomain(unsRegistry, owner, [funcSigHash, 'crypto']);

          const req = await buidRequest(func, owner.address, 0, paramValueMap);

          const signature = await sign(req.data, unsRegistry.address, req.nonce, owner);
          await expect(unsRegistry.execute(req, signature)).to.be.revertedWith('Registry: TOKEN_INVALID');
        }
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
        tld: BigNumber.from('0x0'),
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
        'multicall',
      ];

      before(async () => {
        paramValueMap.tld = TLD.CRYPTO;
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
          paramValueMap.labels = [utils.id(`${funcSig}_label`), 'crypto'];

          const req = await buidRequest(func, coinbase.address, 0, paramValueMap);
          const signature = await sign(req.data, unsRegistry.address, req.nonce, coinbase);
          await unsRegistry.execute(req, signature);
        }
      });

      it('should execute setReverse(string[]) correctly', async () => {
        const setReverseFunc = registryFuncs()
          .filter((x) => !x.inputs.filter((i) => i.name === 'tokenId').length)
          .filter((x) => x.name === 'setReverse')[0];
        const funcSig = getFuncSignature(setReverseFunc);
        paramValueMap.labels = [utils.id(`${funcSig}_label`), 'crypto'];
        const tokenId = await mintDomain(unsRegistry, owner, paramValueMap.labels);
        const req = await buidRequest(setReverseFunc, owner.address, tokenId, paramValueMap);
        const signature = await sign(req.data, unsRegistry.address, req.nonce, owner);
        await unsRegistry.execute(req, signature);
      });

      it('should execute unlockWithRecords(address,string[],string[],string[],bool) correctly', async () => {
        const unlockWithRecordsLabels = registryFuncs()
          .filter((x) => !x.inputs.filter((i) => i.name === 'tokenId').length)
          .filter((x) => x.name === 'unlockWithRecords')[0];
        const funcSig = getFuncSignature(unlockWithRecordsLabels);
        paramValueMap.labels = [utils.id(`${funcSig}_label`), 'crypto'];
        const tokenId = await mintDomain(unsRegistry, owner, paramValueMap.labels);
        const req = await buidRequest(unlockWithRecordsLabels, coinbase.address, tokenId, paramValueMap);
        const signature = await sign(req.data, unsRegistry.address, req.nonce, coinbase);
        await unsRegistry.execute(req, signature);
      });

      it('should revert execution of all functions when used signature', async () => {
        for (const func of getFuncs()) {
          const funcSig = getFuncSignature(func);
          paramValueMap.labels = [utils.id(`${funcSig}_doubleUse`), 'crypto'];
          paramValueMap.key = utils.id(`${funcSig}_doubleUse`);

          const tokenIdForwarder = await unsRegistry.namehash([utils.id(`_${funcSig}`), 'crypto']);
          const req = await buidRequest(func, coinbase.address, tokenIdForwarder, paramValueMap);
          const signature = await sign(req.data, unsRegistry.address, req.nonce, coinbase);
          await unsRegistry.execute(req, signature);

          await expect(unsRegistry.execute(req, signature)).to.be.revertedWith(
            'UNSRegistryForwarder: SIGNATURE_INVALID',
          );
        }
      });

      it('should revert execution of all functions when used signature and tokenId is empty', async () => {
        for (const func of getFuncs()) {
          const funcSig = getFuncSignature(func);
          paramValueMap.labels = [utils.id(`${funcSig}_doubleUse_0`), 'crypto'];

          const tokenId = 0;
          const nonce = await unsRegistry.nonceOf(tokenId);
          const req = await buidRequest(func, coinbase.address, tokenId, paramValueMap);
          const signature = await sign(req.data, unsRegistry.address, req.nonce, coinbase);
          await unsRegistry.execute(req, signature);

          expect(await unsRegistry.nonceOf(tokenId)).to.be.equal(nonce.add(1));
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

    it('should execute multiple meta txs through multicall', async () => {
      const labels = ['res_label_m1', 'crypto'];
      const tokenId = await unsRegistry.namehash(labels);

      const mintMetaParams = await buildExecuteParams(
        'mintWithRecords(address,string[],string[],string[],bool)',
        [owner.address, labels, [], [], false],
        coinbase,
        tokenId,
        BigNumber.from(0),
      );

      const transferMetaParams = await buildExecuteParams(
        'setOwner(address,uint256)',
        [receiver.address, tokenId],
        owner,
        tokenId,
        BigNumber.from(1),
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
        BigNumber.from(0),
      );

      await unsRegistry.multicall([
        unsRegistry.interface.encodeFunctionData('mintWithRecords', [owner.address, labels, [], [], false]),
        unsRegistry.interface.encodeFunctionData('execute', [transferMetaParams.req, transferMetaParams.signature]),
      ]);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });

    it('should not allow passing malicious calldata to meta tx multicall', async () => {
      const labels = ['res_label_m1x', 'crypto'];
      const tokenId = await mintDomain(unsRegistry, owner, labels);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);

      const { req, signature } = await buildExecuteParams(
        'multicall(bytes[])',
        [
          [
            ethers.utils.solidityPack(['bytes', 'address', 'uint256'], [
              unsRegistry.interface.encodeFunctionData('setOwner', [nonOwner.address, tokenId]),
              owner.address,
              tokenId,
            ]),
          ],
        ],
        nonOwner,
        tokenId,
      );

      await expect(
        unsRegistry.connect(nonOwner).execute(req, signature),
      ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
    });
  });
});
