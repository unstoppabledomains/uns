// @author Unstoppable Domains, Inc.
// @date May 29th, 2025

pragma solidity ^0.8.24;

import './IFaucetSmartAccount.sol';

/**
 * @title Faucet
 * @notice A contract that funds workers and ensures they maintain a minimum balance.
 * @dev This contract is a smart account but it is stateful.
 * If update of this contract is required make sure that storage layout is not corrupted
 * or use a new keypair for faucet wallet with clean storage before delegation.
 */
contract Faucet is IFaucetSmartAccount {
    uint256 public workerBalanceThreshold;
    uint256 public workerFundingAmount;

    mapping(address => bool) public authorizedWorkers;

    modifier onlyAuthorizedWorker() {
        if (!authorizedWorkers[msg.sender]) revert NotAuthorizedWorker();
        _;
    }

    modifier onlySelf() {
        if (msg.sender != address(this)) revert NotSelf();
        _;
    }

    function requestFunding() external onlyAuthorizedWorker {
        (bool success, ) = payable(msg.sender).call{value: workerFundingAmount}('');
        if (!success) revert TransferFailed();
    }

    function addAuthorizedWorkers(address[] calldata workers) external onlySelf {
        for (uint256 i = 0; i < workers.length; i++) {
            authorizedWorkers[workers[i]] = true;
        }
    }

    function removeAuthorizedWorkers(address[] calldata workers) external onlySelf {
        for (uint256 i = 0; i < workers.length; i++) {
            authorizedWorkers[workers[i]] = false;
        }
    }

    function setWorkerFundingAmount(uint256 amount) external onlySelf {
        workerFundingAmount = amount;
    }

    function setWorkerBalanceThreshold(uint256 threshold) external onlySelf {
        workerBalanceThreshold = threshold;
    }

    receive() external payable {}
    fallback() external payable {}
}
