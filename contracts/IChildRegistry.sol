// @author Unstoppable Domains, Inc.
// @date December 21st, 2021

pragma solidity ^0.8.0;

import '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';

import './@maticnetwork/IChildToken.sol';

interface IChildRegistry is IERC721Upgradeable, IChildToken {}
