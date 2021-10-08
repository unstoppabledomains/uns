// @author Unstoppable Domains, Inc.
// @date August 12th, 2021

pragma solidity ^0.8.0;

import '../metatx/BaseRoutingForwarder.sol';

contract BaseRoutingForwarderMock is BaseRoutingForwarder {
    constructor() {
        _addRoute('transferFrom(address,address,uint256)', 'transferFromFor(address,address,uint256,bytes)');
        _addRoute('putString(string)', 'putStringFor(string,bytes)');
        _addRoute('putUint(uint256)', 'putUintFor(uint256,bytes)');
        _addRoute('putUintArr(uint256[])', 'putUintArrFor(uint256[],bytes)');
    }

    function nonceOf(uint256) external pure override returns (uint256) {
        return 0;
    }

    function verify(ForwardRequest calldata, bytes calldata) public pure override returns (bool) {
        revert('mock');
    }

    function execute(ForwardRequest calldata, bytes calldata) public pure override returns (bytes memory) {
        revert('mock');
    }

    function buildRouteData(ForwardRequest calldata req, bytes calldata signature) public view returns (bytes memory) {
        return _buildData(req.from, req.tokenId, req.data, signature);
    }

    // Test functions
    function putString(string calldata) public pure {
        revert('mock');
    }

    function putStringFor(string calldata, bytes calldata) public pure {
        revert('mockFor');
    }

    function putUint(uint) public pure {
        revert('mock');
    }

    function putUintFor(uint, bytes calldata) public pure {
        revert('mockFor');
    }

    function putUintArr(uint[] calldata) public pure {
        revert('mock');
    }

    function putUintArrFor(uint[] calldata, bytes calldata) public pure {
        revert('mockFor');
    }

    function _buildRouteData(
        bytes4 selector,
        bytes memory data,
        bytes memory signature
    ) internal pure override returns (bytes memory) {
        if(selector == bytes4(keccak256('transferFromFor(address,address,uint256,bytes)'))) {
            (address p1, address p2, uint256 p3) = abi.decode(data, (address, address, uint256));
            return abi.encodeWithSelector(selector, p1, p2, p3, signature);
        } else if(selector == bytes4(keccak256('putStringFor(string,bytes)'))) {
            (string memory p1) = abi.decode(data, (string));
            return abi.encodeWithSelector(selector, p1, signature);
        } else if(selector == bytes4(keccak256('putUintFor(uint256,bytes)'))) {
            (uint256 p1) = abi.decode(data, (uint256));
            return abi.encodeWithSelector(selector, p1, signature);
        } else if(selector == bytes4(keccak256('putUintArrFor(uint256[],bytes)'))) {
            (uint256[] memory p1) = abi.decode(data, (uint256[]));
            return abi.encodeWithSelector(selector, p1, signature);
        }
        return '';
    }
}
