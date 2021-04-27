// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './util/ITokenBasedNonce.sol';
import './util/IRegistryProvider.sol';

interface IResolverReader {
    /**
     * @dev Function to get record.
     * @param key The key to query the value of.
     * @param tokenId The token id to fetch.
     * @return The value string.
     */
    function get(string calldata key, uint256 tokenId)
        external
        view
        returns (string memory);

    /**
     * @dev Function to get multiple record.
     * @param keys The keys to query the value of.
     * @param tokenId The token id to fetch.
     * @return The values.
     */
    function getMany(string[] calldata keys, uint256 tokenId)
        external
        view
        returns (string[] memory);

    /**
     * @dev Function get value by provied key hash. Keys hashes can be found in Sync event emitted by Registry.sol contract.
     * @param keyHash The key to query the value of.
     * @param tokenId The token id to set.
     */
    function getByHash(uint256 keyHash, uint256 tokenId)
        external
        view
        returns (string memory key, string memory value);

    /**
     * @dev Function get values by provied key hashes. Keys hashes can be found in Sync event emitted by Registry.sol contract.
     * @param keyHashes The key to query the value of.
     * @param tokenId The token id to set.
     */
    function getManyByHash(uint256[] calldata keyHashes, uint256 tokenId)
        external
        view
        returns (string[] memory keys, string[] memory values);
}
