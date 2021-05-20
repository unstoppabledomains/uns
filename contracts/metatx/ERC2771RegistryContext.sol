// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

abstract contract ERC2771RegistryContext is Initializable, ContextUpgradeable {
    function __ERC2771RegistryContext_init() internal initializer {
        __Context_init_unchained();
        __ERC2771RegistryContext_init_unchained();
    }

    function __ERC2771RegistryContext_init_unchained() internal initializer {
    }

    function isTrustedForwarder(address forwarder) public view virtual returns(bool) {
        return forwarder == address(this);
    }

    modifier validForwardedToken(uint256 tokenId) {
        if (isTrustedForwarder(msg.sender)) {
            uint256 _tokenId;
            assembly { _tokenId := calldataload(sub(calldatasize(), 32)) }
            require(tokenId == _tokenId, 'ERC2771RegistryContext: TOKEN_INVALID');
        }
        _;
    }

    function _msgSender() internal view virtual override returns (address sender) {
        if (isTrustedForwarder(msg.sender)) {
            // The assembly code is more direct than the Solidity version using `abi.decode`.
            assembly { sender := shr(96, calldataload(sub(calldatasize(), 52))) }
        } else {
            return super._msgSender();
        }
    }

    function _msgData() internal view virtual override returns (bytes calldata) {
        if (isTrustedForwarder(msg.sender)) {
            return msg.data[:msg.data.length-52];
        } else {
            return super._msgData();
        }
    }
    uint256[50] private __gap;
}
