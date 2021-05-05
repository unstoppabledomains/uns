// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";

// 6% more expensive than a bespoke function. Around 2500 gas per call.

// TODO(bradeno): We should probably make this a RegistryContext class to avoid
//   weird inheritance problems.

/*
 * @dev a custom context to enable batching arbitrary calls to a contract.
 */
abstract contract Batchable is Context {
    address internal _batchSender; // Maybe initialize to address(1) for reduced cost.

    // TODO(bradenp): Figure out if there are re-entrancy problems because of
    // safeTransferFrom or the trustedForwarder...
    // Returndata costs extra, so for now we don't have any.
    function executeBatch(bytes[] calldata payloads) external {
        require(_batchSender == address(0), "re-entrancy");
        _batchSender = super._msgSender();

        for (uint256 index = 0; index < payloads.length; index++) {
            (bool ok, ) = address(this).call(payloads[index]);

            require(ok, "batch failed");
        }

        delete _batchSender;
    }

    function _msgSender()
        internal
        view
        virtual
        override
        returns (address sender)
    {
        if (msg.sender == address(this)) {
            return _batchSender;
        } else {
            return super._msgSender();
        }
    }
}
