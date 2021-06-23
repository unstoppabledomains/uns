// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';

import '../utils/ERC677Receiver.sol';

contract LinkTokenMock is ERC20Upgradeable, AccessControlUpgradeable {
    using AddressUpgradeable for address;

    bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');

    modifier onlyMinter() {
        require(isMinter(_msgSender()), 'LinkTokenMock: CALLER_IS_NOT_MINTER');
        _;
    }

    function initialize() public initializer {
        __ERC20_init('LinkTokenMock', 'LTM');
        _setupRole(MINTER_ROLE, _msgSender());
    }

    function isMinter(address account) public view returns (bool) {
        return hasRole(MINTER_ROLE, account);
    }

    function mint(address to, uint256 amount) public onlyMinter {
        _mint(to, amount);
    }

    /**
     * @dev transfer token to a contract address with additional data if the recipient is a contact.
     * @param to The address to transfer to.
     * @param value The amount to be transferred.
     * @param data The extra data to be passed to the receiving contract.
     */
    function transferAndCall(
        address to,
        uint256 value,
        bytes memory data
    ) public returns (bool success) {
        super.transfer(to, value);
        emit Transfer(msg.sender, to, value);
        if (to.isContract()) {
            _contractFallback(to, value, data);
        }
        return true;
    }

    function _contractFallback(
        address to,
        uint256 value,
        bytes memory data
    ) private {
        ERC677Receiver receiver = ERC677Receiver(to);
        receiver.onTokenTransfer(msg.sender, value, data);
    }
}
