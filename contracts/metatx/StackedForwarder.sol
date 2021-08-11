// @author Unstoppable Domains, Inc.
// @date August 5th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

import './IUniversalForwarder.sol';

/**
 * @title StackedForwarder
 * @dev StackedForwarder simplifies operation with legacy meta-transactions.
 * It works on top of existing contracts infrastructure.
 */
contract StackedForwarder is Initializable, IUniversalForwarder {
    using ECDSAUpgradeable for bytes32;

    struct ForwardingRule {
        bytes4 selector;
        uint256 sigOffset;
    }

    mapping(bytes4 => ForwardingRule) private _rules;

    function initialize() public initializer {
        _rules[bytes4(keccak256('transferFrom(address,address,uint256)'))] = ForwardingRule(
            bytes4(keccak256('transferFromFor(address,address,uint256,bytes)')),
            0x20 * 4
        );
    }

    function nonceOf(uint256 tokenId) public view override returns (uint256) {
        //TODO: figure out how to fetch nonce when target address is absent
        return 0;
    }

    function verify(ForwardRequest calldata req, bytes calldata signature) external view override returns (bool) {
        uint256 nonce = nonceOf(req.tokenId);
        address signer = keccak256(abi.encodePacked(keccak256(req.data), req.to, nonce))
            .toEthSignedMessageHash()
            .recover(signature);
        return nonce == req.nonce && signer == req.from;
    }

    function execute(ForwardRequest calldata req, bytes calldata signature) public override returns (bytes memory) {
        uint256 gas = gasleft();

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = req.to.call{gas: gas}(buildData(req, signature));
        // Validate that the relayer has sent enough gas for the call.
        // See https://ronan.eth.link/blog/ethereum-gas-dangers/
        assert(gasleft() > gas / 63);

        return _verifyCallResult(success, returndata, 'StackedForwarder: CALL_FAILED');
    }

    function buildData(ForwardRequest calldata req, bytes calldata signature) public view returns (bytes memory) {
        bytes4 selector;
        bytes memory _data = req.data;
        /* solium-disable-next-line security/no-inline-assembly */
        assembly {
            selector := mload(add(_data, add(0x20, 0)))
        }

        bytes memory data = req.data;
        if (_rules[selector].selector != 0) {
            data = abi.encodePacked(
                _rules[selector].selector,
                req.data[4:],
                _rules[selector].sigOffset,
                signature.length,
                signature
            );
        }

        return data;
    }

    function _verifyCallResult(
        bool success,
        bytes memory returndata,
        string memory errorMessage
    ) private pure returns (bytes memory) {
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
}
