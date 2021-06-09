# UNS

UNS registry smart contracts.

## Specifications

1.  Implements ERC721

    ERC-721 Non-Fungible Token Standard

    Ref: https://eips.ethereum.org/EIPS/eip-721

2.  Implements ERC165

    ERC-165 Standard Interface Detection

    Ref: https://eips.ethereum.org/EIPS/eip-165

3.  Implements IERC721Metadata

    IERC721Metadata is an extension of ERC-721. IERC721Metadata allows smart contract to be interrogated for its name and for details about the assets which your NFTs represent.

    Ref: https://eips.ethereum.org/EIPS/eip-721


4.  Implements IRegistry

    ```solidity
    interface IRegistry /_ is IERC721Metadata, ISLDMinter, IRecordStorage _/ {

        event NewURIPrefix(string prefix);

        function setTokenURIPrefix(string calldata prefix) external;

        function isApprovedOrOwner(address spender, uint256 tokenId) external view returns (bool);

        function resolverOf(uint256 tokenId) external view returns (address);

        function childIdOf(uint256 tokenId, string calldata label) external pure returns (uint256);

        function setOwner(address to, uint256 tokenId) external;

        /**
        * @dev Burns `tokenId`. See {ERC721-_burn}.
        *
        * Requirements:
        *
        * - The caller must own `tokenId` or be an approved operator.
        */
        function burn(uint256 tokenId) external;
    }
    ```


5.  Records Storage

    Records Storage early known as Resolver

    ```solidity
    interface IRecordStorage {
        event Set(uint256 indexed tokenId, string indexed keyIndex, string indexed valueIndex, string key, string value);

        event NewKey(uint256 indexed tokenId, string indexed keyIndex, string key);

        event ResetRecords(uint256 indexed tokenId);

        function set(string calldata key, string calldata value, uint256 tokenId) external;

        function setMany(string[] memory keys, string[] memory values, uint256 tokenId) external;

        function reconfigure(string[] memory keys, string[] memory values, uint256 tokenId) external;

        function reset(uint256 tokenId) external;
    }
    ```

    ### Ideas:

    1. `bytes32 key` instead of `string key`

       ```solidity
       mapping (uint256 => mapping (uint256 =>  mapping (string => string))) internal _records;
       ```

       Replace by:

       ```solidity
       mapping (uint256 => mapping (uint256 =>  mapping (bytes32 => string))) internal _records;
       ```

       Pros:

       - less dynamic types -> cheaper usage

       Cons:

       - key max length is 32 characters
       - usage will always require conversion between string and bytes32

6.  Support meta-transactions

    EIP-2771: Secure Protocol for Native Meta Transactions

    Ref: https://eips.ethereum.org/EIPS/eip-2771

    ### Recipient:

    In order to support `EIP-2771` recepient should implement `Context`.

    ```solidity
    interface Context {
        function _msgSender() internal view returns (address);
        function _msgData() internal view returns (bytes calldata);
    }
    ```

    The implementation should allow replacement of `_msgSender` and `_msgData` in case of forwarding.

    ```solidity
    abstract contract ERC2771Context is Context {
        function isTrustedForwarder(address forwarder) public view virtual returns(bool) {
            return forwarder == address(this);
        }

        function _msgToken() internal view virtual returns (uint256 tokenId) {
            if (isTrustedForwarder(msg.sender)) {
                assembly { tokenId := calldataload(sub(calldatasize(), 32)) }
            }
        }

        function _msgSender() internal view virtual override returns (address sender) {
            if (isTrustedForwarder(msg.sender)) {
                // The assembly code is more direct than the Solidity version using `abi.decode`.
                assembly { sender := shr(96, calldataload(sub(calldatasize(), 52))) }
            } else {
                return super._msgSender();
            }
        }

        function _msgData() internal view virtual override returns (bytes calldata) {
            if (isTrustedForwarder(msg.sender)) {
                return msg.data[:msg.data.length-52];
            } else {
                return super._msgData();
            }
        }
    }
    ```

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

    ### TBD:

    - `RegistryForwarder` implementation:

      - [design flaw](https://github.com/unstoppabledomains/uns/pull/2/commits/53990cbf9ea6d21a3cd1b299d600786bd0ef84fc#diff-509d7bcab22bd6041f0ee0295fc0c0e9ce606c73aac737abcf5b6f78908e860cR37-R54): `req.tokenId` does not coupled with `req.data.tokenId`, leads to security breach ([solution](https://github.com/unstoppabledomains/uns/pull/2/commits/75c07d061c35a0bbbcc9f54081b0c9bc4e8b99f4#diff-ca840be5bb23f8405058ac3d81aa16ee9bbe19cd811b1d83bd32ef71239d0e20R54))
      - should `execute` function be `payable`?
      - does it make sence to have `req.gas`?
      - do we need `expiry` check?

7.  Controllers

    - Removed SignatureController
    - Removed URIPrefixController
    - Removed MintingController

8.  Upgradable registry

    TBD:

    - [Transparent vs UUPS Proxies](https://docs.openzeppelin.com/contracts/4.x/api/proxy#transparent-vs-uups)

    Refs:

    - [IMPORTANT: Storage layout](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable#modifying-your-contracts)
    - [Writing Upgradeable Contracts](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable)
    - [UUPS Proxies: Tutorial (Solidity + JavaScript)](https://forum.openzeppelin.com/t/uups-proxies-tutorial-solidity-javascript/7786)

9. TLD management

    ```solidity
    contract IMintingManager is ISLDMinter, IClaimer {
        /**
         * @dev Mapping TLD `hashname` to TLD label
         *
         * `hashname` = uint256(keccak256(abi.encodePacked(uint256(0x0), keccak256(abi.encodePacked(label)))))
         */
        mapping(uint256 => string) internal _tlds;
    }
    ```

10. Multicalls
11. Roles model

## Main stack

- Solidity `^0.8.0`
- OpenZeppelin contracts-upgradeable `^4.1.0`
- Hardhat `^2.2.1`
- ethers.js `^5.1.4`

## Upgradeable proxy

- Deploy registry `yarn deploy:proxy:localhost`
- Upgrade registry `PROXY_ADDRESS={proxy_address} yarn upgrade:proxy:localhost`

<div id="backward-incompatibility"></div>

## Backward incompatibility:

Note: List of changes which makes UNS and CNS backward incompatibile

### Events

* `event NewURI(uint256 indexed tokenId, string uri)` 
  * Removed
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
* Mobile App
  * Importing domains from blockchain

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
