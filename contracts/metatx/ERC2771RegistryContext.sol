// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

error InvalidForwardedToken(uint256 tokenId);

/**
 * @dev https://eips.ethereum.org/EIPS/eip-2771[EIP 2771] is a standard for native meta transactions.
 *
 * A base contract to be inherited by any contract that want to receive forwarded transactions.
 * The contract designed to be stateless, it supports a scenario when a inherited contract is
 * TrustedForwarder and Recipient at the same time.
 *
 * The contract supports token based nonce, that is why standard calldata extended by tokenId.
 *
 * Forwarded calldata layout: {bytes:data}{address:from}{uint256:tokenId}
 */
abstract contract ERC2771RegistryContext is Initializable, ContextUpgradeable {
    // solhint-disable-next-line func-name-mixedcase
    function __ERC2771RegistryContext_init() internal onlyInitializing {
        __Context_init_unchained();
        __ERC2771RegistryContext_init_unchained();
    }

    // solhint-disable-next-line func-name-mixedcase
    function __ERC2771RegistryContext_init_unchained() internal onlyInitializing {}

    /**
     * @dev Return bool whether provided address is the trusted forwarder.
     */
    function isTrustedForwarder(address forwarder) public view virtual returns (bool) {
        return forwarder == address(this);
    }

    /**
     * @dev Return the tokenId of this call.
     * If the call came through our trusted forwarder, return the original tokenId.
     * otherwise, return zero tokenId.
     */
    function _msgToken() internal view virtual returns (uint256 tokenId) {
        if (isTrustedForwarder(msg.sender)) {
            assembly {
                tokenId := calldataload(sub(calldatasize(), 32))
            }
        }
    }

    /**
     * @dev Return the sender of this call.
     * If the call came through our trusted forwarder, return the original sender.
     * otherwise, return `msg.sender`.
     * Should be used in the contract anywhere instead of msg.sender
     */
    function _msgSender() internal view virtual override returns (address sender) {
        if (isTrustedForwarder(msg.sender)) {
            // The assembly code is more direct than the Solidity version using `abi.decode`.
            assembly {
                sender := shr(96, calldataload(sub(calldatasize(), 52)))
            }
        } else {
            return super._msgSender();
        }
    }

    /**
     * @dev Return the data of this call.
     * If the call came through our trusted forwarder, return the original data.
     * otherwise, return `msg.data`.
     * Should be used in the contract anywhere instead of msg.data
     */
    function _msgData() internal view virtual override returns (bytes calldata) {
        if (isTrustedForwarder(msg.sender)) {
            return msg.data[:msg.data.length - 52];
        } else {
            return super._msgData();
        }
    }

    function _validateForwardedToken(uint256 tokenId) internal view {
        if (tokenId != _msgToken()) {
            revert InvalidForwardedToken(tokenId);
        }
    }

    uint256[50] private __gap;
}
