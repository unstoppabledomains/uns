// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IRegistryProvider {
    /**
     * @return registry address
     */
    function registry() external view returns (address);
}
