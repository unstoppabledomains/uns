const usedGas = require('../helpers/getUsedGas');
const getUsedGas = usedGas.getUsedGas;

describe('DomainZoneOperator', () => {
  const secondLevelDomainName = 'unstoppable';
  let Registry, DomainZoneOperator;
  let registry, secondLevelTokenId;
  let signers, whitelistedSigner, domainReceiverSigner;
  let coinbase, whitelisted, domainReceiver, accounts;

  before(async () => {
    signers = await ethers.getSigners();
    [, whitelistedSigner, domainReceiverSigner] = signers;
    [coinbase, whitelisted, domainReceiver, ...accounts] = signers.map(s => s.address);

    Registry = await ethers.getContractFactory('Registry');
    DomainZoneOperator = await ethers.getContractFactory('DomainZoneOperator');

    await usedGas.init();

    registry = await Registry.deploy();
    await registry.initialize();
    await registry.setTokenURIPrefix('/');

    await registry.mintSLD(coinbase, secondLevelDomainName);
    secondLevelTokenId = await registry.childIdOf(await registry.root(), secondLevelDomainName);
  })

  it('should accept addreses on contract deploy', async () => {
    const operator = await DomainZoneOperator.deploy(registry.address, accounts);
    assert.notEmpty(operator.address)
  })

  it('should deploy contract with empty addresses array', async () => {
    const operator = await DomainZoneOperator.deploy(registry.address, [])
    assert.notEmpty(operator.address)
  })

  it('addresses added in constructor should be whitelisted', async () => {
    const operator = await DomainZoneOperator.deploy(registry.address, accounts)
    assert.isAbove(accounts.length, 0)
    for (account of accounts) {
      assert.isTrue(await operator.isWhitelisted(account))
    }
  })

  it('address should not be whitelisted if wasn\'t added', async () => {
    const operator = await DomainZoneOperator.deploy(registry.address, accounts)
    assert.isFalse(await operator.isWhitelisted(coinbase))
  })

  it('should mint new child (subdomain) from whitelisted address', async () => {
    const subdomainName = 'subdomain'
    const operator = await DomainZoneOperator.deploy(registry.address, [whitelisted]);
    await registry.approve(operator.address, secondLevelTokenId)
    const tx = await operator.connect(whitelistedSigner)
      .mintChild(domainReceiver, secondLevelTokenId, subdomainName, [], []);
    tx.receipt = await tx.wait();
    console.log(`      ⓘ DomainZoneOperator.mintChild - no records: ${ getUsedGas(tx) }`)
    const subdomainTokenId = await registry.childIdOf(secondLevelTokenId, subdomainName)
    assert.equal(await registry.tokenURI(subdomainTokenId), `/${subdomainTokenId}`);
  })

  it('should mint new child (subdomain) with predefined domain records', async () => {
    const subdomainName = 'subdomain-with-records'
    const keys = ['crypto.ETH.address', 'crypto.DAI.address', 'crypto.TRX.address']
    const values = ['0x2a02559786988d4f65154391673f8323db1c7a30', '0x2a02559786988d4f65154391673f8323db1c7a30', '0x2a02559786988d4f65154391673f8323db1c7a30']
    const operator = await DomainZoneOperator.deploy(registry.address, [whitelisted])
    await registry.approve(operator.address, secondLevelTokenId)
    const tx = await operator.connect(whitelistedSigner)
      .mintChild(domainReceiver, secondLevelTokenId, subdomainName, keys, values);
    tx.receipt = await tx.wait();
    console.log(`      ⓘ DomainZoneOperator.mintChild - three records: ${ getUsedGas(tx) }`)
    const subdomainTokenId = await registry.childIdOf(secondLevelTokenId, subdomainName)
    assert.deepEqual(
      await registry.connect(domainReceiverSigner).getMany(keys, subdomainTokenId),
      values
    )
  })

  it('should not allow mint subdomain from not whitelisted address', async () => {
    const subdomainName = 'not-allowed-to-mint'
    const operator = await DomainZoneOperator.deploy(registry.address, [whitelisted])
    await registry.approve(operator.address, secondLevelTokenId)

    await expect(
      operator.connect(domainReceiverSigner).mintChild(domainReceiver, secondLevelTokenId, subdomainName, [], [])
    ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_WHITELISTED');
  })

  it('should transfer minted domain to owner', async () => {
    const subdomainName = 'transferred-subdomain'
    const operator = await DomainZoneOperator.deploy(registry.address, [whitelisted])
    await registry.approve(operator.address, secondLevelTokenId)
    await operator.connect(whitelistedSigner)
      .mintChild(domainReceiver, secondLevelTokenId, subdomainName, [], []);
    const subdomainTokenId = await registry.childIdOf(secondLevelTokenId, subdomainName)
    assert.equal(
      await registry.ownerOf(subdomainTokenId),
      domainReceiver
    )
  })

  it('should not allow minting from not allowed second-level domains', async () => {
    const subdomainName = 'not-allowed-to-transfer'
    const operator = await DomainZoneOperator.deploy(registry.address, [whitelisted])

    await expect(
      operator.connect(whitelistedSigner).mintChild(domainReceiver, secondLevelTokenId, subdomainName, [], [])
    ).to.be.revertedWith('Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
  })
  
  it('should set records for domain', async () => {
    const keys = ['crypto.ETH.address', 'crypto.DAI.address', 'crypto.TRX.address']
    const values = [
      '0x2a02559786988d4f65154391673f8323db1c7a30',
      '0x2a02559786988d4f65154391673f8323db1c7a30',
      '0x2a02559786988d4f65154391673f8323db1c7a30'
    ];
    const domainName = 'set-many-records'
    await registry.mintSLD(coinbase, domainName)
    const tokenId = await registry.childIdOf(await registry.root(), domainName)
    const operator = await DomainZoneOperator.deploy(registry.address, [whitelisted])
    await registry.setOwner(operator.address, tokenId)
    const tx = await operator.connect(whitelistedSigner).setMany(keys, values, tokenId);
    tx.receipt = await tx.wait();
    console.log(`      ⓘ DomainZoneOperator.setMany - three records: ${ getUsedGas(tx) }`)
    assert.deepEqual(
      await registry.getMany(keys, tokenId),
      values
    )
  })

  it('should not set records from not whitelisted address', async () => {
    const keys = ['crypto.ETH.address']
    const values = ['0x2a02559786988d4f65154391673f8323db1c7a30']
    const domainName = 'set-many-records-not-allowed'
    await registry.mintSLD(coinbase, domainName)
    const tokenId = await registry.childIdOf(await registry.root(), domainName)
    const operator = await DomainZoneOperator.deploy(registry.address, [whitelisted])
    await registry.setOwner(operator.address, tokenId)

    await expect(
      operator.setMany(keys, values, tokenId)
    ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_WHITELISTED');
  })

  it('should emit MintChild event', async () => {
    const subdomainName = 'mint-child-event'
    const operator = await DomainZoneOperator.deploy(registry.address, [whitelisted])
    await registry.approve(operator.address, secondLevelTokenId)
    const subdomainTokenId = await registry.childIdOf(secondLevelTokenId, subdomainName);

    await expect(
      operator.connect(whitelistedSigner).mintChild(domainReceiver, secondLevelTokenId, subdomainName, [], [])
    ).to.emit(operator, 'MintChild')
      .withArgs(subdomainTokenId, secondLevelTokenId, subdomainName);
  })
})
