// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

contract NonReentrant {
    /// @dev It's cheaper to reset to 1 than 0 because of the high cost of the first non-zero write.
    ///   See https://eips.ethereum.org/EIPS/eip-2929 for more details.
    uint256 private _entered = 1;

    modifier nonReentrant() {
        require(_entered == 1, "You tried to reenter! Sneaky...");

        _entered = 2;
        _;
        _entered = 1;
    }
}
