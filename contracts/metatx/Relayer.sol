// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol';

abstract contract Relayer is ContextUpgradeable {
    using ECDSAUpgradeable for bytes32;

    event Relayed(address indexed sender, address indexed signer, bytes4 indexed funcSig, bytes32 digest);

    /**
     * Relay allows execute transaction on behalf of whitelisted minter.
     * The function verify signature of call data parameter before execution.
     * It allows anybody send transaction on-chain when minter has provided proper parameters.
     * The function allows to relaying calls of fixed functions. The restriction defined in function `verifyCall`
     */
    function relay(bytes calldata data, bytes calldata signature) external returns(bytes memory) {
        bytes32 digest = keccak256(data);
        address signer = keccak256(abi.encodePacked(digest, address(this)))
            .toEthSignedMessageHash()
            .recover(signature);

        bytes4 funcSig;
        bytes memory _data = data;
        /* solium-disable-next-line security/no-inline-assembly */
        assembly {
            funcSig := mload(add(_data, add(0x20, 0)))
        }

        verifySigner(signer);
        verifyCall(funcSig, data);

        /* solium-disable-next-line security/no-low-level-calls */
        (bool success, bytes memory result) = address(this).call(data);
        if (success == false) {
            /* solium-disable-next-line security/no-inline-assembly */
            assembly {
                let ptr := mload(0x40)
                let size := returndatasize()
                returndatacopy(ptr, 0, size)
                revert(ptr, size)
            }
        }

        emit Relayed(_msgSender(), signer, funcSig, digest);
        return result;
    }

    function verifySigner(address signer) internal view virtual {
        require(signer != address(0), 'MintingManager: SIGNATURE_IS_INVALID');
    }

    function verifyCall(bytes4 funcSig, bytes calldata data) internal pure virtual {
    }
}
