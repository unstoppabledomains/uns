// @author Unstoppable Domains, Inc.
// @date August 19th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

import './../cns/ICNSRegistry.sol';
import './IForwarder.sol';
import './BaseRoutingForwarder.sol';

/**
 * @title ResolverForwarder
 * @dev ResolverForwarder simplifies operation with legacy meta-transactions.
 * It works on top of existing Resolver contracts.
 */
contract ResolverForwarder is Initializable, BaseRoutingForwarder {
    ICNSRegistry private _cnsRegistry;

    function initialize(ICNSRegistry cnsRegistry) public initializer {
        _cnsRegistry = cnsRegistry;
        _addRule('reset(uint256)', 'resetFor(uint256,bytes)', 2);
        _addRule('set(string,string,uint256)', 'setFor(string,string,uint256,bytes)', 4);
        _addRule('setMany(string[],string[],uint256)', 'setManyFor(string[],string[],uint256,bytes)', 4);
        _addRule('reconfigure(string[],string[],uint256)', 'reconfigureFor(string[],string[],uint256,bytes)', 4);
    }

    function nonceOf(uint256 tokenId) public view override returns (uint256) {
        IForwarder target = IForwarder(_cnsRegistry.resolverOf(tokenId));
        return target.nonceOf(tokenId);
    }

    function verify(ForwardRequest calldata req, bytes calldata signature) external view override returns (bool) {
        address target = _cnsRegistry.resolverOf(req.tokenId);
        return _verify(req, target, signature);
    }

    function execute(ForwardRequest calldata req, bytes calldata signature) external override returns (bytes memory) {
        uint256 gas = gasleft();
        address target = _cnsRegistry.resolverOf(req.tokenId);
        return _execute(req.from, target, req.tokenId, gas, req.data, signature);
    }
}
