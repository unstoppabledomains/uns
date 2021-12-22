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

    function sub(slice memory self, uint index, uint len) internal pure returns (slice memory) {
        return slice(len, self._ptr + index);
    }

    /**
     * @dev Modifies `self` to contain the part of the string from the start of
     *      `self` to the end of the first occurrence of `value`. If `value`
     *      is not found, `self` is set to the empty slice.
     * @param self The slice to search and modify.
     * @param value The text to search for.
     * @return `self`.
     */
    function find(slice memory self, slice memory value) internal pure returns (slice memory) {
        uint ptr = findPtr(self._len, self._ptr, value._len, value._ptr);
        self._len = ptr - self._ptr;
        return self;
    }

    // Returns the memory address of the first byte after the last occurrence of
    // `value` in `self`, or the address of `self` if not found.
    function findPtr(uint selflen, uint selfptr, uint valuelen, uint valueptr) private pure returns (uint) {
        uint ptr;

        if (valuelen <= selflen) {
            bytes32 mask = bytes32(~(2 ** (8 * (32 - valuelen)) - 1));

            bytes32 valuedata;
            /* solium-disable-next-line security/no-inline-assembly */
            assembly { valuedata := and(mload(valueptr), mask) }

            ptr = selfptr + selflen - valuelen;
            bytes32 ptrdata;

            /* solium-disable-next-line security/no-inline-assembly */
            assembly { ptrdata := and(mload(ptr), mask) }

            while (ptrdata != valuedata) {
                if (ptr <= selfptr)
                    return selfptr;
                ptr--;
                /* solium-disable-next-line security/no-inline-assembly */
                assembly { ptrdata := and(mload(ptr), mask) }
            }
            return ptr + valuelen;
        }
        return selfptr;
    }
}
