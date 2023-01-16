// @author Unstoppable Domains, Inc.
// @date August 30th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol';

/**
 * @dev Mechanism blocks tokens' minting
 */
abstract contract Blocklist is Initializable, ContextUpgradeable {
    /**
     * @dev Emitted when the `tokenId` added to blocklist.
     */
    event Blocked(uint256 tokenId);

    /**
     * @dev Emitted when the blocklist disabled by `account`.
     * @custom:deprecated Blocklist is now always enabled.
     */
    event BlocklistDisabled(address account);

    /**
     * @dev Emitted when the blocklist enabled by `account`.
     * @deprecated Blocklist is now always enabled.
     */
    event BlocklistEnabled(address account);

    // This is the keccak-256 hash of "uns.blocklist." subtracted by 1
    bytes32 internal constant _BLOCKLIST_PREFIX_SLOT = 0x1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69;

    /**
     * @dev Initializes the blocklist in enabled state.
     */
    // solhint-disable-next-line func-name-mixedcase
    function __Blocklist_init() internal onlyInitializing {
        __Blocklist_init_unchained();
    }

    // solhint-disable-next-line func-name-mixedcase
    function __Blocklist_init_unchained() internal onlyInitializing {}

    function isBlocked(uint256 tokenId) public view returns (bool) {
        return StorageSlotUpgradeable.getBooleanSlot(keccak256(abi.encodePacked(_BLOCKLIST_PREFIX_SLOT, tokenId))).value;
    }

    function _block(uint256 tokenId) internal {
        StorageSlotUpgradeable.getBooleanSlot(keccak256(abi.encodePacked(_BLOCKLIST_PREFIX_SLOT, tokenId))).value = true;
        emit Blocked(tokenId);
    }
}
