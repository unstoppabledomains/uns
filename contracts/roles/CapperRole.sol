// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract CapperRole is AccessControl {
    bytes32 public constant CAPPER_ROLE = keccak256("CAPPER_ROLE");

    event CapperAdded(address indexed account);
    event CapperRemoved(address indexed account);

    constructor() {
        _addCapper(_msgSender());
    }

    modifier onlyCapper() {
        require(isCapper(_msgSender()), "CapperRole: caller does not have the Capper role");
        _;
    }

    function isCapper(address account) public view returns (bool) {
        return hasRole(CAPPER_ROLE, account);
    }

    function addCapper(address account) public onlyCapper {
        _addCapper(account);
    }

    function renounceCapper() public {
        _removeCapper(_msgSender());
    }

    function _addCapper(address account) internal {
        _setupRole(CAPPER_ROLE, account);
        emit CapperAdded(account);
    }

    function _removeCapper(address account) internal {
        renounceRole(CAPPER_ROLE, account);
        emit CapperRemoved(account);
    }
}