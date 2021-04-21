pragma solidity 0.5.12;
pragma experimental ABIEncoderV2;

interface IDataReader {
    /**
     * @dev Function to get resolver address, owner address and requested records.
     * @param keys Keys to query values.
     * @param tokenId The token id to fetch.
     * @return Resolver address, owner address and values.
     */
    function getData(string[] calldata keys, uint256 tokenId)
        external
        returns (
            address resolver,
            address owner,
            string[] memory values
        );

    /**
     * @dev Function to get resolver address, owner address and requested records for array of tokens.
     * @param keys Keys to query values.
     * @param tokenIds Array of token ids to fetch.
     * @return Resolver address, owner address and values for array of tokens.
     */
    function getDataForMany(string[] calldata keys, uint256[] calldata tokenIds)
        external
        returns (
            address[] memory resolvers,
            address[] memory owners,
            string[][] memory values
        );

    /**
     * @dev Function to get resolver address, owner address and requested records.
     * @param keyHashes Key hashes to query values.
     * @param tokenId The token id to fetch.
     * @return Resolver address, owner address, keys and values.
     */
    function getDataByHash(uint256[] calldata keyHashes, uint256 tokenId)
        external
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
     * @return Resolver address, owner address and values for array of tokens.
     */
    function getDataByHashForMany(uint256[] calldata keyHashes, uint256[] calldata tokenIds)
        external
        returns (
            address[] memory resolvers,
            address[] memory owners,
            string[][] memory keys,
            string[][] memory values
        );

    /**
     * @param tokenIds Array of token ids to fetch.
     * @return Array of owner addresses.
     */
    function ownerOfForMany(uint256[] calldata tokenIds)
        external
        returns (address[] memory owners);
}
