// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IURIPrefixController.sol";
import "../roles/WhitelistedRole.sol";
import "../Registry.sol";

/**
 * @title URIPrefixController
 * @dev Defines the functions for distribution of Second Level Domains (SLD)s.
 */
contract URIPrefixController is IURIPrefixController, WhitelistedRole {
    Registry internal _registry;

    constructor(Registry registry) {
        _registry = registry;
    }

    function registry() external view returns (address) {
        return address(_registry);
    }

    function setTokenURIPrefix(string calldata prefix) external override onlyWhitelisted {
        _registry.controlledSetTokenURIPrefix(prefix);
    }
}
