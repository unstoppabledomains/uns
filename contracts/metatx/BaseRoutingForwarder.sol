// @author Unstoppable Domains, Inc.
// @date August 12th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

import './IForwarder.sol';
import './BaseForwarder.sol';
import './../libraries/Errors.sol';

/**
 * @title BaseRoutingForwarder
 * @dev BaseRoutingForwarder simplifies operation with legacy meta-transactions by routing calls
 */
abstract contract BaseRoutingForwarder is BaseForwarder {
    mapping(bytes4 => bytes4) private _routes;

    function _buildRouteData(
        bytes4 selector,
        bytes memory data,
        bytes memory signature
    ) internal view virtual returns (bytes memory);

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
        bytes4 route = _getRoute(data);
        require(route != 0, Errors.RFW_ROUTE_UNKNOWN);

        bytes memory _data;
        assembly {
            _data := add(data, 4)
            mstore(_data, sub(mload(data), 4))
        }

        return _buildRouteData(route, _data, signature);
    }

    function _addRoute(bytes memory from, bytes memory to) internal {
        _routes[bytes4(keccak256(from))] = bytes4(keccak256(to));
    }

    function _getRoute(bytes memory data) internal view returns (bytes4) {
        bytes4 selector;
        /* solium-disable-next-line security/no-inline-assembly */
        assembly {
            selector := mload(add(data, add(0x20, 0)))
        }

        return _routes[selector];
    }

    function _isKnownRoute(bytes memory data) internal view returns (bool) {
        bytes4 route = _getRoute(data);
        return route != 0;
    }
}
