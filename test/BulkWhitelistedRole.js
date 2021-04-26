const { expectRevert } = require('@openzeppelin/test-helpers');

const BulkWhitelistedRole = artifacts.require('roles/BulkWhitelistedRole.sol');

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
    await expectRevert(
      bulkWhitelistedRole.bulkAddWhitelisted(accounts, {from: notAdmin}),
      'WhitelistedRole: CALLER_IS_NOT_ADMIN',
    );

    await expectRevert(
      bulkWhitelistedRole.bulkRemoveWhitelisted(accounts, {from: notAdmin}),
      'WhitelistedRole: CALLER_IS_NOT_ADMIN',
    );
  })
})
