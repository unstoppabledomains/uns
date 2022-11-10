## PR Checklist

### 1. Contracts versioning
- [ ] Make sure that the `patch` version of the contracts is increased if changes have been made to the `UNSRegistry`, `MintingManager` or `ProxyReader` contracts.
- [ ] Make sure that the `minor` version of the contracts is increased if breaking changes have been made to the `UNSRegistry`, `MintingManager` or `ProxyReader` contracts. It includes changes of interfaces.
### 2. Contracts licensing
- [ ] Make sure that no **SPDX-License-Identifier** defined in contracts.
- [ ] Make sure that the **header** is added to the new contract files. 
  ```
  // @author Unstoppable Domains, Inc.
  // @date {Month} {Day}(ordinal), {Year}
  ```
### 3. Coverage
- [ ] Make sure that the coverage of contracts has not decreased and strive **100%**
### 4. Configs versioning
- [ ] Make sure that the version of `uns-config.json` is increased if changes have been made to the config.
- [ ] Make sure that the version of `resolver-keys.json` is increased if changes have been made to the config.
### 5. Sandbox
- [ ] Make sure that the Sandbox is updated if changes have been made to contracts or deployment configuration.
  ```
  yarn rebuild:sandbox
  ```
### 6. Package versioning
- [ ] Make sure that the `patch` version of package is increased if valuable changes have been made to the package. It includes contracts update, configs update, etc.
- [ ] Make sure that the `major.minor` version of package is synced with version of `UNSRegistry` contract.
- [ ] Make sure that the `CHANGELOG` is updated with short description for the new version. 
### 7. Code review
- [ ] `resolver-keys.json` code review is required from **DevTools** team
- [ ] For all other changes code review is required from **Registry** team
