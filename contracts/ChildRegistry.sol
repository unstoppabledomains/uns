// @author Unstoppable Domains, Inc.
// @date December 20th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol';

import './IChildRegistry.sol';

abstract contract ChildRegistry is ERC721Upgradeable, IChildRegistry {
    // limit batching of tokens due to gas limit restrictions
    uint256 public constant BATCH_LIMIT = 20;

    // This is the keccak-256 hash of "uns.polygon.child_chain_manager" subtracted by 1
    bytes32 internal constant _CHILD_CHAIN_MANAGER_SLOT = 0x8bea9a6f8afd34f4e29c585f854e0cc5161431bf5fc299d468454d33dce53b87;
    function setChildChainManager(address clientChainManager) external {
        require(
            StorageSlotUpgradeable.getAddressSlot(_CHILD_CHAIN_MANAGER_SLOT).value == address(0),
            'Registry: CHILD_CHAIN_MANEGER_NOT_EMPTY'
        );
        StorageSlotUpgradeable.getAddressSlot(_CHILD_CHAIN_MANAGER_SLOT).value = clientChainManager;
    }

    function deposit(address user, bytes calldata depositData) external override {
        require(
            _msgSender() == StorageSlotUpgradeable.getAddressSlot(_CHILD_CHAIN_MANAGER_SLOT).value,
            'Registry: INSUFFICIENT_PERMISSIONS'
        );

        // deposit single
        if (depositData.length == 32) {
            uint256 tokenId = abi.decode(depositData, (uint256));
            _mint(user, tokenId);

        // deposit batch
        } else {
            uint256[] memory tokenIds = abi.decode(depositData, (uint256[]));
            uint256 length = tokenIds.length;
            for (uint256 i; i < length; i++) {
                _mint(user, tokenIds[i]);
            }
        }
    }

    function withdraw(uint256 tokenId) external override {
        require(_msgSender() == ownerOf(tokenId), "Registry: INVALID_TOKEN_OWNER");
        _burn(tokenId);
    }

    function withdrawBatch(uint256[] calldata tokenIds) external override {
        uint256 length = tokenIds.length;
        require(length <= BATCH_LIMIT, "Registry: EXCEEDS_BATCH_LIMIT");

        // Iteratively burn ERC721 tokens, for performing
        // batch withdraw
        for (uint256 i; i < length; i++) {
            uint256 tokenId = tokenIds[i];

            require(
                _msgSender() == ownerOf(tokenId),
                string(abi.encodePacked("Registry: INVALID_TOKEN_OWNER ", tokenId))
            );
            _burn(tokenId);
        }

        // At last emit this event, which will be used
        // in MintableERC721 predicate contract on L1
        // while verifying burn proof
        emit WithdrawnBatch(_msgSender(), tokenIds);
    }

    function withdrawWithMetadata(uint256 tokenId) external override {
        require(_msgSender() == ownerOf(tokenId), "Registry: INVALID_TOKEN_OWNER");
        _burn(tokenId);
    }
}
