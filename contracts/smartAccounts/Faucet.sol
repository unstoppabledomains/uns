// @author Unstoppable Domains, Inc.
// @date May 29th, 2025

pragma solidity ^0.8.20;

import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import './IFaucet.sol';

contract Faucet is IFaucet, Initializable, OwnableUpgradeable {
    uint256 public workerBalanceThreshold;
    uint256 public workerFundingAmount;

    mapping(address => bool) public authorizedWorkers;

    function initialize(uint256 _workerFundingAmount, uint256 _workerBalanceThreshold) public initializer {
        __Ownable_init();
        workerFundingAmount = _workerFundingAmount;
        workerBalanceThreshold = _workerBalanceThreshold;
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

    function setWorkerBalanceThreshold(uint256 threshold) external onlyOwner {
        workerBalanceThreshold = threshold;
    }

    function withdraw(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, 'Faucet: Insufficient balance');
        payable(msg.sender).transfer(amount);
    }

    function withdrawAll() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    receive() external payable {}

    uint256[50] private __gap;
}
