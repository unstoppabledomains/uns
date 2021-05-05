// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NonFungibleToken is ERC721 {
    constructor() ERC721("Non-Fungible Token", "NFT") {}

    function mint(uint256 tokenId) public {
        _mint(_msgSender(), tokenId);
    }
}
