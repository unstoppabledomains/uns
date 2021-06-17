// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity 0.5.12;

import 'dot-crypto/contracts/controllers/MintingController.sol';

contract CryptoMintingController is MintingController {
    constructor (Registry registry) MintingController(registry) public { }
}
