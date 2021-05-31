// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface ISLDMinter {
    /**
     * @dev Minter function that mints a Second Level Domain (SLD).
     * @param to address to mint the new SLD to.
     * @param tld id of parent token.
     * @param label SLD label to mint.
     */
    function mintSLD(address to, uint256 tld, string calldata label) external;

    /**
     * @dev Minter function that safely mints a Second Level Domain (SLD).
     * Implements a ERC721Reciever check unlike mintSLD.
     * @param to address to mint the new SLD to.
     * @param tld id of parent token.
     * @param label SLD label to mint.
     */
    function safeMintSLD(address to, uint256 tld, string calldata label) external;

    /**
     * @dev Minter function that safely mints a Second Level Domain (SLD).
     * Implements a ERC721Reciever check unlike mintSLD.
     * @param to address to mint the new SLD to.
     * @param tld id of parent token.
     * @param label SLD label to mint.
     * @param _data bytes data to send along with a safe transfer check
     */
    function safeMintSLD(address to, uint256 tld, string calldata label, bytes calldata _data) external;

    /**
     * @dev Minter function that mints a Second Level Domain (SLD) with records.
     * @param to address to mint the new SLD to.
     * @param tld id of parent token.
     * @param label SLD label to mint.
     * @param keys Record keys.
     * @param values Record values.
     */
    function mintSLDWithRecords(address to, uint256 tld, string memory label, string[] memory keys, string[] memory values) external;
}
