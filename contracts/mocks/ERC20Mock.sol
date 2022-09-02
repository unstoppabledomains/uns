// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';

contract ERC20Mock is ERC20Upgradeable {

    function initialize(uint256 initMintAmount) initializer public {
        __ERC20_init("Test", "TTT");
        _mint(msg.sender, initMintAmount);
    }

}