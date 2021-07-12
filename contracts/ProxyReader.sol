// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol';

import './cns/ICNSRegistry.sol';
import './cns/IResolver.sol';
import './IDataReader.sol';
import './IRecordReader.sol';
import './IUNSRegistry.sol';
import './IRegistryReader.sol';

contract ProxyReader is ERC165Upgradeable, IRegistryReader, IRecordReader, IDataReader {
    using SafeMathUpgradeable for uint256;

    string public constant NAME = 'UNS: Proxy Reader';
    string public constant VERSION = '0.1.0';

    IUNSRegistry private immutable _unsRegistry;
    ICNSRegistry private immutable _cnsRegistry;

    constructor(IUNSRegistry unsRegistry, ICNSRegistry cnsRegistry) {
        _unsRegistry = unsRegistry;
        _cnsRegistry = cnsRegistry;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return
            interfaceId == type(IRegistryReader).interfaceId ||
            interfaceId == type(IRecordReader).interfaceId ||
            interfaceId == type(IDataReader).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function getAllRegistries() public view returns (address[] memory addresses) {
        addresses = new address[](2);
        addresses[0] = address(_unsRegistry);
        addresses[1] = address(_cnsRegistry);
        return addresses;
    }

    function tokenURI(uint256 tokenId) external view override returns (string memory) {
        if (_unsRegistry.exists(tokenId)) {
            return _unsRegistry.tokenURI(tokenId);
        } else {
            return _cnsRegistry.tokenURI(tokenId);
        }
    }

    function isApprovedOrOwner(address spender, uint256 tokenId) external view override returns (bool) {
        if (_unsRegistry.exists(tokenId)) {
            return _unsRegistry.isApprovedOrOwner(spender, tokenId);
        } else {
            return _cnsRegistry.isApprovedOrOwner(spender, tokenId);
        }
    }

    function resolverOf(uint256 tokenId) external view override returns (address) {
        if (_unsRegistry.exists(tokenId)) {
            return _unsRegistry.resolverOf(tokenId);
        } else {
            return _cnsRegistry.resolverOf(tokenId);
        }
    }

    /**
     * @dev returns token id of child. The function is universal for all registries.
     */
    function childIdOf(uint256 tokenId, string calldata label) external view override returns (uint256) {
        return _unsRegistry.childIdOf(tokenId, label);
    }

    function balanceOf(address owner) external view override returns (uint256) {
        return _unsRegistry.balanceOf(owner).add(_cnsRegistry.balanceOf(owner));
    }

    function ownerOf(uint256 tokenId) external view override returns (address) {
        return _ownerOf(tokenId);
    }

    function getApproved(uint256 tokenId) external view override returns (address) {
        if (_unsRegistry.exists(tokenId)) {
            return _unsRegistry.getApproved(tokenId);
        } else {
            return _cnsRegistry.getApproved(tokenId);
        }
    }

    // Deprecated
    function isApprovedForAll(address, address) external pure override returns (bool) {
        revert('ProxyReader: UNSUPPORTED_METHOD');
    }

    function exists(uint256 tokenId) external view override returns (bool) {
        return _unsRegistry.exists(tokenId) || _cnsOwnerOf(tokenId) != address(0x0);
    }

    function get(string calldata key, uint256 tokenId) external view override returns (string memory value) {
        if (_unsRegistry.exists(tokenId)) {
            return _unsRegistry.get(key, tokenId);
        } else {
            address resolver = _cnsResolverOf(tokenId);
            if (resolver != address(0x0)) {
                value = IResolver(resolver).get(key, tokenId);
            }
        }
    }

    function getMany(string[] calldata keys, uint256 tokenId) external view override returns (string[] memory values) {
        values = new string[](keys.length);
        if (_unsRegistry.exists(tokenId)) {
            return _unsRegistry.getMany(keys, tokenId);
        } else {
            address resolver = _cnsResolverOf(tokenId);
            if (resolver != address(0x0) && keys.length > 0) {
                values = IResolver(resolver).getMany(keys, tokenId);
            }
        }
    }

    function getByHash(uint256 keyHash, uint256 tokenId)
        external
        view
        override
        returns (string memory key, string memory value)
    {
        if (_unsRegistry.exists(tokenId)) {
            return _unsRegistry.getByHash(keyHash, tokenId);
        } else {
            address resolver = _cnsResolverOf(tokenId);
            if (resolver != address(0x0)) {
                (key, value) = IResolver(resolver).getByHash(keyHash, tokenId);
            }
        }
    }

    function getManyByHash(uint256[] calldata keyHashes, uint256 tokenId)
        external
        view
        override
        returns (string[] memory keys, string[] memory values)
    {
        keys = new string[](keyHashes.length);
        values = new string[](keyHashes.length);
        if (_unsRegistry.exists(tokenId)) {
            return _unsRegistry.getManyByHash(keyHashes, tokenId);
        } else {
            address resolver = _cnsResolverOf(tokenId);
            if (resolver != address(0x0) && keyHashes.length > 0) {
                (keys, values) = IResolver(resolver).getManyByHash(keyHashes, tokenId);
            }
        }
    }

    function getData(string[] calldata keys, uint256 tokenId)
        external
        view
        override
        returns (
            address resolver,
            address owner,
            string[] memory values
        )
    {
        return _getData(keys, tokenId);
    }

    function getDataForMany(string[] calldata keys, uint256[] calldata tokenIds)
        external
        view
        override
        returns (
            address[] memory resolvers,
            address[] memory owners,
            string[][] memory values
        )
    {
        resolvers = new address[](tokenIds.length);
        owners = new address[](tokenIds.length);
        values = new string[][](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            (resolvers[i], owners[i], values[i]) = _getData(keys, tokenIds[i]);
        }
    }

    function getDataByHash(uint256[] calldata keyHashes, uint256 tokenId)
        external
        view
        override
        returns (
            address resolver,
            address owner,
            string[] memory keys,
            string[] memory values
        )
    {
        return _getDataByHash(keyHashes, tokenId);
    }

    function getDataByHashForMany(uint256[] calldata keyHashes, uint256[] calldata tokenIds)
        external
        view
        override
        returns (
            address[] memory resolvers,
            address[] memory owners,
            string[][] memory keys,
            string[][] memory values
        )
    {
        resolvers = new address[](tokenIds.length);
        owners = new address[](tokenIds.length);
        keys = new string[][](tokenIds.length);
        values = new string[][](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            (resolvers[i], owners[i], keys[i], values[i]) = _getDataByHash(keyHashes, tokenIds[i]);
        }
    }

    function ownerOfForMany(uint256[] calldata tokenIds) external view override returns (address[] memory owners) {
        owners = new address[](tokenIds.length);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            owners[i] = _ownerOf(tokenIds[i]);
        }
    }

    /**
     * @dev Returns registry address for specified token or zero address if token does not exist.
     */
    function registryOf(uint256 tokenId) external view returns (address) {
        if (_unsRegistry.exists(tokenId)) {
            return address(_unsRegistry);
        } else if (_cnsOwnerOf(tokenId) != address(0x0)) {
            return address(_cnsRegistry);
        }
        return address(0x0);
    }

    function _getData(string[] calldata keys, uint256 tokenId)
        private
        view
        returns (
            address resolver,
            address owner,
            string[] memory values
        )
    {
        values = new string[](keys.length);
        if (_unsRegistry.exists(tokenId)) {
            resolver = _unsRegistry.resolverOf(tokenId);
            owner = _unsRegistry.ownerOf(tokenId);
            values = _unsRegistry.getMany(keys, tokenId);
        } else {
            resolver = _cnsResolverOf(tokenId);
            owner = _cnsOwnerOf(tokenId);
            if (resolver != address(0x0) && keys.length > 0) {
                values = IResolver(resolver).getMany(keys, tokenId);
            }
        }
    }

    function _getDataByHash(uint256[] calldata keyHashes, uint256 tokenId)
        private
        view
        returns (
            address resolver,
            address owner,
            string[] memory keys,
            string[] memory values
        )
    {
        keys = new string[](keyHashes.length);
        values = new string[](keyHashes.length);
        if (_unsRegistry.exists(tokenId)) {
            resolver = _unsRegistry.resolverOf(tokenId);
            owner = _unsRegistry.ownerOf(tokenId);
            (keys, values) = _unsRegistry.getManyByHash(keyHashes, tokenId);
        } else {
            resolver = _cnsResolverOf(tokenId);
            owner = _cnsOwnerOf(tokenId);
            if (resolver != address(0x0) && keys.length > 0) {
                (keys, values) = IResolver(resolver).getManyByHash(keyHashes, tokenId);
            }
        }
    }

    function _ownerOf(uint256 tokenId) private view returns (address) {
        if (_unsRegistry.exists(tokenId)) {
            return _unsRegistry.ownerOf(tokenId);
        } else {
            return _cnsOwnerOf(tokenId);
        }
    }

    function _cnsOwnerOf(uint256 tokenId) private view returns (address) {
        try _cnsRegistry.ownerOf(tokenId) returns (address _owner) {
            return _owner;
        } catch {
            return address(0x0);
        }
    }

    function _cnsResolverOf(uint256 tokenId) private view returns (address) {
        try _cnsRegistry.resolverOf(tokenId) returns (address _resolver) {
            return _resolver;
        } catch {
            return address(0x0);
        }
    }
}
