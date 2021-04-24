// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract MinterRole is AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    modifier onlyMinter() {
        require(isMinter(_msgSender()), "MinterRole: CALLER_IS_NOT_MINTER");
        _;
    }

    event MinterAdded(address indexed account);
    event MinterRemoved(address indexed account);

    constructor() {
        _addMinter(_msgSender());
    }

    function isMinter(address account) public view returns (bool) {
        return hasRole(MINTER_ROLE, account);
    }

    function addMinter(address account) public onlyMinter {
        _addMinter(account);
    }

    function renounceMinter() public {
        _removeMinter(_msgSender());
    }

    function _addMinter(address account) internal {
        _setupRole(MINTER_ROLE, account);
        emit MinterAdded(account);
    }

    function _removeMinter(address account) internal {
        renounceRole(MINTER_ROLE, account);
        emit MinterRemoved(account);
    }
}
