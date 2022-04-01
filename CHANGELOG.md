## next release (v0.3.0)
- UNSRegistry@0.4.0 receives the Reverse Registry support
- ProxyReader@0.2.3 receives reverse records reading
- Remove ReverseResolver contract
- Upgrade Hardhat to v2.9.2

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