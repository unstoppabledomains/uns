pragma solidity ^0.8.4;

import '../DNSSEC.sol';

interface IDNSRegistrar {
    function claim(bytes memory name, bytes memory proof) external;

    function proveAndClaim(
        bytes memory name,
        DNSSEC.RRSetWithSignature[] memory input,
        bytes memory proof
    ) external;

    function proveAndClaimWithResolver(
        bytes memory name,
        DNSSEC.RRSetWithSignature[] memory input,
        bytes memory proof,
        address resolver,
        address addr
    ) external;
}
