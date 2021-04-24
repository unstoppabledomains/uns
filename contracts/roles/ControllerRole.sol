// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract ControllerRole is AccessControl {
    bytes32 public constant CONTROLLER_ROLE = keccak256("CONTROLLER_ROLE");

    modifier onlyController() {
        require(isController(_msgSender()), "ControllerRole: CALLER_IS_NOT_CONTROLLER");
        _;
    }

    constructor() {
        _addRole(_msgSender());
    }

    function isController(address account) public view returns (bool) {
        return hasRole(CONTROLLER_ROLE, account);
    }

    function addController(address account) public onlyController {
        _addRole(account);
    }

    function renounceController() public {
        _removeRole(_msgSender());
    }

    function _addRole(address account) internal {
        _setupRole(CONTROLLER_ROLE, account);
    }

    function _removeRole(address account) internal {
        renounceRole(CONTROLLER_ROLE, account);
    }
}
