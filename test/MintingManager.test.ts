import { ethers } from 'hardhat';
import { expect } from 'chai';
// TODO: add type declarations for this lib
import namehash from 'eth-ens-namehash';
import { ZERO_ADDRESS, TLD } from './helpers/constants';
import { MintingManager, ProxyReader, UNSRegistry } from '../typechain-types/contracts';
import { CNSRegistry, Resolver } from '../typechain-types/dot-crypto/contracts';
import { MintingController, URIPrefixController } from '../typechain-types/dot-crypto/contracts/controllers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { MintingManager__factory, ProxyReader__factory, UNSRegistry__factory } from '../typechain-types/factories/contracts';
import { CNSRegistry__factory, Resolver__factory } from '../typechain-types/factories/dot-crypto/contracts';
import { MintingController__factory, URIPrefixController__factory } from '../typechain-types/factories/dot-crypto/contracts/controllers';
import { mintDomain } from './helpers/registry';

describe('MintingManager', () => {
  const DomainNamePrefix = 'uns-devtest-';

  let unsRegistry: UNSRegistry,
    cnsRegistry: CNSRegistry,
    resolver: Resolver,
    mintingController: MintingController,
    uriPrefixController: URIPrefixController,
    mintingManager: MintingManager,
    proxyReader: ProxyReader;

  let signers: SignerWithAddress[], domainSuffix: string;
  let coinbase: SignerWithAddress, receiver: SignerWithAddress, developer: SignerWithAddress, spender: SignerWithAddress, resolverSigner: SignerWithAddress;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;
  });

  describe('Ownership', () => {
    before(async () => {
      [, , receiver, resolverSigner] = signers;

      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();
      await unsRegistry.initialize(mintingManager.address);

      await mintingManager.initialize(
        unsRegistry.address,
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

      await expect(
        mintingManager.connect(coinbase).setResolver(resolverSigner.address),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('addProxyReaders', async () => {
    let proxyReader2: ProxyReader;

    before(async () => {
      [, , receiver, resolverSigner] = signers;

      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();
      cnsRegistry = await new CNSRegistry__factory(coinbase).deploy();

      await unsRegistry.initialize(mintingManager.address);

      await mintingManager.initialize(
        unsRegistry.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintingManager.addMinter(coinbase.address);

      proxyReader = await new ProxyReader__factory(coinbase).deploy(unsRegistry.address, cnsRegistry.address);
      proxyReader2 = await new ProxyReader__factory(coinbase).deploy(unsRegistry.address, cnsRegistry.address);
    });

    it('adds ProxyReader addresses', async () => {
      const labels = ['add-proxy-readers-test', 'crypto'];
      await mintingManager.issueWithRecords(receiver.address, labels, [], []);
      const tokenId = await unsRegistry.namehash(labels);

      await mintingManager.addProxyReaders([
        proxyReader.address,
        proxyReader2.address,
      ]);

      await mintingManager.upgradeAll([tokenId]);

      await unsRegistry.connect(receiver).set('key', 'value', tokenId);

      const [,, result] = await proxyReader.connect(receiver).callStatic.getData(['key'], tokenId);
      const [,, result2] = await proxyReader2.callStatic.getData(['key'], tokenId);

      expect(result).to.deep.equal(['']);
      expect(result2).to.deep.equal(['']);
    });

    it('should revert if not owner', async () => {
      await expect(
        mintingManager.connect(signers[1]).addProxyReaders([proxyReader.address]),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('upgradeAll', () => {
    before(async () => {
      [, , receiver, resolverSigner] = signers;

      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();
      await unsRegistry.initialize(mintingManager.address);

      await mintingManager.initialize(
        unsRegistry.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintingManager.addMinter(coinbase.address);
    });

    it('should successfully mark tokens as upgraded', async () => {
      const labels = ['upgrade-tokens-test', 'crypto'];
      await mintingManager.issueWithRecords(receiver.address, labels, [], []);
      const tokenId = await unsRegistry.namehash(labels);

      await mintingManager.upgradeAll([tokenId]);

      expect(unsRegistry.connect(receiver).burn(tokenId)).to.be.revertedWith(
        'Registry: TOKEN_UPGRADED',
      );
    });

    it('should revert if not minter', async () => {
      const labels = ['upgrade-tokens-test-2', 'crypto'];
      await mintingManager.issueWithRecords(receiver.address, labels, [], []);
      const tokenId = await unsRegistry.namehash(labels);

      await expect(
        mintingManager.connect(signers[1]).upgradeAll([tokenId]),
      ).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
    });
  });

  describe('TLD management', () => {
    before(async () => {
      [, spender] = signers;

      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();
      await unsRegistry.initialize(mintingManager.address);

      await mintingManager.initialize(
        unsRegistry.address,
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

        await expect(mintingManager.addTld(_tld))
          .to.emit(mintingManager, 'NewTld')
          .withArgs(_hashname, _tld);

        await mintingManager.issueWithRecords(coinbase.address, labels, [], []);
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        expect(await unsRegistry.exists(_hashname)).to.be.equal(true);
      });

      it('should revert adding TLD when non-owner', async () => {
        const _tld = 'test1';

        await expect(
          mintingManager.connect(spender).addTld(_tld),
        ).to.be.revertedWith('Ownable: caller is not the owner');
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

        await mintingManager.addTld(tld);

        await expect(mintingManager.removeTld(hashname))
          .to.emit(mintingManager, 'RemoveTld')
          .withArgs(hashname);

        await expect(mintingManager.issueWithRecords(coinbase.address, ['sld-domain-qq', tld], [], []))
          .to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('should revert removing TLD when not registred', async () => {
        const hashname = namehash.hash('test-removing-tld-not-existing');

        await expect(mintingManager.removeTld(hashname))
          .to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('should revert removing TLD when non-owner', async () => {
        const tld = 'test-removing-tld-when-not-owner';
        const hashname = namehash.hash(tld);

        await mintingManager.addTld(tld);

        await expect(
          mintingManager.connect(spender).removeTld(hashname),
        ).to.be.revertedWith('Ownable: caller is not the owner');
      });
    });
  });

  describe('Claiming', () => {
    before(async () => {
      [, developer, receiver] = signers;

      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();
      await unsRegistry.initialize(mintingManager.address);

      await mintingManager.initialize(
        unsRegistry.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintingManager.setTokenURIPrefix('/');
    });

    beforeEach(() => {
      domainSuffix = `prefixed-domain-${Math.random() * 1000}`;
    });

    describe('claim(uint256,string)', () => {
      it('should mint prefixed domain', async () => {
        await mintingManager
          .connect(developer)
          .functions['claim(uint256,string)'](TLD.WALLET, domainSuffix);
        const tokenId = await unsRegistry.namehash(
          [`${DomainNamePrefix}${domainSuffix}`, 'wallet'],
        );

        expect(await unsRegistry.tokenURI(tokenId)).to.be.equal(`/${tokenId}`);
      });

      it('should send domain to requester', async () => {
        await mintingManager
          .connect(developer)
          .functions['claim(uint256,string)'](TLD.WALLET, domainSuffix);
        const tokenId = await unsRegistry.namehash(
          [`${DomainNamePrefix}${domainSuffix}`, 'wallet'],
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          developer.address,
        );
      });

      it('should revert minting same domain twice', async () => {
        const minter = mintingManager.connect(developer);
        await minter.functions['claim(uint256,string)'](
          TLD.WALLET,
          domainSuffix,
        );

        await expect(
          minter.functions['claim(uint256,string)'](TLD.WALLET, domainSuffix),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager
            .connect(developer)
            .functions['claim(uint256,string)'](TLD.WALLET, 'udtestdev-t1'),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });

    describe('claimTo(address,uint256,string)', () => {
      it('should mint domain to receiver', async () => {
        await mintingManager
          .connect(developer)
          .functions['claimTo(address,uint256,string)'](
            receiver.address,
            TLD.WALLET,
            domainSuffix,
          );
        const tokenId = await unsRegistry.namehash(
          [`${DomainNamePrefix}${domainSuffix}`, 'wallet'],
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          receiver.address,
        );
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager
            .connect(developer)
            .functions['claimTo(address,uint256,string)'](
              receiver.address,
              TLD.CRYPTO,
              'udtestdev-t2',
            ),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });

    describe('claimToWithRecords(address,uint256,string,string[],string[])', () => {
      const selector =
        'claimToWithRecords(address,uint256,string,string[],string[])';

      it('should mint domain to receiver with predefined keys', async () => {
        const minter = mintingManager.connect(developer);
        await minter.functions[selector](
          receiver.address,
          TLD.WALLET,
          domainSuffix,
          ['key'],
          ['value'],
        );
        const tokenId = await unsRegistry.namehash(
          [`${DomainNamePrefix}${domainSuffix}`, 'wallet'],
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          receiver.address,
        );
        expect(await unsRegistry.getMany(['key'], tokenId)).to.be.eql([
          'value',
        ]);
      });

      it('should mint domain with empty keys', async () => {
        const minter = mintingManager.connect(developer);
        await minter.functions[selector](
          receiver.address,
          TLD.WALLET,
          domainSuffix,
          [],
          [],
        );
        const tokenId = await unsRegistry.namehash(
          [`${DomainNamePrefix}${domainSuffix}`, 'wallet'],

        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          receiver.address,
        );
        expect(await unsRegistry.getMany(['key1', 'key2'], tokenId)).to.be.eql([
          '',
          '',
        ]);
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager
            .connect(developer)
            .functions[selector](
              receiver.address,
              TLD.CRYPTO,
              'udtestdev-t3',
              [],
              [],
            ),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });
  });

  describe('Minting', () => {
    before(async () => {
      [, , receiver, spender] = signers;

      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();
      await unsRegistry.initialize(mintingManager.address);

      await mintingManager.initialize(
        unsRegistry.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
      await mintingManager.addMinter(coinbase.address);
      await mintingManager.setTokenURIPrefix('/');
    });

    describe('mint second level domain', () => {
      it('should revert minting when account is not minter', async () => {
        await expect(
          mintingManager
            .connect(receiver)
            .issueWithRecords(coinbase.address, ['test-1ka', 'wallet'], [], []),
        ).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
      });

      it('should revert minting when tld is invalid', async () => {
        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['test-1ka3', 'unknown'], [], []),
        ).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('should mint .wallet domain', async () => {
        const labels = ['test-1dp', 'wallet'];
        await mintingManager.issueWithRecords(coinbase.address, labels, [], []);
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });

      it('should mint .crypto damain in UNS registry when CNS registry undefined', async () => {
        const labels = ['test-uc-2v8n', 'crypto'];
        await mintingManager.issueWithRecords(coinbase.address, labels, [], []);
        const tokenId = await unsRegistry.namehash(labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['udtestdev-t4', 'crypto'], [], []),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });

    describe('mint subdomain', () => {
      it('should revert minting when account is not minter', async () => {
        await expect(
          mintingManager
            .connect(receiver)
            .issueWithRecords(coinbase.address, ['sub', 'test-1sub', 'wallet'], [], []),
        ).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
      });

      it('should revert minting when account is not the SLD owner', async () => {
        const labels = ['test-1sub', 'wallet'];
        await mintingManager.issueWithRecords(receiver.address, labels, [], []);

        labels.unshift('sub');
        await expect(
          mintingManager.issueWithRecords(coinbase.address, labels, [], []),
        ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
      });

      it('should revert minting when tld is invalid', async () => {
        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['sub', 'test-1sub', 'unknown'], [], []),
        ).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('should mint .wallet subdomain', async () => {
        const labels = ['test-1sub2', 'wallet'];
        await mintingManager.issueWithRecords(coinbase.address, labels, [], []);

        labels.unshift('sub');
        const tokenId = await mintDomain(unsRegistry, coinbase, labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });

      it('should mint .crypto subdamain in UNS registry when CNS registry undefined', async () => {
        const labels = ['test-1sub3', 'crypto'];
        await mintingManager.issueWithRecords(coinbase.address, labels, [], []);

        labels.unshift('sub');
        const tokenId = await mintDomain(unsRegistry, coinbase, labels);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['sub', 'udtestdev-t4', 'crypto'], [], []),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });
  });

  describe('Tld-based minting', () => {
    before(async () => {
      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();

      cnsRegistry = await new CNSRegistry__factory(coinbase).deploy();
      mintingController = await new MintingController__factory(coinbase).deploy(cnsRegistry.address);
      await cnsRegistry.addController(mintingController.address);
      resolver = await new Resolver__factory(coinbase).deploy(
        cnsRegistry.address,
        mintingController.address,
      );

      uriPrefixController = await new URIPrefixController__factory(coinbase).deploy(
        cnsRegistry.address,
      );
      await cnsRegistry.addController(uriPrefixController.address);

      mintingManager = await new MintingManager__factory(coinbase).deploy();
      await unsRegistry.initialize(mintingManager.address);

      await mintingController.addMinter(mintingManager.address);
      await uriPrefixController.addWhitelisted(mintingManager.address);

      await mintingManager.initialize(
        unsRegistry.address,
        mintingController.address,
        uriPrefixController.address,
        resolver.address,
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

        const tokenId = await cnsRegistry.childIdOf(
          TLD.CRYPTO,
          `${DomainNamePrefix}test-c221`,
        );
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: invalid token ID',
        );

        expect(await cnsRegistry.tokenURI(tokenId)).to.be.eql(
          '/uns-devtest-test-c221.crypto',
        );
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(
          resolver.address,
        );
      });

      it('should claim .wallet domain in UNS registry', async () => {
        await mintingManager['claim(uint256,string)'](TLD.WALLET, 'test-c029');

        const tokenId = await cnsRegistry.childIdOf(
          TLD.WALLET,
          `${DomainNamePrefix}test-c029`,
        );
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );

        expect(await unsRegistry.tokenURI(tokenId)).to.be.equal(`/${tokenId}`);
      });
    });

    describe('claimTo(address,uint256,string)', () => {
      it('should claim .crypto domain in CNS registry', async () => {
        await mintingManager['claimTo(address,uint256,string)'](
          coinbase.address,
          TLD.CRYPTO,
          'test-cd983',
        );

        const tokenId = await cnsRegistry.childIdOf(
          TLD.CRYPTO,
          `${DomainNamePrefix}test-cd983`,
        );
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: invalid token ID',
        );

        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(
          resolver.address,
        );
      });

      it('should claim .wallet domain in UNS registry', async () => {
        await mintingManager['claimTo(address,uint256,string)'](
          coinbase.address,
          TLD.WALLET,
          'test-cdsi47',
        );

        const tokenId = await cnsRegistry.childIdOf(
          TLD.WALLET,
          `${DomainNamePrefix}test-cdsi47`,
        );
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );
      });
    });

    describe('claimToWithRecords(address,uint256,string,string[],string[])', () => {
      const selector =
        'claimToWithRecords(address,uint256,string,string[],string[])';

      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.CRYPTO,
          'test-c039',
          ['key1'],
          ['value3'],
        );

        const tokenId = await cnsRegistry.childIdOf(
          TLD.CRYPTO,
          `${DomainNamePrefix}test-c039`,
        );
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: invalid token ID',
        );

        expect(await resolver.get('key1', tokenId)).to.be.eql('value3');
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(
          resolver.address,
        );
      });

      it('should claim with records .wallet domain in UNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.WALLET,
          'test-c846',
          ['key9'],
          ['value2'],
        );

        const tokenId = await cnsRegistry.childIdOf(
          TLD.WALLET,
          `${DomainNamePrefix}test-c846`,
        );
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );

        expect(await unsRegistry.get('key9', tokenId)).to.be.eql('value2');
      });
    });

    describe('issueWithRecords(address,string[],string[],string[])', () => {
      const selector =
        'issueWithRecords(address,string[],string[],string[])';

      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          ['test-m110', 'crypto'],
          ['key1'],
          ['value1'],
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, 'test-m110');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: invalid token ID',
        );

        expect(await resolver.get('key1', tokenId)).to.be.eql('value1');
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(
          resolver.address,
        );
      });

      it('should mint with records .wallet domain in UNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          ['test-mcm332', 'wallet'],
          ['key1'],
          ['value1'],
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.WALLET, 'test-mcm332');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );

        expect(await unsRegistry.get('key1', tokenId)).to.be.eql('value1');
      });

      it('should issue with records returned .wallet domain in UNS registry', async () => {
        const labels = ['returned1', 'wallet'];
        await mintingManager[selector](
          coinbase.address,
          labels,
          ['key1'],
          ['value1'],
        );
        const tokenId = await unsRegistry.namehash(labels);
        await unsRegistry.connect(coinbase).setOwner(mintingManager.address, tokenId);

        await mintingManager[selector](
          signers[1].address,
          labels,
          ['key1'],
          ['value2'],
        );

        expect(await unsRegistry.ownerOf(tokenId)).to.be.eql(signers[1].address);
        expect(await unsRegistry.get('key1', tokenId)).to.be.eql('value2');
        expect(await unsRegistry.reverseOf(signers[1].address)).to.be.equal(
          tokenId,
        );
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager[selector](
            coinbase.address,
            ['udtestdev-t7', 'crypto'],
            ['key1'],
            ['value1'],
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });

    describe('mintSLDWithRecords(address,uint256, string,string[],string[])', () => {
      const selector =
        'mintSLDWithRecords(address,uint256,string,string[],string[])';

      it('should mint with records .crypto domain in CNS registry', async () => {
        const label = 'test-om110';
        await mintingManager[selector](
          coinbase.address,
          TLD.CRYPTO,
          label,
          ['key1'],
          ['value1'],
        );
        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, label);

        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: invalid token ID',
        );

        expect(await resolver.get('key1', tokenId)).to.be.eql('value1');
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(
          resolver.address,
        );
      });

      it('should mint with records .wallet domain in UNS registry', async () => {
        const label = 'test-omcm332';
        await mintingManager[selector](
          coinbase.address,
          TLD.WALLET,
          label,
          ['key1'],
          ['value1'],
        );
        const tokenId = await cnsRegistry.childIdOf(TLD.WALLET, label);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );

        expect(await unsRegistry.get('key1', tokenId)).to.be.eql('value1');
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager[selector](
            coinbase.address,
            TLD.CRYPTO,
            'udtestdev-ot7',
            [],
            [],
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });
  });

  describe('CNS Resolver management', () => {
    before(async () => {
      unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
      mintingManager = await new MintingManager__factory(coinbase).deploy();

      await unsRegistry.initialize(mintingManager.address);
      await mintingManager.initialize(
        unsRegistry.address,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
        ZERO_ADDRESS,
      );
    });

    it('should return zero resolver when initialized by zero address', async () => {
      expect(await mintingManager.cnsResolver()).to.be.equal(ZERO_ADDRESS);
    });

    it('should update resolver', async () => {
      mintingController = await new MintingController__factory(coinbase).deploy(ZERO_ADDRESS);
      resolver = await new Resolver__factory(coinbase).deploy(ZERO_ADDRESS, mintingController.address);
      await mintingManager.setResolver(resolver.address);

      expect(await mintingManager.cnsResolver()).to.be.equal(resolver.address);
    });

    it('should revert update resolver when call by non-owner', async () => {
      mintingController = await new MintingController__factory(coinbase).deploy(ZERO_ADDRESS);
      resolver = await new Resolver__factory(coinbase).deploy(ZERO_ADDRESS, mintingController.address);

      await expect(
        mintingManager.connect(signers[5]).setResolver(resolver.address),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('Blocklist', () => {
    describe('Domain blocklisting', () => {
      before(async () => {
        unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
        mintingManager = await new MintingManager__factory(coinbase).deploy();
        await unsRegistry.initialize(mintingManager.address);

        await mintingManager.initialize(
          unsRegistry.address,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
        );
        await mintingManager.addMinter(coinbase.address);
      });

      it('should emit Blocked event on blocklist', async () => {
        const tokenId = await unsRegistry.namehash(
          ['test-block-78bn', 'wallet'],
        );
        await expect(mintingManager.blocklist(tokenId))
          .to.emit(mintingManager, 'Blocked')
          .withArgs(tokenId);
      });

      it('should allow blocking already blocked token', async () => {
        const tokenId = await unsRegistry.namehash(
          ['test-block-93md', 'wallet'],
        );
        await mintingManager.blocklist(tokenId);

        await mintingManager.blocklist(tokenId);
      });

      it('should block token after mint', async () => {
        const tokenId = await unsRegistry.namehash(
          ['test-block-49vh', 'wallet'],
        );
        expect(await mintingManager.isBlocked(tokenId)).to.be.equal(false);

        await mintingManager.issueWithRecords(coinbase.address, ['test-block-49vh', 'wallet'], [], []);

        expect(await mintingManager.isBlocked(tokenId)).to.be.equal(true);
      });

      it('should blocklist multiple tokens 1', async () => {
        const tokenId1 = await unsRegistry.namehash(
          ['test-block-48hg-1', 'wallet'],
        );
        const tokenId2 = await unsRegistry.namehash(
          ['test-block-48hg-2', 'wallet'],
        );
        await mintingManager.blocklistAll([tokenId1, tokenId2]);

        const res = await mintingManager.areBlocked([tokenId1, tokenId2]);
        expect(res).to.deep.equal([true, true]);
      });

      it('should blocklist multiple tokens 2', async () => {
        const tokenId1 = await unsRegistry.namehash(
          ['test-block-57hg-1', 'wallet'],
        );
        const tokenId2 = await unsRegistry.namehash(
          ['test-block-57hg-2', 'wallet'],
        );
        await mintingManager.blocklistAll([tokenId1]);

        const res = await mintingManager.areBlocked([tokenId1, tokenId2]);
        expect(res).to.deep.equal([true, false]);
      });

      it('should revert minting when token blocked', async () => {
        const tokenId = await unsRegistry.namehash(
          ['test-block-3pef', 'wallet'],
        );
        await mintingManager.blocklist(tokenId);

        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['test-block-3pef', 'wallet'], [], []),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });

      it('should revert minting with records when blocked', async () => {
        const tokenId = await unsRegistry.namehash(
          ['test-block-2ga3', 'wallet'],
        );
        await mintingManager.blocklist(tokenId);

        await expect(
          mintingManager.issueWithRecords(
            coinbase.address,
            ['test-block-2ga3', 'wallet'],
            [],
            [],
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });

      it('should revert claim when blocked', async () => {
        const tokenId = await unsRegistry.namehash(
          [`${DomainNamePrefix}test-block-90dh`, 'wallet'],
        );
        await mintingManager.blocklist(tokenId);

        await expect(
          mintingManager.claim(TLD.WALLET, 'test-block-90dh'),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });

      it('should revert claimTo when blocked', async () => {
        const tokenId = await unsRegistry.namehash(
          [`${DomainNamePrefix}test-block-8fdb`, 'wallet'],
        );
        await mintingManager.blocklist(tokenId);

        await expect(
          mintingManager.claimTo(
            coinbase.address,
            TLD.WALLET,
            'test-block-8fdb',
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });

      it('should revert claim with records when blocked', async () => {
        const tokenId = await unsRegistry.namehash(
          [`${DomainNamePrefix}test-block-u4nf`, 'wallet'],
        );
        await mintingManager.blocklist(tokenId);

        await expect(
          mintingManager.claimToWithRecords(
            coinbase.address,
            TLD.WALLET,
            'test-block-u4nf',
            [],
            [],
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });

      it('should revert minting when token burnt', async () => {
        const tokenId = await unsRegistry.namehash(
          ['test-block-1md0', 'wallet'],
        );
        await mintingManager.issueWithRecords(coinbase.address, ['test-block-1md0', 'wallet'], [], []);
        await unsRegistry.burn(tokenId);

        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['test-block-1md0', 'wallet'], [], []),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });
    });

    describe('Blocklist management', () => {
      before(async () => {
        [, developer] = signers;

        unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
        mintingManager = await new MintingManager__factory(coinbase).deploy();
        await unsRegistry.initialize(mintingManager.address);

        await mintingManager.initialize(
          unsRegistry.address,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
        );
        await mintingManager.addMinter(coinbase.address);
        await mintingManager.disableBlocklist();
      });

      it('should not block token after mint', async () => {
        const tokenId = await unsRegistry.namehash(
          ['test-blockp-49vh', 'wallet'],
        );
        expect(await mintingManager.isBlocked(tokenId)).to.be.equal(false);

        await mintingManager.issueWithRecords(coinbase.address, ['test-blockp-49vh', 'wallet'], [], []);

        expect(await mintingManager.isBlocked(tokenId)).to.be.equal(false);
      });

      it('should blocklist depends on pausable', async () => {
        const tokenId = await unsRegistry.namehash(
          ['test-blockp-8vn0', 'wallet'],
        );

        await expect(mintingManager.enableBlocklist())
          .to.emit(mintingManager, 'BlocklistEnabled')
          .withArgs(coinbase.address);

        await mintingManager.blocklist(tokenId);
        expect(await mintingManager.isBlocked(tokenId)).to.be.equal(true);

        await expect(mintingManager.disableBlocklist())
          .to.emit(mintingManager, 'BlocklistDisabled')
          .withArgs(coinbase.address);
        expect(await mintingManager.isBlocked(tokenId)).to.be.equal(false);
      });

      it('should revert blocklist when disabled', async () => {
        const tokenId1 = await unsRegistry.namehash(
          ['test-blockp-48hg-1', 'wallet'],
        );

        await expect(mintingManager.blocklist(tokenId1)).to.be.revertedWith(
          'Blocklist: DISABLED',
        );
      });

      it('should revert blocklist multiple when disabled', async () => {
        const tokenId1 = await unsRegistry.namehash(
          ['test-blockp-57hg-1', 'wallet'],
        );
        const tokenId2 = await unsRegistry.namehash(
          ['test-blockp-57hg-2', 'wallet'],
        );

        await expect(
          mintingManager.blocklistAll([tokenId1, tokenId2]),
        ).to.be.revertedWith('Blocklist: DISABLED');
      });

      it('should revert pauseBlocklist when called by non-owner', async () => {
        await expect(
          mintingManager.connect(developer).disableBlocklist(),
        ).to.be.revertedWith('Ownable: caller is not the owner');
      });
    });
  });

  describe('Pausable', () => {
    describe('Paused minting', () => {
      before(async () => {
        unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
        mintingManager = await new MintingManager__factory(coinbase).deploy();
        await unsRegistry.initialize(mintingManager.address);

        await mintingManager.initialize(
          unsRegistry.address,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
        );
        await mintingManager.addMinter(coinbase.address);
        await mintingManager.pause();
      });

      it('should revert claim when paused', async () => {
        await expect(
          mintingManager['claim(uint256,string)'](
            TLD.WALLET,
            'test-paused-mint',
          ),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert claimTo when paused', async () => {
        await expect(
          mintingManager['claimTo(address,uint256,string)'](
            coinbase.address,
            TLD.WALLET,
            'test-paused-mint',
          ),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert claim with resords when paused', async () => {
        const selector =
          'claimToWithRecords(address,uint256,string,string[],string[])';
        await expect(
          mintingManager[selector](
            coinbase.address,
            TLD.WALLET,
            'test-paused-mint',
            [],
            [],
          ),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert mint when paused', async () => {
        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['test-paused-mint', 'wallet'], [], []),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert mint with records when paused', async () => {
        const selector =
          'issueWithRecords(address,string[],string[],string[])';
        await expect(
          mintingManager[selector](
            coinbase.address,
            ['test-paused-mint', 'wallet'],
            [],
            [],
          ),
        ).to.be.revertedWith('Pausable: PAUSED');
      });
    });

    describe('Pausable management', () => {
      beforeEach(async () => {
        [, developer] = signers;

        unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
        mintingManager = await new MintingManager__factory(coinbase).deploy();
        await unsRegistry.initialize(mintingManager.address);

        await mintingManager.initialize(
          unsRegistry.address,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
          ZERO_ADDRESS,
        );
        await mintingManager.addMinter(coinbase.address);
      });

      it('should revert pausing when called by non-owner', async () => {
        await expect(
          mintingManager.connect(developer).pause(),
        ).to.be.revertedWith('Ownable: caller is not the owner');
      });

      it('should revert pausing when already paused', async () => {
        await mintingManager.pause();
        await expect(mintingManager.pause()).to.be.revertedWith(
          'Pausable: PAUSED',
        );
      });

      it('should revert unpausing when called by non-owner', async () => {
        await expect(
          mintingManager.connect(developer).unpause(),
        ).to.be.revertedWith('Ownable: caller is not the owner');
      });

      it('should revert unpausing when not paused', async () => {
        await expect(mintingManager.unpause()).to.be.revertedWith(
          'Pausable: NOT_PAUSED',
        );
      });

      it('should pause and unpause', async () => {
        const tokenId = await unsRegistry.namehash(
          ['test-pausable', 'wallet'],
        );

        // Paused
        await expect(mintingManager.pause())
          .to.emit(mintingManager, 'Paused')
          .withArgs(coinbase.address);

        await expect(
          mintingManager.issueWithRecords(coinbase.address, ['test-pausable', 'wallet'], [], []),
        ).to.be.revertedWith('Pausable: PAUSED');

        // Unpaused
        await expect(mintingManager.unpause())
          .to.emit(mintingManager, 'Unpaused')
          .withArgs(coinbase.address);

        await mintingManager.issueWithRecords(coinbase.address, ['test-pausable', 'wallet'], [], []);
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });
    });
  });
});
