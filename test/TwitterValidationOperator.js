const { ZERO_ADDRESS } = require('./helpers/constants');

const TwitterValidationOperator = artifacts.require('operators/TwitterValidationOperator.sol')
const LinkTokenMock = artifacts.require('mocks/LinkTokenMock.sol')
const Registry = artifacts.require('registry/Registry.sol')
const MintingController = artifacts.require('controller/MintingController.sol')

const usedGas = require('./helpers/getUsedGas')
const getUsedGas = usedGas.getUsedGas

contract('TwitterValidationOperator', function([coinbase, whitelisted, paymentCapper, fundsReceiver, validationRequester]) {
  const domainName = 'twitter-validation'
  const operatorInitialBalance = 100
  let linkToken, registry, mintingController, domainTokenId, operator

  before(async () => {
    linkToken = await LinkTokenMock.new()
    await linkToken.mint(coinbase, 100500)

    registry = await Registry.new()
    mintingController = await MintingController.new(registry.address)
    await registry.addController(mintingController.address)

    await mintingController.mintSLD(coinbase, domainName)
    domainTokenId = await registry.childIdOf(await registry.root(), domainName)
  })

  beforeEach(async () => {
    operator = await TwitterValidationOperator.new(registry.address, linkToken.address, [paymentCapper])
    await registry.approve(operator.address, domainTokenId)
    await operator.addWhitelisted(whitelisted)
    await operator.setPaymentPerValidation(1, 2, {from: paymentCapper})
    await linkToken.transfer(operator.address, operatorInitialBalance)
  })

  it('should set twitter username and signature', async () => {
    let tx = await operator.setValidation('rainberk', '0x1bd3c1e0eb3d9143d6365cfd328a002e01b01d1acd719b12d37d8791fbaeed7b0b850d995c3e32ba79b34dbb15962bd68529f9360eb7507961f67e7e6645e9a41b', domainTokenId, 0, {from: whitelisted})
    console.log(`      ⓘ TwitterValidationOperator.setValidation - first validation, first domain: ${getUsedGas(tx)}`)
    let validationRecords = await registry.getMany(['social.twitter.username', 'validation.social.twitter.username'], domainTokenId)
    assert.deepEqual(validationRecords, ['rainberk', '0x1bd3c1e0eb3d9143d6365cfd328a002e01b01d1acd719b12d37d8791fbaeed7b0b850d995c3e32ba79b34dbb15962bd68529f9360eb7507961f67e7e6645e9a41b'])

    tx = await operator.setValidation('apple', '0x1bd3c1e0eb3d9143d6365cfd328a002e01b01d1acd719b12d37d8791fbaeed7b0b850d995c3e32ba79b34dbb15962bd68529f9360eb7507961f67e7e6645e9a41b', domainTokenId, 0, {from: whitelisted})
    console.log(`      ⓘ TwitterValidationOperator.setValidation - second validation, first domain: ${getUsedGas(tx)}`)
    validationRecords = await registry.getMany(['social.twitter.username', 'validation.social.twitter.username'], domainTokenId)
    assert.deepEqual(validationRecords, ['apple', '0x1bd3c1e0eb3d9143d6365cfd328a002e01b01d1acd719b12d37d8791fbaeed7b0b850d995c3e32ba79b34dbb15962bd68529f9360eb7507961f67e7e6645e9a41b'])

    await mintingController.mintSLD(coinbase, 'testing-test')
    const secondDomainTokenId = await registry.childIdOf(await registry.root(), 'testing-test')
    await registry.approve(operator.address, secondDomainTokenId)
    tx = await operator.setValidation('google', '0x1bd3c1e0eb3d9143d6365cfd328a002e01b01d1acd719b12d37d8791fbaeed7b0b850d995c3e32ba79b34dbb15962bd68529f9360eb7507961f67e7e6645e9a41b', secondDomainTokenId, 0, {from: whitelisted})
    console.log(`      ⓘ TwitterValidationOperator.setValidation - third validation, second domain: ${getUsedGas(tx)}`)
    validationRecords = await registry.getMany(['social.twitter.username', 'validation.social.twitter.username'], secondDomainTokenId)
    assert.deepEqual(validationRecords, ['google', '0x1bd3c1e0eb3d9143d6365cfd328a002e01b01d1acd719b12d37d8791fbaeed7b0b850d995c3e32ba79b34dbb15962bd68529f9360eb7507961f67e7e6645e9a41b'])
  })

  it('should unlock LINK tokens after validation', async () => {
    const withdrawalAmount = await operator.withdrawableTokens()
    const paymentPerValidation = await operator.operatorPaymentPerValidation()
    await operator.setValidation('rainberk', 'signature', domainTokenId, 0, {from: whitelisted})
    const expectedAmount = withdrawalAmount.add(paymentPerValidation).toNumber()
    const actualAmount = (await operator.withdrawableTokens()).toNumber()
    assert.equal(actualAmount, expectedAmount)
  })

  it('should withdraw allowed LINK tokens', async () => {
    const funderInitialBalance = await linkToken.balanceOf(fundsReceiver)
    await operator.setValidation('rainberk', 'signature', domainTokenId, 0, {from: whitelisted})
    const withdrawableTokens = await operator.withdrawableTokens()
    await operator.withdraw(fundsReceiver, withdrawableTokens)
    const expectedBalance = funderInitialBalance.add(withdrawableTokens).toNumber()
    const actualBalance = (await linkToken.balanceOf(fundsReceiver)).toNumber()
    assert.isAbove(actualBalance, 0)
    assert.equal(actualBalance, expectedBalance)
  })

  it('should not allow to withdraw more LINK tokens that were unlocked', async () => {
    await operator.setValidation('rainberk', 'signature', domainTokenId, 0, {from: whitelisted})
    const withdrawableTokens = (await operator.withdrawableTokens()).toNumber()

    await expect(
      operator.withdraw(fundsReceiver, withdrawableTokens + 1)
    ).to.be.revertedWith('TwitterValidationOperator: TOO_MANY_TOKENS_REQUESTED');
  })

  it('should not allow to withdraw LINK tokens from non-admin address', async () => {
    await operator.setValidation('rainberk', 'signature', domainTokenId, 0, {from: whitelisted})
    const withdrawableTokens = await operator.withdrawableTokens()

    await expect(
      operator.withdraw(fundsReceiver, withdrawableTokens + 1, {from: whitelisted})
    ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_ADMIN');
  })

  it('should not allowed to set validation from non-whitelised address', async () => {
    await expect(
      operator.setValidation('rainberk', 'signature', domainTokenId, 0, {from: fundsReceiver})
    ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_WHITELISTED');
  })

  it('should unlock LINK tokens for each validation', async () => {
    const paymentPerValidation = (await operator.operatorPaymentPerValidation()).toNumber()
    await operator.setValidation('rainberk', 'signature', domainTokenId, 0, {from: whitelisted})
    await operator.setValidation('rainberk', 'signature', domainTokenId, 0, {from: whitelisted})
    await operator.setValidation('rainberk', 'signature', domainTokenId, 0, {from: whitelisted})
    const tokensAvailable = (await operator.withdrawableTokens()).toNumber()
    assert.equal(tokensAvailable, paymentPerValidation * 3)
  })

  it('should unlock predefined payment amount for valiation', async () => {
    const paymentPerValidation = 5
    operator = await TwitterValidationOperator.new(registry.address, linkToken.address, [paymentCapper])
    await operator.setPaymentPerValidation(paymentPerValidation, 0, {from: paymentCapper})
    await registry.approve(operator.address, domainTokenId)
    await operator.addWhitelisted(whitelisted)
    await linkToken.transfer(operator.address, paymentPerValidation)
    await operator.setValidation('rainberk', 'signature', domainTokenId, 0, {from: whitelisted})
    const tokensAvailable = (await operator.withdrawableTokens()).toNumber()
    assert.equal(tokensAvailable, paymentPerValidation)
  })

  it('should not allow set price per validation from Admin', async () => {
    await expect(
      operator.setPaymentPerValidation(100, 0, {from: coinbase})
    ).to.be.revertedWith('CapperRole: CALLER_IS_NOT_CAPPER');
  })

  it('should not allow set price per valiation from Whitelisted', async () => {
    await expect(
      operator.setPaymentPerValidation(100, 0, {from: whitelisted})
    ).to.be.revertedWith('CapperRole: CALLER_IS_NOT_CAPPER');
  })

  it('should not allow validate if operator does not have enough LINK tokens on balance', async () => {
    const paymentPerValidation = 5
    operator = await TwitterValidationOperator.new(registry.address, linkToken.address, [paymentCapper])
    await registry.approve(operator.address, domainTokenId)
    await operator.addWhitelisted(whitelisted)
    await operator.setPaymentPerValidation(paymentPerValidation, 0, {from: paymentCapper})
    await linkToken.transfer(operator.address, paymentPerValidation - 1)

    await expect(
      operator.setValidation('rainberk', 'signature', domainTokenId, 0, {from: whitelisted})
    ).to.be.revertedWith('TwitterValidationOperator: NOT_ENOUGH_TOKENS_ON_CONTRACT_BALANCE');
  })

  it('should work with zero price', async () => {
    operator = await TwitterValidationOperator.new(registry.address, linkToken.address, [paymentCapper])
    await registry.approve(operator.address, domainTokenId)
    await operator.addWhitelisted(whitelisted)
    await operator.setValidation('rainberk', 'signature', domainTokenId, 0, {from: whitelisted})
    const paymentPerValidation = (await operator.operatorPaymentPerValidation()).toNumber()
    assert.equal(paymentPerValidation, 0)
  })

  it('should work with Registry.setApprovalForAll approval', async () => {
    operator = await TwitterValidationOperator.new(registry.address, linkToken.address, [paymentCapper])
    await registry.setApprovalForAll(operator.address, true)
    await operator.addWhitelisted(whitelisted)
    await operator.setValidation('rainberk', 'signature', domainTokenId, 0, {from: whitelisted})
  })

  it('should pass canSetValidation check', async () => {
    assert.isTrue(await operator.canSetValidation({from: whitelisted}))
  })

  it('should fail canSetValidation from non-whitelisted address', async () => {
    await expect(operator.canSetValidation())
      .to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_WHITELISTED');
  })

  it('should fail canSetValidation if not enough balance', async () => {
    await operator.setPaymentPerValidation(999999, 0, {from: paymentCapper})
    await expect(operator.canSetValidation({from: whitelisted}))
      .to.be.revertedWith('TwitterValidationOperator: NOT_ENOUGH_TOKENS_ON_CONTRACT_BALANCE');
  })

  it('should set payment per validation for operator and user', async () => {
    const operatorPaymentAmount = 10
    const userPaymentAmount = 20
    await operator.setPaymentPerValidation(operatorPaymentAmount, userPaymentAmount, {from: paymentCapper})
    assert.equal((await operator.operatorPaymentPerValidation()).toNumber(), operatorPaymentAmount)
    assert.equal((await operator.userPaymentPerValidation()).toNumber(), userPaymentAmount)
  })

  it('should initiate validation via LINK token transfer', async () => {
    const guestManageDomainName = 'guest-manage-verification'
    await mintingController.mintSLD(validationRequester, guestManageDomainName)
    const tokenId = await registry.childIdOf(await registry.root(), guestManageDomainName)
    await registry.approve(operator.address, tokenId, {from: validationRequester})
    const operatorInitialBalance = await linkToken.balanceOf(operator.address)
    const userPaymentPerValidation = 2
    const validationCode = 'adDweFs12fdSAd231aAdW21'
    const validationData = web3.eth.abi.encodeParameters(['uint256', 'string'], [tokenId.toString(), validationCode])
    await linkToken.transfer(validationRequester, userPaymentPerValidation)
    await linkToken.transferAndCall(operator.address, userPaymentPerValidation, validationData, {from: validationRequester})
    const event = (await operator.getPastEvents()).find(e => e.event === 'ValidationRequest')
    assert.equal(event.returnValues.tokenId, tokenId.toString())
    assert.equal(event.returnValues.owner, validationRequester)
    assert.equal(event.returnValues.code, validationCode)
    assert.equal(event.returnValues.requestId, 1)
    const operatorBalance = await linkToken.balanceOf(operator.address)
    assert.equal(operatorBalance.sub(operatorInitialBalance).toNumber(), userPaymentPerValidation)
    assert.equal((await operator.availableBalance()).toNumber(), operatorInitialBalance.toNumber())
  })

  it('should fail if trying initiate verification with incorrect LINK tokens amount', async () => {
    const userPaymentPerValidation = 1
    const validationData = web3.eth.abi.encodeParameters(['uint256', 'string'], [domainTokenId.toString(), 'adDweFs12'])

    await expect(
      linkToken.transferAndCall(operator.address, userPaymentPerValidation, validationData)
    ).to.be.revertedWith('TwitterValidationOperator: INCORRECT_TOKENS_AMOUNT');
  })

  it('should fail if calling onTokenTransfer method directly not via LINK token smart contact', async () => {
    const userPaymentPerValidation = 2
    const validationData = web3.eth.abi.encodeParameters(['uint256', 'string'], [domainTokenId.toString(), 'adDweFs12'])

    await expect(
      operator.onTokenTransfer(coinbase, userPaymentPerValidation, validationData)
    ).to.be.revertedWith('TwitterValidationOperator: CAN_CALL_FROM_LINK_TOKEN_ONLY');
  })

  it('should fail if validation contract is not approved for tokenId', async () => {
    await registry.approve(ZERO_ADDRESS, domainTokenId)
    const userPaymentPerValidation = 2
    const validationData = web3.eth.abi.encodeParameters(['uint256', 'string'], [domainTokenId.toString(), 'adDweFs12'])

    await expect(
      linkToken.transferAndCall(operator.address, userPaymentPerValidation, validationData)
    ).to.be.revertedWith('TwitterValidationOperator: OPERATOR_SHOULD_BE_APPROVED');
  })

  it('should fail if sender doesn not have access to domain', async () => {
    const userPaymentPerValidation = 2
    await linkToken.transfer(validationRequester, userPaymentPerValidation)
    const validationData = web3.eth.abi.encodeParameters(['uint256', 'string'], [domainTokenId.toString(), 'adDweFs12'])

    await expect(
      linkToken.transferAndCall(operator.address, userPaymentPerValidation, validationData, {from: validationRequester})
    ).to.be.revertedWith('TwitterValidationOperator: SENDER_DOES_NOT_HAVE_ACCESS_TO_DOMAIN');
  })

  it('should set validation initiated from blockchain', async () => {
    const userPaymentPerValidation = 2
    const validationData = web3.eth.abi.encodeParameters(['uint256', 'string'], [domainTokenId.toString(), 'adDweFs12'])
    await linkToken.transferAndCall(operator.address, userPaymentPerValidation, validationData)
    await operator.setValidation('rainberk', '0x1bd3c1e0eb3d9143d6365cfd328a002e01b01d1acd719b12d37d8791fbaeed7b0b850d995c3e32ba79b34dbb15962bd68529f9360eb7507961f67e7e6645e9a41b', domainTokenId, 1, {from: whitelisted})
    const operatorBalance = await linkToken.balanceOf(operator.address)
    assert.equal((await operator.withdrawableTokens()).toNumber(), userPaymentPerValidation)
    assert.equal((await operator.availableBalance()).toNumber(), operatorBalance.toNumber())

    // Should not release additional tokens
    await operator.setValidation('rainberk', '0x1bd3c1e0eb3d9143d6365cfd328a002e01b01d1acd719b12d37d8791fbaeed7b0b850d995c3e32ba79b34dbb15962bd68529f9360eb7507961f67e7e6645e9a41b', domainTokenId, 1, {from: whitelisted})
    assert.equal((await operator.withdrawableTokens()).toNumber(), userPaymentPerValidation)
  })
})
