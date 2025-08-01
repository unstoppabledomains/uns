// @author Unstoppable Domains, Inc.
// @date May 21st, 2025
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import './metatx/ERC2771RegistryContext.sol';
import './metatx/Forwarder.sol';
import './IUNSRegistry.sol';
import './IMintingManager.sol';
import './IERC1967.sol';
import './roles/RegistrarRole.sol';
import './IRegistrarCustody.sol';

contract RegistrarCustody is
    Initializable,
    ERC2771RegistryContext,
    Forwarder,
    ReentrancyGuardUpgradeable,
    RegistrarRole,
    IRegistrarCustody
{
    using ECDSAUpgradeable for bytes32;

    string public constant NAME = 'UNS: Registrar Custody';
    string public constant VERSION = '0.2.1';

    bytes4 internal constant _ERC1271_MAGIC_VALUE = bytes4(keccak256('isValidSignature(bytes32,bytes)'));

    IUNSRegistry public unsRegistry;
    IMintingManager public mintingManager;

    // Mapping of domain tokenId to registrarId
    mapping(uint256 => uint256) public registrarDelegations;
    // Mapping of domain tokenId to user address
    mapping(uint256 => address) public userDelegations;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _unsRegistry, address _mintingManager) public initializer {
        unsRegistry = IUNSRegistry(_unsRegistry);
        mintingManager = IMintingManager(_mintingManager);

        __ReentrancyGuard_init_unchained();
        __ERC2771RegistryContext_init_unchained();
        __Forwarder_init_unchained();
        __Ownable_init_unchained();
        __RegistrarRole_init_unchained();
    }

    function setApprovalForAll(address operator, bool approved) external onlyOwner {
        unsRegistry.setApprovalForAll(operator, approved);
    }

    function tokenizeDomain(
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values,
        uint64 expiry,
        uint256 registrarId,
        address userDelegation
    ) external onlyAdmin nonReentrant {
        uint256 tokenId = unsRegistry.namehash(labels);
        address owner = unsRegistry.exists(tokenId) ? unsRegistry.ownerOf(tokenId) : address(0);

        if (owner == address(this)) {
            uint256 currentExpiry = unsRegistry.expiryOf(tokenId);
            if (currentExpiry == 0) {
                revert InvalidExpiry();
            }

            if (currentExpiry < expiry) {
                mintingManager.renew(expiry, tokenId);
            }

            unsRegistry.setMany(keys, values, tokenId);
        } else {
            if (owner != address(0) && owner != address(mintingManager)) {
                mintingManager.revoke(tokenId);
            }

            mintingManager.issueExpirableWithRecords(address(this), labels, keys, values, expiry, false);
        }

        registrarDelegations[tokenId] = registrarId;
        userDelegations[tokenId] = userDelegation;

        emit DomainTokenized(tokenId, registrarId, userDelegation);
    }

    function setRecords(string[] calldata keys, string[] calldata values, uint256 tokenId) external {
        if (!isRegistrar(registrarDelegations[tokenId], _msgSender()) || (userDelegations[tokenId] == _msgSender())) {
            revert Unauthorized();
        }

        unsRegistry.setMany(keys, values, tokenId);
    }

    function revoke(uint256 tokenId) external {
        if (!isRegistrar(registrarDelegations[tokenId], _msgSender())) {
            revert Unauthorized();
        }

        unsRegistry.transferFrom(address(this), address(mintingManager), tokenId);
    }

    function isValidSignature(bytes32 hash, bytes memory signature) public view returns (bytes4) {
        address signer = hash.recover(signature);

        if (isAdmin(signer)) {
            return _ERC1271_MAGIC_VALUE;
        } else {
            return 0xffffffff;
        }
    }

    function _msgSender() internal view override(ContextUpgradeable, ERC2771RegistryContext) returns (address) {
        return ERC2771RegistryContext._msgSender();
    }

    function _msgData() internal view override(ContextUpgradeable, ERC2771RegistryContext) returns (bytes calldata) {
        return ERC2771RegistryContext._msgData();
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
