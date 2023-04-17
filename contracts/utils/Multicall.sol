// @author Unstoppable Domains, Inc.
// @date April 3rd, 2023

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';

/**
 * @dev The contract is copy of MulticallUpgradeable from OpenZeppelin@4.7.3 Contracts.
 * The only difference is that it does not have storage slots reservation.
 */
abstract contract Multicall {
    /**
     * @dev Receives and executes a batch of function calls on this contract.
     */
    function _multicall(bytes[] memory data) internal returns (bytes[] memory results) {
        results = new bytes[](data.length);
        for (uint256 i = 0; i < data.length; i++) {
            // solhint-disable-next-line avoid-low-level-calls
            (bool success, bytes memory returndata) = address(this).delegatecall(data[i]);
            results[i] = AddressUpgradeable.verifyCallResult(success, returndata, 'Address: low-level delegate call failed');
        }
        return results;
    }
}
