// @author Unstoppable Domains, Inc.
// @date May 30th, 2023

pragma solidity ^0.8.0;

import {IERC1155ReceiverUpgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol';

error Unauthorised(uint256 tokenId, address addr);
error InvalidToken(uint256 tokenId);
error UnknownToken(uint256 tokenId);
error CustodyNotEnoughBalance();
error OperationProhibited();
error InvalidForwardedToken(uint256 tokenId);

interface IENSCustody is IERC1155ReceiverUpgradeable {
    event Parked(uint256 indexed tokenId, address indexed owner);

    /**
     * @dev Return rent price for the given name and duration.
     * @param name The name of a domain.
     * @param duration The duration of a registration.
     */
    function rentPrice(string calldata name, uint256 duration) external view returns (uint256);

    /**
     * @dev Make commitment.
     * @param name The token ID (keccak256 of the label).
     * @param owner The address of the new owner.
     * @param duration Duration in seconds for the registration.
     * @param secret Secret in order to prevent front-running attack.
     * @param resolver The resolver of the domain, optional.
     * @param data The resolution data, will pass to resolver if present.
     * @param reverseRecord Flag to set primari resolution.
     * @param ownerControlledFuses The fuses
     * @param selfCustody Flag to set custody or forward directly to owner.
     */
    function makeCommitment(
        string memory name,
        address owner,
        uint256 duration,
        bytes32 secret,
        address resolver,
        bytes[] calldata data,
        bool reverseRecord,
        uint16 ownerControlledFuses,
        bool selfCustody
    ) external returns (bytes32);

    /**
     * @dev Add commitment.
     * @param commitment The commitment.
     */
    function commit(bytes32 commitment) external;

    /**
     * @dev Register a name.
     * @param name The token ID (keccak256 of the label).
     * @param owner The address of the new owner.
     * @param duration Duration in seconds for the registration.
     * @param secret Secret in order to prevent front-running attack.
     * @param resolver The resolver of the domain, optional.
     * @param data The resolution data, will pass to resolver if present.
     * @param reverseRecord Flag to set primari resolution.
     * @param ownerControlledFuses The fuses.
     * @param selfCustody Flag to set custody or forward directly to owner.
     */
    function register(
        string calldata name,
        address owner,
        uint256 duration,
        bytes32 secret,
        address resolver,
        bytes[] calldata data,
        bool reverseRecord,
        uint16 ownerControlledFuses,
        bool selfCustody
    ) external;

    /**
     * @dev Renew a name.
     * @param name The name of a domain.
     * @param duration The duration to renew.
     */
    function renew(string calldata name, uint256 duration) external;

    /**
     * @dev Gets the owner of the specified token ID parken in the custody.
     *      Names become unowned when their registration expires.
     * @param tokenId uint256 ID of the token to query the owner of
     * @return address currently marked as the owner of the given token ID
     */
    function ownerOf(uint256 tokenId) external returns (address);

    /**
     * @dev Transfers the ownership of a given token ID to another address.
     * @param to The address to receive the ownership of the given token ID
     * @param tokenId uint256 ID of the token to transfer of
     */
    function safeTransfer(address to, uint256 tokenId) external;

    /**
     * @dev Fallback function to receive ETH.
     */
    receive() external payable;
}
