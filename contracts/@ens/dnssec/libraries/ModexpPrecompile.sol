pragma solidity ^0.8.4;

library ModexpPrecompile {
    /**
     * @dev Computes (base ^ exponent) % modulus over big numbers.
     */
    function modexp(
        bytes memory base,
        bytes memory exponent,
        bytes memory modulus
    ) internal view returns (bool success, bytes memory output) {
        bytes memory input = abi.encodePacked(
            uint256(base.length),
            uint256(exponent.length),
            uint256(modulus.length),
            base,
            exponent,
            modulus
        );

        output = new bytes(modulus.length);

        assembly {
            success := staticcall(gas(), 5, add(input, 32), mload(input), add(output, 32), mload(modulus))
        }
    }
}
