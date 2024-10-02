// @author Unstoppable Domains, Inc.
// @date September 25th, 2024
pragma solidity ^0.8.0;

import './IERC1967.sol';

interface IRegistrarCustody is IERC1967 {
    event DomainLocked(uint256 indexed tokenId, address indexed owner);

    function registerDomain(
        address virtualOwner,
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values,
        uint64 expiry
    ) external;

    function safeTransfer(address to, uint256 tokenId) external;

    function isValidSignature(bytes32 hash, bytes memory signature) external view returns (bytes4);

    function virtualOwners(uint256 tokenId) external view returns (address);
}
