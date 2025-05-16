pragma solidity ^0.8.20;

import '@openzeppelin/contracts/access/Ownable.sol';
import './IFaucet.sol';

contract Faucet is IFaucet, Ownable {
    constructor() Ownable() {}

    mapping(address => bool) authorizedWorkers;

    modifier onlyAuthorizedWorker() {
        require(authorizedWorkers[msg.sender], 'Faucet: Not an authorized worker');
        _;
    }

    function withdraw() external onlyAuthorizedWorker {
        payable(msg.sender).transfer(0.1 ether);
    }

    function addAuthorizedWorkers(address[] calldata _workers) external onlyOwner {
        for (uint256 i = 0; i < _workers.length; i++) {
            authorizedWorkers[_workers[i]] = true;
        }
    }

    function removeAuthorizedWorkers(address[] calldata _workers) external onlyOwner {
        for (uint256 i = 0; i < _workers.length; i++) {
            authorizedWorkers[_workers[i]] = false;
        }
    }

    function withdraw(uint256 _amount) external onlyOwner {
        require(_amount <= address(this).balance, 'Faucet: Insufficient balance');
        payable(msg.sender).transfer(_amount);
    }

    receive() external payable {}
}
