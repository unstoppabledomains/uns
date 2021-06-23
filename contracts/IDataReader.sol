// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

interface IDataReader {
    /**
     * @dev Function to get resolver address, owner address and requested records.
     * @param keys Keys to query values.
     * @param tokenId The token id to fetch.
     */
    function getData(string[] calldata keys, uint256 tokenId)
        external
        view
        returns (
            address resolver,
            address owner,
            string[] memory values
        );

    /**
     * @dev Function to get resolver address, owner address and requested records for array of tokens.
     * @param keys Keys to query values.
     * @param tokenIds Array of token ids to fetch.
     */
    function getDataForMany(string[] calldata keys, uint256[] calldata tokenIds)
        external
        view
        returns (
            address[] memory resolvers,
            address[] memory owners,
            string[][] memory values
        );

    /**
     * @dev Function to get resolver address, owner address and requested records.
     * @param keyHashes Key hashes to query values.
     * @param tokenId The token id to fetch.
     */
    function getDataByHash(uint256[] calldata keyHashes, uint256 tokenId)
        external
        view
        returns (
            address resolver,
            address owner,
            string[] memory keys,
            string[] memory values
        );

    /**
     * @dev Function to get resolver address, owner address and requested records for array of tokens.
     * @param keyHashes Key hashes to query values.
     * @param tokenIds Array of token ids to fetch.
     */
    function getDataByHashForMany(uint256[] calldata keyHashes, uint256[] calldata tokenIds)
        external
        view
        returns (
            address[] memory resolvers,
            address[] memory owners,
            string[][] memory keys,
            string[][] memory values
        );

    /**
     * @param tokenIds Array of token ids to fetch.
     */
    function ownerOfForMany(uint256[] calldata tokenIds) external view returns (address[] memory owners);
}
