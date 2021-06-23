// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity 0.5.12;

import 'dot-crypto/contracts/controllers/SignatureController.sol';

contract CryptoSignatureController is SignatureController {
    constructor(Registry registry) public SignatureController(registry) {}
}
