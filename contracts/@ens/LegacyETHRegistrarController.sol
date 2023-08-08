pragma solidity >=0.4.24;

import '@ensdomains/ens-contracts/contracts/ethregistrar/ETHRegistrarController.sol';

contract LegacyETHRegistrarController is ETHRegistrarController {
    constructor(
        BaseRegistrarImplementation _base,
        IPriceOracle _prices,
        uint256 _minCommitmentAge,
        uint256 _maxCommitmentAge,
        ReverseRegistrar _reverseRegistrar,
        INameWrapper _nameWrapper,
        ENS _ens
    ) ETHRegistrarController(_base, _prices, _minCommitmentAge, _maxCommitmentAge, _reverseRegistrar, _nameWrapper, _ens) {}
}
