// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;
pragma abicoder v2;

import "./FungibleToken.sol";
import "../util/Batchable.sol";

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";

// NOTE(bradenp): Inheritance needs to be declared in this order.
//   Otherwise the Batchable._batchSender won't get set correctly.
contract ERC2771FungibleToken is ERC2771Context, Batchable, FungibleToken {
    constructor(address trustedForwarder) ERC2771Context(trustedForwarder) {}

    function _msgSender()
        internal
        view
        override(ERC2771Context, Batchable, Context)
        returns (address)
    {
        return super._msgSender();
    }

    function _msgData()
        internal
        view
        override(ERC2771Context, Context)
        returns (bytes memory)
    {
        return super._msgData();
    }
}
