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

import {IENSCustody, Unauthorised, InvalidToken, UnknownToken, OperationProhibited, InvalidForwardedToken} from './IENSCustody.sol';
import {ERC2771RegistryContext} from '../metatx/ERC2771RegistryContext.sol';
import {Forwarder} from '../metatx/Forwarder.sol';
import {MinterRole} from '../roles/MinterRole.sol';

// TODO: do we need commit function here? (guarded onlyMinter?)
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
    string public constant VERSION = '0.0.1';

    bytes32 private constant _ETH_NODE = 0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae;
    // // This is the keccak-256 hash of "uns.ens_controller" subtracted by 1
    // bytes32 internal constant _ENS_CONTROLLER_SLOT = 0x00;
    // // This is the keccak-256 hash of "uns.ens_wrapper" subtracted by 1
    // bytes32 internal constant _ENS_WRAPPER_SLOT = 0x00;

    // TODO: convert to slots
    mapping(uint256 => address) private _owners;
    IETHRegistrarController private _controller;
    INameWrapper private _wrapper;

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

    function initialize(IETHRegistrarController controller, INameWrapper wrapper) public initializer {
        _controller = controller;
        _wrapper = wrapper;

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
        return interfaceId == type(IERC1155ReceiverUpgradeable).interfaceId;
    }

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes calldata
    ) public view override returns (bytes4) {
        if (_msgSender() == address(_wrapper)) {
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
        if (_msgSender() == address(_wrapper)) {
            return this.onERC1155BatchReceived.selector;
        }
        revert OperationProhibited();
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

        IPriceOracle.Price memory price = _controller.rentPrice(name, duration);
        _controller.register{value: price.base + price.premium}(
            name,
            selfCustody ? owner : address(this),
            duration,
            secret,
            resolver,
            data,
            reverseRecord,
            ownerControlledFuses
        );

        if (!selfCustody) {
            _owners[tokenId] = owner;
            emit Parked(tokenId, owner);
        }
    }

    function ownerOf(uint256 tokenId) external view returns (address) {
        return _ownerOf(tokenId);
    }

    function safeTransfer(address to, uint256 tokenId) external onlyTokenOwner(tokenId) {
        _protectTokenOperation(tokenId);
        delete _owners[tokenId];
        _wrapper.safeTransferFrom(address(this), to, tokenId, 1, '');
    }

    receive() external payable {}

    function _ownerOf(uint256 tokenId) internal view returns (address) {
        address owner = _owners[tokenId];
        if (owner == address(0)) {
            revert InvalidToken(tokenId);
        }

        address baseOwner = _wrapper.ownerOf(tokenId);
        if (baseOwner != address(this)) {
            revert UnknownToken(tokenId);
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