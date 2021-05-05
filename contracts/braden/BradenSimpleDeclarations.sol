// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

abstract contract BradenSimpleDeclarations is ERC721 {
    struct Read {
        uint256 tokenId;
        address account;
        uint256 keyId;
    }

    struct Write {
        uint256 tokenId;
        uint256 keyId;
        string value;
    }

    /// @dev mapping of tokenId to owner to keyId to value
    mapping(uint256 => mapping(address => mapping(uint256 => string))) _records;

    function write(Write[] calldata writes) external {
        address sender = _msgSender();
        for (uint256 index = 0; index < writes.length; index++) {
            _records[writes[index].tokenId][sender][
                writes[index].keyId
            ] = writes[index].value;
        }
    }

    function read(Read[] calldata queries)
        external
        view
        returns (string[] memory results)
    {
        results = new string[](queries.length);

        for (uint256 index = 0; index < queries.length; index++) {
            results[index] = _records[queries[index].tokenId][
                queries[index].account == address(0)
                    ? ownerOf(queries[index].tokenId)
                    : queries[index].account
            ][queries[index].keyId];
        }
    }
}
