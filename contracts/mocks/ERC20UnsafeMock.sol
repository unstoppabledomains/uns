// @author Unstoppable Domains, Inc.
// @date September 14th, 2023

pragma solidity ^0.8.0;

import './ERC20Mock.sol';

contract ERC20UnsafeMock is ERC20Mock {
    function transfer(address to, uint256 value) public virtual override returns (bool) {
        super.transfer(to, value);
        return false;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public virtual override returns (bool) {
        super.transferFrom(from, to, value);
        return false;
    }
}
