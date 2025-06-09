// @author Unstoppable Domains, Inc.
// @date May 29th, 2025

pragma solidity ^0.8.24;

import './ISmartAccount.sol';

interface IFaucetSA is ISmartAccount {
    function fundWorker() external;
    function addAuthorizedWorkers(address[] calldata workers) external;
    function removeAuthorizedWorkers(address[] calldata workers) external;
    function setWorkerFundingAmount(uint256 amount) external;
    function setWorkerBalanceThreshold(uint256 threshold) external;
    function workerBalanceThreshold() external view returns (uint256);

    error NotAuthorizedWorker();
    error TransferFailed();
}
