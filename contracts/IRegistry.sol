// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol';

import './ISLDMinter.sol';
import './IRecordStorage.sol';

interface IRegistry is IERC721MetadataUpgradeable, ISLDMinter, IRecordStorage {

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
     * @dev Burns a child token ID.
     * Calculates child token ID using a namehash function.
     * Requires the msg.sender to be the owner, approved, or operator of tokenId.
     * Requires the token already exist.
     * @param tokenId uint256 ID of the token to be transferred
     * @param label subdomain label of the child token ID
     */
    function burnChild(uint256 tokenId, string calldata label) external;

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
