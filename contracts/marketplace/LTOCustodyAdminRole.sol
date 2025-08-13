// @author Unstoppable Domains, Inc.
// @date May 21st, 2025

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

abstract contract LTOCustodyAdminRole is OwnableUpgradeable, AccessControlUpgradeable {
    bytes32 public constant CUSTODY_ADMIN_ROLE = keccak256('CUSTODY_ADMIN_ROLE');

    event CustodyAdminAdded(address indexed account);
    event CustodyAdminRemoved(address indexed account);

    error Unauthorized();

    // solhint-disable-next-line func-name-mixedcase
    function __LTOCustodyAdminRole_init() internal onlyInitializing {
        __Ownable_init_unchained();
        __AccessControl_init_unchained();
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    // solhint-disable-next-line func-name-mixedcase
    function __LTOCustodyAdminRole_init_unchained() internal onlyInitializing {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    modifier onlyAdmin() {
        if (!hasRole(DEFAULT_ADMIN_ROLE, _msgSender())) {
            revert Unauthorized();
        }

        _;
    }

    function isAdmin(address account) public view returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    function addAdmin(address account) external onlyOwner {
        _setupRole(DEFAULT_ADMIN_ROLE, account);
    }

    function removeAdmin(address account) external onlyOwner {
        revokeRole(DEFAULT_ADMIN_ROLE, account);
    }

    function renounceAdmin() external {
        renounceRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function rotateAdmin(address newAdmin) external onlyOwner {
        _setupRole(DEFAULT_ADMIN_ROLE, newAdmin);
        renounceRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function isCustodyAdmin(address account) public view returns (bool) {
        return hasRole(CUSTODY_ADMIN_ROLE, account);
    }

    function addCustodyAdmin(address account) external onlyOwner {
        _setupRole(CUSTODY_ADMIN_ROLE, account);
        emit CustodyAdminAdded(account);
    }

    function removeCustodyAdmin(address account) external onlyOwner {
        revokeRole(CUSTODY_ADMIN_ROLE, account);
        emit CustodyAdminRemoved(account);
    }

    modifier onlyCustodyAdmin() {
        if (!isCustodyAdmin(_msgSender())) {
            revert Unauthorized();
        }

        _;
    }

    uint256[50] private __gap;
}
