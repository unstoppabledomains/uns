pragma solidity ^0.8.17;

import './ISmartAccount.sol';

interface IUserSmartAccount is ISmartAccount {
    event CallExecuted(address indexed sender, address indexed to, uint256 value, bytes data);
    event BatchExecuted(uint256 indexed nonce, Call[] calls);

    function nonce() external view returns (uint256);

    function execute(Call[] calldata calls, uint256 deadline, SplitSignature calldata signature) external payable;
    function execute(Call[] calldata calls) external payable;
}
