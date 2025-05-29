// @author Unstoppable Domains, Inc.
// @date May 29th, 2025
pragma solidity ^0.8.20;

interface IFaucet {
    function fundWorker() external;
    function addAuthorizedWorkers(address[] calldata workers) external;
    function removeAuthorizedWorkers(address[] calldata workers) external;
    function setWorkerFundingAmount(uint256 amount) external;
    function withdraw(uint256 amount) external;
    function withdrawAll() external;
    receive() external payable;
}
