// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';

import "../roles/BulkWhitelistedRole.sol";
import "../controllers/IMintingController.sol";
import "../controllers/MintingController.sol";
import "../Registry.sol";

/**
 * @title WhitelistedMinter
 * @dev Defines the functions for distribution of Second Level Domains (SLD)s.
 */
contract WhitelistedMinter is IMintingController, BulkWhitelistedRole {
    using ECDSA for bytes32;

    event Relayed(address indexed sender, address indexed signer, bytes4 indexed funcSig, bytes32 dataHash);

    string public constant NAME = 'Unstoppable Whitelisted Minter';
    string public constant VERSION = '0.3.0';

    MintingController internal _mintingController;
    Registry internal _registry;

    /*
     * bytes4(keccak256('mintSLD(address,string)')) == 0x4c0b0ed2
     */
    bytes4 private constant _SIG_MINT = 0x4c0b0ed2;

    /*
     * bytes4(keccak256('safeMintSLD(address,string)')) == 0xb2da2979
     */
    bytes4 private constant _SIG_SAFE_MINT = 0xb2da2979;

    /*
     * bytes4(keccak256('safeMintSLD(address,string,bytes)')) == 0xbe362e2e
     */
    bytes4 private constant _SIG_SAFE_MINT_DATA = 0xbe362e2e;

    constructor(MintingController mintingController) {
        _mintingController = mintingController;
        _registry = Registry(mintingController.registry());
        _addWhitelisted(address(this));
    }

    function renounceMinter() external onlyWhitelistAdmin {
        _mintingController.renounceMinter();
    }

    /**
     * Renounce whitelisted account with funds' forwarding
     */
    function closeWhitelisted(address payable receiver)
        external
        payable
        onlyWhitelisted
    {
        require(receiver != address(0x0), "WhitelistedMinter: RECEIVER_IS_EMPTY");

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
        require(receiver != address(0x0), "WhitelistedMinter: RECEIVER_IS_EMPTY");

        _addWhitelisted(receiver);
        renounceWhitelisted();
        receiver.transfer(msg.value);
    }

    function mintSLD(address to, string calldata label)
        external
        override
        onlyWhitelisted
    {
        _mintingController.mintSLD(to, label);
    }

    function safeMintSLD(address to, string calldata label)
        external
        override
        onlyWhitelisted
    {
        _mintingController.safeMintSLD(to, label);
    }

    function safeMintSLD(
        address to,
        string calldata label,
        bytes calldata _data
    ) external override onlyWhitelisted {
        _mintingController.safeMintSLD(to, label, _data);
    }

    function mintSLDWithRecords(
        address to,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyWhitelisted {
        _mintingController.mintSLDWithRecords(to, label, keys, values);
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
            sig == _SIG_SAFE_MINT_DATA;

        require(isSupported, 'WhitelistedMinter: UNSUPPORTED_CALL');
    }
}
