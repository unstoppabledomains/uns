// @author Unstoppable Domains, Inc.
// @date December 22nd, 2021

pragma solidity ^0.8.0;

interface IERC1967 {
    /**
     * @dev Emitted when the implementation is upgraded.
     */
    event Upgraded(address indexed implementation);

    /**
     * @dev Emitted when the admin account has changed.
     */
    event AdminChanged(address previousAdmin, address newAdmin);
}
