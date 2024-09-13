// @author Unstoppable Domains, Inc.
// @date September 7th, 2023

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract ERC20Mock is ERC20('', '') {
    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }
}
