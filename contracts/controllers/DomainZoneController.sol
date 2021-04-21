pragma solidity 0.5.12;
pragma experimental ABIEncoderV2;

import "../util/BulkWhitelistedRole.sol";
import "../IRegistry.sol";
import "../IResolver.sol";

contract DomainZoneController is BulkWhitelistedRole {

    event MintChild(uint256 indexed tokenId, uint256 indexed parentTokenId, string label);

    IRegistry internal _registry;

    constructor (IRegistry registry, address[] memory accounts) public {
        _registry = registry;
        for (uint256 index = 0; index < accounts.length; index++) {
            _addWhitelisted(accounts[index]);
        }
    }

    function mintChild(address to, uint256 tokenId, string memory label, string[] memory keys, string[] memory values) public onlyWhitelisted {
        address resolver = _registry.resolverOf(tokenId);
        uint256 childTokenId = _registry.childIdOf(tokenId, label);
        if (keys.length > 0) {
            _registry.mintChild(address(this), tokenId, label);
            _registry.resolveTo(resolver, childTokenId);
            IResolver(resolver).reconfigure(keys, values, childTokenId);
            _registry.setOwner(to, childTokenId);
        } else {
            _registry.mintChild(to, tokenId, label);
        }

        emit MintChild(childTokenId, tokenId, label);
    }

    function resolveTo(address to, uint256 tokenId) external onlyWhitelisted {
        _registry.resolveTo(to, tokenId);
    }

    function setMany(string[] memory keys, string[] memory values, uint256 tokenId) public onlyWhitelisted {
        address resolver = _registry.resolverOf(tokenId);
        IResolver(resolver).setMany(keys, values, tokenId);
    }
}
