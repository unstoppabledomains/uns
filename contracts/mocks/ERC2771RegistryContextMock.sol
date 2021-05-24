// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../metatx/ERC2771RegistryContext.sol";

contract ERC2771RegistryContextMock is ERC2771RegistryContext {
    function initialize() public initializer {
        __ERC2771RegistryContext_init();
    }

    function isValidForwardedToken(uint256 tokenId) public view validForwardedToken(tokenId) returns(bool) {
        return true;
    }

    function msgSender() public view returns(address) {
        return _msgSender();
    }

    function msgData() public view returns(bytes calldata) {
        return _msgData();
    }

    function execute(bytes calldata data) public returns (bool, bytes memory) {
        // solhint-disable-next-line avoid-low-level-calls
        return address(this).call(data);
    }
}
