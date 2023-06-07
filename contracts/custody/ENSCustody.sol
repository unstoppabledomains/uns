// @author Unstoppable Domains, Inc.
// @date May 30th, 2023

pragma solidity ^0.8.0;

import {IPriceOracle} from '@ensdomains/ens-contracts/contracts/ethregistrar/IPriceOracle.sol';
import {IETHRegistrarController} from '@ensdomains/ens-contracts/contracts/ethregistrar/IETHRegistrarController.sol';
import {INameWrapper} from '@ensdomains/ens-contracts/contracts/wrapper/INameWrapper.sol';
import {AccessControlUpgradeable} from '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import {Initializable} from '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import {IERC1155ReceiverUpgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol';
import {ReentrancyGuardUpgradeable} from '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import {IERC165Upgradeable} from '@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol';
import {ContextUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import {StorageSlotUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol';

import {IENSCustody, Unauthorised, InvalidToken, UnknownToken, CustodyNotEnoughBalance, OperationProhibited, InvalidForwardedToken} from './IENSCustody.sol';
import {ERC2771RegistryContext} from '../metatx/ERC2771RegistryContext.sol';
import {Forwarder} from '../metatx/Forwarder.sol';
import {MinterRole} from '../roles/MinterRole.sol';

contract ENSCustody is
    Initializable,
    ContextUpgradeable,
    ReentrancyGuardUpgradeable,
    ERC2771RegistryContext,
    Forwarder,
    MinterRole,
    IENSCustody
{
    string public constant NAME = 'ENS Custody';
    string public constant VERSION = '0.1.0';

    bytes32 private constant _ETH_NODE = 0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae;
    // This is the keccak-256 hash of "ens.owner." subtracted by 1
    bytes32 internal constant _OWNER_PREFIX_SLOT = 0x0a8885dd093a12d378a27df09bde33e3caca641a3d6970e06805fde8e847cb46;
    // This is the keccak-256 hash of "uns.ens_controller" subtracted by 1
    bytes32 internal constant _ENS_CONTROLLER_SLOT = 0x412386de53449251cbf7ce1f4c6a038bf9c0746e62d331b08ef0c3fa7d0ab672;
    // This is the keccak-256 hash of "uns.ens_wrapper" subtracted by 1
    bytes32 internal constant _ENS_WRAPPER_SLOT = 0x60793a5062d506d35cc8f1beda67ee5028c16bfcd9c923d5bfc439c04bd929b1;

    modifier onlyTokenOwner(uint256 tokenId) {
        if (_ownerOf(tokenId) != _msgSender()) {
            revert Unauthorised(tokenId, _msgSender());
        }
        _;
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address controller, address wrapper) public initializer {
        StorageSlotUpgradeable.getAddressSlot(_ENS_CONTROLLER_SLOT).value = controller;
        StorageSlotUpgradeable.getAddressSlot(_ENS_WRAPPER_SLOT).value = wrapper;

        __ReentrancyGuard_init_unchained();
        __ERC2771RegistryContext_init_unchained();
        __Forwarder_init_unchained();
        __Ownable_init_unchained();
        __MinterRole_init_unchained();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControlUpgradeable, IERC165Upgradeable)
        returns (bool)
    {
        return interfaceId == type(IERC1155ReceiverUpgradeable).interfaceId || super.supportsInterface(interfaceId);
    }

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes calldata
    ) public view override returns (bytes4) {
        if (_msgSender() == StorageSlotUpgradeable.getAddressSlot(_ENS_WRAPPER_SLOT).value) {
            return this.onERC1155Received.selector;
        }
        revert OperationProhibited();
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) public view override returns (bytes4) {
        if (_msgSender() == StorageSlotUpgradeable.getAddressSlot(_ENS_WRAPPER_SLOT).value) {
            return this.onERC1155BatchReceived.selector;
        }
        revert OperationProhibited();
    }

    function rentPrice(string calldata name, uint256 duration) external view returns (uint256) {
        IETHRegistrarController _controller = IETHRegistrarController(StorageSlotUpgradeable.getAddressSlot(_ENS_CONTROLLER_SLOT).value);
        IPriceOracle.Price memory price = _controller.rentPrice(name, duration);
        return price.base + price.premium;
    }

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
    ) external view returns (bytes32) {
        IETHRegistrarController _controller = IETHRegistrarController(StorageSlotUpgradeable.getAddressSlot(_ENS_CONTROLLER_SLOT).value);
        return
            _controller.makeCommitment(
                name,
                selfCustody ? owner : address(this),
                duration,
                secret,
                resolver,
                data,
                reverseRecord,
                ownerControlledFuses
            );
    }

    function commit(bytes32 commitment) external override {
        IETHRegistrarController _controller = IETHRegistrarController(StorageSlotUpgradeable.getAddressSlot(_ENS_CONTROLLER_SLOT).value);
        _controller.commit(commitment);
    }

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
    ) external onlyMinter nonReentrant {
        uint256 tokenId = _namehash(name);
        _protectTokenOperation(tokenId);

        _register(name, selfCustody ? owner : address(this), duration, secret, resolver, data, reverseRecord, ownerControlledFuses);

        if (!selfCustody) {
            StorageSlotUpgradeable.getAddressSlot(keccak256(abi.encodePacked(_OWNER_PREFIX_SLOT, tokenId))).value = owner;
            emit Parked(tokenId, owner);
        }
    }

    function renew(string calldata name, uint256 duration) external onlyMinter nonReentrant {
        INameWrapper _wrapper = INameWrapper(StorageSlotUpgradeable.getAddressSlot(_ENS_WRAPPER_SLOT).value);
        uint256 tokenId = _namehash(name);
        if (_wrapper.ownerOf(tokenId) != address(this)) {
            revert UnknownToken(tokenId);
        }

        IETHRegistrarController _controller = IETHRegistrarController(StorageSlotUpgradeable.getAddressSlot(_ENS_CONTROLLER_SLOT).value);
        IPriceOracle.Price memory price = _controller.rentPrice(name, duration);
        if (address(this).balance < price.base + price.premium) {
            revert CustodyNotEnoughBalance();
        }

        _controller.renew{value: price.base + price.premium}(name, duration);
    }

    function ownerOf(uint256 tokenId) external view returns (address) {
        return _ownerOf(tokenId);
    }

    function safeTransfer(address to, uint256 tokenId) external onlyTokenOwner(tokenId) {
        _protectTokenOperation(tokenId);
        StorageSlotUpgradeable.getAddressSlot(keccak256(abi.encodePacked(_OWNER_PREFIX_SLOT, tokenId))).value = address(0);

        INameWrapper _wrapper = INameWrapper(StorageSlotUpgradeable.getAddressSlot(_ENS_WRAPPER_SLOT).value);
        _wrapper.safeTransferFrom(address(this), to, tokenId, 1, '');
    }

    receive() external payable {}

    function _register(
        string calldata name,
        address owner,
        uint256 duration,
        bytes32 secret,
        address resolver,
        bytes[] calldata data,
        bool reverseRecord,
        uint16 ownerControlledFuses
    ) internal {
        IETHRegistrarController _controller = IETHRegistrarController(StorageSlotUpgradeable.getAddressSlot(_ENS_CONTROLLER_SLOT).value);
        IPriceOracle.Price memory price = _controller.rentPrice(name, duration);
        if (address(this).balance < price.base + price.premium) {
            revert CustodyNotEnoughBalance();
        }

        _controller.register{value: price.base + price.premium}(
            name,
            owner,
            duration,
            secret,
            resolver,
            data,
            reverseRecord,
            ownerControlledFuses
        );
    }

    function _ownerOf(uint256 tokenId) internal view returns (address) {
        address owner = StorageSlotUpgradeable.getAddressSlot(keccak256(abi.encodePacked(_OWNER_PREFIX_SLOT, tokenId))).value;
        if (owner == address(0)) {
            revert InvalidToken(tokenId);
        }

        return owner;
    }

    function _msgSender() internal view override(ContextUpgradeable, ERC2771RegistryContext) returns (address) {
        return super._msgSender();
    }

    function _msgData() internal view override(ContextUpgradeable, ERC2771RegistryContext) returns (bytes calldata) {
        return super._msgData();
    }

    function _namehash(string memory label) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(_ETH_NODE, keccak256(abi.encodePacked(label)))));
    }

    function _protectTokenOperation(uint256 tokenId) internal {
        if (isTrustedForwarder(msg.sender)) {
            if (tokenId != _msgToken()) {
                revert InvalidForwardedToken(tokenId);
            }
        } else {
            _invalidateNonce(tokenId);
        }
    }
}
