// SPDX-License-Identifier: UNLICENSED
// @author Unstoppable Domains, Inc.
// @date January 17th, 2023

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/SignatureCheckerUpgradeable.sol';
import './metatx/ERC2771Context.sol';

contract ZilliqaRecover is ERC2771Context {
    using SignatureCheckerUpgradeable for address;
    using ECDSAUpgradeable for bytes32;
    mapping(uint256 => address) public tokenOwners;

    function initialize(uint256 tokenId, address owner) public initializer {
        tokenOwners[tokenId] = owner;
    }

    function claim(
        uint256 tokenId,
        uint256 publicKey,
        address newOwnerAddress,
        bytes memory signature
    ) public {}

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

    function verify(
        uint256 tokenId,
        bytes memory publicKey,
        bytes memory signature
    ) public view returns (bool) {
        (address recovered, ECDSAUpgradeable.RecoverError error) = recover(tokenId, publicKey, signature);
        return
            error == ECDSAUpgradeable.RecoverError.NoError &&
            recovered == ethAddress(publicKey) &&
            tokenOwners[tokenId] == zilAddress(publicKey);
    }

    function recover(
        uint256 tokenId,
        bytes memory publicKey,
        bytes memory signature
    ) public view returns (address recovered, ECDSAUpgradeable.RecoverError error) {
        return ECDSAUpgradeable.tryRecover(ethSignedMessage(tokenId, publicKey), signature);
    }

    function message(uint256 tokenId, bytes memory publicKey) public view returns (bytes32) {
        return keccak256(abi.encodePacked(block.chainid, tokenId, publicKey));
    }

    function ethSignedMessage(uint256 tokenId, bytes memory publicKey) public view returns (bytes32) {
        return message(tokenId, publicKey).toEthSignedMessageHash();
    }

    function _msgSender() internal view override(ERC2771Context) returns (address) {
        return super._msgSender();
    }

    function _msgData() internal view override(ERC2771Context) returns (bytes calldata) {
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
}
