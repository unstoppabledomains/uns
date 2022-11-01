// @author Unstoppable Domains, Inc.
// @date August 25th, 2021

pragma solidity ^0.8.0;

import '../UNSRegistry.sol';

contract UNSRegistryMock is UNSRegistry {
    function upgradeAll(uint256[] calldata tokenIds) external onlyMintingManager {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _upgradedTokens[tokenIds[i]] = true;
        }
    }
}
