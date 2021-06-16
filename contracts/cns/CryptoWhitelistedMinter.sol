// SPDX-License-Identifier: MIT

pragma solidity 0.5.12;
pragma experimental ABIEncoderV2;

import 'dot-crypto/contracts/util/WhitelistedMinter.sol';

contract CryptoWhitelistedMinter is WhitelistedMinter {
    constructor (MintingController minter) WhitelistedMinter(minter) public { }
}
