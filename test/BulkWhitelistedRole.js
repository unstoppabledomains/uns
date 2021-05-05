const { ethers } = require("hardhat");
const { expectRevert } = require('@openzeppelin/test-helpers');

describe('BulkWhitelistedRole', () => {
  let bulkWhitelistedRole, notAdmin, accounts;

  before(async () => {
    [, notAdmin, ...accounts] = await ethers.getSigners();
  })

  beforeEach(async () => {
    const BulkWhitelistedRole = await ethers.getContractFactory("BulkWhitelistedRole");
    bulkWhitelistedRole = await BulkWhitelistedRole.deploy();
    
    await bulkWhitelistedRole.deployed();
    console.log('bulkWhitelistedRole');
  })

  it('should add and remove multiple accounts', async () => {
    const _accounts = accounts.map(s => s.address);
    await bulkWhitelistedRole.bulkAddWhitelisted(_accounts);
    assert.isAbove(_accounts.length, 0);
    for (account of _accounts) {
      assert.isTrue(await bulkWhitelistedRole.isWhitelisted(account))
    }

    await bulkWhitelistedRole.bulkRemoveWhitelisted(_accounts);
    for (account of _accounts) {
      assert.isFalse(await bulkWhitelistedRole.isWhitelisted(account))
    }
  })

  it('should not allow add or remove accounts from non-admin address', async () => {
    const _accounts = accounts.map(s => s.address);
    await expectRevert(
      bulkWhitelistedRole.connect(notAdmin).bulkAddWhitelisted(_accounts),
      'WhitelistedRole: CALLER_IS_NOT_ADMIN',
    );

    await expectRevert(
      bulkWhitelistedRole.connect(notAdmin).bulkRemoveWhitelisted(_accounts),
      'WhitelistedRole: CALLER_IS_NOT_ADMIN',
    );
  })
})
