// @author Unstoppable Domains, Inc.
// @date May 29th, 2025
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';
import 'hardhat/console.sol';
import './IFaucet.sol';
import './IWorkerSmartAccount.sol';
import '../metatx/IForwarder.sol';

contract WorkerSmartAccount is IWorkerSmartAccount {
    // If contract is updated and redeployed to the same worker accounts,
    // version V must be bumped and slot hash updated
    // keccak256("WorkerSmartAccount.balanceThresholdV1")
    bytes32 constant BALANCE_THRESHOLD_SLOT = 0x5b8c3d83666741a3d369e0ad33d88661dc3e95bcb194a23d030cf3d9c5bc0e91;

    IFaucet public immutable faucet;

    constructor(IFaucet _faucet) {
        faucet = _faucet;
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

    function setBalanceThreshold(uint256 _newThreshold) external onlySelf {
        assembly {
            sstore(BALANCE_THRESHOLD_SLOT, _newThreshold)
        }
    }

    function balanceThreshold() public view returns (uint256 value) {
        assembly {
            value := sload(BALANCE_THRESHOLD_SLOT)
        }
    }

    function _ensureBalance() private {
        if (address(this).balance < balanceThreshold()) {
            faucet.fundWorker();
        }
    }

    fallback() external payable {}
    receive() external payable {}
}
