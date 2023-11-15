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
        bytes memory signature
    ) public {}

    function getSlice(
        bytes memory data,
        uint256 begin,
        uint256 end
    ) public pure returns (bytes memory) {
        bytes memory a = new bytes(end - begin + 1);
        for (uint256 i = 0; i <= end - begin; i++) {
            a[i] = data[i + begin - 1];
        }
        return a;
    }

    function ethAddress(bytes memory publicKey) public pure returns (address) {
        bytes memory hash = abi.encodePacked(keccak256(publicKey));
        return address(uint160(bytes20(getSlice(hash, 13, 32))));
    }

    function zilAddress(bytes memory publicKey) public pure returns (address) {
        bytes memory hash = abi.encodePacked(sha256(compressPublicKey(publicKey)));
        return address(uint160(bytes20(getSlice(hash, 13, 32))));
    }

    function compressPublicKey(bytes memory publicKey) public pure returns (bytes memory) {
        bytes memory x = getSlice(publicKey, 1, 32);
        uint16 lastByte = uint16(bytes2(getSlice(publicKey, 64, 64)));
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
