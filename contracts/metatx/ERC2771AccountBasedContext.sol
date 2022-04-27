pragma solidity ^0.8.0;

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
abstract contract ERC2771AccountBasedContext {
    address private _trustedForwarder;

    function getForwarder() public view returns (address) {
        return _trustedForwarder;
    }

    function setForwarder(address forwarder) public {
        _trustedForwarder = forwarder;
    }

    function _msgSender() internal view returns (address signer) {
        signer = msg.sender;

        if(msg.data.length >= 20 && isTrustedForwarder(signer)) {
            assembly {
                signer := shr(96,calldataload(sub(calldatasize(),20)))
            }
        }
    }

    function _msgData() internal view returns (bytes calldata) {
        if (isTrustedForwarder(msg.sender)) {
            return msg.data[:msg.data.length-20];
        } else {
            return msg.data;
        }
    }

    function isTrustedForwarder(address forwarder) public view returns(bool) {
        return forwarder == _trustedForwarder;
    }
}
