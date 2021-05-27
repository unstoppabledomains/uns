// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

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
    function __ERC2771RegistryContext_init() internal initializer {
        __Context_init_unchained();
        __ERC2771RegistryContext_init_unchained();
    }

    function __ERC2771RegistryContext_init_unchained() internal initializer {
    }

    /**
     * @dev Return bool whether provided address is the trusted forwarder.
     */
    function isTrustedForwarder(address forwarder) public view virtual returns(bool) {
        return forwarder == address(this);
    }

    /**
     * @dev Guarde whether tokenId param and forwarded _tokenId_ are the same in case of forwarding.
     */
    modifier validForwardedToken(uint256 tokenId) {
        if (isTrustedForwarder(msg.sender)) {
            uint256 _tokenId;
            assembly { _tokenId := calldataload(sub(calldatasize(), 32)) }
            require(tokenId == _tokenId, 'ERC2771RegistryContext: TOKEN_INVALID');
        }
        _;
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
            assembly { sender := shr(96, calldataload(sub(calldatasize(), 52))) }
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
            return msg.data[:msg.data.length-52];
        } else {
            return super._msgData();
        }
    }
    uint256[50] private __gap;
}
