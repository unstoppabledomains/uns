// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import '../metatx/UNSRegistryForwarder.sol';

contract UNSRegistryForwarderMock is UNSRegistryForwarder {
    function initialize() public initializer {
        __UNSRegistryForwarder_init();
    }
}
