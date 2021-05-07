// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './IMintingController.sol';
import '../Registry.sol';
import '../roles/MinterRole.sol';

/**
 * @title MintingController
 * @dev Defines the functions for distribution of Second Level Domains (SLD)s.
 */
contract MintingController is IMintingController, MinterRole {
    Registry internal _registry;

    constructor(Registry registry_) {
        _registry = registry_;
    }

    function registry() external view returns (address) {
        return address(_registry);
    }

    function mintSLD(address to, string memory label) public override onlyMinter {
        _registry.controlledMintChild(to, _registry.root(), label);
    }

    function safeMintSLD(address to, string calldata label) external override {
        safeMintSLD(to, label, '');
    }

    function safeMintSLD(address to, string memory label, bytes memory _data) public override onlyMinter {
        _registry.controlledSafeMintChild(to, _registry.root(), label, _data);
    }

    function mintSLDWithRecords(address to, string memory label, string[] memory keys, string[] memory values) public override {
        mintSLD(to, label);
        uint256 tokenId = _registry.childIdOf(_registry.root(), label);
        _registry.preconfigure(keys, values, tokenId);
    }
}
