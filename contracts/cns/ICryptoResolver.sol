// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ICryptoResolver {
    /**
     * @dev Set all domain records for newly minted domain
     * @param keys New record keys
     * @param values New record values
     * @param tokenId ERC-721 token id of the domain
     */
    function preconfigure(string[] memory keys, string[] memory values, uint256 tokenId) external;
}
