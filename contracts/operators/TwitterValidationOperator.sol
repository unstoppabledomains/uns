// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol';
import '@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol';

import '../utils/ERC677Receiver.sol';
import '../roles/WhitelistedRole.sol';
import '../roles/CapperRole.sol';
import '../IRegistry.sol';

contract TwitterValidationOperator is WhitelistedRole, CapperRole, ERC677Receiver {
    string public constant NAME = 'Chainlink Twitter Validation Operator';
    string public constant VERSION = '0.2.0';

    using SafeMathUpgradeable for uint256;

    event Validation(uint256 indexed tokenId, uint256 requestId, uint256 paymentAmount);
    event ValidationRequest(uint256 indexed tokenId, address indexed owner, uint256 requestId, string code);
    event PaymentSet(uint256 operatorPaymentPerValidation, uint256 userPaymentPerValidation);

    uint256 public operatorPaymentPerValidation;
    uint256 public userPaymentPerValidation;
    uint256 public withdrawableTokens;

    uint256 private _frozenTokens;
    uint256 private _lastRequestId = 1;
    mapping(uint256 => uint256) private _userRequests;
    IRegistry private _registry;
    LinkTokenInterface private _linkToken;

    /**
     * @notice Deploy with the address of the LINK token, domains registry and payment amount in LINK for one valiation
     * @dev Sets the LinkToken address, Registry address and payment in LINK tokens for one validation
     * @param registry The address of the .crypto Registry
     * @param linkToken The address of the LINK token
     * @param paymentCappers Addresses allowed to update payment amount per validation
     */
    constructor(
        IRegistry registry,
        LinkTokenInterface linkToken,
        address[] memory paymentCappers
    ) {
        require(address(registry) != address(0), 'TwitterValidationOperator: INVALID_REGISTRY_ADDRESS');
        require(address(linkToken) != address(0), 'TwitterValidationOperator: INVALID_LINK_TOKEN_ADDRESS');
        require(paymentCappers.length > 0, 'TwitterValidationOperator: NO_CAPPERS_PROVIDED');
        _registry = registry;
        _linkToken = linkToken;
        __WhitelistedRole_init_unchained();
        uint256 cappersCount = paymentCappers.length;
        for (uint256 i = 0; i < cappersCount; i++) {
            addCapper(paymentCappers[i]);
        }
        renounceCapper();
    }

    /**
     * @dev Reverts if amount requested is greater than withdrawable balance
     * @param amount The given amount to compare to `withdrawableTokens`
     */
    modifier hasAvailableFunds(uint256 amount) {
        require(withdrawableTokens >= amount, 'TwitterValidationOperator: TOO_MANY_TOKENS_REQUESTED');
        _;
    }

    /**
     * @dev Reverts if contract doesn not have enough LINK tokens to fulfil validation
     */
    modifier hasAvailableBalance() {
        require(
            availableBalance() >= withdrawableTokens.add(operatorPaymentPerValidation),
            'TwitterValidationOperator: NOT_ENOUGH_TOKENS_ON_CONTRACT_BALANCE'
        );
        _;
    }

    /**
     * @dev Reverts if method called not from LINK token contract
     */
    modifier linkTokenOnly() {
        require(_msgSender() == address(_linkToken), 'TwitterValidationOperator: CAN_CALL_FROM_LINK_TOKEN_ONLY');
        _;
    }

    /**
     * @dev Reverts if user sent incorrect amount of LINK tokens
     */
    modifier correctTokensAmount(uint256 value) {
        require(value == userPaymentPerValidation, 'TwitterValidationOperator: INCORRECT_TOKENS_AMOUNT');
        _;
    }

    /**
     * @notice Method will be called by Chainlink node in the end of the job. Provides user twitter name and validation signature
     * @dev Sets twitter username and signature to .crypto domain records
     * @param username Twitter username
     * @param signature Signed twitter username. Ensures the validity of twitter username
     * @param tokenId Domain token ID
     * @param requestId Request id for validations were requested from Smart Contract. If validation was requested from operator `_requestId` should be equals to zero.
     */
    function setValidation(
        string calldata username,
        string calldata signature,
        uint256 tokenId,
        uint256 requestId
    ) external onlyWhitelisted hasAvailableBalance {
        uint256 _payment = _calculatePaymentForValidation(requestId);
        withdrawableTokens = withdrawableTokens.add(_payment);
        _registry.set('social.twitter.username', username, tokenId);
        _registry.set('validation.social.twitter.username', signature, tokenId);
        emit Validation(tokenId, requestId, _payment);
    }

    /**
     * @notice Method returns true if Node Operator able to set validation
     * @dev Returns true or error
     */
    function canSetValidation() external view onlyWhitelisted hasAvailableBalance returns (bool) {
        return true;
    }

    /**
     * @notice Method allows to update payments per one validation in LINK tokens
     * @dev Sets operatorPaymentPerValidation and userPaymentPerValidation variables
     * @param operatorPaymentPerValidation_ Payment amount in LINK tokens when verification initiated via Operator
     * @param userPaymentPerValidation_ Payment amount in LINK tokens when verification initiated directly by user via Smart Contract call
     */
    function setPaymentPerValidation(uint256 operatorPaymentPerValidation_, uint256 userPaymentPerValidation_)
        external
        onlyCapper
    {
        operatorPaymentPerValidation = operatorPaymentPerValidation_;
        userPaymentPerValidation = userPaymentPerValidation_;
        emit PaymentSet(operatorPaymentPerValidation, userPaymentPerValidation);
    }

    /**
     * @notice Allows the node operator to withdraw earned LINK to a given address
     * @dev The owner of the contract can be another wallet and does not have to be a Chainlink node
     * @param recipient The address to send the LINK token to
     * @param amount The amount to send (specified in wei)
     */
    function withdraw(address recipient, uint256 amount) external onlyWhitelistAdmin hasAvailableFunds(amount) {
        withdrawableTokens = withdrawableTokens.sub(amount);
        assert(_linkToken.transfer(recipient, amount));
    }

    /**
     * @notice Initiate Twitter validation
     * @dev Method invoked when LINK tokens transferred via transferAndCall method. Requires additional encoded data
     * @param sender Original token sender
     * @param value Tokens amount
     * @param data Encoded additional data needed to initiate domain verification: `abi.encode(uint256 tokenId, string code)`
     */
    function onTokenTransfer(
        address sender,
        uint256 value,
        bytes calldata data
    ) external override linkTokenOnly correctTokensAmount(value) {
        (uint256 _tokenId, string memory _code) = abi.decode(data, (uint256, string));
        require(
            _registry.isApprovedOrOwner(sender, _tokenId),
            'TwitterValidationOperator: SENDER_DOES_NOT_HAVE_ACCESS_TO_DOMAIN'
        );
        require(bytes(_code).length > 0, 'TwitterValidationOperator: CODE_IS_EMPTY');
        require(
            _registry.isApprovedOrOwner(address(this), _tokenId),
            'TwitterValidationOperator: OPERATOR_SHOULD_BE_APPROVED'
        );
        _frozenTokens = _frozenTokens.add(value);
        _userRequests[_lastRequestId] = value;

        emit ValidationRequest(_tokenId, _registry.ownerOf(_tokenId), _lastRequestId, _code);
        _lastRequestId = _lastRequestId.add(1);
    }

    /**
     * @notice Method returns available LINK tokens balance minus held tokens
     * @dev Returns tokens amount
     */
    function availableBalance() public view returns (uint256) {
        return _linkToken.balanceOf(address(this)).sub(_frozenTokens);
    }

    function _calculatePaymentForValidation(uint256 requestId) private returns (uint256 paymentPerValidation) {
        if (requestId > 0) {
            // Validation was requested from Smart Contract. We need to search for price in mapping
            paymentPerValidation = _userRequests[requestId];
            _frozenTokens = _frozenTokens.sub(paymentPerValidation);
            delete _userRequests[requestId];
        } else {
            paymentPerValidation = operatorPaymentPerValidation;
        }
    }
}
