// @author Unstoppable Domains, Inc.
// @date September 25th, 2024
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import './metatx/ERC2771RegistryContext.sol';
import './metatx/Forwarder.sol';
import './roles/MinterRole.sol';
import './IUNSRegistry.sol';
import './IMintingManager.sol';
import './IERC1967.sol';
import './IRegistrarCustody.sol';

contract RegistrarCustody is
    Initializable,
    ERC2771RegistryContext,
    Forwarder,
    ReentrancyGuardUpgradeable,
    MinterRole,
    IERC1967,
    IRegistrarCustody
{
    using ECDSAUpgradeable for bytes32;

    string public constant NAME = 'UNS: Registrar Custody';
    string public constant VERSION = '0.1.0';

    bytes4 internal constant _ERC1271_MAGIC_VALUE = bytes4(keccak256('isValidSignature(bytes32,bytes)'));

    IUNSRegistry public unsRegistry;
    IMintingManager public mintingManager;

    mapping(uint256 => address) public virtualOwners;

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
        __MinterRole_init_unchained();
    }

    function setApprovalForAll(address operator, bool approved) external onlyOwner {
        unsRegistry.setApprovalForAll(operator, approved);
    }

    function registerDomain(
        address virtualOwner,
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values,
        uint64 expiry
    ) external onlyMinter nonReentrant {
        uint256 tokenId = unsRegistry.namehash(labels);

        _protectTokenOperation(tokenId);

        virtualOwners[tokenId] = virtualOwner;

        mintingManager.issueExpirableWithRecords(address(this), labels, keys, values, expiry, false);

        emit DomainLocked(tokenId, virtualOwner);
    }

    function safeTransfer(address to, uint256 tokenId) external onlyMinter nonReentrant {
        _protectTokenOperation(tokenId);

        delete virtualOwners[tokenId];

        unsRegistry.setOwner(to, tokenId);
    }

    function isValidSignature(bytes32 hash, bytes memory signature) public view returns (bytes4) {
        address signer = hash.recover(signature);

        if (isMinter(signer)) {
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
