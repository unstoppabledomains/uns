// @author Unstoppable Domains, Inc.
// @date December 20th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol';

import './IRootRegistry.sol';
import './@maticnetwork/IRootChainManager.sol';
import './@maticnetwork/RootChainManagerStorage.sol';
import './libraries/Errors.sol';

abstract contract RootRegistry is ERC721Upgradeable, IRootRegistry {
    // This is the keccak-256 hash of "uns.polygon.root_chain_manager" subtracted by 1
    bytes32 internal constant _ROOT_CHAIN_MANAGER_SLOT = 0xbe2bb46ac0377341a1ec5c3116d70fd5029d704bd46292e58f6265dd177ebafe;

    modifier onlyPredicate() {
        require(_msgSender() == _getPredicate(), Errors.RE_INSUFFICIENT_PERMISSIONS);
        _;
    }

    function setRootChainManager(address rootChainManager) external override {
        require(
            StorageSlotUpgradeable.getAddressSlot(_ROOT_CHAIN_MANAGER_SLOT).value == address(0),
            Errors.RE_ROOT_CHAIN_MANEGER_NOT_EMPTY
        );
        StorageSlotUpgradeable.getAddressSlot(_ROOT_CHAIN_MANAGER_SLOT).value = rootChainManager;
    }

    function _deposit(address to, uint256 tokenId) internal {
        address predicate = _getPredicate();
        _approve(predicate, tokenId);

        address manager = StorageSlotUpgradeable.getAddressSlot(_ROOT_CHAIN_MANAGER_SLOT).value;
        IRootChainManager(manager).depositFor(to, address(this), abi.encode(tokenId));
    }

    function _withdraw(bytes calldata inputData) internal {
        address manager = StorageSlotUpgradeable.getAddressSlot(_ROOT_CHAIN_MANAGER_SLOT).value;
        IRootChainManager(manager).exit(inputData);
    }

    function _getPredicate() internal view returns (address predicate) {
        address manager = StorageSlotUpgradeable.getAddressSlot(_ROOT_CHAIN_MANAGER_SLOT).value;
        bytes32 tokenType = RootChainManagerStorage(manager).tokenToType(address(this));
        predicate = RootChainManagerStorage(manager).typeToPredicate(tokenType);
    }
}
