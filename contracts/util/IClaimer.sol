// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../Registry.sol";

interface IClaimer {
    function claim(uint256 tld, string calldata label) external;

    function claimTo(uint256 tld, string calldata label, address receiver) external;

    function claimToWithRecords(
        uint256 tld,
        string calldata label,
        address receiver,
        string[] calldata keys,
        string[] calldata values
    ) external;
}
