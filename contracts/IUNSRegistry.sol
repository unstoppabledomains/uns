// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol';

import './IERC1967.sol';
import './IRecordStorage.sol';
import './IReverseRegistry.sol';
import './IRootRegistry.sol';
import './IChildRegistry.sol';

interface IUNSRegistry is
    IERC1967,
    IERC721MetadataUpgradeable,
    IERC721ReceiverUpgradeable,
    IRecordStorage,
    IReverseRegistry,
    IRootRegistry,
    IChildRegistry
{
    event NewURI(uint256 indexed tokenId, string uri);

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
     * @dev Existence of token.
     * @param tokenId uint256 ID of the token
     */
    function exists(uint256 tokenId) external override view returns (bool);

    /**
     * @dev Transfer domain ownership without resetting domain records.
     * @param to address of new domain owner
     * @param tokenId uint256 ID of the token to be transferred
     */
    function setOwner(address to, uint256 tokenId) external;

    /**
     * @dev Burns `tokenId`. See {ERC721-_burn}.
     *
     * Requirements:
     *
     * - The caller must own `tokenId` or be an approved operator.
     */
    function burn(uint256 tokenId) external;

    /**
     * @dev Mints token.
     * @param to address to mint the new SLD to.
     * @param tokenId id of token.
     * @param uri domain URI.
     */
    function mint(
        address to,
        uint256 tokenId,
        string calldata uri
    ) external;

    /**
     * @dev Safely mints token.
     * Implements a ERC721Reciever check unlike mint.
     * @param to address to mint the new SLD to.
     * @param tokenId id of token.
     * @param uri domain URI.
     */
    function safeMint(
        address to,
        uint256 tokenId,
        string calldata uri
    ) external;

    /**
     * @dev Safely mints token.
     * Implements a ERC721Reciever check unlike mint.
     * @param to address to mint the new SLD to.
     * @param tokenId id of token.
     * @param uri domain URI.
     * @param data bytes data to send along with a safe transfer check
     */
    function safeMint(
        address to,
        uint256 tokenId,
        string calldata uri,
        bytes calldata data
    ) external;

    /**
     * @dev Mints token with records
     * @param to address to mint the new SLD to
     * @param tokenId id of token
     * @param keys New record keys
     * @param values New record values
     * @param uri domain URI
     */
    function mintWithRecords(
        address to,
        uint256 tokenId,
        string calldata uri,
        string[] calldata keys,
        string[] calldata values
    ) external;

    /**
     * @dev Safely mints token with records
     * @param to address to mint the new SLD to
     * @param tokenId id of token
     * @param keys New record keys
     * @param values New record values
     * @param uri domain URI
     */
    function safeMintWithRecords(
        address to,
        uint256 tokenId,
        string calldata uri,
        string[] calldata keys,
        string[] calldata values
    ) external;

    /**
     * @dev Safely mints token with records
     * @param to address to mint the new SLD to
     * @param tokenId id of token
     * @param keys New record keys
     * @param values New record values
     * @param uri domain URI
     * @param data bytes data to send along with a safe transfer check
     */
    function safeMintWithRecords(
        address to,
        uint256 tokenId,
        string calldata uri,
        string[] calldata keys,
        string[] calldata values,
        bytes calldata data
    ) external;

    /**
     * @dev Stores CNS registry address.
     * It's one-time operation required to set CNS registry address.
     * UNS registry allows to receive ERC721 tokens only from CNS registry,
     * by supporting ERC721Receiver interface.
     * @param registry address of CNS registry contract
     */
    function setCNSRegistry(address registry) external;
}
