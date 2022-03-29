// @author Unstoppable Domains, Inc.
// @date March 29th, 2022

pragma solidity ^0.8.0;

// TODO: ReverseRegistry or ReverseResolver
interface IReverseRegistry {
    event SetReverse(address indexed addr, uint256 indexed tokenId);

    event RemoveReverse(address indexed addr);

    function setReverse(uint256 tokenId) external;

    function removeReverse() external;

    function reverseOf(address addr) external view returns (uint256);
}
