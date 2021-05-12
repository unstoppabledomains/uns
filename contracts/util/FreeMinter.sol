// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../controllers/MintingController.sol";

contract FreeMinter {
    string public constant NAME = 'Unstoppable Free Domains Minter';
    string public constant VERSION = '0.1.0';
    string private constant DOMAIN_NAME_PREFIX = 'udtestdev-';

    MintingController private _mintingController;

    constructor(MintingController mintingController) {
        _mintingController = mintingController;
    }

    function claim(string calldata label) external {
        mintSLD(label, msg.sender);
    }

    function claimTo(string calldata label, address receiver) external {
        mintSLD(label, receiver);
    }

    function claimToWithRecords(string calldata label, address receiver, string[] calldata keys, string[] calldata values) external {
        string memory labelWithPrefix = string(abi.encodePacked(DOMAIN_NAME_PREFIX, label));
        _mintingController.mintSLDWithRecords(receiver, labelWithPrefix, keys, values);
    }

    function mintSLD(string memory label, address receiver) private {
        string memory labelWithPrefix = string(abi.encodePacked(DOMAIN_NAME_PREFIX, label));
        _mintingController.mintSLD(receiver, labelWithPrefix);
    }
}
