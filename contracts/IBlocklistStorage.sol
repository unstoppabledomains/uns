// @author Unstoppable Domains, Inc.
// @date September 1st, 2021

pragma solidity ^0.8.0;

interface IBlocklistStorage {
    event Blocked(uint256 tokenId);
    event BlocklistPaused(bool state);

    function isBlocked(uint256 tokenId) external view returns (bool);

    function areBlocked(uint256[] calldata tokenIds) external view returns (bool[] memory);

    function blocklist(uint256 tokenId) external;

    function blocklistAll(uint256[] calldata tokenIds) external;

    function pauseBlocklist(bool state) external;
}
