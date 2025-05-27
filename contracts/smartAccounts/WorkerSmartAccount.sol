pragma solidity ^0.8.17;

import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';
import './IFaucet.sol';
import './IWorkerSmartAccount.sol';
import './IUserSmartAccount.sol';
import '../metatx/IForwarder.sol';

contract WorkerSmartAccount is IWorkerSmartAccount {
    uint256 immutable BALANCE_THRESHOLD;
    IFaucet immutable faucet;

    constructor(IFaucet _faucet, uint256 _balanceThreshold) {
        faucet = _faucet;
        BALANCE_THRESHOLD = _balanceThreshold;
    }

    modifier onlySelf() {
        require(msg.sender == address(this), 'WorkerSmartAccount: Can be only called from self');
        _;
    }

    function executeBatch(address[] calldata targets, bytes[] calldata datas, uint256[] calldata values) external payable onlySelf {
        require(targets.length == datas.length && targets.length == values.length, 'WorkerSmartAccount: Invalid transactions');

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
        require(targets.length == datas.length && targets.length == values.length, 'WorkerSmartAccount: Invalid transactions');

        for (uint256 i = 0; i < targets.length; i++) {
            (bool success, ) = targets[i].call{value: values[i]}(datas[i]);
            require(success, 'WorkerSmartAccount: Execute failed');
        }

        _ensureBalance();
    }

    function _ensureBalance() private {
        if (address(this).balance < BALANCE_THRESHOLD) {
            faucet.withdraw();
        }
    }

    fallback() external payable {}
    receive() external payable {}
}
