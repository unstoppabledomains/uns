pragma solidity 0.5.12;
pragma experimental ABIEncoderV2;

import "../IResolver.sol";
import "../IRegistryReader.sol";
import "../controllers/MintingController.sol";

contract FreeMinter {
    string public constant NAME = 'Unstoppable Free Domains Minter';
    string public constant VERSION = '0.1.0';
    string private constant DOMAIN_NAME_PREFIX = 'udtestdev-';

    MintingController private _mintingController;
    IResolver private _resolver;
    IRegistryReader private _registry;

    constructor(MintingController mintingController, IResolver resolver, IRegistryReader registry) public {
        _mintingController = mintingController;
        _resolver = resolver;
        _registry = registry;
    }

    function claim(string calldata label) external {
        mintSLD(label, msg.sender);
    }

    function claimTo(string calldata label, address receiver) external {
        mintSLD(label, receiver);
    }

    function claimToWithRecords(string calldata label, address receiver, string[] calldata keys, string[] calldata values) external {
        string memory labelWithPrefix = mintSLD(label, receiver);
        if (keys.length == 0) {
            return;
        }
        uint256 tokenId = _registry.childIdOf(_registry.root(), labelWithPrefix);
        _resolver.preconfigure(keys, values, tokenId);
    }

    function mintSLD(string memory label, address receiver) private returns (string memory) {
        string memory labelWithPrefix = string(abi.encodePacked(DOMAIN_NAME_PREFIX, label));
        _mintingController.mintSLDWithResolver(receiver, labelWithPrefix, address(_resolver));

        return labelWithPrefix;
    }
}
