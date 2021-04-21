pragma solidity 0.5.12;

import "./ISignatureController.sol";
import '@openzeppelin/contracts/cryptography/ECDSA.sol';
import "../Registry.sol";
import "../util/SignatureUtil.sol";

// solium-disable error-reason

/**
 * @title SignatureController
 * @dev The SignatureController allows any account to submit select management
 * transactions on behalf of a token owner.
 */
contract SignatureController is ISignatureController, SignatureUtil {

    constructor (Registry registry) public SignatureUtil(registry) {}

    /*
     * 0x23b872dd == bytes4(keccak256('transferFrom(address,address,uint256)'))
     */
    function transferFromFor(address from, address to, uint256 tokenId, bytes calldata signature) external {
        _validate(
            keccak256(abi.encodeWithSelector(0x23b872dd, from, to, tokenId)),
            tokenId,
            signature
        );
        _registry.controlledTransferFrom(from, to, tokenId);
    }

    /*
     * 0xb88d4fde == bytes4(keccak256('safeTransferFrom(address,address,uint256,bytes)'))
     */
    function safeTransferFromFor(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata _data,
        bytes calldata signature
    )
        external
    {
        _validate(
            keccak256(abi.encodeWithSelector(0xb88d4fde, from, to, tokenId, _data)),
            tokenId,
            signature
        );
        _registry.controlledSafeTransferFrom(from, to, tokenId, _data);
    }

    /*
     * 0x42842e0e == bytes4(keccak256('safeTransferFrom(address,address,uint256)'))
     */
    function safeTransferFromFor(address from, address to, uint256 tokenId, bytes calldata signature) external {
        _validate(
            keccak256(abi.encodeWithSelector(0x42842e0e, from, to, tokenId)),
            tokenId,
            signature
        );
        _registry.controlledSafeTransferFrom(from, to, tokenId, "");
    }

    /*
     * 0x42966c68 == bytes4(keccak256('burn(uint256)'))
     */
    function burnFor(uint256 tokenId, bytes calldata signature) external {
        _validate(
            keccak256(abi.encodeWithSelector(0x42966c68, tokenId)),
            tokenId,
            signature
        );
        _registry.controlledBurn(tokenId);
    }

    /*
     * 0xd8d3cc6e == bytes4(keccak256('mintChild(address,uint256,string)'))
     */
    function mintChildFor(address to, uint256 tokenId, string calldata label, bytes calldata signature) external {
        _validate(
            keccak256(abi.encodeWithSelector(0xd8d3cc6e, to, tokenId, label)),
            tokenId,
            signature
        );
        _registry.controlledMintChild(to, tokenId, label);
    }

    /*
     * 0xce9fb82b == bytes4(keccak256('safeMintChild(address,uint256,string,bytes)'))
     */
    function safeMintChildFor(address to, uint256 tokenId, string calldata label, bytes calldata _data, bytes calldata signature) external {
        _validate(
            keccak256(abi.encodeWithSelector(0xce9fb82b, to, tokenId, label, _data)),
            tokenId,
            signature
        );
        _registry.controlledSafeMintChild(to, tokenId, label, _data);
    }

    /*
     * 0x7c69eae2 == bytes4(keccak256('safeMintChild(address,uint256,string)'))
     */
    function safeMintChildFor(address to, uint256 tokenId, string calldata label, bytes calldata signature) external {
        _validate(
            keccak256(abi.encodeWithSelector(0x7c69eae2, to, tokenId, label)),
            tokenId,
            signature
        );
        _registry.controlledSafeMintChild(to, tokenId, label, "");
    }

    /*
     * 0x9e5be9a5 == bytes4(keccak256('transferFromChild(address,address,uint256,string)'))
     */
    function transferFromChildFor(
        address from,
        address to,
        uint256 tokenId,
        string calldata label,
        bytes calldata signature
    )
        external
    {
        _validate(
            keccak256(abi.encodeWithSelector(0x9e5be9a5, from, to, tokenId, label)),
            tokenId,
            signature
        );
        _registry.controlledTransferFrom(from, to, _registry.childIdOf(tokenId, label));
    }

    /*
     * 0xc29b52f9 == bytes4(keccak256('safeTransferFromChild(address,address,uint256,string,bytes)'))
     */
    function safeTransferFromChildFor(
        address from,
        address to,
        uint256 tokenId,
        string calldata label,
        bytes calldata _data,
        bytes calldata signature
    )
        external
    {
        _validate(
            keccak256(abi.encodeWithSelector(0xc29b52f9, from, to, tokenId, label, _data)),
            tokenId,
            signature
        );
        _registry.controlledSafeTransferFrom(from, to, _registry.childIdOf(tokenId, label), _data);
    }

    /*
     * 0x9d743989 == bytes4(keccak256('safeTransferFromChild(address,address,uint256,string)'))
     */
    function safeTransferFromChildFor(
        address from,
        address to,
        uint256 tokenId,
        string calldata label,
        bytes calldata signature
    )
        external
    {
        _validate(
            keccak256(abi.encodeWithSelector(0x9d743989, from, to, tokenId, label)),
            tokenId,
            signature
        );
        _registry.controlledSafeTransferFrom(from, to, _registry.childIdOf(tokenId, label), "");
    }

    /*
     * 0x5cbe1112 == bytes4(keccak256('burnChild(uint256,string)'))
     */
    function burnChildFor(uint256 tokenId, string calldata label, bytes calldata signature) external {
        _validate(
            keccak256(abi.encodeWithSelector(0x5cbe1112, tokenId, label)),
            tokenId,
            signature
        );
        _registry.controlledBurn(_registry.childIdOf(tokenId, label));
    }

    /*
     * 0x2392c189 == bytes4(keccak256('resolveTo(address,uint256)'))
     */
    function resolveToFor(address to, uint256 tokenId, bytes calldata signature) external {
        _validate(
            keccak256(abi.encodeWithSelector(0x2392c189, to, tokenId)),
            tokenId,
            signature
        );
        _registry.controlledResolveTo(to, tokenId);
    }

}
