pragma solidity ^0.8.17;

import '../metatx/IForwarder.sol';

interface IWorkerSmartAccount {
    function executeBatch(address[] calldata targets, bytes[] calldata datas, uint256[] calldata values) external payable;

    function executeBatchAndEnsureBalance(address[] calldata targets, bytes[] calldata datas, uint256[] calldata values) external payable;
}
