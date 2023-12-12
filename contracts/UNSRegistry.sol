// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol';

import './ChildRegistry.sol';
import './cns/ICNSRegistry.sol';
import './IUNSRegistry.sol';
import './RecordStorage.sol';
import './RootRegistry.sol';
import './metatx/ERC2771RegistryContext.sol';
import './metatx/UNSRegistryForwarder.sol';
import './utils/Multicall.sol';

/**
 * @title UNSRegistry
 * @dev An ERC721 Token see https://eips.ethereum.org/EIPS/eip-721. With
 * additional functions so other trusted contracts to interact with the tokens.
 */
contract UNSRegistry is
    ERC721Upgradeable,
    ERC2771RegistryContext,
    RecordStorage,
    UNSRegistryForwarder,
    RootRegistry,
    ChildRegistry,
    Multicall,
    IUNSRegistry
{
    string public constant NAME = 'UNS: Registry';
    string public constant VERSION = '0.8.2';

    string internal _prefix;

    address internal _mintingManager;

    mapping(address => uint256) internal _reverses;

    mapping(address => bool) internal _proxyReaders;

    mapping(uint256 => bool) internal _upgradedTokens;

    mapping(uint256 => string) internal _tokenNames;

    modifier onlyApprovedOrOwner(uint256 tokenId) {
        require(_isApprovedOrOwner(_msgSender(), tokenId), 'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
        _;
    }

    modifier onlyMintingManager() {
        require(_msgSender() == _mintingManager, 'Registry: SENDER_IS_NOT_MINTING_MANAGER');
        _;
    }

    modifier protectTokenOperation(uint256 tokenId) {
        _protectTokenOperation(tokenId);
        _;
    }

    modifier onlyOwner(uint256 tokenId) {
        _onlyOwner(tokenId);
        _;
    }

    function initialize(
        address mintingManager,
        address cnsRegistry,
        address rootChainManager,
        address childChainManager
    ) public initializer {
        _mintingManager = mintingManager;
        StorageSlotUpgradeable.getAddressSlot(_CNS_REGISTRY_SLOT).value = cnsRegistry;

        __ERC721_init_unchained('Unstoppable Domains', 'UD');
        __ERC2771RegistryContext_init_unchained();
        __UNSRegistryForwarder_init_unchained();
        __RootRegistry_init(rootChainManager);
        __ChildRegistry_init(childChainManager);
    }

    /// ERC721 Metadata extension

    function setTokenURIPrefix(string calldata prefix) external override onlyMintingManager {
        _prefix = prefix;
        emit NewURIPrefix(prefix);
    }

    /// Ownership

    function isApprovedOrOwner(address spender, uint256 tokenId) external view override returns (bool) {
        return _isApprovedOrOwner(spender, tokenId);
    }

    function approve(address to, uint256 tokenId) public override(IERC721Upgradeable, ERC721Upgradeable) protectTokenOperation(tokenId) {
        super.approve(to, tokenId);
    }

    /// Registry Constants

    function root() public pure returns (uint256) {
        return 0;
    }

    function namehash(string[] calldata labels) external pure override returns (uint256 hash) {
        (hash, ) = _namehash(labels);
    }

    function exists(uint256 tokenId) external view override(IUNSRegistry, IMintableERC721) returns (bool) {
        return _exists(tokenId);
    }

    /// Minting

    function mintTLD(uint256 tokenId, string calldata uri) external override onlyMintingManager {
        _mint(_mintingManager, tokenId);
        emit NewURI(tokenId, uri);
    }

    function unlockWithRecords(
        address to,
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values,
        bool withReverse
    ) external override onlyMintingManager {
        (uint256 tokenId, ) = _namehash(labels);

        _reset(tokenId);
        _transfer(ownerOf(tokenId), to, tokenId);
        _setMany(keys, values, tokenId);
        if (withReverse) {
            _safeSetReverse(to, tokenId, _uri(labels));
        }
    }

    function mintWithRecords(
        address to,
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values,
        bool withReverse
    ) external override onlyMintingManager {
        (uint256 tokenId, uint256 parentTokenId) = _namehash(labels);

        _ensureNotUpgraded(parentTokenId);

        _mint(to, tokenId, _uri(labels), withReverse);
        _setMany(keys, values, tokenId);
    }

    /// Transfering

    function setOwner(address to, uint256 tokenId) external override onlyApprovedOrOwner(tokenId) protectTokenOperation(tokenId) {
        _transfer(ownerOf(tokenId), to, tokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(IERC721Upgradeable, ERC721Upgradeable) onlyApprovedOrOwner(tokenId) protectTokenOperation(tokenId) {
        _reset(tokenId);
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override(IERC721Upgradeable, ERC721Upgradeable) onlyApprovedOrOwner(tokenId) protectTokenOperation(tokenId) {
        _reset(tokenId);
        _safeTransfer(from, to, tokenId, data);
    }

    // Token's migration from CNS

    // This is the keccak-256 hash of "uns.cns_registry" subtracted by 1
    bytes32 internal constant _CNS_REGISTRY_SLOT = 0x8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec92378;

    function onERC721Received(
        address,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override returns (bytes4) {
        if (_msgSender() == StorageSlotUpgradeable.getAddressSlot(_CNS_REGISTRY_SLOT).value) {
            ICNSRegistry(_msgSender()).burn(tokenId);
            if (data.length > 0 && abi.decode(data, (bool))) {
                _mint(address(this), tokenId);
                _deposit(from, tokenId);
            } else {
                _mint(from, tokenId);
            }

            return UNSRegistry.onERC721Received.selector;
        }

        revert('Registry: ERC721_RECEIVING_PROHIBITED');
    }

    /// Burning

    function burn(uint256 tokenId) external override onlyApprovedOrOwner(tokenId) protectTokenOperation(tokenId) {
        _reset(tokenId);
        _burn(tokenId);
    }

    /// Resolution

    function resolverOf(uint256 tokenId) external view override returns (address) {
        return _exists(tokenId) ? address(this) : address(0x0);
    }

    function set(
        string calldata key,
        string calldata value,
        uint256 tokenId
    ) external override onlyApprovedOrOwner(tokenId) protectTokenOperation(tokenId) {
        _set(key, value, tokenId);
    }

    function setMany(
        string[] calldata keys,
        string[] calldata values,
        uint256 tokenId
    ) external override onlyApprovedOrOwner(tokenId) protectTokenOperation(tokenId) {
        _setMany(keys, values, tokenId);
    }

    function setByHash(
        uint256 keyHash,
        string calldata value,
        uint256 tokenId
    ) external override onlyApprovedOrOwner(tokenId) protectTokenOperation(tokenId) {
        _setByHash(keyHash, value, tokenId);
    }

    function setManyByHash(
        uint256[] calldata keyHashes,
        string[] calldata values,
        uint256 tokenId
    ) external override onlyApprovedOrOwner(tokenId) protectTokenOperation(tokenId) {
        _setManyByHash(keyHashes, values, tokenId);
    }

    function reconfigure(
        string[] calldata keys,
        string[] calldata values,
        uint256 tokenId
    ) external override onlyApprovedOrOwner(tokenId) protectTokenOperation(tokenId) {
        _reconfigure(keys, values, tokenId);
    }

    function reset(uint256 tokenId) external override onlyApprovedOrOwner(tokenId) protectTokenOperation(tokenId) {
        _reset(tokenId);
    }

    /**
     * @dev See {IRootRegistry-depositToPolygon}.
     */
    function depositToPolygon(uint256 tokenId) external override onlyApprovedOrOwner(tokenId) {
        // A workaround for MintableERC721Predicate
        // that requires a depositor to be equal to token owner:
        // https://github.com/maticnetwork/pos-portal/blob/88dbf0a88fd68fa11f7a3b9d36629930f6b93a05/contracts/root/TokenPredicates/MintableERC721Predicate.sol#L94
        _transfer(_msgSender(), address(this), tokenId);

        _deposit(_msgSender(), tokenId);
    }

    /**
     * @dev See {IRootRegistry-withdrawFromPolygon}.
     */
    function withdrawFromPolygon(
        bytes calldata inputData,
        uint256 tokenId,
        string[] calldata keys,
        string[] calldata values
    ) external override {
        _withdraw(inputData);

        require(ownerOf(tokenId) == _msgSender(), 'Registry: SENDER_IS_NOT_OWNER');
        _setMany(keys, values, tokenId);
    }

    /**
     * @dev See {RootRegistry-mint(address,uint256)}.
     */
    function mint(address user, uint256 tokenId) external override onlyPredicate {
        _mint(user, tokenId);
    }

    /**
     * @dev See {RootRegistry-mint(address,uint256,bytes)}.
     */
    function mint(
        address user,
        uint256 tokenId,
        bytes calldata
    ) external override onlyPredicate {
        _mint(user, tokenId);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId) public view override(ERC721Upgradeable, IERC165Upgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IReverseRegistry-setReverse}.
     */
    function setReverse(string[] memory labels) external override {
        (uint256 tokenId, ) = _namehash(labels);
        _onlyOwner(tokenId);
        _protectTokenOperation(tokenId);
        _setReverse(_msgSender(), tokenId, _uri(labels));
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
     * @custom:deprecated Use reverseNameOf instead
     * @dev See {IReverseRegistry-reverseOf}.
     */
    function reverseOf(address addr) external view override returns (uint256 reverse) {
        uint256 tokenId = _reverses[addr];

        if (!_isReadRestricted(tokenId)) {
            reverse = tokenId;
        }
    }

    function reverseNameOf(address addr) external view override returns (string memory reverseUri) {
        uint256 tokenId = _reverses[addr];
        if (!_isReadRestricted(tokenId)) {
            reverseUri = _tokenNames[tokenId];
        }
    }

    /**
     * @dev See {IUNSRegistry-addProxyReader(address)}.
     */
    function addProxyReader(address addr) external override onlyMintingManager {
        _proxyReaders[addr] = true;
    }

    function multicall(bytes[] calldata data) public returns (bytes[] memory results) {
        bytes[] memory _data = data;
        if (isTrustedForwarder(msg.sender)) {
            for (uint256 i = 0; i < data.length; i++) {
                _data[i] = _buildData(_msgSender(), _msgToken(), data[i], '');
            }
        }
        return _multicall(_data);
    }

    /// Internal

    function _uri(string[] memory labels) private pure returns (string memory) {
        bytes memory uri = bytes(labels[0]);
        for (uint256 i = 1; i < labels.length; i++) {
            uri = abi.encodePacked(uri, '.', labels[i]);
        }
        return string(uri);
    }

    function _namehash(string[] memory labels) internal pure returns (uint256 tokenId, uint256 parentId) {
        for (uint256 i = labels.length; i > 0; i--) {
            parentId = tokenId;
            tokenId = _namehash(parentId, labels[i - 1]);
        }
    }

    function _namehash(uint256 tokenId, string memory label) internal pure returns (uint256) {
        require(bytes(label).length != 0, 'Registry: LABEL_EMPTY');
        return uint256(keccak256(abi.encodePacked(tokenId, keccak256(abi.encodePacked(label)))));
    }

    function _mint(
        address to,
        uint256 tokenId,
        string memory uri,
        bool withReverse
    ) internal {
        _mint(to, tokenId);
        emit NewURI(tokenId, uri);

        if (withReverse) {
            // set reverse must be after emission of New URL event in order to keep events' order
            _safeSetReverse(to, tokenId, uri);
        }
    }

    function _baseURI() internal view override(ERC721Upgradeable) returns (string memory) {
        return _prefix;
    }

    function _msgSender() internal view override(ContextUpgradeable, ERC2771RegistryContext) returns (address) {
        return super._msgSender();
    }

    function _msgData() internal view override(ContextUpgradeable, ERC2771RegistryContext) returns (bytes calldata) {
        return super._msgData();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        super._beforeTokenTransfer(from, to, tokenId);

        // This prevents the upgraded token from being burned or withdrawn from L2
        if (to == address(0)) {
            _ensureNotUpgraded(tokenId);
        }

        if (_reverses[from] == tokenId) {
            _removeReverse(from);
        }
    }

    function _setReverse(
        address addr,
        uint256 tokenId,
        string memory uri
    ) internal {
        if (bytes(_tokenNames[tokenId]).length == 0) {
            _tokenNames[tokenId] = uri;
        }
        _reverses[addr] = tokenId;
        emit SetReverse(addr, tokenId);
    }

    function _safeSetReverse(
        address addr,
        uint256 tokenId,
        string memory uri
    ) internal {
        if (address(0xdead) != addr && _reverses[addr] == 0) {
            _setReverse(addr, tokenId, uri);
        }
    }

    function _removeReverse(address addr) internal {
        delete _reverses[addr];
        emit RemoveReverse(addr);
    }

    function _isReadRestricted(uint256 tokenId) internal view override returns (bool) {
        return _upgradedTokens[tokenId] && _proxyReaders[_msgSender()];
    }

    function _protectTokenOperation(uint256 tokenId) internal {
        if (isTrustedForwarder(msg.sender)) {
            require(tokenId == _msgToken(), 'Registry: TOKEN_INVALID');
        } else {
            _invalidateNonce(tokenId);
        }
    }

    function _onlyOwner(uint256 tokenId) internal view {
        require(ownerOf(tokenId) == _msgSender(), 'Registry: SENDER_IS_NOT_OWNER');
    }

    function _ensureNotUpgraded(uint256 tokenId) internal view {
        require(!_upgradedTokens[tokenId], 'Registry: TOKEN_UPGRADED');
    }

    // Reserved storage space to allow for layout changes in the future.
    uint256[46] private __gap;
}
