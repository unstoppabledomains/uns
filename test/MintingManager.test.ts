import { ethers, network } from 'hardhat';
import { expect } from 'chai';
import namehash from 'eth-ens-namehash';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Block } from '@ethersproject/abstract-provider';
import { BigNumber } from 'ethers';
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
import { MintingManagerMock__factory, UNSRegistryMock__factory, ERC20Mock__factory } from '../types/factories/contracts/mocks';
import { CNSRegistry__factory, Resolver__factory } from '../types/factories/dot-crypto/contracts';
import {
  MintingController__factory,
  URIPrefixController__factory,
} from '../types/factories/dot-crypto/contracts/controllers';
import { ERC20UnsafeMock__factory } from '../types';
import { ZERO_ADDRESS, TLD } from './helpers/constants';
import { increaseTimeBy } from './helpers/utils';

describe('MintingManager', () => {
  const DomainNamePrefix = 'uns-devtest-';

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

  let latestBlock: Block;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;
  });

  beforeEach(async () => {
    latestBlock = await ethers.provider.getBlock('latest');
  });

  describe('Ownership', () => {
    before(async () => {
      [, , receiver] = signers;

      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();
      await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

      await mintingManager.initialize(
        unsRegistry.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
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

      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();
      cnsRegistry = await new CNSRegistry__factory(coinbase).deploy();
      unsRegistryMock = await new UNSRegistryMock__factory(coinbase).deploy();
      mintingManagerMock = await new MintingManagerMock__factory(coinbase).deploy();

      await unsRegistryMock.initialize(mintingManagerMock.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

      await mintingManagerMock.initialize(
        unsRegistryMock.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintingManagerMock.addMinter(coinbase.address);

      proxyReader = await new ProxyReader__factory(coinbase).deploy();
      await proxyReader.initialize(unsRegistryMock.address, cnsRegistry.address);

      proxyReader2 = await new ProxyReader__factory(coinbase).deploy();
      await proxyReader2.initialize(unsRegistryMock.address, cnsRegistry.address);
    });

    it('adds ProxyReader addresses', async () => {
      const labels = ['add-proxy-readers-test', 'crypto'];

      await mintingManagerMock.issueWithRecords(receiver.address, labels, [], [], true);

      const tokenId = await unsRegistryMock.namehash(labels);

      await mintingManagerMock.addProxyReaders([proxyReader.address, proxyReader2.address]);

      await mintingManagerMock.upgradeAll([tokenId]);

      await unsRegistryMock.connect(receiver).set('key', 'value', tokenId);

      const [, , result] = await proxyReader.connect(receiver).callStatic.getData(['key'], tokenId);
      const [, , result2] = await proxyReader2.callStatic.getData(['key'], tokenId);

      expect(result).to.deep.equal(['']);
      expect(result2).to.deep.equal(['']);
    });

    it('should revert if not owner', async () => {
      await expect(mintingManager.connect(signers[1]).addProxyReaders([proxyReader.address])).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });

  describe('setOperator', async () => {
    before(async () => {
      [, , receiver] = signers;

      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();
      unsOperator = await new UNSOperator__factory(coinbase).deploy();

      await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

      await mintingManager.initialize(
        unsRegistry.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintingManager.addMinter(coinbase.address);
    });

    it('saves UNSOperator address', async () => {
      await mintingManager.connect(coinbase).setOperator(unsOperator.address);

      const labels = ['uns-operator-subdomain-test', 'crypto'];
      await mintingManager.connect(coinbase).issueWithRecords(receiver.address, labels, [], [], true);

      await unsRegistry.connect(receiver).approve(unsOperator.address, await unsRegistry.namehash(labels));

      const subdomainLabels = ['sub', ...labels];

      await mintingManager.connect(coinbase).issueWithRecords(coinbase.address, subdomainLabels, [], [], false);
      const subdomainTokenId = await unsRegistry.namehash(subdomainLabels);

      expect(await unsRegistry.ownerOf(subdomainTokenId)).to.equal(coinbase.address);
    });

    it('should revert if not owner', async () => {
      await expect(mintingManager.connect(signers[1]).setOperator(unsOperator.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });

  describe('TLD management', () => {
    before(async () => {
      [, spender] = signers;

      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();
      await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

      await mintingManager.initialize(
        unsRegistry.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintingManager.addMinter(coinbase.address);
    });

    describe('addTld', async () => {
      it('should add new TLD', async () => {
        const _tld = 'test';
        const _hashname = namehash.hash(_tld);
        const labels = ['test-1', _tld];

        await expect(mintingManager.addTld(_tld, false)).to.emit(mintingManager, 'NewTld').withArgs(_hashname, _tld);

        await mintingManager.issueWithRecords(coinbase.address, labels, [], [], true);
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.exists(_hashname)).to.be.equal(true);
      });

      it('should add new expirable TLD', async () => {
        const _tld = 'dotcom';
        const _hashname = namehash.hash(_tld);
        const labels = ['test-1', _tld];

        await expect(mintingManager.addTld(_tld, true)).to.emit(mintingManager, 'NewTld').withArgs(_hashname, _tld);

        const expiry = latestBlock.timestamp + 24 * 60 * 60;
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
          expect(await unsRegistry.ownerOf(TLD[key])).to.be.equal(mintingManager.address);
        }
      });
    });

    describe('removeTld', async () => {
      it('should be able to remove existing TLD', async () => {
        const tld = 'test-removing-tld';
        const hashname = namehash.hash(tld);

        await mintingManager.addTld(tld, false);

        await expect(mintingManager.removeTld(hashname)).to.emit(mintingManager, 'RemoveTld').withArgs(hashname);
        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['sld-domain-qq', tld], [], [], true),
        ).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('should revert removing TLD when not registred', async () => {
        const hashname = namehash.hash('test-removing-tld-not-existing');

        await expect(mintingManager.removeTld(hashname)).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('should revert removing TLD when non-owner', async () => {
        const tld = 'test-removing-tld-when-not-owner';
        const hashname = namehash.hash(tld);

        await mintingManager.addTld(tld, false);

        await expect(mintingManager.connect(spender).removeTld(hashname)).to.be.revertedWith(
          'Ownable: caller is not the owner',
        );
      });
    });
  });

  describe('Claiming', () => {
    before(async () => {
      [, developer, receiver] = signers;

      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();
      await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

      await mintingManager.initialize(
        unsRegistry.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintingManager.setTokenURIPrefix('/');
    });

    beforeEach(() => {
      domainSuffix = `prefixed-domain-${Math.floor(Math.random() * 1000)}`;
    });

    describe('claim(uint256,string)', () => {
      it('should mint prefixed domain', async () => {
        await mintingManager.connect(developer).functions['claim(uint256,string)'](TLD.WALLET, domainSuffix);
        const tokenId = await unsRegistry.namehash([`${DomainNamePrefix}${domainSuffix}`, 'wallet']);

        expect(await unsRegistry.tokenURI(tokenId)).to.be.equal(`/${tokenId}`);
      });

      it('should send domain to requester', async () => {
        await mintingManager.connect(developer).functions['claim(uint256,string)'](TLD.WALLET, domainSuffix);
        const tokenId = await unsRegistry.namehash([`${DomainNamePrefix}${domainSuffix}`, 'wallet']);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(developer.address);
      });

      it('should revert minting same domain twice', async () => {
        const minter = mintingManager.connect(developer);
        await minter.functions['claim(uint256,string)'](TLD.WALLET, domainSuffix);

        await expect(minter.functions['claim(uint256,string)'](TLD.WALLET, domainSuffix)).to.be.revertedWith(
          'MintingManager: TOKEN_BLOCKED',
        );
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager.connect(developer).functions['claim(uint256,string)'](TLD.WALLET, 'udtestdev-t1'),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });

      it('should revert minting an expirable domain', async () => {
        await expect(
          mintingManager.connect(developer).functions['claim(uint256,string)'](TLD.COM, 'udtestdev-t1-expirable'),
        ).to.be.revertedWith('MintingManager: TLD_EXPIRABLE_MISMATCH');
      });
    });

    describe('claimTo(address,uint256,string)', () => {
      it('should mint domain to receiver', async () => {
        await mintingManager
          .connect(developer)
          .functions['claimTo(address,uint256,string)'](receiver.address, TLD.WALLET, domainSuffix);
        const tokenId = await unsRegistry.namehash([`${DomainNamePrefix}${domainSuffix}`, 'wallet']);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager
            .connect(developer)
            .functions['claimTo(address,uint256,string)'](receiver.address, TLD.CRYPTO, 'udtestdev-t2'),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });

      it('should revert minting an expirable domain', async () => {
        await expect(
          mintingManager
            .connect(developer)
            .functions['claimTo(address,uint256,string)'](receiver.address, TLD.COM, 'udtestdev-t2-expirable'),
        ).to.be.revertedWith('MintingManager: TLD_EXPIRABLE_MISMATCH');
      });
    });

    describe('claimToWithRecords(address,uint256,string,string[],string[])', () => {
      const selector = 'claimToWithRecords(address,uint256,string,string[],string[])';

      it('should mint domain to receiver with predefined keys', async () => {
        const minter = mintingManager.connect(developer);
        await minter.functions[selector](receiver.address, TLD.WALLET, domainSuffix, ['key'], ['value']);
        const tokenId = await unsRegistry.namehash([`${DomainNamePrefix}${domainSuffix}`, 'wallet']);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
        expect(await unsRegistry.getMany(['key'], tokenId)).to.be.eql(['value']);
      });

      it('should mint domain with empty keys', async () => {
        const minter = mintingManager.connect(developer);
        await minter.functions[selector](receiver.address, TLD.WALLET, domainSuffix, [], []);
        const tokenId = await unsRegistry.namehash([`${DomainNamePrefix}${domainSuffix}`, 'wallet']);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
        expect(await unsRegistry.getMany(['key1', 'key2'], tokenId)).to.be.eql(['', '']);
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager.connect(developer).functions[selector](receiver.address, TLD.CRYPTO, 'udtestdev-t3', [], []),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });

      it('should revert minting an expirable domain', async () => {
        await expect(
          mintingManager
            .connect(developer)
            .functions['claimTo(address,uint256,string)'](receiver.address, TLD.COM, 'udtestdev-t2-expirable'),
        ).to.be.revertedWith('MintingManager: TLD_EXPIRABLE_MISMATCH');
      });
    });
  });

  describe('Minting', () => {
    before(async () => {
      [, , receiver, spender] = signers;

      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      unsOperator = await new UNSOperator__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();

      await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

      await mintingManager.initialize(
        unsRegistry.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        unsOperator.address,
        ZERO_ADDRESS,
      );
      await mintingManager.addMinter(coinbase.address);
      await mintingManager.setTokenURIPrefix('/');

      mintingManagerMock = await new MintingManagerMock__factory(coinbase).deploy();
      unsRegistryMock = await new UNSRegistryMock__factory(coinbase).deploy();

      await unsRegistryMock.initialize(mintingManagerMock.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
      await mintingManagerMock.initialize(
        unsRegistryMock.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );

      await mintingManagerMock.addMinter(coinbase.address);
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

    describe('mint subdomain', () => {
      it('should revert minting when account is not the SLD owner', async () => {
        const labels = ['test-1sub', 'wallet'];

        await mintingManager.connect(coinbase).issueWithRecords(coinbase.address, labels, [], [], true);

        labels.unshift('sub');

        await expect(
          mintingManager.connect(receiver).issueWithRecords(coinbase.address, labels, [], [], true),
        ).to.be.revertedWith('MintingManager: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('should mint when account is minter and parent domain is approved for UNSOperator', async () => {
        const labels = ['test-1sub-operator', 'wallet'];

        await mintingManager.connect(coinbase).issueWithRecords(receiver.address, labels, [], [], true);
        const parentTokenId = await unsRegistry.namehash(labels);

        await unsRegistry.connect(receiver).approve(unsOperator.address, parentTokenId);

        const subdomainLabels = ['sub', ...labels];
        const tokenId = await unsRegistry.namehash(subdomainLabels);

        await mintingManager.connect(coinbase).issueWithRecords(receiver.address, subdomainLabels, [], [], true);

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(receiver.address);
      });

      it('should revert when domain is approved for UNSOperator and account is not owner or minter', async () => {
        const labels = ['test-1sub-operator2', 'wallet'];

        await mintingManager.connect(coinbase).issueWithRecords(receiver.address, labels, [], [], true);
        const parentTokenId = await unsRegistry.namehash(labels);

        await unsRegistry.connect(receiver).approve(unsOperator.address, parentTokenId);

        labels.unshift('sub');

        await expect(
          mintingManager.connect(spender).issueWithRecords(receiver.address, labels, [], [], true),
        ).to.be.revertedWith('MintingManager: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('should mint when account is owner and parent domain is approved for UNSOperator', async () => {
        const labels = ['test-1sub-operator3', 'wallet'];

        await mintingManager.connect(coinbase).issueWithRecords(receiver.address, labels, [], [], true);
        const parentTokenId = await unsRegistry.namehash(labels);

        await unsRegistry.connect(receiver).approve(unsOperator.address, parentTokenId);

        const subdomainLabels = ['sub', ...labels];
        const tokenId = await unsRegistry.namehash(subdomainLabels);

        await mintingManager.connect(receiver).issueWithRecords(receiver.address, subdomainLabels, [], [], true);

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(receiver.address);
      });

      it('should mint .wallet subdomain', async () => {
        const labels = ['test-1sub2', 'wallet'];
        await mintingManager.connect(coinbase).issueWithRecords(coinbase.address, labels, [], [], true);

        labels.unshift('sub');

        await mintingManager.connect(coinbase).issueWithRecords(receiver.address, labels, [], [], false);
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
      });

      it('should mint .crypto subdomain in UNS registry when CNS registry undefined', async () => {
        const labels = ['test-1sub3', 'crypto'];

        await mintingManager.connect(coinbase).issueWithRecords(coinbase.address, labels, [], [], true);

        labels.unshift('sub');

        await mintingManager.connect(coinbase).issueWithRecords(receiver.address, labels, [], [], false);
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
      });

      it('should mint subdomain by a token operator', async () => {
        const labels = ['test-10sub-2', 'wallet'];

        const tokenId = await unsRegistry.namehash(labels);
        await mintingManager.connect(coinbase).issueWithRecords(coinbase.address, labels, [], [], false);
        await unsRegistry.connect(coinbase).approve(receiver.address, tokenId);

        labels.unshift('sub');

        await mintingManager.connect(receiver).issueWithRecords(receiver.address, labels, [], [], false);

        const subTokenId = await unsRegistry.namehash(labels);
        expect(await unsRegistry.ownerOf(subTokenId)).to.be.equal(receiver.address);
      });

      it('should mint subdomain by an operator', async () => {
        const labels = ['test-11sub-2', 'wallet'];

        await mintingManager.connect(coinbase).issueWithRecords(coinbase.address, labels, [], [], false);
        await unsRegistry.connect(coinbase).setApprovalForAll(receiver.address, true);

        labels.unshift('sub');

        await mintingManager.connect(receiver).issueWithRecords(receiver.address, labels, [], [], false);

        const subTokenId = await unsRegistry.namehash(labels);
        expect(await unsRegistry.ownerOf(subTokenId)).to.be.equal(receiver.address);
      });

      it('reverts when minting subdomain with reverse record to not parent domain owner', async () => {
        const labels = ['test-221', 'wallet'];
        await mintingManager.connect(coinbase).issueWithRecords(coinbase.address, labels, [], [], false);

        labels.unshift('sub');
        await expect(
          mintingManager.connect(coinbase).issueWithRecords(receiver.address, labels, [], [], true),
        ).to.be.revertedWith('MintingManager: REVERSE_RECORD_NOT_ALLOWED');
      });

      it('reverts minting subdomain if parent is upgraded', async () => {
        const labels = ['test-222x', 'wallet'];
        await mintingManagerMock.connect(coinbase).issueWithRecords(receiver.address, labels, [], [], false);

        await mintingManagerMock.connect(coinbase).upgradeAll([
          await unsRegistry.namehash(labels),
        ]);

        labels.unshift('sub');

        await expect(
          mintingManagerMock.connect(receiver).issueWithRecords(receiver.address, labels, [], [], true),
        ).to.be.revertedWith('Registry: TOKEN_UPGRADED');
      });

      it('should mint subdomain with reverse record', async () => {
        const labels = ['test-222', 'wallet'];
        await mintingManager.connect(coinbase).issueWithRecords(spender.address, labels, [], [], false);

        labels.unshift('sub');
        await mintingManager.connect(spender).issueWithRecords(spender.address, labels, [], [], true);

        const tokenId = await unsRegistry.namehash(labels);
        expect(await unsRegistry.reverseOf(spender.address)).to.be.equal(tokenId);
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
        await mintingManager.issueWithRecords(coinbase.address, ['test1', 'x'], [], [], true);

        for (const label of labels) {
          if (label) {
            await expect(
              mintingManager.issueWithRecords(coinbase.address, [label, 'test1', 'x'], [], [], true),
            ).to.be.revertedWith('MintingManager: LABEL_INVALID');
          }
          await expect(mintingManager.claim(TLD.X, label)).to.be.revertedWith('MintingManager: LABEL_INVALID');
          await expect(mintingManager.claimTo(coinbase.address, TLD.X, label)).to.be.revertedWith(
            'MintingManager: LABEL_INVALID',
          );
          await expect(mintingManager.claimToWithRecords(coinbase.address, TLD.X, label, [], [])).to.be.revertedWith(
            'MintingManager: LABEL_INVALID',
          );
        }
      });

      it('should allow to mint domains with valid labels', async () => {
        const labels = ['q', '1', 'q1', '1q', '1-q', 'qwerty', 'qw-erty', 'qw3rty', 'qw3-rty1', 'test-test1-test2'];
        await mintingManager.issueWithRecords(coinbase.address, ['test2', 'x'], [], [], false);

        for (const label of labels) {
          const domainLabels = [label, 'x'];
          const subdomainLabels = [label, 'test2', 'x'];
          await mintingManager.issueWithRecords(coinbase.address, domainLabels, [], [], true);
          await mintingManager.issueWithRecords(coinbase.address, subdomainLabels, [], [], true);

          const domainTokenId = await unsRegistry.namehash(domainLabels);
          expect(await unsRegistry.ownerOf(domainTokenId)).to.be.equal(coinbase.address);

          const subdomainTkenId = await unsRegistry.namehash(domainLabels);
          expect(await unsRegistry.ownerOf(subdomainTkenId)).to.be.equal(coinbase.address);
        }
      });
    });
  });

  describe('Purchases', () => {
    let snapshot: unknown;

    const chainId = network.config.chainId;

    before(async () => {
      [coinbase, spender, receiver] = signers;

      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();

      await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
      await mintingManager.initialize(
        unsRegistry.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );

      await mintingManager.addMinter(coinbase.address);
      await mintingManager.setTokenURIPrefix('/');
    });

    beforeEach(async () => {
      snapshot = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async () => {
      await ethers.provider.send('evm_revert', [snapshot]);
    });

    describe('With native tokens', async () => {
      it('is possible to buy a domain and set records', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;
        const price = ethers.utils.parseEther('2.21');

        const labels = ['test-onchain-purchase', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, receiver.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager.connect(spender).buy(
            receiver.address,
            labels,
            ['key'], ['value'],
            expiry,
            price,
            signature,
            { value: price },
          ),
        ).to.emit(mintingManager, 'DomainPurchase')
          .withArgs(tokenId, spender.address, receiver.address, price, ZERO_ADDRESS);

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(receiver.address);
        expect(await unsRegistry.get('key', tokenId)).to.equal('value');
        expect(await unsRegistry.reverseOf(receiver.address)).to.equal(0);

        expect(await ethers.provider.getBalance(mintingManager.address)).to.equal(price);
      });

      it('is possible to buy a returned domain', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;
        const price = ethers.utils.parseEther('2.21');

        const labels = ['test-onchain-purchase-returned', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        await mintingManager.connect(coinbase).issueWithRecords(
          spender.address,
          labels,
          [], [],
          false,
        );
        await unsRegistry.connect(spender).setOwner(mintingManager.address, tokenId);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await mintingManager.connect(spender).buy(
          spender.address,
          labels,
          [], [],
          expiry,
          price,
          signature,
          { value: price },
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(spender.address);
        expect(await unsRegistry.reverseOf(spender.address)).to.equal(tokenId);

        expect(await ethers.provider.getBalance(mintingManager.address)).to.equal(price);
      });

      it('does not set reverse resolution if already set', async () => {
        const reverseLabels = ['reverse', 'x'];
        await mintingManager.connect(coinbase).issueWithRecords(
          spender.address,
          reverseLabels,
          [], [],
          true,
        );
        const reverseTokenId = await unsRegistry.namehash(reverseLabels);

        const expiry = latestBlock.timestamp + 24 * 60 * 60;
        const price = ethers.utils.parseEther('1');

        const labels = ['test-onchain-purchase-reverse-overwrite', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await mintingManager.connect(spender).buy(
          spender.address,
          labels,
          [], [],
          expiry,
          price,
          signature,
          { value: price },
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(spender.address);
        expect(await unsRegistry.reverseOf(spender.address)).to.equal(reverseTokenId);
        expect(await ethers.provider.getBalance(mintingManager.address)).to.equal(price);
      });

      it('does not set reverse resolution if sender is not owner', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;
        const price = ethers.utils.parseEther('1');

        const labels = ['test-onchain-purchase-reverse-not-owner', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, receiver.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await mintingManager.connect(spender).buy(
          receiver.address,
          labels,
          [], [],
          expiry,
          price,
          signature,
          { value: price },
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(receiver.address);
        expect(await unsRegistry.reverseOf(spender.address)).to.equal(0);
        expect(await ethers.provider.getBalance(mintingManager.address)).to.equal(price);
      });

      it('returns cost excess to user', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('1');
        const excess = ethers.utils.parseEther('0.5');

        const initialBalance = await spender.getBalance();

        const labels = ['test-onchain-purchase1', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        const tx = await mintingManager.connect(spender).buy(
          spender.address,
          labels,
          [], [],
          expiry,
          price,
          signature,
          { value: price.add(excess) },
        );
        const receipt = await tx.wait();
        const txFee = receipt.effectiveGasPrice.mul(receipt.gasUsed);

        expect(await spender.getBalance()).to.equal(initialBalance.sub(txFee).sub(price));

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(spender.address);
        expect(await ethers.provider.getBalance(mintingManager.address)).to.equal(price);
      });

      it('reverts if no tokens sent', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('1');

        const labels = ['test-onchain-purchase2', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager.connect(spender).buy(
            spender.address,
            labels,
            [], [],
            expiry,
            price,
            signature,
          ),
        ).to.be.revertedWith('MintingManager: NOT_ENOUGH_FUNDS');
      });

      it('reverts if not enough tokens sent', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('1');

        const labels = ['test-onchain-purchase1', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager.connect(spender).buy(
            spender.address,
            labels,
            [], [],
            expiry,
            price,
            signature,
            { value: price.sub(BigNumber.from(1)) },
          ),
        ).to.be.revertedWith('MintingManager: NOT_ENOUGH_FUNDS');
      });

      it('does not allow to purchase a subdomain', async () => {
        const parentLabels = ['owned-parent', 'x'];
        await mintingManager.connect(coinbase).issueWithRecords(
          receiver.address,
          parentLabels,
          [], [],
          true,
        );

        const expiry = latestBlock.timestamp + 24 * 60 * 60;
        const price = ethers.utils.parseEther('1');

        const labels = ['sub', ...parentLabels];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, receiver.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager.connect(spender).buy(
            receiver.address,
            labels,
            [], [],
            expiry,
            price,
            signature,
            { value: price },
          ),
        ).to.be.revertedWith('MintingManager: SUBDOMAINS_NOT_ALLOWED');
      });

      it('reverts if domain labels invalid', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('1');

        const labels = ['-invalid-domain', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager.connect(spender).buy(
            spender.address,
            labels,
            [], [],
            expiry,
            price,
            signature,
            { value: price },
          ),
        ).to.be.revertedWith('MintingManager: LABEL_INVALID');
      });

      it('reverts if TLD does not exist', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('1');

        const labels = ['domain', 'notexistingawesometld'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager.connect(spender).buy(
            spender.address,
            labels,
            [], [],
            expiry,
            price,
            signature,
            { value: price },
          ),
        ).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('reverts if is a free CNS domain ', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('1');

        const labels = ['udtestdev-tx', 'crypto'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager.connect(spender).buy(
            spender.address,
            labels,
            [], [],
            expiry,
            price,
            signature,
            { value: price },
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });

      it('reverts if signature expired', async () => {
        const expiry = latestBlock.timestamp - 60;

        const price = ethers.utils.parseEther('1');

        const labels = ['expired-purchase', 'crypto'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager.connect(spender).buy(
            spender.address,
            labels,
            [], [],
            expiry,
            price,
            signature,
            { value: price },
          ),
        ).to.be.revertedWith('MintingManager: EXPIRED_SIGNATURE');
      });

      it('reverts if signer is not minter', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('1');

        const labels = ['invalid-signer', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await spender.signMessage(purchaseHash);

        await expect(
          mintingManager.connect(spender).buy(
            spender.address,
            labels,
            [], [],
            expiry,
            price,
            signature,
            { value: price },
          ),
        ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
      });

      it('reverts if signed data doesnt match the signature', async () => {
        const expiry = latestBlock.timestamp - 60;

        const price = ethers.utils.parseEther('1');

        const labels = ['invalid-signed-data', 'x'];
        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, BigNumber.from(1), expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await spender.signMessage(purchaseHash);

        await expect(
          mintingManager.connect(spender).buy(
            spender.address,
            labels,
            [], [],
            expiry,
            price,
            signature,
            { value: price },
          ),
        ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
      });

      it('reverts if signed MintingManager address is wrong', async () => {
        const anotherUnsRegistry = await new UNSRegistry__factory(coinbase).deploy();
        const anotherMintingManager = await new MintingManager__factory(coinbase).deploy();

        await anotherUnsRegistry.initialize(anotherMintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
        await anotherMintingManager.initialize(
          anotherUnsRegistry.address,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
        );
        await anotherMintingManager.addMinter(coinbase.address);
        await anotherMintingManager.setTokenURIPrefix('/');

        const expiry = latestBlock.timestamp + 24 * 60 * 60;
        const price = ethers.utils.parseEther('1');

        const labels = ['invalid-minting-manager-addr', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          anotherMintingManager.connect(spender).buy(
            spender.address,
            labels,
            [], [],
            expiry,
            price,
            signature,
            { value: price },
          ),
        ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
      });

      it('reverts if signed chainId is wrong', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;
        const price = ethers.utils.parseEther('1');

        const labels = ['invalid-chainid', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, 1, spender.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager.connect(spender).buy(
            spender.address,
            labels,
            [], [],
            expiry,
            price,
            signature,
            { value: price },
          ),
        ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
      });

      it('reverts if TLD is expirable', async () => {
        const requestExpiry = latestBlock.timestamp + 24 * 60 * 60;
        const price = ethers.utils.parseEther('2.21');

        const labels = ['expirable-onchain-purchase-test', 'com'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, receiver.address, tokenId, requestExpiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager.connect(spender).buy(
            receiver.address,
            labels,
            [], [],
            requestExpiry,
            price,
            signature,
            { value: price },
          ),
        ).to.be.revertedWith('MintingManager: TLD_EXPIRABLE_MISMATCH');
      });
    });

    describe('With ERC20', () => {
      let erc20Mock: ERC20Mock;
      let erc20UnsafeMock: ERC20UnsafeMock;

      before(async () => {
        erc20Mock = await new ERC20Mock__factory(coinbase).deploy();
        await erc20Mock.mint(spender.address, ethers.utils.parseEther('100'));

        erc20UnsafeMock = await new ERC20UnsafeMock__factory(coinbase).deploy();
        await erc20UnsafeMock.mint(spender.address, ethers.utils.parseEther('100'));
      });

      it('is possibe to buy a domain with ERC20 token', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('5');

        const labels = ['test-erc20-onchain-purchase', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, receiver.address, tokenId, expiry, price, erc20Mock.address],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(mintingManager.address, price);

        await expect(
          mintingManager.connect(spender).buyForErc20(
            receiver.address,
            labels,
            ['key'], ['value'],
            expiry,
            erc20Mock.address,
            price,
            signature,
          ),
        ).to.emit(mintingManager, 'DomainPurchase')
          .withArgs(tokenId, spender.address, receiver.address, price, erc20Mock.address);

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(receiver.address);
        expect(await unsRegistry.get('key', tokenId)).to.equal('value');
        expect(await unsRegistry.reverseOf(receiver.address)).to.equal(0);

        expect(await erc20Mock.balanceOf(mintingManager.address)).to.equal(price);
      });

      it('is possible to buy a returned domain with ERC20 tokens', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;
        const price = ethers.utils.parseEther('0.3');

        const labels = ['test-onchain-purchase-returned-erc20', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        await mintingManager.connect(coinbase).issueWithRecords(
          spender.address,
          labels,
          [], [],
          false,
        );
        await unsRegistry.connect(spender).setOwner(mintingManager.address, tokenId);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, erc20Mock.address],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(mintingManager.address, price);

        await mintingManager.connect(spender).buyForErc20(
          spender.address,
          labels,
          [], [],
          expiry,
          erc20Mock.address,
          price,
          signature,
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(spender.address);
        expect(await unsRegistry.reverseOf(spender.address)).to.equal(tokenId);

        expect(await erc20Mock.balanceOf(mintingManager.address)).to.equal(price);
      });

      it('does not set reverse resolution if already set', async () => {
        const reverseLabels = ['reverse', 'x'];
        await mintingManager.connect(coinbase).issueWithRecords(
          spender.address,
          reverseLabels,
          [], [],
          true,
        );
        const reverseTokenId = await unsRegistry.namehash(reverseLabels);

        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('5');

        const labels = ['erc20-onchain-purchase-reverse', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, erc20Mock.address],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(mintingManager.address, price);

        await mintingManager.connect(spender).buyForErc20(
          spender.address,
          labels,
          [], [],
          expiry,
          erc20Mock.address,
          price,
          signature,
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(spender.address);
        expect(await unsRegistry.reverseOf(spender.address)).to.equal(reverseTokenId);

        expect(await erc20Mock.balanceOf(mintingManager.address)).to.equal(price);
      });

      it('does not set reverse resolution if sender is not owner', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;
        const price = ethers.utils.parseEther('5');

        const labels = ['erc20-onchain-purchase-reverse-not-owner', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, receiver.address, tokenId, expiry, price, erc20Mock.address],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(mintingManager.address, price);

        await mintingManager.connect(spender).buyForErc20(
          receiver.address,
          labels,
          [], [],
          expiry,
          erc20Mock.address,
          price,
          signature,
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.equal(receiver.address);
        expect(await unsRegistry.reverseOf(spender.address)).to.equal(0);
        expect(await erc20Mock.balanceOf(mintingManager.address)).to.equal(price);
      });

      it('reverts if no ERC20 tokens approved', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('5');

        const labels = ['test-erc20-onchain-purchase', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, erc20Mock.address],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager.connect(spender).buyForErc20(
            spender.address,
            labels,
            ['key'], ['value'],
            expiry,
            erc20Mock.address,
            price,
            signature,
          ),
        ).to.be.revertedWith('ERC20: insufficient allowance');
      });

      it('reverts if ERC20 allowance is too low', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('5');

        const labels = ['test-erc20-onchain-purchase', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, erc20Mock.address],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(mintingManager.address, ethers.utils.parseEther('1'));

        await expect(
          mintingManager.connect(spender).buyForErc20(
            spender.address,
            labels,
            [], [],
            expiry,
            erc20Mock.address,
            price,
            signature,
          ),
        ).to.be.revertedWith('ERC20: insufficient allowance');
      });

      it('does not allow to purchase a subdomain with ERC20 tokens', async () => {
        const parentLabels = ['owned-parent-erc20-test', 'x'];
        await mintingManager.connect(coinbase).issueWithRecords(
          receiver.address,
          parentLabels,
          [], [],
          true,
        );

        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('5');

        const labels = ['sub', ...parentLabels];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, erc20Mock.address],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(mintingManager.address, price);

        await expect(
          mintingManager.connect(spender).buyForErc20(
            spender.address,
            labels,
            [], [],
            expiry,
            erc20Mock.address,
            price,
            signature,
          ),
        ).to.be.revertedWith('MintingManager: SUBDOMAINS_NOT_ALLOWED');
      });

      it('reverts if domain labels invalid', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('5');

        const labels = ['-invalid-domain', 'nft'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, erc20Mock.address],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(mintingManager.address, price);

        await expect(
          mintingManager.connect(spender).buyForErc20(
            spender.address,
            labels,
            [], [],
            expiry,
            erc20Mock.address,
            price,
            signature,
          ),
        ).to.be.revertedWith('MintingManager: LABEL_INVALID');
      });

      it('reverts if TLD does not exist', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('5');

        const labels = ['domain', 'awesometld'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, erc20Mock.address],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(mintingManager.address, price);

        await expect(
          mintingManager.connect(spender).buyForErc20(
            spender.address,
            labels,
            [], [],
            expiry,
            erc20Mock.address,
            price,
            signature,
          ),
        ).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('reverts if signature expired', async () => {
        const expiry = latestBlock.timestamp - 60;

        const price = ethers.utils.parseEther('5');

        const labels = ['expired-erc20-purchase', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, erc20Mock.address],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(mintingManager.address, price);

        await expect(
          mintingManager.connect(spender).buyForErc20(
            spender.address,
            labels,
            [], [],
            expiry,
            erc20Mock.address,
            price,
            signature,
          ),
        ).to.be.revertedWith('MintingManager: EXPIRED_SIGNATURE');
      });

      it('reverts if signer is not minter', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('5');

        const labels = ['expired-erc20-purchase', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, erc20Mock.address],
          ),
        );
        const signature = await spender.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(mintingManager.address, price);

        await expect(
          mintingManager.connect(spender).buyForErc20(
            spender.address,
            labels,
            [], [],
            expiry,
            erc20Mock.address,
            price,
            signature,
          ),
        ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
      });

      it('reverts if signed data doesnt match the signature', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('5');

        const labels = ['expired-erc20-purchase', 'x'];
        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, BigNumber.from(1), expiry, price, erc20Mock.address],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(mintingManager.address, price);

        await expect(
          mintingManager.connect(spender).buyForErc20(
            spender.address,
            labels,
            [], [],
            expiry,
            erc20Mock.address,
            price,
            signature,
          ),
        ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
      });

      it('reverts if ERC20 transfer returns false', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;
        const price = ethers.utils.parseEther('5');

        const labels = ['test-erc20-onchain-purchase-unsafe', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, erc20UnsafeMock.address],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20UnsafeMock.connect(spender).approve(mintingManager.address, price);

        await expect(
          mintingManager.connect(spender).buyForErc20(
            spender.address,
            labels,
            [], [],
            expiry,
            erc20UnsafeMock.address,
            price,
            signature,
          ),
        ).to.be.revertedWith('ERC20: LOW_LEVEL_FAIL');
      });

      it('reverts if signed MintingManager address is wrong', async () => {
        const anotherUnsRegistry = await new UNSRegistry__factory(coinbase).deploy();
        const anotherMintingManager = await new MintingManager__factory(coinbase).deploy();

        await anotherUnsRegistry.initialize(anotherMintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
        await anotherMintingManager.initialize(
          anotherUnsRegistry.address,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
        );
        await anotherMintingManager.addMinter(coinbase.address);
        await anotherMintingManager.setTokenURIPrefix('/');

        const expiry = latestBlock.timestamp + 24 * 60 * 60;
        const price = ethers.utils.parseEther('1');

        const labels = ['invalid-minting-manager-addr-erc20', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        await erc20Mock.connect(spender).approve(mintingManager.address, price);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, spender.address, tokenId, expiry, price, erc20Mock.address],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          anotherMintingManager.connect(spender).buyForErc20(
            spender.address,
            labels,
            [], [],
            expiry,
            erc20Mock.address,
            price,
            signature,
          ),
        ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
      });

      it('reverts if signed chainId is wrong', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;
        const price = ethers.utils.parseEther('1');

        const labels = ['invalid-chainid-erc20', 'x'];
        const tokenId = await unsRegistry.namehash(labels);

        await erc20Mock.connect(spender).approve(mintingManager.address, price);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, 1, spender.address, tokenId, expiry, price, erc20Mock.address],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await expect(
          mintingManager.connect(spender).buyForErc20(
            spender.address,
            labels,
            [], [],
            expiry,
            erc20Mock.address,
            price,
            signature,
          ),
        ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
      });

      it('reverts if TLD is expirable', async () => {
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const price = ethers.utils.parseEther('5');

        const labels = ['expirable-erc20-on-chain-purchase', 'com'];
        const tokenId = await unsRegistry.namehash(labels);

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, receiver.address, tokenId, expiry, price, erc20Mock.address],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await erc20Mock.connect(spender).approve(mintingManager.address, price);

        await expect(
          mintingManager.connect(spender).buyForErc20(
            receiver.address,
            labels,
            [], [],
            expiry,
            erc20Mock.address,
            price,
            signature,
          ),
        ).to.be.revertedWith('MintingManager: TLD_EXPIRABLE_MISMATCH');
      });
    });
  });

  describe('Tld-based minting', () => {
    before(async () => {
      [coinbase, spender, receiver] = signers;

      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();

      cnsRegistry = await new CNSRegistry__factory(coinbase).deploy();
      mintingController = await new MintingController__factory(coinbase).deploy(cnsRegistry.address);
      await cnsRegistry.addController(mintingController.address);

      resolver = await new Resolver__factory(coinbase).deploy(cnsRegistry.address, mintingController.address);

      uriPrefixController = await new URIPrefixController__factory(coinbase).deploy(cnsRegistry.address);
      await cnsRegistry.addController(uriPrefixController.address);

      mintingManager = await new MintingManager__factory(coinbase).deploy();
      await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

      await mintingController.addMinter(mintingManager.address);
      await uriPrefixController.addWhitelisted(mintingManager.address);

      await mintingManager.initialize(
        unsRegistry.address,
        mintingController.address,
        uriPrefixController.address,
        resolver.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintingManager.addMinter(coinbase.address);
      await mintingManager.setTokenURIPrefix('/');
    });

    it('should have registered all tlds', async () => {
      Object.values(TLD).forEach(async (tld) => {
        expect(await unsRegistry.exists(tld)).to.be.equal(true);
      });
    });

    describe('claim(uint256,string)', () => {
      it('should claim .crypto domain in CNS registry', async () => {
        await mintingManager['claim(uint256,string)'](TLD.CRYPTO, 'test-c221');

        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, `${DomainNamePrefix}test-c221`);
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: invalid token ID');

        expect(await cnsRegistry.tokenURI(tokenId)).to.be.eql('/uns-devtest-test-c221.crypto');
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
      });

      it('should claim .wallet domain in UNS registry', async () => {
        await mintingManager['claim(uint256,string)'](TLD.WALLET, 'test-c029');

        const tokenId = await cnsRegistry.childIdOf(TLD.WALLET, `${DomainNamePrefix}test-c029`);
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await unsRegistry.tokenURI(tokenId)).to.be.equal(`/${tokenId}`);
      });
    });

    describe('claimTo(address,uint256,string)', () => {
      it('should claim .crypto domain in CNS registry', async () => {
        await mintingManager['claimTo(address,uint256,string)'](coinbase.address, TLD.CRYPTO, 'test-cd983');

        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, `${DomainNamePrefix}test-cd983`);
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: invalid token ID');

        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
      });

      it('should claim .wallet domain in UNS registry', async () => {
        await mintingManager['claimTo(address,uint256,string)'](coinbase.address, TLD.WALLET, 'test-cdsi47');

        const tokenId = await cnsRegistry.childIdOf(TLD.WALLET, `${DomainNamePrefix}test-cdsi47`);
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
      });
    });

    describe('claimToWithRecords(address,uint256,string,string[],string[])', () => {
      const selector = 'claimToWithRecords(address,uint256,string,string[],string[])';

      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager[selector](coinbase.address, TLD.CRYPTO, 'test-c039', ['key1'], ['value3']);

        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, `${DomainNamePrefix}test-c039`);
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: invalid token ID');

        expect(await resolver.get('key1', tokenId)).to.be.eql('value3');
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
      });

      it('should claim with records .wallet domain in UNS registry', async () => {
        await mintingManager[selector](coinbase.address, TLD.WALLET, 'test-c846', ['key9'], ['value2']);

        const tokenId = await cnsRegistry.childIdOf(TLD.WALLET, `${DomainNamePrefix}test-c846`);
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await unsRegistry.get('key9', tokenId)).to.be.eql('value2');
      });
    });

    describe('issueWithRecords(address,string[],string[],string[],bool)', () => {
      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager.issueWithRecords(coinbase.address, ['test-m110-2', 'crypto'], ['key1'], ['value1'], true);

        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, 'test-m110-2');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: invalid token ID');

        expect(await resolver.get('key1', tokenId)).to.be.eql('value1');
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
      });

      it('should mint with records .wallet domain in UNS registry', async () => {
        await mintingManager.issueWithRecords(
          coinbase.address,
          ['test-mcm332-2', 'wallet'],
          ['key1'],
          ['value1'],
          true,
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.WALLET, 'test-mcm332-2');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await unsRegistry.get('key1', tokenId)).to.be.eql('value1');
      });

      it('should issue with records returned .wallet domains in UNS registry', async () => {
        const labels = ['returned1-2', 'wallet'];
        await mintingManager.issueWithRecords(signers[2].address, labels, ['key1'], ['value1'], true);
        const tokenId = await unsRegistry.namehash(labels);

        const labelsSub = ['sub', 'returned1-2', 'wallet'];

        await mintingManager
          .connect(signers[2])
          .issueWithRecords(signers[2].address, labelsSub, ['key1'], ['value1'], true);

        const tokenIdSub = await unsRegistry.namehash(labelsSub);

        await unsRegistry.connect(signers[2]).setOwner(mintingManager.address, tokenIdSub);
        await unsRegistry.connect(signers[2]).setOwner(mintingManager.address, tokenId);

        await mintingManager.issueWithRecords(signers[1].address, labels, ['key1'], ['value2'], true);
        expect(await unsRegistry.ownerOf(tokenId)).to.be.eql(signers[1].address);
        expect(await unsRegistry.get('key1', tokenId)).to.be.eql('value2');
        expect(await unsRegistry.reverseOf(signers[1].address)).to.be.equal(tokenId);

        await mintingManager
          .connect(signers[1])
          .issueWithRecords(signers[1].address, labelsSub, ['key1'], ['value2'], true);

        expect(await unsRegistry.ownerOf(tokenIdSub)).to.be.eql(signers[1].address);
        expect(await unsRegistry.get('key1', tokenIdSub)).to.be.eql('value2');
        expect(await unsRegistry.reverseOf(signers[1].address)).to.be.equal(tokenId);
      });

      it('should issue with records but without reverse returned .wallet domains in UNS registry', async () => {
        const labels = ['returned-reverse-1', 'wallet'];
        await mintingManager.issueWithRecords(signers[2].address, labels, ['key1'], ['value1'], true);
        const tokenId = await unsRegistry.namehash(labels);

        const labelsSub = ['sub', 'returned-reverse-1', 'wallet'];

        await mintingManager
          .connect(signers[2])
          .issueWithRecords(signers[2].address, labelsSub, ['key1'], ['value1'], true);

        const tokenIdSub = await unsRegistry.namehash(labelsSub);

        await unsRegistry.connect(signers[2]).setOwner(mintingManager.address, tokenIdSub);
        await unsRegistry.connect(signers[2]).setOwner(mintingManager.address, tokenId);

        await unsRegistry.connect(signers[1]).removeReverse();

        await mintingManager.issueWithRecords(signers[1].address, labels, ['key1'], ['value2'], false);
        expect(await unsRegistry.ownerOf(tokenId)).to.be.eql(signers[1].address);
        expect(await unsRegistry.get('key1', tokenId)).to.be.eql('value2');
        expect(await unsRegistry.reverseOf(signers[1].address)).to.be.equal(0);

        await mintingManager
          .connect(signers[1])
          .issueWithRecords(signers[1].address, labelsSub, ['key1'], ['value2'], true);

        expect(await unsRegistry.ownerOf(tokenIdSub)).to.be.eql(signers[1].address);
        expect(await unsRegistry.get('key1', tokenIdSub)).to.be.eql('value2');
        expect(await unsRegistry.reverseOf(signers[1].address)).to.be.equal(tokenIdSub);
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
        if(!(await unsRegistry.reverseOf(receiver.address)).eq(0)) {
          await unsRegistry.connect(receiver).removeReverse();
        }
      });

      it('should mint expirable .com with records and reverse', async () => {
        const labels = ['expirable-test-a1', 'com'];
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        await mintingManager.connect(coinbase).issueExpirableWithRecords(
          receiver.address,
          labels,
          ['key1'],
          ['value1'],
          expiry,
          true,
        );
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(receiver.address);
        expect(await unsRegistry.get('key1', tokenId)).to.eq('value1');
        expect(await unsRegistry.reverseOf(receiver.address)).to.eq(tokenId);
        expect(await unsRegistry.expiryOf(tokenId)).to.eq(expiry);
      });

      it('should unlock returned .com with records and reverse', async () => {
        const labels = ['expirable-test-a2', 'com'];
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        await mintingManager.connect(coinbase).issueExpirableWithRecords(
          coinbase.address,
          labels,
          ['key1'],
          ['value1'],
          expiry,
          false,
        );
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(coinbase.address);
        expect(await unsRegistry.get('key1', tokenId)).to.eq('value1');
        expect(await unsRegistry.expiryOf(tokenId)).to.eq(expiry);

        await unsRegistry.connect(coinbase).setOwner(mintingManager.address, tokenId);

        const newExpiry = expiry + 60 * 60 * 24;
        await mintingManager.connect(coinbase).issueExpirableWithRecords(
          receiver.address,
          labels,
          ['key2'],
          ['value2'],
          newExpiry,
          true,
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(receiver.address);
        expect(await unsRegistry.expiryOf(tokenId)).to.eq(newExpiry);

        expect(await unsRegistry.get('key2', tokenId)).to.eq('value2');
        expect(await unsRegistry.get('key1', tokenId)).to.eq('');

        expect(await unsRegistry.reverseOf(receiver.address)).to.eq(tokenId);
      });

      it('should mint existing expired .com with records and reverse', async () => {
        const labels = ['expirable-test-a3', 'com'];
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        await mintingManager.connect(coinbase).issueExpirableWithRecords(
          receiver.address,
          labels,
          ['key1'],
          ['value1'],
          expiry,
          false,
        );
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(receiver.address);
        expect(await unsRegistry.get('key1', tokenId)).to.eq('value1');
        expect(await unsRegistry.expiryOf(tokenId)).to.eq(expiry);

        await increaseTimeBy(60 * 60 * 24);

        expect(await unsRegistry.isExpired(tokenId)).to.eq(true);

        const newExpiry = expiry + 24 * 60 * 60;
        await mintingManager.connect(coinbase).issueExpirableWithRecords(
          receiver.address,
          labels,
          ['key2'],
          ['value2'],
          newExpiry,
          true,
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(receiver.address);
        expect(await unsRegistry.get('key2', tokenId)).to.eq('value2');
        expect(await unsRegistry.get('key1', tokenId)).to.eq('');

        expect(await unsRegistry.expiryOf(tokenId)).to.eq(newExpiry);
        expect(await unsRegistry.reverseOf(receiver.address)).to.eq(tokenId);
      });

      it('should unlock returned expired .com with records and reverse', async () => {
        const labels = ['expirable-test-a4', 'com'];
        const expiry = latestBlock.timestamp + 60 * 60;

        await mintingManager.connect(coinbase).issueExpirableWithRecords(
          coinbase.address,
          labels,
          ['key1'],
          ['value1'],
          expiry,
          false,
        );
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(coinbase.address);
        expect(await unsRegistry.get('key1', tokenId)).to.eq('value1');
        expect(await unsRegistry.expiryOf(tokenId)).to.eq(expiry);

        await unsRegistry.connect(coinbase).setOwner(mintingManager.address, tokenId);

        await increaseTimeBy(60 * 60);

        expect(await unsRegistry.isExpired(tokenId)).to.eq(true);

        const newExpiry = expiry + 24 * 60 * 60;

        await mintingManager.connect(coinbase).issueExpirableWithRecords(
          receiver.address,
          labels,
          ['key2'],
          ['value2'],
          newExpiry,
          true,
        );

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
            latestBlock.timestamp + 24 * 60 * 60,
            true,
          ),
        ).to.be.revertedWith('MintingManager: TLD_EXPIRABLE_MISMATCH');
      });

      it('should revert if caller is not minter', async () => {
        await expect(
          mintingManager.connect(signers[1]).issueExpirableWithRecords(
            coinbase.address,
            ['not-minter', 'com'],
            [],
            [],
            latestBlock.timestamp + 24 * 60 * 60,
            true,
          ),
        ).to.be.revertedWith('MintingManager: CALLER_IS_NOT_MINTER');
      });

      it('should revert with subdomain', async () => {
        const labels = ['expirable-test-a6', 'com'];
        const expiry = latestBlock.timestamp + 60 * 60;

        await mintingManager.connect(coinbase).issueExpirableWithRecords(
          coinbase.address,
          labels,
          [],
          [],
          expiry,
          false,
        );
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(coinbase.address);

        await expect(
          mintingManager.issueExpirableWithRecords(
            coinbase.address,
            ['sub', ...labels],
            [],
            [],
            expiry,
            true,
          ),
        ).to.be.revertedWith('MintingManager: SUBDOMAINS_NOT_ALLOWED');
      });

      it('should revert with subdomain of non-expirable SLD', async () => {
        const labels = ['expirable-test-a7', 'x'];

        await mintingManager.connect(coinbase).issueWithRecords(
          coinbase.address,
          labels,
          [],
          [],
          false,
        );
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.eq(coinbase.address);

        await expect(
          mintingManager.issueExpirableWithRecords(
            coinbase.address,
            ['sub', ...labels],
            [],
            [],
            latestBlock.timestamp + 24 * 60 * 60,
            true,
          ),
        ).to.be.revertedWith('MintingManager: TLD_EXPIRABLE_MISMATCH');
      });

      it('should revert minting legacy CNS prefixed domains', async () => {
        await expect(
          mintingManager.issueExpirableWithRecords(
            coinbase.address,
            ['udtestdev-t8', 'com'],
            ['key1'],
            ['value1'],
            latestBlock.timestamp + 24 * 60 * 60,
            true,
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });
  });

  describe('CNS Resolver management', () => {
    before(async () => {
      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();

      await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
      await mintingManager.initialize(
        unsRegistry.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
    });

    it('should return zero resolver when initialized by zero address', async () => {
      expect(await mintingManager.cnsResolver()).to.be.equal(ZERO_ADDRESS);
    });
  });

  describe('Renewals', () => {
    before(async () => {
      [coinbase, receiver] = signers;

      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();

      await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
      await mintingManager.initialize(
        unsRegistry.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintingManager.addMinter(coinbase.address);
    });

    it('should renew an expirable domain', async () => {
      const labels = ['test-renew-1', 'com'];
      const expiry = latestBlock.timestamp + 60 * 60 * 24;

      await mintingManager.connect(coinbase).issueExpirableWithRecords(
        coinbase.address,
        labels,
        [],
        [],
        expiry,
        true,
      );

      const tokenId = await unsRegistry.namehash(['test-renew-1', 'com']);
      expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(expiry);

      const newExpiry = expiry + 60 * 60 * 24;
      await mintingManager.connect(coinbase).renew(newExpiry, tokenId);

      expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(newExpiry);
    });

    it('should revert if domain is not exprialbe', async () => {
      const labels = ['test-renew-2', 'crypto'];

      await mintingManager.connect(coinbase).issueWithRecords(coinbase.address, labels, [], [], true);
      const tokenId = await unsRegistry.namehash(labels);

      const expiry = latestBlock.timestamp + 60 * 60 * 24;
      await expect(mintingManager.connect(coinbase).renew(expiry, tokenId)).to.be.revertedWith(
        'MintingManager: TOKEN_NOT_EXPIRABLE',
      );
    });

    it('should revert if expiry is not extended', async () => {
      const labels = ['test-renew-3', 'com'];
      const expiry = latestBlock.timestamp + 60 * 60 * 24;

      await mintingManager.connect(coinbase).issueExpirableWithRecords(
        coinbase.address,
        labels,
        [],
        [],
        expiry,
        true,
      );
      const tokenId = await unsRegistry.namehash(labels);

      await expect(mintingManager.connect(coinbase).renew(expiry, tokenId)).to.be.revertedWith(
        'MintingManager: EXPIRY_NOT_EXTENDED',
      );
    });

    it('should revert if new expiry is in the past', async () => {
      const labels = ['test-renew-4', 'com'];
      const expiry = latestBlock.timestamp + 60 * 60 * 24;

      await mintingManager.connect(coinbase).issueExpirableWithRecords(
        coinbase.address,
        labels,
        [],
        [],
        expiry,
        true,
      );
      const tokenId = await unsRegistry.namehash(labels);

      await increaseTimeBy(60 * 60 * 24);

      const newExpiry = expiry + 1;

      await expect(mintingManager.connect(coinbase).renew(newExpiry, tokenId)).to.be.revertedWith(
        'Registry: EXPIRY_IN_PAST',
      );
    });

    it('should revert if caller is not minter', async () => {
      const labels = ['test-renew-5', 'com'];

      const expiry = latestBlock.timestamp + 60 * 60 * 24;

      await mintingManager.connect(coinbase).issueExpirableWithRecords(
        coinbase.address,
        labels,
        [],
        [],
        expiry,
        true,
      );
      const tokenId = await unsRegistry.namehash(labels);

      const newExpiry = expiry + 60 * 60 * 24;

      await expect(mintingManager.connect(receiver).renew(newExpiry, tokenId)).to.be.revertedWith(
        'MinterRole: CALLER_IS_NOT_MINTER',
      );
    });
  });

  describe('Blocklist', () => {
    describe('Domain blocklisting', () => {
      before(async () => {
        unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
        mintingManager = await new MintingManager__factory(coinbase).deploy();
        await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

        await mintingManager.initialize(
          unsRegistry.address,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
        );
        await mintingManager.addMinter(coinbase.address);
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
          latestBlock.timestamp + 60 * 60 * 24,
          true,
        );

        await expect(
          mintingManager.issueExpirableWithRecords(
            coinbase.address,
            ['test-block-3pef', 'com'],
            [],
            [],
            latestBlock.timestamp,
            true,
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });

      it('should revert claim when blocked', async () => {
        await mintingManager.claim(TLD.WALLET, 'test-block-90dh');

        await expect(mintingManager.claim(TLD.WALLET, 'test-block-90dh')).to.be.revertedWith(
          'MintingManager: TOKEN_BLOCKED',
        );
      });

      it('should revert claimTo when blocked', async () => {
        await mintingManager.claimTo(coinbase.address, TLD.WALLET, 'test-block-8fdb');

        await expect(mintingManager.claimTo(coinbase.address, TLD.WALLET, 'test-block-8fdb')).to.be.revertedWith(
          'MintingManager: TOKEN_BLOCKED',
        );
      });

      it('should revert claim with records when blocked', async () => {
        await mintingManager.claimToWithRecords(coinbase.address, TLD.WALLET, 'test-block-u4nf', [], []);

        await expect(
          mintingManager.claimToWithRecords(coinbase.address, TLD.WALLET, 'test-block-u4nf', [], []),
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
        unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
        mintingManager = await new MintingManager__factory(coinbase).deploy();
        await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

        await mintingManager.initialize(
          unsRegistry.address,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
        );

        await mintingManager.addMinter(coinbase.address);
        await mintingManager.pause();
      });

      it('should revert claim when paused', async () => {
        await expect(mintingManager['claim(uint256,string)'](TLD.WALLET, 'test-paused-mint')).to.be.revertedWith(
          'Pausable: PAUSED',
        );
      });

      it('should revert claimTo when paused', async () => {
        await expect(
          mintingManager['claimTo(address,uint256,string)'](coinbase.address, TLD.WALLET, 'test-paused-mint'),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert claim with resords when paused', async () => {
        const selector = 'claimToWithRecords(address,uint256,string,string[],string[])';
        await expect(
          mintingManager[selector](coinbase.address, TLD.WALLET, 'test-paused-mint', [], []),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert mint when paused', async () => {
        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['test-paused-mint', 'wallet'], [], [], true),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert mint when paused', async () => {
        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['test-paused-mint', 'wallet'], [], [], true),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert mint with records when paused', async () => {
        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['test-paused-mint', 'wallet'], [], [], true),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert mint expirable with records when paused', async () => {
        const { timestamp } = await ethers.provider.getBlock('latest');

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
          mintingManager.buy(
            coinbase.address,
            ['test-paused-purchase', 'x'],
            [], [],
            0, 0,
            '0x',
          ),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert buyForErc20 if paused', async () => {
        await expect(
          mintingManager.buyForErc20(
            coinbase.address,
            ['test-paused-purchase', 'x'],
            [], [],
            0, ZERO_ADDRESS, 0,
            '0x',
          ),
        ).to.be.revertedWith('Pausable: PAUSED');
      });
    });

    describe('Pausable management', () => {
      beforeEach(async () => {
        [, developer] = signers;

        unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
        mintingManager = await new MintingManager__factory(coinbase).deploy();
        await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

        await mintingManager.initialize(
          unsRegistry.address,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
        );
        await mintingManager.addMinter(coinbase.address);
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

      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();
      await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

      await mintingManager.initialize(
        unsRegistry.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );

      await mintingManager.addMinter(coinbase.address);
    });

    describe('withdraw(address recepient)', () => {
      it('allows to withdraw native tokens', async () => {
        const price = ethers.utils.parseEther('4.54');
        const expiry = latestBlock.timestamp + 24 * 60 * 60;

        const labels = ['withdrawal', 'wallet'];
        const tokenId = await unsRegistry.namehash(labels);

        const chainId = network.config.chainId;

        const purchaseHash = ethers.utils.arrayify(
          ethers.utils.solidityKeccak256(
            ['address', 'uint256', 'address', 'uint256', 'uint64', 'uint256', 'address'],
            [mintingManager.address, chainId, receiver.address, tokenId, expiry, price, ZERO_ADDRESS],
          ),
        );
        const signature = await coinbase.signMessage(purchaseHash);

        await mintingManager.connect(receiver).buy(
          receiver.address,
          labels,
          [], [],
          expiry,
          price,
          signature,
          { value: price },
        );

        expect(await ethers.provider.getBalance(mintingManager.address)).to.equal(price);

        const initialBalance = await receiver.getBalance();

        await expect(
          mintingManager.connect(coinbase)['withdraw(address)'](receiver.address),
        ).to.emit(mintingManager, 'Withdrawal').withArgs(receiver.address, price, ZERO_ADDRESS);

        expect(await receiver.getBalance()).to.equal(initialBalance.add(price));
        expect(await ethers.provider.getBalance(mintingManager.address)).to.equal(BigNumber.from(0));
      });

      it('rejects if not owner', async () => {
        await expect(
          mintingManager.connect(receiver)['withdraw(address)'](ZERO_ADDRESS),
        ).to.be.reverted;
      });

      it('rejects if not owner', async () => {
        await expect(
          mintingManager.connect(receiver)['withdraw(address)'](receiver.address),
        ).to.be.revertedWith('Ownable: caller is not the owner');
      });
    });

    describe('withdraw(address token, address recepient)', () => {
      let erc20Mock: ERC20Mock;
      let erc20UnsafeMock: ERC20UnsafeMock;

      before(async () => {
        erc20Mock = await new ERC20Mock__factory(coinbase).deploy();

        erc20UnsafeMock = await new ERC20UnsafeMock__factory(coinbase).deploy();
      });

      it('allows to withdraw ERC20 tokens', async () => {
        const value = ethers.utils.parseEther('5');
        await erc20Mock.mint(mintingManager.address, value);

        await expect(
          mintingManager.connect(coinbase)['withdraw(address,address)'](
            erc20Mock.address,
            receiver.address,
          ),
        ).to.emit(mintingManager, 'Withdrawal').withArgs(receiver.address, value, erc20Mock.address);

        expect(await erc20Mock.balanceOf(receiver.address)).to.equal(value);
      });

      it('reverts if ERC20 transfer returns false', async () => {
        const value = ethers.utils.parseEther('5');
        await erc20UnsafeMock.mint(mintingManager.address, value);

        await expect(
          mintingManager.connect(coinbase)['withdraw(address,address)'](erc20UnsafeMock.address, receiver.address),
        ).to.be.revertedWith('ERC20: LOW_LEVEL_FAIL');
      });

      it('rejects if not owner', async () => {
        await expect(
          mintingManager.connect(receiver)['withdraw(address,address)'](erc20Mock.address, receiver.address),
        ).to.be.revertedWith('Ownable: caller is not the owner');
      });
    });
  });
});
