import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { solidityPackedKeccak256 } from 'ethers';
import { DotCoinBurner__factory, UNSRegistry__factory } from '../types/factories/contracts';
import { DotCoinBurner, UNSRegistry } from '../types/contracts';
import { TLD, DEAD_ADDRESS, ZERO_ADDRESS, EXPIRABLE_TLDS } from './helpers/constants';
import { mintDomain } from './helpers/registry';
import { getLatestBlockTimestamp } from './helpers/utils';

describe('DotCoinBurner', () => {
  let unsRegistry: UNSRegistry, dotCoinBurner: DotCoinBurner;
  let signers: SignerWithAddress[], coinbase: SignerWithAddress, accounts: SignerWithAddress[];

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;
    [, ...accounts] = signers;

    // deploy UNS regisry
    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
  });

  beforeEach(async () => {
    // deploy Dot Coin Burner
    dotCoinBurner = await new DotCoinBurner__factory(coinbase).deploy(await unsRegistry.getAddress());
  });

  it('should emit BatchCompleted event', async () => {
    const mintedTokenIds: bigint[] = [];
    const labelHashes: string[] = [];
    for (let i = 0; i < 10; i++) {
      const label = `batch-completed-${i}`;
      labelHashes.push(solidityPackedKeccak256(['string'], [label]));
      mintedTokenIds.push(
        await mintDomain({
          unsRegistry,
          owner: accounts[0],
          labels: [label, 'coin'],
        }),
      );
    }
    expect(mintedTokenIds).lengthOf(10);
    const firstTokenId = mintedTokenIds[0];
    const lastTokenId = mintedTokenIds[mintedTokenIds.length - 1];
    await unsRegistry.connect(accounts[0]).setApprovalForAll(await dotCoinBurner.getAddress(), true);
    await expect(dotCoinBurner.burnAll(labelHashes))
      .to.emit(dotCoinBurner, 'BatchCompleted')
      .withArgs(firstTokenId, lastTokenId);
  });

  it('should emit correct BatchCompleted event for 1 domain', async () => {
    const label = 'batch-completed-single-domain';
    const labelHash = solidityPackedKeccak256(['string'], [label]);
    const mintedTokenId = await mintDomain({ unsRegistry, owner: accounts[0], labels: [label, 'coin'] });
    await unsRegistry.connect(accounts[0]).setApprovalForAll(await dotCoinBurner.getAddress(), true);
    await expect(dotCoinBurner.burnAll([labelHash]))
      .to.emit(dotCoinBurner, 'BatchCompleted')
      .withArgs(mintedTokenId, mintedTokenId);
  });

  it('should not emit BatchCompleted event arguments are empty', async () => {
    await unsRegistry.connect(accounts[0]).setApprovalForAll(await dotCoinBurner.getAddress(), true);
    await expect(dotCoinBurner.burnAll([])).not.to.emit(dotCoinBurner, 'BatchCompleted');
  });

  it('should burn all passed domains from multiple owners', async () => {
    const mintedTokenIds: bigint[] = [];
    const labelHashes: string[] = [];
    for (let i = 0; i < accounts.length; i++) {
      const label = `multiple-owners-${i}`;
      labelHashes.push(solidityPackedKeccak256(['string'], [label]));
      const tokenId = await mintDomain({ unsRegistry, owner: accounts[i], labels: [label, 'coin'] });
      mintedTokenIds.push(tokenId);
      await unsRegistry.connect(accounts[i]).setApprovalForAll(await dotCoinBurner.getAddress(), true);
      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(accounts[i].address);
    }
    await dotCoinBurner.burnAll(labelHashes);
    expect(mintedTokenIds).lengthOf(accounts.length);
    for (let i = 0; i < mintedTokenIds.length; i++) {
      const domainOwner = await unsRegistry.ownerOf(mintedTokenIds[i]);
      expect(domainOwner).to.be.equal(DEAD_ADDRESS);
    }
  });

  it('should fail if domain has incorrect extension', async () => {
    await unsRegistry.setApprovalForAll(await dotCoinBurner.getAddress(), true);
    expect(TLD).to.be.not.empty;

    for (const tokenId in TLD) {
      const extension = tokenId.toLowerCase();
      const label = `incorrect-extension-${extension}`;
      const labelHash = solidityPackedKeccak256(['string'], [label]);

      await mintDomain({
        unsRegistry,
        owner: coinbase,
        labels: [label, extension],
        expiry: EXPIRABLE_TLDS.includes(extension) ? (await getLatestBlockTimestamp()) + 60 * 60 * 24 : 0,
      });

      await expect(dotCoinBurner.burnAll([labelHash])).to.be.revertedWith('ERC721: invalid token ID');
    }
  });

  it('should fail if domain is not approved to spend', async () => {
    const label = 'not-approved-domain-to-burn';
    const labelHash = solidityPackedKeccak256(['string'], [label]);
    await mintDomain({ unsRegistry, owner: accounts[0], labels: [label, 'coin'] });
    await expect(dotCoinBurner.burnAll([labelHash])).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
  });

  it('should fail if 1 of multiple domains is not approved to spend', async () => {
    const labelHashes: string[] = [];
    for (let i = 0; i < accounts.length; i++) {
      const label = `one-of-five-is-not-approved-${i}`;
      labelHashes.push(solidityPackedKeccak256(['string'], [label]));
      await mintDomain({ unsRegistry, owner: accounts[i], labels: [label, 'coin'] });
      await unsRegistry.connect(accounts[i]).setApprovalForAll(await dotCoinBurner.getAddress(), true);
    }
    await unsRegistry.connect(accounts[0]).setApprovalForAll(await dotCoinBurner.getAddress(), false);
    await expect(dotCoinBurner.burnAll(labelHashes)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
  });

  it('should allow calling burn method from any account', async () => {
    const mintedTokenIds: bigint[] = [];
    for (let i = 0; i < accounts.length; i++) {
      const label = `multiple-method-callers-${i}`;
      const labelHash = solidityPackedKeccak256(['string'], [label]);
      const tokenId = await mintDomain({ unsRegistry, owner: accounts[i], labels: [label, 'coin'] });
      mintedTokenIds.push(tokenId);
      await unsRegistry.connect(accounts[i]).setApprovalForAll(await dotCoinBurner.getAddress(), true);
      // Ensure that caller is different from domain owner
      await dotCoinBurner.connect(accounts[accounts.length - i - 1]).burnAll([labelHash]);
    }
    expect(mintedTokenIds).to.have.lengthOf(accounts.length);
    for (let i = 0; i < mintedTokenIds.length; i++) {
      expect(await unsRegistry.ownerOf(mintedTokenIds[i])).to.be.equal(DEAD_ADDRESS);
    }
  });
});
