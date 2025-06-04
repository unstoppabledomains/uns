// @author Unstoppable Domains, Inc.
// @date May 29th, 2025
pragma solidity ^0.8.20;

import '../metatx/IForwarder.sol';

interface IWorkerSmartAccount {
    struct Call {
        address target;
        bytes data;
        uint256 value;
    }

    function executeBatch(Call[] calldata calls) external payable;
    function executeBatchAndEnsureBalance(Call[] calldata calls) external payable;

    error NotSelf();
    error ExecuteFailed();
}
