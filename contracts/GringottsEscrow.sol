pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';

contract GringottsEscrow is ReentrancyGuardUpgradeable {
    struct EscrowDetails {
        address owner;
        uint256 expiration;
        uint256 amount;
    }

    mapping(bytes32 => EscrowDetails) private _ecrows;

    function deposit(bytes32 secretHash, uint256 expiration) public payable {
        require(_ecrows[secretHash].owner == address(0x0), 'DUPLICATE_SECRET');
        require(msg.value != 0, 'ZERO_AMOUNT');
        require(expiration > block.timestamp, 'WRONG_EXPIRATION');

        _ecrows[secretHash] = EscrowDetails(msg.sender, expiration, msg.value);
    }

    function withdraw(string calldata secret) public nonReentrant {
        bytes32 secretHash = generateSecretHash(secret, address(this));
        EscrowDetails memory escrow = _ecrows[secretHash];

        require(escrow.owner != address(0x0), 'UNKNOWN_SECRET');
        if (escrow.expiration > block.timestamp) {
            require(msg.sender != escrow.owner, 'ESCROW_LOCKED');
        } else {
            require(msg.sender == escrow.owner, 'ESCROW_UNLOCKED');
        }
        (bool success, bytes memory returnData) = payable(msg.sender).call{value: escrow.amount}('');
        _verifyCallResult(success, returnData);
        delete _ecrows[secretHash];
    }

    function generateSecretHash(string calldata secret, address addr) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(secret, addr));
    }

    function _verifyCallResult(bool success, bytes memory returndata) private pure {
        if (!success) {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                // solhint-disable-next-line no-inline-assembly
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert('SEND_ERROR');
            }
        }
    }
}
