// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import './IERC1967.sol';

interface IMintingManager is IERC1967 {
    event NewTld(uint256 indexed tokenId, string tld);
    event RemoveTld(uint256 indexed tokenId);

    struct BulkSLDIssueRequest {
        address to;
        string label;
        uint256 tld;
    }

    /**
     * @dev Adds new TLD
     */
    function addTld(string calldata tld) external;

    /**
     * @dev Removes TLD
     */
    function removeTld(uint256 tokenId) external;

    /**
     * @dev Issues a domain with records.
     * @param to address to issue the new SLD or subdomain to.
     * @param labels array of SLD or subdomain name labels splitted by '.' to issue.
     * @param keys Record keys.
     * @param values Record values.
     * @param withReverse Flag indicating whether to install reverse resolution
     */
    function issueWithRecords(
        address to,
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values,
        bool withReverse
    ) external;

    /**
     * @dev Issues a SLD in bulk
     * @param requests List of requests for domains to issue
     */
    function bulkIssue(BulkSLDIssueRequest[] calldata requests) external;

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
