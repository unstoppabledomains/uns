// @author Unstoppable Domains, Inc.
// @date August 12th, 2021

pragma solidity ^0.8.0;

import '../metatx/BaseForwarder.sol';

contract BaseForwarderMock is BaseForwarder {
    mapping(uint256 => uint256) private _nonces;

    mapping(address => bool) private _assets;

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

    function hasAsset(address addr) public view returns (bool) {
        return _assets[addr];
    }

    function mintAsset() public {
        _assets[_msgSender()] = true;
    }

    function _msgSender() internal view virtual returns (address sender) {
        if (msg.sender == address(this)) {
            assembly {
                sender := shr(96, calldataload(sub(calldatasize(), 52)))
            }
        } else {
            sender = msg.sender;
        }
    }

    function _invalidateNonce(uint256 tokenId) internal override {
        _nonces[tokenId] = _nonces[tokenId] + 1;
    }
}
