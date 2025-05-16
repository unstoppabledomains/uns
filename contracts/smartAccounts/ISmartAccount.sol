pragma solidity ^0.8.17;

interface ISmartAccount {
    struct Call {
        address to;
        uint256 value;
        bytes data;
    }
}
