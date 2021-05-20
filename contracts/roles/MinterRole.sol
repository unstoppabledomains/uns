// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';

abstract contract MinterRole is AccessControlUpgradeable {
    bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');

    modifier onlyMinter() {
        require(isMinter(_msgSender()), 'MinterRole: CALLER_IS_NOT_MINTER');
        _;
    }

    function __MinterRole_init() internal initializer {
        __MinterRole_init_unchained();
    }

    function __MinterRole_init_unchained() internal initializer {
        _setupRole(MINTER_ROLE, _msgSender());
    }

    function isMinter(address account) public view returns (bool) {
        return hasRole(MINTER_ROLE, account);
    }

    function addMinter(address account) public onlyMinter {
        _setupRole(MINTER_ROLE, account);
    }

    function renounceMinter() public {
        renounceRole(MINTER_ROLE, _msgSender());
    }
}
