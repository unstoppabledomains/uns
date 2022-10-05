// @author Unstoppable Domains, Inc.
// @date August 30th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol';

import './../libraries/Errors.sol';

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
     */
    event BlocklistDisabled(address account);

    /**
     * @dev Emitted when the blocklist enabled by `account`.
     */
    event BlocklistEnabled(address account);

    // This is the keccak-256 hash of "uns.blocklist." subtracted by 1
    bytes32 internal constant _BLOCKLIST_PREFIX_SLOT = 0x1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69;

    // This is the keccak-256 hash of "uns.blocklist.disabled" subtracted by 1
    bytes32 internal constant _BLOCKLIST_DISABLED_SLOT = 0xa85b8425a460dd344a297bd4a82e287385f0fc558cb3e78867b0489f43df2470;

    /**
     * @dev Initializes the blocklist in enabled state.
     */
    // solhint-disable-next-line func-name-mixedcase
    function __Blocklist_init() internal onlyInitializing {
        __Context_init_unchained();
        __Blocklist_init_unchained();
    }

    // solhint-disable-next-line func-name-mixedcase
    function __Blocklist_init_unchained() internal onlyInitializing {
        StorageSlotUpgradeable.getBooleanSlot(_BLOCKLIST_DISABLED_SLOT).value = false;
    }

    function isBlocklistDisabled() public view returns (bool) {
        return StorageSlotUpgradeable.getBooleanSlot(_BLOCKLIST_DISABLED_SLOT).value;
    }

    function isBlocked(uint256 tokenId) public view returns (bool) {
        return
            !isBlocklistDisabled() &&
            StorageSlotUpgradeable.getBooleanSlot(keccak256(abi.encodePacked(_BLOCKLIST_PREFIX_SLOT, tokenId))).value;
    }

    function areBlocked(uint256[] calldata tokenIds) public view returns (bool[] memory values) {
        values = new bool[](tokenIds.length);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            values[i] = isBlocked(tokenIds[i]);
        }
    }

    /**
     * @dev Modifier to make a function callable only when the blocklist is enabled.
     *
     * Requirements:
     *
     * - The blocklist must be enabled.
     */
    modifier whenEnabled() {
        require(!isBlocklistDisabled(), Errors.BL_DISABLED);
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the blocklist is disabled.
     *
     * Requirements:
     *
     * - The blocklist must be disabled.
     */
    modifier whenDisabled() {
        require(isBlocklistDisabled(), Errors.BL_ENABLED);
        _;
    }

    function _block(uint256 tokenId) internal whenEnabled {
        StorageSlotUpgradeable.getBooleanSlot(keccak256(abi.encodePacked(_BLOCKLIST_PREFIX_SLOT, tokenId))).value = true;
        emit Blocked(tokenId);
    }

    function _blockAll(uint256[] calldata tokenIds) internal {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _block(tokenIds[i]);
        }
    }

    function _disableBlocklist() internal whenEnabled {
        StorageSlotUpgradeable.getBooleanSlot(_BLOCKLIST_DISABLED_SLOT).value = true;
        emit BlocklistDisabled(_msgSender());
    }

    function _enableBlocklist() internal whenDisabled {
        StorageSlotUpgradeable.getBooleanSlot(_BLOCKLIST_DISABLED_SLOT).value = false;
        emit BlocklistEnabled(_msgSender());
    }
}
