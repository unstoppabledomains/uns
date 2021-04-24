const Web3 = require('web3')
const {sign} = require('./signature')

async function submitSigTransaction(
  contractToSend,
  contractToEncode,
  fromAccount,
  method,
  ...args
) {
  const abiVal = contractToEncode.constructor._json.abi.find(v => {
    return v.name === method && v.inputs.length === args.length
  })
  const web3 = new Web3(contractToSend.constructor.web3.currentProvider)
  const nonce = await contractToSend.nonceOf(fromAccount)

  const signature = await sign(
    fromAccount,
    {
      type: 'bytes32',
      value: Web3.utils.keccak256(
        web3.eth.abi.encodeFunctionCall(abiVal, args),
      ),
    },
    {
      type: 'address',
      value: contractToSend.address,
    },
    {
      type: 'uint256',
      value: nonce,
    },
  )

  return contractToSend[method + 'For'](...args, signature)
}

module.exports = submitSigTransaction
