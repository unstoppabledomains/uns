pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol';

contract Greeting {
    mapping (address => string) private _names;

    function greet() external view returns (string memory name) {
        return string(abi.encodePacked("Hello, ", _getName()));
    }

    function rememberName(string calldata name) external {
        _names[msg.sender] = name;
    }

    function _getName() private view returns (string memory name) {
        // Not sure if there is a better (efficient) way to check if a string exists in mapping.
        if(bytes(_names[msg.sender]).length > 0) return _names[msg.sender];

        return StringsUpgradeable.toHexString(uint160(msg.sender));
    }
}
