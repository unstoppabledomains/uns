pragma solidity ^0.8.17;

import './IUserSmartAccount.sol';
import './IFaucet.sol';

interface IWorkerSmartAccount is ISmartAccount {
    function executeAndCheckBalance(
        Call[] calldata calls,
        IUserSmartAccount userSA,
        uint256 txDeadline,
        SplitSignature calldata userSignature
    ) external payable;
}
