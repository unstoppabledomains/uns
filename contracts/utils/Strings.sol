// @author Unstoppable Domains, Inc.
// @date December 22nd, 2021

pragma solidity ^0.8.0;

library Strings {
    struct slice {
        uint _len;
        uint _ptr;
    }

    /**
     * @dev Returns a slice containing the entire string.
     * @param self The string to make a slice from.
     * @return A newly allocated slice containing the entire string.
     */
    function toSlice(string memory self) internal pure returns (slice memory) {
        uint ptr;
        /* solium-disable-next-line security/no-inline-assembly */
        assembly { ptr := add(self, 0x20) }
        return slice(bytes(self).length, ptr);
    }

    /**
     * @dev Returns the keccak-256 hash of the slice.
     * @param self The slice to hash.
     * @return ret The hash of the slice.
     */
    function keccak(slice memory self) internal pure returns (bytes32 ret) {
        /* solium-disable-next-line security/no-inline-assembly */
        assembly {
            ret := keccak256(mload(add(self, 32)), mload(self))
        }
    }

    /**
     * @dev Returns the sub of the slice.
     * @param self The slice to hash.
     * @param index The index of slice for sub ptr.
     * @param len The sub slice length.
     * @return The sub of the slice.
     */
    function sub(slice memory self, uint index, uint len) internal pure returns (slice memory) {
        return slice(len, self._ptr + index);
    }
}
