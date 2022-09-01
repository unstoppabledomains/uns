pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';

contract CustodyERC20Contract is ReentrancyGuardUpgradeable {
    
    struct DepositStruct {
        address owner;
        uint256 depositOwnerReleaseTimestamp;
        uint256 numberOfTokens;
    }

    event Withdrawal(string indexed secret, address indexed recepient, uint256 numberOfTokens);
    event Deposit(address indexed owner, uint256 numberOfTokens, uint256 depositReleaseTimestamp);

    IERC20Upgradeable _token;
    mapping(bytes32 => DepositStruct) _deposits;

    function initialize(IERC20Upgradeable token) public initializer {
        _token = token;
    }

    function withdrawTokens(string calldata secret) public nonReentrant {
        bytes32 secretHash = keccak256(abi.encode(secret));
        DepositStruct memory deposit = _deposits[secretHash]; 

        require(deposit.owner != address(0) , 'deposit by this secret is not available');

        //should be not an owner, or deposit should be released for owner
        require(
            msg.sender != deposit.owner || block.timestamp >= deposit.depositOwnerReleaseTimestamp,
            'deposit is not released for owner yet'
        );
        _token.transfer(msg.sender, deposit.numberOfTokens);

        emit Withdrawal(secret, msg.sender, deposit.numberOfTokens);
        delete _deposits[secretHash];
    }

    //prerequest: user should have tokens and preaprove them.
    //depositOwnerReleaseTimestamp is a timestamp is seconds after which deposit owner is allowed to make a withdraw
    //secret hash - secret, hashed using keccak256
    function depositTokens(
        uint256 numberOfTokens,
        uint256 depositOwnerReleaseTimestamp,
        bytes32 secretHash
    ) public {
        uint256 allowance = _token.allowance(msg.sender, _contractAddress());

        require(allowance >= numberOfTokens, 'Allowance is less then required');
        require(_deposits[secretHash].owner == address(0x0), 'deposit with such secretHash already exists');

        _token.transferFrom(msg.sender, _contractAddress(), numberOfTokens);
        emit Deposit(msg.sender, numberOfTokens, depositOwnerReleaseTimestamp);

        _deposits[secretHash].owner = msg.sender;
        _deposits[secretHash].numberOfTokens = numberOfTokens;
        _deposits[secretHash].depositOwnerReleaseTimestamp = depositOwnerReleaseTimestamp;
    }

    function _contractAddress() private view returns (address) {
        return address(this);
    }
}
