// @author Unstoppable Domains, Inc.
// @date August 19th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/MulticallUpgradeable.sol';

import './../cns/ICNSRegistry.sol';
import './IForwarder.sol';
import './BaseRoutingForwarder.sol';

/**
 * @title ResolverForwarder
 * @dev ResolverForwarder simplifies operation with legacy meta-transactions.
 * It works on top of existing Resolver contracts.
 */
contract ResolverForwarder is BaseRoutingForwarder {
    using AddressUpgradeable for address;

    ICNSRegistry private _cnsRegistry;
    address private _defaultCnsResolver;

    constructor(ICNSRegistry cnsRegistry, address defaultCnsResolver) {
        _cnsRegistry = cnsRegistry;
        _defaultCnsResolver = defaultCnsResolver;
        _addRoute('reset(uint256)', 'resetFor(uint256,bytes)');
        _addRoute('set(string,string,uint256)', 'setFor(string,string,uint256,bytes)');
        _addRoute('setMany(string[],string[],uint256)', 'setManyFor(string[],string[],uint256,bytes)');
        _addRoute('reconfigure(string[],string[],uint256)', 'reconfigureFor(string[],string[],uint256,bytes)');
    }

    function nonceOf(uint256 tokenId) public view override returns (uint256) {
        address resolver = _defaultCnsResolver;

        // use default resolver when domain has empty resolver
        try _cnsRegistry.resolverOf(tokenId) returns (address _resolver) {
            resolver = _resolver;
        } catch { }

        // check that resolver is contract
        if(resolver.isContract()) {
            IForwarder target = IForwarder(resolver);

            // catch error when resolver does not implement IForwarder interface
            try target.nonceOf(tokenId) returns (uint256 nonce) {
                return nonce;
            } catch { }
        }

        // return nonce from default resolver as a fallback
        return IForwarder(_defaultCnsResolver).nonceOf(tokenId);
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

    /**
     * 0xb87abc11 = bytes4(keccak256('resetFor(uint256,bytes)'))
     * 0xc5974073 = bytes4(keccak256('setFor(string,string,uint256,bytes)'))
     * 0x8f69c188 = bytes4(keccak256('setManyFor(string[],string[],uint256,bytes)'))
     * 0xa3557e6c = bytes4(keccak256('reconfigureFor(string[],string[],uint256,bytes)'))
     */
    function _buildRouteData(
        bytes4 selector,
        bytes memory data,
        bytes memory signature
    ) internal pure override returns (bytes memory routeData) {
        if(selector == 0xb87abc11) {
            (uint256 p1) = abi.decode(data, (uint256));
            routeData = abi.encodeWithSelector(selector, p1, signature);
        } else if(selector == 0xc5974073) {
            (string memory p1, string memory p2, uint256 p3) = abi.decode(data, (string, string, uint256));
            routeData = abi.encodeWithSelector(selector, p1, p2, p3, signature);
        } else if(selector == 0x8f69c188) {
            // slither-disable-next-line uninitialized-storage
            (string[] memory p1, string[] memory p2, uint256 p3) = abi.decode(data, (string[], string[], uint256));
            routeData = abi.encodeWithSelector(selector, p1, p2, p3, signature);
        } else if(selector == 0xa3557e6c) {
            // slither-disable-next-line uninitialized-storage
            (string[] memory p1, string[] memory p2, uint256 p3) = abi.decode(data, (string[], string[], uint256));
            routeData = abi.encodeWithSelector(selector, p1, p2, p3, signature);
        }
    }
}
