// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

abstract contract MinterRole is OwnableUpgradeable, AccessControlUpgradeable {
    bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');

    modifier onlyMinter() {
        require(isMinter(_msgSender()), '54');
        _;
    }

    // solhint-disable-next-line func-name-mixedcase
    function __MinterRole_init() internal onlyInitializing {
        __Ownable_init_unchained();
        __AccessControl_init_unchained();
        __MinterRole_init_unchained();
    }

    // solhint-disable-next-line func-name-mixedcase
    function __MinterRole_init_unchained() internal onlyInitializing {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function transferOwnership(address newOwner) public virtual override onlyOwner {
        super.transferOwnership(newOwner);
        _setupRole(DEFAULT_ADMIN_ROLE, newOwner);
    }

    function isMinter(address account) public view returns (bool) {
        return hasRole(MINTER_ROLE, account);
    }

    function addMinter(address account) public onlyOwner {
        _addMinter(account);
    }

    function addMinters(address[] memory accounts) public onlyOwner {
        for (uint256 index = 0; index < accounts.length; index++) {
            _addMinter(accounts[index]);
        }
    }

    function removeMinter(address account) public onlyOwner {
        _removeMinter(account);
    }

    function removeMinters(address[] memory accounts) public onlyOwner {
        for (uint256 index = 0; index < accounts.length; index++) {
            _removeMinter(accounts[index]);
        }
    }

    function renounceMinter() public {
        renounceRole(MINTER_ROLE, _msgSender());
    }

    /**
     * Renounce minter account with funds' forwarding
     */
    function closeMinter(address payable receiver) external payable onlyMinter {
        require(receiver != address(0x0), '55');

        renounceMinter();
        receiver.transfer(msg.value);
    }

    /**
     * Replace minter account by new account with funds' forwarding
     */
    function rotateMinter(address payable receiver) external payable onlyMinter {
        require(receiver != address(0x0), '55');

        _addMinter(receiver);
        renounceMinter();
        receiver.transfer(msg.value);
    }

    function _addMinter(address account) internal {
        _setupRole(MINTER_ROLE, account);
    }

    function _removeMinter(address account) internal {
        revokeRole(MINTER_ROLE, account);
    }
}
