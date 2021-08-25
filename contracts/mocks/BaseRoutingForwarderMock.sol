// @author Unstoppable Domains, Inc.
// @date August 12th, 2021

pragma solidity ^0.8.0;

import '../metatx/BaseRoutingForwarder.sol';

contract BaseRoutingForwarderMock is BaseRoutingForwarder {
    constructor() {
        _addRule('transferFrom(address,address,uint256)', 'transferFromFor(address,address,uint256,bytes)', 4);
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
}
