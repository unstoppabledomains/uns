// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol';

import './IRegistryReader.sol';
import './IRecordReader.sol';
import './IDataReader.sol';
import './Registry.sol';

contract ProxyReader is ERC165Upgradeable, IRegistryReader, IRecordReader, IDataReader {
    string public constant NAME = 'Unstoppable Proxy Reader';
    string public constant VERSION = '0.2.0';

    Registry private _registry;

    constructor(Registry registry) {
        require(address(registry) != address(0), 'Registry is empty');
        _registry = registry;
    }

    function name() external view override returns (string memory) {
        return _registry.name();
    }

    function symbol() external view override returns (string memory) {
        return _registry.symbol();
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IRegistryReader).interfaceId
            || interfaceId == type(IRecordReader).interfaceId
            || interfaceId == type(IDataReader).interfaceId
            || super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) external view override returns (string memory) {
        return _registry.tokenURI(tokenId);
    }

    function isApprovedOrOwner(address spender, uint256 tokenId)
        external
        view
        override
        returns (bool)
    {
        return _registry.isApprovedOrOwner(spender, tokenId);
    }

    function childIdOf(uint256 tokenId, string calldata label)
        external
        view
        override
        returns (uint256)
    {
        return _registry.childIdOf(tokenId, label);
    }

    function isController(address account) external view override returns (bool) {
        return _registry.isController(account);
    }

    function balanceOf(address owner) external view override returns (uint256) {
        return _registry.balanceOf(owner);
    }

    function ownerOf(uint256 tokenId) external view override returns (address) {
        return _registry.ownerOf(tokenId);
    }

    function getApproved(uint256 tokenId) external view override returns (address) {
        return _registry.getApproved(tokenId);
    }

    function isApprovedForAll(address owner, address operator)
        external
        view
        override
        returns (bool)
    {
        return _registry.isApprovedForAll(owner, operator);
    }

    function root() external view override returns (uint256) {
        return _registry.root();
    }

    function get(string calldata key, uint256 tokenId)
        external
        view
        override
        returns (string memory)
    {
        return _registry.get(key, tokenId);
    }

    function getMany(string[] calldata keys, uint256 tokenId)
        external
        view
        override
        returns (string[] memory)
    {
        return _registry.getMany(keys, tokenId);
    }

    function getByHash(uint256 keyHash, uint256 tokenId)
        external
        view
        override
        returns (string memory key, string memory value)
    {
        return _registry.getByHash(keyHash, tokenId);
    }

    function getManyByHash(uint256[] calldata keyHashes, uint256 tokenId)
        external
        view
        override
        returns (string[] memory keys, string[] memory values)
    {
        return _registry.getManyByHash(keyHashes, tokenId);
    }

    function getData(string[] calldata keys, uint256 tokenId)
        external
        view
        override
        returns (
            address owner,
            string[] memory values
        )
    {
        owner = _ownerOf(tokenId);
        values = _registry.getMany(keys, tokenId);
    }

    function getDataForMany(string[] calldata keys, uint256[] calldata tokenIds)
        external
        view
        override
        returns (
            address[] memory owners,
            string[][] memory values
        )
    {
        owners = new address[](tokenIds.length);
        values = new string[][](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            (owners[i], values[i]) = this.getData(keys, tokenIds[i]);
        }
    }

    function getDataByHash(uint256[] calldata keyHashes, uint256 tokenId)
        external
        view
        override
        returns (
            address owner,
            string[] memory keys,
            string[] memory values
        )
    {
        owner = _ownerOf(tokenId);
        (keys, values) = _registry.getManyByHash(keyHashes, tokenId);
    }

    function getDataByHashForMany(uint256[] calldata keyHashes, uint256[] calldata tokenIds)
        external
        view
        override
        returns (
            address[] memory owners,
            string[][] memory keys,
            string[][] memory values
        )
    {
        owners = new address[](tokenIds.length);
        keys = new string[][](tokenIds.length);
        values = new string[][](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            (owners[i], keys[i], values[i]) = this.getDataByHash(keyHashes, tokenIds[i]);
        }
    }

    function ownerOfForMany(uint256[] calldata tokenIds)
        external
        view
        override
        returns (address[] memory owners)
    {
        owners = new address[](tokenIds.length);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            owners[i] = _ownerOf(tokenIds[i]);
        }
    }

    function _ownerOf(uint256 tokenId) private view returns (address) {
        try _registry.ownerOf(tokenId) returns (address owner) {
            return owner;
        } catch {
            return address(0x0);
        }
    }
}
