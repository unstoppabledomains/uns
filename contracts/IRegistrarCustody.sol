// @author Unstoppable Domains, Inc.
// @date May 21st, 2025
pragma solidity ^0.8.0;

import './IERC1967.sol';

error InvalidExpiry();

interface IRegistrarCustody is IERC1967 {
    event DomainTokenized(uint256 indexed tokenId, uint256 registrarId, address userDelegation);

    function tokenizeDomain(
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values,
        uint64 expiry,
        uint256 registrarId,
        address userDelegation
    ) external;

    function setRecords(string[] calldata keys, string[] calldata values, uint256 tokenId) external;

    function revoke(uint256 tokenId) external;

    function isValidSignature(bytes32 hash, bytes memory signature) external view returns (bytes4);
}
