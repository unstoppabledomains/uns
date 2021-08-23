// @author Unstoppable Domains, Inc.
// @date August 23th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

import './IForwarder.sol';
import './BaseForwarder.sol';

contract MintingManagerForwarder is Initializable, BaseForwarder {
    address private _mintingManager;

    function initialize(address mintingManager) public initializer {
        _mintingManager = mintingManager;
    }

    function nonceOf(uint256 /* tokenId */) external override pure returns (uint256) {
        return 0;
    }

    function verify(ForwardRequest calldata req, bytes calldata signature) external override view returns (bool) {
        return _verify(req, _mintingManager, signature);
    }

    function execute(ForwardRequest calldata req, bytes calldata signature) external override returns (bytes memory) {
        uint256 gas = gasleft();
        return _execute(req.from, _mintingManager, req.tokenId, gas, req.data, signature);
    }
}
