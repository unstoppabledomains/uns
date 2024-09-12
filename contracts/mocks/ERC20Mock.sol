// @author Unstoppable Domains, Inc.
// @date September 7th, 2023

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol';

contract ERC20Mock is ERC20PermitUpgradeable {
    function initialize() external initializer {
        __ERC20Permit_init('');
        __ERC20_init_unchained('', '');
    }

    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }
}
