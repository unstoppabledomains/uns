// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

interface IRegistryReader {
    function tokenURI(uint256 tokenId) external view returns (string memory);

    /**
     * @dev Returns whether the given spender can transfer a given token ID. Registry related function.
     * @param spender address of the spender to query
     * @param tokenId uint256 ID of the token to be transferred
     * @return bool whether the msg.sender is approved for the given token ID,
     * is an operator of the owner, or is the owner of the token
     */
    function isApprovedOrOwner(address spender, uint256 tokenId) external view returns (bool);

    /**
     * @dev Gets the resolver of the specified token ID. Registry related function.
     * @param tokenId uint256 ID of the token to query the resolver of
     * @return address currently marked as the resolver of the given token ID
     */
    function resolverOf(uint256 tokenId) external view returns (address);

    /**
     * @dev Provides child token (subdomain) of provided tokenId. Registry related function.
     * @param labels array of domain labels splitted by '.' (for `aaa.bbb.crypto` it will be [`aaa`, `bbb`, `crypto`])
     */
    function namehash(string[] calldata labels) external view returns (uint256);

    /**
     * @dev Returns the number of NFTs in `owner`'s account. ERC721 related function.
     */
    function balanceOf(address owner) external view returns (uint256);

    /**
     * @dev Returns the owner of the NFT specified by `tokenId`. ERC721 related function.
     */
    function ownerOf(uint256 tokenId) external view returns (address);

    /**
     * @dev ERC721 related function.
     */
    function getApproved(uint256 tokenId) external view returns (address);

    /**
     * @dev ERC721 related function.
     */
    function isApprovedForAll(address owner, address operator) external view returns (bool);

    /**
     * @dev Returns whether token exists or not.
     */
    function exists(uint256 tokenId) external view returns (bool);

    /**
     * @dev Returns the reverse record for a given account's reverse record.
     * @param addr The address of the reverse record.
     * @return tokenId The token associated with the address.
     */
    function reverseOf(address addr) external view returns (uint256);
}
