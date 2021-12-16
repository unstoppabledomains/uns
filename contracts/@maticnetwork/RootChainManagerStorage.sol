pragma solidity ^0.8.0;

abstract contract RootChainManagerStorage {
    mapping(bytes32 => address) public typeToPredicate;
    mapping(address => bytes32) public tokenToType;
}
