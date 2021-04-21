pragma solidity 0.5.12;

contract Simple {
  uint256 internal _nbr = 0;
  address internal _sender;

  function set(uint256 nbr) external {
    _nbr = nbr;
    _sender = msg.sender;
  }

  function get() external view returns (uint256 nbr, address sender) {
    nbr = _nbr;
    sender = _sender;
  }

  function onERC721Received(address, address, uint256, bytes calldata) external pure returns (bytes4) {
    return 0x150b7a02;
  }
}
