pragma solidity ^0.8.17;

import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';
import './IFaucet.sol';

contract WorkerSmartAccount {
    using ECDSA for bytes32;

    uint256 constant BALANCE_THRESHOLD = 1 ether;
    IFaucet immutable faucet;

    uint256 public nonce;

    struct Call {
        address to;
        uint256 value;
        bytes data;
    }

    event CallExecuted(address indexed sender, address indexed to, uint256 value, bytes data);
    event BatchExecuted(uint256 indexed nonce, Call[] calls);

    constructor(IFaucet _faucet) {
        faucet = _faucet;
    }

    function executeAndCheckBalance(Call[] calldata calls) external payable {
        require(msg.sender == address(this), 'Invalid authority');
        _executeBatch(calls);

        _checkBalance();
    }

    function _executeBatch(Call[] calldata calls) internal {
        uint256 currentNonce = nonce;
        nonce++; // Increment nonce to protect against replay attacks

        for (uint256 i = 0; i < calls.length; i++) {
            _executeCall(calls[i]);
        }

        emit BatchExecuted(currentNonce, calls);
    }

    function _executeCall(Call calldata callItem) internal {
        (bool success, ) = callItem.to.call{value: callItem.value}(callItem.data);
        require(success, 'Call reverted');
        emit CallExecuted(msg.sender, callItem.to, callItem.value, callItem.data);
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
