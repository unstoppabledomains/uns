// @author Unstoppable Domains, Inc.
// @date March 29th, 2022

pragma solidity ^0.8.0;

/**
 * @title Reverse registry interface
 */
interface IReverseRegistry {
    /**
     * @dev Emitted when the reverse record is set.
     */
    event SetReverse(address indexed addr, uint256 indexed tokenId);

    /**
     * @dev Emitted when the reverse record is removed.
     */
    event RemoveReverse(address indexed addr);

    /**
     * Remains for temporary backward compatibility
     * @custom:deprecated
     *
     * @dev Sets the reverse record associated with the calling account.
     * @param tokenId The token to set for this address.
     */
    function setReverse(uint256 tokenId) external;

    /**
     *
     * @dev Sets the reverse record associated with the calling account.
     * @param labels array of domain labels splitted by '.' (for `aaa.bbb.crypto` it will be [`aaa`, `bbb`, `crypto`])
     */
    function setReverse(string[] memory labels) external;

    /**
     * @dev Removes the reverse record associated with the calling account.
     */
    function removeReverse() external;

    /**
     * Remains for temporary backward compatibility
     * @custom:deprecated
     *
     * @dev Returns the reverse record for a given account's reverse record.
     * @param addr The address of the reverse record.
     * @return tokenId The token associated with the address.
     */
    function reverseOf(address addr) external view returns (uint256);

    /**
     * @dev Returns the reverse record for a given account's reverse record.
     * @param addr The address of the reverse record.
     * @return uri Domain name associated with the address.
     */
    function reverseNameOf(address addr) external view returns (string memory);
}
