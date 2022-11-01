// @author Unstoppable Domains, Inc.
// @date August 25th, 2021

pragma solidity ^0.8.0;

import '../MintingManager.sol';
import './UNSRegistryMock.sol';

contract MintingManagerMock is MintingManager {
    function upgradeAll(uint256[] calldata tokenIds) external onlyMinter {
        (bool success, ) = address(unsRegistry).call(abi.encodeWithSignature('upgradeAll(uint256[])', tokenIds));
        require(success, 'upgradeAll call failed');
    }
}
