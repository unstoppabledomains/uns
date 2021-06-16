// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import "../metatx/ERC2771RegistryContext.sol";

contract ERC2771RegistryContextMock is ERC2771RegistryContext {
    function initialize() public initializer {
        __ERC2771RegistryContext_init();
    }

    function msgToken() public view returns(uint256) {
        return _msgToken();
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
