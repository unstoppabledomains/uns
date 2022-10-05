// @author Unstoppable Domains, Inc.
// @date August 23th, 2021

pragma solidity ^0.8.0;

import './IForwarder.sol';
import './BaseForwarder.sol';
import './../libraries/Errors.sol';

contract MintingManagerForwarder is BaseForwarder {
    address private _mintingManager;
    mapping(uint256 => uint256) private _nonces;

    constructor(address mintingManager) {
        _mintingManager = mintingManager;
    }

    function nonceOf(uint256 tokenId) external view override returns (uint256) {
        return _nonces[tokenId];
    }

    function verify(ForwardRequest calldata req, bytes calldata signature) public view override returns (bool) {
        return _verify(req, _mintingManager, signature);
    }

    function execute(ForwardRequest calldata req, bytes calldata signature) external override returns (bytes memory) {
        uint256 gas = gasleft();
        require(verify(req, signature), Errors.MMFW_SIGNATURE_INVALID);
        return _execute(req.from, _mintingManager, req.tokenId, gas, req.data, signature);
    }

    function _invalidateNonce(uint256 tokenId) internal override {
        _nonces[tokenId] = _nonces[tokenId] + 1;
    }
}
