// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';

import './IMintingManager.sol';
import '../roles/MinterRole.sol';
import '../Registry.sol';

/**
 * @title MintingManager
 * @dev Defines the functions for distribution of Second Level Domains (SLD)s.
 */
contract MintingManager is IMintingManager, MinterRole {
    using ECDSAUpgradeable for bytes32;

    string public constant NAME = 'UNS: Minting Manager';
    string public constant VERSION = '0.1.0';
    string private constant FREE_DOMAIN_NAME_PREFIX = 'udtestdev-';

    Registry internal _registry;

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

    function initialize(Registry registry_) public initializer {
        _registry = registry_;
        __Ownable_init_unchained();
        __MinterRole_init_unchained();
        _addMinter(address(this));

        _tlds[0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f] = 'crypto';
        _tlds[0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230] = 'wallet';
        _tlds[0x7674e7282552c15f203b9c4a6025aeaf28176ef7f5451b280f9bada3f8bc98e2] = 'coin';
    }

    function mintSLD(address to, uint256 tld, string calldata label)
        external
        override
        onlyMinter
    {
        _registry.mintSLD(to, tld, label);
    }

    function safeMintSLD(address to, uint256 tld, string calldata label)
        external
        override
        onlyMinter
    {
        _registry.safeMintSLD(to, tld, label);
    }

    function safeMintSLD(
        address to,
        uint256 tld,
        string calldata label,
        bytes calldata _data
    ) external override onlyMinter {
        _registry.safeMintSLD(to, tld, label, _data);
    }

    function mintSLDWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyMinter {
        _registry.mintSLDWithRecords(to, tld, label, keys, values);
    }

    function claim(uint256 tld, string calldata label) external override {
        _claimSLD(_msgSender(), tld, label);
    }

    function claimTo(address to, uint256 tld, string calldata label) external override {
        _claimSLD(to, tld, label);
    }

    function claimToWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external override {
        _registry.mintSLDWithRecords(to, tld, _freeSLDLabel(label), keys, values);
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

        emit Relayed(_msgSender(), signer, funcSig, dataHash);
        return result;
    }

    function verifySigner(bytes32 data, bytes memory signature) private view returns(address signer) {
        signer = keccak256(abi.encodePacked(data, address(this)))
            .toEthSignedMessageHash()
            .recover(signature);
        require(signer != address(0), 'MintingManager: SIGNATURE_IS_INVALID');
        require(isMinter(signer), 'MintingManager: SIGNER_IS_NOT_MINTER');
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

        require(isSupported, 'MintingManager: UNSUPPORTED_CALL');
    }

    function _claimSLD(address to, uint256 tld, string calldata label) private {
        _registry.mintSLD(to, tld, _freeSLDLabel(label));
    }

    function _freeSLDLabel(string calldata label) private pure returns(string memory) {
        return string(abi.encodePacked(FREE_DOMAIN_NAME_PREFIX, label));
    }
}
