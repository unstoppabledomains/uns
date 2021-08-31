// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import '../metatx/ERC2771Context.sol';

contract ERC2771ContextMock is ERC2771Context {
    function initialize(address forwarder) public initializer {
        __ERC2771Context_init(forwarder);
    }

    function msgToken() public view returns (uint256) {
        return _msgToken();
    }

    function msgSender() public view returns (address) {
        return _msgSender();
    }

    function msgData() public view returns (bytes calldata) {
        return _msgData();
    }

    function run() public pure returns (string memory) {
        return 'ERC2771ContextMock: run';
    }
}
