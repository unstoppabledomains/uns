## v0.6
- Rebuild sandbox (UNS v0.6.0)

## v0.5
- Rebuild sandbox (UNS v0.5.0)

## v0.4
- Rebuild sandbox (UNS v0.4.0)
- Add TLDs:
  - `.zil`
  - `.polygon`
  - `.unstoppable`

## v0.3
- Rebuild sandbox (UNS v0.2.0)
- Upgrade Ganache to v7.0.0
- Configure tokenURI prefix (prefix = `https://example.com/`):
  - `UNS.tokenURI(0x{tokenId})` -> `https://example.com/0x{tokenId}`
  - `CNS.tokenURI(0x{tokenId})` -> `https://example.com/{domain_label}.crypto`

## v0.2
- Add possibility to migrate CNS domain to UNS registry through functions:
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