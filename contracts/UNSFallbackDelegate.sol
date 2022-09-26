pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol';

contract UNSFallbackDelegate is ERC721Upgradeable {
    event Foo(uint256 indexed tokenId);

    function foo(uint256 tokenId) external {
        emit Foo(tokenId);
    }
}
