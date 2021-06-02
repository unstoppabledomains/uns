// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import './IClaimer.sol';
import './ISLDMinter.sol';

interface IMintingManager is ISLDMinter, IClaimer {
}
