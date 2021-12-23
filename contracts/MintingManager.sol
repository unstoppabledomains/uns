// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import './cns/IResolver.sol';
import './cns/IMintingController.sol';
import './cns/IURIPrefixController.sol';
import './IMintingManager.sol';
import './IUNSRegistry.sol';
import './metatx/ERC2771Context.sol';
import './metatx/Relayer.sol';
import './roles/MinterRole.sol';
import './utils/Blocklist.sol';
import './utils/Pausable.sol';
import './utils/Strings.sol';

/**
 * @title MintingManager
 * @dev Defines the functions for distribution of Second Level Domains (SLD)s.
 */
contract MintingManager is ERC2771Context, MinterRole, Relayer, Blocklist, Pausable, IMintingManager {
    using Strings for *;

    string public constant NAME = 'UNS: Minting Manager';
    string public constant VERSION = '0.2.0';

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
     * @dev bytes4(keccak256('mintSLD(address,uint256,string)')) == 0xae2ad903
     */
    bytes4 private constant _SIG_MINT = 0xae2ad903;

    /**
     * @dev bytes4(keccak256('safeMintSLD(address,uint256,string)')) == 0x4c1819e0
     */
    bytes4 private constant _SIG_SAFE_MINT = 0x4c1819e0;

    /**
     * @dev bytes4(keccak256('safeMintSLD(address,uint256,string,bytes)')) == 0x58839d6b
     */
    bytes4 private constant _SIG_SAFE_MINT_DATA = 0x58839d6b;

    /**
     * @dev bytes4(keccak256('mintSLDWithRecords(address,uint256,string,string[],string[])')) == 0x39ccf4d0
     */
    bytes4 private constant _SIG_MINT_WITH_RECORDS = 0x39ccf4d0;

    /**
     * @dev bytes4(keccak256('safeMintSLDWithRecords(address,uint256,string,string[],string[])')) == 0x27bbd225
     */
    bytes4 private constant _SIG_SAFE_MINT_WITH_RECORDS = 0x27bbd225;

    /**
     * @dev bytes4(keccak256('safeMintSLDWithRecords(address,uint256,string,string[],string[],bytes)')) == 0x6a2d2256
     */
    bytes4 private constant _SIG_SAFE_MINT_WITH_RECORDS_DATA = 0x6a2d2256;

    /**
     * @dev The modifier checks domain's tld and label on mint.
     * @param tld should be registered.
     * @param label should not have legacy CNS free domain prefix.
     *      Legacy CNS free domain prefix is 'udtestdev-'.
     *      keccak256('udtestdev-') = 0xb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8
     */
    modifier onlyAllowed(uint256 tld, string memory label) {
        require(bytes(_tlds[tld]).length > 0, 'MintingManager: TLD_NOT_REGISTERED');
        Strings.slice memory labelSlice = label.toSlice();
        if(labelSlice._len > 10) {
            require(
                labelSlice.sub(0, 10).keccak() != 0xb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8,
                'MintingManager: TOKEN_LABEL_PROHIBITED'
            );
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

        // Relayer is required to be a minter
        _addMinter(address(this));

        string[9] memory tlds = ['crypto', 'wallet', 'coin', 'x', 'nft', 'blockchain', 'bitcoin', '888', 'dao'];
        for (uint256 i = 0; i < tlds.length; i++) {
            _addTld(tlds[i]);
        }
    }

    function addTld(string calldata tld) external override onlyOwner {
        _addTld(tld);
    }

    function mintSLD(
        address to,
        uint256 tld,
        string calldata label
    ) external override onlyMinter onlyAllowed(tld, label) whenNotPaused {
        _mintSLD(to, tld, label);
    }

    function safeMintSLD(
        address to,
        uint256 tld,
        string calldata label
    ) external override onlyMinter onlyAllowed(tld, label) whenNotPaused {
        _safeMintSLD(to, tld, label, '');
    }

    function safeMintSLD(
        address to,
        uint256 tld,
        string calldata label,
        bytes calldata data
    ) external override onlyMinter onlyAllowed(tld, label) whenNotPaused {
        _safeMintSLD(to, tld, label, data);
    }

    function mintSLDWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyMinter onlyAllowed(tld, label) whenNotPaused {
        _mintSLDWithRecords(to, tld, label, keys, values);
    }

    function safeMintSLDWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyMinter onlyAllowed(tld, label) whenNotPaused {
        _safeMintSLDWithRecords(to, tld, label, keys, values, '');
    }

    function safeMintSLDWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values,
        bytes calldata data
    ) external override onlyMinter onlyAllowed(tld, label) whenNotPaused {
        _safeMintSLDWithRecords(to, tld, label, keys, values, data);
    }

    function claim(uint256 tld, string calldata label) external override onlyAllowed(tld, label) whenNotPaused {
        _mintSLD(_msgSender(), tld, _freeSLDLabel(label));
    }

    function claimTo(
        address to,
        uint256 tld,
        string calldata label
    ) external override onlyAllowed(tld, label) whenNotPaused {
        _mintSLD(to, tld, _freeSLDLabel(label));
    }

    function claimToWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyAllowed(tld, label) whenNotPaused {
        _mintSLDWithRecords(to, tld, _freeSLDLabel(label), keys, values);
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

    function _verifyRelaySigner(address signer) internal view override {
        super._verifyRelaySigner(signer);
        require(isMinter(signer), 'MintingManager: SIGNER_IS_NOT_MINTER');
    }

    function _verifyRelayCall(bytes4 selector, bytes calldata) internal pure override {
        bool isSupported = selector == _SIG_MINT ||
            selector == _SIG_SAFE_MINT ||
            selector == _SIG_SAFE_MINT_DATA ||
            selector == _SIG_MINT_WITH_RECORDS ||
            selector == _SIG_SAFE_MINT_WITH_RECORDS ||
            selector == _SIG_SAFE_MINT_WITH_RECORDS_DATA;

        require(isSupported, 'MintingManager: UNSUPPORTED_RELAY_CALL');
    }

    function _mintSLD(
        address to,
        uint256 tld,
        string memory label
    ) private {
        uint256 tokenId = _childId(tld, label);
        _beforeTokenMint(tokenId);

        if (_useCNS(tld)) {
            cnsMintingController.mintSLDWithResolver(to, label, address(cnsResolver));
        } else {
            unsRegistry.mint(to, tokenId, _uri(tld, label));
        }
    }

    function _safeMintSLD(
        address to,
        uint256 tld,
        string calldata label,
        bytes memory data
    ) private {
        uint256 tokenId = _childId(tld, label);
        _beforeTokenMint(tokenId);

        if (_useCNS(tld)) {
            cnsMintingController.safeMintSLDWithResolver(to, label, address(cnsResolver), data);
        } else {
            unsRegistry.safeMint(to, tokenId, _uri(tld, label), data);
        }
    }

    function _mintSLDWithRecords(
        address to,
        uint256 tld,
        string memory label,
        string[] calldata keys,
        string[] calldata values
    ) private {
        uint256 tokenId = _childId(tld, label);
        _beforeTokenMint(tokenId);

        if (_useCNS(tld)) {
            cnsMintingController.mintSLDWithResolver(to, label, address(cnsResolver));
            if (keys.length > 0) {
                cnsResolver.preconfigure(keys, values, tokenId);
            }
        } else {
            unsRegistry.mintWithRecords(to, tokenId, _uri(tld, label), keys, values);
        }
    }

    function _safeMintSLDWithRecords(
        address to,
        uint256 tld,
        string memory label,
        string[] calldata keys,
        string[] calldata values,
        bytes memory data
    ) private {
        uint256 tokenId = _childId(tld, label);
        _beforeTokenMint(tokenId);

        if (_useCNS(tld)) {
            cnsMintingController.safeMintSLDWithResolver(to, label, address(cnsResolver), data);
            if (keys.length > 0) {
                cnsResolver.preconfigure(keys, values, tokenId);
            }
        } else {
            unsRegistry.safeMintWithRecords(to, tokenId, _uri(tld, label), keys, values, data);
        }
    }

    function _childId(uint256 tokenId, string memory label) internal pure returns (uint256) {
        require(bytes(label).length != 0, 'MintingManager: LABEL_EMPTY');
        return uint256(keccak256(abi.encodePacked(tokenId, keccak256(abi.encodePacked(label)))));
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

    function _uri(uint256 tld, string memory label) private view returns (string memory) {
        return string(abi.encodePacked(label, '.', _tlds[tld]));
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
     * TODO: think about the implementation
     */
    function _addTld(string memory tld) private {
        uint256 tokenId = _childId(uint256(0x0), tld);

        _tlds[tokenId] = tld;
        emit NewTld(tokenId, tld);

        if (!unsRegistry.exists(tokenId)) {
            unsRegistry.mint(address(0xdead), tokenId, tld);
        }
    }

    /**
     * @dev namehash('crypto') = 0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f
     */
    function _useCNS(uint256 tld) private view returns (bool) {
        return
            address(cnsMintingController) != address(0) &&
            tld == 0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f;
    }

    // Reserved storage space to allow for layout changes in the future.
    uint256[50] private __gap;
}
