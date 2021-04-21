pragma solidity 0.5.12;
pragma experimental ABIEncoderV2;

import '@openzeppelin/contracts/cryptography/ECDSA.sol';
import "./BulkWhitelistedRole.sol";
import "../controllers/IMintingController.sol";
import "../controllers/MintingController.sol";
import "../Registry.sol";
import "../Resolver.sol";

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
    Resolver internal _resolver;
    Registry internal _registry;

    /*
     * bytes4(keccak256('mintSLD(address,string)')) == 0x4c0b0ed2
     */
    bytes4 private constant _SIG_MINT = 0x4c0b0ed2;

    /*
     * bytes4(keccak256('mintSLDToDefaultResolver(address,string,string[],string[])')) == 0x3d7989fe
     */
    bytes4 private constant _SIG_MINT_DEF_RESOLVER = 0x3d7989fe;

    /*
     * bytes4(keccak256('mintSLDToResolver(address,string,string[],string[],address)')) == 0xaceb4764
     */
    bytes4 private constant _SIG_MINT_RESOLVER = 0xaceb4764;

    /*
     * bytes4(keccak256('safeMintSLD(address,string)')) == 0xb2da2979
     */
    bytes4 private constant _SIG_SAFE_MINT = 0xb2da2979;

    /*
     * bytes4(keccak256('safeMintSLD(address,string,bytes)')) == 0xbe362e2e
     */
    bytes4 private constant _SIG_SAFE_MINT_DATA = 0xbe362e2e;

    /*
     * bytes4(keccak256('safeMintSLDToDefaultResolver(address,string,string[],string[])')) == 0x61050ffd
     */
    bytes4 private constant _SIG_SAFE_MINT_DEF_RESOLVER = 0x61050ffd;

    /*
     * bytes4(keccak256('safeMintSLDToDefaultResolver(address,string,string[],string[],bytes)')) == 0x4b18abea
     */
    bytes4 private constant _SIG_SAFE_MINT_DEF_RESOLVER_DATA = 0x4b18abea;

    /*
     * bytes4(keccak256('safeMintSLDToResolver(address,string,string[],string[],address)')) == 0x4b44c01a
     */
    bytes4 private constant _SIG_SAFE_MINT_RESOLVER = 0x4b44c01a;

    /*
     * bytes4(keccak256('safeMintSLDToResolver(address,string,string[],string[],bytes,address)')) == 0x898851f8
     */
    bytes4 private constant _SIG_SAFE_MINT_RESOLVER_DATA = 0x898851f8;

    constructor(MintingController mintingController) public {
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
        onlyWhitelisted
    {
        _mintingController.mintSLD(to, label);
    }

    function safeMintSLD(address to, string calldata label)
        external
        onlyWhitelisted
    {
        _mintingController.safeMintSLD(to, label);
    }

    function safeMintSLD(
        address to,
        string calldata label,
        bytes calldata _data
    ) external onlyWhitelisted {
        _mintingController.safeMintSLD(to, label, _data);
    }

    function mintSLDToDefaultResolver(
        address to,
        string memory label,
        string[] memory keys,
        string[] memory values
    ) public onlyWhitelisted {
        mintSLDToResolver(to, label, keys, values, address(_resolver));
    }

    function mintSLDToResolver(
        address to,
        string memory label,
        string[] memory keys,
        string[] memory values,
        address resolver
    ) public onlyWhitelisted {
        _mintingController.mintSLDWithResolver(to, label, resolver);
        preconfigureResolver(label, keys, values, resolver);
    }

    function safeMintSLDToDefaultResolver(
        address to,
        string memory label,
        string[] memory keys,
        string[] memory values
    ) public onlyWhitelisted {
        safeMintSLDToResolver(to, label, keys, values, address(_resolver));
    }

    function safeMintSLDToResolver(
        address to,
        string memory label,
        string[] memory keys,
        string[] memory values,
        address resolver
    ) public onlyWhitelisted {
        _mintingController.safeMintSLDWithResolver(to, label, resolver);
        preconfigureResolver(label, keys, values, resolver);
    }

    function safeMintSLDToDefaultResolver(
        address to,
        string memory label,
        string[] memory keys,
        string[] memory values,
        bytes memory _data
    ) public onlyWhitelisted {
        safeMintSLDToResolver(to, label, keys, values, _data, address(_resolver));
    }

    function safeMintSLDToResolver(
        address to,
        string memory label,
        string[] memory keys,
        string[] memory values,
        bytes memory _data,
        address resolver
    ) public onlyWhitelisted {
        _mintingController.safeMintSLDWithResolver(to, label, resolver, _data);
        preconfigureResolver(label, keys, values, resolver);
    }

    function setDefaultResolver(address resolver) external onlyWhitelistAdmin {
        _resolver = Resolver(resolver);
    }

    function getDefaultResolver() external view returns (address) {
        return address(_resolver);
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
                let size := returndatasize
                returndatacopy(ptr, 0, size)
                revert(ptr, size)
            }
        }

        emit Relayed(msg.sender, signer, funcSig, dataHash);
        return result;
    }

    function preconfigureResolver(
        string memory label,
        string[] memory keys,
        string[] memory values,
        address resolver
    ) private {
        if(keys.length == 0) {
            return;
        }

        Resolver(resolver).preconfigure(keys, values, _registry.childIdOf(_registry.root(), label));
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
            sig == _SIG_MINT_DEF_RESOLVER ||
            sig == _SIG_MINT_RESOLVER ||
            sig == _SIG_SAFE_MINT ||
            sig == _SIG_SAFE_MINT_DATA ||
            sig == _SIG_SAFE_MINT_DEF_RESOLVER ||
            sig == _SIG_SAFE_MINT_DEF_RESOLVER_DATA ||
            sig == _SIG_SAFE_MINT_RESOLVER ||
            sig == _SIG_SAFE_MINT_RESOLVER_DATA;

        require(isSupported, 'WhitelistedMinter: UNSUPPORTED_CALL');
    }
}
