// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ICryptoRegistry {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function tokenURI(uint256 tokenId) external view returns (string memory);

    function isApprovedOrOwner(address spender, uint256 tokenId) external view returns (bool);

    function resolverOf(uint256 tokenId) external view returns (address);

    function childIdOf(uint256 tokenId, string calldata label) external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function ownerOf(uint256 tokenId) external view returns (address);

    function getApproved(uint256 tokenId) external view returns (address);

    function isApprovedForAll(address owner, address operator) external view returns (bool);

    function root() external view returns (uint256);
}
