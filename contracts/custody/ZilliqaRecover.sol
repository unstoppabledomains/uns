// SPDX-License-Identifier: UNLICENSED
// @author Unstoppable Domains, Inc.
// @date January 17th, 2023

pragma solidity ^0.8.0;

import {IERC721ReceiverUpgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/SignatureCheckerUpgradeable.sol';
import {ContextUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import '../metatx/ERC2771RegistryContext.sol';
import '../IUNSRegistry.sol';
import '../IMintingManager.sol';
import '../metatx/Forwarder.sol';
import '../utils/Ownable.sol';

error PublicKeyUnmatchSenderAddress(bytes32 publicKeyX, bytes32 publicKeyY);
error UnknownTokenReceived(uint256 tokenId, address contractAddress);
error TokenOwnedByOtherZilAddress(uint256 tokenId, address znsOwner, address receivedOwner);

/**
 * @title ZilliqaRecover
 * @dev Custody contract for ZNS domains transferred from Zilliqa Blockchain.
 * Tokens minted to the contract can be unlocked by their original owners from ZNS
 * on Zilliqa blockchain by confirming their identity with EVM compatible signature
 * generated from Zilliqa Private Key and proving a new ETH wallet address.
 */
contract ZilliqaRecover is Ownable, ContextUpgradeable, ERC2771RegistryContext, Forwarder, IERC721ReceiverUpgradeable {
    struct MintingToken {
        // Zilliqa address that was an owner of the token.
        address zilOwner;
        // SLD label without .zil suffix, only .zil SLDs possible.
        string label;
    }
    using SignatureCheckerUpgradeable for address;
    using ECDSAUpgradeable for bytes32;
    event ZnsTokenClaimed(uint256 indexed tokenId, address indexed oldAddress, address indexed newAddress);
    event ZnsTokenMinted(uint256 indexed tokenId, address indexed zilAddress, string label);

    uint256 public constant ZIL_NODE = 0xd81bbfcee722494b885e891546eeac23d0eedcd44038d7a2f6ef9ec2f9e0d239;

    mapping(uint256 => address) private _znsOwners;
    IUNSRegistry public registry;
    IMintingManager public mintingManager;

    /**
     * @dev Checks if given public key matches the sender ethereum address
     * @param publicKeyX public key X coordinate
     * @param publicKeyY public key Y coordinate
     */
    modifier correctPublicKey(bytes32 publicKeyX, bytes32 publicKeyY) {
        if (_msgSender() != ethAddress(publicKeyX, publicKeyY)) {
            revert PublicKeyUnmatchSenderAddress(publicKeyX, publicKeyY);
        }
        _;
    }

    modifier protectTokenOperation(uint256 tokenId) {
        _protectTokenOperation(tokenId);
        _;
    }

    /**
     * @dev Initializes the contract
     * @param registry_ UNSRegistry address
     * @param mintingManager_ MintingManager address
     */
    function initialize(IUNSRegistry registry_, IMintingManager mintingManager_) public initializer {
        registry = registry_;
        mintingManager = mintingManager_;
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Mints multiple .zil tokens to this custodial contract.
     * @param tokens List of tokens to be minted
     */
    function mintAll(MintingToken[] calldata tokens) public onlyOwner {
        for (uint256 i = 0; i < tokens.length; i++) {
            _mint(tokens[i].label, tokens[i].zilOwner);
        }
    }

    /**
     * @dev Mints token to this custodial contract.
     * @param label Domain label without TLD
     * @param zilOwner owner address on ZNS
     * @return minted token id
     */
    function mint(string calldata label, address zilOwner) public onlyOwner returns (uint256) {
        uint256 tokenId = _mint(label, zilOwner);
        _protectTokenOperation(tokenId);
        return tokenId;
    }

    /**
     * @dev Transfers tokens to new owner address
     * @param tokenIds Array of token ids
     * @param publicKeyX X coordinate of the public key of ZNS owner address.
     * @param publicKeyY Y coordinate of the public key of ZNS owner address.
     * @param newOwnerAddress new EVM owner address the token needs to be transferred to.
     */
    function claimAll(
        uint256[] calldata tokenIds,
        bytes32 publicKeyX,
        bytes32 publicKeyY,
        address newOwnerAddress
    ) public correctPublicKey(publicKeyX, publicKeyY) {
        address zilAddress_ = zilAddress(publicKeyX, publicKeyY);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _claim(tokenIds[i], zilAddress_, newOwnerAddress);
        }
    }

    /**
     * @dev Transfers a token to new owner address
     * @param tokenId Token id to be transfered.
     * @param publicKeyX X coordinate of the public key of ZNS owner address.
     * @param publicKeyY Y coordinate of the public key of ZNS owner address.
     * @param newOwnerAddress new EVM owner address the token needs to be transferred to.
     */
    function claim(
        uint256 tokenId,
        bytes32 publicKeyX,
        bytes32 publicKeyY,
        address newOwnerAddress
    ) public correctPublicKey(publicKeyX, publicKeyY) protectTokenOperation(tokenId) {
        _claim(tokenId, zilAddress(publicKeyX, publicKeyX), newOwnerAddress);
    }

    /**
     * @return Zilliqa owner address of the token on ZNS
     * @param tokenId Token
     */
    function znsOwnerOf(uint256 tokenId) public view returns (address) {
        return _znsOwners[tokenId];
    }

    /**
     * @return EVM address calculated from public key
     * @param publicKeyX X coordinate of the public key
     * @param publicKeyY Y coordinate of the public key
     */
    function ethAddress(bytes32 publicKeyX, bytes32 publicKeyY) public pure returns (address) {
        bytes32 hash = keccak256(abi.encodePacked(publicKeyX, publicKeyY));
        return address(uint160(uint256(hash)));
    }

    /**
     * @return Zilliqa address calculated from public key
     * @param publicKeyX X coordinate of the public key
     * @param publicKeyY Y coordinate of the public key
     */
    function zilAddress(bytes32 publicKeyX, bytes32 publicKeyY) public pure returns (address) {
        bytes32 hash = sha256(_compressPublicKey(publicKeyX, publicKeyY));
        return address(uint160(uint256(hash)));
    }

    function onERC721Received(
        address,
        address,
        uint256 tokenId,
        bytes calldata
    ) external view returns (bytes4) {
        if (_msgSender() != address(registry) || znsOwnerOf(tokenId) == address(0x00)) {
            revert UnknownTokenReceived(tokenId, _msgSender());
        }
        return ZilliqaRecover.onERC721Received.selector;
    }

    function _compressPublicKey(bytes32 publicKeyX, bytes32 publicKeyY) private pure returns (bytes memory) {
        uint8 lastByte = uint8(publicKeyY[publicKeyY.length - 1]);
        return abi.encodePacked(lastByte % 2 == 0 ? 0x02 : 0x03, publicKeyX);
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
        if (znsOwnerOf(tokenId) != zilAddress_) {
            revert TokenOwnedByOtherZilAddress(tokenId, znsOwnerOf(tokenId), zilAddress_);
        }

        _znsOwners[tokenId] = address(0);
        registry.safeTransferFrom(address(this), newOwnerAddress, tokenId);
        emit ZnsTokenClaimed(tokenId, _msgSender(), newOwnerAddress);
    }

    function _mint(string calldata label, address zilOwner) private returns (uint256) {
        string[] memory empty;
        uint256 tokenId = uint256(keccak256(abi.encodePacked(ZIL_NODE, keccak256(abi.encodePacked(label)))));
        string[] memory labels = new string[](2);
        labels[0] = label;
        labels[1] = 'zil';
        _znsOwners[tokenId] = zilOwner;
        mintingManager.issueWithRecords(address(this), labels, empty, empty, false);
        emit ZnsTokenMinted(tokenId, zilOwner, label);
        return tokenId;
    }

    function _protectTokenOperation(uint256 tokenId) internal {
        if (isTrustedForwarder(msg.sender)) {
            _validateForwardedToken(tokenId);
        } else {
            _invalidateNonce(tokenId);
        }
    }
}
