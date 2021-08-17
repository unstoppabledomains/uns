// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import '../history/metatx/RegistryForwarderV0.sol';

contract RegistryForwarderMock is RegistryForwarderV0 {
    function initialize() public initializer {
        __RegistryForwarder_init();
    }
}
