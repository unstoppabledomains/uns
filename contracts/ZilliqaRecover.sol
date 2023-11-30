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

/**
 * @title ZilliqaRecover
 * @dev Custody contract for ZNS domains transferred from Zilliqa Blockchain.
 * Tokens minted to the contract can be unlocked by their original owners from ZNS
 * on Zilliqa blockchain by confirming their identity with EVM compatible signature
 * generated from Zilliqa Private Key and proving a new ETH wallet address.
 */
contract ZilliqaRecover is Ownable, ContextUpgradeable, ERC2771RegistryContext, Forwarder, IERC721ReceiverUpgradeable {
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
        bytes32 publicKeyX,
        bytes32 publicKeyY,
        address newOwnerAddress
    ) public correctPublicKey(publicKeyX, publicKeyY) {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _claim(tokenIds[i], zilAddress(publicKeyX, publicKeyY), newOwnerAddress);
        }
    }

    function znsOwnerOf(uint256 tokenId) public view returns (address) {
        return _znsOwners[tokenId];
    }

    function claim(
        uint256 tokenId,
        bytes32 publicKeyX,
        bytes32 publicKeyY,
        address newOwnerAddress
    ) public correctPublicKey(publicKeyX, publicKeyY) {
        _claim(tokenId, zilAddress(publicKeyX, publicKeyX), newOwnerAddress);
    }

    modifier correctPublicKey(bytes32 publicKeyX, bytes32 publicKeyY) {
        require(_msgSender() == ethAddress(publicKeyX, publicKeyY), 'ZilliqaRecover: PUBLIC_KEY_DOENT_MATCH_SENDER_ADDRESS');
        _;
    }

    function ethAddress(bytes32 publicKeyX, bytes32 publicKeyY) public pure returns (address) {
        bytes32 hash = keccak256(abi.encodePacked(publicKeyX, publicKeyY));
        return address(uint160(uint256(hash)));
    }

    function zilAddress(bytes32 publicKeyX, bytes32 publicKeyY) public pure returns (address) {
        bytes32 hash = sha256(compressPublicKey(publicKeyX, publicKeyY));
        return address(uint160(uint256(hash)));
    }

    function compressPublicKey(bytes32 publicKeyX, bytes32 publicKeyY) public pure returns (bytes memory) {
        uint8 lastByte = uint8(publicKeyY[publicKeyY.length - 1]);
        return abi.encodePacked(lastByte % 2 == 0 ? 0x02 : 0x03, publicKeyX);
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
        uint256 tokenId = uint256(keccak256(abi.encodePacked(ZIL_NODE, keccak256(abi.encodePacked(label)))));
        string[] memory labels = new string[](2);
        labels[0] = label;
        labels[1] = 'zil';
        _znsOwners[tokenId] = zilOwner;
        mintingManager.issueWithRecords(address(this), labels, empty, empty, false);
    }
}
