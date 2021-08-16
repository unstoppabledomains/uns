const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai');

const { BigNumber } = ethers;

describe('ReverseResolver (proxy)', () => {
  let UNSRegistry, ReverseResolver, unsRegistry, reverseResolver;
  let coinbase, account;

  const walletRoot = BigNumber.from(
    '0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230',
  );
  const cryptoRoot = BigNumber.from(
    '0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f',
  );

  before(async () => {
    [coinbase, account] = await ethers.getSigners();

    UNSRegistry = await ethers.getContractFactory(
      'contracts/UNSRegistry.sol:UNSRegistry',
    );
    ReverseResolver = await ethers.getContractFactory(
      'contracts/ReverseResolver.sol:ReverseResolver',
    );

    unsRegistry = await upgrades.deployProxy(UNSRegistry, [coinbase.address], {
      initializer: 'initialize',
    });
    reverseResolver = await upgrades.deployProxy(
      ReverseResolver,
      [unsRegistry.address],
      { initializer: 'initialize' },
    );
    await unsRegistry.mint(coinbase.address, walletRoot, 'wallet');
    await unsRegistry.setTokenURIPrefix('/');
  });

  describe('ReverseResolver', () => {
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
      await unsRegistry.mint(coinbase.address, cryptoRoot, 'crypto');
      await unsRegistry.setOwner(account.address, cryptoRoot);
      await reverseResolver.connect(coinbase).remove();
      await expect(
        reverseResolver.connect(account).remove(),
      ).to.be.revertedWith('ReverseResolver: REVERSE_RECORD_IS_EMPTY');
    });
  });
});
