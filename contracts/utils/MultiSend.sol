// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

contract MultiSend {
    constructor(address payable[] memory accounts, uint256[] memory values) payable {
        for (uint256 index = 0; index < accounts.length; index++) {
            accounts[index].transfer(values[index]);
        }
        selfdestruct(payable(msg.sender));
    }
}
