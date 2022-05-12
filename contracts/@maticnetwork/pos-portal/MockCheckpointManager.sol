// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

interface IRootChain {
    event NewHeaderBlock(
        address indexed proposer,
        uint256 indexed headerBlockId,
        uint256 indexed reward,
        uint256 start,
        uint256 end,
        bytes32 root
    );
}

contract ICheckpointManager {
    struct HeaderBlock {
        bytes32 root;
        uint256 start;
        uint256 end;
        uint256 createdAt;
        address proposer;
    }

    /**
     * @notice mapping of checkpoint header numbers to block details
     * @dev These checkpoints are submited by plasma contracts
     */
    mapping(uint256 => HeaderBlock) public headerBlocks;
}

/**
 * @notice Mock Checkpoint Manager contract to simulate plasma checkpoints while testing
 */
contract MockCheckpointManager is ICheckpointManager, IRootChain {
    uint256 public currentCheckpointNumber = 0;

    function setCheckpoint(bytes32 rootHash, uint256 start, uint256 end) public {
        HeaderBlock memory headerBlock = HeaderBlock({
            root: rootHash,
            start: start,
            end: end,
            createdAt: now,
            proposer: msg.sender
        });

        currentCheckpointNumber = currentCheckpointNumber + 1;
        headerBlocks[currentCheckpointNumber] = headerBlock;

        emit NewHeaderBlock(msg.sender, currentCheckpointNumber, 0, start, end, rootHash);
    }
}
