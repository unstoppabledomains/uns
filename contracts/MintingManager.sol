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
    string public constant VERSION = '0.4.3';

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
        _ensureAllowed(tld, label);
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
        _ensureAllowed(_namehash(0x0, labels[labels.length - 1]), labels[labels.length - 2]);
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

    function issueWithRecords(
        address to,
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyIssuer(labels) onlyAllowed(labels) whenNotPaused {
        _issueWithRecords(to, labels, keys, values, true);
    }

    function issueWithRecords(
        address to,
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values,
        bool withReverse
    ) external override onlyIssuer(labels) onlyAllowed(labels) whenNotPaused {
        _issueWithRecords(to, labels, keys, values, withReverse);
    }

    function bulkIssue(BulkSLDIssueRequest[] calldata requests) external override onlyMinter {
        for (uint256 i = 0; i < requests.length; i++) {
            _ensureAllowed(requests[i].tld, requests[i].label);

            string[] memory labels = _buildLabels(requests[i].tld, requests[i].label);
            (uint256 tokenId, ) = _namehash(labels);

            string[] memory empty;
            if (!unsRegistry.exists(tokenId)) {
                _issueWithRecords(requests[i].to, labels, empty, empty, false);
            }
        }
    }

    function claim(uint256 tld, string calldata label) external override onlyAllowedSLD(tld, label) whenNotPaused {
        string[] memory empty;
        _issueWithRecords(_msgSender(), _buildLabels(tld, _freeSLDLabel(label)), empty, empty, true);
    }

    function claimTo(
        address to,
        uint256 tld,
        string calldata label
    ) external override onlyAllowedSLD(tld, label) whenNotPaused {
        string[] memory empty;
        _issueWithRecords(to, _buildLabels(tld, _freeSLDLabel(label)), empty, empty, true);
    }

    function claimToWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyAllowedSLD(tld, label) whenNotPaused {
        _issueWithRecords(to, _buildLabels(tld, _freeSLDLabel(label)), keys, values, true);
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

    function blocklist(uint256 tokenId) external onlyMinter {
        _block(tokenId);
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

    function _buildLabels(uint256 tld, string memory label) private view returns (string[] memory) {
        string[] memory labels = new string[](2);
        labels[0] = label;
        labels[1] = _tlds[tld];
        return labels;
    }

    function _issueWithRecords(
        address to,
        string[] memory labels,
        string[] memory keys,
        string[] memory values,
        bool withReverse
    ) private {
        (uint256 tokenId, ) = _namehash(labels);

        if (unsRegistry.exists(tokenId) && unsRegistry.ownerOf(tokenId) == address(this)) {
            unsRegistry.unlockWithRecords(to, tokenId, keys, values, withReverse);
        } else {
            _beforeTokenMint(tokenId);

            if (_useCNS(labels) && labels.length == 2) {
                cnsMintingController.mintSLDWithResolver(to, labels[0], address(cnsResolver));
                if (keys.length > 0) {
                    cnsResolver.preconfigure(keys, values, tokenId);
                }
            } else {
                unsRegistry.mintWithRecords(to, labels, keys, values, withReverse);
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

    function _ensureAllowed(uint256 tld, string memory label) private view {
        require(_isTld(tld), 'MintingManager: TLD_NOT_REGISTERED');
        Strings.Slice memory _label = label.toSlice();
        if (_label._len > 10) {
            require(
                _label.slice(0, 10).keccak() != 0xb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8,
                'MintingManager: TOKEN_LABEL_PROHIBITED'
            );
        }
        require(_isValidLabel(label), 'MintingManager: LABEL_INVALID');
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
     * @dev namehash('crypto') = 0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f
     */
    function _useCNS(string[] memory labels) private view returns (bool) {
        uint256 tld = _namehash(uint256(0x0), labels[labels.length - 1]);
        return address(cnsMintingController) != address(0) && tld == 0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f;
    }

    /**
     * The label must start with a letter, end with a letter or digit,
     * and have as interior characters only letters, digits, and hyphen.
     */
    function _isValidLabel(string memory str) private pure returns (bool) {
        if (bytes(str).length == 0) {
            return false;
        }

        uint256 ptr;
        /* solium-disable-next-line security/no-inline-assembly */
        assembly {
            ptr := add(str, 0x20)
        }

        for (uint256 i = 1; i < bytes(str).length - 1; i++) {
            uint8 data = _charAt(ptr, i);
            if (
                data != 45 && // hyphen (-)
                !(data >= 48 && data <= 57) && // 0-9
                !(data >= 97 && data <= 122) // a-z
            ) {
                return false;
            }
        }

        // first char must be letter or digit
        uint8 fdata = _charAt(ptr, 0);
        bool fvalid = (fdata >= 48 && fdata <= 57) || (fdata >= 97 && fdata <= 122); // a-z0-9

        // last char must be letter or digit
        bool lvalid = true;
        if (bytes(str).length > 1) {
            uint8 ldata = _charAt(ptr, bytes(str).length - 1);
            lvalid =
                (ldata >= 48 && ldata <= 57) || // 0-9
                (ldata >= 97 && ldata <= 122); // a-z
        }

        return fvalid && lvalid;
    }

    function _charAt(uint256 ptr, uint256 index) private pure returns (uint8) {
        bytes1 ptrdata;
        /* solium-disable-next-line security/no-inline-assembly */
        assembly {
            ptrdata := mload(add(ptr, index))
        }
        return uint8(ptrdata);
    }

    // Reserved storage space to allow for layout changes in the future.
    uint256[50] private __gap;
}
