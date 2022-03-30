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

/**
 * @title UNSRegistry v0.3
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
    IUNSRegistry
{
    string public constant NAME = 'UNS: Registry';
    string public constant VERSION = '0.3.0';

    string internal _prefix;

    address internal _mintingManager;

    mapping(address => uint256) private _reverses;

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

    modifier onlyOwner(uint256 tokenId) {
        require(ownerOf(tokenId) == _msgSender(), 'Registry: SENDER_IS_NOT_OWNER');
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

    function exists(uint256 tokenId) external view override(IUNSRegistry, IMintableERC721) returns (bool) {
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

    // Token's migration from CNS

    // This is the keccak-256 hash of "uns.cns_registry" subtracted by 1
    bytes32 internal constant _CNS_REGISTRY_SLOT = 0x8ffb960699dc2ba88f34d0e41c029c3c36c95149679fe1d0153a9582bec92378;
    function setCNSRegistry(address registry) external override {
        require(
            StorageSlotUpgradeable.getAddressSlot(_CNS_REGISTRY_SLOT).value == address(0),
            'Registry: CNS_REGISTRY_NOT_EMPTY'
        );
        StorageSlotUpgradeable.getAddressSlot(_CNS_REGISTRY_SLOT).value = registry;
    }

    function onERC721Received(
        address,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override returns (bytes4) {
        if(_msgSender() == StorageSlotUpgradeable.getAddressSlot(_CNS_REGISTRY_SLOT).value) {
            ICNSRegistry(_msgSender()).burn(tokenId);
            if(data.length > 0 && abi.decode(data, (bool))) {
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
    function mint(address user, uint256 tokenId, bytes calldata) external override onlyPredicate {
        _mint(user, tokenId);
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

    /**
     * @dev See {IReverseRegistry-setReverse}.
     */
    function setReverse(uint256 tokenId) external override onlyOwner(tokenId) {
        address sender = _msgSender();
        _reverses[sender] = tokenId;
        emit SetReverse(sender, tokenId);
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
     * @dev See {IReverseRegistry-reverseOf}.
     */
    function reverseOf(address addr) external view override returns (uint256) {
        return _reverses[addr];
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

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
        super._beforeTokenTransfer(from, to, amount);

        if(_reverses[from] != 0) {
            _removeReverse(from);
        }
    }

    function _removeReverse(address addr) internal {
        delete _reverses[addr];
        emit RemoveReverse(addr);
    }

    // Reserved storage space to allow for layout changes in the future.
    uint256[49] private __gap;
}
