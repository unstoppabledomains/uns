// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

abstract contract KeyStorage {
    event NewKey(string indexed keyIndex, string key);

    mapping (uint256 => string) private _keys;

    function getKey(uint256 keyHash) public view returns (string memory) {
        return _keys[keyHash];
    }

    function getKeys(uint256[] calldata hashes) public view returns (string[] memory values) {
        values = new string[](hashes.length);
        for (uint256 i = 0; i < hashes.length; i++) {
            values[i] = getKey(hashes[i]);
        }
    }

    function _existsKey(uint256 keyHash) internal view returns(bool) {
        return bytes(_keys[keyHash]).length > 0;
    }

    function _addKey(uint256 keyHash, string memory key) internal {
        _keys[keyHash] = key;
        emit NewKey(key, key);
    }
}
