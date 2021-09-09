// @author Unstoppable Domains, Inc.
// @date August 30th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol';

/**
 * @dev Mechanism blocks tokens' minting
 */
abstract contract BlocklistStorage {
    /**
     * @dev Emitted when the `tokenId` added to blocklist.
     */
    event Blocked(uint256 tokenId);

    /**
     * @dev Emitted when the blocklist paused or resumed.
     */
    event BlocklistPaused(bool state);

    // This is the keccak-256 hash of "uns.blocklist." subtracted by 1
    bytes32 internal constant _BLOCKLIST_PREFIX_SLOT =
        0x1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69;

    // This is the keccak-256 hash of "uns.blocklist.paused" subtracted by 1
    bytes32 internal constant _BLOCKLIST_PAUSED_SLOT =
        0xa0dcf6b78c18ae45967a4073fd9dc39d22b4a768f709ae0d04de58f0a1de3c6b;

    function isBlocked(uint256 tokenId) public view returns (bool) {
        return
            !_isBlocklistPaused() &&
            StorageSlotUpgradeable.getBooleanSlot(keccak256(abi.encodePacked(_BLOCKLIST_PREFIX_SLOT, tokenId))).value;
    }

    function areBlocked(uint256[] calldata tokenIds) public view returns (bool[] memory values) {
        values = new bool[](tokenIds.length);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            values[i] = isBlocked(tokenIds[i]);
        }
    }

    function _block(uint256 tokenId) internal {
        require(!_isBlocklistPaused(), 'BlocklistStorage: PAUSED');
        StorageSlotUpgradeable
            .getBooleanSlot(keccak256(abi.encodePacked(_BLOCKLIST_PREFIX_SLOT, tokenId)))
            .value = true;
        emit Blocked(tokenId);
    }

    function _blockAll(uint256[] calldata tokenIds) internal {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _block(tokenIds[i]);
        }
    }

    function _isBlocklistPaused() internal view returns (bool) {
        return StorageSlotUpgradeable.getBooleanSlot(_BLOCKLIST_PAUSED_SLOT).value;
    }

    function _pauseBlocklist(bool state) internal {
        StorageSlotUpgradeable.getBooleanSlot(_BLOCKLIST_PAUSED_SLOT).value = state;
        emit BlocklistPaused(state);
    }
}
