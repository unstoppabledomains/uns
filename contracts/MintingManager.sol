// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import './cns/IResolver.sol';
import './cns/IMintingController.sol';
import './cns/IURIPrefixController.sol';
import './IMintingManager.sol';
import './IUNSRegistry.sol';
import './metatx/ERC2771Context.sol';
import './roles/MinterRole.sol';
import './utils/Blocklist.sol';
import './utils/Pausable.sol';
import './utils/Strings.sol';

/**
 * @title MintingManager
 * @dev Defines the functions for distribution of Second Level Domains (SLD)s.
 */
contract MintingManager is ERC2771Context, MinterRole, Blocklist, Pausable, IMintingManager {
    using Strings for *;

    string public constant NAME = 'UNS: Minting Manager';
    string public constant VERSION = '0.4.0';

    IUNSRegistry public unsRegistry;
    IMintingController public cnsMintingController;
    IURIPrefixController public cnsURIPrefixController;
    IResolver public cnsResolver;

    /**
     * @dev Mapping TLD `namehash` to TLD label
     *
     * `namehash` = uint256(keccak256(abi.encodePacked(uint256(0x0), keccak256(abi.encodePacked(label)))))
     */
    mapping(uint256 => string) internal _tlds;

    /**
     * @dev The modifier checks domain's tld and label on mint.
     * @param tld should be registered.
     * @param label should not have legacy CNS free domain prefix.
     *      Legacy CNS free domain prefix is 'udtestdev-'.
     *      keccak256('udtestdev-') = 0xb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8
     */
    modifier onlyAllowedSLD(uint256 tld, string memory label) {
        require(_isTld(tld), 'MintingManager: TLD_NOT_REGISTERED');
        Strings.Slice memory _label = label.toSlice();
        if (_label._len > 10) {
            require(
                _label.slice(0, 10).keccak() != 0xb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8,
                'MintingManager: TOKEN_LABEL_PROHIBITED'
            );
        }
        _;
    }

    /**
     * @dev The modifier checks subdomain's labels on issue.
     * @param labels should not have legacy CNS free domain prefix.
     *      Legacy CNS free domain prefix is 'udtestdev-'.
     *      keccak256('udtestdev-') = 0xb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8
     */
    modifier onlyAllowed(string[] memory labels) {
        require(labels.length >= 2, 'MintingManager: LABELS_LENGTH_BELOW_2');
        require(_isTld(labels[labels.length - 1]), 'MintingManager: TLD_NOT_REGISTERED');
        Strings.Slice memory _label = labels[labels.length - 2].toSlice();
        if (_label._len > 10) {
            require(
                _label.slice(0, 10).keccak() != 0xb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8,
                'MintingManager: TOKEN_LABEL_PROHIBITED'
            );
        }
        _;
    }

    modifier onlyIssuer(string[] memory labels) {
        if (labels.length == 2) {
            require(isMinter(_msgSender()), 'MintingManager: CALLER_IS_NOT_MINTER');
        } else {
            (, uint256 parentId) = _namehash(labels);
            require(unsRegistry.isApprovedOrOwner(_msgSender(), parentId), 'MintingManager: SENDER_IS_NOT_APPROVED_OR_OWNER');
        }
        _;
    }

    function initialize(
        IUNSRegistry unsRegistry_,
        IMintingController cnsMintingController_,
        IURIPrefixController cnsURIPrefixController_,
        IResolver cnsResolver_,
        address forwarder
    ) public initializer {
        unsRegistry = unsRegistry_;
        cnsMintingController = cnsMintingController_;
        cnsURIPrefixController = cnsURIPrefixController_;
        cnsResolver = cnsResolver_;

        __Ownable_init_unchained();
        __MinterRole_init_unchained();
        __ERC2771Context_init_unchained(forwarder);
        __Blocklist_init_unchained();
        __Pausable_init_unchained();

        string[12] memory tlds = [
            'crypto',
            'wallet',
            'x',
            'nft',
            'blockchain',
            'bitcoin',
            '888',
            'dao',
            'zil',
            'polygon',
            'unstoppable',
            'klever'
        ];
        for (uint256 i = 0; i < tlds.length; i++) {
            _addTld(tlds[i]);
        }
    }

    function addTld(string calldata tld) external override onlyOwner {
        _addTld(tld);
    }

    function removeTld(uint256 tld) external override onlyOwner {
        require(_isTld(tld), 'MintingManager: TLD_NOT_REGISTERED');

        delete _tlds[tld];
        emit RemoveTld(tld);
    }

    function mintSLDWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyMinter onlyAllowedSLD(tld, label) whenNotPaused {
        _issueWithRecords(to, _buildLabels(tld, label), keys, values);
    }

    function issueWithRecords(
        address to,
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyIssuer(labels) onlyAllowed(labels) whenNotPaused {
        _issueWithRecords(to, labels, keys, values);
    }

    function claim(uint256 tld, string calldata label) external override onlyAllowedSLD(tld, label) whenNotPaused {
        _issue(_msgSender(), _buildLabels(tld, _freeSLDLabel(label)));
    }

    function claimTo(
        address to,
        uint256 tld,
        string calldata label
    ) external override onlyAllowedSLD(tld, label) whenNotPaused {
        _issue(to, _buildLabels(tld, _freeSLDLabel(label)));
    }

    function claimToWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyAllowedSLD(tld, label) whenNotPaused {
        _issueWithRecords(to, _buildLabels(tld, _freeSLDLabel(label)), keys, values);
    }

    function setResolver(address resolver) external onlyOwner {
        cnsResolver = IResolver(resolver);
    }

    function setTokenURIPrefix(string calldata prefix) external override onlyOwner {
        unsRegistry.setTokenURIPrefix(prefix);
        if (address(cnsURIPrefixController) != address(0x0)) {
            cnsURIPrefixController.setTokenURIPrefix(prefix);
        }
    }

    function setForwarder(address forwarder) external onlyOwner {
        _setForwarder(forwarder);
    }

    function disableBlocklist() external onlyOwner {
        _disableBlocklist();
    }

    function enableBlocklist() external onlyOwner {
        _enableBlocklist();
    }

    function blocklist(uint256 tokenId) external onlyMinter {
        _block(tokenId);
    }

    function blocklistAll(uint256[] calldata tokenIds) external onlyMinter {
        _blockAll(tokenIds);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function addProxyReaders(address[] calldata addrs) external onlyOwner {
        for (uint256 i = 0; i < addrs.length; i++) {
            unsRegistry.addProxyReader(addrs[i]);
        }
    }

    function upgradeAll(uint256[] calldata tokenIds) external onlyMinter {
        unsRegistry.upgradeAll(tokenIds);
    }

    function _isTldToChangeOwnership(uint256 tld) private view returns (bool) {
        // 0x7674e7282552c15f203b9c4a6025aeaf28176ef7f5451b280f9bada3f8bc98e2 - .coin token ID
        return bytes(_tlds[tld]).length > 0 || tld == 0x7674e7282552c15f203b9c4a6025aeaf28176ef7f5451b280f9bada3f8bc98e2;
    }

    function burnTLDL1(uint256[] calldata tokenIds) external onlyOwner {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(_isTldToChangeOwnership(tokenIds[i]), 'MintingManager: TOKEN_ID_NOT_TLD');
            unsRegistry.burnTLDL1(tokenIds[i]);
        }
    }

    function moveTLDOwnershipL2(uint256[] calldata tokenIds) external onlyOwner {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(_isTldToChangeOwnership(tokenIds[i]), 'MintingManager: TOKEN_ID_NOT_TLD');
            unsRegistry.moveTLDOwnershipL2(tokenIds[i]);
        }
    }

    function _buildLabels(uint256 tld, string memory label) private view returns (string[] memory) {
        string[] memory labels = new string[](2);
        labels[0] = label;
        labels[1] = _tlds[tld];
        return labels;
    }

    function _issue(address to, string[] memory labels) private {
        string[] memory empty;
        _issueWithRecords(to, labels, empty, empty);
    }

    function _issueWithRecords(
        address to,
        string[] memory labels,
        string[] memory keys,
        string[] memory values
    ) private {
        (uint256 tokenId, ) = _namehash(labels);

        if (_ownerOf(tokenId) == address(this)) {
            unsRegistry.unlockWithRecords(to, tokenId, keys, values);
        } else {
            _beforeTokenMint(tokenId);

            if (_useCNS(labels) && labels.length == 2) {
                cnsMintingController.mintSLDWithResolver(to, labels[0], address(cnsResolver));
                if (keys.length > 0) {
                    cnsResolver.preconfigure(keys, values, tokenId);
                }
            } else {
                unsRegistry.mintWithRecords(to, labels, keys, values);
            }
        }
    }

    function _namehash(uint256 tokenId, string memory label) internal pure returns (uint256) {
        require(bytes(label).length != 0, 'MintingManager: LABEL_EMPTY');
        return uint256(keccak256(abi.encodePacked(tokenId, keccak256(abi.encodePacked(label)))));
    }

    function _namehash(string[] memory labels) internal pure returns (uint256 tokenId, uint256 parentId) {
        for (uint256 i = labels.length; i > 0; i--) {
            parentId = tokenId;
            tokenId = _namehash(parentId, labels[i - 1]);
        }
    }

    function _msgSender() internal view override(ContextUpgradeable, ERC2771Context) returns (address) {
        return super._msgSender();
    }

    function _msgData() internal view override(ContextUpgradeable, ERC2771Context) returns (bytes calldata) {
        return super._msgData();
    }

    function _freeSLDLabel(string calldata label) private pure returns (string memory) {
        return string(abi.encodePacked('uns-devtest-', label));
    }

    function _beforeTokenMint(uint256 tokenId) private {
        if (!isBlocklistDisabled()) {
            require(isBlocked(tokenId) == false, 'MintingManager: TOKEN_BLOCKED');
            _block(tokenId);
        }
    }

    /**
     * @dev The function adds TLD and mint token in UNS Registry.
     * Current MintingManager has '.crypto' TLD registered, but UNS Registry does not have '.crypto' token.
     * It leads to revert on mint.
     * The function can be executed in order to mint '.crypto' token in UNS registry, while TLD already registered.
     * Sideffect: It is possible to add the same TLD multiple times, it will burn gas.
     */
    function _addTld(string memory tld) private {
        uint256 tokenId = _namehash(uint256(0x0), tld);

        _tlds[tokenId] = tld;
        emit NewTld(tokenId, tld);

        if (!unsRegistry.exists(tokenId)) {
            unsRegistry.mintTLD(tokenId, tld);
        }
    }

    /**
     * @dev This function checks whether TLD exists
     */
    function _isTld(uint256 tld) private view returns (bool) {
        return bytes(_tlds[tld]).length > 0;
    }

    /**
     * @dev This function checks whether TLD exists
     */
    function _isTld(string memory tld) private view returns (bool) {
        uint256 tldId = _namehash(uint256(0x0), tld);
        return _isTld(tldId);
    }

    /**
     * @dev Get token owner ignoring revert when token does not exist
     */
    function _ownerOf(uint256 tokenId) private view returns (address) {
        try unsRegistry.ownerOf(tokenId) returns (address _owner) {
            return _owner;
        } catch {
            return address(0);
        }
    }

    /**
     * @dev namehash('crypto') = 0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f
     */
    function _useCNS(string[] memory labels) private view returns (bool) {
        uint256 tld = _namehash(uint256(0x0), labels[labels.length - 1]);
        return address(cnsMintingController) != address(0) && tld == 0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f;
    }

    // Reserved storage space to allow for layout changes in the future.
    uint256[50] private __gap;
}
