// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '../IRegistry.sol';
import '../roles/BulkWhitelistedRole.sol';

contract DomainZoneOperator is BulkWhitelistedRole {
    event MintChild(uint256 indexed tokenId, uint256 indexed parentTokenId, string label);

    IRegistry internal _registry;

    constructor(IRegistry registry_, address[] memory accounts) {
        _registry = registry_;
        _bulkAddWhitelisted(accounts);
    }

    function mintChild(address to, uint256 tokenId, string memory label, string[] memory keys, string[] memory values) public onlyWhitelisted {
        uint256 childTokenId = _registry.childIdOf(tokenId, label);
        if (keys.length > 0) {
            _registry.mintChild(address(this), tokenId, label);
            _registry.reconfigure(keys, values, childTokenId);
            _registry.setOwner(to, childTokenId);
        } else {
            _registry.mintChild(to, tokenId, label);
        }

        emit MintChild(childTokenId, tokenId, label);
    }

    function setMany(string[] memory keys, string[] memory values, uint256 tokenId) public onlyWhitelisted {
        _registry.setMany(keys, values, tokenId);
    }
}