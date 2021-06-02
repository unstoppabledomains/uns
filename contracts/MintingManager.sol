// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';

import './IMintingManager.sol';
import './ISLDMinter.sol';
import './metatx/Relayer.sol';
import './roles/MinterRole.sol';
import './cns/ICryptoSLDMinter.sol';

/**
 * @title MintingManager
 * @dev Defines the functions for distribution of Second Level Domains (SLD)s.
 */
contract MintingManager is IMintingManager, MinterRole, Relayer {
    string public constant NAME = 'UNS: Minting Manager';
    string public constant VERSION = '0.1.0';
    string private constant FREE_DOMAIN_NAME_PREFIX = 'udtestdev-';

    ISLDMinter internal _unsMinter;
    ICryptoSLDMinter internal _cryptoMinter;

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

    modifier validTld(uint256 tld) {
        require(bytes(_tlds[tld]).length > 0, 'MintingManager: TLD_NOT_VALID');
        _;
    }

    function initialize(ISLDMinter unsMinter, ICryptoSLDMinter cryptoMinter) public initializer {
        _unsMinter = unsMinter;
        _cryptoMinter = cryptoMinter;

        __Ownable_init_unchained();
        __MinterRole_init_unchained();

        // Relayer is required to be a minter
        _addMinter(address(this));

        _tlds[0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f] = 'crypto';
        _tlds[0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230] = 'wallet';
        _tlds[0x7674e7282552c15f203b9c4a6025aeaf28176ef7f5451b280f9bada3f8bc98e2] = 'coin';
    }

    function mintSLD(address to, uint256 tld, string calldata label)
        external
        override
        onlyMinter
        validTld(tld)
    {
        if(tld == 0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f) {
            _cryptoMinter.mintSLD(to, label);
        } else {
            _unsMinter.mintSLD(to, tld, label);
        }
    }

    function safeMintSLD(address to, uint256 tld, string calldata label)
        external
        override
        onlyMinter
        validTld(tld)
    {
        _unsMinter.safeMintSLD(to, tld, label);
    }

    function safeMintSLD(
        address to,
        uint256 tld,
        string calldata label,
        bytes calldata _data
    ) external override onlyMinter validTld(tld) {
        _unsMinter.safeMintSLD(to, tld, label, _data);
    }

    function mintSLDWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external override onlyMinter validTld(tld) {
        _unsMinter.mintSLDWithRecords(to, tld, label, keys, values);
    }

    function claim(uint256 tld, string calldata label) external override validTld(tld) {
        _claimSLD(_msgSender(), tld, label);
    }

    function claimTo(address to, uint256 tld, string calldata label) external override validTld(tld) {
        _claimSLD(to, tld, label);
    }

    function claimToWithRecords(
        address to,
        uint256 tld,
        string calldata label,
        string[] calldata keys,
        string[] calldata values
    ) external override validTld(tld) {
        _unsMinter.mintSLDWithRecords(to, tld, _freeSLDLabel(label), keys, values);
    }

    function _verifyRelaySigner(address signer) internal view override {
        super._verifyRelaySigner(signer);
        require(isMinter(signer), 'MintingManager: SIGNER_IS_NOT_MINTER');
    }

    function _verifyRelayCall(bytes4 funcSig, bytes calldata) internal pure override {
        bool isSupported = funcSig == _SIG_MINT ||
            funcSig == _SIG_SAFE_MINT ||
            funcSig == _SIG_SAFE_MINT_DATA ||
            funcSig == _SIG_MINT_WITH_RECORDS;

        require(isSupported, 'MintingManager: UNSUPPORTED_RELAY_CALL');
    }

    function _claimSLD(address to, uint256 tld, string calldata label) private {
        _unsMinter.mintSLD(to, tld, _freeSLDLabel(label));
    }

    function _freeSLDLabel(string calldata label) private pure returns(string memory) {
        return string(abi.encodePacked(FREE_DOMAIN_NAME_PREFIX, label));
    }
}
