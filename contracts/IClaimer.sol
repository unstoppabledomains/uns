// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IClaimer {
    function claim(uint256 tld, string calldata label) external;

    function claimTo(address to, uint256 tld, string calldata label) external;

    function claimToWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external;
}
