// @author Unstoppable Domains, Inc.
// @date August 4th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';

import './IUNSRegistry.sol';
import './cns/ICNSRegistry.sol';

contract ReverseResolver is Initializable, ContextUpgradeable {
    string public constant NAME = 'UNS: Reverse Resolver';
    string public constant VERSION = '0.1.0';

    mapping(address => uint256) private _reverses;

    IUNSRegistry private _unsRegistry;
    ICNSRegistry private _cnsRegistry;

    function initialize(IUNSRegistry unsRegistry, ICNSRegistry cnsRegistry) public initializer {
        _unsRegistry = unsRegistry;
        _cnsRegistry = cnsRegistry;
    }

    function reverseOf(address account) public view returns (uint256) {
        uint256 tokenId = _reverses[account];
        require(tokenId != 0, 'ReverseResolver: REVERSE_RECORD_IS_EMPTY');
        require(isApprovedOrOwner(account, tokenId), 'ReverseResolver: ACCOUNT_IS_NOT_APPROVED_OR_OWNER');
        return tokenId;
    }

    /**
     * TODO: does it make sense to emit event on register?
     */
    function register(uint256 tokenId) public {
        address sender = _msgSender();
        require(isApprovedOrOwner(sender, tokenId), 'ReverseResolver: SENDER_IS_NOT_APPROVED_OR_OWNER');
        _reverses[sender] = tokenId;
    }

    function remove() public {
        address sender = _msgSender();
        uint256 tokenId = _reverses[sender];
        require(tokenId != 0, 'ReverseResolver: REVERSE_RECORD_IS_EMPTY');
        delete _reverses[sender];
    }

    function isApprovedOrOwner(address account, uint256 tokenId) private view returns (bool) {
        if (_unsRegistry.exists(tokenId)) {
            return _unsRegistry.isApprovedOrOwner(account, tokenId);
        }

        if (address(_cnsRegistry) != address(0x0)) {
            return _cnsRegistry.isApprovedOrOwner(account, tokenId);
        }

        revert('ERC721: operator query for nonexistent token');
    }
}
