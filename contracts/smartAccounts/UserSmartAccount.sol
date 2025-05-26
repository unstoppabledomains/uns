pragma solidity ^0.8.17;

import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';
import '@openzeppelin/contracts/utils/cryptography/EIP712.sol';
import './IUserSmartAccount.sol';

contract UserSmartAccount is IUserSmartAccount, EIP712 {
    using ECDSA for bytes32;

    bytes32 public constant SMART_ACCOUNT_TYPEHASH = keccak256('SmartAccountExecute(uint256 nonce,bytes32 callsHash,uint256 deadline)');
    bytes32 private constant NONCE_SLOT = keccak256('UnstoppableDomainsUserSmartAccountV1.nonce');

    modifier onlySelf() {
        require(msg.sender == address(this), 'UserSmartAccount: Invalid authority');
        _;
    }

    constructor() EIP712('UserSmartAccount', '1') {}

    function nonce() public view returns (uint256) {
        return StorageSlot.getUint256Slot(NONCE_SLOT).value;
    }

    function _incrementNonce() internal {
        StorageSlot.getUint256Slot(NONCE_SLOT).value++;
    }

    function execute(Call[] calldata calls, uint256 deadline, SplitSignature calldata signature) external payable {
        require(block.timestamp < deadline, 'UserSmartAccount: Deadline expired');

        bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(SMART_ACCOUNT_TYPEHASH, nonce(), encodeCalls(calls), deadline)));

        address recovered = ECDSA.recover(digest, signature.v, signature.r, signature.s);
        require(recovered == address(this), 'UserSmartAccount: Invalid signature');

        _executeBatch(calls);
    }

    function execute(Call[] calldata calls) external payable onlySelf {
        _executeBatch(calls);
    }

    function _executeBatch(Call[] calldata calls) internal {
        uint256 currentNonce = nonce();
        _incrementNonce();

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

    function encodeCalls(Call[] calldata calls) public pure returns (bytes32 encodedCalls) {
        for (uint256 i = 0; i < calls.length; i++) {
            encodedCalls = keccak256(abi.encodePacked(encodedCalls, calls[i].to, calls[i].value, calls[i].data));
        }
    }

    fallback() external payable {}
    receive() external payable {}
}
