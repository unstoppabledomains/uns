pragma solidity ^0.8.17;

import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';
import './IUserSmartAccount.sol';

contract UserSmartAccount is IUserSmartAccount {
    using ECDSA for bytes32;

    uint256 public nonce;

    modifier onlySelf() {
        require(msg.sender == address(this), 'UserSmartAccount: Invalid authority');
        _;
    }

    function execute(Call[] calldata calls, bytes calldata signature) external payable {
        bytes memory encodedCalls;
        for (uint256 i = 0; i < calls.length; i++) {
            encodedCalls = abi.encodePacked(encodedCalls, calls[i].to, calls[i].value, calls[i].data);
        }
        bytes32 digest = keccak256(abi.encodePacked(nonce, encodedCalls));

        bytes32 ethSignedMessageHash = ECDSA.toEthSignedMessageHash(digest);

        address recovered = ECDSA.recover(ethSignedMessageHash, signature);
        require(recovered == address(this), 'Invalid signature');

        _executeBatch(calls);
    }

    function execute(Call[] calldata calls) external payable onlySelf {
        _executeBatch(calls);
    }

    function _executeBatch(Call[] calldata calls) internal {
        uint256 currentNonce = nonce;
        nonce++;

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

    fallback() external payable {}
    receive() external payable {}

    function helloEIP7702() external pure returns (string memory) {
        return 'Hello EIP-7702';
    }
}
