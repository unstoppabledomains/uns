const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai');

const { BigNumber } = ethers;

describe('ReverseResolver (proxy)', () => {
  const cryptoDomainName = 'test_42';
  let UNSRegistry, ReverseResolver, unsRegistry, reverseResolver, reverseResolverWithCNS;
  let CNSRegistry, CNSMintingController, CNSResolver, cnsRegistry, cnsMintingController, cnsResolver;
  let coinbase, account, cryptoTokenId;

  const walletRoot = BigNumber.from(
    '0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230',
  );
  const xRoot = BigNumber.from(
    '0x241e7e2b7fd7333b3c0c049b326316b811af0c01cfc0c7a90b466fda3a70fc2d',
  );
  const cryptoRoot = BigNumber.from(
    '0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f',
  );

  before(async () => {
    [coinbase, account] = await ethers.getSigners();

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');

    unsRegistry = await upgrades.deployProxy(UNSRegistry, [coinbase.address], {
      initializer: 'initialize',
    });

    // Deploy CNS.
    CNSRegistry = await ethers.getContractFactory('CNSRegistry');
    CNSMintingController = await ethers.getContractFactory('MintingController');
    CNSResolver = await ethers.getContractFactory('Resolver');
    cnsRegistry = await CNSRegistry.deploy();
    cnsMintingController = await CNSMintingController.deploy(cnsRegistry.address);
    await cnsRegistry.addController(cnsMintingController.address);
    cnsResolver = await CNSResolver.deploy(cnsRegistry.address, cnsMintingController.address);

    // Deploy Reverse Resolver.
    ReverseResolver = await ethers.getContractFactory('ReverseResolver');
    reverseResolver = await upgrades.deployProxy(
      ReverseResolver,
      [unsRegistry.address, '0x0000000000000000000000000000000000000000'],
      { initializer: 'initialize' },
    );
    reverseResolverWithCNS = await upgrades.deployProxy(
      ReverseResolver,
      [unsRegistry.address, cnsRegistry.address],
      { initializer: 'initialize' },
    );

    // Mint domains.
    await unsRegistry.mint(coinbase.address, walletRoot, 'wallet');
    await unsRegistry.setTokenURIPrefix('/');
    cryptoTokenId = await cnsRegistry.childIdOf(cryptoRoot, cryptoDomainName);
    await cnsMintingController.mintSLDWithResolver(coinbase.address, cryptoDomainName, cnsResolver.address);
  });

  describe('ReverseResolver (UNS only)', () => {
    it('should register reverse record and resolve it', async () => {
      await reverseResolver.connect(coinbase).register(walletRoot);
      expect(await reverseResolver.reverseOf(coinbase.address)).to.be.eq(
        walletRoot,
      );
    });

    it('`register` should reject when registering a reverse record for a not owned domain', async () => {
      await expect(
        reverseResolver.connect(account).register(walletRoot),
      ).to.be.revertedWith(
        'ReverseResolver: SENDER_IS_NOT_APPROVED_OR_OWNER',
      );
    });

    it('`reverseOf` should reject after changing a domain owner', async () => {
      await unsRegistry.setOwner(account.address, walletRoot);
      await expect(
        reverseResolver.reverseOf(coinbase.address),
      ).to.be.revertedWith(
        'ReverseResolver: ACCOUNT_IS_NOT_APPROVED_OR_OWNER',
      );
    });

    it('`register` should reject for a non-existing domain', async () => {
      await expect(
        reverseResolver.connect(coinbase).register(BigNumber.from('0x0')),
      ).to.be.revertedWith('ERC721: operator query for nonexistent token');
    });

    it('`reverseOf` should reject for a user without a registered domain', async () => {
      await expect(
        reverseResolver.reverseOf(coinbase.address),
      ).to.be.revertedWith(
        'ReverseResolver: ACCOUNT_IS_NOT_APPROVED_OR_OWNER',
      );
    });

    it('`remove` should remove a reverse record', async () => {
      await reverseResolver.connect(account).register(walletRoot);
      await reverseResolver.connect(account).remove();
      await expect(
        reverseResolver.reverseOf(account.address),
      ).to.be.revertedWith('ReverseResolver: REVERSE_RECORD_IS_EMPTY');
    });

    it('`remove` should reject a reverse if their reverse record is not set', async () => {
      await expect(
        reverseResolver.connect(account).remove(),
      ).to.be.revertedWith('ReverseResolver: REVERSE_RECORD_IS_EMPTY');
    });

    it('`remove` should remove a reverse record for a not owned domain', async () => {
      await unsRegistry.mint(coinbase.address, xRoot, 'crypto');
      await unsRegistry.setOwner(account.address, xRoot);
      await reverseResolver.connect(coinbase).remove();
      await expect(
        reverseResolver.connect(account).remove(),
      ).to.be.revertedWith('ReverseResolver: REVERSE_RECORD_IS_EMPTY');
    });
  });

  describe('ReverseResolver (UNS and CNS)', () => {
    it('should register reverse record and resolve it', async () => {
      await reverseResolverWithCNS.connect(coinbase).register(cryptoTokenId);
      expect(await reverseResolverWithCNS.reverseOf(coinbase.address)).to.be.eq(
        cryptoTokenId,
      );
    });

    it('`register` should reject when registering a reverse record for a not owned domain', async () => {
      await expect(
        reverseResolverWithCNS.connect(account).register(cryptoTokenId),
      ).to.be.revertedWith(
        'ReverseResolver: SENDER_IS_NOT_APPROVED_OR_OWNER',
      );
    });

    it('`reverseOf` should reject after changing a domain owner', async () => {
      await cnsRegistry.setOwner(account.address, cryptoTokenId);
      await expect(
        reverseResolverWithCNS.reverseOf(coinbase.address),
      ).to.be.revertedWith(
        'ReverseResolver: ACCOUNT_IS_NOT_APPROVED_OR_OWNER',
      );
    });

    it('`register` should reject for a non-existing domain', async () => {
      await expect(
        reverseResolverWithCNS.connect(coinbase).register(BigNumber.from('0x0')),
      ).to.be.revertedWith('ERC721: operator query for nonexistent token');
    });

    it('`reverseOf` should reject for a user without a registered domain', async () => {
      await expect(
        reverseResolverWithCNS.reverseOf(coinbase.address),
      ).to.be.revertedWith(
        'ReverseResolver: ACCOUNT_IS_NOT_APPROVED_OR_OWNER',
      );
    });

    it('`remove` should remove a reverse record', async () => {
      await reverseResolverWithCNS.connect(account).register(cryptoTokenId);
      await reverseResolverWithCNS.connect(account).remove();
      await expect(
        reverseResolverWithCNS.reverseOf(account.address),
      ).to.be.revertedWith('ReverseResolver: REVERSE_RECORD_IS_EMPTY');
    });

    it('`remove` should reject a reverse if their reverse record is not set', async () => {
      await expect(
        reverseResolverWithCNS.connect(account).remove(),
      ).to.be.revertedWith('ReverseResolver: REVERSE_RECORD_IS_EMPTY');
    });

    it('`remove` should remove a reverse record for a not owned domain', async () => {
      await cnsMintingController.mintSLDWithResolver(coinbase.address, 'another', cnsResolver.address);
      const crypto2TokenId = await cnsRegistry.childIdOf(cryptoRoot, 'another');
      await cnsRegistry.setOwner(account.address, crypto2TokenId);
      await reverseResolverWithCNS.connect(coinbase).remove();
      await expect(
        reverseResolverWithCNS.connect(account).remove(),
      ).to.be.revertedWith('ReverseResolver: REVERSE_RECORD_IS_EMPTY');
    });
  });
});
