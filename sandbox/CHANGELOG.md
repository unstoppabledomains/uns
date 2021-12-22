## v0.2
- Adds possibility to migrate CNS domain to UNS registry through functions:
  - `safeTransferFrom(address,address,uint256)`
  - `safeTransferFrom(address,address,uint256,bytes)` (where last `bytes` parameter receives
  `abi.encode(['bool'], [false])`))

## v0.1
- CNSRegistry with SignatureController, URIPRefixController, MintingController and Resolver
- CNSRegistryForwarder - forwarding contract wraps legacy CNS SignatureController
- ResolverForwarder - forwarding contract wraps legacy CNS Resolver
- UNSRegistry
- ProxyReader - allows to read data from UNS and CNS registries
- MintingManager with permisssions to mint domains in UNS and CNS registries
- MintingManagerForwarder - forwarding contract MintingManager