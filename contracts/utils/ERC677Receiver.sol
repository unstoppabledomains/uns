// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

abstract contract ERC677Receiver {
    /**
     * @dev Method invoked when tokens transferred via transferAndCall method
     * @param sender Original token sender
     * @param value Tokens amount
     * @param data Additional data passed to contract
     */
    function onTokenTransfer(
        address sender,
        uint256 value,
        bytes calldata data
    ) external virtual;
}
