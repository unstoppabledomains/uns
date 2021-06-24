// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol';
import '@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol';

import '../cns/ICryptoResolver.sol';
import '../utils/ERC677Receiver.sol';
import '../roles/WhitelistedRole.sol';
import '../roles/CapperRole.sol';
import '../IRegistry.sol';

contract TwitterValidationOperator is WhitelistedRole, CapperRole, ERC677Receiver {
    using SafeMathUpgradeable for uint256;

    string public constant NAME = 'UNS: Chainlink Twitter Validation Operator';
    string public constant VERSION = '0.1.0';

    event Validation(uint256 indexed tokenId, uint256 requestId, uint256 paymentAmount);
    event ValidationRequest(uint256 indexed tokenId, address indexed owner, uint256 requestId, string code);
    event PaymentSet(uint256 operatorPaymentPerValidation, uint256 userPaymentPerValidation);

    uint256 public operatorPaymentPerValidation;
    uint256 public userPaymentPerValidation;
    uint256 public withdrawableTokens;

    uint256 private _frozenTokens;
    uint256 private _lastRequestId = 1;
    mapping(uint256 => uint256) private _userRequests;
    IRegistry private _unsRegistry;
    IRegistry private _cnsRegistry;
    LinkTokenInterface private _linkToken;

    /**
     * @notice Deploy with the address of the LINK token, domains registry and payment amount in LINK for one valiation
     * @dev Sets the LinkToken address, Registry address and payment in LINK tokens for one validation
     * @param unsRegistry The address of the UNS Registry
     * @param cnsRegistry The address of the CNS Registry
     * @param linkToken The address of the LINK token
     * @param paymentCappers Addresses allowed to update payment amount per validation
     */
    constructor(
        IRegistry unsRegistry,
        IRegistry cnsRegistry,
        LinkTokenInterface linkToken,
        address[] memory paymentCappers
    ) {
        require(address(unsRegistry) != address(0), 'TwitterValidationOperator: UNS_REGISTRY_IS_EMPTY');
        require(address(cnsRegistry) != address(0), 'TwitterValidationOperator: CNS_REGISTRY_IS_EMPTY');
        require(address(linkToken) != address(0), 'TwitterValidationOperator: INVALID_LINK_TOKEN_ADDRESS');
        require(paymentCappers.length > 0, 'TwitterValidationOperator: NO_CAPPERS_PROVIDED');

        _unsRegistry = unsRegistry;
        _cnsRegistry = cnsRegistry;
        _linkToken = linkToken;
        __WhitelistedRole_init_unchained();

        for (uint256 i = 0; i < paymentCappers.length; i++) {
            _addCapper(paymentCappers[i]);
        }
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
        uint256 payment = _calculatePaymentForValidation(requestId);
        withdrawableTokens = withdrawableTokens.add(payment);

        IRegistry registry = _getRegistry(tokenId);
        ICryptoResolver resolver = ICryptoResolver(registry.resolverOf(tokenId));
        require(address(resolver) != address(0), 'TwitterValidationOperator: RESOLVER_IS_EMPTY');

        resolver.set('social.twitter.username', username, tokenId);
        resolver.set('validation.social.twitter.username', signature, tokenId);

        emit Validation(tokenId, requestId, payment);
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
        (uint256 tokenId, string memory code) = abi.decode(data, (uint256, string));
        IRegistry registry = _getRegistry(tokenId);
        require(
            registry.isApprovedOrOwner(sender, tokenId),
            'TwitterValidationOperator: SENDER_DOES_NOT_HAVE_ACCESS_TO_DOMAIN'
        );
        require(bytes(code).length > 0, 'TwitterValidationOperator: CODE_IS_EMPTY');
        require(
            registry.isApprovedOrOwner(address(this), tokenId),
            'TwitterValidationOperator: OPERATOR_SHOULD_BE_APPROVED'
        );
        _frozenTokens = _frozenTokens.add(value);
        _userRequests[_lastRequestId] = value;

        emit ValidationRequest(tokenId, registry.ownerOf(tokenId), _lastRequestId, code);
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

    function _getRegistry(uint256 tokenId) private view returns (IRegistry) {
        if (_unsRegistry.exists(tokenId)) {
            return _unsRegistry;
        } else if (_cnsOwnerOf(tokenId) != address(0x0)) {
            return _cnsRegistry;
        }
        revert('TwitterValidationOperator: TOKEN_NOT_FOUND');
    }

    function _cnsOwnerOf(uint256 tokenId) private view returns (address) {
        try _cnsRegistry.ownerOf(tokenId) returns (address owner) {
            return owner;
        } catch {
            return address(0x0);
        }
    }
}
