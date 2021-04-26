const { expectRevert } = require('@openzeppelin/test-helpers');

const Registry = artifacts.require('Registry.sol')
const MintingController = artifacts.require('controller/MintingController.sol')
const Resolver = artifacts.require('Resolver.sol')
const FreeMinter = artifacts.require('util/FreeMinter.sol')

const DomainNamePrefix = 'udtestdev-'

contract('FreeMinter', function([, developer, receiver]) {
  let registry, mintingController, resolver, freeMinter, domainSuffix

  before(async () => {
    registry = await Registry.new()
    mintingController = await MintingController.new(registry.address)
    await registry.addController(mintingController.address)

    resolver = await Resolver.new(registry.address, mintingController.address)

    freeMinter = await FreeMinter.new(mintingController.address, resolver.address, registry.address)
    await mintingController.addMinter(freeMinter.address)
  })

  beforeEach(() => {
    domainSuffix = `prefixed-domain-${Math.random() * 1000}`
  })

  describe('FreeMinter.claim(string calldata _label)', () => {
    it('should mint prefixed domain', async () => {
      await freeMinter.methods['claim(string)'](domainSuffix, {from: developer})
      const tokenId = await registry.childIdOf(await registry.root(), `${DomainNamePrefix}${domainSuffix}`)
      const tokenUri = await registry.tokenURI(tokenId)
      assert.equal(tokenUri, `${DomainNamePrefix}${domainSuffix}.crypto`)
    })

    it('should send domain to requester', async () => {
      await freeMinter.methods['claim(string)'](domainSuffix, {from: developer})
      const tokenId = await registry.childIdOf(await registry.root(), `${DomainNamePrefix}${domainSuffix}`)
      const owner = await registry.ownerOf(tokenId)
      assert.equal(owner, developer)
    })

    it('should not allow to mint the same domain twice', async () => {
      await freeMinter.methods['claim(string)'](domainSuffix, {from: developer})
      await expectRevert(
        freeMinter.methods['claim(string)'](domainSuffix, {from: developer}),
        'ERC721: token already minted',
      )
    })
  })

  describe('FreeMinter.claimTo(string calldata _label, address _receiver)', () => {
    it('should mint domain to receiver', async () => {
      await freeMinter.methods['claimTo(string,address)'](domainSuffix, receiver, {from: developer})
      const tokenId = await registry.childIdOf(await registry.root(), `${DomainNamePrefix}${domainSuffix}`)
      const owner = await registry.ownerOf(tokenId)
      assert.equal(owner, receiver)
    })
  })

  describe('FreeMinter.claimToWithRecords(string calldata _label, address _receiver, string[] calldata _keys, string [] calldata _values)', () => {
    it('should mint domain to receiver with predefined keys', async () => {
      await freeMinter.methods['claimToWithRecords(string,address,string[],string[])'](domainSuffix, receiver, ['key'], ['value'], {from: developer})
      const tokenId = await registry.childIdOf(await registry.root(), `${DomainNamePrefix}${domainSuffix}`)
      const owner = await registry.ownerOf(tokenId)
      const values = await resolver.getMany(['key'], tokenId)
      assert.equal(owner, receiver)
      assert.deepEqual(values, ['value'])
    })

    it('should mint domain with empty keys', async () => {
      await freeMinter.methods['claimToWithRecords(string,address,string[],string[])'](domainSuffix, receiver, [], [], {from: developer})
      const tokenId = await registry.childIdOf(await registry.root(), `${DomainNamePrefix}${domainSuffix}`)
      const owner = await registry.ownerOf(tokenId)
      const values = await resolver.getMany(['key1', 'key2'], tokenId)
      assert.equal(owner, receiver)
      assert.deepEqual(values, ['', ''])
    })
  })
})
