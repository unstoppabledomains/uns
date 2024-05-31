// @author Unstoppable Domains, Inc.
// @date November 10th, 2022

pragma solidity 0.8.17;

import '../UNSRegistry.sol';

contract UNSRegistryMock is UNSRegistry {
    function upgradeAll(uint256[] calldata tokenIds) external onlyMintingManager {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _upgradedTokens[tokenIds[i]] = true;
        }
    }

    function getTokenName(uint256 tokenId) external view returns (string memory) {
        return _tokenNames[tokenId];
    }
}
