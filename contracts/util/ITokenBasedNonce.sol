// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ITokenBasedNonce {
    /**
     * @dev Returns the given owners' nonce.
     * @param tokenId token ID to query the nonce of
     * @return uint256 nonce of the owner
     */
    function nonceOf(uint256 tokenId) external view returns (uint256);
}
