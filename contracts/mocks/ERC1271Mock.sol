import '@openzeppelin/contracts-upgradeable/interfaces/IERC1271Upgradeable.sol';

contract ERC1271Mock is IERC1271Upgradeable {
    bytes4 constant internal _MAGICVALUE = 0x1626ba7e;

    function isValidSignature(bytes32 _hash, bytes memory _signature) public view override returns (bytes4 magicValue) {
        magicValue = _MAGICVALUE;
    }
}

contract ERC1271EmptyMock {}
