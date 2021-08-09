// @author Unstoppable Domains, Inc.
// @date August 4th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';

import './IUNSRegistry.sol';

contract ReverseResolver is Initializable, ContextUpgradeable {
    string public constant NAME = 'UNS: Reverse Resolver';
    string public constant VERSION = '0.1.0';

    mapping (address => uint256) reverses;

    IUNSRegistry private _unsRegistry;

    function initialize(IUNSRegistry unsRegistry) public initializer {
        _unsRegistry = unsRegistry;
    }

    function reverseOf(address account) public view returns (uint256) {
        uint tokenId = reverses[account];
        require(tokenId != 0, 'Reverse Resolver: REVERSE_RECORD_IS_NOT_SET');
        require(isApprovedForAllOrOwner(account, tokenId), 'Reverse Resolver: ACCOUNT_IS_NOT_APPROVED_FOR_ALL_OR_OWNER');
        return tokenId;
    }

    function registerReverse(uint256 tokenId) public {
        address sender = _msgSender();
        require(isApprovedForAllOrOwner(sender, tokenId), 'Reverse Resolver: SENDER_IS_NOT_APPROVED_FOR_ALL_OR_OWNER');
        reverses[sender] = tokenId;
    }

    function removeReverse() public {
        address sender = _msgSender();
        uint256 tokenId = reverses[sender];
        require(tokenId != 0, 'Reverse Resolver: REVERSE_RECORD_IS_NOT_SET');
        require(isApprovedForAllOrOwner(sender, tokenId), 'Reverse Resolver: SENDER_IS_NOT_APPROVED_FOR_ALL_OR_OWNER');
        delete reverses[sender];
    }

    function isApprovedForAllOrOwner(address account, uint256 tokenId) internal view returns (bool) {
        address tokenOwner = _unsRegistry.ownerOf(tokenId);
        return (tokenOwner == account || _unsRegistry.isApprovedForAll(tokenOwner, account));
    }
}
