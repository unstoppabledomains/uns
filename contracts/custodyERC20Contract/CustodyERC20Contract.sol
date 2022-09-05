pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';

contract CustodyERC20Contract is ReentrancyGuardUpgradeable {

    using SafeERC20Upgradeable for IERC20Upgradeable;

    struct DepositStruct {
        address owner;
        uint256 amount;
        uint256 expiration;
    }

    event Withdrawal(address indexed sender, uint256 amount);
    event Deposit(address indexed sender, bytes32 puzzle, uint256 amount);

    IERC20Upgradeable _token;
    mapping(bytes32 => DepositStruct) _deposits;

    function initialize(IERC20Upgradeable token) public initializer {
        _token = token;
    }

    function getSecretHash(bytes32 secret)public view returns(bytes32){
        return keccak256(abi.encode(secret, block.chainid, address(this)));
    }

    function withdrawTokens(bytes32 secret) public nonReentrant {
        bytes32 secretHash = keccak256(abi.encode(secret, block.chainid, address(this)));
        DepositStruct memory deposit = _deposits[secretHash];

        require(deposit.owner != address(0), 'Deposit by this secret is not available');
        require(deposit.amount > 0, 'Deposit is already withdrawn');

        require(((msg.sender == deposit.owner && block.timestamp >= deposit.expiration) ||
                (msg.sender != deposit.owner && block.timestamp < deposit.expiration)), 
                "The user can not withdraw the deposit due to expiration");

        _token.safeTransfer(msg.sender, deposit.amount);

        emit Withdrawal(msg.sender, deposit.amount);
        _deposits[secretHash].amount = 0; // to avoid additional flag for withdrawn deposits.
    }

    // expiration is a timestamp in seconds after which deposit owner is allowed to make a withdraw
    // secret hash - secret, hashed using keccak256
    function depositTokens(
        uint256 amount,
        uint256 expiration,
        bytes32 secretHash
    ) public nonReentrant {
        require( 0 < amount && amount <= _token.allowance(msg.sender, address(this)), 'Amount is out of bounds.');
        require(secretHash != '', 'SecretHash can not be empty');
        require(block.timestamp < expiration, 'Expiration can not be less then current time');
        require(_deposits[secretHash].owner == address(0x0), 'Deposit with such secretHash already exist');

        require(_token.transferFrom(msg.sender, address(this), amount), "Token transfer wasn't successful.");
        emit Deposit(msg.sender, secretHash, amount);

        _deposits[secretHash] = DepositStruct(msg.sender, amount, expiration);
    }
}
