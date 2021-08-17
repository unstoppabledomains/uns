// @author Unstoppable Domains, Inc.
// @date August 12th, 2021

pragma solidity ^0.8.0;

import '../metatx/BaseForwarder.sol';

contract BaseForwarderMock is BaseForwarder {
    mapping(uint256 => uint256) private _nonces;

    function nonceOf(uint256 tokenId) external override view returns (uint256) {
        return _nonces[tokenId];
    }

    function verify(ForwardRequest calldata req, bytes calldata signature) public view override returns (bool) {
        return _verify(req, address(this), signature);
    }

    function execute(ForwardRequest calldata req, bytes calldata signature) public override returns (bytes memory) {
        uint256 gas = gasleft();

        require(verify(req, signature), 'BaseForwarderMock: SIGNATURE_INVALID');
        _nonces[req.tokenId] = req.nonce + 1;

        (bool success, bytes memory returndata) = address(this).call{gas: gas}(
            abi.encodePacked(req.data, req.from, req.tokenId)
        );

        return _verifyCallResult(success, returndata, 'BaseForwarderMock: CALL_FAILED');
    }

    function revertWithReason() public pure {
        revert('AAAAAA');
    }

    function revertWithoutReason() public pure {
        revert();
    }
}
