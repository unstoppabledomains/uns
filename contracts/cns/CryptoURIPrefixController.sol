// SPDX-License-Identifier: MIT

pragma solidity 0.5.12;

import 'dot-crypto/contracts/controllers/URIPrefixController.sol';

contract CryptoURIPrefixController is URIPrefixController {
    constructor (Registry registry) URIPrefixController(registry) public { }
}
