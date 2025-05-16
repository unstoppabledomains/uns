pragma solidity ^0.8.17;

import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';
import './IFaucet.sol';
import './IWorkerSmartAccount.sol';
import './IUserSmartAccount.sol';

contract WorkerSmartAccount is IWorkerSmartAccount {
    uint256 constant BALANCE_THRESHOLD = 0.1 ether;
    IFaucet immutable faucet;

    constructor(IFaucet _faucet) {
        faucet = _faucet;
    }

    modifier onlySelf() {
        require(msg.sender == address(this), 'WorkerSmartAccount: Invalid authority');
        _;
    }

    function executeAndCheckBalance(
        Call[] calldata calls,
        IUserSmartAccount userSA,
        bytes calldata userSignature
    ) external payable onlySelf {
        userSA.execute(calls, userSignature);

        _checkBalance();
    }

    function _checkBalance() private {
        if (address(this).balance < BALANCE_THRESHOLD) {
            faucet.withdraw();
        }
    }

    fallback() external payable {}
    receive() external payable {}

    function helloEIP7702() external pure returns (string memory) {
        return 'Hello EIP-7702';
    }
}
