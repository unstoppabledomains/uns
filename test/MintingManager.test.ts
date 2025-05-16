import { ethers, network } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { BaseContract, namehash } from 'ethers';
import { MintingManager, ProxyReader, UNSOperator, UNSRegistry } from '../types/contracts';
import { ERC20Mock, ERC20UnsafeMock, MintingManagerMock, UNSRegistryMock } from '../types/contracts/mocks';
import { CNSRegistry, Resolver } from '../types/dot-crypto/contracts';
import { MintingController, URIPrefixController } from '../types/dot-crypto/contracts/controllers';
import {
  MintingManager__factory,
  ProxyReader__factory,
  UNSOperator__factory,
  UNSRegistry__factory,
} from '../types/factories/contracts';
import {
  MintingManagerMock__factory,
  UNSRegistryMock__factory,
  ERC20Mock__factory,
} from '../types/factories/contracts/mocks';
import { CNSRegistry__factory, Resolver__factory } from '../types/factories/dot-crypto/contracts';
import {
  MintingController__factory,
  URIPrefixController__factory,
} from '../types/factories/dot-crypto/contracts/controllers';
import { ERC20UnsafeMock__factory } from '../types';
import { mintUnsTlds } from '../src/helpers';
import { TLD } from '../src/tlds';
import { ZERO_ADDRESS } from './helpers/constants';
import { getLatestBlockTimestamp, increaseTimeBy } from './helpers/utils';

describe('MintingManager', () => {
  let unsRegistry: UNSRegistry,
    unsRegistryMock: UNSRegistryMock,
    unsOperator: UNSOperator,
    cnsRegistry: CNSRegistry,
    resolver: Resolver,
    mintingController: MintingController,
    uriPrefixController: URIPrefixController,
    mintingManager: MintingManager,
    mintingManagerMock: MintingManagerMock,
    proxyReader: ProxyReader;

  let signers: SignerWithAddress[], domainSuffix: string;
  let coinbase: SignerWithAddress,
    receiver: SignerWithAddress,
    developer: SignerWithAddress,
    spender: SignerWithAddress;

  let latestBlockTimestamp: number;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;
  });

  beforeEach(async () => {
    latestBlockTimestamp = await getLatestBlockTimestamp();
  });

  describe('Ownership', () => {
    before(async () => {
      [, , receiver] = signers;

      unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
      mintingManager = await new MintingManager__factory().connect(coinbase).deploy();
      await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

      await mintingManager.initialize(
        await unsRegistry.getAddress(),
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintUnsTlds(mintingManager, coinbase);
    });

    it('should transfer ownership', async () => {
      expect(await mintingManager.owner()).to.be.equal(coinbase.address);

      await mintingManager.transferOwnership(receiver.address);

      expect(await mintingManager.owner()).to.be.equal(receiver.address);

      await expect(mintingManager.connect(coinbase).pause()).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('addProxyReaders', async () => {
    let proxyReader2: ProxyReader;

    before(async () => {
      [, , receiver] = signers;

      unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
      mintingManager = await new MintingManager__factory().connect(coinbase).deploy();
      cnsRegistry = await new CNSRegistry__factory().connect(coinbase).deploy();
      unsRegistryMock = await new UNSRegistryMock__factory().connect(coinbase).deploy();
      mintingManagerMock = await new MintingManagerMock__factory().connect(coinbase).deploy();

      await unsRegistryMock.initialize(
        await mintingManagerMock.getAddress(),
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );

      await mintingManagerMock.initialize(
        await unsRegistryMock.getAddress(),
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintingManagerMock.addMinter(coinbase.address);
      await mintUnsTlds(mintingManagerMock, coinbase);

      proxyReader = await new ProxyReader__factory().connect(coinbase).deploy();
      await proxyReader.initialize(await unsRegistryMock.getAddress(), await cnsRegistry.getAddress());

      proxyReader2 = await new ProxyReader__factory().connect(coinbase).deploy();
      await proxyReader2.initialize(await unsRegistryMock.getAddress(), await cnsRegistry.getAddress());
    });

    it('adds ProxyReader addresses', async () => {
      const labels = ['add-proxy-readers-test', 'crypto'];

      await mintingManagerMock.issueWithRecords(receiver.address, labels, [], [], true);

      const tokenId = await unsRegistryMock.namehash(labels);

      const [proxyReaderAddr, proxyReader2Addr] = [
        await (proxyReader as BaseContract).getAddress(),
        await (proxyReader2 as BaseContract).getAddress(),
      ];
      await mintingManagerMock.addProxyReaders([proxyReaderAddr, proxyReader2Addr]);

      await mintingManagerMock.upgradeAll([tokenId]);

      await unsRegistryMock.connect(receiver).set('key', 'value', tokenId);

      const [, , result] = await proxyReader.connect(receiver).getData.staticCall(['key'], tokenId);
      const [, , result2] = await proxyReader2.getData.staticCall(['key'], tokenId);

      expect(result).to.deep.equal(['']);
      expect(result2).to.deep.equal(['']);
    });

    it('should revert if not owner', async () => {
      await expect(mintingManager.connect(signers[1]).addProxyReaders([ZERO_ADDRESS])).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });

  describe('TLD management', () => {
    before(async () => {
      [, spender] = signers;

      unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
      mintingManager = await new MintingManager__factory().connect(coinbase).deploy();
      await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

      await mintingManager.initialize(
        await unsRegistry.getAddress(),
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintingManager.addMinter(coinbase.address);
      await mintUnsTlds(mintingManager, coinbase);
    });

    describe('addTld', async () => {
      it('should add new TLD', async () => {
        const _tld = 'test';
        const _hashname = namehash(_tld);
        const labels = ['test-1', _tld];

        await expect(mintingManager.addTld(_tld, false)).to.emit(mintingManager, 'NewTld').withArgs(_hashname, _tld);

        await mintingManager.issueWithRecords(coinbase.address, labels, [], [], true);
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.exists(_hashname)).to.be.equal(true);
      });

      it('should add new expirable TLD', async () => {
        const _tld = 'dotcom';
        const _hashname = namehash(_tld);
        const labels = ['test-1', _tld];

        await expect(mintingManager.addTld(_tld, true)).to.emit(mintingManager, 'NewTld').withArgs(_hashname, _tld);

        const expiry = latestBlockTimestamp + 24 * 60 * 60;
        await mintingManager.issueExpirableWithRecords(coinbase.address, labels, [], [], expiry, true);
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(expiry);
        expect(await unsRegistry.exists(_hashname)).to.be.equal(true);
      });

      it('should revert adding TLD when non-owner', async () => {
        const _tld = 'test1';

        await expect(mintingManager.connect(spender).addTld(_tld, false)).to.be.revertedWith(
          'Ownable: caller is not the owner',
        );
      });

      it('should have all supported tlds minted', async () => {
        for (const key of Object.keys(TLD)) {
          expect(await unsRegistry.ownerOf(TLD[key].hash)).to.be.equal(await mintingManager.getAddress());
        }
      });
    });

    describe('removeTld', async () => {
      it('should be able to remove existing TLD', async () => {
        const tld = 'test-removing-tld';
        const hashname = namehash(tld);

        await mintingManager.addTld(tld, false);

        await expect(mintingManager.removeTld(hashname)).to.emit(mintingManager, 'RemoveTld').withArgs(hashname);
        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['sld-domain-qq', tld], [], [], true),
        ).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('should revert removing TLD when not registred', async () => {
        const hashname = namehash('test-removing-tld-not-existing');

        await expect(mintingManager.removeTld(hashname)).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('should revert removing TLD when non-owner', async () => {
        const tld = 'test-removing-tld-when-not-owner';
        const hashname = namehash(tld);

        await mintingManager.addTld(tld, false);

        await expect(mintingManager.connect(spender).removeTld(hashname)).to.be.revertedWith(
          'Ownable: caller is not the owner',
        );
      });
    });
  });

  describe('Minting', () => {
    before(async () => {
      [, , receiver, spender] = signers;

      unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
      unsOperator = await new UNSOperator__factory().connect(coinbase).deploy();
      mintingManager = await new MintingManager__factory().connect(coinbase).deploy();

      await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

      await mintingManager.initialize(
        await unsRegistry.getAddress(),
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        await unsOperator.getAddress(),
        ZERO_ADDRESS,
      );
      await mintingManager.addMinter(await coinbase.getAddress());
      await mintingManager.setTokenURIPrefix('/');
      await mintUnsTlds(mintingManager, coinbase);

      mintingManagerMock = await new MintingManagerMock__factory().connect(coinbase).deploy();
      unsRegistryMock = await new UNSRegistryMock__factory().connect(coinbase).deploy();

      await unsRegistryMock.initialize(
        await mintingManagerMock.getAddress(),
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintingManagerMock.initialize(
        await unsRegistryMock.getAddress(),
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );

      await mintingManagerMock.addMinter(coinbase.address);

      await mintUnsTlds(mintingManagerMock, coinbase);
    });

    describe('mint second level domain', () => {
      it('should revert minting when tld is invalid', async () => {
        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['test-2ka3', 'unknown'], [], [], true),
        ).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('should mint .wallet domain', async () => {
        const labels = ['test-2dp', 'wallet'];

        await mintingManager.issueWithRecords(coinbase.address, labels, [], [], true);
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      });

      it('should mint .crypto damain in UNS registry when CNS registry undefined', async () => {
        const labels = ['test-uc-3v8n', 'crypto'];

        await mintingManager.issueWithRecords(coinbase.address, labels, [], [], true);
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['udtestdev-t5', 'crypto'], [], [], true),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });

    describe('label verification', () => {
      it('should not allow to mint domains with invalid labels', async () => {
        const labels = [
          '',
          ' ',
          'Q',
          'qwertY',
          'qwErty',
          '*',
          '$3123',
          '\tq',
          'q\n',
          '@',
          'k.h',
          '-asd',
          'dsa2-',
          '-dddd-',
          '-',
          '--',
          '-----',
        ];
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        for (const label of labels) {
          if (label) {
            await expect(
              mintingManager.issueWithRecords(coinbase.address, [label, 'unstoppable'], [], [], true),
            ).to.be.revertedWith('MintingManager: LABEL_INVALID');

            await expect(
              mintingManager.issueExpirableWithRecords(coinbase.address, [label, 'com'], [], [], expiry, true),
            ).to.be.revertedWith('MintingManager: LABEL_INVALID');
          }
        }
      });

      it('should allow to mint domains with valid labels', async () => {
        const labels = ['q', '1', 'q1', '1q', '1-q', 'qwerty', 'qw-erty', 'qw3rty', 'qw3-rty1', 'test-test1-test2'];
        await mintingManager.issueWithRecords(coinbase.address, ['test2', 'x'], [], [], false);

        for (const label of labels) {
          const domainLabels = [label, 'x'];
          await mintingManager.issueWithRecords(coinbase.address, domainLabels, [], [], true);

          const domainTokenId = await unsRegistry.namehash(domainLabels);
          expect(await unsRegistry.ownerOf(domainTokenId)).to.be.equal(coinbase.address);
        }
      });
    });

    describe('subdomains', () => {
      it('should revert minting subdomains', async () => {
        const labels = ['test-mcm332-sld', 'wallet'];
        await mintingManager.issueWithRecords(coinbase.address, labels, [], [], true);
      });
    });
  });

  describe('Purchases', () => {
    let snapshot: unknown;

    const chainId = network.config.chainId;

    before(async () => {
      [coinbase, spender, receiver] = signers;

      unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
      mintingManager = await new MintingManager__factory().connect(coinbase).deploy();

      await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
      await mintingManager.initialize(
        await unsRegistry.getAddress(),
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );

      await mintingManager.addMinter(await coinbase.getAddress());
      await mintingManager.setTokenURIPrefix('/');
      await mintUnsTlds(mintingManager, coinbase);
    });

    beforeEach(async () => {
      snapshot = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async () => {
      await ethers.provider.send('evm_revert', [snapshot]);
    });

    describe('With native tokens', async () => {
      it('is possible to buy a domain and set records', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;
        const price = ethers.parseEther('2.21');

        const labels = ['test-onchain-purchase', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), chainId, receiver.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager
            .connect(spender)
            .buy(receiver.address, labels, ['key'], ['value'], expiry, price, signature, { value: price }),
        )
          .to.emit(mintingManager, 'DomainPurchase')
          .withArgs(tokenId, spender.address, receiver.address, price, ZERO_ADDRESS);

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(receiver.address);
        expect(await unsRegistry.get('key', tokenId)).to.equal('value');
        expect(await unsRegistry.reverseOf(receiver.address)).to.equal(0);

        expect(await ethers.provider.getBalance(await mintingManager.getAddress())).to.equal(price);
      });

      it('is possible to buy a returned domain', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;
        const price = ethers.parseEther('2.21');

        const labels = ['test-onchain-purchase-returned', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        await mintingManager.connect(coinbase).issueWithRecords(spender.address, labels, [], [], false);
        await unsRegistry.connect(spender).setOwner(await mintingManager.getAddress(), tokenId);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await mintingManager
          .connect(spender)
          .buy(spender.address, labels, [], [], expiry, price, signature, { value: price });

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(spender.address);
        expect(await unsRegistry.reverseOf(spender.address)).to.equal(tokenId);

        expect(await ethers.provider.getBalance(await mintingManager.getAddress())).to.equal(price);
      });

      it('does not set reverse resolution if already set', async () => {
        const reverseLabels = ['reverse', 'x'];
        await mintingManager.connect(coinbase).issueWithRecords(spender.address, reverseLabels, [], [], true);
        const reverseTokenId = await unsRegistry.namehash(reverseLabels);

        const expiry = latestBlockTimestamp + 24 * 60 * 60;
        const price = ethers.parseEther('1');

        const labels = ['test-onchain-purchase-reverse-overwrite', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await mintingManager
          .connect(spender)
          .buy(spender.address, labels, [], [], expiry, price, signature, { value: price });

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(spender.address);
        expect(await unsRegistry.reverseOf(spender.address)).to.equal(reverseTokenId);
        expect(await ethers.provider.getBalance(await mintingManager.getAddress())).to.equal(price);
      });

      it('does not set reverse resolution if sender is not owner', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;
        const price = ethers.parseEther('1');

        const labels = ['test-onchain-purchase-reverse-not-owner', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), chainId, receiver.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await mintingManager
          .connect(spender)
          .buy(receiver.address, labels, [], [], expiry, price, signature, { value: price });

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(receiver.address);
        expect(await unsRegistry.reverseOf(spender.address)).to.equal(0);
        expect(await ethers.provider.getBalance(await mintingManager.getAddress())).to.equal(price);
      });

      it('returns cost excess to user', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('1');
        const excess = ethers.parseEther('0.5');

        const initialBalance = await ethers.provider.getBalance(spender.address);

        const labels = ['test-onchain-purchase1', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        const tx = await mintingManager
          .connect(spender)
          .buy(spender.address, labels, [], [], expiry, price, signature, { value: price + excess });
        const receipt = (await tx.wait())!;
        const txFee = receipt.gasPrice * receipt.gasUsed;

        expect(await ethers.provider.getBalance(spender.address)).to.equal(initialBalance - txFee - price);

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(spender.address);
        expect(await ethers.provider.getBalance(await mintingManager.getAddress())).to.equal(price);
      });

      it('reverts if no tokens sent', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('1');

        const labels = ['test-onchain-purchase2', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager.connect(spender).buy(spender.address, labels, [], [], expiry, price, signature),
        ).to.be.revertedWith('MintingManager: NOT_ENOUGH_FUNDS');
      });

      it('reverts if not enough tokens sent', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('1');

        const labels = ['test-onchain-purchase1', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager
            .connect(spender)
            .buy(spender.address, labels, [], [], expiry, price, signature, { value: price - BigInt(1) }),
        ).to.be.revertedWith('MintingManager: NOT_ENOUGH_FUNDS');
      });

      it('does not allow to purchase a subdomain', async () => {
        const parentLabels = ['owned-parent', 'x'];
        await mintingManager.connect(coinbase).issueWithRecords(receiver.address, parentLabels, [], [], true);

        const expiry = latestBlockTimestamp + 24 * 60 * 60;
        const price = ethers.parseEther('1');

        const labels = ['sub', ...parentLabels];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), chainId, receiver.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager
            .connect(spender)
            .buy(receiver.address, labels, [], [], expiry, price, signature, { value: price }),
        ).to.be.revertedWith('MintingManager: SUBDOMAINS_NOT_ALLOWED');
      });

      it('reverts if domain labels invalid', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('1');

        const labels = ['-invalid-domain', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager
            .connect(spender)
            .buy(spender.address, labels, [], [], expiry, price, signature, { value: price }),
        ).to.be.revertedWith('MintingManager: LABEL_INVALID');
      });

      it('reverts if TLD does not exist', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('1');

        const labels = ['domain', 'notexistingawesometld'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager
            .connect(spender)
            .buy(spender.address, labels, [], [], expiry, price, signature, { value: price }),
        ).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('reverts if is a free CNS domain ', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('1');

        const labels = ['udtestdev-tx', 'crypto'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager
            .connect(spender)
            .buy(spender.address, labels, [], [], expiry, price, signature, { value: price }),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });

      it('reverts if signature expired', async () => {
        const expiry = latestBlockTimestamp - 60;

        const price = ethers.parseEther('1');

        const labels = ['expired-purchase', 'crypto'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager
            .connect(spender)
            .buy(spender.address, labels, [], [], expiry, price, signature, { value: price }),
        ).to.be.revertedWith('MintingManager: EXPIRED_SIGNATURE');
      });

      it('reverts if signer is not minter', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('1');

        const labels = ['invalid-signer', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await spender.signMessage(purchaseHash);

        await expect(
          mintingManager
            .connect(spender)
            .buy(spender.address, labels, [], [], expiry, price, signature, { value: price }),
        ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
      });

      it('reverts if signed data doesnt match the signature', async () => {
        const expiry = latestBlockTimestamp - 60;

        const price = ethers.parseEther('1');

        const labels = ['invalid-signed-data', 'x'];
        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), chainId, spender.address, BigInt(1), expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await spender.signMessage(purchaseHash);

        await expect(
          mintingManager
            .connect(spender)
            .buy(await spender.getAddress(), labels, [], [], expiry, price, signature, { value: price }),
        ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
      });

      it('reverts if signed MintingManager address is wrong', async () => {
        const anotherUnsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
        const anotherMintingManager = await new MintingManager__factory().connect(coinbase).deploy();

        await anotherUnsRegistry.initialize(
          await anotherMintingManager.getAddress(),
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
        );
        await anotherMintingManager.initialize(
          await anotherUnsRegistry.getAddress(),
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
        );
        await anotherMintingManager.addMinter(coinbase.address);
        await anotherMintingManager.setTokenURIPrefix('/');
        await mintUnsTlds(anotherMintingManager, coinbase);

        const expiry = latestBlockTimestamp + 24 * 60 * 60;
        const price = ethers.parseEther('1');

        const labels = ['invalid-minting-manager-addr', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          anotherMintingManager
            .connect(spender)
            .buy(spender.address, labels, [], [], expiry, price, signature, { value: price }),
        ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
      });

      it('reverts if signed chainId is wrong', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;
        const price = ethers.parseEther('1');

        const labels = ['invalid-chainid', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), 1, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager
            .connect(spender)
            .buy(spender.address, labels, [], [], expiry, price, signature, { value: price }),
        ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
      });

      it('reverts if TLD is expirable', async () => {
        const requestExpiry = latestBlockTimestamp + 24 * 60 * 60;
        const price = ethers.parseEther('2.21');

        const labels = ['expirable-onchain-purchase-test', 'com'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              chainId,
              receiver.address,
              tokenId,
              requestExpiry,
              price,
              ZERO_ADDRESS,
            ],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager
            .connect(spender)
            .buy(receiver.address, labels, [], [], requestExpiry, price, signature, { value: price }),
        ).to.be.revertedWith('MintingManager: TLD_EXPIRABLE_MISMATCH');
      });
    });

    describe('With ERC20', () => {
      let erc20Mock: ERC20Mock;
      let erc20UnsafeMock: ERC20UnsafeMock;

      before(async () => {
        erc20Mock = await new ERC20Mock__factory().connect(coinbase).deploy();
        await erc20Mock.mint(spender.address, ethers.parseEther('100'));

        erc20UnsafeMock = await new ERC20UnsafeMock__factory().connect(coinbase).deploy();
        await erc20UnsafeMock.mint(spender.address, ethers.parseEther('100'));
      });

      it('is possibe to buy a domain with ERC20 token', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('5');

        const labels = ['test-erc20-onchain-purchase', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              chainId,
              receiver.address,
              tokenId,
              expiry,
              price,
              await erc20Mock.getAddress(),
            ],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(await mintingManager.getAddress(), price);

        await expect(
          mintingManager
            .connect(spender)
            .buyForErc20(
              receiver.address,
              labels,
              ['key'],
              ['value'],
              expiry,
              await erc20Mock.getAddress(),
              price,
              signature,
            ),
        )
          .to.emit(mintingManager, 'DomainPurchase')
          .withArgs(tokenId, spender.address, receiver.address, price, await erc20Mock.getAddress());

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(receiver.address);
        expect(await unsRegistry.get('key', tokenId)).to.equal('value');
        expect(await unsRegistry.reverseOf(receiver.address)).to.equal(0);

        expect(await erc20Mock.balanceOf(await mintingManager.getAddress())).to.equal(price);
      });

      it('is possible to buy a returned domain with ERC20 tokens', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;
        const price = ethers.parseEther('0.3');

        const labels = ['test-onchain-purchase-returned-erc20', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        await mintingManager.connect(coinbase).issueWithRecords(spender.address, labels, [], [], false);
        await unsRegistry.connect(spender).setOwner(await mintingManager.getAddress(), tokenId);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              chainId,
              spender.address,
              tokenId,
              expiry,
              price,
              await erc20Mock.getAddress(),
            ],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(await mintingManager.getAddress(), price);

        await mintingManager
          .connect(spender)
          .buyForErc20(spender.address, labels, [], [], expiry, await erc20Mock.getAddress(), price, signature);

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(spender.address);
        expect(await unsRegistry.reverseOf(spender.address)).to.equal(tokenId);

        expect(await erc20Mock.balanceOf(await mintingManager.getAddress())).to.equal(price);
      });

      it('does not set reverse resolution if already set', async () => {
        const reverseLabels = ['reverse', 'x'];
        await mintingManager.connect(coinbase).issueWithRecords(spender.address, reverseLabels, [], [], true);
        const reverseTokenId = await unsRegistry.namehash(reverseLabels);

        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('5');

        const labels = ['erc20-onchain-purchase-reverse', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              chainId,
              spender.address,
              tokenId,
              expiry,
              price,
              await erc20Mock.getAddress(),
            ],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(await mintingManager.getAddress(), price);

        await mintingManager
          .connect(spender)
          .buyForErc20(spender.address, labels, [], [], expiry, await erc20Mock.getAddress(), price, signature);

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(spender.address);
        expect(await unsRegistry.reverseOf(spender.address)).to.equal(reverseTokenId);

        expect(await erc20Mock.balanceOf(await mintingManager.getAddress())).to.equal(price);
      });

      it('does not set reverse resolution if sender is not owner', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;
        const price = ethers.parseEther('5');

        const labels = ['erc20-onchain-purchase-reverse-not-owner', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              chainId,
              receiver.address,
              tokenId,
              expiry,
              price,
              await erc20Mock.getAddress(),
            ],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(await mintingManager.getAddress(), price);

        await mintingManager
          .connect(spender)
          .buyForErc20(receiver.address, labels, [], [], expiry, await erc20Mock.getAddress(), price, signature);

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(receiver.address);
        expect(await unsRegistry.reverseOf(spender.address)).to.equal(0);
        expect(await erc20Mock.balanceOf(await mintingManager.getAddress())).to.equal(price);
      });

      it('reverts if no ERC20 tokens approved', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('5');

        const labels = ['test-erc20-onchain-purchase', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              chainId,
              spender.address,
              tokenId,
              expiry,
              price,
              await erc20Mock.getAddress(),
            ],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager
            .connect(spender)
            .buyForErc20(
              spender.address,
              labels,
              ['key'],
              ['value'],
              expiry,
              await erc20Mock.getAddress(),
              price,
              signature,
            ),
        ).to.be.revertedWith('ERC20: insufficient allowance');
      });

      it('reverts if ERC20 allowance is too low', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('5');

        const labels = ['test-erc20-onchain-purchase', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              chainId,
              spender.address,
              tokenId,
              expiry,
              price,
              await erc20Mock.getAddress(),
            ],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(await mintingManager.getAddress(), ethers.parseEther('1'));

        await expect(
          mintingManager
            .connect(spender)
            .buyForErc20(spender.address, labels, [], [], expiry, await erc20Mock.getAddress(), price, signature),
        ).to.be.revertedWith('ERC20: insufficient allowance');
      });

      it('does not allow to purchase a subdomain with ERC20 tokens', async () => {
        const parentLabels = ['owned-parent-erc20-test', 'x'];
        await mintingManager.connect(coinbase).issueWithRecords(receiver.address, parentLabels, [], [], true);

        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('5');

        const labels = ['sub', ...parentLabels];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              chainId,
              spender.address,
              tokenId,
              expiry,
              price,
              await erc20Mock.getAddress(),
            ],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(await mintingManager.getAddress(), price);

        await expect(
          mintingManager
            .connect(spender)
            .buyForErc20(spender.address, labels, [], [], expiry, await erc20Mock.getAddress(), price, signature),
        ).to.be.revertedWith('MintingManager: SUBDOMAINS_NOT_ALLOWED');
      });

      it('reverts if domain labels invalid', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('5');

        const labels = ['-invalid-domain', 'nft'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              chainId,
              spender.address,
              tokenId,
              expiry,
              price,
              await erc20Mock.getAddress(),
            ],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(await mintingManager.getAddress(), price);

        await expect(
          mintingManager
            .connect(spender)
            .buyForErc20(spender.address, labels, [], [], expiry, await erc20Mock.getAddress(), price, signature),
        ).to.be.revertedWith('MintingManager: LABEL_INVALID');
      });

      it('reverts if TLD does not exist', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('5');

        const labels = ['domain', 'awesometld'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              chainId,
              spender.address,
              tokenId,
              expiry,
              price,
              await erc20Mock.getAddress(),
            ],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(await mintingManager.getAddress(), price);

        await expect(
          mintingManager
            .connect(spender)
            .buyForErc20(spender.address, labels, [], [], expiry, await erc20Mock.getAddress(), price, signature),
        ).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('reverts if signature expired', async () => {
        const expiry = latestBlockTimestamp - 60;

        const price = ethers.parseEther('5');

        const labels = ['expired-erc20-purchase', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              chainId,
              spender.address,
              tokenId,
              expiry,
              price,
              await erc20Mock.getAddress(),
            ],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(await mintingManager.getAddress(), price);

        await expect(
          mintingManager
            .connect(spender)
            .buyForErc20(spender.address, labels, [], [], expiry, await erc20Mock.getAddress(), price, signature),
        ).to.be.revertedWith('MintingManager: EXPIRED_SIGNATURE');
      });

      it('reverts if signer is not minter', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('5');

        const labels = ['expired-erc20-purchase', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              chainId,
              spender.address,
              tokenId,
              expiry,
              price,
              await erc20Mock.getAddress(),
            ],
          ),
        );
        const signature = await spender.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(await mintingManager.getAddress(), price);

        await expect(
          mintingManager
            .connect(spender)
            .buyForErc20(spender.address, labels, [], [], expiry, await erc20Mock.getAddress(), price, signature),
        ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
      });

      it('reverts if signed data doesnt match the signature', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('5');

        const labels = ['expired-erc20-purchase', 'x'];
        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              chainId,
              spender.address,
              BigInt(1),
              expiry,
              price,
              await erc20Mock.getAddress(),
            ],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(await mintingManager.getAddress(), price);

        await expect(
          mintingManager
            .connect(spender)
            .buyForErc20(spender.address, labels, [], [], expiry, await erc20Mock.getAddress(), price, signature),
        ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
      });

      it('reverts if ERC20 transfer returns false', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;
        const price = ethers.parseEther('5');

        const labels = ['test-erc20-onchain-purchase-unsafe', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              chainId,
              spender.address,
              tokenId,
              expiry,
              price,
              await erc20UnsafeMock.getAddress(),
            ],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20UnsafeMock.connect(spender).approve(await mintingManager.getAddress(), price);

        await expect(
          mintingManager
            .connect(spender)
            .buyForErc20(
              spender.address,
              labels,
              [],
              [],
              expiry,
              await erc20UnsafeMock.getAddress(),
              price,
              signature,
            ),
        ).to.be.revertedWith('ERC20: LOW_LEVEL_FAIL');
      });

      it('reverts if signed MintingManager address is wrong', async () => {
        const anotherUnsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
        const anotherMintingManager = await new MintingManager__factory().connect(coinbase).deploy();

        await anotherUnsRegistry.initialize(
          await anotherMintingManager.getAddress(),
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
        );
        await anotherMintingManager.initialize(
          await anotherUnsRegistry.getAddress(),
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
        );
        await anotherMintingManager.addMinter(coinbase.address);
        await anotherMintingManager.setTokenURIPrefix('/');
        await mintUnsTlds(anotherMintingManager, coinbase);

        const expiry = latestBlockTimestamp + 24 * 60 * 60;
        const price = ethers.parseEther('1');

        const labels = ['invalid-minting-manager-addr-erc20', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        await erc20Mock.connect(spender).approve(await mintingManager.getAddress(), price);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              chainId,
              spender.address,
              tokenId,
              expiry,
              price,
              await erc20Mock.getAddress(),
            ],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          anotherMintingManager
            .connect(spender)
            .buyForErc20(spender.address, labels, [], [], expiry, await erc20Mock.getAddress(), price, signature),
        ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
      });

      it('reverts if signed chainId is wrong', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;
        const price = ethers.parseEther('1');

        const labels = ['invalid-chainid-erc20', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        await erc20Mock.connect(spender).approve(await mintingManager.getAddress(), price);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              1,
              spender.address,
              tokenId,
              expiry,
              price,
              await erc20Mock.getAddress(),
            ],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager
            .connect(spender)
            .buyForErc20(spender.address, labels, [], [], expiry, await erc20Mock.getAddress(), price, signature),
        ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
      });

      it('reverts if TLD is expirable', async () => {
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const price = ethers.parseEther('5');

        const labels = ['expirable-erc20-on-chain-purchase', 'com'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [
              await mintingManager.getAddress(),
              chainId,
              receiver.address,
              tokenId,
              expiry,
              price,
              await erc20Mock.getAddress(),
            ],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(await mintingManager.getAddress(), price);

        await expect(
          mintingManager
            .connect(spender)
            .buyForErc20(receiver.address, labels, [], [], expiry, await erc20Mock.getAddress(), price, signature),
        ).to.be.revertedWith('MintingManager: TLD_EXPIRABLE_MISMATCH');
      });
    });
  });

  describe('Tld-based minting', () => {
    before(async () => {
      [coinbase, spender, receiver] = signers;

      unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();

      cnsRegistry = await new CNSRegistry__factory().connect(coinbase).deploy();
      mintingController = await new MintingController__factory()
        .connect(coinbase)
        .deploy(await cnsRegistry.getAddress());
      await cnsRegistry.addController(await mintingController.getAddress());

      resolver = await new Resolver__factory()
        .connect(coinbase)
        .deploy(await cnsRegistry.getAddress(), await mintingController.getAddress());

      uriPrefixController = await new URIPrefixController__factory()
        .connect(coinbase)
        .deploy(await cnsRegistry.getAddress());
      await cnsRegistry.addController(await uriPrefixController.getAddress());

      mintingManager = await new MintingManager__factory().connect(coinbase).deploy();
      await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

      await mintingController.addMinter(await mintingManager.getAddress());
      await uriPrefixController.addWhitelisted(await mintingManager.getAddress());

      await mintingManager.initialize(
        await unsRegistry.getAddress(),
        await mintingController.getAddress(),
        await uriPrefixController.getAddress(),
        await resolver.getAddress(),
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintingManager.addMinter(coinbase.address);
      await mintingManager.setTokenURIPrefix('/');
      await mintUnsTlds(mintingManager, coinbase);
    });

    it('should have registered all tlds', async () => {
      Object.values(TLD).forEach(async (tld) => {
        expect(await unsRegistry.exists(tld.hash)).to.be.equal(true);
      });
    });

    describe('issueWithRecords(address,string[],string[],string[],bool)', () => {
      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager.issueWithRecords(coinbase.address, ['test-m110-2', 'crypto'], ['key1'], ['value1'], true);

        const tokenId = await cnsRegistry.childIdOf(TLD.crypto.hash, 'test-m110-2');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: invalid token ID');

        expect(await resolver.get('key1', tokenId)).to.be.eql('value1');
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(await resolver.getAddress());
      });

      it('should mint with records .wallet domain in UNS registry', async () => {
        await mintingManager.issueWithRecords(
          coinbase.address,
          ['test-mcm332-2', 'wallet'],
          ['key1'],
          ['value1'],
          true,
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.wallet.hash, 'test-mcm332-2');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await unsRegistry.get('key1', tokenId)).to.be.eql('value1');
      });

      it('should issue with records returned .wallet domain in UNS registry', async () => {
        const labels = ['returned1-2', 'wallet'];
        await mintingManager.issueWithRecords(signers[2].address, labels, ['key1'], ['value1'], true);
        const tokenId = await unsRegistry.namehash(labels);

        await unsRegistry.connect(signers[2]).setOwner(await mintingManager.getAddress(), tokenId);

        await mintingManager.issueWithRecords(signers[1].address, labels, ['key1'], ['value2'], true);
        expect(await unsRegistry.ownerOf(tokenId)).to.be.eql(signers[1].address);
        expect(await unsRegistry.get('key1', tokenId)).to.be.eql('value2');
        expect(await unsRegistry.reverseOf(signers[1].address)).to.be.equal(tokenId);
      });

      it('should issue with records but without reverse returned .wallet domain in UNS registry', async () => {
        const labels = ['returned-reverse-1', 'wallet'];
        await mintingManager.issueWithRecords(signers[2].address, labels, ['key1'], ['value1'], true);
        const tokenId = await unsRegistry.namehash(labels);

        await unsRegistry.connect(signers[2]).setOwner(await mintingManager.getAddress(), tokenId);

        await unsRegistry.connect(signers[1]).removeReverse();

        await mintingManager.issueWithRecords(signers[1].address, labels, ['key1'], ['value2'], false);
        expect(await unsRegistry.ownerOf(tokenId)).to.be.eql(signers[1].address);
        expect(await unsRegistry.get('key1', tokenId)).to.be.eql('value2');
        expect(await unsRegistry.reverseOf(signers[1].address)).to.be.equal(0);
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['udtestdev-t8', 'crypto'], ['key1'], ['value1'], true),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });

      it('should revert minting expirable domains', async () => {
        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['issue-expirable-test', 'com'], [], [], true),
        ).to.be.revertedWith('MintingManager: TLD_EXPIRABLE_MISMATCH');
      });
    });

    describe('issueExpirableWithRecords(address,string[],string[],string[],uint64,bool)', () => {
      beforeEach(async () => {
        if ((await unsRegistry.reverseOf(receiver.address)) !== BigInt(0)) {
          await unsRegistry.connect(receiver).removeReverse();
        }
      });

      it('should mint expirable .com with records and reverse', async () => {
        const labels = ['expirable-test-a1', 'com'];
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        await mintingManager
          .connect(coinbase)
          .issueExpirableWithRecords(receiver.address, labels, ['key1'], ['value1'], expiry, true);
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(receiver.address);
        expect(await unsRegistry.get('key1', tokenId)).to.eq('value1');
        expect(await unsRegistry.reverseOf(receiver.address)).to.eq(tokenId);
        expect(await unsRegistry.expiryOf(tokenId)).to.eq(expiry);
      });

      it('should unlock returned .com with records and reverse', async () => {
        const labels = ['expirable-test-a2', 'com'];
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        await mintingManager
          .connect(coinbase)
          .issueExpirableWithRecords(coinbase.address, labels, ['key1'], ['value1'], expiry, false);
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(coinbase.address);
        expect(await unsRegistry.get('key1', tokenId)).to.eq('value1');
        expect(await unsRegistry.expiryOf(tokenId)).to.eq(expiry);

        await unsRegistry.connect(coinbase).setOwner(await mintingManager.getAddress(), tokenId);

        const newExpiry = expiry + 60 * 60 * 24;
        await mintingManager
          .connect(coinbase)
          .issueExpirableWithRecords(receiver.address, labels, ['key2'], ['value2'], newExpiry, true);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(receiver.address);
        expect(await unsRegistry.expiryOf(tokenId)).to.eq(newExpiry);

        expect(await unsRegistry.get('key2', tokenId)).to.eq('value2');
        expect(await unsRegistry.get('key1', tokenId)).to.eq('');

        expect(await unsRegistry.reverseOf(receiver.address)).to.eq(tokenId);
      });

      it('should mint existing expired .com with records and reverse', async () => {
        const labels = ['expirable-test-a3', 'com'];
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        await mintingManager
          .connect(coinbase)
          .issueExpirableWithRecords(receiver.address, labels, ['key1'], ['value1'], expiry, false);
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(receiver.address);
        expect(await unsRegistry.get('key1', tokenId)).to.eq('value1');
        expect(await unsRegistry.expiryOf(tokenId)).to.eq(expiry);

        await increaseTimeBy(60 * 60 * 24);

        expect(await unsRegistry.isExpired(tokenId)).to.eq(true);

        const newExpiry = expiry + 24 * 60 * 60;
        await mintingManager
          .connect(coinbase)
          .issueExpirableWithRecords(receiver.address, labels, ['key2'], ['value2'], newExpiry, true);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(receiver.address);
        expect(await unsRegistry.get('key2', tokenId)).to.eq('value2');
        expect(await unsRegistry.get('key1', tokenId)).to.eq('');

        expect(await unsRegistry.expiryOf(tokenId)).to.eq(newExpiry);
        expect(await unsRegistry.reverseOf(receiver.address)).to.eq(tokenId);
      });

      it('should unlock returned expired .com with records and reverse', async () => {
        const labels = ['expirable-test-a4', 'com'];
        const expiry = latestBlockTimestamp + 60 * 60;

        await mintingManager
          .connect(coinbase)
          .issueExpirableWithRecords(coinbase.address, labels, ['key1'], ['value1'], expiry, false);
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(coinbase.address);
        expect(await unsRegistry.get('key1', tokenId)).to.eq('value1');
        expect(await unsRegistry.expiryOf(tokenId)).to.eq(expiry);

        await unsRegistry.connect(coinbase).setOwner(await mintingManager.getAddress(), tokenId);

        await increaseTimeBy(60 * 60);

        expect(await unsRegistry.isExpired(tokenId)).to.eq(true);

        const newExpiry = expiry + 24 * 60 * 60;

        await mintingManager
          .connect(coinbase)
          .issueExpirableWithRecords(receiver.address, labels, ['key2'], ['value2'], newExpiry, true);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(receiver.address);
        expect(await unsRegistry.expiryOf(tokenId)).to.eq(newExpiry);

        expect(await unsRegistry.get('key2', tokenId)).to.eq('value2');
        expect(await unsRegistry.get('key1', tokenId)).to.eq('');

        expect(await unsRegistry.reverseOf(receiver.address)).to.eq(tokenId);
      });

      it('should revert if TLD is not expirabe', async () => {
        await expect(
          mintingManager.issueExpirableWithRecords(
            coinbase.address,
            ['expirable-test-a5', 'crypto'],
            [],
            [],
            latestBlockTimestamp + 24 * 60 * 60,
            true,
          ),
        ).to.be.revertedWith('MintingManager: TLD_EXPIRABLE_MISMATCH');
      });

      it('should revert if caller is not minter', async () => {
        await expect(
          mintingManager
            .connect(signers[1])
            .issueExpirableWithRecords(
              coinbase.address,
              ['not-minter', 'com'],
              [],
              [],
              latestBlockTimestamp + 24 * 60 * 60,
              true,
            ),
        ).to.be.revertedWith('MintingManager: CALLER_IS_NOT_MINTER');
      });

      it('should revert with subdomain', async () => {
        const labels = ['expirable-test-a6', 'com'];
        const expiry = latestBlockTimestamp + 60 * 60;

        await mintingManager
          .connect(coinbase)
          .issueExpirableWithRecords(coinbase.address, labels, [], [], expiry, false);
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(coinbase.address);

        await expect(
          mintingManager.issueExpirableWithRecords(coinbase.address, ['sub', ...labels], [], [], expiry, true),
        ).to.be.revertedWith('MintingManager: SUBDOMAINS_NOT_ALLOWED');
      });

      it('should revert with subdomain of non-expirable SLD', async () => {
        const labels = ['expirable-test-a7', 'x'];

        await mintingManager.connect(coinbase).issueWithRecords(coinbase.address, labels, [], [], false);
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(coinbase.address);

        await expect(
          mintingManager.issueExpirableWithRecords(
            coinbase.address,
            ['sub', ...labels],
            [],
            [],
            latestBlockTimestamp + 24 * 60 * 60,
            true,
          ),
        ).to.be.revertedWith('MintingManager: SUBDOMAINS_NOT_ALLOWED');
      });

      it('should revert minting legacy CNS prefixed domains', async () => {
        await expect(
          mintingManager.issueExpirableWithRecords(
            coinbase.address,
            ['udtestdev-t8', 'com'],
            ['key1'],
            ['value1'],
            latestBlockTimestamp + 24 * 60 * 60,
            true,
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });
  });

  describe('CNS Resolver management', () => {
    before(async () => {
      unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
      mintingManager = await new MintingManager__factory().connect(coinbase).deploy();

      await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
      await mintingManager.initialize(
        unsRegistry.getAddress(),
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintUnsTlds(mintingManager, coinbase);
    });

    it('should return zero resolver when initialized by zero address', async () => {
      expect(await mintingManager.cnsResolver()).to.be.equal(ZERO_ADDRESS);
    });
  });

  describe('Renewals', () => {
    before(async () => {
      [coinbase, receiver] = signers;

      unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
      mintingManager = await new MintingManager__factory().connect(coinbase).deploy();

      await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
      await mintingManager.initialize(
        await unsRegistry.getAddress(),
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintingManager.addMinter(coinbase.address);
      await mintUnsTlds(mintingManager, coinbase);
    });

    it('should renew an expirable domain', async () => {
      const labels = ['test-renew-1', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      await mintingManager.connect(coinbase).issueExpirableWithRecords(coinbase.address, labels, [], [], expiry, true);

      const tokenId = await unsRegistry.namehash(labels);
      expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(expiry);

      const newExpiry = expiry + 60 * 60 * 24;
      await mintingManager.connect(coinbase).renew(newExpiry, tokenId);

      expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(newExpiry);
    });

    it('should revert if domain is not exprialbe', async () => {
      const labels = ['test-renew-2', 'crypto'];

      await mintingManager.connect(coinbase).issueWithRecords(coinbase.address, labels, [], [], true);
      const tokenId = await unsRegistry.namehash(labels);

      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      await expect(mintingManager.connect(coinbase).renew(expiry, tokenId)).to.be.revertedWith(
        'MintingManager: TOKEN_NOT_EXPIRABLE',
      );
    });

    it('should revert if expiry is not extended', async () => {
      const labels = ['test-renew-3', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      await mintingManager.connect(coinbase).issueExpirableWithRecords(coinbase.address, labels, [], [], expiry, true);
      const tokenId = await unsRegistry.namehash(labels);

      await expect(mintingManager.connect(coinbase).renew(expiry, tokenId)).to.be.revertedWith(
        'MintingManager: EXPIRY_NOT_EXTENDED',
      );
    });

    it('should revert if new expiry is in the past', async () => {
      const labels = ['test-renew-4', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      await mintingManager.connect(coinbase).issueExpirableWithRecords(coinbase.address, labels, [], [], expiry, true);
      const tokenId = await unsRegistry.namehash(labels);

      await increaseTimeBy(60 * 60 * 24);

      const newExpiry = expiry + 1;

      await expect(mintingManager.connect(coinbase).renew(newExpiry, tokenId)).to.be.revertedWith(
        'Registry: EXPIRY_IN_PAST',
      );
    });

    it('should revert if caller is not minter', async () => {
      const labels = ['test-renew-5', 'com'];

      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      await mintingManager.connect(coinbase).issueExpirableWithRecords(coinbase.address, labels, [], [], expiry, true);
      const tokenId = await unsRegistry.namehash(labels);

      const newExpiry = expiry + 60 * 60 * 24;

      await expect(mintingManager.connect(receiver).renew(newExpiry, tokenId)).to.be.revertedWith(
        'MinterRole: CALLER_IS_NOT_MINTER',
      );
    });
  });

  describe('Revocations (expirable domains)', () => {
    before(async () => {
      [coinbase, receiver] = signers;

      unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
      mintingManager = await new MintingManager__factory().connect(coinbase).deploy();

      await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
      await mintingManager.initialize(
        await unsRegistry.getAddress(),
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintingManager.addMinter(coinbase.address);
      await mintUnsTlds(mintingManager, coinbase);
    });

    it('should revoke an expirable domain', async () => {
      const labels = ['test-revoke-1', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      await mintingManager
        .connect(coinbase)
        .issueExpirableWithRecords(coinbase.address, labels, ['key1'], ['awesome-value'], expiry, true);

      const tokenId = await unsRegistry.namehash(labels);
      expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(expiry);

      await mintingManager.connect(coinbase).revoke(tokenId);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(await mintingManager.getAddress());
      expect(await unsRegistry.get('key1', tokenId)).to.be.equal('');
    });

    it('should revert if domain is not exprialbe', async () => {
      const labels = ['test-revoke-2', 'crypto'];

      await mintingManager.connect(coinbase).issueWithRecords(coinbase.address, labels, [], [], true);
      const tokenId = await unsRegistry.namehash(labels);

      await expect(mintingManager.connect(coinbase).revoke(tokenId)).to.be.revertedWith(
        'MintingManager: TOKEN_NOT_EXPIRABLE',
      );
    });

    it('should revert if caller is not minter', async () => {
      const labels = ['test-revoke-3', 'com'];

      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      await mintingManager.connect(coinbase).issueExpirableWithRecords(coinbase.address, labels, [], [], expiry, true);
      const tokenId = await unsRegistry.namehash(labels);

      await expect(mintingManager.connect(receiver).revoke(tokenId)).to.be.revertedWith(
        'MinterRole: CALLER_IS_NOT_MINTER',
      );
    });
  });

  describe('Blocklist', () => {
    describe('Domain blocklisting', () => {
      before(async () => {
        unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
        mintingManager = await new MintingManager__factory().connect(coinbase).deploy();
        await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

        await mintingManager.initialize(
          await unsRegistry.getAddress(),
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
        );
        await mintingManager.addMinter(coinbase.address);
        await mintUnsTlds(mintingManager, coinbase);
      });

      it('should block token after mint', async () => {
        const tokenId = await unsRegistry.namehash(['test-block-49vh', 'wallet']);
        expect(await mintingManager.isBlocked(tokenId)).to.be.equal(false);

        await mintingManager.issueWithRecords(coinbase.address, ['test-block-49vh', 'wallet'], [], [], true);

        expect(await mintingManager.isBlocked(tokenId)).to.be.equal(true);
      });

      it('should revert minting when token blocked', async () => {
        await mintingManager.issueWithRecords(coinbase.address, ['test-block-3pef', 'wallet'], [], [], true);

        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['test-block-3pef', 'wallet'], [], [], true),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });

      it('should revert minting expirable when token blocked', async () => {
        await mintingManager.issueExpirableWithRecords(
          coinbase.address,
          ['test-block-3pef', 'com'],
          [],
          [],
          latestBlockTimestamp + 60 * 60 * 24,
          true,
        );

        await expect(
          mintingManager.issueExpirableWithRecords(
            coinbase.address,
            ['test-block-3pef', 'com'],
            [],
            [],
            latestBlockTimestamp,
            true,
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });

      it('should revert minting when token burnt', async () => {
        const tokenId = await unsRegistry.namehash(['test-block-1md0', 'wallet']);

        await mintingManager.issueWithRecords(coinbase.address, ['test-block-1md0', 'wallet'], [], [], true);
        await unsRegistry.burn(tokenId);

        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['test-block-1md0', 'wallet'], [], [], true),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });
    });
  });

  describe('Pausable', () => {
    describe('Paused minting', () => {
      before(async () => {
        unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
        mintingManager = await new MintingManager__factory().connect(coinbase).deploy();
        await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

        await mintingManager.initialize(
          await unsRegistry.getAddress(),
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
        );

        await mintingManager.addMinter(coinbase.address);
        await mintUnsTlds(mintingManager, coinbase);
        await mintingManager.pause();
      });

      it('should revert mint when paused', async () => {
        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['test-paused-mint', 'wallet'], [], [], true),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert mint expirable when paused', async () => {
        await expect(
          mintingManager.issueExpirableWithRecords(
            coinbase.address,
            ['test-paused-mint', 'com'],
            [],
            [],
            latestBlockTimestamp + 24 * 60 * 60,
            false,
          ),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert mint with records when paused', async () => {
        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['test-paused-mint', 'wallet'], [], [], true),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert mint expirable with records when paused', async () => {
        const timestamp = await getLatestBlockTimestamp();

        await expect(
          mintingManager.issueExpirableWithRecords(
            coinbase.address,
            ['test-paused-mint', 'com'],
            [],
            [],
            timestamp + 24 * 60 * 60,
            false,
          ),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert buy if paused', async () => {
        await expect(
          mintingManager.buy(coinbase.address, ['test-paused-purchase', 'x'], [], [], 0, 0, '0x'),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert buyForErc20 if paused', async () => {
        await expect(
          mintingManager.buyForErc20(
            coinbase.address,
            ['test-paused-purchase', 'x'],
            [],
            [],
            0,
            ZERO_ADDRESS,
            0,
            '0x',
          ),
        ).to.be.revertedWith('Pausable: PAUSED');
      });
    });

    describe('Pausable management', () => {
      beforeEach(async () => {
        [, developer] = signers;

        unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
        mintingManager = await new MintingManager__factory().connect(coinbase).deploy();
        await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

        await mintingManager.initialize(
          await unsRegistry.getAddress(),
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
        );
        await mintingManager.addMinter(coinbase.address);
        await mintUnsTlds(mintingManager, coinbase);
      });

      it('should revert pausing when called by non-owner', async () => {
        await expect(mintingManager.connect(developer).pause()).to.be.revertedWith('Ownable: caller is not the owner');
      });

      it('should revert pausing when already paused', async () => {
        await mintingManager.pause();
        await expect(mintingManager.pause()).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert unpausing when called by non-owner', async () => {
        await expect(mintingManager.connect(developer).unpause()).to.be.revertedWith(
          'Ownable: caller is not the owner',
        );
      });

      it('should revert unpausing when not paused', async () => {
        await expect(mintingManager.unpause()).to.be.revertedWith('Pausable: NOT_PAUSED');
      });

      it('should pause and unpause', async () => {
        const tokenId = await unsRegistry.namehash(['test-pausable', 'wallet']);

        // Paused
        await expect(mintingManager.pause()).to.emit(mintingManager, 'Paused').withArgs(coinbase.address);

        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['test-pausable', 'wallet'], [], [], true),
        ).to.be.revertedWith('Pausable: PAUSED');

        // Unpaused
        await expect(mintingManager.unpause()).to.emit(mintingManager, 'Unpaused').withArgs(coinbase.address);

        await mintingManager.issueWithRecords(coinbase.address, ['test-pausable', 'wallet'], [], [], true);
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      });
    });
  });

  describe('Withdrawals', () => {
    before(async () => {
      [coinbase, receiver, spender] = signers;

      unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
      mintingManager = await new MintingManager__factory().connect(coinbase).deploy();
      await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

      await mintingManager.initialize(
        await unsRegistry.getAddress(),
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );

      await mintingManager.addMinter(coinbase.address);
      await mintUnsTlds(mintingManager, coinbase);
    });

    describe('withdraw(address recepient)', () => {
      it('allows to withdraw native tokens', async () => {
        const price = ethers.parseEther('4.54');
        const expiry = latestBlockTimestamp + 24 * 60 * 60;

        const labels = ['withdrawal', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const chainId = network.config.chainId;

        const purchaseHash = ethers.getBytes(
          ethers.solidityPackedKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [await mintingManager.getAddress(), chainId, receiver.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await mintingManager
          .connect(receiver)
          .buy(receiver.address, labels, [], [], expiry, price, signature, { value: price });

        expect(await ethers.provider.getBalance(await mintingManager.getAddress())).to.equal(price);

        const initialBalance = await ethers.provider.getBalance(receiver.address);

        await expect(mintingManager.connect(coinbase)['withdraw(address)'](receiver.address))
          .to.emit(mintingManager, 'Withdrawal')
          .withArgs(receiver.address, price, ZERO_ADDRESS);

        expect(await ethers.provider.getBalance(receiver.address)).to.equal(initialBalance + price);
        expect(await ethers.provider.getBalance(await mintingManager.getAddress())).to.equal(BigInt(0));
      });

      it('rejects if not owner', async () => {
        await expect(mintingManager.connect(receiver)['withdraw(address)'](ZERO_ADDRESS)).to.be.reverted;
      });

      it('rejects if not owner', async () => {
        await expect(mintingManager.connect(receiver)['withdraw(address)'](receiver.address)).to.be.revertedWith(
          'Ownable: caller is not the owner',
        );
      });
    });

    describe('withdraw(address token, address recepient)', () => {
      let erc20Mock: ERC20Mock;
      let erc20UnsafeMock: ERC20UnsafeMock;

      before(async () => {
        erc20Mock = await new ERC20Mock__factory().connect(coinbase).deploy();

        erc20UnsafeMock = await new ERC20UnsafeMock__factory().connect(coinbase).deploy();
      });

      it('allows to withdraw ERC20 tokens', async () => {
        const value = ethers.parseEther('5');
        await erc20Mock.mint(await mintingManager.getAddress(), value);

        await expect(
          mintingManager
            .connect(coinbase)
            ['withdraw(address,address)'](await erc20Mock.getAddress(), receiver.address),
        )
          .to.emit(mintingManager, 'Withdrawal')
          .withArgs(receiver.address, value, await erc20Mock.getAddress());

        expect(await erc20Mock.balanceOf(receiver.address)).to.equal(value);
      });

      it('reverts if ERC20 transfer returns false', async () => {
        const value = ethers.parseEther('5');
        await erc20UnsafeMock.mint(await mintingManager.getAddress(), value);

        await expect(
          mintingManager
            .connect(coinbase)
            ['withdraw(address,address)'](await erc20UnsafeMock.getAddress(), receiver.address),
        ).to.be.revertedWith('ERC20: LOW_LEVEL_FAIL');
      });

      it('rejects if not owner', async () => {
        await expect(
          mintingManager
            .connect(receiver)
            ['withdraw(address,address)'](await erc20Mock.getAddress(), receiver.address),
        ).to.be.revertedWith('Ownable: caller is not the owner');
      });
    });
  });
});
