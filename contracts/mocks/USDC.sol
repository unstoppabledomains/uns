// @author Unstoppable Domains, Inc.
// @date June 6th, 2024

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract USDC is ERC20('USDC Mock', 'USDC') {
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }
}
