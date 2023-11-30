// SPDX-License-Identifier: UNLICENSED
// @author Unstoppable Domains, Inc.
// @date January 17th, 2023

pragma solidity ^0.8.0;

import {IERC721ReceiverUpgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/SignatureCheckerUpgradeable.sol';
import {ContextUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import './metatx/ERC2771RegistryContext.sol';
import './IUNSRegistry.sol';
import './IMintingManager.sol';
import './metatx/Forwarder.sol';
import './utils/Ownable.sol';
import './utils/Multicall.sol';

contract ZilliqaRecover is Ownable, ContextUpgradeable, ERC2771RegistryContext, Forwarder, Multicall, IERC721ReceiverUpgradeable {
    struct MintingToken {
        address zilOwner;
        string label;
    }
    using SignatureCheckerUpgradeable for address;
    using ECDSAUpgradeable for bytes32;
    event Claimed(uint256 tokenId, address oldAddress, address newAddress);
    event ZilOwnership(uint256 tokenId, address zilAddress);
    uint256 public constant ZIL_NODE = 0xd81bbfcee722494b885e891546eeac23d0eedcd44038d7a2f6ef9ec2f9e0d239;

    mapping(uint256 => address) private _znsOwners;
    IUNSRegistry public registry;
    IMintingManager public mintingManager;

    function initialize(
        IUNSRegistry registry_,
        IMintingManager mintingManager_,
        address owner
    ) public initializer {
        registry = registry_;
        mintingManager = mintingManager_;
        _transferOwnership(owner);
        __Ownable_init();
    }

    function mintAll(MintingToken[] calldata tokens) public onlyOwner {
        for (uint256 i = 0; i < tokens.length; i++) {
            MintingToken calldata data = tokens[i];
            _mint(data.label, data.zilOwner);
        }
    }

    function mint(string calldata label, address zilOwner) public onlyOwner {
        _mint(label, zilOwner);
    }

    function claimAll(
        uint256[] memory tokenIds,
        bytes memory publicKey,
        address newOwnerAddress
    ) public correctPublicKey(publicKey) {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _claim(tokenIds[i], zilAddress(publicKey), newOwnerAddress);
        }
    }

    function znsOwnerOf(uint256 tokenId) public view returns (address) {
        return _znsOwners[tokenId];
    }

    function claim(
        uint256 tokenId,
        bytes memory publicKey,
        address newOwnerAddress
    ) public correctPublicKey(publicKey) {
        _claim(tokenId, zilAddress(publicKey), newOwnerAddress);
    }

    modifier correctPublicKey(bytes memory publicKey) {
        // Default eth public key uses a constant 0x04 prefix.
        // It needs to be removed offchain.
        require(publicKey.length == 64, 'ZilliqaRecover: PUBLIC_KEY_LENGTH_INVALID');
        require(_msgSender() == ethAddress(publicKey), 'ZilliqaRecover: PUBLIC_KEY_DOENT_MATCH_SENDER_ADDRESS');
        _;
    }

    function ethAddress(bytes memory publicKey) public pure returns (address) {
        bytes32 hash = keccak256(publicKey);
        return address(uint160(uint256(hash)));
    }

    function zilAddress(bytes memory publicKey) public pure returns (address) {
        bytes32 hash = sha256(compressPublicKey(publicKey));
        return address(uint160(uint256(hash)));
    }

    function compressPublicKey(bytes memory publicKey) public pure returns (bytes memory) {
        // First 32 bytes of public key is X coordinate
        // Other 32 bytes of public key is Y coordinate
        bytes32 x = bytes32(publicKey);
        uint8 lastByte = uint8(publicKey[publicKey.length - 1]);
        return abi.encodePacked(lastByte % 2 == 0 ? 0x02 : 0x03, x);
    }

    function onERC721Received(
        address,
        address,
        uint256 tokenId,
        bytes calldata
    ) external view returns (bytes4) {
        require(znsOwnerOf(tokenId) != address(0x00), 'ZilliqaRecover: UNKNOWN_TOKEN_RECEIVED');
        return ZilliqaRecover.onERC721Received.selector;
    }

    function _msgSender() internal view override(ERC2771RegistryContext, ContextUpgradeable, Ownable) returns (address) {
        return super._msgSender();
    }

    function _msgData() internal view override(ERC2771RegistryContext, ContextUpgradeable, Ownable) returns (bytes calldata) {
        return super._msgData();
    }

    function _claim(
        uint256 tokenId,
        address zilAddress_,
        address newOwnerAddress
    ) private {
        require(znsOwnerOf(tokenId) == zilAddress_, 'ZilliqaRecover: TOKEN_OWNED_BY_OTHER_ADDRESS');

        _znsOwners[tokenId] = address(0);
        registry.safeTransferFrom(address(this), newOwnerAddress, tokenId);
        emit Claimed(tokenId, _msgSender(), newOwnerAddress);
    }

    function _mint(string calldata label, address zilOwner) private {
        string[] memory empty;
        (string[] memory labels, uint256 tokenId) = _namehash(label);
        _znsOwners[tokenId] = zilOwner;
        mintingManager.issueWithRecords(address(this), labels, empty, empty, false);
    }

    function _namehash(string memory label) internal pure returns (string[] memory labels, uint256 tokenId) {
        tokenId = uint256(keccak256(abi.encodePacked(ZIL_NODE, keccak256(abi.encodePacked(label)))));
        labels = new string[](2);
        labels[0] = label;
        labels[1] = 'zil';
    }
}
