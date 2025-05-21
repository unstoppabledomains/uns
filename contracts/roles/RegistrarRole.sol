// @author Unstoppable Domains, Inc.
// @date May 21st, 2025

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

error Unauthorized();

abstract contract RegistrarRole is OwnableUpgradeable, AccessControlUpgradeable {
    // solhint-disable-next-line func-name-mixedcase
    function __RegistrarRole_init() internal onlyInitializing {
        __Ownable_init_unchained();
        __AccessControl_init_unchained();
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    // solhint-disable-next-line func-name-mixedcase
    function __RegistrarRole_init_unchained() internal onlyInitializing {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    modifier onlyAdmin() {
        if (!hasRole(DEFAULT_ADMIN_ROLE, _msgSender())) {
            revert Unauthorized();
        }

        _;
    }

    function registrarRole(uint256 registrarId) public pure returns (bytes32) {
        return keccak256(abi.encode('REGISTRAR', registrarId));
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

    function isRegistrar(uint256 registrarId, address account) public view returns (bool) {
        return hasRole(registrarRole(registrarId), account);
    }

    function addRegistrar(uint256 registrarId, address account) external onlyOwner {
        _setupRole(registrarRole(registrarId), account);
    }

    function removeRegistrar(uint256 registrarId, address account) external onlyOwner {
        revokeRole(registrarRole(registrarId), account);
    }

    uint256[50] private __gap;
}
