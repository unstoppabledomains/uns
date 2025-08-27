pragma solidity 0.8.24;

import {AdvancedOrder, CriteriaResolver} from 'seaport-types/src/lib/ConsiderationStructs.sol';

interface ILTOCustody {
    function getLtoCustodyId(address seller, address buyer, uint256 tokenId, uint256 counter) external pure returns (uint256);
    function initiateLTOFromOrder(
        AdvancedOrder calldata advancedOrder,
        CriteriaResolver[] calldata criteriaResolvers,
        bytes32 fulfillerConduitKey,
        address recipient
    ) external;
    function initiateLTO(address seller, address buyer, uint256 tokenId) external;
    function transferSeller(uint256 ltoId, address seller) external;
    function transferBuyer(uint256 ltoId, address buyer) external;
    function complete(uint256 ltoId) external;
    function cancel(uint256 ltoId) external;
    function setMany(string[] calldata keys, string[] calldata values, uint256 tokenId) external;

    event AssetDeposited(uint256 indexed ltoId, uint256 indexed tokenId, address seller, address buyer);
    event AssetReleased(uint256 indexed ltoId, uint256 indexed tokenId, address to);
    event AssetSellerChanged(uint256 indexed ltoId, address seller);
    event AssetBuyerChanged(uint256 indexed ltoId, address buyer);

    error OrderIsNotFulfilled();
    error LTONotInitiated();
    error LTOAlreadyInitiated();
    error InvalidSeller();
    error InvalidBuyer();
    error InvalidRecipient();
    error InvalidOrder();
    error TokenAlreadyInLTO();
}
