// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import './BlocklistStorage.sol';
import './cns/IResolver.sol';
import './cns/IMintingController.sol';
import './cns/IURIPrefixController.sol';
import './IMintingManager.sol';
import './IUNSRegistry.sol';
import './metatx/ERC2771Context.sol';
import './metatx/Relayer.sol';
import './roles/MinterRole.sol';

/**
 * @title MintingManager
 * @dev Defines the functions for distribution of Second Level Domains (SLD)s.
 */
contract MintingManager is ERC2771Context, MinterRole, Relayer, IMintingManager, BlocklistStorage {
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

    modifier onlyRegisteredTld(uint256 tld) {
        require(bytes(_tlds[tld]).length > 0, 'MintingManager: TLD_NOT_REGISTERED');
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

        // Relayer is required to be a minter
        _addMinter(address(this));

        _tlds[0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f] = 'crypto';

        string[8] memory tlds = ['wallet', 'coin', 'x', 'nft', 'blockchain', 'bitcoin', '888', 'dao'];
        for (uint256 i = 0; i < tlds.length; i++) {
            uint256 namehash = uint256(keccak256(abi.encodePacked(uint256(0x0), keccak256(abi.encodePacked(tlds[i])))));
            _tlds[namehash] = tlds[i];

            if (!unsRegistry.exists(namehash)) {
                unsRegistry.mint(address(0xdead), namehash, tlds[i]);
            }
        }
    }

    function mintSLD(
        address to,
        uint256 tld,
        string calldata label
    ) external override onlyMinter onlyRegisteredTld(tld) {
        _mintSLD(to, tld, label);
    }

    function safeMintSLD(
        address to,
        uint256 tld,
        string calldata label
    ) external override onlyMinter onlyRegisteredTld(tld) {
        _safeMintSLD(to, tld, label, '');
    }

    function safeMintSLD(
        address to,
        uint256 tld,
        string calldata label,
        bytes calldata data
    ) external override onlyMinter onlyRegisteredTld(tld) {
        _safeMintSLD(to, tld, label, data);
    }

    function mintSLDWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyMinter onlyRegisteredTld(tld) {
        _mintSLDWithRecords(to, tld, label, keys, values);
    }

    function safeMintSLDWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyMinter onlyRegisteredTld(tld) {
        _safeMintSLDWithRecords(to, tld, label, keys, values, '');
    }

    function safeMintSLDWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values,
        bytes calldata data
    ) external override onlyMinter onlyRegisteredTld(tld) {
        _safeMintSLDWithRecords(to, tld, label, keys, values, data);
    }

    function claim(uint256 tld, string calldata label) external override onlyRegisteredTld(tld) {
        _mintSLD(_msgSender(), tld, _freeSLDLabel(label));
    }

    function claimTo(
        address to,
        uint256 tld,
        string calldata label
    ) external override onlyRegisteredTld(tld) {
        _mintSLD(to, tld, _freeSLDLabel(label));
    }

    function claimToWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyRegisteredTld(tld) {
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

    function blocklist(uint256 tokenId) external override onlyMinter {
        _block(tokenId);
    }

    function blocklistAll(uint256[] calldata tokenIds) external override onlyMinter {
        _blockAll(tokenIds);
    }

    function _verifyRelaySigner(address signer) internal view override {
        super._verifyRelaySigner(signer);
        require(isMinter(signer), 'MintingManager: SIGNER_IS_NOT_MINTER');
    }

    function _verifyRelayCall(bytes4 funcSig, bytes calldata) internal pure override {
        bool isSupported = funcSig == _SIG_MINT ||
            funcSig == _SIG_SAFE_MINT ||
            funcSig == _SIG_SAFE_MINT_DATA ||
            funcSig == _SIG_MINT_WITH_RECORDS ||
            funcSig == _SIG_SAFE_MINT_WITH_RECORDS ||
            funcSig == _SIG_SAFE_MINT_WITH_RECORDS_DATA;

        require(isSupported, 'MintingManager: UNSUPPORTED_RELAY_CALL');
    }

    function _mintSLD(
        address to,
        uint256 tld,
        string memory label
    ) private {
        uint256 tokenId = _childId(tld, label);
        _beforeTokenMint(tokenId);

        if (tld == 0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f) {
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

        if (tld == 0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f) {
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

        if (tld == 0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f) {
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

        if (tld == 0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f) {
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

    function _freeSLDLabel(string calldata label) private pure returns (string memory) {
        return string(abi.encodePacked('udtestdev-', label));
    }

    function _uri(uint256 tld, string memory label) private view returns (string memory) {
        return string(abi.encodePacked(label, '.', _tlds[tld]));
    }

    function _beforeTokenMint(uint256 tokenId) internal {
        require(isBlocked(tokenId) == false, 'MintingManager: TOKEN_BLOCKED');
        _block(tokenId);
    }

    function _msgSender() internal view override(ContextUpgradeable, ERC2771Context) returns (address) {
        return super._msgSender();
    }

    function _msgData() internal view override(ContextUpgradeable, ERC2771Context) returns (bytes calldata) {
        return super._msgData();
    }

    // Reserved storage space to allow for layout changes in the future.
    uint256[50] private __gap;
}
