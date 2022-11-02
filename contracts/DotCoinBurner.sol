// @author Unstoppable Domains, Inc.
// @date October 26th, 2022

pragma solidity ^0.8.0;

import './IUNSRegistry.sol';

contract DotCoinBurner {
    /**
     * @dev .coin tld namehash
     *
     * `namehash` = uint256(keccak256(abi.encodePacked(uint256(0x0), keccak256(abi.encodePacked('coin')))))
     */
    uint256 private constant _DOT_COIN_TLD = 0x7674e7282552c15f203b9c4a6025aeaf28176ef7f5451b280f9bada3f8bc98e2;
    address private constant _BURN_ADDRESS = 0x000000000000000000000000000000000000dEaD;
    IUNSRegistry private immutable _unsRegistry;

    event BatchCompleted(uint256 first, uint256 last);

    constructor(IUNSRegistry unsRegistry) {
        _unsRegistry = unsRegistry;
    }

    function burnAll(uint256[] calldata labelHashes) external {
        for (uint256 i = 0; i < labelHashes.length; i++) {
            uint256 tokenId = uint256(keccak256(abi.encode(_DOT_COIN_TLD, labelHashes[i])));
            _unsRegistry.transferFrom(_unsRegistry.ownerOf(tokenId), _BURN_ADDRESS, tokenId);
        }

        if (labelHashes.length > 0) {
            emit BatchCompleted(
                uint256(keccak256(abi.encode(_DOT_COIN_TLD, labelHashes[0]))),
                uint256(keccak256(abi.encode(_DOT_COIN_TLD, labelHashes[labelHashes.length - 1])))
            );
        }
    }
}
