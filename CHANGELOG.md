## v0.5.7
- Add `GALA` token to resolver list

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
