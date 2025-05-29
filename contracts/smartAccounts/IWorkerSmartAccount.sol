// @author Unstoppable Domains, Inc.
// @date May 29th, 2025
pragma solidity ^0.8.20;

import '../metatx/IForwarder.sol';

interface IWorkerSmartAccount {
    function executeBatch(address[] calldata targets, bytes[] calldata datas, uint256[] calldata values) external payable;

    function executeBatchAndEnsureBalance(address[] calldata targets, bytes[] calldata datas, uint256[] calldata values) external payable;
}
