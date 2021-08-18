// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';

import './BaseForwarder.sol';

abstract contract EIP712UpgradeableGap {
    /* solhint-disable var-name-mixedcase */
    bytes32 private _HASHED_NAME;
    bytes32 private _HASHED_VERSION;
    uint256[50] private __gap;
    /* solhint-enable var-name-mixedcase */
}

/**
 * @dev https://eips.ethereum.org/EIPS/eip-2771[EIP 2771] is a standard for native meta transactions.
 *
 * A base contract to be inherited by any contract that want to forward transactions.
 */
abstract contract RegistryForwarder is Initializable, EIP712UpgradeableGap, BaseForwarder {
    mapping(uint256 => uint256) private _nonces;

    // solhint-disable-next-line func-name-mixedcase
    function __RegistryForwarder_init() internal initializer {
        __RegistryForwarder_init_unchained();
    }

    // solhint-disable-next-line func-name-mixedcase
    function __RegistryForwarder_init_unchained() internal initializer {}

    /*
     * 0x23b872dd == bytes4(keccak256('transferFrom(address,address,uint256)'))
     */
    function transferFromFor(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata signature
    ) external {
        uint256 gas = gasleft();
        _executeFor(abi.encodeWithSelector(0x23b872dd, from, to, tokenId), tokenId, signature, gas);
    }

    /*
     * 0x42842e0e == bytes4(keccak256('safeTransferFrom(address,address,uint256)'))
     */
    function safeTransferFromFor(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata signature
    ) external {
        uint256 gas = gasleft();
        _executeFor(abi.encodeWithSelector(0x42842e0e, from, to, tokenId), tokenId, signature, gas);
    }

    /*
     * 0xb88d4fde == bytes4(keccak256('safeTransferFrom(address,address,uint256,bytes)'))
     */
    function safeTransferFromFor(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data,
        bytes calldata signature
    ) external {
        uint256 gas = gasleft();
        _executeFor(abi.encodeWithSelector(0xb88d4fde, from, to, tokenId, data), tokenId, signature, gas);
    }

    /*
     * 0x42966c68 == bytes4(keccak256('burn(uint256)'))
     */
    function burnFor(uint256 tokenId, bytes calldata signature) external {
        uint256 gas = gasleft();
        _executeFor(abi.encodeWithSelector(0x42966c68, tokenId), tokenId, signature, gas);
    }

    /*
     * 0x310bd74b == bytes4(keccak256('reset(uint256)'))
     */
    function resetFor(uint256 tokenId, bytes calldata signature) external {
        uint256 gas = gasleft();
        _executeFor(abi.encodeWithSelector(0x310bd74b, tokenId), tokenId, signature, gas);
    }

    /*
     * 0x47c81699 == bytes4(keccak256('set(string,string,uint256)'))
     */
    function setFor(
        string calldata key,
        string calldata value,
        uint256 tokenId,
        bytes calldata signature
    ) external {
        uint256 gas = gasleft();
        _executeFor(abi.encodeWithSelector(0x47c81699, key, value, tokenId), tokenId, signature, gas);
    }

    /*
     * 0xce92b33e == bytes4(keccak256('setMany(string[],string[],uint256)'))
     */
    function setManyFor(
        string[] calldata keys,
        string[] calldata values,
        uint256 tokenId,
        bytes calldata signature
    ) external {
        uint256 gas = gasleft();
        _executeFor(abi.encodeWithSelector(0xce92b33e, keys, values, tokenId), tokenId, signature, gas);
    }

    /*
     * 0xec129eea == bytes4(keccak256('reconfigure(string[],string[],uint256)'))
     */
    function reconfigureFor(
        string[] calldata keys,
        string[] calldata values,
        uint256 tokenId,
        bytes calldata signature
    ) public {
        uint256 gas = gasleft();
        _executeFor(abi.encodeWithSelector(0xec129eea, keys, values, tokenId), tokenId, signature, gas);
    }

    function nonceOf(uint256 tokenId) public view override returns (uint256) {
        return _nonces[tokenId];
    }

    function verify(ForwardRequest calldata req, bytes calldata signature) public view override returns (bool) {
        return _verify(req, address(this), signature);
    }

    function execute(ForwardRequest calldata req, bytes calldata signature) public override returns (bytes memory) {
        uint256 gas = gasleft();
        require(verify(req, signature), 'RegistryForwarder: SIGNATURE_INVALID');
        return _execute(req.from, address(this), req.tokenId, gas, req.data, 'RegistryForwarder: CALL_FAILED');
    }

    function _invalidateNonce(uint256 tokenId) internal override {
        _nonces[tokenId] = _nonces[tokenId] + 1;
    }

    function _executeFor(
        bytes memory data,
        uint256 tokenId,
        bytes memory signature,
        uint256 gas
    ) private returns (bytes memory) {
        address from = _recover(keccak256(data), address(this), _nonces[tokenId], signature);
        return _execute(from, address(this), tokenId, gas, data, 'RegistryForwarder: CALL_FAILED');
    }

    uint256[50] private __gap;
}
