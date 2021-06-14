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
        _executeFor(abi.encodeWithSelector(0x23b872dd, from, to, tokenId), tokenId, signature);
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
        _executeFor(abi.encodeWithSelector(0xb88d4fde, from, to, tokenId, _data), tokenId, signature);
    }

    /*
     * 0x42842e0e == bytes4(keccak256('safeTransferFrom(address,address,uint256)'))
     */
    function safeTransferFromFor(address from, address to, uint256 tokenId, bytes calldata signature) external {
        _executeFor(abi.encodeWithSelector(0x42842e0e, from, to, tokenId), tokenId, signature);
    }

    /*
     * 0x42966c68 == bytes4(keccak256('burn(uint256)'))
     */
    function burnFor(uint256 tokenId, bytes calldata signature) external {
        _executeFor(abi.encodeWithSelector(0x42966c68, tokenId), tokenId, signature);
    }

    /*
     * 0x310bd74b == bytes4(keccak256('reset(uint256)'))
     */
    function resetFor(uint256 tokenId, bytes calldata signature) external {
        _executeFor(abi.encodeWithSelector(0x310bd74b, tokenId), tokenId, signature);
    }

    /*
     * 0x47c81699 == bytes4(keccak256('set(string,string,uint256)'))
     */
    function setFor(
        string calldata key,
        string calldata value,
        uint256 tokenId,
        bytes calldata signature
    ) external {
        _executeFor(abi.encodeWithSelector(0x47c81699, key, value, tokenId), tokenId, signature);
    }

    /*
     * 0xce92b33e == bytes4(keccak256('setMany(string[],string[],uint256)'))
     */
    function setManyFor(
        string[] calldata keys,
        string[] calldata values,
        uint256 tokenId,
        bytes calldata signature
    ) public {
        _executeFor(abi.encodeWithSelector(0xce92b33e, keys, values, tokenId), tokenId, signature);
    }

    /*
     * 0xec129eea == bytes4(keccak256('reconfigure(string[],string[],uint256)'))
     */
    function reconfigureFor(
        string[] calldata keys,
        string[] calldata values,
        uint256 tokenId,
        bytes calldata signature
    ) public {
        _executeFor(abi.encodeWithSelector(0xec129eea, keys, values, tokenId), tokenId, signature);
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

    function _executeFor(bytes memory data, uint256 tokenId, bytes memory signature) private returns (bytes memory) {
        uint256 gas = gasleft();
        address from = _recover(keccak256(data), tokenId, signature);

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = address(this).call{gas: gas}(abi.encodePacked(data, from, tokenId));
        // Validate that the relayer has sent enough gas for the call.
        // See https://ronan.eth.link/blog/ethereum-gas-dangers/
        assert(gasleft() > gas / 63);

        return _verifyCallResult(success, returndata, "RegistryForwarder: low-level call failed");
    }

    function _verifyCallResult(bool success, bytes memory returndata, string memory errorMessage) private pure returns(bytes memory) {
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                // solhint-disable-next-line no-inline-assembly
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }

    uint256[50] private __gap;
}
