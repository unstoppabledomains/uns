// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MultiSend {
    constructor(address payable[] memory accounts, uint256[] memory values) payable {
        for (uint256 index = 0; index < accounts.length; index++) {
            accounts[index].transfer(values[index]);
        }
        selfdestruct(payable(msg.sender));
    }
}
