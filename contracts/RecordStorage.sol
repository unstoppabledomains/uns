// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import './IRecordStorage.sol';
import './KeyStorage.sol';

abstract contract RecordStorage is KeyStorage, IRecordStorage {
    /// @dev mapping of presetIds to keyIds to values
    mapping(uint256 => mapping(uint256 => string)) internal _records;

    /// @dev mapping of tokenIds to presetIds
    mapping(uint256 => uint256) internal _tokenPresets;

    function get(string calldata key, uint256 tokenId) external view override returns (string memory value) {
        value = _get(key, tokenId);
    }

    function getMany(string[] calldata keys, uint256 tokenId) external view override returns (string[] memory values) {
        values = new string[](keys.length);
        for (uint256 i = 0; i < keys.length; i++) {
            values[i] = _get(keys[i], tokenId);
        }
    }

    function getByHash(uint256 keyHash, uint256 tokenId)
        external
        view
        override
        returns (string memory key, string memory value)
    {
        (key, value) = _getByHash(keyHash, tokenId);
    }

    function getManyByHash(uint256[] calldata keyHashes, uint256 tokenId)
        external
        view
        override
        returns (string[] memory keys, string[] memory values)
    {
        keys = new string[](keyHashes.length);
        values = new string[](keyHashes.length);
        for (uint256 i = 0; i < keyHashes.length; i++) {
            (keys[i], values[i]) = _getByHash(keyHashes[i], tokenId);
        }
    }

    function _presetOf(uint256 tokenId) internal view virtual returns (uint256) {
        return _tokenPresets[tokenId] == 0 ? tokenId : _tokenPresets[tokenId];
    }

    function _set(
        string calldata key,
        string calldata value,
        uint256 tokenId
    ) internal {
        uint256 keyHash = uint256(keccak256(abi.encodePacked(key)));
        _addKey(keyHash, key);
        _set(keyHash, key, value, tokenId);
    }

    function _setMany(
        string[] calldata keys,
        string[] calldata values,
        uint256 tokenId
    ) internal {
        for (uint256 i = 0; i < keys.length; i++) {
            _set(keys[i], values[i], tokenId);
        }
    }

    function _setByHash(
        uint256 keyHash,
        string calldata value,
        uint256 tokenId
    ) internal {
        require(_existsKey(keyHash), 'RecordStorage: KEY_NOT_FOUND');
        _set(keyHash, getKey(keyHash), value, tokenId);
    }

    function _setManyByHash(
        uint256[] calldata keyHashes,
        string[] calldata values,
        uint256 tokenId
    ) internal {
        for (uint256 i = 0; i < keyHashes.length; i++) {
            _setByHash(keyHashes[i], values[i], tokenId);
        }
    }

    function _reconfigure(
        string[] calldata keys,
        string[] calldata values,
        uint256 tokenId
    ) internal {
        _reset(tokenId);
        _setMany(keys, values, tokenId);
    }

    function _reset(uint256 tokenId) internal {
        _tokenPresets[tokenId] = uint256(keccak256(abi.encodePacked(_presetOf(tokenId))));
        emit ResetRecords(tokenId);
    }

    function _get(string memory key, uint256 tokenId) private view returns (string memory) {
        return _get(uint256(keccak256(abi.encodePacked(key))), tokenId);
    }

    function _getByHash(uint256 keyHash, uint256 tokenId)
        private
        view
        returns (string memory key, string memory value)
    {
        key = getKey(keyHash);
        value = _get(keyHash, tokenId);
    }

    function _get(uint256 keyHash, uint256 tokenId) private view returns (string memory) {
        if(!_recordsReadAvailable(tokenId)) {
            return '';
        }

        return _records[_presetOf(tokenId)][keyHash];
    }

    function _set(
        uint256 keyHash,
        string memory key,
        string memory value,
        uint256 tokenId
    ) private {
        if (bytes(_records[_presetOf(tokenId)][keyHash]).length == 0) {
            emit NewKey(tokenId, key, key);
        }

        _records[_presetOf(tokenId)][keyHash] = value;

        emit Set(tokenId, key, value, key, value);
    }

    function _recordsReadAvailable(uint256 tokenId) internal virtual view returns (bool) {}
}
