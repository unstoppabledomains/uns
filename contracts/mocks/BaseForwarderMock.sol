// @author Unstoppable Domains, Inc.
// @date August 12th, 2021

pragma solidity ^0.8.0;

import '../metatx/BaseForwarder.sol';

contract BaseForwarderMock is BaseForwarder {
    mapping(uint256 => uint256) private _nonces;

    function nonceOf(uint256 tokenId) external view override returns (uint256) {
        return _nonces[tokenId];
    }

    function verify(ForwardRequest calldata req, bytes calldata signature) public view override returns (bool) {
        return _verify(req, address(this), signature);
    }

    function execute(ForwardRequest calldata req, bytes calldata signature) public override returns (bytes memory) {
        uint256 gas = gasleft();
        require(verify(req, signature), 'BaseForwarderMock: SIGNATURE_INVALID');
        return _execute(req.from, address(this), req.tokenId, gas, req.data, signature);
    }

    function revertWithReason() public pure {
        revert('AAAAAA');
    }

    function revertWithoutReason() public pure {
        revert();
    }

    function _invalidateNonce(uint256 tokenId) internal override {
        _nonces[tokenId] = _nonces[tokenId] + 1;
    }
}
