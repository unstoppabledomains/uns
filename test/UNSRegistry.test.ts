import { ethers } from 'hardhat';
import { expect } from 'chai';
import { id, namehash } from 'ethers';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { UNSRegistry } from '../types/contracts';
import { UNSRegistryMock } from '../types/contracts/mocks';
import { UNSRegistry__factory } from '../types/factories/contracts';
import { UNSRegistryMock__factory } from '../types/factories/contracts/mocks';
import { getExpirableTlds } from '../src/helpers';
import { TLD } from '../src/tlds';
import { ZERO_ADDRESS } from './helpers/constants';
import { mintDomain, mintRandomDomain } from './helpers/registry';
import { getLatestBlockTimestamp, increaseTimeBy } from './helpers/utils';

describe('UNSRegistry', () => {
  let unsRegistry: UNSRegistry;
  let unsRegistryMock: UNSRegistryMock;

  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    owner: SignerWithAddress,
    reader: SignerWithAddress,
    receiver: SignerWithAddress,
    sender: SignerWithAddress,
    accounts: string[];

  let latestBlockTimestamp: number;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner, reader, receiver, sender] = signers;
    [, ...accounts] = signers.map((s) => s.address);

    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();

    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistry.mintTLD(TLD.crypto.hash, 'crypto');
    await unsRegistry.setTokenURIPrefix('/');
    await unsRegistry.addProxyReader(reader.address);

    // mock
    unsRegistryMock = await new UNSRegistryMock__factory(coinbase).deploy();
    await unsRegistryMock.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistryMock.mintTLD(TLD.crypto.hash, 'crypto');
    await unsRegistryMock.setTokenURIPrefix('/');
    await unsRegistryMock.addProxyReader(reader.address);
  });

  beforeEach(async () => {
    latestBlockTimestamp = await getLatestBlockTimestamp();
  });

  describe('General', () => {
    it('should return zero root', async () => {
      expect(await unsRegistry.root()).to.be.equal(0);
    });

    it('should resolve properly', async () => {
      const tokenId = await mintDomain({ unsRegistry, owner: coinbase.address, labels: ['resolution', 'crypto'] });
      expect(await unsRegistry.resolverOf(tokenId)).to.be.equal(await unsRegistry.getAddress());

      await unsRegistry.burn(tokenId);
      expect(await unsRegistry.resolverOf(tokenId)).to.be.equal(ZERO_ADDRESS);

      await mintDomain({ unsRegistry, owner: coinbase.address, labels: ['resolution', 'crypto'] });
      expect(await unsRegistry.resolverOf(tokenId)).to.be.equal(await unsRegistry.getAddress());
    });

    it('should set URI prefix', async () => {
      expect(await unsRegistry.tokenURI(TLD.crypto.hash)).to.be.equal(`/${TLD.crypto.hash}`);

      await unsRegistry.setTokenURIPrefix('prefix-');
      expect(await unsRegistry.tokenURI(TLD.crypto.hash)).to.be.equal(`prefix-${TLD.crypto.hash}`);

      await unsRegistry.setTokenURIPrefix('/');
      expect(await unsRegistry.tokenURI(TLD.crypto.hash)).to.be.equal(`/${TLD.crypto.hash}`);
    });

    for (const key in TLD) {
      it(`should be possible to mint .${key} domain`, async () => {
        const expiry = getExpirableTlds().includes(key) ? latestBlockTimestamp + 60 * 60 * 24 : 0;

        const tokenId = await mintDomain({
          unsRegistry,
          owner: coinbase.address,
          labels: [`mint-${key}`],
          expiry,
        });
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      });
    }

    describe('namehash', () => {
      it('should return valid namehash', async () => {
        const tokenId = await unsRegistry.namehash(['12ew3', 'crypto']);
        expect(tokenId).to.be.equal(namehash('12ew3.crypto'));
      });

      it('should revert when childId lable is empty', async () => {
        await expect(unsRegistry.namehash(['', 'crypto'])).to.be.revertedWith('Registry: LABEL_EMPTY');
      });
    });

    describe('exists', () => {
      it('should return true when token exists', async () => {
        const tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase.address, tld: 'crypto' });
        expect(await unsRegistry.exists(tokenId)).to.be.equal(true);
      });

      it('should return false when token exists', async () => {
        const tok = await unsRegistry.namehash(['token_doesnt_exists_1094u', 'crypto']);
        expect(await unsRegistry.exists(tok)).to.be.equal(false);
      });

      it('should return true with expirable token', async () => {
        const tokenId = await mintRandomDomain({
          unsRegistry,
          owner: coinbase.address,
          tld: 'com',
          expiry: latestBlockTimestamp + 60 * 60 * 24,
        });

        expect(await unsRegistry.exists(tokenId)).to.be.equal(true);
      });

      it('should return true with expired token', async () => {
        const expiry = latestBlockTimestamp + 60 * 60 * 24;

        const tokenId = await mintRandomDomain({
          unsRegistry,
          owner: coinbase.address,
          tld: 'com',
          expiry,
        });

        await increaseTimeBy(60 * 60 * 24);

        expect(await unsRegistry.isExpired(tokenId)).to.be.equal(true);
        expect(await unsRegistry.exists(tokenId)).to.be.equal(true);
      });
    });

    describe('ownerOf', async () => {
      it('should return owner of the token', async () => {
        const tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase.address, tld: 'crypto' });

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      });

      it('should return owner of expirable token', async () => {
        const expiry = latestBlockTimestamp + 60 * 60 * 24;
        const tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase.address, tld: 'crypto', expiry });
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      });

      it('should return zero address if token is expired', async () => {
        const expiry = latestBlockTimestamp + 60 * 60 * 24;
        const tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase.address, tld: 'com', expiry });

        await increaseTimeBy(60 * 60 * 24);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(ZERO_ADDRESS);
      });
    });

    describe('supportsInterface', () => {
      it('should support IERC165Upgradeable interface', async () => {
        expect(await unsRegistry.supportsInterface('0x01ffc9a7')).to.be.equal(true);
      });

      it('should support IERC721Upgradeable interface', async () => {
        expect(await unsRegistry.supportsInterface('0x80ac58cd')).to.be.equal(true);
      });

      it('should support IERC721MetadataUpgradeable interface', async () => {
        expect(await unsRegistry.supportsInterface('0x5b5e139f')).to.be.equal(true);
      });

      it('should not support random interface', async () => {
        expect(await unsRegistry.supportsInterface('0x01010101')).to.be.equal(false);
      });
    });

    it('should have right metadata', async () => {
      expect(await unsRegistry.name()).to.be.eql('Unstoppable Domains');
      expect(await unsRegistry.symbol()).to.be.eql('UD');
    });

    describe('burn', () => {
      let tokenId: bigint;

      beforeEach(async () => {
        tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase.address, tld: 'crypto' });
      });

      it('should burn the domain', async () => {
        expect(await unsRegistry.exists(tokenId)).to.be.equal(true);

        await unsRegistry.burn(tokenId);

        expect(await unsRegistry.exists(tokenId)).to.be.equal(false);
      });

      it('should revert with expirable token', async () => {
        const expiry = latestBlockTimestamp + 60 * 60 * 24;
        const tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase.address, tld: 'com', expiry });

        await expect(unsRegistry.burn(tokenId)).to.be.revertedWith('Registry: TOKEN_EXPIRABLE');
      });

      it('should reset records on burn', async () => {
        const tokenId = await mintDomain({
          unsRegistry,
          owner: coinbase.address,
          labels: ['token-to-burn', 'crypto'],
        });
        await unsRegistry.set('key_31', 'value_23', tokenId);
        expect(await unsRegistry.get('key_31', tokenId)).to.be.equal('value_23');

        await expect(unsRegistry.burn(tokenId)).to.emit(unsRegistry, 'ResetRecords').withArgs(tokenId);
        expect(await unsRegistry.get('key_31', tokenId)).to.be.equal('');

        await mintDomain({ unsRegistry, owner: coinbase.address, labels: ['token-to-burn', 'crypto'] });
        expect(await unsRegistry.get('key_31', tokenId)).to.be.equal('');
      });

      it('should revert if tokenId is upgraded', async () => {
        tokenId = await mintRandomDomain({ unsRegistry: unsRegistryMock, owner: coinbase.address, tld: 'crypto' });
        await unsRegistryMock.upgradeAll([tokenId]);

        await expect(unsRegistryMock.burn(tokenId)).to.be.revertedWith('Registry: TOKEN_UPGRADED');
      });

      it('should revert with expired token', async () => {
        const expiry = latestBlockTimestamp + 60 * 60 * 24;
        const tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase.address, tld: 'com', expiry });

        await increaseTimeBy(60 * 60 * 24);

        await expect(unsRegistry.burn(tokenId)).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('should revert if not owner', async () => {
        await expect(unsRegistry.connect(signers[1]).burn(tokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });
    });
  });

  describe('Registry (minting)', () => {
    describe('mintWithRecords(address,string[],string[],string[],bool)', async () => {
      it('should mint domain with no records', async () => {
        const tokenId = await mintDomain({ unsRegistry, owner: coinbase, labels: ['label_12324_2', 'crypto'] });
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      });

      it('should mint domain with record', async () => {
        const tokenId = await mintDomain({
          unsRegistry,
          owner: coinbase,
          labels: ['label_38f6', 'crypto'],
          withoutReverse: false,
          keys: ['key_1'],
          values: ['value_1'],
        });

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.get('key_1', tokenId)).to.be.eql('value_1');
      });

      it('should mint subdomain', async () => {
        const labels = ['label_38g', 'crypto'];
        await mintDomain({ unsRegistry, owner: coinbase.address, labels: labels });

        labels.unshift('sub');
        const tokenId = await mintDomain({ unsRegistry, owner: coinbase.address, labels });

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      });

      it('should produce NewURI event', async () => {
        const labels = ['label_38f7', 'crypto'];
        const tokenId = await unsRegistry.namehash(labels);

        await expect(
          unsRegistry['mintWithRecords(address,string[],string[],string[],bool)'](
            coinbase.address,
            labels,
            ['key1'],
            ['42'],
            true,
          ),
        )
          .to.emit(unsRegistry, 'NewURI')
          .withArgs(tokenId, 'label_38f7.crypto');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      });

      it('should revert re-minting an expired domain', async () => {
        const labels = ['label_38f8', 'com'];
        const expiry = latestBlockTimestamp + 60 * 60 * 24;

        const tokenId = await mintDomain({
          unsRegistry,
          owner: owner.address,
          labels,
          expiry,
        });

        await increaseTimeBy(60 * 60 * 24);

        expect(await unsRegistry.isExpired(tokenId)).to.be.eq(true);

        await expect(unsRegistry.mintWithRecords(receiver.address, labels, [], [], true)).to.be.revertedWith(
          'ERC721: token already minted',
        );
      });

      it('should not allow minting subdomain if not minting manager', async () => {
        const labels = ['label_38qwe', 'crypto'];
        await mintDomain({ unsRegistry, owner, labels });

        labels.unshift('sub');
        const _registry = unsRegistry.connect(owner);
        await expect(mintDomain({ unsRegistry: _registry, owner, labels })).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_MINTING_MANAGER',
        );
      });

      it('should not allow minting subdomain if parent token is upgraded', async () => {
        const labels = ['label_38qwex', 'crypto'];
        const parentTokenId = await mintDomain({ unsRegistry: unsRegistryMock, owner, labels });

        await unsRegistryMock.connect(coinbase).upgradeAll([parentTokenId]);

        labels.unshift('sub');

        await expect(
          mintDomain({
            unsRegistry: unsRegistryMock,
            owner,
            labels,
          }),
        ).to.be.revertedWith('Registry: TOKEN_UPGRADED');
      });
    });

    describe('unlock(address,uint256)', async () => {
      it('should properly unlock domain resetting records', async () => {
        const labels = ['label_12324_unlock', 'crypto'];
        const tokenId = await mintDomain({
          labels,
          unsRegistry,
          owner: coinbase.address,
          keys: ['key'],
          values: ['value'],
        });

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.get('key', tokenId)).to.be.equal('value');

        await unsRegistry.connect(coinbase).unlock(receiver.address, tokenId);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
        expect(await unsRegistry.get('key', tokenId)).to.be.equal('');
      });

      it('should properly unlock expirable domain', async () => {
        const labels = ['label_12324_unlock', 'com'];
        const expiry = latestBlockTimestamp + 60 * 60 * 24;
        const tokenId = await mintDomain({
          labels,
          unsRegistry,
          owner: coinbase.address,
          keys: ['key'],
          values: ['value'],
          expiry,
        });

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.get('key', tokenId)).to.be.equal('value');
        expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(expiry);

        await unsRegistry.connect(coinbase).unlock(receiver.address, tokenId);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
        expect(await unsRegistry.get('key', tokenId)).to.be.equal('');
      });

      it('should fail if token is not minted', async () => {
        const tokenId = await unsRegistry.namehash(['label_12325_unlock_fail', 'crypto']);
        await expect(unsRegistry.unlock(receiver.address, tokenId)).to.be.revertedWith('ERC721: invalid token ID');
      });

      it('should fail if called by non-allowed address', async () => {
        const labels = ['label_12325_unlock_fail', 'com'];
        const expiry = latestBlockTimestamp + 60 * 60 * 24;

        const tokenId = await mintDomain({
          labels,
          unsRegistry,
          owner: coinbase.address,
          keys: ['key'],
          values: ['value'],
          expiry,
        });

        await expect(unsRegistry.connect(receiver).unlock(receiver.address, tokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_MINTING_MANAGER',
        );
      });
    });

    describe('unlockWithRecords(address,string[],string[],string[],bool)', async () => {
      it('should properly unlock domain and set new records without reverse', async () => {
        const labels = ['label_12324_unlock2', 'crypto'];
        const tokenId = await mintDomain({
          unsRegistry,
          owner: coinbase,
          labels,
          withoutReverse: true,
          keys: ['key'],
          values: ['value'],
        });

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.get('key', tokenId)).to.be.equal('value');

        await unsRegistry
          .connect(coinbase)
          ['unlockWithRecords(address,string[],string[],string[],bool)'](
            receiver.address,
            labels,
            ['new-key'],
            ['new-value'],
            false,
          );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
        expect(await unsRegistry.get('new-key', tokenId)).to.be.equal('new-value');
        expect(await unsRegistry.reverseOf(receiver.address)).to.be.equal(0);
      });

      it('should properly unlock domain and set new records with reverse', async () => {
        const labels = ['label_12324_unlock3', 'crypto'];
        const tokenId = await mintDomain({
          unsRegistry,
          owner: coinbase,
          labels,
          withoutReverse: false,
          keys: ['key'],
          values: ['value'],
        });

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.get('key', tokenId)).to.be.equal('value');

        await unsRegistry
          .connect(coinbase)
          ['unlockWithRecords(address,string[],string[],string[],bool)'](
            receiver.address,
            labels,
            ['new-key'],
            ['new-value'],
            true,
          );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
        expect(await unsRegistry.get('new-key', tokenId)).to.be.equal('new-value');
        expect(await unsRegistry.reverseOf(receiver.address)).to.be.equal(tokenId);
      });

      it('should unlock expired domain to new owner, set records and reverse', async () => {
        const labels = ['label_38f01', 'com'];
        const expiry = latestBlockTimestamp + 60 * 60 * 24;

        const initialOwnerBalance = await unsRegistry.balanceOf(owner.address);

        const tokenId = await mintDomain({
          unsRegistry,
          owner: owner.address,
          labels,
          expiry,
        });

        await increaseTimeBy(60 * 60 * 24);

        expect(await unsRegistry.isExpired(tokenId)).to.be.eq(true);
        expect((await unsRegistry.balanceOf(owner.address)) - initialOwnerBalance).to.be.eq(1);

        const newExpiry = expiry + 60 * 60 * 24;
        const initialReceiverBalance = await unsRegistry.balanceOf(receiver.address);

        // MintingManager call
        await unsRegistry.setExpiry(newExpiry, tokenId);
        await unsRegistry.connect(receiver).removeReverse();

        await expect(unsRegistry.unlockWithRecords(receiver.address, labels, ['key1'], ['42'], true))
          .to.emit(unsRegistry, 'Transfer')
          .withArgs(owner.address, receiver.address, tokenId);

        expect(await unsRegistry.balanceOf(owner.address)).to.be.eq(initialOwnerBalance);
        expect((await unsRegistry.balanceOf(receiver.address)) - initialReceiverBalance).to.be.eq(1);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(receiver.address);
        expect(await unsRegistry.expiryOf(tokenId)).to.eq(newExpiry);
        expect(await unsRegistry.get('key1', tokenId)).to.eq('42');
        expect(await unsRegistry.reverseOf(receiver.address)).to.eq(tokenId);
      });

      it('should fail if called by non-allowed address', async () => {
        const labels = ['label_12324_unlock_fail', 'crypto'];
        await mintDomain({
          unsRegistry,
          owner: coinbase,
          labels,
          withoutReverse: false,
          keys: ['key'],
          values: ['value'],
        });
        await expect(
          unsRegistry
            .connect(receiver)
            ['unlockWithRecords(address,string[],string[],string[],bool)'](
              receiver.address,
              labels,
              ['new-key'],
              ['new-value'],
              true,
            ),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_MINTING_MANAGER');
      });
    });
  });

  describe('Registry (ownership management)', () => {
    let tokenId: bigint;
    let expirableTokenId: bigint;

    beforeEach(async () => {
      tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase.address, tld: 'crypto' });
      expirableTokenId = await mintRandomDomain({
        unsRegistry,
        owner: coinbase.address,
        tld: 'com',
        expiry: latestBlockTimestamp + 60 * 60 * 24,
      });
    });

    describe('setOwner', () => {
      it('sets owner correctly', async () => {
        await expect(unsRegistry.setOwner(owner.address, tokenId))
          .to.emit(unsRegistry, 'Transfer')
          .withArgs(coinbase.address, owner.address, tokenId);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('sets owner correctly for expirable token', async () => {
        await expect(unsRegistry.setOwner(owner.address, expirableTokenId))
          .to.emit(unsRegistry, 'Transfer')
          .withArgs(coinbase.address, owner.address, expirableTokenId);

        expect(await unsRegistry.ownerOf(expirableTokenId)).to.be.equal(owner.address);
      });

      it('reverts if token is expired', async () => {
        await increaseTimeBy(60 * 60 * 24);

        await expect(unsRegistry.setOwner(owner.address, expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('reverts if expired and sender is approved', async () => {
        await unsRegistry.approve(sender.address, expirableTokenId);

        await increaseTimeBy(60 * 60 * 24);

        await expect(unsRegistry.connect(sender).setOwner(owner.address, expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('reverts if expired and sender is approvedForAll', async () => {
        await unsRegistry.setApprovalForAll(sender.address, true);

        await increaseTimeBy(60 * 60 * 24);

        await expect(unsRegistry.connect(sender).setOwner(owner.address, expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('reverts if not owner', async () => {
        await expect(unsRegistry.connect(signers[1]).setOwner(owner.address, tokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('sets owner correctly even if token is upgraded', async () => {
        tokenId = await mintRandomDomain({ unsRegistry: unsRegistryMock, owner: coinbase.address, tld: 'crypto' });
        await unsRegistryMock.upgradeAll([tokenId]);

        await unsRegistryMock.setOwner(owner.address, tokenId);

        expect(await unsRegistryMock.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('produces ERC721 error when transfering upgraded token to zero address', async () => {
        tokenId = await mintRandomDomain({ unsRegistry: unsRegistryMock, owner: coinbase.address, tld: 'crypto' });
        await unsRegistryMock.upgradeAll([tokenId]);

        await expect(unsRegistryMock.setOwner(ZERO_ADDRESS, tokenId)).to.be.revertedWith(
          'ERC721: transfer to the zero address',
        );
      });

      it('should not reset records on set owner', async () => {
        await unsRegistry.set('key_16', 'value_23', tokenId);
        expect(await unsRegistry.get('key_16', tokenId)).to.be.equal('value_23');

        await expect(unsRegistry.setOwner(owner.address, tokenId)).to.not.emit(unsRegistry, 'ResetRecords');
        expect(await unsRegistry.get('key_16', tokenId)).to.be.equal('value_23');
      });
    });

    describe('transferFrom', () => {
      it('transfers domain correctly', async () => {
        await unsRegistry.transferFrom(coinbase.address, owner.address, tokenId);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('transfers expirable token correctly', async () => {
        await unsRegistry.transferFrom(coinbase.address, owner.address, expirableTokenId);

        expect(await unsRegistry.ownerOf(expirableTokenId)).to.be.equal(owner.address);
      });

      it('reverts if token is expired', async () => {
        await increaseTimeBy(60 * 60 * 24);

        await expect(unsRegistry.transferFrom(coinbase.address, owner.address, expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('reverts if expired and sender is approved', async () => {
        await unsRegistry.approve(sender.address, expirableTokenId);

        await increaseTimeBy(60 * 60 * 24);

        await expect(
          unsRegistry.connect(sender).transferFrom(coinbase.address, owner.address, expirableTokenId),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('reverts if expired and sender is approvedForAll', async () => {
        await unsRegistry.setApprovalForAll(sender.address, true);

        await increaseTimeBy(60 * 60 * 24);

        await expect(
          unsRegistry.connect(sender).transferFrom(coinbase.address, owner.address, expirableTokenId),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('reverts if not owner', async () => {
        await expect(
          unsRegistry.connect(signers[1]).transferFrom(coinbase.address, owner.address, tokenId),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('transfers domain correctly even if token is upgraded', async () => {
        tokenId = await mintRandomDomain({ unsRegistry: unsRegistryMock, owner: coinbase.address, tld: 'crypto' });
        await unsRegistryMock.upgradeAll([tokenId]);

        await unsRegistryMock.transferFrom(coinbase.address, owner.address, tokenId);

        expect(await unsRegistryMock.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('should reset records on transfer', async () => {
        await unsRegistry.set('key_23', 'value_23', tokenId);
        expect(await unsRegistry.get('key_23', tokenId)).to.be.equal('value_23');

        await expect(unsRegistry.transferFrom(coinbase.address, accounts[0], tokenId))
          .to.emit(unsRegistry, 'ResetRecords')
          .withArgs(tokenId);

        expect(await unsRegistry.get('key_23', tokenId)).to.be.equal('');
      });
    });

    describe('safeTransferFrom(address,address,uint256)', () => {
      const selector = 'safeTransferFrom(address,address,uint256)';

      it('transfers domain correctly', async () => {
        await unsRegistry[selector](coinbase.address, owner.address, tokenId);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('transfers expirable domain correctly', async () => {
        await unsRegistry[selector](coinbase.address, owner.address, expirableTokenId);

        expect(await unsRegistry.ownerOf(expirableTokenId)).to.be.equal(owner.address);
      });

      it('reverts if token is expired', async () => {
        await increaseTimeBy(60 * 60 * 24);

        await expect(unsRegistry[selector](coinbase.address, owner.address, expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('reverts if token is expired and sender is approved', async () => {
        await unsRegistry.approve(sender.address, expirableTokenId);
        await increaseTimeBy(60 * 60 * 24);

        await expect(
          unsRegistry.connect(sender)[selector](coinbase.address, owner.address, expirableTokenId),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('reverts if token is expired and sender is approvedForAll', async () => {
        await unsRegistry.setApprovalForAll(sender.address, true);
        await increaseTimeBy(60 * 60 * 24);

        await expect(
          unsRegistry.connect(sender)[selector](coinbase.address, owner.address, expirableTokenId),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('reverts if not owner', async () => {
        await expect(
          unsRegistry.connect(signers[1])[selector](coinbase.address, owner.address, tokenId),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('transfers domain correctly even if token is upgraded', async () => {
        tokenId = await mintRandomDomain({ unsRegistry: unsRegistryMock, owner: coinbase.address, tld: 'crypto' });
        await unsRegistryMock.upgradeAll([tokenId]);

        await unsRegistryMock[selector](coinbase.address, owner.address, tokenId);

        expect(await unsRegistryMock.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('should reset records on safe transfer', async () => {
        await unsRegistry.set('key_12', 'value_23', tokenId);
        expect(await unsRegistry.get('key_12', tokenId)).to.be.equal('value_23');

        await expect(unsRegistry[selector](coinbase.address, accounts[0], tokenId))
          .to.emit(unsRegistry, 'ResetRecords')
          .withArgs(tokenId);

        expect(await unsRegistry.get('key_12', tokenId)).to.be.equal('');
      });
    });

    describe('safeTransferFrom(address,address,uint256,bytes)', () => {
      const selector = 'safeTransferFrom(address,address,uint256,bytes)';

      it('transfers domain correctly', async () => {
        await unsRegistry[selector](coinbase.address, owner.address, tokenId, '0x');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('transfers expirable domain correctly', async () => {
        await unsRegistry[selector](coinbase.address, owner.address, expirableTokenId, '0x');
        expect(await unsRegistry.ownerOf(expirableTokenId)).to.be.equal(owner.address);
      });

      it('reverts if domain is expired', async () => {
        await increaseTimeBy(60 * 60 * 24);

        await expect(
          unsRegistry[selector](coinbase.address, owner.address, expirableTokenId, '0x'),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('reverts if domain is expired and sender is approved', async () => {
        await unsRegistry.approve(sender.address, expirableTokenId);
        await increaseTimeBy(60 * 60 * 24);

        await expect(
          unsRegistry.connect(sender)[selector](coinbase.address, owner.address, expirableTokenId, '0x'),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('reverts if domain is expired and sender is approvedForAll', async () => {
        await unsRegistry.setApprovalForAll(sender.address, true);
        await increaseTimeBy(60 * 60 * 24);

        await expect(
          unsRegistry.connect(sender)[selector](coinbase.address, owner.address, expirableTokenId, '0x'),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('reverts if not owner', async () => {
        await expect(
          unsRegistry.connect(signers[1])[selector](coinbase.address, owner.address, tokenId, '0x'),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('transfers domain correctly even if token is upgraded', async () => {
        tokenId = await mintRandomDomain({ unsRegistry: unsRegistryMock, owner: coinbase.address, tld: 'crypto' });
        await unsRegistryMock.upgradeAll([tokenId]);

        await unsRegistryMock[selector](coinbase.address, owner.address, tokenId, '0x');

        expect(await unsRegistryMock.ownerOf(tokenId)).to.be.equal(owner.address);
      });

      it('should reset records on safe transfer with data', async () => {
        await unsRegistry.set('key_12', 'value_23', tokenId);
        expect(await unsRegistry.get('key_12', tokenId)).to.be.equal('value_23');

        await expect(unsRegistry[selector](coinbase.address, accounts[0], tokenId, '0x'))
          .to.emit(unsRegistry, 'ResetRecords')
          .withArgs(tokenId);
        expect(await unsRegistry.get('key_12', tokenId)).to.be.equal('');
      });
    });
  });

  describe('Registry (records management)', () => {
    const initializeKey = async (key: string) => {
      await unsRegistry.addKey(key);
      return BigInt(id(key));
    };

    let tokenId: bigint;
    let expirableTokenId: bigint;

    beforeEach(async () => {
      tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase.address, tld: 'crypto' });
      expirableTokenId = await mintRandomDomain({
        unsRegistry,
        owner: coinbase.address,
        tld: 'com',
        expiry: latestBlockTimestamp + 60 * 60 * 24,
      });
    });

    describe('set & get', () => {
      it('should be able to set and resolve record', async () => {
        await unsRegistry.set('key', 'value', tokenId);

        expect(await unsRegistry.get('key', tokenId)).to.be.equal('value');
      });

      it('should be able to set and resolve record with expirable token', async () => {
        await unsRegistry.set('key', 'value', expirableTokenId);

        expect(await unsRegistry.get('key', expirableTokenId)).to.be.equal('value');
      });

      it('should return empty value if token is upgraded and is being read from proxy reader', async () => {
        tokenId = await mintRandomDomain({ unsRegistry: unsRegistryMock, owner: coinbase.address, tld: 'crypto' });
        await unsRegistryMock.upgradeAll([tokenId]);

        await unsRegistryMock.set('key', 'value', tokenId);

        expect(await unsRegistryMock.connect(reader).get('key', tokenId)).to.equal('');
        expect(await unsRegistryMock.connect(coinbase).get('key', tokenId)).to.equal('value');
      });

      it('should fail if not owner', async () => {
        tokenId = await mintRandomDomain({ unsRegistry: unsRegistryMock, owner: coinbase.address, tld: 'crypto' });
        await expect(unsRegistryMock.connect(signers[1]).set('key', 'value', tokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('should fail if token is expired', async () => {
        await increaseTimeBy(60 * 60 * 24);
        await expect(unsRegistry.set('key', 'value', expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('should fail if token is expired and sender is approved', async () => {
        await unsRegistry.approve(sender.address, expirableTokenId);

        await increaseTimeBy(60 * 60 * 24);

        await expect(unsRegistry.connect(sender).set('key', 'value', expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('should fail if token is expired and sender is approvedForAll', async () => {
        await unsRegistry.setApprovalForAll(sender.address, true);

        await increaseTimeBy(60 * 60 * 24);

        await expect(unsRegistry.connect(sender).set('key', 'value', expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('should fail if token is not minted', async () => {
        const tokenId = await unsRegistry.namehash(['some_invalid_label', 'crypto']);

        await expect(unsRegistry.set('key', 'value', tokenId)).to.be.revertedWith('ERC721: invalid token ID');
      });

      it('should emit NewKey event new keys added', async () => {
        const key = 'new-key';
        const value = 'value';

        await expect(unsRegistry.set(key, value, tokenId)).to.emit(unsRegistry, 'NewKey').withArgs(tokenId, key, key);

        await expect(unsRegistry.set(key, value, tokenId)).not.to.emit(unsRegistry, 'NewKey');
      });

      it('should emit correct Set event', async () => {
        const key = 'new-key';
        const value = 'value';

        await expect(unsRegistry.set(key, value, tokenId))
          .to.emit(unsRegistry, 'Set')
          .withArgs(tokenId, key, value, key, value);
      });
    });

    describe('setMany & getMany', () => {
      it('should be able to set records multiple times and resolve them', async () => {
        await unsRegistry.setMany(['key1'], ['value1'], tokenId);
        await unsRegistry.setMany(['key2', 'key3'], ['value2', 'value3'], tokenId);
        await unsRegistry.setMany(['key4', 'key5', 'key6'], ['value4', 'value5', 'value6'], tokenId);
        expect(await unsRegistry.getMany(['key1', 'key2', 'key3', 'key4', 'key5', 'key6'], tokenId)).to.be.eql([
          'value1',
          'value2',
          'value3',
          'value4',
          'value5',
          'value6',
        ]);
      });

      it('should be able to set multiple records and resolve them with expirable token', async () => {
        await unsRegistry.setMany(['key1'], ['value1'], expirableTokenId);
        await unsRegistry.setMany(['key2', 'key3'], ['value2', 'value3'], expirableTokenId);
        await unsRegistry.setMany(['key1', 'key2', 'key3'], ['value1', 'value2', 'value3'], expirableTokenId);

        expect(await unsRegistry.getMany(['key1', 'key2', 'key3'], expirableTokenId)).to.be.eql([
          'value1',
          'value2',
          'value3',
        ]);
      });

      it('should return empty values if token is upgraded and is being read from proxy reader', async () => {
        tokenId = await mintRandomDomain({ unsRegistry: unsRegistryMock, owner: coinbase.address, tld: 'crypto' });
        await unsRegistryMock.upgradeAll([tokenId]);

        await unsRegistryMock.setMany(['key1', 'key2'], ['value1', 'value2'], tokenId);

        expect(await unsRegistryMock.connect(reader).getMany(['key1', 'key2'], tokenId)).to.deep.equal(['', '']);

        expect(await unsRegistryMock.connect(coinbase).getMany(['key1', 'key2'], tokenId)).to.deep.equal([
          'value1',
          'value2',
        ]);
      });

      it('should fail on setMany if not owner', async () => {
        await expect(unsRegistry.connect(signers[1]).setMany(['key'], ['value'], tokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );

        expect(await unsRegistry.connect(signers[1]).getMany(['key'], tokenId)).to.be.deep.equal(['']);
      });

      it('should be able to only read when token is expired', async () => {
        await unsRegistry.setMany(['key1'], ['value1'], expirableTokenId);

        await increaseTimeBy(60 * 60 * 24);

        await expect(unsRegistry.setMany(['key'], ['value'], expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );

        await unsRegistry.approve(sender.address, expirableTokenId);

        await expect(unsRegistry.connect(sender).setMany(['key'], ['value'], expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );

        expect(await unsRegistry.getMany(['key1'], expirableTokenId)).to.be.deep.equal(['value1']);
      });
    });

    describe('reset', () => {
      it('should reset all records', async () => {
        await unsRegistry.setMany(['key1', 'key2'], ['value1', 'value2'], tokenId);

        await expect(unsRegistry.reset(tokenId)).to.emit(unsRegistry, 'ResetRecords').withArgs(tokenId.toString());

        expect(await unsRegistry.getMany(['key1', 'key2'], tokenId)).to.deep.equal(['', '']);
      });

      it('should reset all records with expirable token', async () => {
        await unsRegistry.setMany(['key1', 'key2'], ['value1', 'value2'], expirableTokenId);

        await unsRegistry.reset(expirableTokenId);

        expect(await unsRegistry.getMany(['key1', 'key2'], expirableTokenId)).to.deep.equal(['', '']);
      });

      it('should fail if not owner', async () => {
        await unsRegistry.setMany(['key1', 'key2'], ['value1', 'value2'], tokenId);

        await expect(unsRegistry.connect(signers[1]).reset(tokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );

        expect(await unsRegistry.getMany(['key1', 'key2'], tokenId)).to.deep.equal(['value1', 'value2']);
      });

      it('should fail with expired token', async () => {
        await increaseTimeBy(60 * 60 * 24);

        await expect(unsRegistry.reset(expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('should fail with expired token and sender is approved', async () => {
        await unsRegistry.approve(sender.address, expirableTokenId);

        await increaseTimeBy(60 * 60 * 24);

        await expect(unsRegistry.connect(sender).reset(expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('should fail with expired token and sender is approvedForAll', async () => {
        await unsRegistry.setApprovalForAll(sender.address, true);

        await increaseTimeBy(60 * 60 * 24);

        await expect(unsRegistry.connect(sender).reset(expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });
    });

    describe('geyKey & getKeys', () => {
      it('should get key by hash', async () => {
        const expectedKey = 'new-hashed-key';
        await unsRegistry.set(expectedKey, 'value', tokenId);

        const keyFromHash = await unsRegistry.getKey(BigInt(id(expectedKey)));
        expect(keyFromHash).to.be.equal(expectedKey);
      });

      it('should get key by hash for expirable token', async () => {
        const expectedKey = 'new-hashed-key';
        await unsRegistry.set(expectedKey, 'value', expirableTokenId);

        const keyFromHash = await unsRegistry.getKey(BigInt(id(expectedKey)));
        expect(keyFromHash).to.be.equal(expectedKey);
      });

      it('should get key by hash for expired tokens', async () => {
        const expectedKey = 'new-hash-key';
        await unsRegistry.set(expectedKey, 'value', tokenId);

        await increaseTimeBy(60 * 60 * 24);

        const keyHash = BigInt(id(expectedKey));

        expect(await unsRegistry.getKey(keyHash)).to.be.equal(expectedKey);
        expect(await unsRegistry.getKeys([keyHash])).to.be.eql([expectedKey]);
      });

      it('should get many keys by hashes', async () => {
        const expectedKeys = ['keyhash-many-1', 'keyhash-many-2'];
        await unsRegistry.setMany(expectedKeys, ['value', 'value'], tokenId);

        const expectedKeyHashes = expectedKeys.map((key) => BigInt(id(key)));
        const keysFromHashes = await unsRegistry.getKeys(expectedKeyHashes);
        expect(keysFromHashes).to.be.eql(expectedKeys);
      });
    });

    describe('reconfigure', () => {
      it('should reconfigure resolver with new values', async () => {
        await unsRegistry.set('old-key', 'old-value', tokenId);
        await unsRegistry.reconfigure(['new-key'], ['new-value'], tokenId);

        expect(await unsRegistry.get('old-key', tokenId)).to.be.equal('');
        expect(await unsRegistry.get('new-key', tokenId)).to.be.eql('new-value');
      });

      it('should fail when trying to reconfigure non-owned domain', async () => {
        await expect(
          unsRegistry.connect(signers[1]).reconfigure(['new-key'], ['new-value'], tokenId),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('should fail when trying to reconfigure expired domain', async () => {
        await increaseTimeBy(60 * 60 * 24);

        await expect(unsRegistry.reconfigure(['new-key'], ['new-value'], expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
      });

      it('should fail when trying to reconfigure expired domain and sender is approved', async () => {
        await unsRegistry.approve(sender.address, expirableTokenId);

        await increaseTimeBy(60 * 60 * 24);

        await expect(
          unsRegistry.connect(sender).reconfigure(['new-key'], ['new-value'], expirableTokenId),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('should fail when trying to reconfigure expired domain and sender is approvedForAll', async () => {
        await unsRegistry.setApprovalForAll(sender.address, true);

        await increaseTimeBy(60 * 60 * 24);

        await expect(
          unsRegistry.connect(sender).reconfigure(['new-key'], ['new-value'], expirableTokenId),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });
    });

    describe('record operations by hashes', async () => {
      it('should get value by key hash', async () => {
        const key = 'get-key-by-hash-key';
        const expectedValue = 'get-key-by-hash-value';
        await unsRegistry.set(key, expectedValue, tokenId);

        const result = await unsRegistry.getByHash(id(key), tokenId);
        expect(result.value).to.be.equal(expectedValue);
        expect(result.key).to.be.equal(key);
      });

      it('should get values by key hashes with expirable token', async () => {
        const key = 'get-key-by-hash-key';
        const value = 'get-key-by-hash-value';
        await unsRegistry.set(key, value, expirableTokenId);

        const result = await unsRegistry.getByHash(id(key), expirableTokenId);
        expect(result.key).to.be.equal(key);
        expect(result.value).to.be.equal(value);

        expect(await unsRegistry.getManyByHash([id(key)], expirableTokenId)).to.be.eql([[key], [value]]);
      });

      it('should return empty value by keyhash if reader is ProxyReader and token is upgraded', async () => {
        const key = 'get-key-by-hash-key';
        const value = 'get-key-by-hash-value';

        tokenId = await mintRandomDomain({ unsRegistry: unsRegistryMock, owner: coinbase.address, tld: 'crypto' });
        await unsRegistryMock.set(key, value, tokenId);
        await unsRegistryMock.upgradeAll([tokenId]);

        expect((await unsRegistryMock.connect(reader).getByHash(id(key), tokenId)).value).to.be.equal('');

        expect((await unsRegistryMock.connect(coinbase).getByHash(id(key), tokenId)).value).to.be.equal(value);
      });

      it('should revert setting new values by key hashes with expired token', async () => {
        const key = 'get-key-by-hash-key';
        const value = 'get-key-by-hash-value';

        await unsRegistry.set(key, value, expirableTokenId);

        await increaseTimeBy(60 * 60 * 24);

        expect(await unsRegistry.getByHash(id(key), expirableTokenId)).to.be.eql([key, value]);

        expect(await unsRegistry.getManyByHash([id(key)], expirableTokenId)).to.be.eql([[key], [value]]);

        await expect(unsRegistry.setByHash(id(key), 'new-value', expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );
        await expect(unsRegistry.setManyByHash([id(key)], ['new-value'], expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );

        await unsRegistry.approve(sender.address, expirableTokenId);

        await expect(unsRegistry.connect(sender).setByHash(id(key), 'new-value', expirableTokenId)).to.be.revertedWith(
          'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER',
        );

        await unsRegistry.setApprovalForAll(sender.address, true);

        await expect(
          unsRegistry.connect(sender).setManyByHash([id(key)], ['new-value'], expirableTokenId),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('should get multiple values by hashes', async () => {
        const keys = ['key-to-hash-1', 'key-to-hash-2'];
        const expectedValues = ['value-42', 'value-43'];
        await unsRegistry.setMany(keys, expectedValues, tokenId);

        const hashedKeys = keys.map((key) => BigInt(id(key)));
        const result = await unsRegistry.getManyByHash(hashedKeys, tokenId);
        expect(result).to.be.eql([keys, expectedValues]);
      });

      it('should return empty values by keyhashes if reader is ProxyReader and token is upgraded', async () => {
        const keys = ['key-to-hash-1', 'key-to-hash-2'];
        const values = ['value-42', 'value-43'];

        tokenId = await mintRandomDomain({ unsRegistry: unsRegistryMock, owner: coinbase.address, tld: 'crypto' });
        await unsRegistryMock.setMany(keys, values, tokenId);
        await unsRegistryMock.upgradeAll([tokenId]);

        const hashedKeys = keys.map((key) => BigInt(id(key)));

        const [, resultingValues] = await unsRegistryMock.connect(reader).getManyByHash(hashedKeys, tokenId);

        expect(resultingValues).to.be.deep.equal(['', '']);

        expect(await unsRegistryMock.connect(coinbase).getManyByHash(hashedKeys, tokenId)).to.be.deep.equal([
          keys,
          values,
        ]);
      });

      it('should set record by hash', async () => {
        const expectedKey = 'key_23c';
        const keyHash = await initializeKey(expectedKey);

        await unsRegistry.setByHash(keyHash, 'value', tokenId);

        const [key, value] = await unsRegistry.getByHash(keyHash, tokenId);
        expect([key, value]).to.be.eql([expectedKey, 'value']);
      });

      it('should revert setting record by hash when key is not registered', async () => {
        const expectedKey = 'key_23f3c';
        const keyHash = BigInt(id(expectedKey));

        await expect(unsRegistry.setByHash(keyHash, 'value', tokenId)).to.be.revertedWith(
          'RecordStorage: KEY_NOT_FOUND',
        );
      });

      it('should set records(1) by hash', async () => {
        const expectedKey = 'key_2w12c';
        const keyHash = await initializeKey(expectedKey);

        await unsRegistry.setManyByHash([keyHash], ['value'], tokenId);

        expect(await unsRegistry.getByHash(keyHash, tokenId)).to.be.eql([expectedKey, 'value']);
      });

      it('should set records(2) by hash', async () => {
        const key1 = 'key_3m3c';
        const key2 = 'key_9v3f';
        const key1Hash = await initializeKey(key1);
        const key2Hash = await initializeKey(key2);

        await unsRegistry.setManyByHash([key1Hash, key2Hash], ['value1', 'value2'], tokenId);

        expect(await unsRegistry.getManyByHash([key1Hash, key2Hash], tokenId)).to.be.eql([
          [key1, key2],
          ['value1', 'value2'],
        ]);
      });

      it('should revert setting records by hash when at least one key is not registered', async () => {
        const key1 = 'key_2d83c';
        const key2 = 'key_4o83f';
        const key1Hash = await initializeKey(key1);
        const key2Hash = BigInt(id(key2));

        await expect(
          unsRegistry.setManyByHash([key1Hash, key2Hash], ['value1', 'value2'], tokenId),
        ).to.be.revertedWith('RecordStorage: KEY_NOT_FOUND');
      });

      it('should not consume additional gas if key hash was set before', async () => {
        const newKeyHashTx = await unsRegistry.set('keyhash-gas', 'value', tokenId);
        const newKeyHashTxReceipt = await newKeyHashTx.wait();
        const exitsKeyHashTx = await unsRegistry.set('keyhash-gas', 'value', tokenId);
        const exitsKeyHashTxReceipt = await exitsKeyHashTx.wait();

        expect(newKeyHashTxReceipt?.gasUsed).to.be.above(exitsKeyHashTxReceipt?.gasUsed);

        const newKeyHashTx2 = await unsRegistry.setMany(
          ['keyhash-gas-1', 'keyhash-gas-2'],
          ['value-1', 'value-2'],
          tokenId,
        );
        const newKeyHashTxReceipt2 = await newKeyHashTx2.wait();
        const exitsKeyHashTx2 = await unsRegistry.setMany(
          ['keyhash-gas-1', 'keyhash-gas-2'],
          ['value-1', 'value-2'],
          tokenId,
        );
        const exitsKeyHashTxReceipt2 = await exitsKeyHashTx2.wait();

        expect(newKeyHashTxReceipt2?.gasUsed).to.be.above(exitsKeyHashTxReceipt2?.gasUsed);

        const newKeyHashTx3 = await unsRegistry.setMany(
          ['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'],
          ['value-1', 'value-2', 'value-3'],
          tokenId,
        );
        const newKeyHashTxReceipt3 = await newKeyHashTx3.wait();
        const exitsKeyHashTx3 = await unsRegistry.setMany(
          ['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'],
          ['value-1', 'value-2', 'value-3'],
          tokenId,
        );
        const exitsKeyHashTxReceipt3 = await exitsKeyHashTx3.wait();

        expect(newKeyHashTxReceipt3?.gasUsed).to.be.above(exitsKeyHashTxReceipt3?.gasUsed);
      });
    });
  });

  describe('Registry (renewals)', () => {
    describe('expiryOf', () => {
      it('should return expiry of a token', async () => {
        const expiry = latestBlockTimestamp + 60 * 60 * 24;
        const tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase, tld: 'com', expiry });

        expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(expiry);
      });

      it('should return zero if token is not expirable', async () => {
        const tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase.address, tld: 'crypto' });
        expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(0);
      });
    });

    describe('isExpired', () => {
      it('should return false if token is not expired', async () => {
        const expiry = latestBlockTimestamp + 60 * 60 * 24;
        const tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase.address, tld: 'com', expiry });

        expect(await unsRegistry.isExpired(tokenId)).to.be.equal(false);
      });

      it('should return true if token is expired', async () => {
        const expiry = latestBlockTimestamp + 60 * 60 * 24;
        const tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase.address, tld: 'com', expiry });

        await increaseTimeBy(60 * 60 * 24 + 1);

        expect(await unsRegistry.isExpired(tokenId)).to.be.equal(true);
      });

      it('should return false if token is not expirable', async () => {
        const tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase.address, tld: 'crypto' });
        expect(await unsRegistry.isExpired(tokenId)).to.be.equal(false);
      });
    });

    describe('setExpiry', () => {
      it('should set expiry for a token', async () => {
        const expiry = latestBlockTimestamp + 60 * 60 * 24;

        const tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase.address, tld: 'com' });

        const newExpiry = expiry + 60 * 60 * 24;

        await expect(unsRegistry.setExpiry(newExpiry, tokenId))
          .to.emit(unsRegistry, 'SetExpiry')
          .withArgs(tokenId, newExpiry);

        expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(newExpiry);
      });

      it('should not allow setting expiry in the past', async () => {
        const expiry = latestBlockTimestamp + 60 * 60 * 24;
        const tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase.address, tld: 'com' });

        await expect(unsRegistry.setExpiry(expiry - 60 * 60 * 24, tokenId)).to.be.revertedWith(
          'Registry: EXPIRY_IN_PAST',
        );
      });

      it('should not allow setting expiry for non-existent token', async () => {
        const tokenId = await unsRegistry.namehash(['some_invalid_label', 'crypto']);

        await expect(unsRegistry.setExpiry(latestBlockTimestamp + 60 * 60 * 24, tokenId)).to.be.revertedWith(
          'ERC721: invalid token ID',
        );
      });

      it('should revert if sender is not MintingManager', async () => {
        const tokenId = await mintRandomDomain({ unsRegistry, owner: coinbase.address, tld: 'com' });

        await expect(
          unsRegistry.connect(signers[1]).setExpiry(latestBlockTimestamp + 60 * 60 * 24, tokenId),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_MINTING_MANAGER');
      });
    });
  });
});
