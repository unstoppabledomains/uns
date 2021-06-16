// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity 0.5.12;
pragma experimental ABIEncoderV2;

import 'dot-crypto/contracts/Resolver.sol';

contract CryptoResolver is Resolver {
    constructor (Registry registry, MintingController controller) Resolver(registry, controller) public { }
}
