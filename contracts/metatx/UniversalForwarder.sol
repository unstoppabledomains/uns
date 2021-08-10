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

    struct ForwardingRule {
        bytes4 selector;
        uint256 sigOffset;
    }

    bytes32 private constant _TYPEHASH =
        keccak256('ForwardRequest(address from,address to,uint256 gas,uint256 nonce,bytes data)');

    mapping(bytes4 => ForwardingRule) private _rules;

    function initialize() public initializer {
        __EIP712_init_unchained('UniversalForwarder', '0.0.1');
        _rules[0x23b872dd] = ForwardingRule(0xef2c3088, 0x80); // transferFrom -> transferFromFor
    }

    function execute(ForwardRequest calldata req, bytes calldata signature) public returns (bool, bytes memory) {
        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = req.to.call{gas: req.gas}(build(req, signature));
        // Validate that the relayer has sent enough gas for the call.
        // See https://ronan.eth.link/blog/ethereum-gas-dangers/
        assert(gasleft() > req.gas / 63);

        return (success, returndata);
    }

    function build(ForwardRequest calldata req, bytes calldata signature) public view returns (bytes memory) {
        bytes4 funcSig;
        bytes memory _data = req.data;
        /* solium-disable-next-line security/no-inline-assembly */
        assembly {
            funcSig := mload(add(_data, add(0x20, 0)))
        }

        bytes memory data = req.data;
        if (_rules[funcSig].selector != 0) {
            data = abi.encodePacked(
                _rules[funcSig].selector,
                req.data[4:],
                _rules[funcSig].sigOffset,
                signature.length,
                signature
            );
        }

        return data;
    }
}
