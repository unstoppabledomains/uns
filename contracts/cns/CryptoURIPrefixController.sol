// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity 0.5.12;

import 'dot-crypto/contracts/controllers/URIPrefixController.sol';

contract CryptoURIPrefixController is URIPrefixController {
    constructor(Registry registry) public URIPrefixController(registry) {}
}
