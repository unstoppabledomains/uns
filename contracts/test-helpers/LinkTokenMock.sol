pragma solidity 0.5.12;

import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "../util/ERC677Receiver.sol";

contract LinkTokenMock is ERC20Mintable {
    /**
    * @dev transfer token to a contract address with additional data if the recipient is a contact.
    * @param _to The address to transfer to.
    * @param _value The amount to be transferred.
    * @param _data The extra data to be passed to the receiving contract.
    */
    function transferAndCall(address _to, uint256 _value, bytes memory _data)
    public
    returns (bool success)
    {
        super.transfer(_to, _value);
        emit Transfer(msg.sender, _to, _value);
        if (isContract(_to)) {
            contractFallback(_to, _value, _data);
        }
        return true;
    }


    function contractFallback(address _to, uint256 _value, bytes memory _data)
    private
    {
        ERC677Receiver receiver = ERC677Receiver(_to);
        receiver.onTokenTransfer(msg.sender, _value, _data);
    }

    function isContract(address _addr)
    private
    returns (bool hasCode)
    {
        uint length;
        assembly {length := extcodesize(_addr)}
        return length > 0;
    }
}
