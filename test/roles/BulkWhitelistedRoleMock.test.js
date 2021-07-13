const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('BulkWhitelistedRoleMock', () => {
  let bulkWhitelistedRole;
  let signers, notAdminSigner, accounts;

  before(async () => {
    signers = await ethers.getSigners();
    [, notAdminSigner] = signers;
    [,, ...accounts] = signers.map(s => s.address);
  });

  beforeEach(async () => {
    const BulkWhitelistedRoleMock = await ethers.getContractFactory('BulkWhitelistedRoleMock');
    bulkWhitelistedRole = await BulkWhitelistedRoleMock.deploy();
    await bulkWhitelistedRole.initialize();
  });

  it('should add and remove multiple accounts', async () => {
    await bulkWhitelistedRole.bulkAddWhitelisted(accounts);
    expect(accounts.length).to.be.above(0);

    for (const account of accounts) {
      expect(await bulkWhitelistedRole.isWhitelisted(account)).to.be.equal(true);
    }

    await bulkWhitelistedRole.bulkRemoveWhitelisted(accounts);
    for (const account of accounts) {
      expect(await bulkWhitelistedRole.isWhitelisted(account)).to.be.equal(false);
    }
  });

  it('should not allow add or remove accounts from non-admin address', async () => {
    await expect(
      bulkWhitelistedRole.connect(notAdminSigner).bulkAddWhitelisted(accounts),
    ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_ADMIN');

    await expect(
      bulkWhitelistedRole.connect(notAdminSigner).bulkRemoveWhitelisted(accounts),
    ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_ADMIN');
  });
});
