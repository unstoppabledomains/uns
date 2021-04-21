pragma solidity 0.5.12;

import "@openzeppelin/contracts/access/Roles.sol";
import "@openzeppelin/contracts/access/roles/WhitelistedRole.sol";

/**
 * @title BulkWhitelistedRole
 * @dev a Whitelist role defined using the Open Zeppelin Role system with the addition of bulkAddWhitelisted and
 * bulkRemoveWhitelisted.
 * @dev Whitelisted accounts have been approved by a WhitelistAdmin to perform certain actions (e.g. participate in a
 * crowdsale). This role is special in that the only accounts that can add it are WhitelistAdmins (who can also remove
 * it), and not Whitelisteds themselves.
 */
contract BulkWhitelistedRole is WhitelistedRole {

    function bulkAddWhitelisted(address[] memory accounts) public onlyWhitelistAdmin {
        for (uint256 index = 0; index < accounts.length; index++) {
            _addWhitelisted(accounts[index]);
        }
    }

    function bulkRemoveWhitelisted(address[] memory accounts) public onlyWhitelistAdmin {
        for (uint256 index = 0; index < accounts.length; index++) {
            _removeWhitelisted(accounts[index]);
        }
    }

}
