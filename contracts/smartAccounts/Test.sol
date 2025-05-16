pragma solidity ^0.8.17;

contract Test {
    function execute() external {}

    function helloEIP7702() external pure returns (string memory) {
        return 'Hello EIP-7702';
    }
}
