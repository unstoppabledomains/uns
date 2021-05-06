describe('FreeMinter', () => {
  const DomainNamePrefix = 'udtestdev-';
  let Registry, MintingController, FreeMinter;
  let registry, mintingController, freeMinter, domainSuffix;
  let signers, developerSigner;
  let developer, receiver;

  before(async () => {
    signers = await ethers.getSigners();
    [, developerSigner] = signers;
    [, developer, receiver] = signers.map(s => s.address);

    Registry = await ethers.getContractFactory('Registry');
    MintingController = await ethers.getContractFactory('MintingController');
    FreeMinter = await ethers.getContractFactory('FreeMinter');

    registry = await Registry.deploy();
    mintingController = await MintingController.deploy(registry.address);
    await registry.addController(mintingController.address);

    freeMinter = await FreeMinter.deploy(mintingController.address);
    await mintingController.addMinter(freeMinter.address);
  })

  beforeEach(() => {
    domainSuffix = `prefixed-domain-${Math.random() * 1000}`;
  })

  describe('FreeMinter.claim(string calldata _label)', () => {
    it('should mint prefixed domain', async () => {
      await freeMinter.connect(developerSigner).functions['claim(string)'](domainSuffix)
      const tokenId = await registry.childIdOf(await registry.root(), `${DomainNamePrefix}${domainSuffix}`)
      const tokenUri = await registry.tokenURI(tokenId)
      assert.equal(tokenUri, `${DomainNamePrefix}${domainSuffix}.crypto`)
    })

    it('should send domain to requester', async () => {
      await freeMinter.connect(developerSigner).functions['claim(string)'](domainSuffix)
      const tokenId = await registry.childIdOf(await registry.root(), `${DomainNamePrefix}${domainSuffix}`)
      const owner = await registry.ownerOf(tokenId)
      assert.equal(owner, developer)
    })

    it('should not allow to mint the same domain twice', async () => {
      const devFreeMinter = freeMinter.connect(developerSigner);
      await devFreeMinter.functions['claim(string)'](domainSuffix);

      await expect(
        devFreeMinter.functions['claim(string)'](domainSuffix)
      ).to.be.revertedWith('ERC721: token already minted');
    })
  })

  describe('FreeMinter.claimTo(string calldata _label, address _receiver)', () => {
    it('should mint domain to receiver', async () => {
      await freeMinter.connect(developerSigner).functions['claimTo(string,address)'](domainSuffix, receiver)
      const tokenId = await registry.childIdOf(await registry.root(), `${DomainNamePrefix}${domainSuffix}`)
      const owner = await registry.ownerOf(tokenId)
      assert.equal(owner, receiver)
    })
  })

  describe('FreeMinter.claimToWithRecords(string calldata _label, address _receiver, string[] calldata _keys, string [] calldata _values)', () => {
    it('should mint domain to receiver with predefined keys', async () => {
      const devFreeMinter = freeMinter.connect(developerSigner);
      await devFreeMinter.functions['claimToWithRecords(string,address,string[],string[])'](domainSuffix, receiver, ['key'], ['value'])
      const tokenId = await registry.childIdOf(await registry.root(), `${DomainNamePrefix}${domainSuffix}`)
      const owner = await registry.ownerOf(tokenId)
      const values = await registry.getMany(['key'], tokenId)
      assert.equal(owner, receiver)
      assert.deepEqual(values, ['value'])
    })

    it('should mint domain with empty keys', async () => {
      const devFreeMinter = freeMinter.connect(developerSigner);
      await devFreeMinter.functions['claimToWithRecords(string,address,string[],string[])'](domainSuffix, receiver, [], []);
      const tokenId = await registry.childIdOf(await registry.root(), `${DomainNamePrefix}${domainSuffix}`)
      const owner = await registry.ownerOf(tokenId)
      const values = await registry.getMany(['key1', 'key2'], tokenId)
      assert.equal(owner, receiver)
      assert.deepEqual(values, ['', ''])
    })
  })
})
