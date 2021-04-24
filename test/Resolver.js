const Registry = artifacts.require('registry/Registry.sol')
const MintingController = artifacts.require('controller/MintingController.sol')
const Resolver = artifacts.require('Resolver.sol')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const usedGas = require("./helpers/getUsedGas");
const getUsedGas = usedGas.getUsedGas;
chai.use(chaiAsPromised)
const assert = chai.assert
const web3 = require('web3');
const utils = web3.utils;
const submitSigTransaction = require('./helpers/submitSigTransaction');
const expectRevert = require('./helpers/expectRevert.js');

contract('Resolver', function ([coinbase, notOwner, ...accounts]) {
  let mintingController, registry, resolver

  let initializeDomain = async (name) => {
    const tok = await registry.childIdOf(await registry.root(), name)
    await mintingController.mintSLD(coinbase, name)
    await registry.resolveTo(resolver.address, tok)

    return tok;
  }

  before(async () => {
    await usedGas.init();
    
    registry = await Registry.new();
    mintingController = await MintingController.new(registry.address);
    await registry.addController(mintingController.address);

    resolver = await Resolver.new(registry.address, mintingController.address);
  })

  beforeEach(async () => {
    
  })

  it('should resolve tokens', async () => {
    const tok = await registry.childIdOf(await registry.root(), 'label')

    // should fail to set name if not owner
    await assert.isRejected(resolver.set('key', 'value', tok))

    await mintingController.mintSLD(coinbase, 'label')

    // should fail to get name if not resolving to name
    await assert.isRejected(resolver.set('key', 'value', tok))

    let tx = await registry.resolveTo(resolver.address, tok)
    console.log(`      ⓘ Resolver.resolveTo: ${getUsedGas(tx)}`)

    tx = await resolver.set('key', 'value', tok)
    console.log(`      ⓘ Resolver.set: ${getUsedGas(tx)}`)

    assert.equal(
      await resolver.get('key', tok),
      'value',
      'should resolve to resolver',
    )

    // should setMany
    tx = await resolver.setMany(['key1'], ['value1'], tok)
    console.log(`      ⓘ Resolver.setMany - one value: ${getUsedGas(tx)}`)
    tx = await resolver.setMany(['key2', 'key3'], ['value2', 'value3'], tok)
    console.log(`      ⓘ Resolver.setMany - two values: ${getUsedGas(tx)}`)
    tx = await resolver.setMany(['key4', 'key5', 'key6'], ['value4', 'value5', 'value6'], tok)
    console.log(`      ⓘ Resolver.setMany - three values: ${getUsedGas(tx)}`)
    assert.deepEqual(
      await resolver.getMany(['key2', 'key3'], tok),
      ['value2', 'value3']
    );

    // should reset
    tx = await resolver.reset(tok);
    console.log(`      ⓘ Resolver.reset: ${getUsedGas(tx)}`)
    const event = tx.logs.find(e => e.event == 'ResetRecords')
    assert.equal(event.args.tokenId.toString(), tok.toString())

    await registry.transferFrom(coinbase, accounts[1], tok)

    // should fail to set name if not owned
    await assert.isRejected(resolver.set('key', 'value', tok))
    await assert.isRejected(resolver.get('key', tok))
  })

  it('should get key by hash', async () => {
    const tok = await initializeDomain('heyhash')
    const expectedKey = 'new-hashed-key'
    await resolver.set(expectedKey, 'value', tok)
    const expectedKeyHash = utils.keccak256(expectedKey)
    const keyFromHash = await resolver.hashToKey(utils.hexToNumberString(expectedKeyHash))

    assert.equal(keyFromHash, expectedKey)
  })

  it('should get many keys by hashes', async () => {
    const tok = await initializeDomain('heyhash-many')
    const expectedKeys = ['keyhash-many-1', 'keyhash-many-2']
    await resolver.setMany(expectedKeys, ['value', 'value'], tok)
    const expectedKeyHashes = expectedKeys.map(key => {
      const keyHash = utils.keccak256(key)
      return utils.hexToNumberString(keyHash)
    });
    const keysFromHashes = await resolver.hashesToKeys(expectedKeyHashes)

    assert.deepEqual(keysFromHashes, expectedKeys)
  })

  it('should not consume additional gas if key hash was set before', async () => {
    const tok = await initializeDomain('heyhash-gas')
    let newKeyHashTx = await resolver.set('keyhash-gas', 'value', tok)
    console.log(`      ⓘ Resolver.set - add new key hash: ${getUsedGas(newKeyHashTx)}`)
    let exitsKeyHashTx = await resolver.set('keyhash-gas', 'value', tok)
    console.log(`      ⓘ Resolver.set - key hash already exists: ${getUsedGas(exitsKeyHashTx)}`)
    assert.isAbove(newKeyHashTx.receipt.gasUsed, exitsKeyHashTx.receipt.gasUsed)

    newKeyHashTx = await resolver.setMany(['keyhash-gas-1', 'keyhash-gas-2'], ['value-1', 'value-2'], tok)
    console.log(`      ⓘ Resolver.setMany - two values. Add new key hash: ${getUsedGas(newKeyHashTx)}`)
    exitsKeyHashTx = await resolver.setMany(['keyhash-gas-1', 'keyhash-gas-2'], ['value-1', 'value-2'], tok)
    console.log(`      ⓘ Resolver.setMany - two values. Key hashes already exists: ${getUsedGas(exitsKeyHashTx)}`)
    assert.isAbove(newKeyHashTx.receipt.gasUsed, exitsKeyHashTx.receipt.gasUsed)

    newKeyHashTx = await resolver.setMany(['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'], ['value-1', 'value-2', 'value-3'], tok)
    console.log(`      ⓘ Resolver.setMany - three values. Add new key hash: ${getUsedGas(newKeyHashTx)}`)
    exitsKeyHashTx = await resolver.setMany(['keyhash-gas-3', 'keyhash-gas-4', 'keyhash-gas-5'], ['value-1', 'value-2', 'value-3'], tok)
    console.log(`      ⓘ Resolver.setMany - three values. Key hashes already exists: ${getUsedGas(exitsKeyHashTx)}`)
    assert.isAbove(newKeyHashTx.receipt.gasUsed, exitsKeyHashTx.receipt.gasUsed)
  })

  it('should get value by key hash', async () => {
    const tok = await initializeDomain('get-key-by-hash')
    const key = 'get-key-by-hash-key'
    const expectedValue = 'get-key-by-hash-value'
    await resolver.set(key, expectedValue, tok)
    const keyHash = utils.keccak256(key)
    const result = await resolver.getByHash(keyHash, tok)

    assert.equal(result.value, expectedValue)
    assert.equal(result.key, key)
  })

  it('should get multiple values by hashes', async () => {
    const tok = await initializeDomain('get-many-keys-by-hash')
    const keys = ['key-to-hash-1', 'key-to-hash-2']
    const expectedValues = ['value-42', 'value-43']
    await resolver.setMany(keys, expectedValues, tok)
    const hashedKeys = keys.map(key => {
      const keyHash = utils.keccak256(key)
      return utils.hexToNumberString(keyHash)
    });
    const result = await resolver.getManyByHash(hashedKeys, tok)

    assert.deepEqual(result.values, expectedValues)
    assert.deepEqual(result.keys, keys)
  })

  it('should emit NewKey event new keys added', async () => {
    const tok = await initializeDomain('new-key')
    const key = 'new-key'
    const value = 'value';
    let tx = await resolver.set(key, value, tok)
    let event = tx.logs.find(e => e.event == 'NewKey')
    assert.equal(event.args.tokenId, tok.toString())
    assert.equal(event.args.keyIndex, utils.keccak256(key))
    assert.equal(event.args.key, key)

    tx = await resolver.set(key, value, tok)
    event = tx.logs.find(e => e.event == 'NewKey')
    assert.isUndefined(event)
  })

  it('should emit correct Set event', async () => {
    const tok = await initializeDomain('check-set-event')
    const key = 'new-key'
    const value = 'value';
    const tx = await resolver.set(key, value, tok)
    const event = tx.logs.find(e => e.event == 'Set')
    const args = event.args

    assert.equal(args.tokenId.toString(), tok.toString())
    assert.equal(args.keyIndex, utils.keccak256(key))
    assert.equal(args.valueIndex, utils.keccak256(value))
    assert.equal(args.key, key)
    assert.equal(args.value, value)
  })

  it('should reconfigure resolver with new values', async () => {
    const tok = await initializeDomain('reconfigure')
    await resolver.set('old-key', 'old-value', tok)
    const tx = await resolver.reconfigure(['new-key'], ['new-value'], tok)
    console.log(`      ⓘ Resolver.reconfigure: ${getUsedGas(tx)}`)

    assert.equal(await resolver.get('old-key', tok), '')
    assert.equal(await resolver.get('new-key', tok), 'new-value')
    // should fail when trying to reconfigure non-owned domain
    await expectRevert(
      resolver.reconfigure(['new-key'], ['new-value'], tok, { from: notOwner }),
      'SENDER_IS_NOT_APPROVED_OR_OWNER');
  })

  it('should revert reconfigureFor by not owner', async () => {
    const tok = (await initializeDomain('reconfigure-for')).toString(10)
    await resolver.set('old-key', 'old-value', tok)
    const tx = await submitSigTransaction(
      resolver,
      resolver,
      coinbase,
      'reconfigure',
      ['new-key'],
      ['new-value'],
      tok
    )
    console.log(`      ⓘ Resolver.reconfigureFor: ${getUsedGas(tx)}`)

    assert.equal(await resolver.get('old-key', tok), '')
    assert.equal(await resolver.get('new-key', tok), 'new-value')

    // should fail when trying to reconfigure non-owned domain
    await expectRevert(
      submitSigTransaction(
        resolver,
        resolver,
        notOwner,
        'reconfigure',
        ['new-key'],
        ['new-value'],
        tok
      ), 'INVALID_SIGNATURE');
  })

  it('should execute setManyFor', async () => {
    const tok = (await initializeDomain('set-many-for')).toString(10)
    const keys = ['new-key-1', 'new-key-2'];
    const expectedValues = ['new-value-1', 'new-value-2'];
    const tx = await submitSigTransaction(
      resolver,
      resolver,
      coinbase,
      'setMany',
      keys,
      expectedValues,
      tok
    )
    console.log(`      ⓘ Resolver.setManyFor - two values: ${getUsedGas(tx)}`)

    const values = await resolver.getMany(keys, tok)
    assert.deepEqual(values, expectedValues)
  })
})
