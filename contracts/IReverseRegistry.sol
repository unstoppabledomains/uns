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
     * @dev Sets the reverse record associated with the calling account.
     * @param tokenId The token to set for this address.
     */
    function setReverse(uint256 tokenId) external;

    /**
     * @dev Removes the reverse record associated with the calling account.
     */
    function removeReverse() external;

    /**
     * @dev Returns the reverse record for a given account's reverse record.
     * @param addr The address of the reverse record.
     * @return tokenId The token associated with the address.
     */
    function reverseOf(address addr) external view returns (uint256);
}
