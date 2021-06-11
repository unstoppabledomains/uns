// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ICryptoSLDMinter {
    function mintSLD(address to, string calldata label) external;

    function safeMintSLD(address to, string calldata label) external;

    function safeMintSLD(address to, string calldata label, bytes calldata _data) external;

    function mintSLDWithResolver(address to, string memory label, address resolver) external;

    /**
     * @dev Mints a Second Level Domain (SLD) with resolver.
     * Implements a ERC721Reciever check unlike mintSLD.
     * @param to address to mint the new SLD to.
     * @param label SLD label to mint.
     * @param resolver address.
     */
    function safeMintSLDWithResolver(address to, string calldata label, address resolver) external;

    /**
     * @dev Mints a Second Level Domain (SLD) with records.
     * Implements a ERC721Reciever check unlike mintSLD.
     * @param to address to mint the new SLD to.
     * @param label SLD label to mint.
     * @param resolver address.
     * @param _data bytes data to send along with a safe transfer check.
     */
    function safeMintSLDWithResolver(address to, string calldata label, address resolver, bytes calldata _data) external;
}
