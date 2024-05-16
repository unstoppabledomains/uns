// @author Unstoppable Domains, Inc.
// @date April 25th, 2024

pragma solidity 0.8.24;

import {AdvancedOrder, CriteriaResolver} from 'seaport-types/src/lib/ConsiderationStructs.sol';

error OrderIsNotFulfiled();
error RecipientIsZeroAddress();
error InvalidZone();

interface ISeaportProxyBuyer {
    /**
     * @dev Fill an order, fully or partially, with an arbitrary number of
     *         items for offer and consideration alongside criteria resolvers
     *         containing specific token identifiers and associated proofs.
     *
     * @param advancedOrder       The order to fulfill along with the fraction
     *                            of the order to attempt to fill. Note that
     *                            both the offerer and the fulfiller must first
     *                            approve this contract (or their preferred
     *                            conduit if indicated by the order) to transfer
     *                            any relevant tokens on their behalf and that
     *                            contracts must implement `onERC1155Received`
     *                            to receive ERC1155 tokens as consideration.
     *                            Also note that all offer and consideration
     *                            components must have no remainder after
     *                            multiplication of the respective amount with
     *                            the supplied fraction for the partial fill to
     *                            be considered valid.
     * @param criteriaResolvers   An array where each element contains a
     *                            reference to a specific offer or
     *                            consideration, a token identifier, and a proof
     *                            that the supplied token identifier is
     *                            contained in the merkle root held by the item
     *                            in question's criteria element. Note that an
     *                            empty criteria indicates that any
     *                            (transferable) token identifier on the token
     *                            in question is valid and that no associated
     *                            proof needs to be supplied.
     * @param fulfillerConduitKey A bytes32 value indicating what conduit, if
     *                            any, to source the fulfiller's token approvals
     *                            from. The zero hash signifies that no conduit
     *                            should be used, with direct approvals set on
     *                            Consideration.
     * @param recipient           The intended recipient for all received items,
     *                            with `address(0)` indicating that the caller
     *                            should receive the items.
     *
     * @return fulfilled A boolean indicating whether the order has been
     *                   successfully fulfilled.
     */
    function fulfillAdvancedOrder(
        AdvancedOrder calldata advancedOrder,
        CriteriaResolver[] calldata criteriaResolvers,
        bytes32 fulfillerConduitKey,
        address recipient
    ) external returns (bool fulfilled);

    /**
     * @dev Withdraw USDC from the contract balance.
     *
     * @param token               Token to withdraw
     * @param recipient           Recipient of the USDC on contract balance
     * @param amount              Amount of USDC to withdraw
     */
    function withdraw(address token, address recipient, uint256 amount) external;

    /**
     * @dev Approve USDC for the contract.
     *
     * @param token               Token to approve
     */
    function approve(address token) external;

    /**
     * @dev Pause the contract.
     */
    function pause() external;

    /**
     * @dev Unpause the contract.
     */
    function unpause() external;
}
