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

    TBD:

    - Obsolete due to overriding burn function for meta-transactions (`validForwardedToken` guard)

4.  Implements IERC721Metadata

    IERC721Metadata is an extension of ERC-721. IERC721Metadata allows smart contract to be interrogated for its name and for details about the assets which your NFTs represent.

    Ref: https://eips.ethereum.org/EIPS/eip-721

    ### Backward incompatibility:

    Note: List of changes which makes UNS and CNS backward incompatibile

    - Major `tokenURI()` difference

      ```solidity
      CNS.tokenURI() => prefix ? {prefix}{domain_name} : {domain_name}

      UNS.tokenURI() => records['metadata.uri'].value || prefix ? {prefix}{tokin_id} : ''
      ```

    - `tokenURI()` returns empty string(by default) when `prefix` is empty string
    - `event NewURI(uint256 indexed tokenId, string uri)` removed
    - When `metadata.uri` recond is defined, `tokenURI()` returns value of the record instead of default uri [#178196957](https://www.pivotaltracker.com/story/show/178196957)

5.  Implements IRegistry

    ```solidity
    interface IRegistry /_ is IERC721Metadata, ISLDMinter, IRecordStorage _/ {

        event NewURIPrefix(string prefix);

        /**
         * @dev Function to set the token URI Prefix for all tokens.
         * @param prefix string URI to assign
         */
        function setTokenURIPrefix(string calldata prefix) external;

        /**
         * @dev Returns whether the given spender can transfer a given token ID.
         * @param spender address of the spender to query
         * @param tokenId uint256 ID of the token to be transferred
         * @return bool whether the msg.sender is approved for the given token ID,
         * is an operator of the owner, or is the owner of the token
         */
        function isApprovedOrOwner(address spender, uint256 tokenId) external view returns (bool);

        /**
         * @dev Gets the resolver of the specified token ID.
         * @param tokenId uint256 ID of the token to query the resolver of
         * @return address currently marked as the resolver of the given token ID
         */
        function resolverOf(uint256 tokenId) external view returns (address);

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
    - `function resolverOf(uint256 tokenId) external view returns (address) {}` returns registry's address when token exists
    - ~~`function preconfigure(string[] memory keys, string[] memory values, uint256 tokenId) external {}` added as a controlled function~~ Removed due to removing controllers
    - ~~`string calldata label` replaced by `bytes32 child` = `keccak256(abi.encodePacked(label))`[#178199979](https://www.pivotaltracker.com/story/show/178199979)~~ Deprioritized due to backward compatibility

6.  Records Storage

    Records Storage early known as Resolver

    ```solidity
    interface IRecordStorage {
        event Set(uint256 indexed tokenId, string indexed keyIndex, string indexed valueIndex, string key, string value);

        event NewKey(uint256 indexed tokenId, string indexed keyIndex, string key);

        event ResetRecords(uint256 indexed tokenId);

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

7.  Support meta-transactions

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

        modifier validForwardedToken(uint256 tokenId) {
            if (isTrustedForwarder(msg.sender)) {
                uint256 _tokenId;
                assembly { _tokenId := calldataload(sub(calldatasize(), 32)) }
                require(tokenId == _tokenId, 'ERC2771Context: TOKEN_INVALID');
            }
            _;
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

8.  Controllers

    - Removed SignatureController
    - Removed URIPrefixController
    - Removed MintingController

9.  Upgradable registry

    TBD:

    - [Transparent vs UUPS Proxies](https://docs.openzeppelin.com/contracts/4.x/api/proxy#transparent-vs-uups)

    Refs:

    - [IMPORTANT: Storage layout](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable#modifying-your-contracts)
    - [Writing Upgradeable Contracts](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable)
    - [UUPS Proxies: Tutorial (Solidity + JavaScript)](https://forum.openzeppelin.com/t/uups-proxies-tutorial-solidity-javascript/7786)

10. TLD management
11. Multicalls
12. Roles

## Main stack

- Solidity `^0.8.0`
- OpenZeppelin contracts-upgradeable `^4.1.0`
- Hardhat `^2.2.1`
- ethers.js `^5.1.4`

## Upgradeable proxy

- Deploy registry `yarn deploy:proxy:localhost`
- Upgrade registry `PROXY_ADDRESS={proxy_address} yarn upgrade:proxy:localhost`
