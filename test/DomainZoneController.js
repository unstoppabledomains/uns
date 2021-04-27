const { expectRevert } = require('@openzeppelin/test-helpers');

const Registry = artifacts.require('registry/Registry.sol')
const MintingController = artifacts.require('controller/MintingController.sol')
const DomainZoneController = artifacts.require('controller/DomainZoneController.sol')

const usedGas = require("./helpers/getUsedGas");
const getUsedGas = usedGas.getUsedGas;

contract('DomainZoneController', function([coinbase, whitelisted, domainReceiver, ...accounts]) {
  let mintingController, registry, secondLevelTokenId;
  const secondLevelDomainName = 'unstoppable';

  describe('DomainZoneController', async () => {
    before(async () => {
      await usedGas.init()

      registry = await Registry.new()
      mintingController = await MintingController.new(registry.address)
      await registry.addController(mintingController.address)

      await mintingController.mintSLD(coinbase, secondLevelDomainName)
      secondLevelTokenId = await registry.childIdOf(await registry.root(), secondLevelDomainName)
    })

    it('should accept addreses on contract deploy', async () => {
      const domainZoneController = await DomainZoneController.new(registry.address, accounts)
      assert.notEmpty(domainZoneController.address)
    })

    it('should deploy contract with empty addresses array', async () => {
      const domainZoneController = await DomainZoneController.new(registry.address, [])
      assert.notEmpty(domainZoneController.address)
    })

    it('addresses added in constructor should be whitelisted', async () => {
      const domainZoneController = await DomainZoneController.new(registry.address, accounts)
      assert.isAbove(accounts.length, 0)
      for (account of accounts) {
        assert.isTrue(await domainZoneController.isWhitelisted(account))
      }
    })

    it('address should not be whitelisted if wasn\'t added', async () => {
      const domainZoneController = await DomainZoneController.new(registry.address, accounts)
      assert.isFalse(await domainZoneController.isWhitelisted(coinbase))
    })

    it('should mint new child (subdomain) from whitelisted address', async () => {
      const subdomainName = 'subdomain'
      const expectedDomainUri = `${subdomainName}.${secondLevelDomainName}.crypto`
      const domainZoneController = await DomainZoneController.new(registry.address, [whitelisted])
      await registry.approve(domainZoneController.address, secondLevelTokenId)
      const tx = await domainZoneController.mintChild(domainReceiver, secondLevelTokenId, subdomainName, [], [], {from: whitelisted})
      console.log(`      ⓘ DomainZoneController.mintChild - no records: ${ getUsedGas(tx) }`)
      const subdomainTokenId = await registry.childIdOf(secondLevelTokenId, subdomainName)
      assert.equal(
        await registry.tokenURI(subdomainTokenId),
        expectedDomainUri
      )
    })

    it('should mint new child (subdomain) with predefined domain records', async () => {
      const subdomainName = 'subdomain-with-records'
      const keys = ['crypto.ETH.address', 'crypto.DAI.address', 'crypto.TRX.address']
      const values = ['0x2a02559786988d4f65154391673f8323db1c7a30', '0x2a02559786988d4f65154391673f8323db1c7a30', '0x2a02559786988d4f65154391673f8323db1c7a30']
      const domainZoneController = await DomainZoneController.new(registry.address, [whitelisted])
      await registry.approve(domainZoneController.address, secondLevelTokenId)
      const tx = await domainZoneController.mintChild(domainReceiver, secondLevelTokenId, subdomainName, keys, values, {from: whitelisted})
      console.log(`      ⓘ DomainZoneController.mintChild - three records: ${ getUsedGas(tx) }`)
      const subdomainTokenId = await registry.childIdOf(secondLevelTokenId, subdomainName)
      assert.deepEqual(
        await registry.getMany(keys, subdomainTokenId, {from: domainReceiver}),
        values
      )
    })

    it('should not allow mint subdomain from not whitelisted address', async () => {
      const subdomainName = 'not-allowed-to-mint'
      const domainZoneController = await DomainZoneController.new(registry.address, [whitelisted])
      await registry.approve(domainZoneController.address, secondLevelTokenId)
      await expectRevert(
        domainZoneController.mintChild(domainReceiver, secondLevelTokenId, subdomainName, [], [], {from: domainReceiver}),
        'WhitelistedRole: CALLER_IS_NOT_WHITELISTED',
      );
    })

    it('should transfer minted domain to owner', async () => {
      const subdomainName = 'transferred-subdomain'
      const domainZoneController = await DomainZoneController.new(registry.address, [whitelisted])
      await registry.approve(domainZoneController.address, secondLevelTokenId)
      await domainZoneController.mintChild(domainReceiver, secondLevelTokenId, subdomainName, [], [], {from: whitelisted})
      const subdomainTokenId = await registry.childIdOf(secondLevelTokenId, subdomainName)
      assert.equal(
        await registry.ownerOf(subdomainTokenId),
        domainReceiver
      )
    })

    it('should not allow minting from not allowed second-level domains', async () => {
      const subdomainName = 'not-allowed-to-transfer'
      const domainZoneController = await DomainZoneController.new(registry.address, [whitelisted])
      await expectRevert.unspecified(
        domainZoneController.mintChild(domainReceiver, secondLevelTokenId, subdomainName, [], [], {from: whitelisted}),
      );
    })
    
    it('should set records for domain', async () => {
      const keys = ['crypto.ETH.address', 'crypto.DAI.address', 'crypto.TRX.address']
      const values = ['0x2a02559786988d4f65154391673f8323db1c7a30', '0x2a02559786988d4f65154391673f8323db1c7a30', '0x2a02559786988d4f65154391673f8323db1c7a30']
      const domainName = 'set-many-records'
      await mintingController.mintSLD(coinbase, domainName)
      const tokenId = await registry.childIdOf(await registry.root(), domainName)
      const domainZoneController = await DomainZoneController.new(registry.address, [whitelisted])
      await registry.setOwner(domainZoneController.address, tokenId)
      const tx = await domainZoneController.setMany(keys, values, tokenId, {from: whitelisted})
      console.log(`      ⓘ DomainZoneController.setMany - three records: ${ getUsedGas(tx) }`)
      assert.deepEqual(
        await registry.getMany(keys, tokenId),
        values
      )
    })

    it('should not set records from not whitelisted address', async () => {
      const keys = ['crypto.ETH.address']
      const values = ['0x2a02559786988d4f65154391673f8323db1c7a30']
      const domainName = 'set-many-records-not-allowed'
      await mintingController.mintSLD(coinbase, domainName)
      const tokenId = await registry.childIdOf(await registry.root(), domainName)
      const domainZoneController = await DomainZoneController.new(registry.address, [whitelisted])
      await registry.setOwner(domainZoneController.address, tokenId)

      await expectRevert(
        domainZoneController.setMany(keys, values, tokenId),
        'WhitelistedRole: CALLER_IS_NOT_WHITELISTED',
      );
    })

    it('should emit MintChild event', async () => {
      const subdomainName = 'mint-child-event'
      const domainZoneController = await DomainZoneController.new(registry.address, [whitelisted])
      await registry.approve(domainZoneController.address, secondLevelTokenId)
      const tx = await domainZoneController.mintChild(domainReceiver, secondLevelTokenId, subdomainName, [], [], {from: whitelisted})
      const event = tx.logs.find(e => e.event == 'MintChild')
      const subdomainTokenId = await registry.childIdOf(secondLevelTokenId, subdomainName)
      assert.equal(event.args.tokenId, subdomainTokenId.toString())
      assert.equal(event.args.parentTokenId, secondLevelTokenId.toString())
      assert.equal(event.args.label, subdomainName)
    })
  })
})
