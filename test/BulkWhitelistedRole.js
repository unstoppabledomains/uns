const BulkWhitelistedRole = artifacts.require('util/BulkWhitelistedRole.sol')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const assert = chai.assert

contract('BulkWhitelistedRole', function([, notAdmin, ...accounts]) {

  let bulkWhitelistedRole;

  beforeEach(async () => {
    bulkWhitelistedRole = await BulkWhitelistedRole.new()
  })

  it('should add and remove multiple accounts', async () => {
    await bulkWhitelistedRole.bulkAddWhitelisted(accounts);
    assert.isAbove(accounts.length, 0);
    for (account of accounts) {
        assert.isTrue(await bulkWhitelistedRole.isWhitelisted(account))
    }

    await bulkWhitelistedRole.bulkRemoveWhitelisted(accounts);
    for (account of accounts) {
        assert.isFalse(await bulkWhitelistedRole.isWhitelisted(account))
    }
  })

  it('should not allow add or remove accounts from non-admin address', async () => {
    try {
        await bulkWhitelistedRole.bulkAddWhitelisted(accounts, {from: notAdmin});
        assert.fail('bulkAddWhitelisted function should fail when trying to call from not allowed address')
    } catch (e) {
        assert.equal(e.reason, 'WhitelistedRole: CALLER_IS_NOT_ADMIN')
    }

    try {
        await bulkWhitelistedRole.bulkRemoveWhitelisted(accounts, {from: notAdmin});
        assert.fail('bulkRemoveWhitelisted function should fail when trying to call from not allowed address')
    } catch (e) {
        assert.equal(e.reason, 'WhitelistedRole: CALLER_IS_NOT_ADMIN')
    }
  })
})
