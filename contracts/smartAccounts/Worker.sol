// @author Unstoppable Domains, Inc.
// @date May 29th, 2025

pragma solidity ^0.8.24;

import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';
import './IFaucetSmartAccount.sol';
import './IWorkerSmartAccount.sol';
import '../metatx/IForwarder.sol';

contract Worker is IWorkerSmartAccount {
    string public constant VERSION = '1.0.0';

    IFaucetSmartAccount public immutable faucet;

    constructor(IFaucetSmartAccount _faucet) {
        faucet = _faucet;
    }

    modifier onlySelf() {
        if (msg.sender != address(this)) revert NotSelf();
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
     * @param calls Array of calls to execute
     */
    function executeBatch(Call[] calldata calls, bool revertOnError) public payable onlySelf {
        for (uint256 i = 0; i < calls.length; i++) {
            (bool success, bytes memory returnData) = calls[i].target.call{value: calls[i].value}(calls[i].data);

            if (!success) {
                if (revertOnError) {
                    if (returnData.length == 0) revert ExecuteFailed();
                    assembly {
                        revert(add(returnData, 32), mload(returnData))
                    }
                } else {
                    emit InternalCallFailed(i, returnData);
                }
            }
        }
    }

    /**
     * @dev Same as executeBatch, but also ensures the contract maintains a worker minimum balance,
     * this way workers become self-sustaining.
     *
     * @param calls Array of calls to execute
     */
    function executeBatchAndEnsureBalance(Call[] calldata calls, bool revertOnError) external payable onlySelf {
        executeBatch(calls, revertOnError);
        _ensureBalance();
    }

    function _ensureBalance() private {
        if (address(this).balance < faucet.workerBalanceThreshold()) {
            faucet.requestFunding();
        }
    }

    receive() external payable {}
    fallback() external payable {}
}
