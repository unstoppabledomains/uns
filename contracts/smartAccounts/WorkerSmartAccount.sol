// @author Unstoppable Domains, Inc.
// @date May 29th, 2025
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';
import 'hardhat/console.sol';
import './IFaucet.sol';
import './IWorkerSmartAccount.sol';
import '../metatx/IForwarder.sol';

contract WorkerSmartAccount is IWorkerSmartAccount {
    uint256 public immutable balanceThreshold;
    IFaucet public immutable faucet;

    constructor(IFaucet _faucet, uint256 _balanceThreshold) {
        faucet = _faucet;
        balanceThreshold = _balanceThreshold;
    }

    modifier onlySelf() {
        require(msg.sender == address(this), 'WorkerSmartAccount: Can be only called from self');
        _;
    }

    function executeBatch(address[] calldata targets, bytes[] calldata datas, uint256[] calldata values) public payable onlySelf {
        require(targets.length == datas.length && targets.length == values.length, 'WorkerSmartAccount: Invalid calls');

        for (uint256 i = 0; i < targets.length; i++) {
            (bool success, ) = targets[i].call{value: values[i]}(datas[i]);
            require(success, 'WorkerSmartAccount: Execute failed');
        }
    }

    function executeBatchAndEnsureBalance(
        address[] calldata targets,
        bytes[] calldata datas,
        uint256[] calldata values
    ) external payable onlySelf {
        executeBatch(targets, datas, values);
        _ensureBalance();
    }

    function _ensureBalance() private {
        if (address(this).balance < balanceThreshold) {
            faucet.fundWorker();
        }
    }

    fallback() external payable {}
    receive() external payable {}
}
