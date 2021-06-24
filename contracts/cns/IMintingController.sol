// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

interface IMintingController {
    function mintSLD(address to, string calldata label) external;

    function safeMintSLD(address to, string calldata label) external;

    function safeMintSLD(
        address to,
        string calldata label,
        bytes calldata data
    ) external;

    function mintSLDWithResolver(
        address to,
        string memory label,
        address resolver
    ) external;

    function safeMintSLDWithResolver(
        address to,
        string calldata label,
        address resolver
    ) external;

    function safeMintSLDWithResolver(
        address to,
        string calldata label,
        address resolver,
        bytes calldata data
    ) external;
}
