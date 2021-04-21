pragma solidity 0.5.12;
pragma experimental ABIEncoderV2;

import '@openzeppelin/contracts/introspection/ERC165.sol';

import './IRegistryReader.sol';
import './IResolverReader.sol';
import './IDataReader.sol';
import './Registry.sol';
import './Resolver.sol';

contract ProxyReader is ERC165, IRegistryReader, IResolverReader, IDataReader {
    string public constant NAME = 'Unstoppable Proxy Reader';
    string public constant VERSION = '0.2.0';

    Registry private _registry;

    /*
     * bytes4(keccak256(abi.encodePacked('supportsInterface(bytes4)'))) == 0x01ffc9a7
     */
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

    /*
     * bytes4(keccak256(abi.encodePacked('name()'))) == 0x06fdde03
     * bytes4(keccak256(abi.encodePacked('symbol()'))) == 0x95d89b41
     * bytes4(keccak256(abi.encodePacked('tokenURI(uint256)'))) == 0xc87b56dd
     * bytes4(keccak256(abi.encodePacked('isApprovedOrOwner(address,uint256)'))) == 0x430c2081
     * bytes4(keccak256(abi.encodePacked('resolverOf(uint256)'))) == 0xb3f9e4cb
     * bytes4(keccak256(abi.encodePacked('childIdOf(uint256,string)'))) == 0x68b62d32
     * bytes4(keccak256(abi.encodePacked('isController(address)'))) == 0xb429afeb
     * bytes4(keccak256(abi.encodePacked('balanceOf(address)'))) == 0x70a08231
     * bytes4(keccak256(abi.encodePacked('ownerOf(uint256)'))) == 0x6352211e
     * bytes4(keccak256(abi.encodePacked('getApproved(uint256)'))) == 0x081812fc
     * bytes4(keccak256(abi.encodePacked('isApprovedForAll(address,address)'))) == 0xe985e9c5
     * bytes4(keccak256(abi.encodePacked('root()'))) == 0xebf0c717
     *
     * => 0x06fdde03 ^ 0x95d89b41 ^ 0xc87b56dd ^ 0x430c2081 ^
     *    0xb3f9e4cb ^ 0x68b62d32 ^ 0xb429afeb ^ 0x70a08231 ^
     *    0x6352211e ^ 0x081812fc ^ 0xe985e9c5 ^ 0xebf0c717 == 0x6eabca0d
     */
    bytes4 private constant _INTERFACE_ID_REGISTRY_READER = 0x6eabca0d;

    /*
     * bytes4(keccak256(abi.encodePacked('nonceOf(uint256)'))) == 0x6ccbae5f
     * bytes4(keccak256(abi.encodePacked('registry()'))) == 0x7b103999
     * bytes4(keccak256(abi.encodePacked('get(string,uint256)'))) == 0x1be5e7ed
     * bytes4(keccak256(abi.encodePacked('getByHash(uint256,uint256)'))) == 0x672b9f81
     * bytes4(keccak256(abi.encodePacked('getMany(string[],uint256)'))) == 0x1bd8cc1a
     * bytes4(keccak256(abi.encodePacked('getManyByHash(uint256[],uint256)'))) == 0xb85afd28
     *
     * => 0x6ccbae5f ^ 0x7b103999 ^ 0x1be5e7ed ^
     *    0x672b9f81 ^ 0x1bd8cc1a ^ 0xb85afd28 == 0xc897de98
     */
    bytes4 private constant _INTERFACE_ID_RESOLVER_READER = 0xc897de98;

    /*
     * bytes4(keccak256(abi.encodePacked('getData(string[],uint256)'))) == 0x91015f6b
     * bytes4(keccak256(abi.encodePacked('getDataForMany(string[],uint256[])'))) == 0x933c051d
     * bytes4(keccak256(abi.encodePacked('getDataByHash(uint256[],uint256)'))) == 0x03280755
     * bytes4(keccak256(abi.encodePacked('getDataByHashForMany(uint256[],uint256[])'))) == 0x869b8884
     * bytes4(keccak256(abi.encodePacked('ownerOfForMany(uint256[])'))) == 0xc15ae7cf
     *
     * => 0x91015f6b ^ 0x933c051d ^ 0x03280755 ^
     *    0x869b8884 ^ 0xc15ae7cf == 0x46d43268
     */
    bytes4 private constant _INTERFACE_ID_DATA_READER = 0x46d43268;

    constructor(Registry registry) public {
        require(address(registry) != address(0), 'Registry is empty');
        _registry = registry;

        _registerInterface(_INTERFACE_ID_ERC165);
        _registerInterface(_INTERFACE_ID_REGISTRY_READER);
        _registerInterface(_INTERFACE_ID_RESOLVER_READER);
        _registerInterface(_INTERFACE_ID_DATA_READER);
    }

    function name() external view returns (string memory) {
        return _registry.name();
    }

    function symbol() external view returns (string memory) {
        return _registry.symbol();
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        return _registry.tokenURI(tokenId);
    }

    function isApprovedOrOwner(address spender, uint256 tokenId)
        external
        view
        returns (bool)
    {
        return _registry.isApprovedOrOwner(spender, tokenId);
    }

    function resolverOf(uint256 tokenId) external view returns (address) {
        return _registry.resolverOf(tokenId);
    }

    function childIdOf(uint256 tokenId, string calldata label)
        external
        view
        returns (uint256)
    {
        return _registry.childIdOf(tokenId, label);
    }

    function isController(address account) external view returns (bool) {
        return _registry.isController(account);
    }

    function balanceOf(address owner) external view returns (uint256) {
        return _registry.balanceOf(owner);
    }

    function ownerOf(uint256 tokenId) external view returns (address) {
        return _registry.ownerOf(tokenId);
    }

    function getApproved(uint256 tokenId) external view returns (address) {
        return _registry.getApproved(tokenId);
    }

    function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool)
    {
        return _registry.isApprovedForAll(owner, operator);
    }

    function root() external view returns (uint256) {
        return _registry.root();
    }

    function nonceOf(uint256 tokenId) external view returns (uint256) {
        Resolver resolver = Resolver(_registry.resolverOf(tokenId));
        return resolver.nonceOf(tokenId);
    }

    function registry() external view returns (address) {
        return address(_registry);
    }

    function get(string calldata key, uint256 tokenId)
        external
        view
        returns (string memory)
    {
        Resolver resolver = Resolver(_registry.resolverOf(tokenId));
        return resolver.get(key, tokenId);
    }

    function getMany(string[] calldata keys, uint256 tokenId)
        external
        view
        returns (string[] memory)
    {
        Resolver resolver = Resolver(_registry.resolverOf(tokenId));
        return resolver.getMany(keys, tokenId);
    }

    function getByHash(uint256 keyHash, uint256 tokenId)
        external
        view
        returns (string memory key, string memory value)
    {
        Resolver resolver = Resolver(_registry.resolverOf(tokenId));
        return resolver.getByHash(keyHash, tokenId);
    }

    function getManyByHash(uint256[] calldata keyHashes, uint256 tokenId)
        external
        view
        returns (string[] memory keys, string[] memory values)
    {
        Resolver resolver = Resolver(_registry.resolverOf(tokenId));
        return resolver.getManyByHash(keyHashes, tokenId);
    }

    function getData(string[] calldata keys, uint256 tokenId)
        external
        returns (
            address resolver,
            address owner,
            string[] memory values
        )
    {
        resolver = _resolverOf(tokenId);
        owner = _ownerOf(tokenId);

        if(resolver != address(0x0)) {
            Resolver resolverContract = Resolver(resolver);
            values = resolverContract.getMany(keys, tokenId);
        }
    }

    function getDataForMany(string[] calldata keys, uint256[] calldata tokenIds)
        external
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
            (resolvers[i], owners[i], values[i]) = this.getData(keys, tokenIds[i]);
        }
    }

    function getDataByHash(uint256[] calldata keyHashes, uint256 tokenId)
        external
        returns (
            address resolver,
            address owner,
            string[] memory keys,
            string[] memory values
        )
    {
        resolver = _resolverOf(tokenId);
        owner = _ownerOf(tokenId);

        if(resolver != address(0x0)) {
            Resolver resolverContract = Resolver(resolver);
            (keys, values) = resolverContract.getManyByHash(keyHashes, tokenId);
        }
    }

    function getDataByHashForMany(uint256[] calldata keyHashes, uint256[] calldata tokenIds)
        external
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
            (resolvers[i], owners[i], keys[i], values[i]) = this.getDataByHash(keyHashes, tokenIds[i]);
        }
    }

    function ownerOfForMany(uint256[] calldata tokenIds)
        external
        returns (address[] memory owners)
    {
        owners = new address[](tokenIds.length);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            owners[i] = _ownerOf(tokenIds[i]);
        }
    }

    // bytes4(keccak256(abi.encodePacked('ownerOf(uint256)'))) == 0x6352211e
    function _ownerOf(uint256 tokenId) private returns (address) {
        (bool success, bytes memory result) = address(this).call(abi.encodeWithSelector(0x6352211e, tokenId));
        if (success == true) {
            (address _owner) = abi.decode(result, (address));
            return _owner;
        }
        return address(0x0);
    }

    // bytes4(keccak256(abi.encodePacked('resolverOf(uint256)'))) == 0xb3f9e4cb
    function _resolverOf(uint256 tokenId) private returns (address) {
        (bool success, bytes memory result) = address(this).call(abi.encodeWithSelector(0xb3f9e4cb, tokenId));
        if (success == true) {
            (address _resolver) = abi.decode(result, (address));
            return _resolver;
        }
        return address(0x0);
    }
}
