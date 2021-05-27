// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol';

contract ForwarderMock is MinimalForwarderUpgradeable {
    function initialize() public initializer {
        __MinimalForwarder_init();
    }
}
