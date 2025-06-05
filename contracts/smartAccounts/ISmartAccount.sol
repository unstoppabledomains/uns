// @author Unstoppable Domains, Inc.
// @date May 29th, 2025

pragma solidity ^0.8.24;

interface ISmartAccount {
    struct Call {
        address to;
        uint256 value;
        bytes data;
    }

    struct SplitSignature {
        uint8 v;
        bytes32 r;
        bytes32 s;
    }
}
