// @author Unstoppable Domains, Inc.
// @date August 12th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

import './IForwarder.sol';
import './BaseRoutingForwarder.sol';

/**
 * @title SignatureForwarder
 * @dev SignatureForwarder simplifies operation with legacy meta-transactions.
 * It works on top of existing SignatureController contract.
 */
contract SignatureForwarder is Initializable, BaseRoutingForwarder {
    IForwarder private _target;

    function initialize(IForwarder target) public initializer {
        _target = target;
        _addRule('transferFrom(address,address,uint256)', 'transferFromFor(address,address,uint256,bytes)', 4);
        _addRule('safeTransferFrom(address,address,uint256)', 'safeTransferFromFor(address,address,uint256,bytes)', 4);
        _addRule(
            'safeTransferFrom(address,address,uint256,bytes)',
            'safeTransferFromFor(address,address,uint256,bytes,bytes)',
            5
        );
        _addRule('burn(uint256)', 'burnFor(uint256,bytes)', 2);
        _addRule('mintChild(address,uint256,string)', 'mintChildFor(address,uint256,string,bytes)', 4);
        _addRule('safeMintChild(address,uint256,string)', 'safeMintChildFor(address,uint256,string,bytes)', 4);
        _addRule(
            'safeMintChild(address,uint256,string,bytes)',
            'safeMintChildFor(address,uint256,string,bytes,bytes)',
            5
        );
        _addRule(
            'transferFromChild(address,address,uint256,string)',
            'transferFromChildFor(address,address,uint256,string,bytes)',
            5
        );
        _addRule(
            'safeTransferFromChild(address,address,uint256,string)',
            'safeTransferFromChildFor(address,address,uint256,string,bytes)',
            5
        );
        _addRule(
            'safeTransferFromChild(address,address,uint256,string,bytes)',
            'safeTransferFromChildFor(address,address,uint256,string,bytes,bytes)',
            6
        );
        _addRule('burnChild(uint256,string)', 'burnChildFor(uint256,string,bytes)', 3);
        _addRule('resolveTo(address,uint256)', 'resolveToFor(address,uint256,bytes)', 3);
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
}
