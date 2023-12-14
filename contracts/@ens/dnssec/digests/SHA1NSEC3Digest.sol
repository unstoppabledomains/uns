pragma solidity ^0.8.4;

import '../interfaces/NSEC3Digest.sol';
import '../libraries/SHA1.sol';
import '../libraries/Buffer.sol';

/**
 * @dev Implements the DNSSEC iterated SHA1 digest used for NSEC3 records.
 */
contract SHA1NSEC3Digest is NSEC3Digest {
    using Buffer for Buffer.buffer;

    function hash(
        bytes calldata salt,
        bytes calldata data,
        uint256 iterations
    ) external pure override returns (bytes32) {
        Buffer.buffer memory buf;
        buf.init(salt.length + data.length + 16);

        buf.append(data);
        buf.append(salt);
        bytes20 h = SHA1.sha1(buf.buf);
        if (iterations > 0) {
            buf.truncate();
            buf.appendBytes20(bytes20(0));
            buf.append(salt);

            for (uint256 i = 0; i < iterations; i++) {
                buf.writeBytes20(0, h);
                h = SHA1.sha1(buf.buf);
            }
        }

        return bytes32(h);
    }
}
