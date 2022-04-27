const { ethers } = require('hardhat');
const { expect } = require('chai');
const namehash = require('eth-ens-namehash');

const { ZERO_ADDRESS, TLD } = require('./helpers/constants');

describe('MintingManager', () => {
  const DomainNamePrefix = 'uns-devtest-';

  let UNSRegistry,
    CNSRegistry,
    Resolver,
    MintingController,
    URIPrefixController,
    MintingManager;
  let unsRegistry,
    cnsRegistry,
    resolver,
    mintingController,
    uriPrefixController,
    mintingManager;
  let signers, domainSuffix;
  let coinbase, receiver, developer, spender;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    CNSRegistry = await ethers.getContractFactory('CNSRegistry');
    Resolver = await ethers.getContractFactory('Resolver');
    MintingController = await ethers.getContractFactory('MintingController');
    URIPrefixController = await ethers.getContractFactory(
      'URIPrefixController',
    );
    MintingManager = await ethers.getContractFactory('MintingManager');
  });

  describe('Ownership', () => {
    before(async () => {
      [, , receiver, resolver] = signers;

      unsRegistry = await UNSRegistry.deploy();
      mintingManager = await MintingManager.deploy();
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
        mintingManager.connect(coinbase).setResolver(resolver.address),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('TLD management', () => {
    before(async () => {
      [, spender] = signers;

      unsRegistry = await UNSRegistry.deploy();
      mintingManager = await MintingManager.deploy();
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

    it('should add new TLD', async () => {
      const _tld = 'test';
      const _hashname = namehash.hash(_tld);

      await expect(mintingManager.addTld(_tld))
        .to.emit(mintingManager, 'NewTld')
        .withArgs(_hashname, _tld);

      await mintingManager.mintSLD(coinbase.address, _hashname, 'test-1');

      const tokenId = await unsRegistry.childIdOf(_hashname, 'test-1');
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
        expect(await unsRegistry.ownerOf(TLD[key])).to.be.equal(
          '0x000000000000000000000000000000000000dEaD',
        );
      }
    });
  });

  describe('Claiming', () => {
    before(async () => {
      [, developer, receiver] = signers;

      unsRegistry = await UNSRegistry.deploy();
      mintingManager = await MintingManager.deploy();
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
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          `${DomainNamePrefix}${domainSuffix}`,
        );

        expect(await unsRegistry.tokenURI(tokenId)).to.be.equal(`/${tokenId}`);
      });

      it('should send domain to requester', async () => {
        await mintingManager
          .connect(developer)
          .functions['claim(uint256,string)'](TLD.WALLET, domainSuffix);
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          `${DomainNamePrefix}${domainSuffix}`,
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
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          `${DomainNamePrefix}${domainSuffix}`,
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
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          `${DomainNamePrefix}${domainSuffix}`,
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
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          `${DomainNamePrefix}${domainSuffix}`,
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

      unsRegistry = await UNSRegistry.deploy();
      mintingManager = await MintingManager.deploy();
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
            .mintSLD(coinbase.address, TLD.WALLET, 'test-1ka'),
        ).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
      });

      it('should revert minting when tld is invalid', async () => {
        await expect(
          mintingManager.mintSLD(coinbase.address, 0, 'test-1ka3'),
        ).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('should mint .wallet domain', async () => {
        await mintingManager.mintSLD(coinbase.address, TLD.WALLET, 'test-1dp');
        const tokenId = await unsRegistry.childIdOf(TLD.WALLET, 'test-1dp');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });

      it('should mint .crypto damain in UNS registry when CNS registry undefined', async () => {
        await mintingManager.mintSLD(
          coinbase.address,
          TLD.CRYPTO,
          'test-uc-2v8n',
        );
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'test-uc-2v8n');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager.mintSLD(coinbase.address, TLD.CRYPTO, 'udtestdev-t4'),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });

    describe('safe mint second level domain', () => {
      const selector = 'safeMintSLD(address,uint256,string)';

      it('should revert safe minting when account is not minter', async () => {
        const _mintingManager = mintingManager.connect(receiver);
        await expect(
          _mintingManager[selector](coinbase.address, TLD.WALLET, 'test-2oa'),
        ).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
      });

      it('should revert safe minting when tld is invalid', async () => {
        await expect(
          mintingManager[selector](coinbase.address, 0, 'test-2oa32'),
        ).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('should safe mint domain', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.WALLET,
          'test-2oa',
        );
        const tokenId = await unsRegistry.childIdOf(TLD.WALLET, 'test-2oa');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });

      it('should safe mint .crypto damain in UNS registry when CNS registry undefined', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.CRYPTO,
          'test-uc-992f',
        );
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'test-uc-992f');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager[selector](
            coinbase.address,
            TLD.CRYPTO,
            'udtestdev-t5',
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });

    describe('safe mint(data) second level domain', () => {
      const selector = 'safeMintSLD(address,uint256,string,bytes)';

      it('should revert safe minting when account is not minter', async () => {
        const _mintingManager = mintingManager.connect(receiver);
        await expect(
          _mintingManager[selector](
            coinbase.address,
            TLD.WALLET,
            'test-3oa',
            '0x',
          ),
        ).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
      });

      it('should revert safe minting when tld is invalid', async () => {
        await expect(
          mintingManager[selector](coinbase.address, 0, 'test-3oa23', '0x'),
        ).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('should safe mint domain', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.WALLET,
          'test-3oa',
          '0x',
        );
        const tokenId = await unsRegistry.childIdOf(TLD.WALLET, 'test-3oa');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });

      it('should safe mint .crypto damain in UNS registry when CNS registry undefined', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.CRYPTO,
          'test-uc-77ei',
          '0x',
        );
        const tokenId = await unsRegistry.childIdOf(TLD.CRYPTO, 'test-uc-77ei');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager[selector](
            coinbase.address,
            TLD.CRYPTO,
            'udtestdev-t6',
            '0x',
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });
  });

  describe('Tld-based minting', () => {
    before(async () => {
      unsRegistry = await UNSRegistry.deploy();

      cnsRegistry = await CNSRegistry.deploy();
      mintingController = await MintingController.deploy(cnsRegistry.address);
      await cnsRegistry.addController(mintingController.address);
      resolver = await Resolver.deploy(
        cnsRegistry.address,
        mintingController.address,
      );

      uriPrefixController = await URIPrefixController.deploy(
        cnsRegistry.address,
      );
      await cnsRegistry.addController(uriPrefixController.address);

      mintingManager = await MintingManager.deploy();
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
          'ERC721: owner query for nonexistent token',
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
          'ERC721: owner query for nonexistent token',
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
          'ERC721: owner query for nonexistent token',
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

    describe('mintSLD(address,uint256,string)', () => {
      it('should mint .crypto domain in CNS registry', async () => {
        await mintingManager['mintSLD(address,uint256,string)'](
          coinbase.address,
          TLD.CRYPTO,
          'test-m12',
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, 'test-m12');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );

        expect(await cnsRegistry.tokenURI(tokenId)).to.be.eql(
          '/test-m12.crypto',
        );
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(
          resolver.address,
        );
      });

      it('should mint .wallet domain in UNS registry', async () => {
        await mintingManager['mintSLD(address,uint256,string)'](
          coinbase.address,
          TLD.WALLET,
          'test-m241',
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.WALLET, 'test-m241');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );

        expect(await unsRegistry.tokenURI(tokenId)).to.be.equal(`/${tokenId}`);
      });
    });

    describe('safeMintSLD(address,uint256,string)', () => {
      it('should safe-mint .crypto domain in CNS registry', async () => {
        await mintingManager['safeMintSLD(address,uint256,string)'](
          coinbase.address,
          TLD.CRYPTO,
          'test-m986',
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, 'test-m986');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );

        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(
          resolver.address,
        );
      });

      it('should safe-mint .wallet domain in UNS registry', async () => {
        await mintingManager['safeMintSLD(address,uint256,string)'](
          coinbase.address,
          TLD.WALLET,
          'test-m675',
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.WALLET, 'test-m675');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );
      });
    });

    describe('safeMintSLD(address,uint256,string,bytes)', () => {
      const selector = 'safeMintSLD(address,uint256,string,bytes)';

      it('should safe-mint .crypto domain in CNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.CRYPTO,
          'test-m636',
          '0x',
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, 'test-m636');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );

        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(
          resolver.address,
        );
      });

      it('should safe-mint .wallet domain in UNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.WALLET,
          'test-m999',
          '0x',
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.WALLET, 'test-m999');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );
      });
    });

    describe('mintSLDWithRecords(address,uint256,string,string[],string[])', () => {
      const selector =
        'mintSLDWithRecords(address,uint256,string,string[],string[])';

      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.CRYPTO,
          'test-m110',
          ['key1'],
          ['value1'],
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, 'test-m110');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );

        expect(await resolver.get('key1', tokenId)).to.be.eql('value1');
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(
          resolver.address,
        );
      });

      it('should mint with records .wallet domain in UNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.WALLET,
          'test-mcm332',
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

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager[selector](
            coinbase.address,
            TLD.CRYPTO,
            'udtestdev-t7',
            ['key1'],
            ['value1'],
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });

    describe('mintSLDWithRecords(address,uint256,string,string[],string[]) no records', () => {
      const selector =
        'mintSLDWithRecords(address,uint256,string,string[],string[])';

      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.CRYPTO,
          'test-mf43m',
          [],
          [],
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, 'test-mf43m');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );

        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(
          resolver.address,
        );
      });

      it('should mint with records .wallet domain in UNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.WALLET,
          'test-mdmc3w',
          [],
          [],
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.WALLET, 'test-mdmc3w');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager[selector](
            coinbase.address,
            TLD.CRYPTO,
            'udtestdev-t7-1',
            [],
            [],
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });

    describe('safeMintSLDWithRecords(address,uint256,string,string[],string[])', () => {
      const selector =
        'safeMintSLDWithRecords(address,uint256,string,string[],string[])';

      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.CRYPTO,
          'test-mcm4d1',
          ['key1'],
          ['value1'],
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, 'test-mcm4d1');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );

        expect(await resolver.get('key1', tokenId)).to.be.eql('value1');
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(
          resolver.address,
        );
      });

      it('should mint with records .wallet domain in UNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.WALLET,
          'test-sffg2',
          ['key1'],
          ['value1'],
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.WALLET, 'test-sffg2');
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
            'udtestdev-t8',
            ['key1'],
            ['value1'],
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });

    describe('safeMintSLDWithRecords(address,uint256,string,string[],string[]) no records', () => {
      const selector =
        'safeMintSLDWithRecords(address,uint256,string,string[],string[])';

      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.CRYPTO,
          'test-m23fdf',
          [],
          [],
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, 'test-m23fdf');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );

        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(
          resolver.address,
        );
      });

      it('should mint with records .wallet domain in UNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.WALLET,
          'test-msg220',
          [],
          [],
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.WALLET, 'test-msg220');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager[selector](
            coinbase.address,
            TLD.CRYPTO,
            'udtestdev-t8-1',
            [],
            [],
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });

    describe('safeMintSLDWithRecords(address,uint256,string,string[],string[],bytes)', () => {
      const selector =
        'safeMintSLDWithRecords(address,uint256,string,string[],string[],bytes)';

      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.CRYPTO,
          'test-mv2n',
          ['key1'],
          ['value1'],
          '0x',
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, 'test-mv2n');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );

        expect(await resolver.get('key1', tokenId)).to.be.eql('value1');
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(
          resolver.address,
        );
      });

      it('should mint with records .wallet domain in UNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.WALLET,
          'test-mw24',
          ['key1'],
          ['value1'],
          '0x',
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.WALLET, 'test-mw24');
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
            'udtestdev-t9',
            ['key1'],
            ['value1'],
            '0x',
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });

    describe('safeMintSLDWithRecords(address,uint256,string,string[],string[],bytes) no records', () => {
      const selector =
        'safeMintSLDWithRecords(address,uint256,string,string[],string[],bytes)';

      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.CRYPTO,
          'test-mdg423',
          [],
          [],
          '0x',
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, 'test-mdg423');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );

        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(
          resolver.address,
        );
      });

      it('should mint with records .wallet domain in UNS registry', async () => {
        await mintingManager[selector](
          coinbase.address,
          TLD.WALLET,
          'test-msdb3',
          [],
          [],
          '0x',
        );

        const tokenId = await cnsRegistry.childIdOf(TLD.WALLET, 'test-msdb3');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith(
          'ERC721: owner query for nonexistent token',
        );
      });

      it('should revert minting legacy CNS free domains', async () => {
        await expect(
          mintingManager[selector](
            coinbase.address,
            TLD.CRYPTO,
            'udtestdev-t9-1',
            [],
            [],
            '0x',
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_LABEL_PROHIBITED');
      });
    });
  });

  describe('CNS Resolver management', () => {
    before(async () => {
      unsRegistry = await UNSRegistry.deploy();
      mintingManager = await MintingManager.deploy();

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
      mintingController = await MintingController.deploy(ZERO_ADDRESS);
      resolver = await Resolver.deploy(ZERO_ADDRESS, mintingController.address);
      await mintingManager.setResolver(resolver.address);

      expect(await mintingManager.cnsResolver()).to.be.equal(resolver.address);
    });

    it('should revert update resolver when call by non-owner', async () => {
      mintingController = await MintingController.deploy(ZERO_ADDRESS);
      resolver = await Resolver.deploy(ZERO_ADDRESS, mintingController.address);

      await expect(
        mintingManager.connect(signers[5]).setResolver(resolver.address),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('Blocklist', () => {
    describe('Domain blocklisting', () => {
      before(async () => {
        unsRegistry = await UNSRegistry.deploy();
        mintingManager = await MintingManager.deploy();
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
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-block-78bn',
        );
        await expect(mintingManager.blocklist(tokenId))
          .to.emit(mintingManager, 'Blocked')
          .withArgs(tokenId);
      });

      it('should allow blocking already blocked token', async () => {
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-block-93md',
        );
        await mintingManager.blocklist(tokenId);

        await mintingManager.blocklist(tokenId);
      });

      it('should block token after mint', async () => {
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-block-49vh',
        );
        expect(await mintingManager.isBlocked(tokenId)).to.be.equal(false);

        await mintingManager.mintSLD(
          coinbase.address,
          TLD.WALLET,
          'test-block-49vh',
        );

        expect(await mintingManager.isBlocked(tokenId)).to.be.equal(true);
      });

      it('should blocklist multiple tokens 1', async () => {
        const tokenId1 = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-block-48hg-1',
        );
        const tokenId2 = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-block-48hg-2',
        );
        await mintingManager.blocklistAll([tokenId1, tokenId2]);

        const res = await mintingManager.areBlocked([tokenId1, tokenId2]);
        expect(res).to.deep.equal([true, true]);
      });

      it('should blocklist multiple tokens 2', async () => {
        const tokenId1 = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-block-57hg-1',
        );
        const tokenId2 = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-block-57hg-2',
        );
        await mintingManager.blocklistAll([tokenId1]);

        const res = await mintingManager.areBlocked([tokenId1, tokenId2]);
        expect(res).to.deep.equal([true, false]);
      });

      it('should revert minting when token blocked', async () => {
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-block-3pef',
        );
        await mintingManager.blocklist(tokenId);

        await expect(
          mintingManager.mintSLD(
            coinbase.address,
            TLD.WALLET,
            'test-block-3pef',
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });

      it('should revert safe minting when blocked', async () => {
        const selector = 'safeMintSLD(address,uint256,string)';
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-block-3e3d',
        );
        await mintingManager.blocklist(tokenId);

        await expect(
          mintingManager[selector](
            coinbase.address,
            TLD.WALLET,
            'test-block-3e3d',
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });

      it('should revert safe minting when blocked', async () => {
        const selector = 'safeMintSLD(address,uint256,string,bytes)';
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-block-4wga',
        );
        await mintingManager.blocklist(tokenId);

        await expect(
          mintingManager[selector](
            coinbase.address,
            TLD.WALLET,
            'test-block-4wga',
            '0x',
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });

      it('should revert minting with records when blocked', async () => {
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-block-2ga3',
        );
        await mintingManager.blocklist(tokenId);

        await expect(
          mintingManager.mintSLDWithRecords(
            coinbase.address,
            TLD.WALLET,
            'test-block-2ga3',
            [],
            [],
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });

      it('should revert safe minting with records when blocked', async () => {
        const selector =
          'safeMintSLDWithRecords(address,uint256,string,string[],string[])';
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-block-8fds',
        );
        await mintingManager.blocklist(tokenId);

        await expect(
          mintingManager[selector](
            coinbase.address,
            TLD.WALLET,
            'test-block-8fds',
            [],
            [],
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });

      it('should revert safe minting(data) with records when blocked', async () => {
        const selector =
          'safeMintSLDWithRecords(address,uint256,string,string[],string[],bytes)';
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-block-8fds',
        );
        await mintingManager.blocklist(tokenId);

        await expect(
          mintingManager[selector](
            coinbase.address,
            TLD.WALLET,
            'test-block-8fds',
            [],
            [],
            '0x',
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });

      it('should revert claim when blocked', async () => {
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          `${DomainNamePrefix}test-block-90dh`,
        );
        await mintingManager.blocklist(tokenId);

        await expect(
          mintingManager.claim(TLD.WALLET, 'test-block-90dh'),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });

      it('should revert claimTo when blocked', async () => {
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          `${DomainNamePrefix}test-block-8fdb`,
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
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          `${DomainNamePrefix}test-block-u4nf`,
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
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-block-1md0',
        );
        await mintingManager.mintSLD(
          coinbase.address,
          TLD.WALLET,
          'test-block-1md0',
        );
        await unsRegistry.burn(tokenId);

        await expect(
          mintingManager.mintSLD(
            coinbase.address,
            TLD.WALLET,
            'test-block-1md0',
          ),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });
    });

    describe('Blocklist management', () => {
      before(async () => {
        [, developer] = signers;

        unsRegistry = await UNSRegistry.deploy();
        mintingManager = await MintingManager.deploy();
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
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-blockp-49vh',
        );
        expect(await mintingManager.isBlocked(tokenId)).to.be.equal(false);

        await mintingManager.mintSLD(
          coinbase.address,
          TLD.WALLET,
          'test-blockp-49vh',
        );

        expect(await mintingManager.isBlocked(tokenId)).to.be.equal(false);
      });

      it('should blocklist depends on pausable', async () => {
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-blockp-8vn0',
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
        const tokenId1 = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-blockp-48hg-1',
        );

        await expect(mintingManager.blocklist(tokenId1)).to.be.revertedWith(
          'Blocklist: DISABLED',
        );
      });

      it('should revert blocklist multiple when disabled', async () => {
        const tokenId1 = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-blockp-57hg-1',
        );
        const tokenId2 = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-blockp-57hg-2',
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
        unsRegistry = await UNSRegistry.deploy();
        mintingManager = await MintingManager.deploy();
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
          mintingManager.mintSLD(
            coinbase.address,
            TLD.WALLET,
            'test-paused-mint',
          ),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert safe mint when paused', async () => {
        await expect(
          mintingManager['safeMintSLD(address,uint256,string)'](
            coinbase.address,
            TLD.WALLET,
            'test-paused-mint',
          ),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert safe mint(data) when paused', async () => {
        const selector = 'safeMintSLD(address,uint256,string,bytes)';
        await expect(
          mintingManager[selector](
            coinbase.address,
            TLD.WALLET,
            'test-paused-mint',
            '0x',
          ),
        ).to.be.revertedWith('Pausable: PAUSED');
      });

      it('should revert mint with records when paused', async () => {
        const selector =
          'mintSLDWithRecords(address,uint256,string,string[],string[])';
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

      it('should revert safe mint with records when paused', async () => {
        const selector =
          'safeMintSLDWithRecords(address,uint256,string,string[],string[])';
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

      it('should revert safe mint(data) with records when paused', async () => {
        const selector =
          'safeMintSLDWithRecords(address,uint256,string,string[],string[],bytes)';
        await expect(
          mintingManager[selector](
            coinbase.address,
            TLD.WALLET,
            'test-paused-mint',
            [],
            [],
            '0x',
          ),
        ).to.be.revertedWith('Pausable: PAUSED');
      });
    });

    describe('Pausable management', () => {
      beforeEach(async () => {
        [, developer] = signers;

        unsRegistry = await UNSRegistry.deploy();
        mintingManager = await MintingManager.deploy();
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
        const tokenId = await unsRegistry.childIdOf(
          TLD.WALLET,
          'test-pausable',
        );

        // Paused
        await expect(mintingManager.pause())
          .to.emit(mintingManager, 'Paused')
          .withArgs(coinbase.address);

        await expect(
          mintingManager.mintSLD(coinbase.address, TLD.WALLET, 'test-pausable'),
        ).to.be.revertedWith('Pausable: PAUSED');

        // Unpaused
        await expect(mintingManager.unpause())
          .to.emit(mintingManager, 'Unpaused')
          .withArgs(coinbase.address);

        await mintingManager.mintSLD(
          coinbase.address,
          TLD.WALLET,
          'test-pausable',
        );
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(
          coinbase.address,
        );
      });
    });
  });
});
