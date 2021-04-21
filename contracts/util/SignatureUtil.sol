pragma solidity 0.5.12;

import '../Registry.sol';
import '@openzeppelin/contracts/cryptography/ECDSA.sol';

// solium-disable error-reason

contract SignatureUtil {
    using ECDSA for bytes32;

    // Mapping from owner to a nonce
    mapping (uint256 => uint256) internal _nonces;

    Registry internal _registry;

    constructor(Registry registry) public {
        _registry = registry;
    }

    function registry() external view returns (address) {
        return address(_registry);
    }

    /**
     * @dev Gets the nonce of the specified address.
     * @param tokenId token ID for nonce query
     * @return nonce of the given address
     */
    function nonceOf(uint256 tokenId) external view returns (uint256) {
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
            "INVALID_SIGNATURE"
        );

        _nonces[tokenId] += 1;
    }

}
