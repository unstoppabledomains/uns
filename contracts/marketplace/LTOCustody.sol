pragma solidity 0.8.24;

import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import {AdvancedOrder, CriteriaResolver} from 'seaport-types/src/lib/ConsiderationStructs.sol';
import '../metatx/Forwarder.sol';
import '../IUNSRegistry.sol';
import './LTOCustodyAdminRole.sol';
import './SeaportProxyBuyer.sol';
import './ILTOCustody.sol';

/**
 * @title MarketplaceCustody
 * @author Unstoppable Domains, Inc.
 * @dev Custody contract for partial marketplace sales.
 */
contract LTOCustody is Initializable, Forwarder, LTOCustodyAdminRole, ReentrancyGuardUpgradeable, PausableUpgradeable, ILTOCustody {
    IUNSRegistry public registry;
    SeaportProxyBuyer public seaportProxyBuyer;

    struct LTOAsset {
        address seller;
        address buyer;
        uint256 tokenId;
        bool isFinalized;
    }

    // custody id => custody asset
    mapping(uint256 => LTOAsset) public ltoAssets;
    // token id => lto id
    mapping(uint256 => uint256) public tokenLTOs;

    function initialize(IUNSRegistry _registry, SeaportProxyBuyer _seaportProxyBuyer) public initializer {
        __Forwarder_init_unchained();
        __Ownable_init_unchained();
        __LTOCustodyAdminRole_init_unchained();
        __ReentrancyGuard_init_unchained();
        registry = _registry;
        seaportProxyBuyer = _seaportProxyBuyer;
    }

    function getLTOData(uint256 ltoId) public view returns (address seller, address buyer, uint256 tokenId, bool isFinalized) {
        LTOAsset memory asset = ltoAssets[ltoId];
        return (asset.seller, asset.buyer, asset.tokenId, asset.isFinalized);
    }

    function getTokenLTO(uint256 tokenId) public view returns (uint256 ltoId) {
        return tokenLTOs[tokenId];
    }

    function isLTOInitiated(uint256 ltoId) public view returns (bool) {
        return ltoAssets[ltoId].tokenId != 0 && !ltoAssets[ltoId].isFinalized;
    }

    modifier onlyLTOBuyer(uint256 ltoId) {
        if (!isLTOInitiated(ltoId)) {
            revert LTONotInitiated();
        }
        if (ltoAssets[ltoId].buyer != _msgSender()) {
            revert Unauthorized();
        }
        _;
    }

    /**
     * @notice Initiates the custody of an asset from a Seaport order.
     * @param ltoId The custody ID.
     * @param advancedOrder The Seaport order.
     * @param criteriaResolvers The criteria resolvers.
     * @param fulfillerConduitKey The fulfiller conduit key.
     * @param recipient The recipient address.
     */
    function initiateLTOFromOrder(
        uint256 ltoId,
        AdvancedOrder calldata advancedOrder,
        CriteriaResolver[] calldata criteriaResolvers,
        bytes32 fulfillerConduitKey,
        address recipient
    ) external onlyCustodyAdmin {
        address seller = advancedOrder.parameters.offerer;
        address buyer = recipient;
        uint256 tokenId = advancedOrder.parameters.offer[0].identifierOrCriteria;
        _initiateLTO(ltoId, seller, buyer, tokenId);

        bool fulfilled = seaportProxyBuyer.fulfillAdvancedOrder(advancedOrder, criteriaResolvers, fulfillerConduitKey, address(this));
        if (!fulfilled) {
            revert OrderIsNotFulfilled();
        }

        if (registry.ownerOf(tokenId) != address(this)) {
            revert OrderIsNotFulfilled();
        }

        emit AssetDeposited(ltoId, tokenId, seller, buyer);
    }

    /**
     * @notice Initiates the custody of an asset.
     * @param ltoId The custody ID.
     * @param seller The seller address.
     * @param buyer The buyer address.
     * @param tokenId The token ID.
     */
    function initiateLTO(uint256 ltoId, address seller, address buyer, uint256 tokenId) public onlyCustodyAdmin whenNotPaused {
        _initiateLTO(ltoId, seller, buyer, tokenId);

        if (registry.ownerOf(tokenId) != address(this)) {
            registry.transferFrom(seller, address(this), tokenId);
        }

        emit AssetDeposited(ltoId, tokenId, seller, buyer);
    }

    function _initiateLTO(uint256 ltoId, address seller, address buyer, uint256 tokenId) private {
        if (seller == address(0)) {
            revert InvalidSeller();
        }
        if (buyer == address(0)) {
            revert InvalidBuyer();
        }
        if (ltoId == 0) {
            revert InvalidLTOId();
        }
        if (isLTOInitiated(ltoId)) {
            revert LTOAlreadyInitiated();
        }
        if (tokenLTOs[tokenId] != 0) {
            revert TokenAlreadyInLTO();
        }

        ltoAssets[ltoId] = LTOAsset({seller: seller, buyer: buyer, tokenId: tokenId, isFinalized: false});
        tokenLTOs[tokenId] = ltoId;
    }

    /**
     * @notice Transfer the custody asset to a new seller.
     * @param ltoId The custody ID.
     * @param seller The new seller address.
     */
    function transferSeller(uint256 ltoId, address seller) public onlyCustodyAdmin whenNotPaused {
        if (!isLTOInitiated(ltoId)) {
            revert LTONotInitiated();
        }
        if (seller == address(0)) {
            revert InvalidSeller();
        }

        ltoAssets[ltoId].seller = seller;

        emit AssetSellerChanged(ltoId, seller);
    }

    /**
     * @notice Transfer the custody asset to a new buyer.
     * @param ltoId The custody ID.
     * @param buyer The new buyer address.
     */
    function transferBuyer(uint256 ltoId, address buyer) public onlyCustodyAdmin whenNotPaused {
        if (!isLTOInitiated(ltoId)) {
            revert LTONotInitiated();
        }
        if (buyer == address(0)) {
            revert InvalidBuyer();
        }

        ltoAssets[ltoId].buyer = buyer;

        emit AssetBuyerChanged(ltoId, buyer);
    }

    /**
     * @notice Completes the custody of an asset and transfers it to the buyer.
     * @param ltoId The custody ID.
     */
    function complete(uint256 ltoId) public onlyCustodyAdmin whenNotPaused {
        releaseAsset(ltoId, ltoAssets[ltoId].buyer);
    }

    /**
     * @notice Cancels the custody of an asset and transfers it back to the seller.
     * @param ltoId The custody ID.
     */
    function cancel(uint256 ltoId) public onlyCustodyAdmin whenNotPaused {
        releaseAsset(ltoId, ltoAssets[ltoId].seller);
    }

    /**
     * Releases a specific NFT from custody.
     * @param ltoId The custody ID.
     * @param to The address to release the asset to.
     */
    function releaseAsset(uint256 ltoId, address to) public onlyCustodyAdmin nonReentrant whenNotPaused {
        if (!isLTOInitiated(ltoId)) {
            revert LTONotInitiated();
        }
        if (to == address(0)) {
            revert InvalidRecipient();
        }

        ltoAssets[ltoId].isFinalized = true;
        registry.transferFrom(address(this), to, ltoAssets[ltoId].tokenId);

        emit AssetReleased(ltoId, ltoAssets[ltoId].tokenId, to);
    }

    /**
     * @notice Sets many records for a given custody ID.
     * @param ltoId The custody ID.
     * @param keys The keys to set.
     * @param values The values to set.
     */
    function setMany(uint256 ltoId, string[] calldata keys, string[] calldata values) public onlyLTOBuyer(ltoId) whenNotPaused {
        if (!isLTOInitiated(ltoId)) {
            revert LTONotInitiated();
        }

        registry.setMany(keys, values, ltoAssets[ltoId].tokenId);
    }
}
