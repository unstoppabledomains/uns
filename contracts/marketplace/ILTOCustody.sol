pragma solidity 0.8.24;

import {AdvancedOrder, CriteriaResolver} from 'seaport-types/src/lib/ConsiderationStructs.sol';

interface ILTOCustody {
    function initiateLTOFromOrder(
        uint256 ltoId,
        AdvancedOrder calldata advancedOrder,
        CriteriaResolver[] calldata criteriaResolvers,
        bytes32 fulfillerConduitKey,
        address recipient
    ) external;
    function initiateLTO(uint256 ltoId, address seller, address buyer, uint256 tokenId) external;
    function transferSeller(uint256 ltoId, address seller) external;
    function transferBuyer(uint256 ltoId, address buyer) external;
    function complete(uint256 ltoId) external;
    function cancel(uint256 ltoId) external;
    function setMany(uint256 ltoId, string[] calldata keys, string[] calldata values) external;
    function getLTOData(uint256 ltoId) external view returns (address seller, address buyer, uint256 tokenId, bool isFinalized);

    event AssetDeposited(uint256 indexed ltoId, uint256 indexed tokenId, address seller, address buyer);
    event AssetReleased(uint256 indexed ltoId, uint256 indexed tokenId, address to);
    event AssetSellerChanged(uint256 indexed ltoId, address seller);
    event AssetBuyerChanged(uint256 indexed ltoId, address buyer);

    error OrderIsNotFulfilled();
    error LTONotInitiated();
    error LTOAlreadyInitiated();
    error InvalidSeller();
    error InvalidBuyer();
    error InvalidLTOId();
    error InvalidRecipient();
    error InvalidOrder();
    error TokenAlreadyInLTO();
}
