// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "../util/Batchable.sol";
import "./BradenRecords.sol";

contract BradenRegistry is
    BradenRecords,
    Batchable,
    ERC2771Context,
    ERC721Burnable
{
    constructor(address trustedForwarder)
        ERC721("Name", "Symbol")
        ERC2771Context(trustedForwarder)
    {}

    // TLD registration

    mapping(uint256 => string) internal _tlds;

    event TLDRegistered(uint256 indexed tldId, string tld);

    function registerTld(string calldata tld) external {
        uint256 tldId = uint256(keccak256(bytes(tld)));
        _tlds[tldId] = tld;

        emit TLDRegistered(tldId, tld);
    }

    function getTldRegistration(uint256 tldId)
        external
        view
        returns (string memory)
    {
        return _tlds[tldId];
    }

    // Minting functions

    function mintSLD(
        address to,
        uint256 labelHash,
        uint256 tldId
    ) external {
        require(bytes(_tlds[tldId]).length > 0, "invalid tld");

        _mint(to, uint256(keccak256(abi.encodePacked(labelHash, tldId))));
    }

    function mint(uint256 tokenId) external {
        _mint(_msgSender(), tokenId);
    }

    function mintFor(
        address to,
        uint256, /* amount */
        bytes calldata mintingBlob
    ) external {
        // TODO(bradenp): this can be replaced with a calldataload(...) call...
        _mint(to, abi.decode(mintingBlob, (uint256)));
    }

    function _msgSender()
        internal
        view
        override(Batchable, ERC2771Context, Context)
        returns (address sender)
    {
        return super._msgSender();
    }

    function _msgData()
        internal
        view
        override(ERC2771Context, Context)
        returns (bytes calldata)
    {
        return super._msgData();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(BradenRecords, ERC721) {
        return super._beforeTokenTransfer(from, to, tokenId);
    }
}
