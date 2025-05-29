// @author Unstoppable Domains, Inc.
// @date May 29th, 2025

pragma solidity ^0.8.20;

import '@openzeppelin/contracts/access/Ownable.sol';
import './IFaucet.sol';

contract Faucet is IFaucet, Ownable {
    uint256 public workerFundingAmount;

    mapping(address => bool) public authorizedWorkers;

    constructor(uint256 _workerFundingAmount) Ownable() {
        workerFundingAmount = _workerFundingAmount;
    }

    modifier onlyAuthorizedWorker() {
        require(authorizedWorkers[msg.sender], 'Faucet: Not an authorized worker');
        _;
    }

    function fundWorker() external onlyAuthorizedWorker {
        (bool success, ) = payable(msg.sender).call{value: workerFundingAmount}('');
        require(success, 'Faucet: Transfer failed');
    }

    function addAuthorizedWorkers(address[] calldata workers) external onlyOwner {
        for (uint256 i = 0; i < workers.length; i++) {
            authorizedWorkers[workers[i]] = true;
        }
    }

    function removeAuthorizedWorkers(address[] calldata workers) external onlyOwner {
        for (uint256 i = 0; i < workers.length; i++) {
            authorizedWorkers[workers[i]] = false;
        }
    }

    function setWorkerFundingAmount(uint256 amount) external onlyOwner {
        workerFundingAmount = amount;
    }

    function withdraw(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, 'Faucet: Insufficient balance');
        payable(msg.sender).transfer(amount);
    }

    function withdrawAll() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {}
}
