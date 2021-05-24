// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../metatx/RegistryForwarder.sol";

contract RegistryForwarderMock is RegistryForwarder {
    function initialize() public initializer {
        __RegistryForwarder_init();
    }
}
