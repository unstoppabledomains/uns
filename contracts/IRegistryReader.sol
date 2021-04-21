pragma solidity 0.5.12;

interface IRegistryReader {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
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
     * @param tokenId uint256 ID of the token
     * @param label label of subdomain (for `aaa.bbb.crypto` it will be `aaa`)
     */
    function childIdOf(uint256 tokenId, string calldata label) external view returns (uint256);

    /**
     * @dev Controller related function.
     * @return bool whether the account is a controller
     */
    function isController(address account) external view returns (bool);

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
     * @dev Registry related function.
     * @return root hash.
     */
    function root() external view returns (uint256);
}
