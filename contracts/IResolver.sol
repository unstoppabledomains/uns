pragma solidity 0.5.12;
pragma experimental ABIEncoderV2;

contract IResolver {
    /**
     * @dev Reset all domain records and set new ones
     * @param keys New record keys
     * @param values New record values
     * @param tokenId ERC-721 token id of the domain
     */
    function reconfigure(string[] memory keys, string[] memory values, uint256 tokenId) public;

    /**
    * @dev Set all domain records for newly minted domain
    * @param keys New record keys
    * @param values New record values
    * @param tokenId ERC-721 token id of the domain
    */
    function preconfigure(string[] memory keys, string[] memory values, uint256 tokenId) public;

    /**
     * @dev Set or update domain records
     * @param keys New record keys
     * @param values New record values
     * @param tokenId ERC-721 token id of the domain
     */
    function setMany(string[] memory keys, string[] memory values, uint256 tokenId) public;

    /**
     * @dev Function to set record.
     * @param key The key set the value of.
     * @param value The value to set key to.
     * @param tokenId ERC-721 token id to set.
     */
    function set(string calldata key, string calldata value, uint256 tokenId) external;

    /**
     * @dev Function to reset all existing records on a domain.
     * @param tokenId ERC-721 token id to set.
     */
    function reset(uint256 tokenId) external;
}
