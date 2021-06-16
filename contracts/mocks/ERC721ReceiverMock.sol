// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

contract ERC721ReceiverMock {
    function onERC721Received(address, address, uint256, bytes memory) public pure returns (bytes4) {
        return 0x150b7a02;
    }
}
