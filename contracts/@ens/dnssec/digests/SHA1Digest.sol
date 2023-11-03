pragma solidity ^0.8.4;

import '../interfaces/Digest.sol';
import '../libraries/BytesUtils.sol';
import '../libraries/SHA1.sol';

/**
 * @dev Implements the DNSSEC SHA1 digest.
 */
contract SHA1Digest is Digest {
    using BytesUtils for *;

    function verify(bytes calldata data, bytes calldata hash) external pure override returns (bool) {
        require(hash.length == 20, 'Invalid sha1 hash length');
        bytes32 expected = hash.readBytes20(0);
        bytes20 computed = SHA1.sha1(data);
        return expected == computed;
    }
}
