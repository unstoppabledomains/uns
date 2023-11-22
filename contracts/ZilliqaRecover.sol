// SPDX-License-Identifier: UNLICENSED
// @author Unstoppable Domains, Inc.
// @date January 17th, 2023

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/SignatureCheckerUpgradeable.sol';
import './metatx/ERC2771Context.sol';
import './IUNSRegistry.sol';
import './metatx/Forwarder.sol';
import './utils/Ownable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol';

contract ZilliqaRecover is ERC2771Context, Forwarder, Ownable {
    using SignatureCheckerUpgradeable for address;
    using ECDSAUpgradeable for bytes32;
    event Claimed(uint256 tokenId, address oldAddress, address newAddress);
    event ZilOwnership(uint256 tokenId, address zilAddress);

    mapping(uint256 => address) private _zilliqaOwners;
    IUNSRegistry public registry;

    function initialize(IUNSRegistry registry_, address owner) public initializer {
        registry = registry_;
        _transferOwnership(owner);
        __Ownable_init();
    }

    function setZilOwner(uint256[] memory tokenIds, address owner) public onlyOwner {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _zilliqaOwners[tokenIds[i]] = owner;
            emit ZilOwnership(tokenIds[i], owner);
        }
    }

    function claimAll(
        uint256[] memory tokenIds,
        bytes memory publicKey,
        address newOwnerAddress
    ) public correctPublicKey(publicKey) {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _claim(tokenIds[i], publicKey, newOwnerAddress);
        }
    }

    function zilOwnerOf(uint256 tokenId) public view returns (address) {
        return _zilliqaOwners[tokenId];
    }

    function claim(
        uint256 tokenId,
        bytes memory publicKey,
        address newOwnerAddress
    ) public correctPublicKey(publicKey) {
        _claim(tokenId, publicKey, newOwnerAddress);
    }

    modifier correctPublicKey(bytes memory publicKey) {
        require(_msgSender() == ethAddress(publicKey), 'ZilliqaRecover: PUBLIC_KEY_INVALID');
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
        bool isEven = lastByte % 2 == 0;
        return abi.encodePacked(isEven ? 0x02 : 0x03, x);
    }

    function verify1(
        uint256 tokenId,
        bytes memory publicKey,
        bytes memory signature
    ) public view returns (bool) {
        (address recovered, ECDSAUpgradeable.RecoverError error) = recover1(tokenId, publicKey, signature);
        return
            error == ECDSAUpgradeable.RecoverError.NoError &&
            recovered == ethAddress(publicKey) &&
            _zilliqaOwners[tokenId] == zilAddress(publicKey);
    }

    function recover1(
        uint256 tokenId,
        bytes memory publicKey,
        bytes memory signature
    ) public view returns (address recovered, ECDSAUpgradeable.RecoverError error) {
        return ECDSAUpgradeable.tryRecover(ethSignedMessage(tokenId, publicKey), signature);
    }

    function onERC721Received(
        address,
        address,
        uint256 tokenId,
        bytes calldata
    ) external view returns (bytes4) {
        if (_zilliqaOwners[tokenId] == address(0x00)) {
            revert('ZilliqaRecover: TOKEN_HAS_NO_OWNER');
        }
        return ZilliqaRecover.onERC721Received.selector;
    }

    function message(uint256 tokenId, bytes memory publicKey) public view returns (bytes32) {
        return keccak256(abi.encodePacked(block.chainid, tokenId, publicKey));
    }

    function ethSignedMessage(uint256 tokenId, bytes memory publicKey) public view returns (bytes32) {
        return message(tokenId, publicKey).toEthSignedMessageHash();
    }

    function _msgSender() internal view override(ERC2771Context, Ownable) returns (address) {
        return super._msgSender();
    }

    function _msgData() internal view override(ERC2771Context, Ownable) returns (bytes calldata) {
        return super._msgData();
    }

    function msgSender() public view returns (address) {
        return _msgSender();
    }

    function _isValidSignatureNow(
        address signer,
        bytes32 hash,
        bytes memory signature
    ) internal view returns (bool) {
        (address recovered, ECDSAUpgradeable.RecoverError error) = ECDSAUpgradeable.tryRecover(hash, signature);
        if (error == ECDSAUpgradeable.RecoverError.NoError && recovered == signer) {
            return true;
        }

        (bool success, bytes memory result) = signer.staticcall(
            abi.encodeWithSelector(IERC1271Upgradeable.isValidSignature.selector, hash, signature)
        );
        return (success && result.length == 32 && abi.decode(result, (bytes32)) == bytes32(IERC1271Upgradeable.isValidSignature.selector));
    }

    function _claim(
        uint256 tokenId,
        bytes memory publicKey,
        address newOwnerAddress
    ) private {
        require(_zilliqaOwners[tokenId] == zilAddress(publicKey), 'ZilliqaRecover: TOKEN_OWNED_BY_OTHER_ADDRESS');

        _zilliqaOwners[tokenId] = address(0);
        if (address(registry) != address(0)) {
            registry.safeTransferFrom(address(this), newOwnerAddress, tokenId);
        }
        emit Claimed(tokenId, _msgSender(), newOwnerAddress);
    }
}
