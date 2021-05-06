// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract WhitelistedRole is AccessControl {
    bytes32 public constant WHITELISTED_ROLE = keccak256("WHITELISTED_ROLE");

    modifier onlyWhitelisted() {
        require(isWhitelisted(_msgSender()), "WhitelistedRole: CALLER_IS_NOT_WHITELISTED");
        _;
    }

    modifier onlyWhitelistAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "WhitelistedRole: CALLER_IS_NOT_ADMIN");
        _;
    }

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function isWhitelisted(address account) public view returns (bool) {
        return hasRole(WHITELISTED_ROLE, account);
    }

    function addWhitelisted(address account) public onlyWhitelistAdmin {
        _addWhitelisted(account);
    }

    function removeWhitelisted(address account) public onlyWhitelistAdmin {
        _removeWhitelisted(account);
    }

    function renounceWhitelisted() public {
        _removeWhitelisted(_msgSender());
    }


    function addWhitelistAdmin(address account) public onlyWhitelistAdmin {
        _setupRole(DEFAULT_ADMIN_ROLE, account);
    }

    function renounceWhitelistAdmin() public {
        renounceRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function _addWhitelisted(address account) internal {
        _setupRole(WHITELISTED_ROLE, account);
    }

    function _removeWhitelisted(address account) internal {
        renounceRole(WHITELISTED_ROLE, account);
    }
}
