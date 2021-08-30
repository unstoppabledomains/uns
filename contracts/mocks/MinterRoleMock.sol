// @author Unstoppable Domains, Inc.
// @date August 25th, 2021

pragma solidity ^0.8.0;

import '../roles/MinterRole.sol';

contract MinterRoleMock is MinterRole {
    function initialize() public initializer {
        __MinterRole_init();
    }

    function olnyMinterFunc() external onlyMinter {}
}
