// @author Unstoppable Domains, Inc.
// @date November 10th, 2022

pragma solidity ^0.8.0;

import '../UNSRegistry.sol';

contract UNSRegistryMock is UNSRegistry {
    function getTokenName(uint256 tokenId) external view returns (string memory) {
        return _tokenNames[tokenId];
    }
}
