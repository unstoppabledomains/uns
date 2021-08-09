// @author Unstoppable Domains, Inc.
// @date August 5th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

contract UniversalForwarder is Initializable, EIP712Upgradeable {
    using ECDSAUpgradeable for bytes32;

    struct ForwardRequest {
        address from;
        address to;
        uint256 gas;
        uint256 nonce;
        bytes data;
    }

    bytes32 private constant _TYPEHASH =
        keccak256('ForwardRequest(address from,address to,uint256 gas,uint256 nonce,bytes data)');

    // mapping(address => uint256) private _nonces;

    // solhint-disable-next-line func-name-mixedcase
    function __UniversalForwarder_init() internal initializer {
        __UniversalForwarder_init_unchained();
    }

    // solhint-disable-next-line func-name-mixedcase
    function __UniversalForwarder_init_unchained() internal initializer {
        __EIP712_init_unchained('UniversalForwarder', '0.0.1');
    }

    // function getNonce(address from) public view returns (uint256) {
    //     return _nonces[from];
    // }

    // function verify(ForwardRequest calldata req, bytes calldata signature) public view returns (bool) {
    //     address signer = _hashTypedDataV4(
    //         keccak256(abi.encode(_TYPEHASH, req.from, req.to, req.gas, req.nonce, keccak256(req.data)))
    //     ).recover(signature);
    //     return _nonces[req.from] == req.nonce && signer == req.from;
    // }

    function execute(ForwardRequest calldata req, bytes calldata /* signature */) public returns (bool, bytes memory) {
        // require(verify(req, signature), 'UniversalForwarder: SIGNATURE_INVALID');
        // _nonces[req.from] = req.nonce + 1;

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = req.to.call{gas: req.gas}(req.data);
        // Validate that the relayer has sent enough gas for the call.
        // See https://ronan.eth.link/blog/ethereum-gas-dangers/
        assert(gasleft() > req.gas / 63);

        return (success, returndata);
    }
}
