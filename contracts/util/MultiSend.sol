pragma solidity 0.5.12;

contract MultiSend {
    constructor (address payable[] memory accounts, uint256[] memory values) public payable {
        for (uint256 index = 0; index < accounts.length; index++) {
            accounts[index].transfer(values[index]);
        }
        selfdestruct(msg.sender);
    }

//     function send(address payable[] memory accounts, uint256[] memory values) public payable {
//         for (uint256 index = 0; index < accounts.length; index++) {
//             accounts[index].transfer(values[index]);
//         }
//     }

}

