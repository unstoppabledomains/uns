const { ethers } = require('hardhat');
const { expect } = require('chai');

const { ZERO_ADDRESS } = require('./helpers/constants');

const { utils, BigNumber } = ethers;

describe('MintingManager', () => {
  const DomainNamePrefix = 'udtestdev-';
  const cryptoRoot = BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');
  const walletRoot = BigNumber.from('0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230');

  let UNSRegistry, CNSRegistry, Resolver, MintingController, URIPrefixController, MintingManager;
  let unsRegistry, cnsRegistry, resolver, mintingController, uriPrefixController, mintingManager;
  let signers, domainSuffix;
  let coinbase, faucet, receiver, developer, spender;

  const sign = async (data, address, signer) => {
    return signer.signMessage(
      utils.arrayify(
        utils.solidityKeccak256(
          [ 'bytes32', 'address' ],
          [ utils.keccak256(data), address ],
        ),
      ),
    );
  };

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    CNSRegistry = await ethers.getContractFactory('CNSRegistry');
    Resolver = await ethers.getContractFactory('Resolver');
    MintingController = await ethers.getContractFactory('MintingController');
    URIPrefixController = await ethers.getContractFactory('URIPrefixController');
    MintingManager = await ethers.getContractFactory('MintingManager');
  });

  describe('Ownership', () => {
    before(async () => {
      [, , receiver, resolver] = signers;

      unsRegistry = await UNSRegistry.deploy();
      mintingManager = await MintingManager.deploy();
      await unsRegistry.initialize(mintingManager.address);

      await mintingManager.initialize(unsRegistry.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
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

  describe('Claiming', () => {
    before(async () => {
      [, developer, receiver] = signers;

      unsRegistry = await UNSRegistry.deploy();
      mintingManager = await MintingManager.deploy();
      await unsRegistry.initialize(mintingManager.address);

      await mintingManager.initialize(unsRegistry.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
      await mintingManager.setTokenURIPrefix('/');
    });

    beforeEach(() => {
      domainSuffix = `prefixed-domain-${Math.random() * 1000}`;
    });

    describe('claim(uint256,string)', () => {
      it('should mint prefixed domain', async () => {
        await mintingManager.connect(developer).functions['claim(uint256,string)'](walletRoot, domainSuffix);
        const tokenId = await unsRegistry.childIdOf(walletRoot, `${DomainNamePrefix}${domainSuffix}`);

        expect(await unsRegistry.tokenURI(tokenId)).to.be.equal(`/${tokenId}`);
      });

      it('should send domain to requester', async () => {
        await mintingManager.connect(developer).functions['claim(uint256,string)'](walletRoot, domainSuffix);
        const tokenId = await unsRegistry.childIdOf(walletRoot, `${DomainNamePrefix}${domainSuffix}`);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(developer.address);
      });

      it('should not allow to mint the same domain twice', async () => {
        const minter = mintingManager.connect(developer);
        await minter.functions['claim(uint256,string)'](walletRoot, domainSuffix);

        await expect(
          minter.functions['claim(uint256,string)'](walletRoot, domainSuffix),
        ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
      });
    });

    describe('claimTo(address,uint256,string)', () => {
      it('should mint domain to receiver', async () => {
        await mintingManager.connect(developer)
          .functions['claimTo(address,uint256,string)'](receiver.address, walletRoot, domainSuffix);
        const tokenId = await unsRegistry.childIdOf(walletRoot, `${DomainNamePrefix}${domainSuffix}`);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
      });
    });

    describe('claimToWithRecords(address,uint256,string,string[],string[])', () => {
      const funcSig = 'claimToWithRecords(address,uint256,string,string[],string[])';

      it('should mint domain to receiver with predefined keys', async () => {
        const minter = mintingManager.connect(developer);
        await minter.functions[funcSig](receiver.address, walletRoot, domainSuffix, ['key'], ['value']);
        const tokenId = await unsRegistry.childIdOf(walletRoot, `${DomainNamePrefix}${domainSuffix}`);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
        expect(await unsRegistry.getMany(['key'], tokenId)).to.be.eql(['value']);
      });

      it('should mint domain with empty keys', async () => {
        const minter = mintingManager.connect(developer);
        await minter.functions[funcSig](receiver.address, walletRoot, domainSuffix, [], []);
        const tokenId = await unsRegistry.childIdOf(walletRoot, `${DomainNamePrefix}${domainSuffix}`);

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
        expect(await unsRegistry.getMany(['key1', 'key2'], tokenId)).to.be.eql(['', '']);
      });
    });
  });

  describe('Minting', () => {
    before(async () => {
      [, faucet, receiver, spender] = signers;

      unsRegistry = await UNSRegistry.deploy();
      mintingManager = await MintingManager.deploy();
      await unsRegistry.initialize(mintingManager.address);

      await mintingManager.initialize(unsRegistry.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
      await mintingManager.addMinter(coinbase.address);
      await mintingManager.setTokenURIPrefix('/');
    });

    describe('mint second level domain', () => {
      it('revert minting when account is not minter', async () => {
        await expect(
          mintingManager.connect(receiver).mintSLD(coinbase.address, walletRoot, 'test-1ka'),
        ).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
      });

      it('revert minting when tld is invalid', async () => {
        await expect(
          mintingManager.mintSLD(coinbase.address, 0, 'test-1ka3'),
        ).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('mint domain', async () => {
        await mintingManager.mintSLD(coinbase.address, walletRoot, 'test-1dp');
        const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-1dp');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      });
    });

    describe('safe mint second level domain', () => {
      const funcSig = 'safeMintSLD(address,uint256,string)';

      it('revert safe minting when account is not minter', async () => {
        await expect(
          mintingManager.connect(receiver)[funcSig](coinbase.address, walletRoot, 'test-2oa'),
        ).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
      });

      it('revert safe minting when tld is invalid', async () => {
        await expect(
          mintingManager[funcSig](coinbase.address, 0, 'test-2oa32'),
        ).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('safe mint domain', async () => {
        await mintingManager[funcSig](coinbase.address, walletRoot, 'test-2oa');
        const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-2oa');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      });
    });

    describe('safe mint(data) second level domain', () => {
      const funcSig = 'safeMintSLD(address,uint256,string,bytes)';

      it('revert safe minting when account is not minter', async () => {
        await expect(
          mintingManager.connect(receiver)[funcSig](coinbase.address, walletRoot, 'test-3oa', '0x'),
        ).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
      });

      it('revert safe minting when tld is invalid', async () => {
        await expect(
          mintingManager[funcSig](coinbase.address, 0, 'test-3oa23', '0x'),
        ).to.be.revertedWith('MintingManager: TLD_NOT_REGISTERED');
      });

      it('safe mint domain', async () => {
        await mintingManager[funcSig](coinbase.address, walletRoot, 'test-3oa', '0x');
        const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-3oa');

        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
      });
    });
  });

  describe('Relay', () => {
    before(async () => {
      [, faucet, receiver, spender] = signers;

      unsRegistry = await UNSRegistry.deploy();
      mintingManager = await MintingManager.deploy();
      await unsRegistry.initialize(mintingManager.address);

      await mintingManager.initialize(unsRegistry.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
      await mintingManager.addMinter(coinbase.address);
      await mintingManager.setTokenURIPrefix('/');
    });

    it('revert relay meta-mint when signer is not minter', async () => {
      const data = mintingManager.interface.encodeFunctionData(
        'mintSLD(address,uint256,string)',
        [receiver.address, walletRoot, 'test-p1-revert'],
      );
      const signature = sign(data, faucet.address, coinbase);

      await expect(
        mintingManager.connect(receiver).relay(data, signature),
      ).to.be.revertedWith('MintingManager: SIGNER_IS_NOT_MINTER');
    });

    it('revert relay meta-mint when signature is empty', async () => {
      const data = mintingManager.interface.encodeFunctionData(
        'mintSLD(address,uint256,string)',
        [receiver.address, walletRoot, 'test-p1-revert'],
      );

      await expect(
        mintingManager.connect(receiver).relay(data, '0x'),
      ).to.be.revertedWith('ECDSA: invalid signature length');
    });

    it('relay meta-safe mint', async () => {
      const data = mintingManager.interface.encodeFunctionData(
        'safeMintSLD(address,uint256,string)',
        [receiver.address, walletRoot, 'test-p1-p1sapr'],
      );
      const signature = sign(data, mintingManager.address, coinbase);

      await expect(mintingManager.connect(spender).relay(data, signature))
        .to.emit(mintingManager, 'Relayed')
        .withArgs(spender.address, coinbase.address, '0x4c1819e0', utils.keccak256(data));

      const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-p1-p1sapr');
      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });

    it('relay meta-safe mint with data', async () => {
      const data = mintingManager.interface.encodeFunctionData(
        'safeMintSLD(address,uint256,string,bytes)',
        [receiver.address, walletRoot, 'test-p1-p1saor', '0x'],
      );
      const signature = sign(data, mintingManager.address, coinbase);

      await expect(mintingManager.connect(spender).relay(data, signature))
        .to.emit(mintingManager, 'Relayed')
        .withArgs(spender.address, coinbase.address, '0x58839d6b', utils.keccak256(data));

      const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-p1-p1saor');
      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });

    it('relay meta-mint with no records', async () => {
      const data = mintingManager.interface.encodeFunctionData(
        'mintSLDWithRecords(address,uint256,string,string[],string[])',
        [receiver.address, walletRoot, 'test-p1-p1adr', [], []],
      );
      const signature = sign(data, mintingManager.address, coinbase);

      await expect(mintingManager.connect(spender).relay(data, signature))
        .to.emit(mintingManager, 'Relayed')
        .withArgs(spender.address, coinbase.address, '0x39ccf4d0', utils.keccak256(data));

      const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-p1-p1adr');
      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });

    it('relay meta-mint with records', async () => {
      const data = mintingManager.interface.encodeFunctionData(
        'mintSLDWithRecords(address,uint256,string,string[],string[])',
        [receiver.address, walletRoot, 'test-p1-nsd64i2', ['key'], ['v_0']],
      );
      const signature = sign(data, mintingManager.address, coinbase);

      await expect(mintingManager.connect(spender).relay(data, signature))
        .to.emit(mintingManager, 'Relayed')
        .withArgs(spender.address, coinbase.address, '0x39ccf4d0', utils.keccak256(data));

      const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-p1-nsd64i2');
      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });

    it('relay meta-safe mint with no records', async () => {
      const data = mintingManager.interface.encodeFunctionData(
        'safeMintSLDWithRecords(address,uint256,string,string[],string[])',
        [receiver.address, walletRoot, 'test-p1-psd123', [], []],
      );
      const signature = sign(data, mintingManager.address, coinbase);

      await expect(mintingManager.connect(spender).relay(data, signature))
        .to.emit(mintingManager, 'Relayed')
        .withArgs(spender.address, coinbase.address, '0x27bbd225', utils.keccak256(data));

      const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-p1-psd123');
      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });

    it('relay meta-safe mint with records', async () => {
      const data = mintingManager.interface.encodeFunctionData(
        'safeMintSLDWithRecords(address,uint256,string,string[],string[])',
        [receiver.address, walletRoot, 'test-p1-mvih4', ['key'], ['v_0']],
      );
      const signature = sign(data, mintingManager.address, coinbase);

      await expect(mintingManager.connect(spender).relay(data, signature))
        .to.emit(mintingManager, 'Relayed')
        .withArgs(spender.address, coinbase.address, '0x27bbd225', utils.keccak256(data));

      const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-p1-mvih4');
      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });

    it('relay meta-safe mint(data) with no records', async () => {
      const data = mintingManager.interface.encodeFunctionData(
        'safeMintSLDWithRecords(address,uint256,string,string[],string[],bytes)',
        [receiver.address, walletRoot, 'test-p1-mds024', [], [], '0x'],
      );
      const signature = sign(data, mintingManager.address, coinbase);

      await expect(mintingManager.connect(spender).relay(data, signature))
        .to.emit(mintingManager, 'Relayed')
        .withArgs(spender.address, coinbase.address, '0x6a2d2256', utils.keccak256(data));

      const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-p1-mds024');
      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });

    it('relay meta-safe mint(data) with records', async () => {
      const data = mintingManager.interface.encodeFunctionData(
        'safeMintSLDWithRecords(address,uint256,string,string[],string[],bytes)',
        [receiver.address, walletRoot, 'test-p1-nw833', ['key'], ['v_0'], '0x'],
      );
      const signature = sign(data, mintingManager.address, coinbase);

      await expect(mintingManager.connect(spender).relay(data, signature))
        .to.emit(mintingManager, 'Relayed')
        .withArgs(spender.address, coinbase.address, '0x6a2d2256', utils.keccak256(data));

      const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-p1-nw833');
      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
    });
  });

  describe('Tld-based minting', () => {
    before(async () => {
      unsRegistry = await UNSRegistry.deploy();

      cnsRegistry = await CNSRegistry.deploy();
      mintingController = await MintingController.deploy(cnsRegistry.address);
      await cnsRegistry.addController(mintingController.address);
      resolver = await Resolver.deploy(cnsRegistry.address, mintingController.address);

      uriPrefixController = await URIPrefixController.deploy(cnsRegistry.address);
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
        ZERO_ADDRESS);
      await mintingManager.addMinter(coinbase.address);
      await mintingManager.setTokenURIPrefix('/');
    });

    it('should have registered all tlds', async () => {
      const tlds = {
        wallet: '0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230',
        coin: '0x7674e7282552c15f203b9c4a6025aeaf28176ef7f5451b280f9bada3f8bc98e2',
        x: '0x241e7e2b7fd7333b3c0c049b326316b811af0c01cfc0c7a90b466fda3a70fc2d',
        nft: '0xb75cf4f3d8bc3deb317ed5216d898899d5cc6a783f65f6768eb9bcb89428670d',
        blockchain: '0x4118ebbd893ecbb9f5d7a817c7d8039c1bd991b56ea243e2ae84d0a1b2c950a7',
        bitcoin: '0x042fb01c1e43fb4a32f85b41c821e17d2faeac58cfc5fb23f80bc00c940f85e3',
        888: '0x5c828ec285c0bf152a30a325b3963661a80cb87641d60920344caf04d4a0f31e',
        dao: '0xb5f2bbf81da581299d4ff7af60560c0ac854196f5227328d2d0c2bb0df33e553',
      };

      Object.values(tlds).forEach(async (tld) => {
        expect(await unsRegistry.exists(tld)).to.be.equal(true);
      });
    });

    describe('claim(uint256,string)', () => {
      it('should claim .crypto domain in CNS registry', async () => {
        await mintingManager['claim(uint256,string)'](cryptoRoot, 'test-c221');

        const tokenId = await cnsRegistry.childIdOf(cryptoRoot, `${DomainNamePrefix}test-c221`);
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await cnsRegistry.tokenURI(tokenId)).to.be.eql('/udtestdev-test-c221.crypto');
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
      });

      it('should claim .wallet domain in UNS registry', async () => {
        await mintingManager['claim(uint256,string)'](walletRoot, 'test-c029');

        const tokenId = await cnsRegistry.childIdOf(walletRoot, `${DomainNamePrefix}test-c029`);
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await unsRegistry.tokenURI(tokenId)).to.be.equal(`/${tokenId}`);
      });
    });

    describe('claimTo(address,uint256,string)', () => {
      it('should claim .crypto domain in CNS registry', async () => {
        await mintingManager['claimTo(address,uint256,string)'](coinbase.address, cryptoRoot, 'test-cd983');

        const tokenId = await cnsRegistry.childIdOf(cryptoRoot, `${DomainNamePrefix}test-cd983`);
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
      });

      it('should claim .wallet domain in UNS registry', async () => {
        await mintingManager['claimTo(address,uint256,string)'](coinbase.address, walletRoot, 'test-cdsi47');

        const tokenId = await cnsRegistry.childIdOf(walletRoot, `${DomainNamePrefix}test-cdsi47`);
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
      });
    });

    describe('claimToWithRecords(address,uint256,string,string[],string[])', () => {
      const funcSig = 'claimToWithRecords(address,uint256,string,string[],string[])';

      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager[funcSig](coinbase.address, cryptoRoot, 'test-c039', ['key1'], ['value3']);

        const tokenId = await cnsRegistry.childIdOf(cryptoRoot, `${DomainNamePrefix}test-c039`);
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await resolver.get('key1', tokenId)).to.be.eql('value3');
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
      });

      it('should claim with records .wallet domain in UNS registry', async () => {
        await mintingManager[funcSig](coinbase.address, walletRoot, 'test-c846', ['key9'], ['value2']);

        const tokenId = await cnsRegistry.childIdOf(walletRoot, `${DomainNamePrefix}test-c846`);
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await unsRegistry.get('key9', tokenId)).to.be.eql('value2');
      });
    });

    describe('mintSLD(address,uint256,string)', () => {
      it('should mint .crypto domain in CNS registry', async () => {
        await mintingManager['mintSLD(address,uint256,string)'](coinbase.address, cryptoRoot, 'test-m12');

        const tokenId = await cnsRegistry.childIdOf(cryptoRoot, 'test-m12');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await cnsRegistry.tokenURI(tokenId)).to.be.eql('/test-m12.crypto');
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
      });

      it('should mint .wallet domain in UNS registry', async () => {
        await mintingManager['mintSLD(address,uint256,string)'](coinbase.address, walletRoot, 'test-m241');

        const tokenId = await cnsRegistry.childIdOf(walletRoot, 'test-m241');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await unsRegistry.tokenURI(tokenId)).to.be.equal(`/${tokenId}`);
      });
    });

    describe('safeMintSLD(address,uint256,string)', () => {
      it('should safe-mint .crypto domain in CNS registry', async () => {
        await mintingManager['safeMintSLD(address,uint256,string)'](coinbase.address, cryptoRoot, 'test-m986');

        const tokenId = await cnsRegistry.childIdOf(cryptoRoot, 'test-m986');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
      });

      it('should safe-mint .wallet domain in UNS registry', async () => {
        await mintingManager['safeMintSLD(address,uint256,string)'](coinbase.address, walletRoot, 'test-m675');

        const tokenId = await cnsRegistry.childIdOf(walletRoot, 'test-m675');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
      });
    });

    describe('safeMintSLD(address,uint256,string,bytes)', () => {
      const funcSig = 'safeMintSLD(address,uint256,string,bytes)';

      it('should safe-mint .crypto domain in CNS registry', async () => {
        await mintingManager[funcSig](coinbase.address, cryptoRoot, 'test-m636', '0x');

        const tokenId = await cnsRegistry.childIdOf(cryptoRoot, 'test-m636');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
      });

      it('should safe-mint .wallet domain in UNS registry', async () => {
        await mintingManager[funcSig](coinbase.address, walletRoot, 'test-m999', '0x');

        const tokenId = await cnsRegistry.childIdOf(walletRoot, 'test-m999');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
      });
    });

    describe('mintSLDWithRecords(address,uint256,string,string[],string[])', () => {
      const funcSig = 'mintSLDWithRecords(address,uint256,string,string[],string[])';

      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager[funcSig](coinbase.address, cryptoRoot, 'test-m110', ['key1'], ['value1']);

        const tokenId = await cnsRegistry.childIdOf(cryptoRoot, 'test-m110');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await resolver.get('key1', tokenId)).to.be.eql('value1');
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
      });

      it('should mint with records .wallet domain in UNS registry', async () => {
        await mintingManager[funcSig](coinbase.address, walletRoot, 'test-mcm332', ['key1'], ['value1']);

        const tokenId = await cnsRegistry.childIdOf(walletRoot, 'test-mcm332');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await unsRegistry.get('key1', tokenId)).to.be.eql('value1');
      });
    });

    describe('mintSLDWithRecords(address,uint256,string,string[],string[]) no records', () => {
      const funcSig = 'mintSLDWithRecords(address,uint256,string,string[],string[])';

      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager[funcSig](coinbase.address, cryptoRoot, 'test-mf43m', [], []);

        const tokenId = await cnsRegistry.childIdOf(cryptoRoot, 'test-mf43m');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
      });

      it('should mint with records .wallet domain in UNS registry', async () => {
        await mintingManager[funcSig](coinbase.address, walletRoot, 'test-mdmc3w', [], []);

        const tokenId = await cnsRegistry.childIdOf(walletRoot, 'test-mdmc3w');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
      });
    });

    describe('safeMintSLDWithRecords(address,uint256,string,string[],string[])', () => {
      const funcSig = 'safeMintSLDWithRecords(address,uint256,string,string[],string[])';

      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager[funcSig](coinbase.address, cryptoRoot, 'test-mcm4d1', ['key1'], ['value1']);

        const tokenId = await cnsRegistry.childIdOf(cryptoRoot, 'test-mcm4d1');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await resolver.get('key1', tokenId)).to.be.eql('value1');
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
      });

      it('should mint with records .wallet domain in UNS registry', async () => {
        await mintingManager[funcSig](coinbase.address, walletRoot, 'test-sffg2', ['key1'], ['value1']);

        const tokenId = await cnsRegistry.childIdOf(walletRoot, 'test-sffg2');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await unsRegistry.get('key1', tokenId)).to.be.eql('value1');
      });
    });

    describe('safeMintSLDWithRecords(address,uint256,string,string[],string[]) no records', () => {
      const funcSig = 'safeMintSLDWithRecords(address,uint256,string,string[],string[])';

      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager[funcSig](coinbase.address, cryptoRoot, 'test-m23fdf', [], []);

        const tokenId = await cnsRegistry.childIdOf(cryptoRoot, 'test-m23fdf');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
      });

      it('should mint with records .wallet domain in UNS registry', async () => {
        await mintingManager[funcSig](coinbase.address, walletRoot, 'test-msg220', [], []);

        const tokenId = await cnsRegistry.childIdOf(walletRoot, 'test-msg220');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
      });
    });

    describe('safeMintSLDWithRecords(address,uint256,string,string[],string[],bytes)', () => {
      const funcSig = 'safeMintSLDWithRecords(address,uint256,string,string[],string[],bytes)';

      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager[funcSig](coinbase.address, cryptoRoot, 'test-mv2n', ['key1'], ['value1'], '0x');

        const tokenId = await cnsRegistry.childIdOf(cryptoRoot, 'test-mv2n');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await resolver.get('key1', tokenId)).to.be.eql('value1');
        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
      });

      it('should mint with records .wallet domain in UNS registry', async () => {
        await mintingManager[funcSig](coinbase.address, walletRoot, 'test-mw24', ['key1'], ['value1'], '0x');

        const tokenId = await cnsRegistry.childIdOf(walletRoot, 'test-mw24');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await unsRegistry.get('key1', tokenId)).to.be.eql('value1');
      });
    });

    describe('safeMintSLDWithRecords(address,uint256,string,string[],string[],bytes) no records', () => {
      const funcSig = 'safeMintSLDWithRecords(address,uint256,string,string[],string[],bytes)';

      it('should mint with records .crypto domain in CNS registry', async () => {
        await mintingManager[funcSig](coinbase.address, cryptoRoot, 'test-mdg423', [], [], '0x');

        const tokenId = await cnsRegistry.childIdOf(cryptoRoot, 'test-mdg423');
        expect(await cnsRegistry.ownerOf(tokenId)).to.be.eql(coinbase.address);
        await expect(unsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');

        expect(await cnsRegistry.resolverOf(tokenId)).to.be.eql(resolver.address);
      });

      it('should mint with records .wallet domain in UNS registry', async () => {
        await mintingManager[funcSig](coinbase.address, walletRoot, 'test-msdb3', [], [], '0x');

        const tokenId = await cnsRegistry.childIdOf(walletRoot, 'test-msdb3');
        expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
        await expect(cnsRegistry.ownerOf(tokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
      });
    });
  });

  describe('cnsResolver management', () => {
    before(async () => {
      unsRegistry = await UNSRegistry.deploy();
      mintingManager = await MintingManager.deploy();

      await unsRegistry.initialize(mintingManager.address);
      await mintingManager.initialize(unsRegistry.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
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

  describe('Blocklisting', () => {
    before(async () => {
      unsRegistry = await UNSRegistry.deploy();
      mintingManager = await MintingManager.deploy();
      await unsRegistry.initialize(mintingManager.address);

      await mintingManager.initialize(unsRegistry.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
      await mintingManager.addMinter(coinbase.address);
      await mintingManager.setTokenURIPrefix('/');
    });

    it('should revert minting when token blocked', async () => {
      const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-block-3pef');
      await mintingManager.blocklist(tokenId);

      await expect(
        mintingManager.mintSLD(coinbase.address, walletRoot, 'test-block-3pef'),
      ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
    });

    it('should revert safe minting when blocked', async () => {
      const funcSig = 'safeMintSLD(address,uint256,string)';
      const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-block-3e3d');
      await mintingManager.blocklist(tokenId);

      await expect(
        mintingManager[funcSig](coinbase.address, walletRoot, 'test-block-3e3d'),
      ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
    });

    it('should revert safe minting when blocked', async () => {
      const funcSig = 'safeMintSLD(address,uint256,string,bytes)';
      const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-block-4wga');
      await mintingManager.blocklist(tokenId);

      await expect(
        mintingManager[funcSig](coinbase.address, walletRoot, 'test-block-4wga', '0x'),
      ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
    });

    it('should revert minting with records when blocked', async () => {
      const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-block-2ga3');
      await mintingManager.blocklist(tokenId);

      await expect(
        mintingManager.mintSLDWithRecords(coinbase.address, walletRoot, 'test-block-2ga3', [], []),
      ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
    });

    it('should revert safe minting with records when blocked', async () => {
      const funcSig = 'safeMintSLDWithRecords(address,uint256,string,string[],string[])';
      const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-block-8fds');
      await mintingManager.blocklist(tokenId);

      await expect(
        mintingManager[funcSig](coinbase.address, walletRoot, 'test-block-8fds', [], []),
      ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
    });

    it('should revert safe minting(data) with records when blocked', async () => {
      const funcSig = 'safeMintSLDWithRecords(address,uint256,string,string[],string[],bytes)';
      const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-block-8fds');
      await mintingManager.blocklist(tokenId);

      await expect(
        mintingManager[funcSig](coinbase.address, walletRoot, 'test-block-8fds', [], [], '0x'),
      ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
    });

    it('should revert claim when blocked', async () => {
      const tokenId = await unsRegistry.childIdOf(walletRoot, `${DomainNamePrefix}test-block-90dh`);
      await mintingManager.blocklist(tokenId);

      await expect(
        mintingManager.claim(walletRoot, 'test-block-90dh'),
      ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
    });

    it('should revert claimTo when blocked', async () => {
      const tokenId = await unsRegistry.childIdOf(walletRoot, `${DomainNamePrefix}test-block-8fdb`);
      await mintingManager.blocklist(tokenId);

      await expect(
        mintingManager.claimTo(coinbase.address, walletRoot, 'test-block-8fdb'),
      ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
    });

    it('should revert claim with records when blocked', async () => {
      const tokenId = await unsRegistry.childIdOf(walletRoot, `${DomainNamePrefix}test-block-u4nf`);
      await mintingManager.blocklist(tokenId);

      await expect(
        mintingManager.claimToWithRecords(coinbase.address, walletRoot, 'test-block-u4nf', [], []),
      ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
    });

    it('should blocklist multiple tokens 1', async () => {
      const tokenId1 = await unsRegistry.childIdOf(walletRoot, 'test-block-48hg-1');
      const tokenId2 = await unsRegistry.childIdOf(walletRoot, 'test-block-48hg-2');
      await mintingManager.blocklistAll([tokenId1, tokenId2]);

      const res = await mintingManager.areBlocked([tokenId1, tokenId2]);
      expect(res).to.deep.equal([true, true]);
    });

    it('should blocklist multiple tokens 2', async () => {
      const tokenId1 = await unsRegistry.childIdOf(walletRoot, 'test-block-57hg-1');
      const tokenId2 = await unsRegistry.childIdOf(walletRoot, 'test-block-57hg-2');
      await mintingManager.blocklistAll([tokenId1]);

      const res = await mintingManager.areBlocked([tokenId1, tokenId2]);
      expect(res).to.deep.equal([true, false]);
    });

    it('should revert minting when token burnt', async () => {
      const tokenId = await unsRegistry.childIdOf(walletRoot, 'test-block-1md0');
      await mintingManager.mintSLD(coinbase.address, walletRoot, 'test-block-1md0');
      await unsRegistry.burn(tokenId);

      await expect(
        mintingManager.mintSLD(coinbase.address, walletRoot, 'test-block-1md0'),
      ).to.be.revertedWith('MintingManager: TOKEN_BLOCKED');
    });
  });
});
