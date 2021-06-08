// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './IRecordStorage.sol';
import './KeyStorage.sol';

abstract contract RecordStorage is KeyStorage, IRecordStorage {
    // Mapping from token ID to preset id to key to value
    mapping (uint256 => mapping (uint256 =>  mapping (uint256 => string))) internal _records;

    // Mapping from token ID to current preset id
    mapping (uint256 => uint256) internal _presets;

    function get(string calldata key, uint256 tokenId) public view override returns (string memory value) {
        value = _get(key, tokenId);
    }

    function getMany(
        string[] calldata keys,
        uint256 tokenId
    ) public view override returns (string[] memory values) {
        uint256 keyCount = keys.length;
        values = new string[](keyCount);
        for (uint256 i = 0; i < keyCount; i++) {
            values[i] = _get(keys[i], tokenId);
        }
    }

    function getByHash(
        uint256 keyHash,
        uint256 tokenId
    ) public view override returns (string memory key, string memory value) {
        key = getKey(keyHash);
        value = _get(keyHash, tokenId);
    }

    function getManyByHash(
        uint256[] calldata keyHashes,
        uint256 tokenId
    ) public view override returns (string[] memory keys, string[] memory values) {
        uint256 keyCount = keyHashes.length;
        keys = new string[](keyCount);
        values = new string[](keyCount);
        for (uint256 i = 0; i < keyCount; i++) {
            (keys[i], values[i]) = getByHash(keyHashes[i], tokenId);
        }
    }

    function addKey(string memory key) public {
        uint256 keyHash = uint256(keccak256(abi.encodePacked(key)));
        require(!_existsKey(keyHash), 'RecordStorage: KEY_EXIST');

        _addKey(keyHash, key);
    }

    function _set(string calldata key, string calldata value, uint256 tokenId) internal {
        uint256 keyHash = uint256(keccak256(abi.encodePacked(key)));
        _records[tokenId][_presets[tokenId]][keyHash] = value;

        if (!_existsKey(keyHash)) {
            _addKey(keyHash, key);
        }
        emit Set(tokenId, key, value, key, value);
    }

    function _setMany(string[] calldata keys, string[] calldata values, uint256 tokenId) internal {
        uint256 keyCount = keys.length;
        for (uint256 i = 0; i < keyCount; i++) {
            _set(keys[i], values[i], tokenId);
        }
    }

    function _setByHash(uint256 keyHash, string calldata value, uint256 tokenId) internal {
        require(_existsKey(keyHash), 'RecordStorage: KEY_NOT_FOUND');

        _records[tokenId][_presets[tokenId]][keyHash] = value;

        string memory key = getKey(keyHash);
        emit Set(tokenId, key, value, key, value);
    }

    function _setManyByHash(uint256[] calldata keyHashes, string[] calldata values, uint256 tokenId) internal {
        uint256 keyCount = keyHashes.length;
        for (uint256 i = 0; i < keyCount; i++) {
            _setByHash(keyHashes[i], values[i], tokenId);
        }
    }

    function _reconfigure(string[] calldata keys, string[] calldata values, uint256 tokenId) internal {
        _reset(tokenId);
        _setMany(keys, values, tokenId);
    }

    function _reset(uint256 tokenId) internal {
        _presets[tokenId] = block.timestamp;
        emit ResetRecords(tokenId);
    }

    function _get(string memory key, uint256 tokenId) private view returns (string memory) {
        return _get(uint256(keccak256(abi.encodePacked(key))), tokenId);
    }

    function _get(uint256 keyHash, uint256 tokenId) private view returns (string memory) {
        return _records[tokenId][_presets[tokenId]][keyHash];
    }
}
