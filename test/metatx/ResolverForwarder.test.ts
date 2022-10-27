import { ethers } from 'hardhat';
import { expect } from 'chai';
import { buildExecuteFunc, ExecuteFunc } from '../helpers/metatx';
import { TLD } from '../helpers/constants';
import { ResolverForwarder } from '../../typechain-types/contracts/metatx';
import { CNSRegistry, Resolver } from '../../typechain-types/dot-crypto/contracts';
import { MintingController, SignatureController } from '../../typechain-types/dot-crypto/contracts/controllers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { CNSRegistry__factory, Resolver__factory } from '../../typechain-types/factories/dot-crypto/contracts';
import { MintingController__factory, SignatureController__factory } from '../../typechain-types/factories/dot-crypto/contracts/controllers';
import { ResolverForwarder__factory } from '../../typechain-types/factories/contracts/metatx';
import { BigNumber } from 'ethers';

describe('ResolverForwarder', () => {
  let forwarder: ResolverForwarder, registry: CNSRegistry, mintingController: MintingController, signatureController: SignatureController, resolver: Resolver;
  let signers: SignerWithAddress[], owner: SignerWithAddress;
  let buildExecuteParams: ExecuteFunc;

  const mintDomain = async (label: string, owner: string, resolverAddress: string = resolver.address): Promise<BigNumber> => {
    await mintingController.mintSLDWithResolver(owner, label, resolverAddress);
    return await registry.childIdOf(TLD.CRYPTO, label);
  };

  const mintDomainWithoutResolver = async (label: string, owner: string): Promise<BigNumber> => {
    await mintingController.mintSLD(owner, label);
    return await registry.childIdOf(TLD.CRYPTO, label);
  };

  before(async () => {
    signers = await ethers.getSigners();
    [owner] = signers;

    registry = await new CNSRegistry__factory(owner).deploy();
    mintingController = await new MintingController__factory(owner).deploy(registry.address);
    signatureController = await new SignatureController__factory(owner).deploy(registry.address);
    resolver = await new Resolver__factory(owner).deploy(registry.address, mintingController.address);

    await registry.addController(mintingController.address);
    await registry.addController(signatureController.address);

    forwarder = await new ResolverForwarder__factory(owner).deploy(registry.address, resolver.address);

    buildExecuteParams = buildExecuteFunc(resolver.interface, resolver.address, forwarder);
  });

  describe('nonceOf', () => {
    it('should match nonces', async () => {
      const tokenId = await mintDomain('test_foon', owner.address);
      let nonceF = await forwarder.nonceOf(tokenId);
      let nonceR = await resolver.nonceOf(tokenId);

      expect(nonceF).to.be.equal(0);
      expect(nonceF).to.be.equal(nonceR);

      const { req, signature } = await buildExecuteParams(
        'reset(uint256)', [tokenId], owner, tokenId);
      await forwarder.execute(req, signature);

      nonceF = await forwarder.nonceOf(tokenId);
      nonceR = await resolver.nonceOf(tokenId);
      expect(nonceF).to.be.equal(1);
      expect(nonceF).to.be.equal(nonceR);
    });

    it('should return nonce from default resolver when domain doesn\'t have own', async () => {
      const tokenId = await mintDomainWithoutResolver('test_foo_no_res', owner.address);
      const nonceF = await forwarder.nonceOf(tokenId);
      const nonceR = await resolver.nonceOf(tokenId);

      expect(nonceF).to.be.equal(nonceR);

      // should be reverted when domain resolver is not set
      await expect(registry.resolverOf(tokenId)).to.be.revertedWith('');
    });

    it('should return nonce from default resolver when resolver is non-contract', async () => {
      const tokenId = await mintDomain('test_foo_noc', owner.address, owner.address);
      expect(await forwarder.nonceOf(tokenId)).to.be.equal(0);
    });

    it('should return nonce from default resolver when resolver is wrong', async () => {
      const tokenId = await mintDomain('test_foo_nof', owner.address, forwarder.address);
      expect(await forwarder.nonceOf(tokenId)).to.be.equal(0);
    });

    it('should return nonce from default resolver when resolver is wrong 2', async () => {
      const tokenId = await mintDomain('test_foo_nof2', owner.address);
      const { req, signature } = await buildExecuteParams(
        'reset(uint256)', [tokenId], owner, tokenId,
      );
      await forwarder.execute(req, signature);
      await registry.resolveTo(forwarder.address, tokenId);

      expect(await forwarder.nonceOf(tokenId)).to.be.equal(1);
    });
  });

  describe('verify', () => {
    it('should verify successfully', async () => {
      const tokenId = await mintDomain('test_foo_10', owner.address);
      const { req, signature } = await buildExecuteParams(
        'reset(uint256)', [tokenId], owner, tokenId);

      expect(await forwarder.verify(req, signature)).to.be.equal(true);
    });

    it('should fail verification when unknown function call', async () => {
      const tokenId = await mintDomain('test_foo_13', owner.address);
      const { req, signature } = await buildExecuteParams(
        'get(string,uint256)', ['k', tokenId], owner, tokenId);

      expect(await forwarder.verify(req, signature)).to.be.equal(false);
    });

    it('should fail verification when nonce is incorrect', async () => {
      const tokenId = await mintDomain('test_foo_14', owner.address);
      const { req, signature } = await buildExecuteParams(
        'reset(uint256)', [tokenId], owner, tokenId);

      expect(await forwarder.verify({ ...req, nonce: 100 }, signature)).to.be.equal(false);
    });

    it('should fail verification when signature used', async () => {
      const tokenId = await mintDomain('test_foo_15', owner.address);
      const { req, signature } = await buildExecuteParams(
        'reset(uint256)', [tokenId], owner, tokenId);
      await forwarder.execute(req, signature);

      expect(await forwarder.verify(req, signature)).to.be.equal(false);
    });
  });

  describe('execute', () => {
    it('should execute `reset` records', async () => {
      const tokenId = await mintDomain('test_foo__1', owner.address);
      await resolver.set('k', 'v', tokenId);
      expect(await resolver.get('k', tokenId)).to.be.equal('v');

      const { req, signature } = await buildExecuteParams(
        'reset(uint256)', [tokenId], owner, tokenId);
      expect(await forwarder.verify(req, signature)).to.be.equal(true);

      await forwarder.execute(req, signature);

      expect(await resolver.get('k', tokenId)).to.be.equal('');
    });

    it('should execute `set` records', async () => {
      const tokenId = await mintDomain('test_foo__2', owner.address);

      const { req, signature } = await buildExecuteParams(
        'set(string,string,uint256)', ['k', 'v', tokenId], owner, tokenId);
      expect(await forwarder.verify(req, signature)).to.be.equal(true);

      await forwarder.execute(req, signature);

      expect(await resolver.get('k', tokenId)).to.be.equal('v');
    });

    it('should execute `setMany` records', async () => {
      const tokenId = await mintDomain('test_foo__3', owner.address);

      const { req, signature } = await buildExecuteParams(
        'setMany(string[],string[],uint256)', [['k1', 'k2'], ['v1', 'v2'], tokenId], owner, tokenId);
      expect(await forwarder.verify(req, signature)).to.be.equal(true);

      await forwarder.execute(req, signature);

      expect(await resolver.get('k1', tokenId)).to.be.equal('v1');
    });

    it('should execute `reconfigure` records', async () => {
      const tokenId = await mintDomain('test_foo__4', owner.address);
      await resolver.set('k1', 'v1', tokenId);
      expect(await resolver.get('k1', tokenId)).to.be.equal('v1');

      const { req, signature } = await buildExecuteParams(
        'reconfigure(string[],string[],uint256)', [['k2'], ['v2'], tokenId], owner, tokenId);
      expect(await forwarder.verify(req, signature)).to.be.equal(true);

      await forwarder.execute(req, signature);

      expect(await resolver.get('k1', tokenId)).to.be.equal('');
      expect(await resolver.get('k2', tokenId)).to.be.equal('v2');
    });
  });
});
