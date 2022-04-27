pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol';
import './metatx/ERC2771AccountBasedContext.sol';

contract Greeting is ERC2771AccountBasedContext {
    mapping (address => string) private _names;

    function greet() external view returns (string memory name) {
        return string(abi.encodePacked("Hello, ", _getName()));
    }

    function rememberName(string calldata name) external {
        _names[_msgSender()] = name;
    }

    function _getName() private view returns (string memory name) {
        if(bytes(_names[_msgSender()]).length > 0) return _names[_msgSender()];

        return StringsUpgradeable.toHexString(uint160(_msgSender()));
    }
}
