# UNS

UNS registry smart contracts.

## Specs

1.  Implement ERC721

    https://eips.ethereum.org/EIPS/eip-721

    ERC721 standard provides basic functionality to track and transfer NFTs.

2.  Implement IERC721Metadata

    IERC721Metadata allows smart contract to be interrogated for its name and for details about the assets which your NFTs represent.

    ```
    interface IERC721Metadata /_ is ERC721 _/ {
        /// @notice A descriptive name for a collection of NFTs in this contract
        function name() external view returns (string \_name);

        /// @notice An abbreviated name for NFTs in this contract
        function symbol() external view returns (string _symbol);

        /// @notice A distinct Uniform Resource Identifier (URI) for a given asset.
        /// @dev Throws if `_tokenId` is not a valid NFT. URIs are defined in RFC
        ///  3986. The URI may point to a JSON file that conforms to the "ERC721
        ///  Metadata JSON Schema".
        function tokenURI(uint256 _tokenId) external view returns (string);
    }
    ```

    TBD:

    - `tokenURI()` returns empty string(by default) when `_baseURI()` is empty string
    - In case of defined specific record `tokenURI()` should return value of the record. Record key is to be defined.

3.  Records storage
4.  Upgradable
5.  TLD agnostic
6.  Support meta-transactions

## Main stack

- Solidity `^0.8.0`
- OpenZeppelin contracts `^4.1.0`
- Hardhat `^2.2.1`
- ethers.js `^5.1.4`
