// @author Unstoppable Domains, Inc.
// @date August 12th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

import './IForwarder.sol';
import './BaseForwarder.sol';

/**
 * @title RoutingForwarder
 * @dev RoutingForwarder simplifies operation with legacy meta-transactions.
 * It works on top of existing contracts infrastructure.
 */
contract RoutingForwarder is Initializable, BaseForwarder {
    struct RoutingRule {
        bytes4 selector;
        uint8 sigOffset;
    }

    IForwarder private _target;
    mapping(bytes4 => RoutingRule) private _rules;

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
        _addRule('reset(uint256)', 'resetFor(uint256,bytes)', 2);
        _addRule('set(string,string,uint256)', 'setFor(string,string,uint256,bytes)', 4);
        _addRule('setMany(string[],string[],uint256)', 'setManyFor(string[],string[],uint256,bytes)', 4);
        _addRule('reconfigure(string[],string[],uint256)', 'reconfigureFor(string[],string[],uint256,bytes)', 4);
    }

    function nonceOf(uint256 tokenId) public view override returns (uint256) {
        return _target.nonceOf(tokenId);
    }

    function verify(ForwardRequest calldata req, bytes calldata signature) external view override returns (bool) {
        return _verify(req, address(_target), signature) && _isKnownRoute(req.data);
    }

    function execute(ForwardRequest calldata req, bytes calldata signature) external override returns (bytes memory) {
        uint256 gas = gasleft();

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = address(_target).call{gas: gas}(buildRouteData(req, signature));
        // Validate that the relayer has sent enough gas for the call.
        // See https://ronan.eth.link/blog/ethereum-gas-dangers/
        assert(gasleft() > gas / 63);

        return _verifyCallResult(success, returndata, 'RoutingForwarder: CALL_FAILED');
    }

    function buildRouteData(ForwardRequest calldata req, bytes calldata signature) public view returns (bytes memory) {
        RoutingRule memory rule = _getRule(req.data);
        require(rule.selector != 0, 'RoutingForwarder: ROUTE_UNKNOWN');

        return abi.encodePacked(rule.selector, req.data[4:], uint256(rule.sigOffset), signature.length, signature);
    }

    function _addRule(
        bytes memory from,
        bytes memory to,
        uint8 sigPosition
    ) private {
        _rules[bytes4(keccak256(from))] = RoutingRule(bytes4(keccak256(to)), uint8(0x20 * sigPosition));
    }

    function _isKnownRoute(bytes memory data) private view returns (bool) {
        RoutingRule memory rule = _getRule(data);
        return rule.selector != 0;
    }

    function _getRule(bytes memory data) private view returns (RoutingRule memory) {
        bytes4 selector;
        /* solium-disable-next-line security/no-inline-assembly */
        assembly {
            selector := mload(add(data, add(0x20, 0)))
        }

        return _rules[selector];
    }
}
