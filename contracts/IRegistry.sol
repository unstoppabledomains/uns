pragma solidity 0.5.12;

import "@openzeppelin/contracts/token/ERC721/IERC721Metadata.sol";

contract IRegistry is IERC721Metadata {

    event NewURI(uint256 indexed tokenId, string uri);

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
     * @dev Sets the resolver of a given token ID to another address.
     * Requires the msg.sender to be the owner, approved, or operator.
     * @param to address the given token ID will resolve to
     * @param tokenId uint256 ID of the token to be transferred
     */
    function resolveTo(address to, uint256 tokenId) external;

    /**
     * @dev Gets the resolver of the specified token ID.
     * @param tokenId uint256 ID of the token to query the resolver of
     * @return address currently marked as the resolver of the given token ID
     */
    function resolverOf(uint256 tokenId) external view returns (address);

    /**
     * @dev Controlled function to sets the resolver of a given token ID.
     * Requires the msg.sender to be controller.
     * @param to address the given token ID will resolve to
     * @param tokenId uint256 ID of the token to be transferred
     */
    function controlledResolveTo(address to, uint256 tokenId) external;

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