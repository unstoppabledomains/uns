// @author Unstoppable Domains, Inc.
// @date December 10th, 2021

pragma solidity ^0.8.0;

interface ISignatureController {
    /**
     * @dev Returns the given owners' nonce.
     * @param tokenId token ID to query the nonce of
     * @return uint256 nonce of the owner
     */
    function nonceOf(uint256 tokenId) external view returns (uint256);

    /// A signature function based on transferFrom inside Open Zeppelin's ERC721.sol.
    function transferFromFor(address from, address to, uint256 tokenId, bytes calldata signature) external;

    /// A signature function based on safeTransferFrom inside Open Zeppelin's ERC721.sol.
    function safeTransferFromFor(address from, address to, uint256 tokenId, bytes calldata _data, bytes calldata signature) external;
    function safeTransferFromFor(address from, address to, uint256 tokenId, bytes calldata signature) external;

    /// A signature function based on resolveTo inside ./ICNSRegistry.sol.
    function resolveToFor(address to, uint256 tokenId, bytes calldata signature) external;

    /// A signature function based on burn inside ./ICNSRegistry.sol.
    function burnFor(uint256 tokenId, bytes calldata signature) external;

    /// A signature function based on mintChild inside ./IChildController.sol.
    function mintChildFor(address to, uint256 tokenId, string calldata label, bytes calldata signature) external;

    /// A signature function based on transferFromChild inside ./IChildController.sol.
    function transferFromChildFor(address from, address to, uint256 tokenId, string calldata label, bytes calldata signature) external;

    /// A signature function based on safeTransferFromChild inside ./IChildController.sol.
    function safeTransferFromChildFor(address from, address to, uint256 tokenId, string calldata label, bytes calldata _data, bytes calldata signature) external;
    function safeTransferFromChildFor(address from, address to, uint256 tokenId, string calldata label, bytes calldata signature) external;

    /// A signature function based on burnChild inside ./IChildController.sol.
    function burnChildFor(uint256 tokenId, string calldata label, bytes calldata signature) external;
}
