// @author Unstoppable Domains, Inc.
// @date June 6th, 2024

import '@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol';

pragma solidity ^0.8.0;

contract USDC is ERC20PermitUpgradeable {
    function initialize() external initializer {
        __ERC20Permit_init('USDC Mock');
        __ERC20_init_unchained('USDC Mock', 'USDC');
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }
}
