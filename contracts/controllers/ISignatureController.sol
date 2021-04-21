pragma solidity 0.5.12;

/**
 * @title ISignatureController
 * @dev All of the signature controller functions follow the same pattern. Each
 * function mirrors another function in another controller or on the registry.
 * The intent is that these signature functions can be an alternative to signing
 * away unilateral control via an approval without having to build significant
 * smart contract infrastructure, and without the domain owner having to have
 * ether for gas.
 *
 * @dev The way these functions work is by validating a extra signature argument
 * of all of the arguments of the function and a nonce, and crosschecking the
 * recovered address with the registry to ensure that the signer is the owner.
 * Instead of checking msg.sender for authentication.
 *
 * @dev The method we use for signing is non standard. It'd be worth it to
 * consider using EIP712 Typed signing https://eips.ethereum.org/EIPS/eip-712.
 */
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

    /// A signature function based on resolveTo inside ./IRegistry.sol.
    function resolveToFor(address to, uint256 tokenId, bytes calldata signature) external;

    /// A signature function based on burn inside ./IRegistry.sol.
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
