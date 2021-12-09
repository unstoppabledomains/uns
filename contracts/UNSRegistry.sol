// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol';

import './IUNSRegistry.sol';
import './RecordStorage.sol';
import './metatx/ERC2771RegistryContext.sol';
import './metatx/UNSRegistryForwarder.sol';
import './@maticnetwork/IRootChainManager.sol';
import './@maticnetwork/RootChainManagerStorage.sol';

/**
 * @title UNSRegistry v0.2
 * @dev An ERC721 Token see https://eips.ethereum.org/EIPS/eip-721. With
 * additional functions so other trusted contracts to interact with the tokens.
 */
contract UNSRegistry is ERC721Upgradeable, ERC2771RegistryContext, RecordStorage, UNSRegistryForwarder, IUNSRegistry {
    /**
     * @dev ERC-1967: Emitted when the implementation is upgraded. Required for ABI decoding only.
     */
    event Upgraded(address indexed implementation);

    /**
     * @dev ERC-1967: Emitted when the admin account has changed. Required for ABI decoding only.
     */
    event AdminChanged(address previousAdmin, address newAdmin);

    string public constant NAME = 'UNS: Registry';
    string public constant VERSION = '0.2.0';

    string internal _prefix;

    address internal _mintingManager;

    modifier onlyApprovedOrOwner(uint256 tokenId) {
        require(_isApprovedOrOwner(_msgSender(), tokenId), 'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
        _;
    }

    modifier onlyMintingManager() {
        require(_msgSender() == _mintingManager, 'Registry: SENDER_IS_NOT_MINTING_MANAGER');
        _;
    }

    modifier protectTokenOperation(uint256 tokenId) {
        if (isTrustedForwarder(msg.sender)) {
            require(tokenId == _msgToken(), 'Registry: TOKEN_INVALID');
        } else {
            _invalidateNonce(tokenId);
        }
        _;
    }

    function initialize(address mintingManager) public initializer {
        _mintingManager = mintingManager;

        __ERC721_init_unchained('Unstoppable Domains', 'UD');
        __ERC2771RegistryContext_init_unchained();
        __UNSRegistryForwarder_init_unchained();
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

    function approve(address to, uint256 tokenId)
        public
        override(IERC721Upgradeable, ERC721Upgradeable)
        protectTokenOperation(tokenId)
    {
        super.approve(to, tokenId);
    }

    /// Registry Constants

    function root() public pure returns (uint256) {
        return 0;
    }

    function childIdOf(uint256 tokenId, string calldata label) external pure override returns (uint256) {
        return _childId(tokenId, label);
    }

    function exists(uint256 tokenId) external view override returns (bool) {
        return _exists(tokenId);
    }

    /// Minting

    function mint(
        address to,
        uint256 tokenId,
        string calldata uri
    ) external override onlyMintingManager {
        _mint(to, tokenId, uri);
    }

    function safeMint(
        address to,
        uint256 tokenId,
        string calldata uri
    ) external override onlyMintingManager {
        _safeMint(to, tokenId, uri, '');
    }

    function safeMint(
        address to,
        uint256 tokenId,
        string calldata uri,
        bytes calldata data
    ) external override onlyMintingManager {
        _safeMint(to, tokenId, uri, data);
    }

    function mintWithRecords(
        address to,
        uint256 tokenId,
        string calldata uri,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyMintingManager {
        _mint(to, tokenId, uri);
        _setMany(keys, values, tokenId);
    }

    function safeMintWithRecords(
        address to,
        uint256 tokenId,
        string calldata uri,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyMintingManager {
        _safeMintWithRecords(to, tokenId, uri, keys, values, '');
    }

    function safeMintWithRecords(
        address to,
        uint256 tokenId,
        string calldata uri,
        string[] calldata keys,
        string[] calldata values,
        bytes calldata data
    ) external override onlyMintingManager {
        _safeMintWithRecords(to, tokenId, uri, keys, values, data);
    }

    /// Transfering

    function setOwner(address to, uint256 tokenId)
        external
        override
        onlyApprovedOrOwner(tokenId)
        protectTokenOperation(tokenId)
    {
        _transfer(ownerOf(tokenId), to, tokenId);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    )
        public
        override(IERC721Upgradeable, ERC721Upgradeable)
        onlyApprovedOrOwner(tokenId)
        protectTokenOperation(tokenId)
    {
        _reset(tokenId);
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    )
        public
        override(IERC721Upgradeable, ERC721Upgradeable)
        onlyApprovedOrOwner(tokenId)
        protectTokenOperation(tokenId)
    {
        _reset(tokenId);
        _safeTransfer(from, to, tokenId, data);
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
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, IERC165Upgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // TODO: guard the function by owner check
    // This is the keccak-256 hash of "uns.polygon.root_chain_manager" subtracted by 1
    bytes32 internal constant _ROOT_CHAIN_MANAGER_SLOT = 0xbe2bb46ac0377341a1ec5c3116d70fd5029d704bd46292e58f6265dd177ebafe;
    function setRootChainManager(address rootChainManager) public {
        require(
            StorageSlotUpgradeable.getAddressSlot(_ROOT_CHAIN_MANAGER_SLOT).value == address(0),
            'Registry: ROOT_CHAIN_MANEGER_NOT_EMPTY'
        );
        StorageSlotUpgradeable.getAddressSlot(_ROOT_CHAIN_MANAGER_SLOT).value = rootChainManager;
    }

    function depositToPolygon(uint256 tokenId) public onlyApprovedOrOwner(tokenId) {
        address manager = StorageSlotUpgradeable.getAddressSlot(_ROOT_CHAIN_MANAGER_SLOT).value;
        bytes32 tokenType = RootChainManagerStorage(manager).tokenToType(address(this));
        address predicate = RootChainManagerStorage(manager).typeToPredicate(tokenType);

        // A workaround for MintableERC721Predicate
        // that requires a depositor to be equal to token owner:
        // https://github.com/maticnetwork/pos-portal/blob/88dbf0a88fd68fa11f7a3b9d36629930f6b93a05/contracts/root/TokenPredicates/MintableERC721Predicate.sol#L94
        _transfer(_msgSender(), address(this), tokenId);
        _approve(predicate, tokenId);
        IRootChainManager(manager).depositFor(_msgSender(), address(this), abi.encode(tokenId));
    }

    /// Internal

    function _childId(uint256 tokenId, string memory label) internal pure returns (uint256) {
        require(bytes(label).length != 0, 'Registry: LABEL_EMPTY');
        return uint256(keccak256(abi.encodePacked(tokenId, keccak256(abi.encodePacked(label)))));
    }

    function _mint(
        address to,
        uint256 tokenId,
        string memory uri
    ) internal {
        _mint(to, tokenId);
        emit NewURI(tokenId, uri);
    }

    function _safeMint(
        address to,
        uint256 tokenId,
        string memory uri,
        bytes memory data
    ) internal {
        _safeMint(to, tokenId, data);
        emit NewURI(tokenId, uri);
    }

    function _safeMintWithRecords(
        address to,
        uint256 tokenId,
        string calldata uri,
        string[] calldata keys,
        string[] calldata values,
        bytes memory data
    ) internal {
        _safeMint(to, tokenId, uri, data);
        _setMany(keys, values, tokenId);
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

    // Reserved storage space to allow for layout changes in the future.
    uint256[50] private __gap;
}
