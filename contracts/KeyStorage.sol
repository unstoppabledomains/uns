// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

abstract contract KeyStorage {
    mapping (uint256 => string) private _keys;

    function getKey(uint256 keyHash) public view virtual returns (string memory) {
        return _keys[keyHash];
    }

    function getKeys(uint256[] memory hashes) public view virtual returns (string[] memory values) {
        values = new string[](hashes.length);
        for (uint256 i = 0; i < hashes.length; i++) {
            values[i] = getKey(hashes[i]);
        }
    }

    function addKey(string memory key) internal virtual returns (uint256 keyHash) {
        keyHash = uint256(keccak256(bytes(key)));
        if (bytes(_keys[keyHash]).length == 0) {
            _keys[keyHash] = key;
        }
    }
}
