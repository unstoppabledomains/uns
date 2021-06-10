// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ICryptoSLDMinter {
    function mintSLD(address to, string calldata label) external;

    function safeMintSLD(address to, string calldata label) external;

    function safeMintSLD(address to, string calldata label, bytes calldata _data) external;

    function mintSLDWithResolver(address to, string memory label, address resolver) external;
}
