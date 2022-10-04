pragma solidity ^0.8.0;

library ReverseLogic {
    event SetReverse(address indexed addr, uint256 indexed tokenId);

    event RemoveReverse(address indexed addr);

    function set(
        mapping(address => uint256) storage reverses,
        address addr,
        uint256 tokenId
    ) external {
        _set(reverses, addr, tokenId);
    }

    function safeSet(
        mapping(address => uint256) storage reverses,
        address addr,
        uint256 tokenId
    ) external {
        if (address(0xdead) != addr && reverses[addr] == 0) {
            _set(reverses, addr, tokenId);
        }
    }

    function remove(mapping(address => uint256) storage reverses, address addr) external {
        require(reverses[addr] != 0, 'Registry: REVERSE_RECORD_IS_EMPTY');
        delete reverses[addr];
        emit RemoveReverse(addr);
    }

    // solhint-disable-next-line private-vars-leading-underscore
    function _set(
        mapping(address => uint256) storage reverses,
        address addr,
        uint256 tokenId
    ) internal {
        reverses[addr] = tokenId;
        emit SetReverse(addr, tokenId);
    }
}
