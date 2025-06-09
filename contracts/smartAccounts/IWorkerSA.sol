// @author Unstoppable Domains, Inc.
// @date May 29th, 2025

pragma solidity ^0.8.24;

import './ISmartAccount.sol';

interface IWorkerSA is ISmartAccount {
    function executeBatch(Call[] calldata calls, bool revertOnError) external payable;
    function executeBatchAndEnsureBalance(Call[] calldata calls, bool revertOnError) external payable;

    event InternalCallFailed(uint256 indexed callIndex, bytes returnData);

    error ExecuteFailed();
}
