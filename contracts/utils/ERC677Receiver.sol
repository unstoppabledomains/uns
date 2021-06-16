// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

abstract contract ERC677Receiver {
    /**
    * @dev Method invoked when tokens transferred via transferAndCall method
    * @param _sender Original token sender
    * @param _value Tokens amount
    * @param _data Additional data passed to contract
    */
    function onTokenTransfer(address _sender, uint256 _value, bytes calldata _data) external virtual;
}
