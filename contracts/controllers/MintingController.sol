pragma solidity 0.5.12;

import "@openzeppelin/contracts/access/roles/MinterRole.sol";
import "./IMintingController.sol";
import "../Registry.sol";

/**
 * @title MintingController
 * @dev Defines the functions for distribution of Second Level Domains (SLD)s.
 */
contract MintingController is IMintingController, MinterRole {

    Registry internal _registry;

    constructor (Registry registry) public {
        _registry = registry;
    }

    function registry() external view returns (address) {
        return address(_registry);
    }

    function mintSLD(address to, string memory label) public onlyMinter {
        _registry.controlledMintChild(to, _registry.root(), label);
    }

    function safeMintSLD(address to, string calldata label) external {
        safeMintSLD(to, label, "");
    }

    function safeMintSLD(address to, string memory label, bytes memory _data) public onlyMinter {
        _registry.controlledSafeMintChild(to, _registry.root(), label, _data);
    }

    function mintSLDWithResolver(address to, string memory label, address resolver) public onlyMinter {
        _registry.controlledMintChild(to, _registry.root(), label);
        _registry.controlledResolveTo(resolver, _registry.childIdOf(_registry.root(), label));
    }

    function safeMintSLDWithResolver(address to, string calldata label, address resolver) external {
        safeMintSLD(to, label, "");
        _registry.controlledResolveTo(resolver, _registry.childIdOf(_registry.root(), label));
    }

    function safeMintSLDWithResolver(address to, string calldata label, address resolver, bytes calldata _data) external {
        safeMintSLD(to, label, _data);
        _registry.controlledResolveTo(resolver, _registry.childIdOf(_registry.root(), label));
    }

}
