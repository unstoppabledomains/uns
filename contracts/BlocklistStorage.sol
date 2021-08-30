// @author Unstoppable Domains, Inc.
// @date August 30th, 2021

pragma solidity ^0.8.0;

abstract contract BlocklistStorage {
    event Blocked(uint256 tokenId);

    mapping(uint256 => bool) private _blocklist;

    modifier onlyAllowed(uint256 tokenId) {
        require(isBlocked(tokenId) == false, 'BlocklistStorage: TOKEN_NOT_ALLOWED');
        _;
    }

    function isBlocked(uint256 tokenId) public view returns (bool) {
        return _blocklist[tokenId];
    }

    function areBlocked(uint256[] calldata tokenIds) public view returns (bool[] memory values) {
        values = new bool[](tokenIds.length);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            values[i] = isBlocked(tokenIds[i]);
        }
    }

    function _block(uint256 tokenId) internal {
        _blocklist[tokenId] = true;
        emit Blocked(tokenId);
    }

    function _blockAll(uint256[] calldata tokenIds) internal {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _block(tokenIds[i]);
        }
    }
}
