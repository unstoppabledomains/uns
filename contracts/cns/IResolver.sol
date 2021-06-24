// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

interface IResolver {
    function preconfigure(
        string[] memory keys,
        string[] memory values,
        uint256 tokenId
    ) external;

    function get(string calldata key, uint256 tokenId) external view returns (string memory);

    function getMany(string[] calldata keys, uint256 tokenId) external view returns (string[] memory);

    function getByHash(uint256 keyHash, uint256 tokenId) external view returns (string memory key, string memory value);

    function getManyByHash(uint256[] calldata keyHashes, uint256 tokenId)
        external
        view
        returns (string[] memory keys, string[] memory values);

    function set(
        string calldata key,
        string calldata value,
        uint256 tokenId
    ) external;
}
