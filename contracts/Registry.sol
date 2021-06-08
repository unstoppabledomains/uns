// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';

import './IRegistry.sol';
import './RecordStorage.sol';
import './metatx/ERC2771RegistryContext.sol';
import './metatx/RegistryForwarder.sol';

/**
 * @title Registry
 * @dev An ERC721 Token see https://eips.ethereum.org/EIPS/eip-721. With
 * additional functions so other trusted contracts to interact with the tokens.
 */
contract Registry is Initializable, ContextUpgradeable, ERC721Upgradeable, OwnableUpgradeable, ERC2771RegistryContext, RecordStorage, RegistryForwarder, IRegistry {
    using AddressUpgradeable for address;

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
        }
        _invalidateNonce(tokenId);
        _;
    }

    function initialize(address mintingManager_) public initializer {
        _mintingManager = mintingManager_;

        __ERC721_init_unchained('uns', 'UD');
        __Ownable_init_unchained();
        __ERC2771RegistryContext_init_unchained();
        __RegistryForwarder_init_unchained();
    }

    /// ERC721 Metadata extension

    function setTokenURIPrefix(string calldata prefix) external override onlyOwner {
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

    function mint(address to, uint256 tokenId, string calldata uri)
        external override onlyMintingManager
    {
        _mint(to, tokenId, uri);
    }

    function safeMint(address to, uint256 tokenId, string calldata uri)
        external override onlyMintingManager
    {
        _safeMint(to, tokenId, uri, '');
    }

    function safeMint(address to, uint256 tokenId, string calldata uri, bytes calldata _data)
        external override onlyMintingManager
    {
        _safeMint(to, tokenId, uri, _data);
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

    function transferFrom(address from, address to, uint256 tokenId)
        public
        override(IERC721Upgradeable, ERC721Upgradeable)
        onlyApprovedOrOwner(tokenId)
        protectTokenOperation(tokenId)
    {
        _reset(tokenId);
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data)
        public
        override(IERC721Upgradeable, ERC721Upgradeable)
        onlyApprovedOrOwner(tokenId)
        protectTokenOperation(tokenId)
    {
        _reset(tokenId);
        _safeTransfer(from, to, tokenId, _data);
    }

    /// Burning

    function burn(uint256 tokenId)
        public
        override
        onlyApprovedOrOwner(tokenId)
        protectTokenOperation(tokenId)
    {
        _reset(tokenId);
        _burn(tokenId);
    }

    /// Resolution

    function resolverOf(uint256 tokenId) external view override returns (address) {
        return _exists(tokenId) ? address(this) : address(0x0);
    }

    function set(string calldata key, string calldata value, uint256 tokenId)
        external
        override
        onlyApprovedOrOwner(tokenId)
        protectTokenOperation(tokenId)
    {
        _set(key, value, tokenId);
    }

    function setMany(string[] calldata keys, string[] calldata values, uint256 tokenId)
        external
        override
        onlyApprovedOrOwner(tokenId)
        protectTokenOperation(tokenId)
    {
        _setMany(keys, values, tokenId);
    }

    function preconfigure(string[] calldata keys, string[] calldata values, uint256 tokenId)
        external
        override
        onlyMintingManager
        protectTokenOperation(tokenId)
    {
        require(!_exists(tokenId), 'Registry: TOKEN_EXISTS');
        _setMany(keys, values, tokenId);
    }

    function reconfigure(string[] calldata keys, string[] calldata values, uint256 tokenId)
        external
        override
        onlyApprovedOrOwner(tokenId)
        protectTokenOperation(tokenId)
    {
        _reconfigure(keys, values, tokenId);
    }

    function reset(uint256 tokenId)
        external
        override
        onlyApprovedOrOwner(tokenId)
        protectTokenOperation(tokenId)
    {
        _reset(tokenId);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721Upgradeable, IERC165Upgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /// Internal

    function _childId(uint256 tokenId, string memory label) internal pure returns (uint256) {
        require(bytes(label).length != 0, 'Registry: LABEL_EMPTY');
        return uint256(keccak256(abi.encodePacked(tokenId, keccak256(abi.encodePacked(label)))));
    }

    function _mint(address to, uint256 tokenId, string memory uri) internal {
        _mint(to, tokenId);
        emit NewURI(tokenId, uri);
    }

    function _safeMint(address to, uint256 tokenId, string memory uri, bytes memory _data) internal {
        _safeMint(to, tokenId, _data);
        emit NewURI(tokenId, uri);
    }

    function _baseURI()
        internal view override(ERC721Upgradeable)
        returns (string memory)
    {
        return _prefix;
    }

    function _msgSender()
        internal view override(ContextUpgradeable, ERC2771RegistryContext)
        returns (address sender)
    {
        return super._msgSender();
    }

    function _msgData()
        internal view override(ContextUpgradeable, ERC2771RegistryContext)
        returns (bytes calldata)
    {
        return super._msgData();
    }

    // Reserved storage space to allow for layout changes in the future.
    uint256[50] private __gap;
}
