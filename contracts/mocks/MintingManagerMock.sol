// @author Unstoppable Domains, Inc.
// @date November 10th, 2022

pragma solidity ^0.8.0;

import '../MintingManager.sol';
import './UNSRegistryMock.sol';

contract MintingManagerMock is MintingManager {
    function upgradeAll(uint256[] calldata tokenIds) external onlyMinter {
        (bool success, ) = address(unsRegistry).call(abi.encodeWithSignature('upgradeAll(uint256[])', tokenIds));
        require(success, 'upgradeAll mock failed');
    }
}
