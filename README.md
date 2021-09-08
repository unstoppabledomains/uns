# UNS (Unstoppable Naming Service)

UNS Registry smart contracts.  
Author: Unstoppable Domains, Inc., 2021.  All rights reserved.

## Specifications

1.  Implements ERC721

    [ERC-721](https://eips.ethereum.org/EIPS/eip-721) Non-Fungible Token Standard

2.  Implements ERC165

    [ERC-165](https://eips.ethereum.org/EIPS/eip-165) Standard Interface Detection

3.  Implements IERC721Metadata

    > IERC721Metadata is an extension of ERC-721. IERC721Metadata allows smart contract to be interrogated for its name and for details about the assets which your NFTs represent.

    Ref: https://eips.ethereum.org/EIPS/eip-721

4.  Implements [IUNSRegistry](./contracts/IUNSRegistry.sol)

5.  Record Storage (aka Resolver)

    Record Storage implements [IRecordStorage](./contracts/IRecordStorage.sol)

6.  Support meta-transactions

    [EIP-2771](https://eips.ethereum.org/EIPS/eip-2771): Secure Protocol for Native Meta Transactions

    ### Recipient:

    In order to support `EIP-2771` recepient should implement `Context`.

    ```solidity
    interface Context {
        function _msgSender() internal view returns (address);
        function _msgData() internal view returns (bytes calldata);
    }
    ```

    The implementation should allow replacement of `_msgSender` and `_msgData` in case of forwarding.

    Implementation [ERC2771RegistryContext.sol](./contracts/metatx/ERC2771RegistryContext.sol)

    ### Forwarder:

    ```solidity
    struct ForwardRequest {
        address from;
        uint256 gas;
        uint256 tokenId;
        uint256 nonce;
        bytes data;
    }

    interface Forwarder {
        /**
         * @dev Return current token nonce
         */
        function nonceOf(uint256 tokenId) public view returns (uint256);

        /**
         * @dev Verify signature against provided request
         */
        function verify(ForwardRequest calldata req, bytes calldata signature) public view returns (bool);

        /**
         * @dev Execute bytecode if signature is correct
         */
        function execute(ForwardRequest calldata req, bytes calldata signature) public returns (bool, bytes memory);
    }
    ```

    Implementation [UNSRegistryForwarder.sol](./contracts/metatx/UNSRegistryForwarder.sol)

7.  Upgradability

    > By design, smart contracts are immutable. On the other hand, software quality heavily depends on the ability to upgrade and patch source code in order to produce iterative releases. Even though blockchain based software profits significantly from the technology’s immutability, still a certain degree of mutability is needed for bug fixing and potential product improvements.

    Upgradability comes from two patterns:
    1. Initializable
        > Since a proxied contract can't have a constructor, it's common to move constructor logic to an
        external initializer function, usually called `initialize`. It then becomes necessary to protect this initializer
        function so it can only be called once.
    2. Context
        > Provides information about the current execution context, including the
        sender of the transaction and its data.

    UNS uses [Transparent Proxy](https://blog.openzeppelin.com/the-transparent-proxy-pattern/) for upgradability.

    Refs:

    - [IMPORTANT: Storage layout](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable#modifying-your-contracts)
    - [Writing Upgradeable Contracts](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable)
    - [UUPS Proxies: Tutorial (Solidity + JavaScript)](https://forum.openzeppelin.com/t/uups-proxies-tutorial-solidity-javascript/7786)
    - [Transparent vs UUPS Proxies](https://docs.openzeppelin.com/contracts/4.x/api/proxy#transparent-vs-uups)

8. TLD management

    UNS TLD management is delegated to MintingManager contract.

    ```solidity
    contract IMintingManager {
        /**
         * @dev Mapping TLD `hashname` to TLD label
         *
         * `hashname` = uint256(keccak256(abi.encodePacked(uint256(0x0), keccak256(abi.encodePacked(label)))))
         */
        mapping(uint256 => string) internal _tlds;
    }
    ```

9. Domin minting

    **Unstoppable Domains, Inc.** reserves all rights of domains minting and defines rules of domain minting through MintingManager contract.

10. Roles model

    TBD

## Main stack

- Solidity `^0.8.0`
- OpenZeppelin contracts-upgradeable `^4.1.0`
- Hardhat `^2.4.1`
- ethers.js `^5.1.4`

## Environment variables

- `RINKEBY_INFURA_KEY` - Infura key for connecting to Ethereum Node
- `RINKEBY_UNS_PRIVATE_KEY` - Private key of account for contracts deployment
- `ETHERSCAN_API_KEY` - Etherscan API Key for smart contracts verification

NOTE: All private keys should be in HEX format with `0x` prefix


Variables [`RINKEBY_INFURA_KEY`, `RINKEBY_UNS_PRIVATE_KEY`] are required for operating with Rinkeby network, including deployment and making smart contract calls.

<div id="backward-incompatibility"></div>

## Backward incompatibility

Note: List of changes which makes UNS and CNS backward incompatibile

### Events

* `event Approved ApprovedForAll Transfer NewURI`
  * Unchanged
* `event Resolve(uint256 indexed tokenId, address indexed to)` 
  * Removed
  * UNS has a single resolver which is Registry, so one can assume that resolver is always set to registry address
* `event Sync(address indexed resolver, uint256 indexed updateId, uint256 indexed tokenId)` 
  * Removed
  * There is no need for this event because there is only one resolver and changes can be tracked by `Set` event instead
* `event Set(uint256 indexed tokenId, string indexed keyIndex, string indexed valueIndex, string key, string value)` 
  * Moved from Resolver to Registry
* `event NewKey(uint256 indexed tokenId, string indexed keyIndex, string key)` 
  * Moved from Resolver to Regisry
* `event ResetRecords(uint256 indexed tokenId)` 
  * Moved from Resolver to Registry
  * Registry now fires this event when records are reset on transfer.

#### Affected components

* Website Backend
  * UNS Mirror
* Resolution Service
  * UNS Mirror
* Resolution Libs
  * allRecords

### Read API

* `Registry.isController`
  * Removed

#### Affected Components

None

### Resolvers Removal

* `function resolveTo(address to, uint256 tokenId) external {}` 
  * Removed - UNS uses a single Resolver which is Registry itself.
* `function resolverOf(uint256 tokenId)`
  * Now always returns Regsitry address itself

#### Affected Components

* Website Backend
  * Records Management
* Website Frontend
  * Records Management
* Mobile App
  * Records Management

### Minting API change

Changes: 

* `MintingController`
  * Removed - minting permissions are now controlled by single upgradable `MintingManager` contract
* `WhitelistedMinter`
  * Removed - `MintingManager` now has methods to do that.
* `MintingManager`
  * Added - it's minting methods are similar to old `WhitelistedMinter` but they all have additional parameter - `tld`

#### Affected Components

* Website Backend
  * Claim a domain
    * Including Delegate Claiming fee

### Internal package API changed


* `function controlledResolveTo(address to, uint256 tokenId) external {}` 
  * Removed
* `function sync(uint256 tokenId, uint256 updateId) external {}`
  * Removed
* `function preconfigure(string[] memory keys, string[] memory values, uint256 tokenId) external {}` 
  * Removed due to removing controllers

#### Affected Components: None

---
## Sandbox

[>> README](./sandbox/README.md)

## Deploying contracts

Scripts for deploying contracts are located inside `./scripts` directory. In order to run them, you can use
the following command:

```
yarn hardhat run --network <network> scripts/filename.js
```

As scripts make JSON-RPC calls to Infura and sign transactions, you'll need to specify 2 environment variables.
Those variables' names depend on the network you want deploy the contracts to. Assuming you want to deploy new contracts
to Rinkeby, you'll need the following variables:

```
export RINKEBY_UNS_PRIVATE_KEY=<HEX_PRIVATE_KEY>
export RINKEBY_INFURA_KEY=<INFURA_PROJECT_ID>
```

The scripts located in `./scripts` directory are wrappers around Deployer tasks. You can see their definitions inside
`src/tasks.js`.

### Deploying CNS

```
yarn hardhat run --network <network> scripts/deploy_CNS.js
```

### Deploying UNS

UNS depends on CNS, as CNS registry address is used as a MintingManager's initializer argument. Before deploying UNS,
make sure that CNS is deployed and actual CNS contract addresses are specified in the `uns-config.json` file.

```
yarn hardhat run --network <network> scripts/deploy.js
```

Warning: In case of contracts' redeployment, make sure there is no deployment output file `.deployer/{chain_id}.json`


## Migrations

### Universal forwarder (rinkeby)
1. `yarn hardhat run --network rinkeby scripts/deploy_CNS_Forwarders.js`
2. `yarn hardhat run --network rinkeby scripts/upgrade_MintingManager.js`
3. `yarn hardhat run --network rinkeby scripts/deploy_MintingManagerForwarder.js`
4. `yarn hardhat run --network rinkeby scripts/upgrade_UNSRegistry.js`
5. ---next---
6. Upgrade MintingManager
7. *Add minting support .crypto in UNS `mintingManager.addTld('crypto')`
8. Deploy ProxyReader

