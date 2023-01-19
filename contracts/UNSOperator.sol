// @author Unstoppable Domains, Inc.
// @date January 17th, 2023

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

contract UNSOperator is OwnableUpgradeable {
    string public constant NAME = 'UNS: Operator';
    string public constant VERSION = '0.1.0';

    // Contract will be extended in future iterations

    function initialize() public initializer {
        __Ownable_init_unchained();
    }
}
