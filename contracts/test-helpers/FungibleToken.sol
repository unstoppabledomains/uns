// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract FungibleToken is ERC20 {
    constructor() ERC20("Fungible Token", "FT") {}

    function mint(uint256 amount) external {
        _mint(_msgSender(), amount);
    }
}
