// @author Unstoppable Domains, Inc.
// @date August 4th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';

import './IUNSRegistry.sol';

contract ReverseResolver is Initializable, ContextUpgradeable {
    string public constant NAME = 'UNS: Reverse Resolver';
    string public constant VERSION = '0.1.0';

    mapping(address => uint256) reverses;

    IUNSRegistry private _unsRegistry;

    function initialize(IUNSRegistry unsRegistry) public initializer {
        _unsRegistry = unsRegistry;
    }

    function reverseOf(address account) public view returns (uint256) {
        uint256 tokenId = reverses[account];
        require(tokenId != 0, 'ReverseResolver: REVERSE_RECORD_IS_EMPTY');
        require(_unsRegistry.isApprovedOrOwner(account, tokenId), 'ReverseResolver: ACCOUNT_IS_NOT_APPROVED_OR_OWNER');
        return tokenId;
    }

    function register(uint256 tokenId) public {
        address sender = _msgSender();
        require(_unsRegistry.isApprovedOrOwner(sender, tokenId), 'ReverseResolver: SENDER_IS_NOT_APPROVED_OR_OWNER');
        reverses[sender] = tokenId;
    }

    function remove() public {
        address sender = _msgSender();
        uint256 tokenId = reverses[sender];
        require(tokenId != 0, 'ReverseResolver: REVERSE_RECORD_IS_EMPTY');
        delete reverses[sender];
    }
}
