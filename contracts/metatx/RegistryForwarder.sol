// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

/**
 * @dev https://eips.ethereum.org/EIPS/eip-2771[EIP 2771] is a standard for native meta transactions.
 *
 * A base contract to be inherited by any contract that want to forward transactions.
 */
abstract contract RegistryForwarder is Initializable, EIP712Upgradeable {
    using ECDSAUpgradeable for bytes32;

    struct ForwardRequest {
        address from;
        uint256 gas;
        uint256 tokenId;
        uint256 nonce;
        bytes data;
    }

    bytes32 private constant TYPEHASH =
        keccak256("ForwardRequest(address from,uint256 gas,uint256 tokenId,uint256 nonce,bytes data)");

    mapping(uint256 => uint256) private _nonces;

    function __RegistryForwarder_init() internal initializer {
        __RegistryForwarder_init_unchained();
    }

    function __RegistryForwarder_init_unchained() internal initializer {
        __EIP712_init_unchained("RegistryForwarder", "0.0.1");
    }

    /*
     * 0x23b872dd == bytes4(keccak256('transferFrom(address,address,uint256)'))
     */
    function transferFromFor(address from, address to, uint256 tokenId, bytes calldata signature) external {
        bytes memory data = abi.encodeWithSelector(0x23b872dd, from, to, tokenId);
        address signer = _recover(keccak256(data), tokenId, signature);

        (bool success,) = address(this).call(abi.encodePacked(data, signer, tokenId));
        if (success == false) {
            /* solium-disable-next-line security/no-inline-assembly */
            assembly {
                let ptr := mload(0x40)
                let size := returndatasize()
                returndatacopy(ptr, 0, size)
                revert(ptr, size)
            }
        }
    }

    function nonceOf(uint256 tokenId) public view returns (uint256) {
        return _nonces[tokenId];
    }

    function verify(ForwardRequest calldata req, bytes calldata signature) public view returns (bool) {
        address signer = _hashTypedDataV4(keccak256(abi.encode(
            TYPEHASH,
            req.from,
            req.gas,
            req.tokenId,
            req.nonce,
            keccak256(req.data)
        ))).recover(signature);
        return _nonces[req.tokenId] == req.nonce && signer == req.from;
    }

    function execute(ForwardRequest calldata req, bytes calldata signature) public returns (bool, bytes memory) {
        require(verify(req, signature), "RegistryForwarder: signature does not match request");
        _nonces[req.tokenId] = req.nonce + 1;

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = address(this).call{gas: req.gas}(abi.encodePacked(req.data, req.from, req.tokenId));
        // Validate that the relayer has sent enough gas for the call.
        // See https://ronan.eth.link/blog/ethereum-gas-dangers/
        assert(gasleft() > req.gas / 63);

        return (success, returndata);
    }

    function _recover(bytes32 digest, uint256 tokenId, bytes memory signature) internal returns(address signer) {
        signer = keccak256(abi.encodePacked(digest, address(this), _nonces[tokenId]))
            .toEthSignedMessageHash()
            .recover(signature);
        require(signer != address(0), "RegistryForwarder: INVALID_SIGNER");

        _invalidateNonce(tokenId);
    }

    function _invalidateNonce(uint256 tokenId) internal {
        _nonces[tokenId] = _nonces[tokenId] + 1;
    }

    uint256[50] private __gap;
}
