const { ethers } = require('hardhat');
const { expect } = require('chai');
const {
  TLD,
  DEAD_ADDRESS,
} = require('./helpers/constants');
const { mintDomain } = require('./helpers/registry');
const { solidityKeccak256 } = require('ethers/lib/utils');
const { BigNumber } = require('ethers');
const DotCoinTld = BigNumber.from('0x7674e7282552c15f203b9c4a6025aeaf28176ef7f5451b280f9bada3f8bc98e2');

describe('DotCoinBurner', () => {
  let UNSRegistryFactory, DotCoinBurnerFactory;
  let unsRegistry, dotCoinBurner;
  let signers, coinbase, accounts;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;
    [, ...accounts] = signers;
    UNSRegistryFactory = await ethers.getContractFactory('UNSRegistry');
    DotCoinBurnerFactory = await ethers.getContractFactory('DotCoinBurner');

    // deploy UNS regisry
    unsRegistry = await UNSRegistryFactory.deploy();
    await unsRegistry.initialize(coinbase.address);

    // deploy Dot Coin Burner
    dotCoinBurner = await DotCoinBurnerFactory.deploy(unsRegistry.address);
  });

  beforeEach(async () => {
    // Contract should not be approved spender by default
    for (let i = 0; i < signers.length; i++) {
      await unsRegistry.connect(signers[i])
        .setApprovalForAll(dotCoinBurner.address, false);
    }
  });

  it('should emit BatchCompleted event', async () => {
    const mintedTokenIds = [];
    const labelHashes = [];
    for (let i = 0; i < 10; i++) {
      const label = `batch-completed-${i}`;
      labelHashes.push(solidityKeccak256(['string'], [label]));
      mintedTokenIds.push(await mintDomain(unsRegistry, accounts[0], DotCoinTld, label));
    }
    expect(mintedTokenIds).to.be.not.empty;
    const firstTokenId = mintedTokenIds[0];
    const lastTokenId = mintedTokenIds[mintedTokenIds.length - 1];
    await unsRegistry.connect(accounts[0]).setApprovalForAll(dotCoinBurner.address, true);
    await expect(dotCoinBurner.burnAll(labelHashes))
      .to.emit(dotCoinBurner, 'BatchCompleted')
      .withArgs(firstTokenId, lastTokenId);
  });

  it('should burn all passed domains from multiple owners', async () => {
    const mintedTokenIds = [];
    const labelHashes = [];
    for (let i = 0; i < accounts.length; i++) {
      const label = `multiple-owners-${i}`;
      labelHashes.push(solidityKeccak256(['string'], [label]));
      const tokenId = await mintDomain(unsRegistry, accounts[i], DotCoinTld, label);
      mintedTokenIds.push(tokenId);
      await unsRegistry.connect(accounts[i]).setApprovalForAll(dotCoinBurner.address, true);
      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(accounts[i].address);
    }
    await dotCoinBurner.burnAll(labelHashes);
    expect(mintedTokenIds).to.be.not.empty;
    for (let i = 0; i < mintedTokenIds.length; i++) {
      const domainOwner = await unsRegistry.ownerOf(mintedTokenIds[i]);
      expect(domainOwner).to.be.equal(DEAD_ADDRESS);
    }
  });

  it('should fail if domain has incorrect extension', async () => {
    await unsRegistry.setApprovalForAll(dotCoinBurner.address, true);
    expect(TLD).to.be.not.empty;
    for (const i in TLD) {
      const label = `incorrect-extension-${i.toLowerCase()}`;
      const labelHash = solidityKeccak256(['string'], [label]);
      await mintDomain(unsRegistry, coinbase, TLD[i], label);
      await expect(dotCoinBurner.burnAll([labelHash]))
        .to.be.revertedWith('ERC721: invalid token ID');
    }
  });

  it('should fail if domain is not approved to spend', async () => {
    const label = 'not-approved-domain-to-burn';
    const labelHash = solidityKeccak256(['string'], [label]);
    await mintDomain(unsRegistry, accounts[0], DotCoinTld, label);
    await expect(dotCoinBurner.burnAll([labelHash]))
      .to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
  });

  it('should fail if 1 of multiple domains is not approved to spend', async () => {
    const labelHashes = [];
    for (let i = 0; i < accounts.length; i++) {
      const label = `one-of-five-is-not-approved-${i}`;
      labelHashes.push(solidityKeccak256(['string'], [label]));
      await mintDomain(unsRegistry, accounts[i], DotCoinTld, label);
      await unsRegistry.connect(accounts[i]).setApprovalForAll(dotCoinBurner.address, true);
    }
    await unsRegistry.connect(accounts[0]).setApprovalForAll(dotCoinBurner.address, false);
    await expect(dotCoinBurner.burnAll(labelHashes))
      .to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
  });

  it('should allow calling burn method from any account', async () => {
    const mintedTokenIds = [];
    for (let i = 0; i < accounts.length; i++) {
      const label = `multiple-method-callers-${i}`;
      const labelHash = solidityKeccak256(['string'], [label]);
      const tokenId = await mintDomain(unsRegistry, accounts[i], DotCoinTld, label);
      mintedTokenIds.push(tokenId);
      await unsRegistry.connect(accounts[i]).setApprovalForAll(dotCoinBurner.address, true);
      // Ensure that caller is different from domain owner
      await dotCoinBurner.connect(accounts[accounts.length - i - 1]).burnAll([labelHash]);
    }
    expect(mintedTokenIds).to.be.not.empty;
    for (let i = 0; i < mintedTokenIds.length; i++) {
      expect(await unsRegistry.ownerOf(mintedTokenIds[i]))
        .to.be.equal(DEAD_ADDRESS);
    }
  });

  describe('Estimate gas spendings', () => {
    it('should burn multiple domains', async () => {
      const result = [];
      for (const i of [1, 2, 3, 10, 50, 100, 140]) {
        result.push(await verifyMultipleDomainsBurn(i, `${i}-domains-`));
      }
      expect(result).to.be.not.empty;
      console.table(result);
    });

    async function verifyMultipleDomainsBurn (amount, labelPrefix) {
      const mintedTokenIds = [];
      const labelHashes = [];
      for (let i = 0; i < amount; i++) {
        const label = `${labelPrefix}-${i}`;
        labelHashes.push(solidityKeccak256(['string'], [label]));
        mintedTokenIds.push(await mintDomain(unsRegistry, accounts[0], DotCoinTld, label));
      }
      await unsRegistry.connect(accounts[0]).setApprovalForAll(dotCoinBurner.address, true);
      const txReceipt = await (await dotCoinBurner.burnAll(labelHashes)).wait();

      expect(mintedTokenIds).to.be.not.empty;
      for (let i = 0; i < mintedTokenIds.length; i++) {
        const domainOwner = await unsRegistry.ownerOf(mintedTokenIds[i]);
        expect(domainOwner).to.be.equal(DEAD_ADDRESS);
      }

      return {
        domainsAmount: amount,
        gasUsed: txReceipt.gasUsed.toString(),
      };
    }
  });
});
