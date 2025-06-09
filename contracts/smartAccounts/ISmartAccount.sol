// @author Unstoppable Domains, Inc.
// @date May 29th, 2025

pragma solidity ^0.8.24;

interface ISmartAccount {
    struct Call {
        address target;
        bytes data;
        uint256 value;
    }

    error NotSelf();
}
