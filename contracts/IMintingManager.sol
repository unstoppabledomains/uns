// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import './IERC1967.sol';

interface IMintingManager is IERC1967 {
    event NewTld(uint256 indexed tokenId, string tld);
    event RemoveTld(uint256 indexed tokenId);

    event DomainPurchase(uint256 indexed tokenId, address indexed sender, address indexed owner, uint256 price, address token);
    event Withdrawal(address recepient, uint256 value, address token);

    /**
     * @dev Adds new TLD
     */
    function addTld(string calldata tld, bool isExpirable) external;

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
     * @dev Issues an expirable domain with records.
     * @param to address to issue the new SLD or subdomain to.
     * @param labels array of SLD or subdomain name labels splitted by '.' to issue.
     * @param keys Record keys.
     * @param values Record values.
     * @param expiry Token expiration timestamp
     * @param withReverse Flag indicating whether to install reverse resolution
     */
    function issueExpirableWithRecords(
        address to,
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values,
        uint64 expiry,
        bool withReverse
    ) external;

    /**
     * @dev Renews a domain.
     * @param expiry Token new expiration timestamp
     * @param tokenId uint256 ID of the token
     */
    function renew(uint64 expiry, uint256 tokenId) external;

    /**
     * @dev Revokes an expirable domain.
     * @param tokenId uint256 ID of the token
     */
    function revoke(uint256 tokenId) external;

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
     * @dev Purchases a SLD using native token.
     * @param owner Address to mint the new SLD to
     * @param labels Array of SLD or subdomain name labels splitted by '.' to issue.
     * @param keys Record keys.
     * @param values Record values.
     * @param expiry Request expiration timestamp
     * @param price Domain purchase request price
     * @param signature Domain purchase request signature
     */
    function buy(
        address owner,
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values,
        uint64 expiry,
        uint256 price,
        bytes calldata signature
    ) external payable;

    /**
     * @dev Purchases a SLD using ERC20 tokens
     * @param owner Address to mint the new SLD to
     * @param labels Array of SLD or subdomain name labels splitted by '.' to issue.
     * @param keys Record keys.
     * @param values Record values.
     * @param token Address of ERC20 token
     * @param expiry Request expiration timestamp
     * @param price Domain purchase request price
     * @param signature Domain purchase request signature
     */
    function buyForErc20(
        address owner,
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values,
        uint64 expiry,
        address token,
        uint256 price,
        bytes calldata signature
    ) external;

    /**
     * @dev Withdraws funds
     * @param recepient Address withdraw the funds to
     */
    function withdraw(address recepient) external;

    /**
     * @dev Withdraws ERC20 funds
     * @param token ERC20 token address
     * @param recepient Address withdraw the funds to
     */
    function withdraw(address token, address recepient) external;

    /**
     * @dev Function to set the token URI Prefix for all tokens.
     * @param prefix string URI to assign
     */
    function setTokenURIPrefix(string calldata prefix) external;
}
