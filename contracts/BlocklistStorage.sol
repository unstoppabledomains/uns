// @author Unstoppable Domains, Inc.
// @date August 30th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol';

import './IBlocklistStorage.sol';

/**
 * @dev Mechanism blocks tokens' minting
 */
abstract contract BlocklistStorage is IBlocklistStorage {
    // This is the keccak-256 hash of "uns.blocklist." subtracted by 1
    bytes32 internal constant _BLOCKLIST_SLOT_PREFIX = 0x1ec047073e2c8b15660901dbfdb6e3ff6365bd699dd9f95dcc6eab5448bebd69;

    function isBlocked(uint256 tokenId) public override view returns (bool) {
        return StorageSlotUpgradeable.getBooleanSlot(keccak256(abi.encodePacked(_BLOCKLIST_SLOT_PREFIX, tokenId))).value;
    }

    function areBlocked(uint256[] calldata tokenIds) public override view returns (bool[] memory values) {
        values = new bool[](tokenIds.length);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            values[i] = isBlocked(tokenIds[i]);
        }
    }

    function _block(uint256 tokenId) internal {
        StorageSlotUpgradeable.getBooleanSlot(keccak256(abi.encodePacked(_BLOCKLIST_SLOT_PREFIX, tokenId))).value = true;
        emit Blocked(tokenId);
    }

    function _blockAll(uint256[] calldata tokenIds) internal {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _block(tokenIds[i]);
        }
    }
}
