pragma solidity 0.5.12;

import "@openzeppelin/contracts/access/Roles.sol";

// solium-disable error-reason

/**
 * @title ControllerRole
 * @dev An Controller role defined using the Open Zeppelin Role system.
 */
contract ControllerRole {

    using Roles for Roles.Role;

    // NOTE: Commented out standard Role events to save gas.
    // event ControllerAdded(address indexed account);
    // event ControllerRemoved(address indexed account);

    Roles.Role private _controllers;

    constructor () public {
        _addController(msg.sender);
    }

    modifier onlyController() {
        require(isController(msg.sender));
        _;
    }

    function isController(address account) public view returns (bool) {
        return _controllers.has(account);
    }

    function addController(address account) public onlyController {
        _addController(account);
    }

    function renounceController() public {
        _removeController(msg.sender);
    }

    function _addController(address account) internal {
        _controllers.add(account);
        // emit ControllerAdded(account);
    }

    function _removeController(address account) internal {
        _controllers.remove(account);
        // emit ControllerRemoved(account);
    }

}
