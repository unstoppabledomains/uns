// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/MulticallUpgradeable.sol';

import './cns/ICNSRegistry.sol';
import './cns/IResolver.sol';
import './IDataReader.sol';
import './IRecordReader.sol';
import './IUNSRegistry.sol';
import './IRegistryReader.sol';

contract ProxyReader is ERC165Upgradeable, MulticallUpgradeable, IRegistryReader, IRecordReader, IDataReader {
    using AddressUpgradeable for address;

    string public constant NAME = 'UNS: Proxy Reader';
    string public constant VERSION = '0.2.2';

    IUNSRegistry private immutable _unsRegistry;
    ICNSRegistry private immutable _cnsRegistry;

    constructor(IUNSRegistry unsRegistry, ICNSRegistry cnsRegistry) {
        _unsRegistry = unsRegistry;
        _cnsRegistry = cnsRegistry;

        __Multicall_init_unchained();
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return
            interfaceId == type(IRegistryReader).interfaceId ||
            interfaceId == type(IRecordReader).interfaceId ||
            interfaceId == type(IDataReader).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) external view override returns (string memory) {
        return _useUns(tokenId) ? _unsRegistry.tokenURI(tokenId) : _cnsRegistry.tokenURI(tokenId);
    }

    function isApprovedOrOwner(address spender, uint256 tokenId) external view override returns (bool) {
        return
            _useUns(tokenId)
                ? _unsRegistry.isApprovedOrOwner(spender, tokenId)
                : _cnsRegistry.isApprovedOrOwner(spender, tokenId);
    }

    function resolverOf(uint256 tokenId) external view override returns (address) {
        return _useUns(tokenId) ? _unsRegistry.resolverOf(tokenId) : _cnsRegistry.resolverOf(tokenId);
    }

    /**
     * @dev returns token id of child. The function is universal for all registries.
     */
    function childIdOf(uint256 tokenId, string calldata label) external view override returns (uint256) {
        return _unsRegistry.childIdOf(tokenId, label);
    }

    function balanceOf(address owner) external view override returns (uint256) {
        uint256 _balance = _unsRegistry.balanceOf(owner);
        if (address(_cnsRegistry) != address(0)) {
            _balance += _cnsRegistry.balanceOf(owner);
        }
        return _balance;
    }

    function ownerOf(uint256 tokenId) external view override returns (address) {
        return _ownerOf(tokenId);
    }

    function getApproved(uint256 tokenId) external view override returns (address) {
        return _useUns(tokenId) ? _unsRegistry.getApproved(tokenId) : _cnsRegistry.getApproved(tokenId);
    }

    function isApprovedForAll(address, address) external pure override returns (bool) {
        revert('ProxyReader: UNSUPPORTED_METHOD');
    }

    function exists(uint256 tokenId) external view override returns (bool) {
        return _useUns(tokenId) ? _unsRegistry.exists(tokenId) : _cnsOwnerOf(tokenId) != address(0x0);
    }

    function get(string calldata key, uint256 tokenId) external view override returns (string memory value) {
        if (_useUns(tokenId)) {
            return _unsRegistry.get(key, tokenId);
        } else {
            address resolver = _cnsResolverOf(tokenId);
            if (resolver.isContract()) {
                try IResolver(resolver).get(key, tokenId) returns (string memory _value) {
                    value = _value;
                } catch {}
            }
        }
    }

    function getMany(string[] calldata keys, uint256 tokenId) external view override returns (string[] memory values) {
        values = new string[](keys.length);
        if (_useUns(tokenId)) {
            return _unsRegistry.getMany(keys, tokenId);
        } else {
            address resolver = _cnsResolverOf(tokenId);
            if (resolver.isContract() && keys.length > 0) {
                try IResolver(resolver).getMany(keys, tokenId) returns (string[] memory _values) {
                    values = _values;
                } catch {}
            }
        }
    }

    function getByHash(uint256 keyHash, uint256 tokenId)
        external
        view
        override
        returns (string memory key, string memory value)
    {
        if (_useUns(tokenId)) {
            return _unsRegistry.getByHash(keyHash, tokenId);
        } else {
            address resolver = _cnsResolverOf(tokenId);
            if (resolver.isContract()) {
                try IResolver(resolver).getByHash(keyHash, tokenId) returns (string memory _key, string memory _value) {
                    (key, value) = (_key, _value);
                } catch {}
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
        if (_useUns(tokenId)) {
            return _unsRegistry.getManyByHash(keyHashes, tokenId);
        } else {
            address resolver = _cnsResolverOf(tokenId);
            if (resolver.isContract() && keyHashes.length > 0) {
                try IResolver(resolver).getManyByHash(keyHashes, tokenId) returns (string[] memory _keys, string[] memory _values) {
                    (keys, values) = (_keys, _values);
                } catch {}
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
        } else if (address(_cnsRegistry) != address(0) && _cnsOwnerOf(tokenId) != address(0x0)) {
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
        if (_useUns(tokenId)) {
            resolver = _unsRegistry.resolverOf(tokenId);
            owner = _unsOwnerOf(tokenId);
            values = _unsRegistry.getMany(keys, tokenId);
        } else {
            resolver = _cnsResolverOf(tokenId);
            owner = _cnsOwnerOf(tokenId);
            if (resolver.isContract() && keys.length > 0) {
                try IResolver(resolver).getMany(keys, tokenId) returns (string[] memory _values) {
                    values = _values;
                } catch {}
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
        if (_useUns(tokenId)) {
            resolver = _unsRegistry.resolverOf(tokenId);
            owner = _unsOwnerOf(tokenId);
            (keys, values) = _unsRegistry.getManyByHash(keyHashes, tokenId);
        } else {
            resolver = _cnsResolverOf(tokenId);
            owner = _cnsOwnerOf(tokenId);
            if (resolver.isContract() && keys.length > 0) {
                try IResolver(resolver).getManyByHash(keyHashes, tokenId) returns (string[] memory _keys, string[] memory _values) {
                    (keys, values) = (_keys, _values);
                } catch {}
            }
        }
    }

    function _useUns(uint256 tokenId) private view returns (bool) {
        return address(_cnsRegistry) == address(0) || _unsRegistry.exists(tokenId);
    }

    function _ownerOf(uint256 tokenId) private view returns (address) {
        return _useUns(tokenId) ? _unsOwnerOf(tokenId) : _cnsOwnerOf(tokenId);
    }

    function _cnsOwnerOf(uint256 tokenId) private view returns (address) {
        try _cnsRegistry.ownerOf(tokenId) returns (address _owner) {
            return _owner;
        } catch {
            return address(0x0);
        }
    }

    function _unsOwnerOf(uint256 tokenId) private view returns (address) {
        try _unsRegistry.ownerOf(tokenId) returns (address _owner) {
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
