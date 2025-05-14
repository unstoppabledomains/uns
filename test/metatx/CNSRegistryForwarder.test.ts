import { ethers } from 'hardhat';
import { expect } from 'chai';
import { BigNumberish } from 'ethers';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { buildExecuteFunc, ExecuteFunc } from '../helpers/metatx';
import { TLD } from '../../src/tlds';
import { CNSRegistry__factory, Resolver__factory } from '../../types/factories/dot-crypto/contracts';
import {
  MintingController__factory,
  SignatureController__factory,
} from '../../types/factories/dot-crypto/contracts/controllers';
import { CNSRegistryForwarder__factory } from '../../types/factories/contracts/metatx';
import { CNSRegistryForwarder } from '../../types/contracts/metatx';
import { CNSRegistry, Resolver } from '../../types/dot-crypto/contracts';
import { MintingController, SignatureController } from '../../types/dot-crypto/contracts/controllers';

describe('CNSRegistryForwarder', () => {
  let forwarder: CNSRegistryForwarder,
    registry: CNSRegistry,
    mintingController: MintingController,
    signatureController: SignatureController,
    resolver: Resolver;

  let signers: SignerWithAddress[], owner: SignerWithAddress, receiver: SignerWithAddress;
  let buildExecuteParams: ExecuteFunc;

  const mintDomain = async (label: string, owner: string) => {
    await mintingController.mintSLD(owner, label);
    return await registry.childIdOf(TLD.crypto.hash, label);
  };

  const buildTransfer = async (from: SignerWithAddress, toAddress: string, tokenId: BigNumberish) => {
    return await buildExecuteParams(
      'transferFrom(address,address,uint256)',
      [from.address, toAddress, tokenId],
      from,
      tokenId,
    );
  };

  before(async () => {
    signers = await ethers.getSigners();
    [owner, receiver] = signers;

    registry = await new CNSRegistry__factory().connect(owner).deploy();
    mintingController = await new MintingController__factory().connect(owner).deploy(await registry.getAddress());
    signatureController = await new SignatureController__factory().connect(owner).deploy(await registry.getAddress());
    resolver = await new Resolver__factory()
      .connect(owner)
      .deploy(await registry.getAddress(), await mintingController.getAddress());

    await registry.addController(await mintingController.getAddress());
    await registry.addController(await signatureController.getAddress());

    forwarder = await new CNSRegistryForwarder__factory()
      .connect(owner)
      .deploy(await signatureController.getAddress());

    buildExecuteParams = buildExecuteFunc(registry.interface, await signatureController.getAddress(), forwarder);
  });

  describe('nonceOf', () => {
    it('should match nonces', async () => {
      const tokenId = await mintDomain('test_foon', owner.address);
      let nonceF = await forwarder.nonceOf(tokenId);
      let nonceS = await signatureController.nonceOf(tokenId);

      expect(nonceF).to.be.equal(0);
      expect(nonceF).to.be.equal(nonceS);

      const { req, signature } = await buildTransfer(owner, receiver.address, tokenId);
      await forwarder.execute(req, signature);

      nonceF = await forwarder.nonceOf(tokenId);
      nonceS = await signatureController.nonceOf(tokenId);
      expect(nonceF).to.be.equal(1);
      expect(nonceF).to.be.equal(nonceS);
    });
  });

  describe('verify', () => {
    it('should verify successfully', async () => {
      const tokenId = await mintDomain('test_foo_10', owner.address);
      const { req, signature } = await buildTransfer(owner, receiver.address, tokenId);

      expect(await forwarder.verify(req, signature)).to.be.equal(true);
    });

    it('should fail verification when unknown function call', async () => {
      const tokenId = await mintDomain('test_foo_13', owner.address);
      const { req, signature } = await buildExecuteParams(
        'setOwner(address,uint256)',
        [receiver.address, tokenId],
        owner,
        tokenId,
      );

      expect(await forwarder.verify(req, signature)).to.be.equal(false);
    });

    it('should fail verification when nonce is incorrect', async () => {
      const tokenId = await mintDomain('test_foo_14', owner.address);
      const { req, signature } = await buildTransfer(owner, receiver.address, tokenId);

      expect(await forwarder.verify({ ...req, nonce: 100 }, signature)).to.be.equal(false);
    });

    it('should fail verification when signature used', async () => {
      const tokenId = await mintDomain('test_foo_15', owner.address);
      const { req, signature } = await buildTransfer(owner, receiver.address, tokenId);
      await forwarder.execute(req, signature);

      expect(await forwarder.verify(req, signature)).to.be.equal(false);
    });
  });

  describe('execute', () => {
    it('should execute `transferFrom` for token', async () => {
      const tokenId = await mintDomain('test_goo__1', owner.address);
      const { req, signature } = await buildTransfer(owner, receiver.address, tokenId);
      expect(await forwarder.verify(req, signature)).to.be.equal(true);

      await forwarder.execute(req, signature);

      expect(await registry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });

    it('should execute `safeTransferFrom` for token', async () => {
      const tokenId = await mintDomain('test_goo__2', owner.address);
      const { req, signature } = await buildExecuteParams(
        'safeTransferFrom(address,address,uint256)',
        [owner.address, receiver.address, tokenId],
        owner,
        tokenId,
      );
      expect(await forwarder.verify(req, signature)).to.be.equal(true);

      await forwarder.execute(req, signature);

      expect(await registry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });

    it('should execute `safeTransferFrom(bytes)` for token', async () => {
      const tokenId = await mintDomain('test_goo__3', owner.address);
      const { req, signature } = await buildExecuteParams(
        'safeTransferFrom(address,address,uint256,bytes)',
        [owner.address, receiver.address, tokenId, '0x'],
        owner,
        tokenId,
      );
      expect(await forwarder.verify(req, signature)).to.be.equal(true);

      await forwarder.execute(req, signature);

      expect(await registry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });

    it('should execute `burn` for token', async () => {
      const tokenId = await mintDomain('test_goo__4', owner.address);
      const { req, signature } = await buildExecuteParams('burn(uint256)', [tokenId], owner, tokenId);
      expect(await forwarder.verify(req, signature)).to.be.equal(true);

      await forwarder.execute(req, signature);

      await expect(registry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
    });

    it('should execute `mintChild` for token', async () => {
      const tokenId = await mintDomain('test_goo__5', owner.address);
      const { req, signature } = await buildExecuteParams(
        'mintChild(address,uint256,string)',
        [receiver.address, tokenId, 'test'],
        owner,
        tokenId,
      );
      expect(await forwarder.verify(req, signature)).to.be.equal(true);

      await forwarder.execute(req, signature);

      const childTokenId = await registry.childIdOf(tokenId, 'test');
      expect(await registry.ownerOf(childTokenId)).to.be.equal(receiver.address);
    });

    it('should execute `safeMintChild` for token', async () => {
      const tokenId = await mintDomain('test_goo__6', owner.address);
      const { req, signature } = await buildExecuteParams(
        'safeMintChild(address,uint256,string)',
        [receiver.address, tokenId, 'test'],
        owner,
        tokenId,
      );
      expect(await forwarder.verify(req, signature)).to.be.equal(true);

      await forwarder.execute(req, signature);

      const childTokenId = await registry.childIdOf(tokenId, 'test');
      expect(await registry.ownerOf(childTokenId)).to.be.equal(receiver.address);
    });

    it('should execute `safeMintChild(bytes)` for token', async () => {
      const tokenId = await mintDomain('test_goo__7', owner.address);
      const { req, signature } = await buildExecuteParams(
        'safeMintChild(address,uint256,string,bytes)',
        [receiver.address, tokenId, 'test', '0x'],
        owner,
        tokenId,
      );
      expect(await forwarder.verify(req, signature)).to.be.equal(true);

      await forwarder.execute(req, signature);

      const childTokenId = await registry.childIdOf(tokenId, 'test');
      expect(await registry.ownerOf(childTokenId)).to.be.equal(receiver.address);
    });

    it('should execute `transferFromChild` for token', async () => {
      const tokenId = await mintDomain('test_goo__8', owner.address);

      await registry.mintChild(owner.address, tokenId, 'test');
      const childTokenId = await registry.childIdOf(tokenId, 'test');
      expect(await registry.ownerOf(childTokenId)).to.be.equal(owner.address);

      const { req, signature } = await buildExecuteParams(
        'transferFromChild(address,address,uint256,string)',
        [owner.address, receiver.address, tokenId, 'test'],
        owner,
        tokenId,
      );
      expect(await forwarder.verify(req, signature)).to.be.equal(true);

      await forwarder.execute(req, signature);

      expect(await registry.ownerOf(childTokenId)).to.be.equal(receiver.address);
    });

    it('should execute `safeTransferFromChild` for token', async () => {
      const tokenId = await mintDomain('test_goo__9', owner.address);

      await registry.mintChild(owner.address, tokenId, 'test');
      const childTokenId = await registry.childIdOf(tokenId, 'test');
      expect(await registry.ownerOf(childTokenId)).to.be.equal(owner.address);

      const { req, signature } = await buildExecuteParams(
        'safeTransferFromChild(address,address,uint256,string)',
        [owner.address, receiver.address, tokenId, 'test'],
        owner,
        tokenId,
      );
      expect(await forwarder.verify(req, signature)).to.be.equal(true);

      await forwarder.execute(req, signature);

      expect(await registry.ownerOf(childTokenId)).to.be.equal(receiver.address);
    });

    it('should execute `safeTransferFromChild(bytes)` for token', async () => {
      const tokenId = await mintDomain('test_goo__10', owner.address);

      await registry.mintChild(owner.address, tokenId, 'test');
      const childTokenId = await registry.childIdOf(tokenId, 'test');
      expect(await registry.ownerOf(childTokenId)).to.be.equal(owner.address);

      const { req, signature } = await buildExecuteParams(
        'safeTransferFromChild(address,address,uint256,string,bytes)',
        [owner.address, receiver.address, tokenId, 'test', '0x'],
        owner,
        tokenId,
      );
      expect(await forwarder.verify(req, signature)).to.be.equal(true);

      await forwarder.execute(req, signature);

      expect(await registry.ownerOf(childTokenId)).to.be.equal(receiver.address);
    });

    it('should execute `burnChild` for token', async () => {
      const tokenId = await mintDomain('test_goo__11', owner.address);

      await registry.mintChild(owner.address, tokenId, 'test');
      const childTokenId = await registry.childIdOf(tokenId, 'test');
      expect(await registry.ownerOf(childTokenId)).to.be.equal(owner.address);

      const { req, signature } = await buildExecuteParams(
        'burnChild(uint256,string)',
        [tokenId, 'test'],
        owner,
        tokenId,
      );
      expect(await forwarder.verify(req, signature)).to.be.equal(true);

      await forwarder.execute(req, signature);

      await expect(registry.ownerOf(childTokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
      expect(await registry.ownerOf(tokenId)).to.be.equal(owner.address);
    });

    it('should execute `resolveTo` for token', async () => {
      const tokenId = await mintDomain('test_goo__12', owner.address);
      await expect(registry.resolverOf(tokenId)).to.be.revertedWithoutReason();

      const { req, signature } = await buildExecuteParams(
        'resolveTo(address,uint256)',
        [await resolver.getAddress(), tokenId],
        owner,
        tokenId,
      );
      expect(await forwarder.verify(req, signature)).to.be.equal(true);

      await forwarder.execute(req, signature);

      expect(await registry.resolverOf(tokenId)).to.be.equal(await resolver.getAddress());
    });
  });
});
