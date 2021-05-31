// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../Registry.sol";

contract FreeMinter {
    string public constant NAME = 'Unstoppable Free Domains Minter';
    string public constant VERSION = '0.1.0';
    string private constant DOMAIN_NAME_PREFIX = 'udtestdev-';

    Registry private _registry;

    uint256 private constant _CRYPTO_HASH =
        0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f;

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
        _registry.mintSLDWithRecords(receiver, _CRYPTO_HASH, labelWithPrefix, keys, values);
    }

    function mintSLD(string memory label, address receiver) private {
        string memory labelWithPrefix = string(abi.encodePacked(DOMAIN_NAME_PREFIX, label));
        _registry.mintSLD(receiver, _CRYPTO_HASH, labelWithPrefix);
    }
}
