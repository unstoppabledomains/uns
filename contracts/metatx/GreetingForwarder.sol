import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';

struct ForwardRequest {
    address from;
    uint256 nonce;
    bytes data;
}

contract GreetingForwarder {
    using ECDSAUpgradeable for bytes32;

    address private _greeting;
    mapping(address => uint256) private _nonces;

    constructor(address greeting) {
        _greeting = greeting;
    }

    function nonceOf(address account) public view returns (uint256) {
        return _nonces[account];
    }

    function verify(
        ForwardRequest calldata req,
        bytes calldata signature
    ) public view returns (bool) {
        return _verify(req.from, req.data, req.nonce, _greeting, signature);
    }

    function execute(
        ForwardRequest calldata req,
        bytes calldata signature
    ) external returns (bytes memory) {
        require(verify(req, signature), 'GreetingForwarder: SIGNATURE_INVALID');

        _invalidateNonce(req.from);

        (bool success, bytes memory returndata) = _greeting.call{gas: gasleft()}(abi.encodePacked(req.data, req.from));
        require(success, 'GreetingForwarder: FORWARD_CALL_FAILED');

        return returndata;
    }

    function _recover(
        bytes32 digest,
        address target,
        uint256 nonce,
        bytes memory signature
    ) internal pure virtual returns (address signer) {
        return keccak256(abi.encodePacked(digest, target, nonce)).toEthSignedMessageHash().recover(signature);
    }

    function _verify(
        address from,
        bytes calldata data,
        uint256 nonce,
        address target,
        bytes calldata signature
    ) internal view virtual returns (bool) {
        address signer = _recover(keccak256(data), target, nonce, signature);
        return signer == from && this.nonceOf(from) == nonce;
    }

    function _invalidateNonce(address account) internal {
        _nonces[account] = _nonces[account] + 1;
    }
}
