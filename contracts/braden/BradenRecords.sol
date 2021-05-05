// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// 262787 executeBatch - 5000 without the owned presets
// 248105 for a bespoke function.
abstract contract BradenRecords is ERC721 {
    event KeyRegistered(uint256 indexed keyId, string key);

    event NewTokenPreset(uint256 indexed presetId, uint256 indexed tokenId);
    event NewOwnedPreset(uint256 indexed presetId, address indexed owner);
    event PresetChanged(
        uint256 indexed presetId,
        uint256[] keyIds,
        string[] values
    );
    event PresetUsed(uint256 indexed presetId, uint256 indexed tokenId);

    struct PresetInfo {
        bool owned;
        address owner;
        uint256 token;
    }

    /// @dev mapping of keyIds to keys
    mapping(uint256 => string) internal _keys;

    /// @dev mapping of presetIds to keyIds to values
    mapping(uint256 => mapping(uint256 => string)) internal _presets;

    /// @dev mapping of tokenIds to presetIds
    mapping(uint256 => uint256) internal _tokenPresets;

    // NOTE(bradenp): there are two additional costs to having the two types of presets:
    //   1. initialization cost in newOwnedPreset/newTokenPreset b/c of the require read.
    //   2. an aditional cost when transfering to wipe owned presets.

    /// @dev mapping of presetId to preset owners
    mapping(uint256 => address) _presetOwners;

    /// @dev mapping of presetId to preset tokens
    mapping(uint256 => uint256) _presetTokens;

    function presetOf(uint256 tokenId) external view returns (uint256) {
        return _tokenPresets[tokenId];
    }

    function presetInfo(uint256 presetId)
        external
        view
        returns (address presetOwner, uint256 presetToken)
    {
        return (_presetOwners[presetId], _presetTokens[presetId]);
    }

    function newOwnedPreset(uint256 presetId, address owner) external {
        require(
            _presetOwners[presetId] == address(0) &&
                _presetTokens[presetId] == 0,
            "preset already exists"
        );

        _presetOwners[presetId] = owner;

        emit NewOwnedPreset(presetId, owner);
    }

    function setOwnedPreset(
        uint256 presetId,
        uint256[] calldata keyIds,
        string[] calldata values
    ) external {
        require(
            _isPresetOwner(_msgSender(), presetId),
            "caller is not preset owner"
        );

        _setPreset(presetId, keyIds, values);
    }

    function useOwnedPreset(uint256 tokenId, uint256 presetId) external {
        address sender = _msgSender();
        require(
            _isApprovedOrOwner(sender, tokenId),
            "caller is not token owner nor approved"
        );

        require(_isPresetOwner(sender, presetId), "caller is not preset owner");

        _usePreset(tokenId, presetId);
    }

    function newTokenPreset(uint256 presetId, uint256 tokenId) external {
        require(
            _presetOwners[presetId] == address(0) &&
                _presetTokens[presetId] == 0,
            "preset already exists"
        );

        _presetTokens[presetId] = tokenId;

        emit NewTokenPreset(presetId, tokenId);
    }

    function setTokenPreset(
        uint256 presetId,
        uint256[] calldata keyIds,
        string[] calldata values
    ) external {
        uint256 presetToken = _presetTokens[presetId];

        require(presetToken != 0, "preset isn't owned");

        require(
            _isApprovedOrOwner(_msgSender(), presetToken),
            "invalid preset token owner"
        );

        _setPreset(presetId, keyIds, values);
    }

    function useTokenPreset(uint256 tokenId, uint256 presetId) external {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "caller is not token owner nor approved"
        );

        require(
            _presetTokens[presetId] == tokenId,
            "caller is not preset owner"
        );

        _usePreset(tokenId, presetId);
    }

    function _isPresetOwner(address sender, uint256 presetId)
        internal
        view
        returns (bool)
    {
        address presetOwner = _presetOwners[presetId];

        return
            presetOwner != address(0) &&
            (sender == presetOwner || isApprovedForAll(presetOwner, sender));
    }

    function _setPreset(
        uint256 presetId,
        uint256[] calldata keyIds,
        string[] calldata values
    ) internal {
        require(keyIds.length == values.length, "invalid number of keys");

        for (uint256 index = 0; index < keyIds.length; index++) {
            _presets[presetId][keyIds[index]] = values[index];
        }

        emit PresetChanged(presetId, keyIds, values);
    }

    function _usePreset(uint256 tokenId, uint256 presetId) internal {
        _tokenPresets[tokenId] = presetId;

        emit PresetUsed(presetId, tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);

        // if the preset owner isn't the token delete the records.
        if (_presetOwners[_tokenPresets[tokenId]] != address(0)) {
            delete _tokenPresets[tokenId];
        }
    }

    function get(uint256 tokenId, uint256 keyId)
        external
        view
        returns (string memory value)
    {
        return _presets[_tokenPresets[tokenId]][keyId];
    }

    function getMany(uint256 tokenId, uint256[] calldata keyIds)
        external
        view
        returns (string[] memory values)
    {
        values = new string[](keyIds.length);
        for (uint256 index = 0; index < keyIds.length; index++) {
            values[index] = _presets[_tokenPresets[tokenId]][keyIds[index]];
        }
    }

    function getFromPreset(uint256 presetId, uint256 keyId)
        external
        view
        returns (string memory value)
    {
        return _presets[presetId][keyId];
    }

    function getManyFromPreset(uint256 presetId, uint256[] calldata keyIds)
        external
        view
        returns (string[] memory values)
    {
        values = new string[](keyIds.length);
        for (uint256 index = 0; index < keyIds.length; index++) {
            values[index] = _presets[presetId][keyIds[index]];
        }
    }

    function registerKey(string calldata key) external {
        uint256 keyId = uint256(keccak256(bytes(key)));
        _keys[keyId] = key;

        emit KeyRegistered(keyId, key);
    }

    function getKeyRegistration(uint256 keyId)
        external
        view
        returns (string memory)
    {
        return _keys[keyId];
    }
}
