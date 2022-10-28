// @author Unstoppable Domains, Inc.
// @date October 26th, 2022

pragma solidity ^0.8.0;

import "./IUNSRegistry.sol";

contract DotCoinBurner {
    address private constant burnAddress = 0x000000000000000000000000000000000000dEaD;
    uint256 private constant dotCoinTld = 53579465778074300087863657375817737732021732340969439625258188808628534548706;

    event BatchCompleted(uint256 first, uint256 last);

    IUNSRegistry private immutable _unsRegistry;

    constructor(IUNSRegistry unsRegistry) {
        _unsRegistry = unsRegistry;
    }

    function burnAll(bytes32[] calldata labelHashes) external {
        uint256 firstTokenId;
        uint256 lastTokenId;
        for (uint256 i = 0; i < labelHashes.length; i++) {
            uint256 tokenId = uint256(keccak256(abi.encodePacked(dotCoinTld, labelHashes[i])));
            _unsRegistry.transferFrom(_unsRegistry.ownerOf(tokenId), burnAddress, tokenId);
            if (i == 0) {
                firstTokenId = tokenId;
            }
            if (i == labelHashes.length - 1) {
                lastTokenId = tokenId;
            }
        }

        emit BatchCompleted(firstTokenId, lastTokenId);
    }
}
