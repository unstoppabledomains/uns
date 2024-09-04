// @author Unstoppable Domains, Inc.
// @date April 25th, 2024

pragma solidity ^0.8.24;

import {Initializable} from '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import {ContextUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import {ReentrancyGuardUpgradeable} from '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import {PausableUpgradeable} from '@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol';
import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {ERC2771RegistryContext} from '../metatx/ERC2771RegistryContext.sol';
import {Forwarder} from '../metatx/Forwarder.sol';
import {MinterRole} from '../roles/MinterRole.sol';
import {ISeaportProxyBuyer, OrderIsNotFulfiled, RecipientIsZeroAddress, InvalidZone} from './ISeaportProxyBuyer.sol';
import {ConsiderationInterface} from 'seaport-types/src/interfaces/ConsiderationInterface.sol';
import {AdvancedOrder, CriteriaResolver, OrderComponents, OrderParameters, ZoneParameters} from 'seaport-types/src/lib/ConsiderationStructs.sol';

contract SeaportProxyBuyer is
    Initializable,
    ContextUpgradeable,
    ReentrancyGuardUpgradeable,
    ERC2771RegistryContext,
    Forwarder,
    MinterRole,
    PausableUpgradeable,
    ISeaportProxyBuyer
{
    string public constant NAME = 'Seaport Proxy Buyer';
    string public constant VERSION = '0.1.0';

    ConsiderationInterface private _seaport;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(ConsiderationInterface seaport) public initializer {
        _seaport = seaport;

        __ReentrancyGuard_init_unchained();
        __Context_init_unchained();
        __ERC2771RegistryContext_init_unchained();
        __Forwarder_init_unchained();
        __Ownable_init_unchained();
        __MinterRole_init_unchained();
        __Pausable_init_unchained();
    }

    function fulfillAdvancedOrder(
        AdvancedOrder calldata advancedOrder,
        CriteriaResolver[] calldata criteriaResolvers,
        bytes32 fulfillerConduitKey,
        address recipient
    ) external onlyMinter nonReentrant whenNotPaused returns (bool fulfilled) {
        if (recipient == address(0)) {
            revert RecipientIsZeroAddress();
        }
        if (advancedOrder.parameters.zone != address(this)) {
            revert InvalidZone();
        }

        _protectTokenOperation(
            uint256(
                _seaport.getOrderHash(
                    OrderComponents({
                        offerer: advancedOrder.parameters.offerer,
                        zone: advancedOrder.parameters.zone,
                        offer: advancedOrder.parameters.offer,
                        consideration: advancedOrder.parameters.consideration,
                        orderType: advancedOrder.parameters.orderType,
                        startTime: advancedOrder.parameters.startTime,
                        endTime: advancedOrder.parameters.endTime,
                        zoneHash: advancedOrder.parameters.zoneHash,
                        salt: advancedOrder.parameters.salt,
                        conduitKey: advancedOrder.parameters.conduitKey,
                        counter: _seaport.getCounter(advancedOrder.parameters.offerer)
                    })
                )
            )
        );

        fulfilled = _seaport.fulfillAdvancedOrder(advancedOrder, criteriaResolvers, fulfillerConduitKey, recipient);
        if (!fulfilled) {
            revert OrderIsNotFulfiled();
        }
    }

    function validateOrder(ZoneParameters calldata) external view override whenNotPaused returns (bytes4 validOrderMagicValue) {
        validOrderMagicValue = ISeaportProxyBuyer.validateOrder.selector;
    }

    function approve(address token) external onlyOwner nonReentrant {
        IERC20(token).approve(address(_seaport), type(uint256).max);
    }

    function withdraw(address token, address recipient, uint256 amount) external onlyOwner nonReentrant {
        IERC20(token).transfer(recipient, amount);
    }

    function pause() external onlyOwner whenNotPaused {
        _pause();
    }

    function unpause() external onlyOwner whenPaused {
        _unpause();
    }

    function _msgSender() internal view override(ContextUpgradeable, ERC2771RegistryContext) returns (address) {
        return super._msgSender();
    }

    function _msgData() internal view override(ContextUpgradeable, ERC2771RegistryContext) returns (bytes calldata) {
        return super._msgData();
    }

    function _protectTokenOperation(uint256 tokenId) internal {
        if (isTrustedForwarder(msg.sender)) {
            _validateForwardedToken(tokenId);
        } else {
            _invalidateNonce(tokenId);
        }
    }

    uint256[50] private __gap;
}
