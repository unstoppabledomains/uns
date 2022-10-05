// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

import './BaseForwarder.sol';
import './../libraries/Errors.sol';

abstract contract EIP712UpgradeableGap {
    /* solhint-disable var-name-mixedcase */
    bytes32 private _HASHED_NAME;
    bytes32 private _HASHED_VERSION;
    uint256[50] private __gap;
    /* solhint-enable var-name-mixedcase */
}

/**
 * @dev https://eips.ethereum.org/EIPS/eip-2771[EIP 2771] is a standard for native meta transactions.
 *
 * A base contract to be inherited by any contract that want to forward transactions.
 */
abstract contract UNSRegistryForwarder is Initializable, EIP712UpgradeableGap, BaseForwarder {
    mapping(uint256 => uint256) private _nonces;

    // solhint-disable-next-line func-name-mixedcase
    function __UNSRegistryForwarder_init() internal onlyInitializing {
        __UNSRegistryForwarder_init_unchained();
    }

    // solhint-disable-next-line func-name-mixedcase
    function __UNSRegistryForwarder_init_unchained() internal onlyInitializing {}

    function nonceOf(uint256 tokenId) public view override returns (uint256) {
        return _nonces[tokenId];
    }

    function verify(ForwardRequest calldata req, bytes calldata signature) public view override returns (bool) {
        return _verify(req, address(this), signature);
    }

    function execute(ForwardRequest calldata req, bytes calldata signature) public override returns (bytes memory) {
        uint256 gas = gasleft();
        require(verify(req, signature), Errors.REFW_SIGNATURE_INVALID);
        return _execute(req.from, address(this), req.tokenId, gas, req.data, signature);
    }

    function _invalidateNonce(uint256 tokenId) internal override {
        _nonces[tokenId] = _nonces[tokenId] + 1;
    }

    uint256[50] private __gap;
}
