// @author Unstoppable Domains, Inc.
// @date Jun 1st, 2023

pragma solidity ^0.8.0;

import {ERC1155PresetMinterPauserUpgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol';

contract ERC1155Mock is ERC1155PresetMinterPauserUpgradeable {
    constructor(string memory uri) {
        initialize(uri);
    }
}
