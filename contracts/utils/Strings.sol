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
     * @dev Returns True if `self` contains `value`.
     * @param self The slice to search.
     * @param value The text to search for in `self`.
     * @return True if `value` is found in `self`, false otherwise.
     */
    function contains(slice memory self, slice memory value) internal pure returns (bool) {
        return findPtr(self._len, self._ptr, value._len, value._ptr) != self._ptr;
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
