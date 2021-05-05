// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;
pragma abicoder v2;

import "./NonFungibleToken.sol";
import "../util/Batchable.sol";
import "@openzeppelin/contracts/utils/Multicall.sol";

/*Multicall, */
contract BatchableNFT is Batchable, NonFungibleToken {
    function _msgSender()
        internal
        view
        override(Batchable, Context)
        returns (address)
    {
        return super._msgSender();
    }

    function mintMany(uint256[] calldata tokenIds) external {
        for (uint256 index = 0; index < tokenIds.length; index++) {
            mint(tokenIds[index]);
        }
    }

    function mintManyWithContext(uint256[] calldata tokenIds) external {
        for (uint256 index = 0; index < tokenIds.length; index++) {
            mint(tokenIds[index]);
        }
    }

    function mintWithContext(uint256 tokenId) external {
        mint(tokenId);
    }
}
