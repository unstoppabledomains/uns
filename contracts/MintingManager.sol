// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';
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
    using ECDSAUpgradeable for bytes32;

    string public constant NAME = 'UNS: Minting Manager';
    string public constant VERSION = '0.5.1';

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

    address public unsOperator;

    /**
     * @dev Mapping TLD `namehash` to whether they are expirable or not
     */
    mapping(uint256 => bool) internal _expirableTlds;

    /**
     * @dev The modifier checks domain's tld and label on mint.
     * @param tld should be registered.
     * @param label should not have legacy CNS free domain prefix.
     *      Legacy CNS free domain prefix is 'udtestdev-'.
     *      keccak256('udtestdev-') = 0xb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8
     */
    modifier onlyAllowedSLD(uint256 tld, string memory label) {
        _ensureAllowed(tld, label, 0);
        _;
    }

    /**
     * @dev The modifier checks subdomain's labels on issue.
     * @param labels should not have legacy CNS free domain prefix.
     *      Legacy CNS free domain prefix is 'udtestdev-'.
     *      keccak256('udtestdev-') = 0xb551e0305c8163b812374b8e78b577c77f226f6f10c5ad03e52699578fbc34b8
     */
    modifier onlyAllowed(string[] memory labels, uint64 expiry) {
        require(labels.length >= 2, 'MintingManager: LABELS_LENGTH_BELOW_2');
        _ensureAllowed(_namehash(0x0, labels[labels.length - 1]), labels[0], expiry);
        _;
    }

    modifier onlyIssuer(string[] memory labels) {
        if (labels.length == 2) {
            require(isMinter(_msgSender()), 'MintingManager: CALLER_IS_NOT_MINTER');
        } else {
            (, uint256 parentId) = _namehash(labels);

            require(
                unsRegistry.isApprovedOrOwner(_msgSender(), parentId) ||
                    (unsRegistry.isApprovedOrOwner(unsOperator, parentId) && isMinter(_msgSender())),
                'MintingManager: SENDER_IS_NOT_APPROVED_OR_OWNER'
            );
        }
        _;
    }

    function initialize(
        IUNSRegistry unsRegistry_,
        IMintingController cnsMintingController_,
        IURIPrefixController cnsURIPrefixController_,
        IResolver cnsResolver_,
        address unsOperator_,
        address forwarder
    ) public initializer {
        unsRegistry = unsRegistry_;
        cnsMintingController = cnsMintingController_;
        cnsURIPrefixController = cnsURIPrefixController_;
        cnsResolver = cnsResolver_;
        unsOperator = unsOperator_;

        __Ownable_init_unchained();
        __MinterRole_init_unchained();
        __ERC2771Context_init_unchained(forwarder);
        __Pausable_init_unchained();

        string[22] memory tlds = [
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
            'klever',
            'hi',
            'kresus',
            'anime',
            'manga',
            'binanceus',
            'realm',
            'go',
            'altimist',
            'pudgy',
            'austin'
        ];
        for (uint256 i = 0; i < tlds.length; i++) {
            _addTld(tlds[i], false);
        }

        _addTld('com', true);
    }

    function addTld(string calldata tld, bool isExpirable) external override onlyOwner {
        _addTld(tld, isExpirable);
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
        string[] calldata values,
        bool withReverse
    ) external override onlyIssuer(labels) onlyAllowed(labels, 0) whenNotPaused {
        _issueWithRecords(to, labels, keys, values, 0, withReverse);
    }

    function issueExpirableWithRecords(
        address to,
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values,
        uint64 expiry,
        bool withReverse
    ) external override onlyIssuer(labels) onlyAllowed(labels, expiry) whenNotPaused {
        require(labels.length == 2, 'MintingManager: SUBDOMAINS_NOT_ALLOWED');

        _issueWithRecords(to, labels, keys, values, expiry, withReverse);
    }

    function renew(uint64 expiry, uint256 tokenId) external override onlyMinter {
        uint64 currentExpiry = unsRegistry.expiryOf(tokenId);

        require(currentExpiry != 0, 'MintingManager: TOKEN_NOT_EXPIRABLE');
        require(expiry > currentExpiry, 'MintingManager: EXPIRY_NOT_EXTENDED');

        unsRegistry.setExpiry(expiry, tokenId);
    }

    function revoke(uint256 tokenId) external override onlyMinter {
        require(unsRegistry.expiryOf(tokenId) != 0, 'MintingManager: TOKEN_NOT_EXPIRABLE');

        unsRegistry.unlock(address(this), tokenId);
    }

    function claim(uint256 tld, string calldata label) external override onlyAllowedSLD(tld, label) whenNotPaused {
        string[] memory empty;

        _issueWithRecords(_msgSender(), _buildLabels(tld, _freeSLDLabel(label)), empty, empty, 0, true);
    }

    function claimTo(
        address to,
        uint256 tld,
        string calldata label
    ) external override onlyAllowedSLD(tld, label) whenNotPaused {
        string[] memory empty;
        _issueWithRecords(to, _buildLabels(tld, _freeSLDLabel(label)), empty, empty, 0, true);
    }

    function claimToWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyAllowedSLD(tld, label) whenNotPaused {
        _issueWithRecords(to, _buildLabels(tld, _freeSLDLabel(label)), keys, values, 0, true);
    }

    /**
     * @dev See {IMintingManager-buy(address,string[],string[],string[],uint64,uint256,bytes)}.
     */
    function buy(
        address owner,
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values,
        uint64 expiry,
        uint256 price,
        bytes calldata signature
    ) external payable onlyAllowed(labels, 0) whenNotPaused {
        require(labels.length == 2, 'MintingManager: SUBDOMAINS_NOT_ALLOWED');

        _verifyPurchaseSignature(owner, labels, expiry, price, address(0), signature);
        require(msg.value >= price, 'MintingManager: NOT_ENOUGH_FUNDS');

        _handlePurchase(owner, labels, keys, values, price, address(0));

        if (msg.value > price) {
            payable(_msgSender()).transfer(msg.value - price);
        }
    }

    /**
     * @dev See {IMintingManager-buyForErc20(address,string[],string[],string[],uint64,address,uint256,bytes)}.
     */
    function buyForErc20(
        address owner,
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values,
        uint64 expiry,
        address token,
        uint256 price,
        bytes calldata signature
    ) external onlyAllowed(labels, 0) whenNotPaused {
        require(labels.length == 2, 'MintingManager: SUBDOMAINS_NOT_ALLOWED');

        _verifyPurchaseSignature(owner, labels, expiry, price, token, signature);
        require(IERC20Upgradeable(token).transferFrom(_msgSender(), address(this), price), 'ERC20: LOW_LEVEL_FAIL');

        _handlePurchase(owner, labels, keys, values, price, token);
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

    function setOperator(address operator) external onlyOwner {
        unsOperator = operator;
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

    function withdraw(address recepient) external onlyOwner {
        require(recepient != address(0));

        uint256 value = address(this).balance;
        payable(recepient).transfer(value);

        emit Withdrawal(recepient, value, address(0));
    }

    function withdraw(address token, address recepient) external onlyOwner {
        uint256 value = IERC20Upgradeable(token).balanceOf(address(this));

        require(IERC20Upgradeable(token).transfer(recepient, value), 'ERC20: LOW_LEVEL_FAIL');

        emit Withdrawal(recepient, value, token);
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
        uint64 expiry,
        bool withReverse
    ) private returns (uint256) {
        (uint256 tokenId, uint256 parentId) = _namehash(labels);

        // reverse record is limited for subdomains, it is possible to set a reverse record
        // to the same address as the parent domain owner
        if (withReverse && labels.length > 2 && unsRegistry.ownerOf(parentId) != to) {
            revert('MintingManager: REVERSE_RECORD_NOT_ALLOWED');
        }

        if (unsRegistry.exists(tokenId) && (unsRegistry.ownerOf(tokenId) == address(this) || unsRegistry.isExpired(tokenId))) {
            if (expiry > 0) {
                unsRegistry.setExpiry(expiry, tokenId);
            }

            unsRegistry.unlockWithRecords(to, labels, keys, values, withReverse);
        } else {
            _beforeTokenMint(tokenId);

            if (_useCNS(labels) && labels.length == 2 && expiry == 0) {
                cnsMintingController.mintSLDWithResolver(to, labels[0], address(cnsResolver));
                if (keys.length > 0) {
                    cnsResolver.preconfigure(keys, values, tokenId);
                }
            } else {
                unsRegistry.mintWithRecords(to, labels, keys, values, withReverse);

                if (expiry > 0) {
                    unsRegistry.setExpiry(expiry, tokenId);
                }
            }
        }

        return tokenId;
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
        require(isBlocked(tokenId) == false, 'MintingManager: TOKEN_BLOCKED');
        _block(tokenId);
    }

    function _ensureAllowed(
        uint256 tld,
        string memory label,
        uint64 expiry
    ) private view {
        require(_isTld(tld), 'MintingManager: TLD_NOT_REGISTERED');
        require(_expirableTlds[tld] == (expiry > 0), 'MintingManager: TLD_EXPIRABLE_MISMATCH');

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
    function _addTld(string memory tld, bool isExpirable) private {
        uint256 tokenId = _namehash(uint256(0x0), tld);

        _tlds[tokenId] = tld;
        _expirableTlds[tokenId] = isExpirable;

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
     * The label must contains letters, digits, and hyphen.
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

        uint8 data = _charAt(ptr, 0); // first symbol
        if (
            !(data >= 48 && data <= 57) && !(data >= 97 && data <= 122) // 0-9 and a-z
        ) {
            return false;
        }

        uint256 labelLength = bytes(str).length;
        if (labelLength > 1) {
            data = _charAt(ptr, labelLength - 1); // last symbol
            if (
                !(data >= 48 && data <= 57) && !(data >= 97 && data <= 122) // 0-9 and a-z
            ) {
                return false;
            }
        }

        for (uint256 i = 1; i < labelLength - 1; i++) {
            data = _charAt(ptr, i);
            if (
                data != 45 && // hyphen (-)
                !(data >= 48 && data <= 57) && // 0-9
                !(data >= 97 && data <= 122) // a-z
            ) {
                return false;
            }
        }
        return true;
    }

    function _charAt(uint256 ptr, uint256 index) private pure returns (uint8) {
        bytes1 ptrdata;
        /* solium-disable-next-line security/no-inline-assembly */
        assembly {
            ptrdata := mload(add(ptr, index))
        }
        return uint8(ptrdata);
    }

    function _verifyPurchaseSignature(
        address owner,
        string[] calldata labels,
        uint64 expiry,
        uint256 price,
        address token,
        bytes memory signature
    ) private view {
        (uint256 tokenId, ) = _namehash(labels);

        address signer = keccak256(abi.encodePacked(address(this), block.chainid, owner, tokenId, expiry, price, token))
            .toEthSignedMessageHash()
            .recover(signature);

        require(isMinter(signer), 'MintingManager: SIGNER_IS_NOT_MINTER');
        require(expiry > block.timestamp, 'MintingManager: EXPIRED_SIGNATURE');
    }

    function _handlePurchase(
        address owner,
        string[] calldata labels,
        string[] calldata keys,
        string[] calldata values,
        uint256 price,
        address token
    ) private {
        uint256 tokenId = _issueWithRecords(owner, labels, keys, values, 0, _msgSender() == owner);

        emit DomainPurchase(tokenId, _msgSender(), owner, price, token);
    }

    // Reserved storage space to allow for layout changes in the future.
    uint256[48] private __gap;
}
