pragma solidity 0.5.12;

import '@openzeppelin/contracts/cryptography/ECDSA.sol';

// {
// 	"6d4ce63c": "get()",
// 	"b7c763b5": "getString(uint256)",
// 	"a9c70eaa": "getUint(uint256)",
// 	"60fe47b1": "set(uint256)",
// 	"4717fd92": "setString(uint256,string)",
// 	"61e3c944": "setUint(uint256,uint256)"
// }

/**
 * NOTE: The contract was built only for testing purposes
 */
contract RelayTest {
    using ECDSA for bytes32;

    mapping(uint => string) private _stringStore;
    mapping(uint => uint) private _uintStore;
    uint private _value;

    function setString(uint key, string calldata value) external {
        /* solium-disable-next-line error-reason */
        require(key != 0);
        require(bytes(value).length != 0, 'RelayTest: VALUE_EMPTY');

        _stringStore[key] = value;
    }

    function getString(uint key) external view returns (string memory) {
        /* solium-disable-next-line error-reason */
        require(key != 0);

        return _stringStore[key];
    }

    function setUint(uint key, uint value) external {
        /* solium-disable-next-line error-reason */
        require(key != 0);
        require(value != 0, 'RelayTest: VALUE_EMPTY');

        _uintStore[key] = value;
    }

    function getUint(uint key) external view returns (uint) {
        /* solium-disable-next-line error-reason */
        require(key != 0);

        return _uintStore[key];
    }

    function set(uint value) external {
        _value = value;
    }

    function get() external view returns(uint) {
        return _value;
    }

    function relay(bytes calldata data, bytes calldata signature) external returns(bytes memory) {
        verifySigner(keccak256(data), signature);
        bytes memory _data = data;
        verifyCall(_data);

        /* solium-disable-next-line security/no-low-level-calls */
        (bool success, bytes memory result) = address(this).call(data);
        if (success == false) {
            /* solium-disable-next-line security/no-inline-assembly */
            assembly {
                let ptr := mload(0x40)
                let size := returndatasize
                returndatacopy(ptr, 0, size)
                revert(ptr, size)
            }
        }
        return result;
    }

    function verifySigner(bytes32 data, bytes memory signature) private view {
        address signer = keccak256(abi.encodePacked(data, address(this)))
            .toEthSignedMessageHash()
            .recover(signature);
        require(signer != address(0), 'RelayTest: SIGNATURE_IS_INVALID');
    }

    function verifyCall(bytes memory data) private pure {
        bytes4 sig;
        /* solium-disable-next-line security/no-inline-assembly */
        assembly {
            sig := mload(add(data, add(0x20, 0)))
        }

        bool isSupported = sig == 0xb7c763b5 ||
            sig == 0x4717fd92 ||
            sig == 0xa9c70eaa ||
            sig == 0x61e3c944;
        require(isSupported, 'RelayTest: UNSUPPORTED_CALL');
    }
}