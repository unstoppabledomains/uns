// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity 0.5.12;
pragma experimental ABIEncoderV2;

import 'dot-crypto/contracts/util/WhitelistedMinter.sol';

contract CryptoWhitelistedMinter is WhitelistedMinter {
    constructor(MintingController minter) public WhitelistedMinter(minter) {}
}
