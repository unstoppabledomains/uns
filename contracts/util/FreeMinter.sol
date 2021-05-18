// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../Registry.sol";

contract FreeMinter {
    string public constant NAME = 'Unstoppable Free Domains Minter';
    string public constant VERSION = '0.1.0';
    string private constant DOMAIN_NAME_PREFIX = 'udtestdev-';

    Registry private _registry;

    constructor(Registry registry_) {
        _registry = registry_;
    }

    function claim(string calldata label) external {
        mintSLD(label, msg.sender);
    }

    function claimTo(string calldata label, address receiver) external {
        mintSLD(label, receiver);
    }

    function claimToWithRecords(string calldata label, address receiver, string[] calldata keys, string[] calldata values) external {
        string memory labelWithPrefix = string(abi.encodePacked(DOMAIN_NAME_PREFIX, label));
        _registry.mintSLDWithRecords(receiver, labelWithPrefix, keys, values);
    }

    function mintSLD(string memory label, address receiver) private {
        string memory labelWithPrefix = string(abi.encodePacked(DOMAIN_NAME_PREFIX, label));
        _registry.mintSLD(receiver, labelWithPrefix);
    }
}
