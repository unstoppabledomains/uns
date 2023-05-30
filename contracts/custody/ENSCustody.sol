// @author Unstoppable Domains, Inc.
// @date May 30th, 2023

pragma solidity ^0.8.0;

import {IETHRegistrarController} from '@ensdomains/ens-contracts/contracts/ethregistrar/IETHRegistrarController.sol';

contract ENSCustody {
    IETHRegistrarController private _controller;

    constructor(IETHRegistrarController controller) {
        _controller = controller;
    }
}
