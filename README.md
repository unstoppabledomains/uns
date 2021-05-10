# UNS

UNS registry smart contracts.

## Specs

1.  Implements ERC721

    ERC-721 Non-Fungible Token Standard https://eips.ethereum.org/EIPS/eip-721

    ```
    /// @title ERC-721 Non-Fungible Token Standard
    /// @dev See https://eips.ethereum.org/EIPS/eip-721
    ///  Note: the ERC-165 identifier for this interface is 0x80ac58cd.
    interface ERC721 /* is ERC165 */ {
        /// @dev This emits when ownership of any NFT changes by any mechanism.
        ///  This event emits when NFTs are created (`from` == 0) and destroyed
        ///  (`to` == 0). Exception: during contract creation, any number of NFTs
        ///  may be created and assigned without emitting Transfer. At the time of
        ///  any transfer, the approved address for that NFT (if any) is reset to none.
        event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);

        /// @dev This emits when the approved address for an NFT is changed or
        ///  reaffirmed. The zero address indicates there is no approved address.
        ///  When a Transfer event emits, this also indicates that the approved
        ///  address for that NFT (if any) is reset to none.
        event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);

        /// @dev This emits when an operator is enabled or disabled for an owner.
        ///  The operator can manage all NFTs of the owner.
        event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

        /// @notice Count all NFTs assigned to an owner
        /// @dev NFTs assigned to the zero address are considered invalid, and this
        ///  function throws for queries about the zero address.
        /// @param _owner An address for whom to query the balance
        /// @return The number of NFTs owned by `_owner`, possibly zero
        function balanceOf(address _owner) external view returns (uint256);

        /// @notice Find the owner of an NFT
        /// @dev NFTs assigned to zero address are considered invalid, and queries
        ///  about them do throw.
        /// @param _tokenId The identifier for an NFT
        /// @return The address of the owner of the NFT
        function ownerOf(uint256 _tokenId) external view returns (address);

        /// @notice Transfers the ownership of an NFT from one address to another address
        /// @dev Throws unless `msg.sender` is the current owner, an authorized
        ///  operator, or the approved address for this NFT. Throws if `_from` is
        ///  not the current owner. Throws if `_to` is the zero address. Throws if
        ///  `_tokenId` is not a valid NFT. When transfer is complete, this function
        ///  checks if `_to` is a smart contract (code size > 0). If so, it calls
        ///  `onERC721Received` on `_to` and throws if the return value is not
        ///  `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
        /// @param _from The current owner of the NFT
        /// @param _to The new owner
        /// @param _tokenId The NFT to transfer
        /// @param data Additional data with no specified format, sent in call to `_to`
        function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;

        /// @notice Transfers the ownership of an NFT from one address to another address
        /// @dev This works identically to the other function with an extra data parameter,
        ///  except this function just sets data to "".
        /// @param _from The current owner of the NFT
        /// @param _to The new owner
        /// @param _tokenId The NFT to transfer
        function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;

        /// @notice Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE
        ///  TO CONFIRM THAT `_to` IS CAPABLE OF RECEIVING NFTS OR ELSE
        ///  THEY MAY BE PERMANENTLY LOST
        /// @dev Throws unless `msg.sender` is the current owner, an authorized
        ///  operator, or the approved address for this NFT. Throws if `_from` is
        ///  not the current owner. Throws if `_to` is the zero address. Throws if
        ///  `_tokenId` is not a valid NFT.
        /// @param _from The current owner of the NFT
        /// @param _to The new owner
        /// @param _tokenId The NFT to transfer
        function transferFrom(address _from, address _to, uint256 _tokenId) external payable;

        /// @notice Change or reaffirm the approved address for an NFT
        /// @dev The zero address indicates there is no approved address.
        ///  Throws unless `msg.sender` is the current NFT owner, or an authorized
        ///  operator of the current owner.
        /// @param _approved The new approved NFT controller
        /// @param _tokenId The NFT to approve
        function approve(address _approved, uint256 _tokenId) external payable;

        /// @notice Enable or disable approval for a third party ("operator") to manage
        ///  all of `msg.sender`'s assets
        /// @dev Emits the ApprovalForAll event. The contract MUST allow
        ///  multiple operators per owner.
        /// @param _operator Address to add to the set of authorized operators
        /// @param _approved True if the operator is approved, false to revoke approval
        function setApprovalForAll(address _operator, bool _approved) external;

        /// @notice Get the approved address for a single NFT
        /// @dev Throws if `_tokenId` is not a valid NFT.
        /// @param _tokenId The NFT to find the approved address for
        /// @return The approved address for this NFT, or the zero address if there is none
        function getApproved(uint256 _tokenId) external view returns (address);

        /// @notice Query if an address is an authorized operator for another address
        /// @param _owner The address that owns the NFTs
        /// @param _operator The address that acts on behalf of the owner
        /// @return True if `_operator` is an approved operator for `_owner`, false otherwise
        function isApprovedForAll(address _owner, address _operator) external view returns (bool);
    }
    ```

2.  Implements ERC165

    ERC-165 Standard Interface Detection https://eips.ethereum.org/EIPS/eip-165

    ```
    interface ERC165 {
        /// @notice Query if a contract implements an interface
        /// @param interfaceID The interface identifier, as specified in ERC-165
        /// @dev Interface identification is specified in ERC-165. This function
        ///  uses less than 30,000 gas.
        /// @return `true` if the contract implements `interfaceID` and
        ///  `interfaceID` is not 0xffffffff, `false` otherwise
        function supportsInterface(bytes4 interfaceID) external view returns (bool);
    }
    ```

3.  Implements ERC721Burnable

    ```
    /**
     * @title ERC721 Burnable Token
     * @dev ERC721 Token that can be irreversibly burned (destroyed).
     */
    abstract contract ERC721Burnable is Context, ERC721 {
        /**
        * @dev Burns `tokenId`. See {ERC721-_burn}.
        *
        * Requirements:
        *
        * - The caller must own `tokenId` or be an approved operator.
        */
        function burn(uint256 tokenId) public virtual {
            //solhint-disable-next-line max-line-length
            require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721Burnable: caller is not owner nor approved");
            _burn(tokenId);
        }
    }
    ```

4.  Implements IERC721Metadata

    IERC721Metadata allows smart contract to be interrogated for its name and for details about the assets which your NFTs represent.

    ```
    /// @title ERC-721 Non-Fungible Token Standard, optional metadata extension
    /// @dev See https://eips.ethereum.org/EIPS/eip-721
    ///  Note: the ERC-165 identifier for this interface is 0x5b5e139f.
    interface IERC721Metadata /_ is ERC721 _/ {
        /// @notice A descriptive name for a collection of NFTs in this contract
        function name() external view returns (string \_name);

        /// @notice An abbreviated name for NFTs in this contract
        function symbol() external view returns (string _symbol);

        /// @notice A distinct Uniform Resource Identifier (URI) for a given asset.
        /// @dev Throws if `_tokenId` is not a valid NFT. URIs are defined in RFC
        ///  3986. The URI may point to a JSON file that conforms to the "ERC721
        ///  Metadata JSON Schema".
        function tokenURI(uint256 _tokenId) external view returns (string);
    }
    ```

    TBD:

    - `tokenURI()` returns empty string(by default) when `_baseURI()` is empty string
    - `event NewURI(uint256 indexed tokenId, string uri)` removed
    - In case of defined specific record `tokenURI()` should return value of the record. Record key is to be defined

5.  Implements IRegistry

    ```
    interface IRegistry /_ is IERC721Metadata, IRecordStorage _/ {

        event NewURIPrefix(string prefix);

        event Resolve(uint256 indexed tokenId, address indexed to);

        event Sync(address indexed resolver, uint256 indexed updateId, uint256 indexed tokenId);

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

    NOTE: Current version copied from dot-crypto, it requires some discussions

    TBD:

    - Controlled functions: combine with normal or split it into different interface, rename
    - `string calldata label` I think we agreed to replace by `bytes32 child` = `keccak256(abi.encodePacked(label))`, needs to be confirmed

6.  Records storage

    ```
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
         * @dev Set all domain records for newly minted domain
         * @param keys New record keys
         * @param values New record values
         * @param tokenId ERC-721 token id of the domain
         */
        function preconfigure(string[] memory keys, string[] memory values, uint256 tokenId) external;

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

    Improvement Proposals:

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
       - decrease interface complexity, remove functions (reset, preconfigure, reconfigure), contracts size improvement

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

7.  Upgradable registry

    TBD:

    - [Transparent vs UUPS Proxies](https://docs.openzeppelin.com/contracts/4.x/api/proxy#transparent-vs-uups)

    Refs:

    - [IMPORTANT: Storage layout](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable#modifying-your-contracts)
    - [Writing Upgradeable Contracts](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable)
    - [UUPS Proxies: Tutorial (Solidity + JavaScript)](https://forum.openzeppelin.com/t/uups-proxies-tutorial-solidity-javascript/7786)

8)  TLD agnostic
9)  Support meta-transactions
10) Controllers

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
