// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IClaimer.sol";
import "../Registry.sol";

contract FreeMinter is IClaimer {
    string public constant NAME = 'Unstoppable Free Domains Minter';
    string public constant VERSION = '0.1.0';
    string private constant DOMAIN_NAME_PREFIX = 'udtestdev-';

    Registry private _registry;

    constructor(Registry registry_) {
        _registry = registry_;
    }

    function claim(uint256 tld, string calldata label) external override {
        mintSLD(tld, label, msg.sender);
    }

    function claimTo(uint256 tld, string calldata label, address receiver) external override {
        mintSLD(tld, label, receiver);
    }

    function claimToWithRecords(
        uint256 tld,
        string calldata label,
        address receiver,
        string[] calldata keys,
        string[] calldata values)
        external
        override
    {
        string memory labelWithPrefix = string(abi.encodePacked(DOMAIN_NAME_PREFIX, label));
        _registry.mintSLDWithRecords(receiver, tld, labelWithPrefix, keys, values);
    }

    function mintSLD(uint256 tld, string memory label, address receiver) private {
        string memory labelWithPrefix = string(abi.encodePacked(DOMAIN_NAME_PREFIX, label));
        _registry.mintSLD(receiver, tld, labelWithPrefix);
    }
}
