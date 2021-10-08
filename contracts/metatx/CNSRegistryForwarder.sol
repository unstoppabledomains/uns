// @author Unstoppable Domains, Inc.
// @date August 12th, 2021

pragma solidity ^0.8.0;

import './IForwarder.sol';
import './BaseRoutingForwarder.sol';

/**
 * @title CNSRegistryForwarder
 * @dev CNSRegistryForwarder simplifies operation with legacy meta-transactions.
 * It works on top of existing SignatureController contract.
 */
contract CNSRegistryForwarder is BaseRoutingForwarder {
    IForwarder private _target;

    constructor(IForwarder target) {
        _target = target;
        _addRoute('transferFrom(address,address,uint256)', 'transferFromFor(address,address,uint256,bytes)');
        _addRoute('safeTransferFrom(address,address,uint256)', 'safeTransferFromFor(address,address,uint256,bytes)');
        _addRoute(
            'safeTransferFrom(address,address,uint256,bytes)',
            'safeTransferFromFor(address,address,uint256,bytes,bytes)'
        );
        _addRoute('burn(uint256)', 'burnFor(uint256,bytes)');
        _addRoute('mintChild(address,uint256,string)', 'mintChildFor(address,uint256,string,bytes)');
        _addRoute('safeMintChild(address,uint256,string)', 'safeMintChildFor(address,uint256,string,bytes)');
        _addRoute(
            'safeMintChild(address,uint256,string,bytes)',
            'safeMintChildFor(address,uint256,string,bytes,bytes)'
        );
        _addRoute(
            'transferFromChild(address,address,uint256,string)',
            'transferFromChildFor(address,address,uint256,string,bytes)'
        );
        _addRoute(
            'safeTransferFromChild(address,address,uint256,string)',
            'safeTransferFromChildFor(address,address,uint256,string,bytes)'
        );
        _addRoute(
            'safeTransferFromChild(address,address,uint256,string,bytes)',
            'safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)'
        );
        _addRoute('burnChild(uint256,string)', 'burnChildFor(uint256,string,bytes)');
        _addRoute('resolveTo(address,uint256)', 'resolveToFor(address,uint256,bytes)');
    }

    function nonceOf(uint256 tokenId) public view override returns (uint256) {
        return _target.nonceOf(tokenId);
    }

    function verify(ForwardRequest calldata req, bytes calldata signature) external view override returns (bool) {
        return _verify(req, address(_target), signature);
    }

    function execute(ForwardRequest calldata req, bytes calldata signature) external override returns (bytes memory) {
        uint256 gas = gasleft();
        return _execute(req.from, address(_target), req.tokenId, gas, req.data, signature);
    }

    function _buildRouteData(
        bytes4 selector,
        bytes memory data,
        bytes memory signature
    ) internal pure override returns (bytes memory) {
        if(selector == bytes4(keccak256('transferFromFor(address,address,uint256,bytes)'))) {
            (address p1, address p2, uint256 p3) = abi.decode(data, (address, address, uint256));
            return abi.encodeWithSelector(selector, p1, p2, p3, signature);
        } else if(selector == bytes4(keccak256('safeTransferFromFor(address,address,uint256,bytes)'))) {
            (address p1, address p2, uint256 p3) = abi.decode(data, (address, address, uint256));
            return abi.encodeWithSelector(selector, p1, p2, p3, signature);
        } else if(selector == bytes4(keccak256('safeTransferFromFor(address,address,uint256,bytes,bytes)'))) {
            (address p1, address p2, uint256 p3, bytes memory p4) = abi.decode(data, (address, address, uint256, bytes));
            return abi.encodeWithSelector(selector, p1, p2, p3, p4, signature);
        } else if(selector == bytes4(keccak256('burnFor(uint256,bytes)'))) {
            (uint256 p1) = abi.decode(data, (uint256));
            return abi.encodeWithSelector(selector, p1, signature);
        } else if(selector == bytes4(keccak256('mintChildFor(address,uint256,string,bytes)'))) {
            (address p1, uint256 p2, string memory p3) = abi.decode(data, (address, uint256, string));
            return abi.encodeWithSelector(selector, p1, p2, p3, signature);
        } else if(selector == bytes4(keccak256('safeMintChildFor(address,uint256,string,bytes)'))) {
            (address p1, uint256 p2, string memory p3) = abi.decode(data, (address, uint256, string));
            return abi.encodeWithSelector(selector, p1, p2, p3, signature);
        } else if(selector == bytes4(keccak256('safeMintChildFor(address,uint256,string,bytes,bytes)'))) {
            (address p1, uint256 p2, string memory p3, bytes memory p4) = abi.decode(data, (address, uint256, string, bytes));
            return abi.encodeWithSelector(selector, p1, p2, p3, p4, signature);
        } else if(selector == bytes4(keccak256('transferFromChildFor(address,address,uint256,string,bytes)'))) {
            (address p1, address p2, uint256 p3, string memory p4) = abi.decode(data, (address, address, uint256, string));
            return abi.encodeWithSelector(selector, p1, p2, p3, p4, signature);
        } else if(selector == bytes4(keccak256('safeTransferFromChildFor(address,address,uint256,string,bytes)'))) {
            (address p1, address p2, uint256 p3, string memory p4) = abi.decode(data, (address, address, uint256, string));
            return abi.encodeWithSelector(selector, p1, p2, p3, p4, signature);
        } else if(selector == bytes4(keccak256('safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)'))) {
            (address p1, address p2, uint256 p3, string memory p4, bytes memory p5) = abi.decode(data, (address, address, uint256, string, bytes));
            return abi.encodeWithSelector(selector, p1, p2, p3, p4, p5, signature);
        } else if(selector == bytes4(keccak256('burnChildFor(uint256,string,bytes)'))) {
            (uint256 p1, string memory p2) = abi.decode(data, (uint256, string));
            return abi.encodeWithSelector(selector, p1, p2, signature);
        } else if(selector == bytes4(keccak256('resolveToFor(address,uint256,bytes)'))) {
            (address p1, uint256 p2) = abi.decode(data, (address, uint256));
            return abi.encodeWithSelector(selector, p1, p2, signature);
        }
        return '';
    }
}
