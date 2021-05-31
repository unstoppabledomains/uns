describe('BulkWhitelistedRoleMock', () => {
  let bulkWhitelistedRole;
  let signers, notAdminSigner, accounts;

  before(async () => {
    signers = await ethers.getSigners();
    [, notAdminSigner] = signers;
    [,, ...accounts] = signers.map(s => s.address);
  })

  beforeEach(async () => {
    const BulkWhitelistedRoleMock = await ethers.getContractFactory('BulkWhitelistedRoleMock');
    bulkWhitelistedRole = await BulkWhitelistedRoleMock.deploy();
    await bulkWhitelistedRole.initialize();
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
    await expect(
      bulkWhitelistedRole.connect(notAdminSigner).bulkAddWhitelisted(accounts)
    ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_ADMIN');

    await expect(
      bulkWhitelistedRole.connect(notAdminSigner).bulkRemoveWhitelisted(accounts)
    ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_ADMIN');
  })
})
