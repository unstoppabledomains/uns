// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;
pragma abicoder v2;

// Intended to be used with an ERC2771 compatible contract.

contract SimpleERC2771Forwarder {
    // TODO(bradenp): Make the recipient immutable to reduce gas cost.
    //   This involves precomputing the contract addresses.

    address internal _recipient;
    string internal _name = "SimpleERC2771Forwarder";

    function setRecipient(address recipient) external {
        require(_recipient == address(0), "recipient already exists");
        _recipient = recipient;
    }

    event NoncesInvalidated(
        address indexed account,
        uint256 indexed previousNonce,
        uint256 indexed newNonce
    );

    struct SimpleERC2771ForwarderParams {
        bytes payload;
        uint256 expiry;
        uint256 nonce;
    }

    mapping(address => uint256) internal _nonces;

    function name() public view returns (string memory) {
        return _name;
    }

    function nonceOf(address account) external view returns (uint256) {
        return _nonces[account];
    }

    function invalidateNonces(uint256 newNonce) external {
        require(_nonces[msg.sender] < newNonce, "new nonce not high enough");

        emit NoncesInvalidated(msg.sender, _nonces[msg.sender], newNonce);

        _nonces[msg.sender] = newNonce;
    }

    function forward(
        SimpleERC2771ForwarderParams calldata params,
        bytes32 r,
        bytes32 s,
        uint8 v
    ) external payable returns (bool, bytes memory) {
        uint256 gas = gasleft(); // TODO(bradenp): find out if we need this...

        uint256 chainID;
        assembly {
            chainID := chainid()
        }

        // TODO(bradenp): This should be done in a library... It should also
        // support trezor, ledger & regular eth_sign paddings.
        address signer =
            ecrecover(
                keccak256(
                    abi.encodePacked(
                        "\x19\x01",
                        keccak256(
                            abi.encode(
                                keccak256(
                                    "EIP712Domain(string name,uint256 chainId,address verifyingContract)"
                                ),
                                keccak256(bytes(name())),
                                chainID,
                                address(this)
                            )
                        ),
                        keccak256(
                            abi.encode(
                                keccak256(
                                    "SimpleERC2771ForwarderParams(bytes payload,uint256 expiry,uint256 nonce)"
                                ),
                                keccak256(params.payload),
                                params.expiry,
                                params.nonce
                            )
                        )
                    )
                ),
                v,
                r,
                s
            );

        require(signer != address(0), "invalid signature");
        require(params.expiry > block.timestamp, "lapsed expiry");
        require(params.nonce == _nonces[signer], "invalid nonce");

        _nonces[signer] = _nonces[signer] + 1;

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) =
            _recipient.call{gas: gas, value: msg.value}(
                abi.encodePacked(params.payload, signer)
            );

        // Validate that the forwarder has sent enough gas for the call.
        // See https://ronan.eth.link/blog/ethereum-gas-dangers/
        // NOTE(bradenp): THIS IS FUCKING CRAZY.
        assert(gasleft() > gas / 63);

        return (success, returndata);
    }
}
