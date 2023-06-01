// @author Unstoppable Domains, Inc.
// @date May 31st, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol';

import './BaseForwarder.sol';

/**
 * @dev https://eips.ethereum.org/EIPS/eip-2771[EIP 2771] is a standard for native meta transactions.
 *
 * A base contract to be inherited by any contract that want to forward transactions.
 */
abstract contract Forwarder is Initializable, BaseForwarder {
    // This is the keccak-256 hash of "uns.forwarder.nonce." subtracted by 1
    bytes32 internal constant _NONCE_PREFIX_SLOT = 0x1ee5d87a048b728f67073f282321992c260e5be4fa651d08665c5b4ee7a83815;

    // solhint-disable-next-line func-name-mixedcase
    function __Forwarder_init() internal onlyInitializing {
        __Forwarder_init_unchained();
    }

    // solhint-disable-next-line func-name-mixedcase
    function __Forwarder_init_unchained() internal onlyInitializing {}

    function nonceOf(uint256 tokenId) public view override returns (uint256) {
        return StorageSlotUpgradeable.getUint256Slot(keccak256(abi.encodePacked(_NONCE_PREFIX_SLOT, tokenId))).value;
    }

    function verify(ForwardRequest calldata req, bytes calldata signature) public view override returns (bool) {
        return _verify(req, address(this), signature);
    }

    function execute(ForwardRequest calldata req, bytes calldata signature) public override returns (bytes memory) {
        uint256 gas = gasleft();
        require(verify(req, signature), 'Forwarder: SIGNATURE_INVALID');
        return _execute(req.from, address(this), req.tokenId, gas, req.data, signature);
    }

    function _invalidateNonce(uint256 tokenId) internal override {
        bytes32 slot = keccak256(abi.encodePacked(_NONCE_PREFIX_SLOT, tokenId));
        StorageSlotUpgradeable.getUint256Slot(slot).value = StorageSlotUpgradeable.getUint256Slot(slot).value + 1;
    }
}
