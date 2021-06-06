// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

abstract contract Multicall is Initializable {
    function __Multicall_init() internal initializer {
        __Multicall_init_unchained();
    }

    function __Multicall_init_unchained() internal initializer {
    }
    /**
    * @dev Receives and executes a batch of function calls on this contract.
    */
    function multicall(bytes[] calldata data) external returns (bytes[] memory results) {
        results = new bytes[](data.length);
        for (uint i = 0; i < data.length; i++) {
            results[i] = AddressUpgradeable.functionCall(address(this), abi.encodePacked(data[i], msg.sender, uint256(0)));
        }
        return results;
    }
    uint256[50] private __gap;
}
