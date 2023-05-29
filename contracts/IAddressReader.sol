// @author Unstoppable Domains, Inc.
// @date May 22th, 2023

pragma solidity ^0.8.0;

interface IAddressReader {
    /**
     * @dev Function to get address record by network and token key
     * @param network Network
     * @param token Token
     * @param tokenId The token id to fetch records from.
     */
    function getAddress(
        string calldata network,
        string calldata token,
        uint256 tokenId
    ) external view returns (string memory);

    /**
     * @dev Function to get address record key by network and token key
     * @param network Network
     * @param token Token
     * @param tokenId The token id to fetch records from.
     */
    function getAddressKey(
        string calldata network,
        string calldata token,
        uint256 tokenId
    ) external view returns (string memory);

    /**
     * @dev Function to get the list of address record keys by network and token
     * @param network Network
     * @param token Token
     */
    function getAddressKeys(string calldata network, string calldata token) external view returns (string[] memory);
}
