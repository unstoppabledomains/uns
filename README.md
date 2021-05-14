# UNS

UNS registry smart contracts.

## Specifications

1.  Implements ERC721

    ERC-721 Non-Fungible Token Standard

    Ref: https://eips.ethereum.org/EIPS/eip-721

2.  Implements ERC165

    ERC-165 Standard Interface Detection

    Ref: https://eips.ethereum.org/EIPS/eip-165

3.  Implements ERC721Burnable

    ERC721Burnable is an extension of ERC-721

    Ref: https://eips.ethereum.org/EIPS/eip-721

4.  Implements IERC721Metadata

    IERC721Metadata is an extension of ERC-721. IERC721Metadata allows smart contract to be interrogated for its name and for details about the assets which your NFTs represent.

    Ref: https://eips.ethereum.org/EIPS/eip-721

    ### Backward incompatibility:

    Note: List of changes which makes UNS and CNS backward incompatibile

    - Major `tokenURI()` difference

      ```
      CNS.tokenURI() => {prefix}{domain_name}

      UNS.tokenURI() => records['metadata.uri'].value || {prefix}{tokin_id}
      ```

    - `tokenURI()` returns empty string(by default) when `prefix` is empty string
    - `event NewURI(uint256 indexed tokenId, string uri)` removed
    - [TO_BE_IMPL]: When `metadata.uri` recond is defined, `tokenURI()` returns value of the record instead of default uri

    ### TBD:

    - `tokenURI()` returns empty string(by default) when `prefix` is empty string

      ```
      CNS.tokenURI() => prefix ? {prefix}{domain_name} : {domain_name}

      UNS.tokenURI() => prefix ? {prefix}{tokin_id} : ''
      ```

5.  Implements IRegistry

    ```
    interface IRegistry /_ is IERC721Metadata, IRecordStorage _/ {

        event NewURIPrefix(string prefix);

        /**
         * @dev Controlled function to set the token URI Prefix for all tokens.
         * @param prefix string URI to assign
         */
        function controlledSetTokenURIPrefix(string calldata prefix) external;

        /**
         * @dev Returns whether the given spender can transfer a given token ID.
         * @param spender address of the spender to query
         * @param tokenId uint256 ID of the token to be transferred
         * @return bool whether the msg.sender is approved for the given token ID,
         * is an operator of the owner, or is the owner of the token
         */
        function isApprovedOrOwner(address spender, uint256 tokenId) external view returns (bool);

        /**
         * @dev Mints a new a child token.
         * Calculates child token ID using a namehash function.
         * Requires the msg.sender to be the owner, approved, or operator of tokenId.
         * Requires the token not exist.
         * @param to address to receive the ownership of the given token ID
         * @param tokenId uint256 ID of the parent token
         * @param label subdomain label of the child token ID
         */
        function mintChild(address to, uint256 tokenId, string calldata label) external;

        /**
         * @dev Controlled function to mint a given token ID.
         * Requires the msg.sender to be controller.
         * Requires the token ID to not exist.
         * @param to address the given token ID will be minted to
         * @param label string that is a subdomain
         * @param tokenId uint256 ID of the parent token
         */
        function controlledMintChild(address to, uint256 tokenId, string calldata label) external;

        /**
         * @dev Transfers the ownership of a child token ID to another address.
         * Calculates child token ID using a namehash function.
         * Requires the msg.sender to be the owner, approved, or operator of tokenId.
         * Requires the token already exist.
         * @param from current owner of the token
         * @param to address to receive the ownership of the given token ID
         * @param tokenId uint256 ID of the token to be transferred
         * @param label subdomain label of the child token ID
         */
        function transferFromChild(address from, address to, uint256 tokenId, string calldata label) external;

        /**
         * @dev Controlled function to transfers the ownership of a token ID to
         * another address.
         * Requires the msg.sender to be controller.
         * Requires the token already exist.
         * @param from current owner of the token
         * @param to address to receive the ownership of the given token ID
         * @param tokenId uint256 ID of the token to be transferred
         */
        function controlledTransferFrom(address from, address to, uint256 tokenId) external;

        /**
         * @dev Safely transfers the ownership of a child token ID to another address.
         * Calculates child token ID using a namehash function.
         * Implements a ERC721Reciever check unlike transferFromChild.
         * Requires the msg.sender to be the owner, approved, or operator of tokenId.
         * Requires the token already exist.
         * @param from current owner of the token
         * @param to address to receive the ownership of the given token ID
         * @param tokenId uint256 parent ID of the token to be transferred
         * @param label subdomain label of the child token ID
         * @param _data bytes data to send along with a safe transfer check
         */
        function safeTransferFromChild(address from, address to, uint256 tokenId, string calldata label, bytes calldata _data) external;

        /// Shorthand for calling the above ^^^ safeTransferFromChild function with an empty _data parameter. Similar to ERC721.safeTransferFrom.
        function safeTransferFromChild(address from, address to, uint256 tokenId, string calldata label) external;

        /**
         * @dev Controlled frunction to safely transfers the ownership of a token ID
         * to another address.
         * Implements a ERC721Reciever check unlike controlledSafeTransferFrom.
         * Requires the msg.sender to be controller.
         * Requires the token already exist.
         * @param from current owner of the token
         * @param to address to receive the ownership of the given token ID
         * @param tokenId uint256 parent ID of the token to be transferred
         * @param _data bytes data to send along with a safe transfer check
         */
        function controlledSafeTransferFrom(address from, address to, uint256 tokenId, bytes calldata _data) external;

        /**
         * @dev Burns a child token ID.
         * Calculates child token ID using a namehash function.
         * Requires the msg.sender to be the owner, approved, or operator of tokenId.
         * Requires the token already exist.
         * @param tokenId uint256 ID of the token to be transferred
         * @param label subdomain label of the child token ID
         */
        function burnChild(uint256 tokenId, string calldata label) external;

        /**
         * @dev Controlled function to burn a given token ID.
         * Requires the msg.sender to be controller.
         * Requires the token already exist.
         * @param tokenId uint256 ID of the token to be burned
         */
        function controlledBurn(uint256 tokenId) external;

        /**
         * @dev Provides child token (subdomain) of provided tokenId.
         * @param tokenId uint256 ID of the token
         * @param label label of subdomain (for `aaa.bbb.crypto` it will be `aaa`)
         */
        function childIdOf(uint256 tokenId, string calldata label) external pure returns (uint256);

        /**
         * @dev Transfer domain ownership without resetting domain records.
         * @param to address of new domain owner
         * @param tokenId uint256 ID of the token to be transferred
         */
        function setOwner(address to, uint256 tokenId) external;
    }
    ```

    ### Backward incompatibility:

    Note: List of changes which makes UNS and CNS backward incompatibile

    - `event NewURI(uint256 indexed tokenId, string uri)` removed
    - `event Resolve(uint256 indexed tokenId, address indexed to)` removed
    - `event Sync(address indexed resolver, uint256 indexed updateId, uint256 indexed tokenId)` removed
    - `function resolveTo(address to, uint256 tokenId) external {}` removed
    - `function controlledResolveTo(address to, uint256 tokenId) external {}` removed
    - `function sync(uint256 tokenId, uint256 updateId) external {}` removed
    - `function resolverOf(uint256 tokenId) external view returns (address) {}` returns registry's address
    - `function preconfigure(string[] memory keys, string[] memory values, uint256 tokenId) external {}` added as a controlled function
    - [TO_BE_IMPL]: `string calldata label` replaced by `bytes32 child` = `keccak256(abi.encodePacked(label))`

    ### TBD:

    - `function resolverOf(uint256 tokenId) external view returns (address) {}` returns registry's address

      Q: should it check existence of token?

    ### Ideas:

    - Controlled functions: combine with normal or split it into different interface, rename

6.  Records Storage

    Records Storage early known as Resolver

    ```
    interface IRecordStorage {
        event Set(uint256 indexed tokenId, string indexed keyIndex, string indexed valueIndex, string key, string value);

        event NewKey(uint256 indexed tokenId, string indexed keyIndex, string key);

        /**
         * @dev Function to set record.
         * @param key The key set the value of.
         * @param value The value to set key to.
         * @param tokenId ERC-721 token id to set.
         */
        function set(string calldata key, string calldata value, uint256 tokenId) external;

        /**
         * @dev Set or update domain records
         * @param keys New record keys
         * @param values New record values
         * @param tokenId ERC-721 token id of the domain
         */
        function setMany(string[] memory keys, string[] memory values, uint256 tokenId) external;

        /**
         * @dev Reset all domain records and set new ones
         * @param keys New record keys
         * @param values New record values
         * @param tokenId ERC-721 token id of the domain
         */
        function reconfigure(string[] memory keys, string[] memory values, uint256 tokenId) external;

        /**
         * @dev Function to reset all existing records on a domain.
         * @param tokenId ERC-721 token id to set.
         */
        function reset(uint256 tokenId) external;
    }
    ```

    ### Backward incompatibility:

    Note: List of changes which makes UNS and CNS backward incompatibile

    - `function preconfigure(string[] memory keys, string[] memory values, uint256 tokenId) external {}` removed

    ### Ideas:

    1. Remove presets

       ```
       // Mapping from token ID to preset id to key to value
       mapping (uint256 => mapping (uint256 =>  mapping (string => string))) internal _records;

       // Mapping from token ID to current preset id
       mapping (uint256 => uint256) internal _presets;
       ```

       Replace by:

       ```
       /**
        * @dev slot -> {key, value}
        * slot = keccak256(abi.encodePacked(tokenId, owner))
        */
       mapping (bytes32 => mapping (string => string)) internal _records;
       ```

       By this changes token owner will have unique records space for each token. In case of token transfer, new owner will have clean records space by default.

       Pros:

       - less storage, cheaper in a long term
       - decrease interface complexity, remove functions (reset, reconfigure), contracts size improvement

       Cons:

       - not possible to clean up all records

    2. `bytes32 key` instead of `string key`

       ```
       mapping (uint256 => mapping (uint256 =>  mapping (string => string))) internal _records;
       ```

       Replace by:

       ```
       mapping (uint256 => mapping (uint256 =>  mapping (bytes32 => string))) internal _records;
       ```

       Pros:

       - less dynamic types -> cheaper usage

       Cons:

       - key max length is 32 characters
       - usage will always require conversion between string and bytes32

7.  Support meta-transactions

    EIP-2771: Secure Protocol for Native Meta Transactions

    Ref: https://eips.ethereum.org/EIPS/eip-2771

    ### Recipient:

    In order to support `EIP-2771` recepient should implement `Context`.

    ```
    interface Context {
        function _msgSender() internal view returns (address);
        function _msgData() internal view returns (bytes calldata);
    }
    ```

    The implementation should allow replacement of `_msgSender` and `_msgData` in case of forwarding.

    ```
    abstract contract ERC2771Context is Context {
        address _trustedForwarder;

        function isTrustedForwarder(address forwarder) public view virtual returns(bool) {
            return forwarder == _trustedForwarder;
        }

        function _msgSender() internal view virtual override returns (address sender) {
            if (isTrustedForwarder(msg.sender)) {
                // The assembly code is more direct than the Solidity version using `abi.decode`.
                assembly { sender := shr(96, calldataload(sub(calldatasize(), 20))) }
            } else {
                return super._msgSender();
            }
        }

        function _msgData() internal view virtual override returns (bytes calldata) {
            if (isTrustedForwarder(msg.sender)) {
                return msg.data[:msg.data.length-20];
            } else {
                return super._msgData();
            }
        }
    }
    ```

    ### Forwarder:

    ```
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

    - What does `EIP-712: Ethereum typed structured data hashing and signing` bring us?
    - `RegistryForwarder` implementation:

      - Design flaw: `req.tokenId` does not coupled with `req.data.tokenId`, leads to security breach
      - should `execute` function be `payable`?
      - does it make sence to have `req.gas`?
      - do we need `expiry` check?

    - Removing SignatureController
    - Removing controlled functions from Registry

8.  Upgradable registry

    TBD:

    - [Transparent vs UUPS Proxies](https://docs.openzeppelin.com/contracts/4.x/api/proxy#transparent-vs-uups)

    Refs:

    - [IMPORTANT: Storage layout](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable#modifying-your-contracts)
    - [Writing Upgradeable Contracts](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable)
    - [UUPS Proxies: Tutorial (Solidity + JavaScript)](https://forum.openzeppelin.com/t/uups-proxies-tutorial-solidity-javascript/7786)

9.  TLD agnostic
10. Controllers

    TBD:

    - ControllerRole
    - Types of controllers
    - Allowed functions

11) Multicalls

## Main stack

- Solidity `^0.8.0`
- OpenZeppelin contracts-upgradeable `^4.1.0`
- Hardhat `^2.2.1`
- ethers.js `^5.1.4`

## Upgradeable proxy

- Deploy registry `yarn deploy:proxy:localhost`
- Upgrade registry `PROXY_ADDRESS={proxy_address} yarn upgrade:proxy:localhost`
