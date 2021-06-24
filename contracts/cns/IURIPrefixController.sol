// @author Unstoppable Domains, Inc.
// @date June 16th, 2021

pragma solidity ^0.8.0;

interface IURIPrefixController {
    function setTokenURIPrefix(string calldata prefix) external;
}
