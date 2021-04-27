// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import '@openzeppelin/contracts/utils/introspection/ERC165Storage.sol';
import "@openzeppelin/contracts/utils/Address.sol";

import "./IRegistry.sol";
import './IResolverReader.sol';
import "./roles/ControllerRole.sol";

/**
 * @title Registry
 * @dev An ERC721 Token see https://eips.ethereum.org/EIPS/eip-721. With
 * additional functions so other trusted contracts to interact with the tokens.
 */
contract Registry is IRegistry, IResolverReader, ControllerRole, ERC721Burnable, ERC165Storage {
    using Address for address;

    // Optional mapping for token URIs
    mapping(uint256 => string) internal _tokenURIs;

    string internal _prefix;

    // Mapping from token ID to preset id to key to value
    mapping (uint256 => mapping (uint256 =>  mapping (string => string))) internal _records;

    // Mapping from token ID to current preset id
    mapping (uint256 => uint256) _tokenPresets;

    // All keys that were set
    mapping (uint256 => string) _hashedKeys;

    // uint256(keccak256(abi.encodePacked(uint256(0x0), keccak256(abi.encodePacked("crypto")))))
    uint256 private constant _CRYPTO_HASH =
        0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f;

    modifier onlyApprovedOrOwner(uint256 tokenId) {
        require(_isApprovedOrOwner(_msgSender(), tokenId), 'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
        _;
    }

    constructor() ERC721(".crypto", "UD") {
        _mint(address(0xdead), _CRYPTO_HASH);
        // register the supported interfaces to conform to ERC721 via ERC165
        _registerInterface(0x5b5e139f); // ERC721 Metadata Interface
        _tokenURIs[root()] = "crypto";
        emit NewURI(root(), "crypto");
    }

    /// ERC721 Metadata extension

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, IERC721Metadata) returns (string memory) {
        require(_exists(tokenId));
        return string(abi.encodePacked(_prefix, _tokenURIs[tokenId]));
    }

    function controlledSetTokenURIPrefix(string calldata prefix) external override onlyController {
        _prefix = prefix;
        emit NewURIPrefix(prefix);
    }

    /// Ownership

    function isApprovedOrOwner(address spender, uint256 tokenId) external view override returns (bool) {
        return _isApprovedOrOwner(spender, tokenId);
    }

    /// Registry Constants

    function root() public pure returns (uint256) {
        return _CRYPTO_HASH;
    }

    function childIdOf(uint256 tokenId, string calldata label) external pure override returns (uint256) {
        return _childId(tokenId, label);
    }

    /// Minting

    function mintChild(address to, uint256 tokenId, string calldata label) external override onlyApprovedOrOwner(tokenId) {
        _mintChild(to, tokenId, label);
    }

    function controlledMintChild(address to, uint256 tokenId, string calldata label) external override onlyController {
        _mintChild(to, tokenId, label);
    }

    function safeMintChild(address to, uint256 tokenId, string calldata label) external onlyApprovedOrOwner(tokenId) {
        _safeMintChild(to, tokenId, label, "");
    }

    function safeMintChild(address to, uint256 tokenId, string calldata label, bytes calldata _data)
        external
        onlyApprovedOrOwner(tokenId)
    {
        _safeMintChild(to, tokenId, label, _data);
    }

    function controlledSafeMintChild(address to, uint256 tokenId, string calldata label, bytes calldata _data)
        external
        onlyController
    {
        _safeMintChild(to, tokenId, label, _data);
    }

    /// Transfering

    function setOwner(address to, uint256 tokenId) external override onlyApprovedOrOwner(tokenId)  {
        super._transfer(ownerOf(tokenId), to, tokenId);
    }

    function transferFromChild(address from, address to, uint256 tokenId, string calldata label)
        external override
        onlyApprovedOrOwner(tokenId)
    {
        _transfer(from, to, _childId(tokenId, label));
    }

    function controlledTransferFrom(address from, address to, uint256 tokenId) external override onlyController {
        _transfer(from, to, tokenId);
    }

    function safeTransferFromChild(
        address from,
        address to,
        uint256 tokenId,
        string memory label,
        bytes memory _data
    ) public override onlyApprovedOrOwner(tokenId) {
        uint256 childId = _childId(tokenId, label);
        _safeTransfer(from, to, childId, _data);
    }

    function safeTransferFromChild(address from, address to, uint256 tokenId, string calldata label) external override {
        safeTransferFromChild(from, to, tokenId, label, "");
    }

    function controlledSafeTransferFrom(address from, address to, uint256 tokenId, bytes calldata _data)
        external override
        onlyController
    {
        _safeTransfer(from, to, tokenId, _data);
    }

    /// Burning

    function burnChild(uint256 tokenId, string calldata label) external override onlyApprovedOrOwner(tokenId) {
        _burn(_childId(tokenId, label));
    }

    function controlledBurn(uint256 tokenId) external override onlyController {
        _burn(tokenId);
    }

    /// Resolution

    function reset(uint256 tokenId) external override onlyApprovedOrOwner(tokenId) {
        _setPreset(block.timestamp, tokenId);
    }

    function get(string memory key, uint256 tokenId) public view override returns (string memory) {
        return _records[tokenId][_tokenPresets[tokenId]][key];
    }

    function hashToKey(uint256 keyHash) public view returns (string memory) {
        return _hashedKeys[keyHash];
    }

    function hashesToKeys(uint256[] memory hashes) public view returns (string[] memory) {
        uint256 keyCount = hashes.length;
        string[] memory values = new string[](keyCount);
        for (uint256 i = 0; i < keyCount; i++) {
            values[i] = hashToKey(hashes[i]);
        }

        return values;
    }

    function getByHash(uint256 keyHash, uint256 tokenId) public view override returns (string memory key, string memory value) {
        key = hashToKey(keyHash);
        value = get(key, tokenId);
    }

    function getManyByHash(
        uint256[] memory keyHashes,
        uint256 tokenId
    ) public view override returns (string[] memory keys, string[] memory values) {
        uint256 keyCount = keyHashes.length;
        keys = new string[](keyCount);
        values = new string[](keyCount);
        for (uint256 i = 0; i < keyCount; i++) {
            (keys[i], values[i]) = getByHash(keyHashes[i], tokenId);
        }
    }

    function preconfigure(
        string[] memory keys,
        string[] memory values,
        uint256 tokenId
    ) public override onlyController {
        _setMany(_tokenPresets[tokenId], keys, values, tokenId);
    }

    function set(string calldata key, string calldata value, uint256 tokenId) external override onlyApprovedOrOwner(tokenId) {
        _set(_tokenPresets[tokenId], key, value, tokenId);
    }

    function getMany(string[] calldata keys, uint256 tokenId) external view override returns (string[] memory) {
        uint256 keyCount = keys.length;
        string[] memory values = new string[](keyCount);
        uint256 preset = _tokenPresets[tokenId];
        for (uint256 i = 0; i < keyCount; i++) {
            values[i] = _records[tokenId][preset][keys[i]];
        }
        return values;
    }

    function setMany(
        string[] memory keys,
        string[] memory values,
        uint256 tokenId
    ) public override onlyApprovedOrOwner(tokenId) {
        _setMany(_tokenPresets[tokenId], keys, values, tokenId);
    }

    function reconfigure(string[] memory keys, string[] memory values, uint256 tokenId) public override onlyApprovedOrOwner(tokenId) {
        _reconfigure(keys, values, tokenId);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(AccessControl, ERC721, IERC165, ERC165Storage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /// Internal

    function _childId(uint256 tokenId, string memory label) internal pure returns (uint256) {
        require(bytes(label).length != 0);
        return uint256(keccak256(abi.encodePacked(tokenId, keccak256(abi.encodePacked(label)))));
    }

    function _mintChild(address to, uint256 tokenId, string memory label) internal {
        uint256 childId = _childId(tokenId, label);
        _mint(to, childId);

        _afterMintChild(childId, tokenId, label);
    }

    function _safeMintChild(address to, uint256 tokenId, string memory label, bytes memory _data) internal {
        uint256 childId = _childId(tokenId, label);
        _safeMint(to, childId, _data);

        _afterMintChild(childId, tokenId, label);
    }

    function _afterMintChild(uint256 childId, uint256 tokenId, string memory label) internal {
        require(bytes(label).length != 0);
        require(_exists(childId));

        bytes memory domain = abi.encodePacked(label, ".", _tokenURIs[tokenId]);

        _tokenURIs[childId] = string(domain);
        emit NewURI(childId, string(domain));
    }

    function _burn(uint256 tokenId) internal override {
        super._burn(tokenId);
        // Clear metadata (if any)
        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }

    function _setPreset(uint256 presetId, uint256 tokenId) internal {
        _tokenPresets[tokenId] = presetId;
        emit Sync(_msgSender(), 0, tokenId);
        emit ResetRecords(tokenId);
    }

    function _set(uint256 preset, string memory key, string memory value, uint256 tokenId) internal {
        uint256 keyHash = uint256(keccak256(bytes(key)));
        bool isNewKey = bytes(_records[tokenId][preset][key]).length == 0;
        emit Sync(_msgSender(), keyHash, tokenId);
        _records[tokenId][preset][key] = value;

        if (bytes(_hashedKeys[keyHash]).length == 0) {
            _hashedKeys[keyHash] = key;
        }

        if (isNewKey) {
            emit NewKey(tokenId, key, key);
        }
        emit Set(tokenId, key, value, key, value);
    }

    function _setMany(uint256 preset, string[] memory keys, string[] memory values, uint256 tokenId) internal {
        uint256 keyCount = keys.length;
        for (uint256 i = 0; i < keyCount; i++) {
            _set(preset, keys[i], values[i], tokenId);
        }
    }

    function _reconfigure(string[] memory keys, string[] memory values, uint256 tokenId) internal {
        _setPreset(block.timestamp, tokenId);
        _setMany(_tokenPresets[tokenId], keys, values, tokenId);
    }
}
