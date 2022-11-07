// @author Unstoppable Domains, Inc.
// @date December 20th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol';

import './@maticnetwork/IChildToken.sol';

abstract contract ChildRegistry is ERC721Upgradeable, IChildToken {
    // limit batching of tokens due to gas limit restrictions
    uint256 public constant BATCH_LIMIT = 20;

    // This is the keccak-256 hash of "uns.polygon.child_chain_manager" subtracted by 1
    bytes32 internal constant _CHILD_CHAIN_MANAGER_SLOT = 0x8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87;

    // solhint-disable-next-line func-name-mixedcase
    function __ChildRegistry_init(address clientChainManager) internal onlyInitializing {
        __ChildRegistry_init_unchained(clientChainManager);
    }

    // solhint-disable-next-line func-name-mixedcase
    function __ChildRegistry_init_unchained(address clientChainManager) internal onlyInitializing {
        StorageSlotUpgradeable.getAddressSlot(_CHILD_CHAIN_MANAGER_SLOT).value = clientChainManager;
    }

    function deposit(address user, bytes calldata depositData) external override {
        require(
            _msgSender() == StorageSlotUpgradeable.getAddressSlot(_CHILD_CHAIN_MANAGER_SLOT).value,
            'Registry: INSUFFICIENT_PERMISSIONS'
        );

        if (depositData.length == 32) {
            // deposit single
            uint256 tokenId = abi.decode(depositData, (uint256));
            _mint(user, tokenId);
        } else {
            // deposit batch
            uint256[] memory tokenIds = abi.decode(depositData, (uint256[]));
            uint256 length = tokenIds.length;
            for (uint256 i = 0; i < length; i++) {
                _mint(user, tokenIds[i]);
            }
        }
    }
}
