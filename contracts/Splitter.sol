pragma solidity ^0.8.0;

contract Splitter {

    mapping(address => uint256) public balanceMap;

    function split(address recipient, address otherRecipient) external payable {
        require(msg.value > 0, 'Amount to split should be greater than zero');

        // division by 2.
        uint256 fairPart = msg.value >> 1;
        balanceMap[recipient] += fairPart;
        balanceMap[otherRecipient] += fairPart;

        // check if amount appeared to be odd and if it is - add 1 wei to sender balance for further use.
        if ((msg.value & 1) == 1) {
            balanceMap[msg.sender] += 1;
        }
    }

    function withdraw() external {
        uint256 currentBalance = balanceMap[msg.sender];
        require(currentBalance > 0, 'Zero balance, nothing to withdraw');

        balanceMap[msg.sender] = 0;
        (bool sent,) = msg.sender.call{value: currentBalance}("");
        require(sent, 'Failed to send Ether');
    }
}