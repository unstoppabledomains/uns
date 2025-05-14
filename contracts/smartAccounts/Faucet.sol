pragma solidity ^0.8.20;

import '@openzeppelin/contracts/access/Ownable.sol';
import './IFaucet.sol';

contract Faucet is IFaucet, Ownable {
    constructor() Ownable() {}

    mapping(address => bool) authorizedWorkers;

    modifier onlyAuthorizedWorkers() {
        require(authorizedWorkers[msg.sender], 'Faucet: Not an authorized worker');
        _;
    }

    function withdraw() external onlyAuthorizedWorkers {
        payable(msg.sender).transfer(1 ether);
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

    receive() external payable {}
}
