// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import './IERC1967.sol';

interface IMintingManager is IERC1967 {
    event NewTld(uint256 indexed tokenId, string tld);
    event RemoveTld(uint256 indexed tokenId);

    /**
     * @dev Adds new TLD
     */
    function addTld(string calldata tld) external;

    /**
     * @dev Removes TLD
     */
    function removeTld(uint256 tokenId) external;

    /**
     * @dev Mints a Second Level Domain (SLD).
     * @param to address to mint the new SLD to.
     * @param tld id of parent token.
     * @param label SLD label to mint.
     */
    function mintSLD(
        address to,
        uint256 tld,
        string calldata label
    ) external;

    /**
     * @dev Mints a Second Level Domain (SLD) with records.
     * @param to address to mint the new SLD to.
     * @param tld id of parent token.
     * @param label SLD label to mint.
     * @param keys Record keys.
     * @param values Record values.
     */
    function mintSLDWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external;

    /**
     * @dev Issues a SLD or subdomain with records.
     * @param to address to issue the new SLD or subdomain to.
     * @param labels array of SLD or subdomain name labels splitted by '.' to issue.
     * @param keys Record keys.
     * @param values Record values.
     */
    function issueWithRecords(
        address to,
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values
    ) external;

    /**
     * @dev Claims free domain. The fuction adds prefix to label.
     * @param tld id of parent token
     * @param label SLD label to mint
     */
    function claim(uint256 tld, string calldata label) external;

    /**
     * @dev Claims free domain. The fuction adds prefix to label.
     * @param to address to mint the new SLD to
     * @param tld id of parent token
     * @param label SLD label to mint
     */
    function claimTo(
        address to,
        uint256 tld,
        string calldata label
    ) external;

    /**
     * @dev Claims free domain. The fuction adds prefix to label.
     * @param to address to mint the new SLD to
     * @param tld id of parent token
     * @param label SLD label to mint
     */
    function claimToWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external;

    /**
     * @dev Function to set the token URI Prefix for all tokens.
     * @param prefix string URI to assign
     */
    function setTokenURIPrefix(string calldata prefix) external;
}
