// SPDX-License-Identifier: MIT

pragma solidity 0.5.12;

import 'dot-crypto/contracts/controllers/MintingController.sol';

// solium-disable no-empty-blocks
contract CryptoMintingController is MintingController {
    constructor (Registry registry) MintingController(registry) public { }
}
