## v0.9.44

- Added scripts to manage the ProxyReader resolution schema

## v0.9.43

- Upgraded MintingManager on Base Sepolia, Base Mainnet, Polygon Mainnet
- Rewrote all scripts to use gnosis safe instead of defender

## v0.9.42

- `MintingManager@0.6.0`: 
  - free domains (`uns-devtest-`) are no longer allowed
  - subdomains are no longer allowed

## v0.9.41
- Add revert if Seaport order is executed outside `SeaportProxyBuyer` contract
- Added a script to batch mint TLDs proposal

## v0.9.40

- Fixed `RegistrarCustody` minting permissions setup in sandbox

## v0.9.39

- Deployed `RegistrarCustody@0.1.0` on Amoy

## v0.9.38

- Upgraded `ENSCustody@0.1.4` on Sepolia and Mainnet

## v0.9.37

- Fixed `uns-config.json` for `RegistrarCustody`

## v0.9.36

- Added `RegistrarCustody` contract

## v0.9.35

- Added ability to internalTransfer parked domains in `ENSCustody`
- Added `multicall` to ENSCustody

## v0.9.34

- Add `.lfg`, `.dream` Polygon TLD

## v0.9.33

- Deploy `Multicall3` contract to the sandbox
- Add `Multicall3` Addresses to the `uns-config.json`

## v0.9.32

- Added permit functionality to usdcMock and make it upgradable

## v0.9.31

- Add `.smobler` Base TLD

## v0.9.30

- Added permit functionality to erc20Mock and made it upgradable

## v0.9.29

- Added functions for match orders zone authorization and validation on SeaportProxyBuyer

## v0.9.28

- Added `L1GasPriceOracle` ABI and addresses for base

## v0.9.27

- Deploy uns to base chain

## v0.9.26

- Fix `.pw` TLD config, make it expirable

## v0.9.25

- Deploy uns to base-sepolia chain
- Add `.udtest` TLD on base chain

## v0.9.24

- Tld config removed from the Minting manager
- Tld config introduced in the uns repo, constants.ts
- Added a deployment task that mints all TLDs from the TLD config

## v0.9.23

- Add `FARMS` MATIC token to resolver list

## v0.9.22

- Add `.raiin` TLD
- Add `.stepn` TLD

## v0.9.21

- Verify bulks signatures support for Seaport orders
- Add gas estimations for bulk orders fullfillment

## v0.9.20

- Add `.ca` TLD

## v0.9.19

- Deploy `SeaportProxyBuyer@0.1.0` contract to `Polygon` mainnet 

## v0.9.18

- Deploy `SeaportProxyBuyer@0.1.0` contract to `Amoy` testnet

## v0.9.17

- Add minter to `SeaportProxyBuyer` contract in sandbox
- Add USDC addresses to `uns-config.json`

## v0.9.16

- Add `.witg` TLD
- Add `.metropolis` TLD
- Add `.wrkx` TLD
- Add `.secret` TLD

## v0.9.15

- Add SeaportProxyBuyer contract
- Update sandbox RPC server to Foundry Anvil to support cancun hardfork
- Add Seaport contracts to sandbox

## v0.9.14

- Added `scripts/util/deploy_ERC1271SimpleWallet.ts` utility script

## v0.9.13

- Added `USDT` MATIC token to resolver list
- Added `WETH` token to resolver list

## v0.9.12

- Upgraded `UNSRegistry` and `MintingManager` on Polygon Mainnet

## v0.9.11

- Switched verification scripts to use Polygonscan for Amoy

## v0.9.10

- Migrated to `ethers@6`, updated other dependencies

## v0.9.9

- Add `.clay` TLD

## v0.9.8

- Fixed MintableERC721Predicate deployment block for sepolia

## v0.9.7

- Deployed smart contracts to Sepolia, Amoy
- Removed Goerli, Mumbai

## v0.9.6

- Add `.pog` TLD

## v0.9.5

- Add `.bitget` TLD

## v0.9.4

- Upgraded `UNSRegistry` and `MintingManager` on mumbai

## v0.9.3

- Added `unlock` to UNSRegistry@0.9.1
- Added `revoke` to MintingManager@0.5.1 used to revoke expirable domains

## v0.9.2

- Add `.austin` TLD

## v0.9.1

- Add ENS `Root` contract to sandbox

## v0.9.0

- `UNSRegistry@0.9.0` receives support for expirable domains
- `MintingManager@0.5.0` receives support for expirable domains, TLDs

## v0.8.49

- Add `.pudgy` TLD

## v0.8.48

- Add hdkey to dependencies

## v0.8.47

- Add `NIBI` token

## v0.8.46

- Deployed ZilliqaRecover to polygon mainnet

## v0.8.45

- Deprecated `OKC` ERC20 and added `OKB` ERC20

## v0.8.44

- Fix missing config variables

## v0.8.43

- Added ZilliqaRecover contract

## v0.8.42

- Added test for Multicall + ERC2771 malicious calldata

## v0.8.41

- Add `.altimist` TLD

## v0.8.40

- Updated `ERG` UNS token validation regex

## v0.8.39

- Updated `ADA` ENS token validation regex

## v0.8.38

- Update regex validation across a set of tokens

## v0.8.37

- Add ENS DNSSEC smart contracts to configs, artifacts and sandbox

## v0.8.36

- Upgraded `MintingManager@0.4.18` on Mumbai and Polygon mainnet

## v0.8.35

- `MintingManager@0.4.18` added cross-chain replay protection for on-chain purchases

## v0.8.34

- Upgraded `MintingManager@0.4.17` on Mumbai and Polygon mainnet

## v0.8.33

- Added legacy public resolver addresses to ens config

## v0.8.32

- `MintingManager@0.4.17` receives support for on-chain purchases with native tokens and ERC20

## v0.8.31

- Fix LegacyETHRegistrarController ABI

## v0.8.30

- Upgraded ENSCustody@0.1.3 on Goerli and Mainnet

## v0.8.29

- London hardfork enabled in Sandbox

## v0.8.28

- ENSCustody@0.1.3 - Added `owner` parameter into `data` when depositing into custody

## v0.8.27

- Set default resolver in ReverseRegistrar

## v0.8.26

- Fix ENS custody deployment task

## v0.8.25

- Add `.go` TLD

## v0.8.24

- Add Legacy ETH registrar controller to ens-config.json, sandbox and artifacts

## v0.8.23

- Upgraded ENSCustody@0.1.2 on Goerli

## v0.8.22

- Add Legacy ENS registry to artifacts and to sandbox

## v0.8.21

- Add legacy ENS registries to `ens-config.json`

## v0.8.20

- ENSCustody@0.1.2 - Added ability to custody ERC1155 & ERC721 ENS tokens

## v0.8.19

- Update `SUI` token regex

## v0.8.18

- Upgrade ENSCustody@0.1.1 on Goerli and Mainnet

## v0.8.17

- Allow ENS domains renewal for non-parked domains

## v0.8.16

- Upgrade ProxyReader@0.5.0 on Mainnet and Polygon

## v0.8.15

- Deploy ENSCustody@0.1.0 on Mainnet

## v0.8.14

- Deploy ENSCustody@0.1.0 to Goerli

## v0.8.13

- Deploy ENSCustody@0.1.0 to sandbox

## v0.8.12

- Add ENS config
- Deploy ENS to sandbox

## v0.8.11

- Add ENSCustody contract to support ENS domains custody

## v0.8.10

- Upgrade ProxyReader@0.5.0 on Goerli and Mumbai

## v0.8.9

- ProxyReader@0.5.0 receives new blockchain family keys resolution interface

## v0.8.8

- Add `.realm` TLD

## v0.8.7

- Un-deprecate Railgun currencies

## v0.8.6

- Removed `MintingManager#bulkIssue` functionality
- Removed `MintingManager#upgradeAll` functionality

## v0.8.5

- Add `.binanceus` TLD

## v0.8.4

- Upgrade MintingManager@0.4.14 and UNSRegistry@0.8.1 on Polygon

## v0.8.3

- Upgrade MintingManager@0.4.14 and UNSRegistry@0.8.1 on Mumbai

## v0.8.2

- Re-introduced `MintingManager#bulkIssue` functionality
- Re-introduced `MintingManager#upgradeAll` functionality, ensuring it ignores label validation
- Ensured that upgraded tokens could not be used to issue subdomains
- Fixed `multicall` signature override warning

## v0.8.1

- Add `.anime`, `.manga` TLDs

## v0.8.0

- Add `multicall` function to UNSRegistry. The function executes a batch of function calls. It can be used in meta-transactions.

## v0.7.10

- UNSRegistry@0.7.3 cleanup, remove temporary `cleanReverseFromUDContracts` function.

## v0.7.9

- Add temporary `cleanReverseFromUDContracts` function to UNSRegistry in order to remove reverse records assigned to UNS contracts.
- Upgrade UNSRegistry@0.7.2 on Polygon

## v0.7.8

- Upgrade MintingManager@0.4.13 on Mainnet, Polygon, Mumbai, Goerli

## v0.7.7

- Issuing of subdomains with reverse record is limited in MintingManager. It is possible to set a reverse record to the same address as the parent domain owner.

## v0.7.6

- Add `MCONTENT` token for `ERC20` && `BEP20` to resolver list

## v0.7.5

- Remove `backfillReverseNames(string[][])` function from `UNSRegistry`
- Remove `backfillReverseNames(string[][])` function from `MintingManager`

## v0.7.4

- Upgraded yarn version to `v3`. Deduped some packages.

## v0.7.3

- Add `VERSE` token to resolver list

## v0.7.2

- Upgrade UNSRegistry@0.7.0 on Mainnet, Polygon, Mumbai, Goerli

## v0.7.1

- Add `HI` token to resolver list

## v0.7.0

### Breaking changes

- Remove `setReverse(uint256)` function from `UNSRegistry`

### Non-breaking changes

- Remove `unlockWithRecords(address,uint256,string[],string[],bool)` function from `UNSRegistry`

## v0.6.39

- Add `.kresus` TLD

## v0.6.38

- Fix `LSK` token regex

## v0.6.37

- Deploy UNSOperator@0.1.0 on Mainnet, Polygon

## v0.6.36

- Upgrade UNSRegistry@0.6.4 on Mainnet, Polygon
- Upgrade MintingManager@0.4.11 on Mainnet, Polygon
- Upgrade ProxyReader@0.4.1 on Mainnet, Polygon

## v0.6.35

- Fix Sandbox to make it possible to run multiple instances (issue since v0.6.4)

## v0.6.34

- Upgrade UNSRegistry@0.6.4 on Goerli, Mumbai
- Upgrade MintingManager@0.4.11 on Goerli, Mumbai
- Upgrade ProxyReader@0.4.1 on Goerli, Mumbai

## v0.6.33

- Add new `setReverse(string[])` function to support unhashing for reverse resolution
- Add `reverseNameOf(address) (string)` function. Returns domain name for provided address
- Mark `setReverse(uint256)` as deprecated. Function will be removed in the next update
- Add temporary `backfillReverseNames(string[][])` function to backfill `tokenId => domainName` mapping for existing reverse resolution records. Function will be removed in the next update

## v0.6.32

- Deploy UNSOperator@0.1.0 on Goerli, Mumbai
- Upgrade MintingManager@0.4.10 on Goerli, Mumbai

## v0.6.31

- MintingManager@0.4.10 fixed minting subdomains from minter when parent is approved for UNSOperator
- UNSOperator@0.1.0 Added plain upgradeable contract
- Ensured dev environments so that hardhat.config.ts and related dependencies are properly included in tests

## v0.6.30

- MintingManager@0.4.9 remove blocklist method

## v0.6.29

- Fix `XLA` token regex

## v0.6.28

- Add `GTH` token to resolver list
- Fix `XLA` token regex

## v0.6.27

- UNSRegistry@0.6.3 Cleanup deprecated methods
- MintingManager@0.4.8 Cleanup deprecated methods

## v0.6.26

- Add OpenZeppelin Defender support
- Upgrade MintingManager@0.4.7 on Goerli

## v0.6.25

- Forbid domain names minting with leading and ending hyphens (`-test1-.crypto`, `unstoppable-.crypto`, etc.)

## v0.6.24

- Add `POKT` token to resolver list
- Add `KAI` token to resolver list
- Add `XLA` token to resolver list
- Add `APT` token to resolver list

## v0.6.23

- Add `.hi` TLD

## v0.6.22

- Add multi-chain records for `BNB` token
- Add multi-chain records for `USDC` token
- Update validation regex for `ONE`
- Update validation regex for `XVG`
- Update validation regex for `LSK`

## v0.6.21

- Add `DESO` token to resolver list
- Add `FLR` token to resolver list
- Add `SGB` token to resolver list

## v0.6.20

- Update validation regex for 'NEAR'

## v0.6.19

- Add `SWEAT` token to resolver list

## v0.6.18

- Blocklist cleanup
- Pausable cleanup
- MintingManager@0.4.6 isBlocklistDisabled removed

## v0.6.17

- MintingManager@0.4.5 fix domain label validation
- Upgrade MintingManager@0.4.5 on Goerli, Mumbai, Mainnet and Polygon

## v0.6.16

- Upgrade UNSRegistry@0.6.2 on Goerli, Mumbai, Mainnet and Polygon
- Upgrade MintingManager@0.4.4 on Goerli, Mumbai, Mainnet and Polygon

## v0.6.15

- MintingManager@0.4.4 added domain label validation

## v0.6.14

- Added enforcing minting, bulkMint support

## v0.6.13

- [Bugfix] Sandbox deployment

## v0.6.12

- Automated release workflow, fixed TS build

## v0.6.11

- UNSRegistry@0.6.1 cleanup
- MintingManager@0.4.2 cleanup

## v0.6.10

- Deploy new version of DotCoinBurner contract with indexed `BatchCompleted` event properties

## v0.6.9

- Add `SUI` and `MOON` tokens to resolver list

## v0.6.8

- Mark `ERC20`, `BEP20`, and `MATIC` versions for `Railgun` as deprecated

## v0.6.7

- Deploy ProxyReader@0.4.0 on Goerli, Mumbai, Mainnet and Polygon

## v0.6.6

- Made ProxyReader@0.4.0 upgradeable

## v0.6.5

- Remove MintingManager.\_ownerOf and use exists & ownerOf instead

## v0.6.4

- Migrated the repository to `typescript`

## v0.6.3

- Upgrade UNSRegistry@0.6.0 on Mainnet and Polygon
- Upgrade MintingManager@0.4.0 on Mainnet and Polygon
- Upgrade ProxyReader@0.3.0 on Goerli, Mumbai, Mainnet and Polygon

## v0.6.2

- Update `KLV` regular expression

## v0.6.1

- Upgrade UNSRegistry@0.6.0 on Goerli and Mumbai
- Upgrade MintingManager@0.4.0 on Goerli and Mumbai

## v0.6.0

- UNSRegistry@0.6.0 receives support for subdomains
- MintingManager@0.4.0 receives support for subdomains
- ProxyReader@0.3.0 receives support for subdomains

## v0.5.22

- Add DotCoinBurner smart contract to support batch returns of .coin domains

## v0.5.21

- Add `.klever` TLD

## v0.5.20

- Added ability to burn TLD tokens via MintingManager#burnTLDL1
- Added ability to move TLD tokens ownership to MintingManager via MintingManager#moveTLDOwnershipL2

## v0.5.19

- Update `HBAR` regular expression

## v0.5.18

- Add `0ZK` token to resolver list

## v0.5.17

- Add `BEAM` token to resolver list
- Upgrade Hardhat to v2.11.0 post-Merge test

## v0.5.16

- Upgrade UNSRegistry@0.5.1 on Mainnet and Polygon
- Upgrade MintingManager@0.3.4 on Mainnet and Polygon

## v0.5.15

- Add `FET` as a multi-chain token to resolver list

## v0.5.14

- Add `FAB` token to resolver list

## v0.5.13

- Add `FIRO` token to resolver list
- Mark `XZC` token as deprecated

## v0.5.12

- Upgrade UNSRegistry@0.5.1 on Goerli and Mumbai
- Upgrade MintingManager@0.3.4 on Goerli and Mumbai

## v0.5.11

- Added ability to mark tokens as upgraded via MintingManager#upgradeAll
- Fixed the case when domain transfer caused removing of reverse resolution for domain, which wasn't transfered
- Added script to fetch on-chain token list

## v0.5.10

- Add `MOBX` token to resolver list
- Update `@openzeppelin/contracts-upgradeable` to 4.7.3 (https://github.com/OpenZeppelin/openzeppelin-contracts/security/advisories/GHSA-4h98-2769-gh6h)

## v0.5.8

- Add `GALA` token to resolver list

## v0.5.7

- Upgrade UNSRegistry@0.5.0 on Mainnet and Polygon

## v0.5.6

- Add regexes to coins with `validationRegex` property set to `null` value in the resolver list

## v0.5.5

- Add `B2M` token to resolver list

## v0.5.4

- Add `DOG` token to resolver list

## v0.5.3

- Fix ganache initializations for versions 7.1.0 and higher

## v0.5.2

- Upgrade UNSRegistry@0.5.0 on Goerli and Mumbai

## v0.5.1

- Rename ERC1271SmartWalletMock to ERC1271SimpleWallet
- Add ERC1271SimpleWallet ABI

## v0.5.0

- Update `solc` to 0.8.4
- Update `@openzeppelin/contracts-upgradeable` to 4.7.1 (https://github.com/advisories/GHSA-4g63-c64m-25w9)
- UNSRegistry@0.5.0 increase version due to `ERC721` contract update with segnificant changes (eg. `ERC721: owner query for nonexistent token` error replaced by `ERC721: invalid token ID`, it might be important for clients)
- MintingManager@0.3.3 increase version due to `Initializable` contract update

## v0.4.10

- Add `OKC` token to resolver list

## v0.4.9

- Added configuring reverse resolution on minting automatically

## v0.4.8

- Added `YLD` token to resolver list

## v0.4.7

- Remove TwitterValidationOperator and related contracts

## v0.4.6

- Renamed 'MockCheckpointManager' to 'SimpleCheckpointManager'

## v0.4.5

- Added `NewHeaderBlock` event to `MockCheckpointManager`
- Improved `sandbox:rebuild` so that it now updates `uns-config.json`

## v0.4.4

- UNSRegistry@0.4.1 - receives support for smart contract wallet meta-transactions

## v0.4.3

- Add `.unstoppable` TLD

## v0.4.2

- Add `.zil` and `.polygon` TLDs

## v0.4.1

- Remove invalid ELA versions

## v0.4.0

- UNSRegistry@0.4.0 receives the Reverse Registry support
- ProxyReader@0.2.3 receives reverse records reading
- Remove ReverseResolver contract
- Upgrade Hardhat to v2.9.2
- Upgrade Sandbox to v0.6

### Migration notes

- Upgrade UNSRegistry without storage layout check (`unsafeSkipStorageCheck`)
- Deploy ProxyReader (current move to legacy)
- Deploy ResolverForwarder (current move to legacy)

## v0.2.3

- Upgrade Sandbox to v0.5
- Remove Rinkeby from config

## v0.2.2

- Update BTC regex to support BECH32 (P2WSH) address format
- Fix ZEC sapling regexp
- Add YEC regexp for Ycash support

## v0.2.1

- Upgrade Ganache to v7.0.0
- Upgrade Sandbox to v0.4

## v0.2.0

- ProxyReader@0.2.2 receives unbreakable resolve's data reading
- UNSRegistry@0.3.0 receives the ability to withdraw tokens from L2
- SafeMath is redundant for solidity v0.8 (ProxyReader and TwitterValidationOperator affected)
- Remove WhitelistedMinter from deployment of CNS
- Remove legacy meta-transactions from UNSRegistryForwarder
- Remove Relayer contract, release MintingManager@0.3.0
- Disable minting legacy free domains (`udtestdev-` legacy free domain prefix). New free domain prefix `uns-devtest-`
- UNSRegistry@0.3.0 receives L2 Polygon support
  - RootRigistry - abstract contract implements L1-side Polygon support
  - ChildRegistry - abstract contract implements L2-side Polygon support

### Migration notes

- MintingManager contract requires post-upgrade operation. MintingManager minter role should be removed from MintingManager.
- UNSRegistry contract requires post-upgrade operations:
  - CNSRegistry address should be added by calling function `setCNSRegistry`
  - RootChainManager address should be added by calling function `setRootChainManager`

## v0.1.0

NOTE: the version aggregates different project's iterations

- Contracts:
  - UNSRegistry
  - MintingManager
  - ProxyReader
  - Forwarders
  - ReverseResolver
- Supported networks:
  - mainnet:1
  - rinkeby:4
  - goerli:5
  - sandbox:1337
  - polygon:137
  - mumbai:80001
- [Sandbox](./sandbox/README.md)
- [UNS config](./uns-config.json)
- [Resolver keys](./resolver-keys.json)
