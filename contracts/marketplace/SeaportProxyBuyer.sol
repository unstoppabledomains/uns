// @author Unstoppable Domains, Inc.
// @date April 25th, 2024

pragma solidity ^0.8.0;

import {Initializable} from '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import {ContextUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import {ReentrancyGuardUpgradeable} from '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import {PausableUpgradeable} from '@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol';
import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {InvalidForwardedToken, ERC2771RegistryContext} from '../metatx/ERC2771RegistryContext.sol';
import {Forwarder} from '../metatx/Forwarder.sol';
import {MinterRole} from '../roles/MinterRole.sol';
import {ISeaportProxyBuyer, OrderIsNotFulfiled, RecipientIsZeroAddress} from './ISeaportProxyBuyer.sol';
import {ConsiderationInterface} from 'seaport-types/src/interfaces/ConsiderationInterface.sol';
import {AdvancedOrder, CriteriaResolver} from 'seaport-types/src/lib/ConsiderationStructs.sol';

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
    string public constant VERSION = '0.0.1';

    ConsiderationInterface private _seaport;
    IERC20 private _usdc;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(ConsiderationInterface seaport, IERC20 usdc) public initializer {
        _seaport = seaport;
        _usdc = usdc;
        _usdc.approve(address(_seaport), type(uint256).max);

        __ReentrancyGuard_init_unchained();
        __ERC2771RegistryContext_init_unchained();
        __Forwarder_init_unchained();
        __Ownable_init_unchained();
        __MinterRole_init_unchained();
        __Pausable_init_unchained();
    }

    function _msgSender() internal view override(ContextUpgradeable, ERC2771RegistryContext) returns (address) {
        return super._msgSender();
    }

    function _msgData() internal view override(ContextUpgradeable, ERC2771RegistryContext) returns (bytes calldata) {
        return super._msgData();
    }

    function fulfillAdvancedOrder(
        AdvancedOrder calldata advancedOrder,
        CriteriaResolver[] calldata criteriaResolvers,
        bytes32 fulfillerConduitKey,
        address recipient
    ) external override onlyMinter nonReentrant whenNotPaused returns (bool fulfilled) {
        // todo put TokenId in extradata to use protectTokenOperation ? - clarify
        if (recipient == address(0)) {
            revert RecipientIsZeroAddress();
        }
        fulfilled = _seaport.fulfillAdvancedOrder(advancedOrder, criteriaResolvers, fulfillerConduitKey, recipient);
        if (!fulfilled) {
            revert OrderIsNotFulfiled();
        }
        return fulfilled;
    }

    function withdraw(address recipient, uint256 amount) external onlyOwner nonReentrant whenNotPaused {
        _usdc.transfer(recipient, amount);
    }

    function pause() external onlyOwner whenNotPaused {
        _pause();
    }

    function unpause() external onlyOwner whenPaused {
        _unpause();
    }

    uint256[47] __gap;
}
