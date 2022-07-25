import '@openzeppelin/contracts-upgradeable/interfaces/IERC1271Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';

/* 
   Smart contract wallets implement ERC1271, which specifies the interface on how the signature of owner (user) should be verified.
   Providing some examples on how is it implemented in different wallets:
   * https://github.com/argentlabs/argent-contracts/blob/ea361609bbda15bf19bac35dbc2af80b720cb27b/contracts/modules/TransactionManager.sol#L232
   * https://github.com/dapperlabs/dapper-contracts/blob/0321efcc80c413dc1d3a3cd30ae02929b3ddadfe/contracts/Wallet/CoreWallet.sol#L360
   * https://github.com/polymorpher/one-wallet/blob/db7d27442c7400b1b0181aff0f1757a15baaa699/code/contracts/SignatureManager.sol#L161
*/
contract ERC1271SimpleSmartWallet is IERC1271Upgradeable {
    using ECDSAUpgradeable for bytes32;

    bytes4 constant internal _ERC1271_MAGIC_VALUE = bytes4(keccak256("isValidSignature(bytes32,bytes)"));

    address private _owner;

    constructor(address owner) {
        _owner = owner;
    }

    function isValidSignature(bytes32 _hash, bytes memory _signature) public view override returns (bytes4) {
        if(_hash.recover(_signature) == _owner) {
            return _ERC1271_MAGIC_VALUE;
        } else {
            return 0;
        }
    }
}

contract ERC1271EmptyMock {}
