// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';

import './ITokenBasedNonce.sol';
import './IRegistryProvider.sol';
import '../Registry.sol';

contract SignatureUtil is ITokenBasedNonce, IRegistryProvider {
    using ECDSAUpgradeable for bytes32;

    // Mapping from owner to a nonce
    mapping (uint256 => uint256) internal _nonces;

    Registry internal _registry;

    constructor(Registry registry_) {
        _registry = registry_;
    }

    function registry() public view override returns (address) {
        return address(_registry);
    }

    /**
     * @dev Gets the nonce of the specified address.
     * @param tokenId token ID for nonce query
     * @return nonce of the given address
     */
    function nonceOf(uint256 tokenId) public view override returns (uint256) {
        return _nonces[tokenId];
    }

    function _validate(bytes32 hash, uint256 tokenId, bytes memory signature) internal {
        uint256 nonce = _nonces[tokenId];

        address signer = keccak256(abi.encodePacked(hash, address(this), nonce)).toEthSignedMessageHash().recover(signature);
        require(
            signer != address(0) &&
            _registry.isApprovedOrOwner(
                signer,
                tokenId
            ),
            'INVALID_SIGNATURE'
        );

        _nonces[tokenId] += 1;
    }
}
