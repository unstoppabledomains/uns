// @author Unstoppable Domains, Inc.
// @date May 8th, 2023

pragma solidity 0.8.17;

import '../MintingManager.sol';
import './UNSRegistryMock.sol';

contract MintingManagerMock is MintingManager {
    function upgradeAll(uint256[] calldata tokenIds) external onlyMinter {
        (bool success, ) = address(unsRegistry).call(abi.encodeWithSignature('upgradeAll(uint256[])', tokenIds));
        require(success, 'upgradeAll mock failed');
    }
}
