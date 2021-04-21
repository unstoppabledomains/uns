pragma solidity 0.5.12;
pragma experimental ABIEncoderV2;

import './Registry.sol';
import './util/SignatureUtil.sol';
import './controllers/MintingController.sol';
import './IResolver.sol';
import './IResolverReader.sol';
// solium-disable error-reason

contract Resolver is IResolverReader, SignatureUtil, IResolver {

    event Set(uint256 indexed tokenId, string indexed keyIndex, string indexed valueIndex, string key, string value);
    event NewKey(uint256 indexed tokenId, string indexed keyIndex, string key);
    event ResetRecords(uint256 indexed tokenId);

    // Mapping from token ID to preset id to key to value
    mapping (uint256 => mapping (uint256 =>  mapping (string => string))) internal _records;

    // Mapping from token ID to current preset id
    mapping (uint256 => uint256) _tokenPresets;

    // All keys that were set
    mapping (uint256 => string) _hashedKeys;

    MintingController internal _mintingController;

    constructor(Registry registry, MintingController mintingController) public SignatureUtil(registry) {
        require(address(registry) == mintingController.registry());
        _mintingController = mintingController;
    }

    /**
     * @dev Throws if called when not the resolver.
     */
    modifier whenResolver(uint256 tokenId) {
        require(address(this) == _registry.resolverOf(tokenId), "RESOLVER_DETACHED_FROM_DOMAIN");
        _;
    }

    modifier whenApprovedOrOwner(uint256 tokenId) {
        require(_registry.isApprovedOrOwner(msg.sender, tokenId), "SENDER_IS_NOT_APPROVED_OR_OWNER");
        _;
    }

    function reset(uint256 tokenId) external whenApprovedOrOwner(tokenId) {
        _setPreset(now, tokenId);
    }

    function resetFor(uint256 tokenId, bytes calldata signature) external {
        _validate(keccak256(abi.encodeWithSelector(this.reset.selector, tokenId)), tokenId, signature);
        _setPreset(now, tokenId);
    }

    /**
     * @dev Function to get record.
     * @param key The key to query the value of.
     * @param tokenId The token id to fetch.
     * @return The value string.
     */
    function get(string memory key, uint256 tokenId) public view whenResolver(tokenId) returns (string memory) {
        return _records[tokenId][_tokenPresets[tokenId]][key];
    }

    /**
     * @dev Function to get key by provided hash. Keys hashes can be found in Sync event emitted by Registry.sol contract.
     * @param keyHash The key to query the value of.
     * @return The key string.
     */
    function hashToKey(uint256 keyHash) public view returns (string memory) {
        return _hashedKeys[keyHash];
    }

    /**
     * @dev Function to get keys by provided key hashes. Keys hashes can be found in Sync event emitted by Registry.sol contract.
     * @param hashes The key to query the value of.
     * @return Keys
     */
    function hashesToKeys(uint256[] memory hashes) public view returns (string[] memory) {
        uint256 keyCount = hashes.length;
        string[] memory values = new string[](keyCount);
        for (uint256 i = 0; i < keyCount; i++) {
            values[i] = hashToKey(hashes[i]);
        }

        return values;
    }

    /**
     * @dev Function get value by provied key hash. Keys hashes can be found in Sync event emitted by Registry.sol contract.
     * @param keyHash The key to query the value of.
     * @param tokenId The token id to set.
     * @return Key and value.
     */
    function getByHash(uint256 keyHash, uint256 tokenId) public view whenResolver(tokenId) returns (string memory key, string memory value) {
        key = hashToKey(keyHash);
        value = get(key, tokenId);
    }

    /**
     * @dev Function get values by provied key hashes. Keys hashes can be found in Sync event emitted by Registry.sol contract.
     * @param keyHashes The key to query the value of.
     * @param tokenId The token id to set.
     * @return Keys and values.
     */
    function getManyByHash(
        uint256[] memory keyHashes,
        uint256 tokenId
    ) public view whenResolver(tokenId) returns (string[] memory keys, string[] memory values) {
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
    ) public {
        require(_mintingController.isMinter(msg.sender), "SENDER_IS_NOT_MINTER");
        _setMany(_tokenPresets[tokenId], keys, values, tokenId);
    }

    /**
     * @dev Function to set record.
     * @param key The key set the value of.
     * @param value The value to set key to.
     * @param tokenId The token id to set.
     */
    function set(string calldata key, string calldata value, uint256 tokenId) external whenApprovedOrOwner(tokenId) {
        _set(_tokenPresets[tokenId], key, value, tokenId);
    }

    /**
     * @dev Function to set record on behalf of an address.
     * @param key The key set the value of.
     * @param value The value to set key to.
     * @param tokenId The token id to set.
     * @param signature The signature to verify the transaction with.
     */
    function setFor(
        string calldata key,
        string calldata value,
        uint256 tokenId,
        bytes calldata signature
    ) external {
        _validate(keccak256(abi.encodeWithSelector(this.set.selector, key, value, tokenId)), tokenId, signature);
        _set(_tokenPresets[tokenId], key, value, tokenId);
    }

    /**
     * @dev Function to get multiple record.
     * @param keys The keys to query the value of.
     * @param tokenId The token id to fetch.
     * @return The values.
     */
    function getMany(string[] calldata keys, uint256 tokenId) external view whenResolver(tokenId) returns (string[] memory) {
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
    ) public whenApprovedOrOwner(tokenId) {
        _setMany(_tokenPresets[tokenId], keys, values, tokenId);
    }

    /**
     * @dev Function to set record on behalf of an address.
     * @param keys The keys set the values of.
     * @param values The values to set keys to.
     * @param tokenId The token id to set.
     * @param signature The signature to verify the transaction with.
     */
    function setManyFor(
        string[] memory keys,
        string[] memory values,
        uint256 tokenId,
        bytes memory signature
    ) public {
        _validate(keccak256(abi.encodeWithSelector(this.setMany.selector, keys, values, tokenId)), tokenId, signature);
        _setMany(_tokenPresets[tokenId], keys, values, tokenId);
    }

     /**
     * @dev Function to reset all domain records and set new ones.
     * @param keys records keys.
     * @param values records values.
     * @param tokenId domain token id.
     */
    function reconfigure(string[] memory keys, string[] memory values, uint256 tokenId) public whenApprovedOrOwner(tokenId) {
        _reconfigure(keys, values, tokenId);
    }

    /**
     * @dev Delegated version of reconfigure() function.
     * @param keys records keys.
     * @param values records values.
     * @param tokenId domain token id.
     * @param signature user signature.
     */
    function reconfigureFor(
        string[] memory keys,
        string[] memory values,
        uint256 tokenId,
        bytes memory signature
    ) public {
        _validate(keccak256(abi.encodeWithSelector(this.reconfigure.selector, keys, values, tokenId)), tokenId, signature);
        _reconfigure(keys, values, tokenId);
    }

    // reset records
    function _setPreset(uint256 presetId, uint256 tokenId) internal {
        _tokenPresets[tokenId] = presetId;
        _registry.sync(tokenId, 0); // notify registry that domain records were reset
        emit ResetRecords(tokenId);
    }

    /**
     * @dev Internal function to to set record. As opposed to set, this imposes no restrictions on msg.sender.
     * @param preset preset to set key/values on
     * @param key key of record to be set
     * @param value value of record to be set
     * @param tokenId uint256 ID of the token
     */
    function _set(uint256 preset, string memory key, string memory value, uint256 tokenId) internal {
        uint256 keyHash = uint256(keccak256(bytes(key)));
        bool isNewKey = bytes(_records[tokenId][preset][key]).length == 0;
        _registry.sync(tokenId, keyHash);
        _records[tokenId][preset][key] = value;

        if (bytes(_hashedKeys[keyHash]).length == 0) {
            _hashedKeys[keyHash] = key;
        }

        if (isNewKey) {
            emit NewKey(tokenId, key, key);
        }
        emit Set(tokenId, key, value, key, value);
    }

    /**
     * @dev Internal function to to set multiple records. As opposed to setMany, this imposes
     * no restrictions on msg.sender.
     * @param preset preset to set key/values on
     * @param keys keys of record to be set
     * @param values values of record to be set
     * @param tokenId uint256 ID of the token
     */
    function _setMany(uint256 preset, string[] memory keys, string[] memory values, uint256 tokenId) internal {
        uint256 keyCount = keys.length;
        for (uint256 i = 0; i < keyCount; i++) {
            _set(preset, keys[i], values[i], tokenId);
        }
    }

    /**
     * @dev Internal function to reset all domain records and set new ones.
     * @param keys records keys.
     * @param values records values.
     * @param tokenId domain token id.
     */
    function _reconfigure(string[] memory keys, string[] memory values, uint256 tokenId) internal {
        _setPreset(now, tokenId);
        _setMany(_tokenPresets[tokenId], keys, values, tokenId);
    }

}
