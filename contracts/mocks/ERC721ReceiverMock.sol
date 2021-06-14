// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ERC721ReceiverMock {
    function onERC721Received(address, address, uint256, bytes memory) public pure returns (bytes4) {
        return 0x150b7a02;
    }
}
