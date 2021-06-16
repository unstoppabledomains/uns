// SPDX-License-Identifier: MIT

pragma solidity 0.5.12;

import 'dot-crypto/contracts/controllers/SignatureController.sol';

contract CryptoSignatureController is SignatureController {
    constructor (Registry registry) SignatureController(registry) public { }
}
