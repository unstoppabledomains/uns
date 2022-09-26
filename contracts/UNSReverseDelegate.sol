pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol';

import './IReverseRegistry.sol';

contract UNSReverseDelegate is ERC721Upgradeable, IReverseRegistry {
    // offset in order to sync storage layout with UNSRegistry
    uint256[158] private __offset;

    mapping(address => uint256) internal _reverses;

    /**
     * @dev See {IReverseRegistry-setReverse}.
     */
    function setReverse(uint256 tokenId) external override {
        require(ownerOf(tokenId) == _msgSender(), 'Registry: SENDER_IS_NOT_OWNER');
        _setReverse(_msgSender(), tokenId);
    }

    /**
     * @dev See {IReverseRegistry-removeReverse}.
     */
    function removeReverse() external override {
        address sender = _msgSender();
        require(_reverses[sender] != 0, 'Registry: REVERSE_RECORD_IS_EMPTY');
        _removeReverse(sender);
    }

    /**
     * @dev See {IReverseRegistry-reverseOf}.
     */
    function reverseOf(address addr) external view override returns (uint256 reverse) {
        reverse = _reverses[addr];
    }

    /// Internal

    function _setReverse(address addr, uint256 tokenId) internal {
        _reverses[addr] = tokenId;
        emit SetReverse(addr, tokenId);
    }

    function _removeReverse(address addr) internal {
        delete _reverses[addr];
        emit RemoveReverse(addr);
    }
}
