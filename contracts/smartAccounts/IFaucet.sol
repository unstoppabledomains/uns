pragma solidity ^0.8.20;

interface IFaucet {
    function withdraw() external;
    function addAuthorizedWorkers(address[] calldata _workers) external;
    function removeAuthorizedWorkers(address[] calldata _workers) external;
}
