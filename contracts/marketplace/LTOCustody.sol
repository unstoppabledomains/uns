// @author Unstoppable Domains, Inc.

pragma solidity 0.8.24;

import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import {AdvancedOrder, CriteriaResolver, OrderType, ItemType, OfferItem, ConsiderationItem} from 'seaport-types/src/lib/ConsiderationStructs.sol';
import '../metatx/Forwarder.sol';
import '../IUNSRegistry.sol';
import './LTOCustodyAdminRole.sol';
import './SeaportProxyBuyer.sol';
import './ILTOCustody.sol';
import '../IMintingManager.sol';

/**
 * @title LTOCustody
 * @author Unstoppable Domains, Inc.
 * @dev Custody contract for LTO marketplace sales.
 */
contract LTOCustody is
    Initializable,
    Forwarder,
    ERC2771RegistryContext,
    ReentrancyGuardUpgradeable,
    PausableUpgradeable,
    LTOCustodyAdminRole,
    ILTOCustody
{
    IUNSRegistry public registry;
    SeaportProxyBuyer public seaportProxyBuyer;
    IMintingManager public mintingManager;

    struct LTOAsset {
        address seller;
        address buyer;
        uint256[] tokenIds;
        bool isFinalized;
    }

    // lto id => asset
    mapping(uint256 => LTOAsset) public ltoAssets;
    // token id => lto id
    mapping(uint256 => uint256) public tokenLTOs;
    // token id => counter
    mapping(uint256 => uint256) public tokenLtoIdCounter;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(IUNSRegistry _registry, IMintingManager _mintingManager, SeaportProxyBuyer _seaportProxyBuyer) public initializer {
        __Forwarder_init_unchained();
        __Ownable_init_unchained();
        __AccessControl_init_unchained();
        __LTOCustodyAdminRole_init_unchained();
        __ReentrancyGuard_init_unchained();
        __Pausable_init_unchained();
        __ERC2771RegistryContext_init_unchained();
        registry = _registry;
        mintingManager = _mintingManager;
        seaportProxyBuyer = _seaportProxyBuyer;
    }

    function isLTOInitiated(uint256 ltoId) public view returns (bool) {
        return ltoAssets[ltoId].tokenIds.length != 0 && !ltoAssets[ltoId].isFinalized;
    }

    function isTokenInLTOCustody(uint256 tokenId) public view returns (bool) {
        return tokenLTOs[tokenId] != 0 && registry.ownerOf(tokenId) == address(this);
    }

    function getLtoCustodyId(uint256[] memory tokenIds, uint256[] memory counters) public pure returns (uint256) {
        return uint256(keccak256(abi.encode(tokenIds, counters)));
    }

    function getLtoCsutodyTokenCount(uint256 ltoId) public view returns (uint256) {
        return ltoAssets[ltoId].tokenIds.length;
    }

    function getLtoCsutodyTokenId(uint256 ltoId, uint256 index) public view returns (uint256) {
        return ltoAssets[ltoId].tokenIds[index];
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

    function _msgSender() internal view override(ContextUpgradeable, ERC2771RegistryContext) returns (address) {
        return ERC2771RegistryContext._msgSender();
    }

    function _msgData() internal view override(ContextUpgradeable, ERC2771RegistryContext) returns (bytes calldata) {
        return ERC2771RegistryContext._msgData();
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @notice Initiates the LTO custody of an asset from a Seaport order.
     * @param advancedOrder The Seaport order.
     * @param criteriaResolvers The criteria resolvers.
     * @param fulfillerConduitKey The fulfiller conduit key.
     * @param recipient The recipient address.
     */
    function initiateLTOFromOrder(
        AdvancedOrder calldata advancedOrder,
        CriteriaResolver[] calldata criteriaResolvers,
        bytes32 fulfillerConduitKey,
        address recipient
    ) external nonReentrant onlyCustodyAdmin whenNotPaused {
        (address seller, address buyer, uint256 tokenId) = _parseOrderData(advancedOrder, recipient);
        uint256 ltoId = _initiateLTO(seller, buyer, tokenId);

        // substitute the recipient with the custody contract address to receive the asset. We've saved the original recipient in the lto data.
        seaportProxyBuyer.fulfillAdvancedOrder(advancedOrder, criteriaResolvers, fulfillerConduitKey, address(this));

        emit AssetDeposited(ltoId, tokenId, seller, buyer);
    }

    /**
     * @notice Parses the order data to get the seller, buyer and token ID for the LTO.
     * @param advancedOrder The Seaport order.
     * @param recipient The recipient address of the seaport order.
     * @return seller The seller address.
     * @return buyer The buyer address.
     * @return tokenId The token ID.
     */
    function _parseOrderData(
        AdvancedOrder calldata advancedOrder,
        address recipient
    ) private view returns (address seller, address buyer, uint256 tokenId) {
        // only offers are supported for now
        if (advancedOrder.parameters.offer.length == 1) {
            OfferItem calldata offer = advancedOrder.parameters.offer[0];
            if (offer.itemType == ItemType.ERC721 && offer.token == address(registry)) {
                return (advancedOrder.parameters.offerer, recipient, offer.identifierOrCriteria);
            }
        }
        // we couldn't find a domain to lock -> the order is invalid
        revert InvalidOrder();
    }

    /**
     * @notice Initiates the LTO custody of an asset.
     * @param seller The seller address.
     * @param buyer The buyer address.
     * @param tokenId The token ID.
     */
    function initiateLTO(address seller, address buyer, uint256 tokenId) external nonReentrant onlyCustodyAdmin whenNotPaused {
        uint256 ltoId = _initiateLTO(seller, buyer, tokenId);

        if (registry.ownerOf(tokenId) != address(this)) {
            registry.transferFrom(seller, address(this), tokenId);
        }

        emit AssetDeposited(ltoId, tokenId, seller, buyer);
    }

    function _initiateLTO(address seller, address buyer, uint256 tokenId) private returns (uint256) {
        if (seller == address(0)) {
            revert InvalidSeller();
        }
        if (buyer == address(0)) {
            revert InvalidBuyer();
        }
        if (isTokenInLTOCustody(tokenId)) {
            revert TokenAlreadyInLTO();
        }

        uint256[] memory tokenIds = new uint256[](1);
        tokenIds[0] = tokenId;
        uint256[] memory counters = new uint256[](1);
        counters[0] = tokenLtoIdCounter[tokenId];
        uint256 ltoId = getLtoCustodyId(tokenIds, counters);
        ltoAssets[ltoId] = LTOAsset({seller: seller, buyer: buyer, tokenIds: tokenIds, isFinalized: false});
        tokenLTOs[tokenId] = ltoId;
        tokenLtoIdCounter[tokenId]++;
        return ltoId;
    }

    /**
     * @notice Transfer the LTO custody asset to a new seller.
     * @param ltoId The LTO ID.
     * @param seller The new seller address.
     */
    function transferSeller(uint256 ltoId, address seller) external onlyCustodyAdmin whenNotPaused {
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
     * @notice Transfer the LTO custody asset to a new buyer.
     * @param ltoId The LTO ID.
     * @param buyer The new buyer address.
     */
    function transferBuyer(uint256 ltoId, address buyer) external onlyCustodyAdmin whenNotPaused {
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
     * @notice Completes the LTO custody of an asset and transfers it to the buyer.
     * @param ltoId The LTO ID.
     */
    function complete(uint256 ltoId) external onlyCustodyAdmin whenNotPaused {
        if (!isLTOInitiated(ltoId)) {
            revert LTONotInitiated();
        }
        for (uint256 i = 0; i < ltoAssets[ltoId].tokenIds.length; i++) {
            _releaseAsset(ltoAssets[ltoId].tokenIds[i], ltoAssets[ltoId].buyer);
        }
        ltoAssets[ltoId].isFinalized = true;
    }

    /**
     * @notice Cancels the LTO custody of an asset and transfers it back to the seller.
     * @param ltoId The LTO ID.
     */
    function cancel(uint256 ltoId) external onlyCustodyAdmin whenNotPaused {
        if (!isLTOInitiated(ltoId)) {
            revert LTONotInitiated();
        }
        for (uint256 i = 0; i < ltoAssets[ltoId].tokenIds.length; i++) {
            _releaseAsset(ltoAssets[ltoId].tokenIds[i], ltoAssets[ltoId].seller);
        }
        ltoAssets[ltoId].isFinalized = true;
    }

    /**
     * Revokes a specific NFT from LTO custody to the minting manager contract.
     * Finalizes the LTO if no assets are left in custody.
     * @param tokenId the token ID to revoke
     */
    function revokeAsset(uint256 tokenId) external onlyCustodyAdmin nonReentrant whenNotPaused {
        uint256 ltoId = tokenLTOs[tokenId];
        if (!isTokenInLTOCustody(tokenId)) {
            revert LTONotInitiated();
        }
        _releaseAsset(tokenId, address(mintingManager));
        // currently only one asset is supported per LTO so we finalize it immediately
        ltoAssets[ltoId].isFinalized = true;
    }

    function _releaseAsset(uint256 tokenId, address to) private {
        uint256 ltoId = tokenLTOs[tokenId];
        delete tokenLTOs[tokenId];

        // do not attepmt to transfer the asset if it's not in custody
        // the asset may be revoked externally
        if (registry.ownerOf(tokenId) == address(this)) {
            registry.transferFrom(address(this), to, tokenId);
            emit AssetReleased(ltoId, tokenId, to);
        }
    }

    /**
     * @notice Sets many records for a given token ID.
     * @param keys The keys to set.
     * @param values The values to set.
     * @param tokenId The token ID.
     * @param resetRecords Whether to reset the records.
     */
    function setRecords(
        string[] calldata keys,
        string[] calldata values,
        uint256 tokenId,
        bool resetRecords
    ) external onlyLTOBuyer(tokenLTOs[tokenId]) whenNotPaused {
        if (resetRecords) {
            registry.reconfigure(keys, values, tokenId);
        } else {
            registry.setMany(keys, values, tokenId);
        }
    }
}
