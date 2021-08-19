// @author Unstoppable Domains, Inc.
// @date August 12th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

import './IForwarder.sol';
import './BaseForwarder.sol';

/**
 * @title BaseRoutingForwarder
 * @dev BaseRoutingForwarder simplifies operation with legacy meta-transactions by routing calls
 */
abstract contract BaseRoutingForwarder is BaseForwarder {
    struct RoutingRule {
        bytes4 selector;
        uint8 sigOffset;
    }

    mapping(bytes4 => RoutingRule) private _rules;

    function _verify(
        ForwardRequest memory req,
        address target,
        bytes memory signature
    ) internal view override returns (bool) {
        return super._verify(req, target, signature) && _isKnownRoute(req.data);
    }

    function _buildData(
        address, /* from */
        uint256, /* tokenId */
        bytes memory data,
        bytes memory signature
    ) internal view override returns (bytes memory) {
        RoutingRule memory rule = _getRule(data);
        require(rule.selector != 0, 'BaseRoutingForwarder: ROUTE_UNKNOWN');

        bytes memory _data;
        assembly {
            _data := add(data, 4)
            mstore(_data, sub(mload(data), 4))
        }

        return abi.encodePacked(rule.selector, _data, uint256(rule.sigOffset), signature.length, signature);
    }

    function _addRule(
        bytes memory from,
        bytes memory to,
        uint8 sigPosition
    ) internal {
        _rules[bytes4(keccak256(from))] = RoutingRule(bytes4(keccak256(to)), uint8(0x20 * sigPosition));
    }

    function _getRule(bytes memory data) internal view returns (RoutingRule memory) {
        bytes4 selector;
        /* solium-disable-next-line security/no-inline-assembly */
        assembly {
            selector := mload(add(data, add(0x20, 0)))
        }

        return _rules[selector];
    }

    function _isKnownRoute(bytes memory data) internal view returns (bool) {
        RoutingRule memory rule = _getRule(data);
        return rule.selector != 0;
    }
}
