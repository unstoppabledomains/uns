// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';

import './IRegistry.sol';
import './RecordStorage.sol';
import './metatx/ERC2771RegistryContext.sol';
import './metatx/RegistryForwarder.sol';
import './roles/ControllerRole.sol';
import './roles/MinterRole.sol';

/**
 * @title Registry
 * @dev An ERC721 Token see https://eips.ethereum.org/EIPS/eip-721. With
 * additional functions so other trusted contracts to interact with the tokens.
 */
contract Registry is IRegistry, ERC721BurnableUpgradeable, ERC2771RegistryContext, RecordStorage, RegistryForwarder, ControllerRole, MinterRole {
    using AddressUpgradeable for address;

    string internal _prefix;

    // uint256(keccak256(abi.encodePacked(uint256(0x0), keccak256(abi.encodePacked('crypto')))))
    uint256 private constant _CRYPTO_HASH =
        0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f;

    modifier onlyApprovedOrOwner(uint256 tokenId) {
        require(_isApprovedOrOwner(_msgSender(), tokenId), 'Registry: SENDER_IS_NOT_APPROVED_OR_OWNER');
        _;
    }

    function initialize() public initializer {
        __ERC721_init_unchained('.crypto', 'UD');
        __ERC2771RegistryContext_init_unchained();
        __RegistryForwarder_init_unchained();
        __ControllerRole_init_unchained();
        __MinterRole_init_unchained();
        _mint(address(0xdead), _CRYPTO_HASH);
    }

    /// ERC721 Metadata extension

    function setTokenURIPrefix(string calldata prefix) external override onlyController {
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
        validForwardedToken(tokenId)
    {
        super.approve(to, tokenId);
    }

    /// Registry Constants

    function root() public pure returns (uint256) {
        return _CRYPTO_HASH;
    }

    function childIdOf(uint256 tokenId, string calldata label) external pure override returns (uint256) {
        return _childId(tokenId, label);
    }

    /// Minting

    function mintSLD(address to, string memory label) external override onlyMinter {
        _mintChild(to, _CRYPTO_HASH, label);
    }

    function safeMintSLD(address to, string calldata label) external override onlyMinter {
        safeMintSLD(to, label, '');
    }

    function safeMintSLD(address to, string memory label, bytes memory _data) public override onlyMinter {
        _safeMint(to, _childId(_CRYPTO_HASH, label), _data);
    }

    function mintSLDWithRecords(address to, string memory label, string[] memory keys, string[] memory values)
        external
        override
        onlyMinter
    {
        _mintChild(to, _CRYPTO_HASH, label);
        _setMany(keys, values, _childId(_CRYPTO_HASH, label));
    }

    /// Transfering

    function setOwner(address to, uint256 tokenId)
        external
        override
        onlyApprovedOrOwner(tokenId)
        validForwardedToken(tokenId)
    {
        _transfer(ownerOf(tokenId), to, tokenId);
    }

    function transferFrom(address from, address to, uint256 tokenId)
        public
        override(IERC721Upgradeable, ERC721Upgradeable)
        onlyApprovedOrOwner(tokenId)
        validForwardedToken(tokenId)
    {
        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data)
        public
        override(IERC721Upgradeable, ERC721Upgradeable)
        onlyApprovedOrOwner(tokenId)
        validForwardedToken(tokenId)
    {
        _safeTransfer(from, to, tokenId, _data);
    }

    /// Burning

    function burn(uint256 tokenId)
        public
        override
        onlyApprovedOrOwner(tokenId)
        validForwardedToken(tokenId)
    {
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
        validForwardedToken(tokenId)
    {
        _set(key, value, tokenId);
    }

    function setMany(string[] memory keys, string[] memory values, uint256 tokenId)
        external
        override
        onlyApprovedOrOwner(tokenId)
        validForwardedToken(tokenId)
    {
        _setMany(keys, values, tokenId);
    }

    function reconfigure(string[] memory keys, string[] memory values, uint256 tokenId)
        external
        override
        onlyApprovedOrOwner(tokenId)
        validForwardedToken(tokenId)
    {
        _reconfigure(keys, values, tokenId);
    }

    function reset(uint256 tokenId)
        external
        override
        onlyApprovedOrOwner(tokenId)
        validForwardedToken(tokenId)
    {
        _reset(tokenId);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public view override(AccessControlUpgradeable, ERC721Upgradeable, IERC165Upgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /// Internal

    function _childId(uint256 tokenId, string memory label) internal pure returns (uint256) {
        require(bytes(label).length != 0);
        return uint256(keccak256(abi.encodePacked(tokenId, keccak256(abi.encodePacked(label)))));
    }

    function _mintChild(address to, uint256 tokenId, string memory label) internal {
        _mint(to, _childId(tokenId, label));
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
}
