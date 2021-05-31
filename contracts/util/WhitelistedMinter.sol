// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';

import '../roles/BulkWhitelistedRole.sol';
import '../ISLDMinter.sol';
import '../Registry.sol';

/**
 * @title WhitelistedMinter
 * @dev Defines the functions for distribution of Second Level Domains (SLD)s.
 */
contract WhitelistedMinter is ISLDMinter, BulkWhitelistedRole {
    using ECDSAUpgradeable for bytes32;

    event Relayed(address indexed sender, address indexed signer, bytes4 indexed funcSig, bytes32 dataHash);

    string public constant NAME = 'Unstoppable Whitelisted Minter';
    string public constant VERSION = '0.3.0';

    Registry internal _registry;

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

    constructor(Registry registry_) {
        _registry = registry_;
        __WhitelistedRole_init_unchained();
        _addWhitelisted(address(this));
    }

    // NOTE: deprecated
    function renounceMinter() external onlyWhitelistAdmin {
        // _registry.renounceMinter();
    }

    /**
     * Renounce whitelisted account with funds' forwarding
     */
    function closeWhitelisted(address payable receiver)
        external
        payable
        onlyWhitelisted
    {
        require(receiver != address(0x0), 'WhitelistedMinter: RECEIVER_IS_EMPTY');

        renounceWhitelisted();
        receiver.transfer(msg.value);
    }

    /**
     * Replace whitelisted account by new account with funds' forwarding
     */
    function rotateWhitelisted(address payable receiver)
        external
        payable
        onlyWhitelisted
    {
        require(receiver != address(0x0), 'WhitelistedMinter: RECEIVER_IS_EMPTY');

        _addWhitelisted(receiver);
        renounceWhitelisted();
        receiver.transfer(msg.value);
    }

    // NOTE: temp function
    function mint() external onlyWhitelistAdmin {
        // .crypto
        _registry.mint(address(0xdead), 0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f);
    }

    function mintSLD(address to, uint256 tld, string calldata label)
        external
        override
        onlyWhitelisted
    {
        _registry.mintSLD(to, tld, label);
    }

    function safeMintSLD(address to, uint256 tld, string calldata label)
        external
        override
        onlyWhitelisted
    {
        _registry.safeMintSLD(to, tld, label);
    }

    function safeMintSLD(
        address to,
        uint256 tld,
        string calldata label,
        bytes calldata _data
    ) external override onlyWhitelisted {
        _registry.safeMintSLD(to, tld, label, _data);
    }

    function mintSLDWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyWhitelisted {
        _registry.mintSLDWithRecords(to, tld, label, keys, values);
    }

    /**
     * Relay allows execute transaction on behalf of whitelisted minter.
     * The function verify signature of call data parameter before execution.
     * It allows anybody send transaction on-chain when minter has provided proper parameters.
     * The function allows to relaying calls of fixed functions. The restriction defined in function `verifyCall`
     */
    function relay(bytes calldata data, bytes calldata signature) external returns(bytes memory) {
        bytes32 dataHash = keccak256(data);
        address signer = verifySigner(dataHash, signature);
        bytes memory _data = data;
        bytes4 funcSig = verifyCall(_data);

        /* solium-disable-next-line security/no-low-level-calls */
        (bool success, bytes memory result) = address(this).call(data);
        if (success == false) {
            /* solium-disable-next-line security/no-inline-assembly */
            assembly {
                let ptr := mload(0x40)
                let size := returndatasize()
                returndatacopy(ptr, 0, size)
                revert(ptr, size)
            }
        }

        emit Relayed(msg.sender, signer, funcSig, dataHash);
        return result;
    }

    function verifySigner(bytes32 data, bytes memory signature) private view returns(address signer) {
        signer = keccak256(abi.encodePacked(data, address(this)))
            .toEthSignedMessageHash()
            .recover(signature);
        require(signer != address(0), 'WhitelistedMinter: SIGNATURE_IS_INVALID');
        require(isWhitelisted(signer), 'WhitelistedMinter: SIGNER_IS_NOT_WHITELISTED');
    }

    function verifyCall(bytes memory data) private pure returns(bytes4 sig) {
        /* solium-disable-next-line security/no-inline-assembly */
        assembly {
            sig := mload(add(data, add(0x20, 0)))
        }

        bool isSupported = sig == _SIG_MINT ||
            sig == _SIG_SAFE_MINT ||
            sig == _SIG_SAFE_MINT_DATA ||
            sig == _SIG_MINT_WITH_RECORDS;

        require(isSupported, 'WhitelistedMinter: UNSUPPORTED_CALL');
    }
}
