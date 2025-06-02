// @author Unstoppable Domains, Inc.
// @date May 29th, 2025
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';
import 'hardhat/console.sol';
import './IFaucet.sol';
import './IWorkerSmartAccount.sol';
import '../metatx/IForwarder.sol';

contract WorkerSmartAccount is IWorkerSmartAccount {
    IFaucet public immutable faucet;

    constructor(IFaucet _faucet) {
        faucet = _faucet;
    }

    modifier onlySelf() {
        require(msg.sender == address(this), 'WorkerSmartAccount: Can be only called from self');
        _;
    }

    /**
     * @dev Executes a batch of transactions on behalf of the worker account.
     * This function is a general-purpose worker account executor that can:
     * 1. Execute multiple transactions in a single call
     * 2. Be used in conjunction with user signatures to execute actions on their behalf
     * 3. Particularly useful for executing operations through the mintingManager
     *
     * This contract is designed to be delegated to worker accounts.
     * A calldata for the calls can be generated with arguments of
     * forwarder contracts along with signatures, so the worker
     * can perform a multicall to execute meta transactions.
     *
     * @param targets Array of target addresses to call
     * @param datas Array of calldata for each call
     * @param values Array of ETH values to send with each call
     */
    function executeBatch(address[] calldata targets, bytes[] calldata datas, uint256[] calldata values) public payable onlySelf {
        require(targets.length == datas.length && targets.length == values.length, 'WorkerSmartAccount: Invalid calls');

        for (uint256 i = 0; i < targets.length; i++) {
            (bool success, ) = targets[i].call{value: values[i]}(datas[i]);
            require(success, 'WorkerSmartAccount: Execute failed');
        }
    }

    /**
     * @dev Same as executeBatch, but also ensures the contract maintains a worker minimum balance,
     * this way workers become self-sustaining.
     *
     * @param targets Array of target addresses to call
     * @param datas Array of calldata for each call
     * @param values Array of ETH values to send with each call
     */
    function executeBatchAndEnsureBalance(
        address[] calldata targets,
        bytes[] calldata datas,
        uint256[] calldata values
    ) external payable onlySelf {
        executeBatch(targets, datas, values);
        _ensureBalance();
    }

    function _ensureBalance() private {
        if (address(this).balance < faucet.workerBalanceThreshold()) {
            faucet.fundWorker();
        }
    }

    fallback() external payable {}
    receive() external payable {}
}
