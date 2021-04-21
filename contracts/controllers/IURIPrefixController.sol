
pragma solidity 0.5.12;

interface IURIPrefixController {

    /**
     * @dev Function to control the token URI metadata prefix (base url).
     * @param prefix string to set the base url to.
     */
    function setTokenURIPrefix(string calldata prefix) external;

}